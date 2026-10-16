import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BuriedInWork from "@/components/BuriedInWork";
import TwoCareers from "@/components/TwoCareers";
import Projects from "@/components/Projects";
import Vitals from "@/components/Vitals";
import Terminal from "@/components/Terminal";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <BuriedInWork />
        <TwoCareers />
        <Projects />
        <Vitals />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
