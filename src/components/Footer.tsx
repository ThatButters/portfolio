import { siteConfig } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          Designed & Built by {siteConfig.name}
        </p>
        <p className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
