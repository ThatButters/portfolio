#!/usr/bin/env python3
"""Refresh src/data/activity.json, the "2026 vitals" heatmap on the home page.

Pulls the GitHub contribution calendar for the token's owner: per-day COUNTS only
(commits, pull requests, reviews, issues across every repo, public and private).
No repo names, titles or messages are fetched or stored.

    GITHUB_TOKEN=$(gh auth token) python3 scripts/update_activity.py [year]

Then rebuild/redeploy the site to publish the new numbers.
"""
import datetime as dt
import json
import os
import pathlib
import sys
import urllib.request

QUERY = """
query($from: DateTime!, $to: DateTime!) {
  viewer {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }
  }
}"""


def main() -> None:
    token = os.environ.get("GITHUB_TOKEN") or sys.exit("Set GITHUB_TOKEN (e.g. $(gh auth token)).")
    year = int(sys.argv[1]) if len(sys.argv) > 1 else dt.date.today().year
    body = json.dumps({
        "query": QUERY,
        "variables": {"from": f"{year}-01-01T00:00:00Z", "to": f"{year}-12-31T23:59:59Z"},
    }).encode()
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=body,
        headers={"Authorization": f"bearer {token}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        payload = json.load(resp)
    if "errors" in payload:
        sys.exit(f"GitHub API error: {payload['errors']}")

    cal = payload["data"]["viewer"]["contributionsCollection"]["contributionCalendar"]
    days = {
        d["date"]: d["contributionCount"]
        for w in cal["weeks"]
        for d in w["contributionDays"]
        if d["contributionCount"] > 0
    }
    out = {
        "year": year,
        "asOf": dt.date.today().isoformat(),
        "total": cal["totalContributions"],
        "days": dict(sorted(days.items())),
    }
    path = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "activity.json"
    path.write_text(json.dumps(out, indent=1) + "\n")
    print(f"Wrote {path}: {out['total']} contributions on {len(days)} days")


if __name__ == "__main__":
    main()
