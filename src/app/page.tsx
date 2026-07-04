import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SectionSpy from "@/components/SectionSpy";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Mascot from "@/components/RobotMascot/Mascot";
import SectionDivider from "@/components/wow/dividers/SectionDivider";
import ScrollToTop from "@/components/wow/microdelights/ScrollToTop";
import ShortcutHint from "@/components/wow/microdelights/ShortcutHint";

const ticker = ["Full Stack", "Vue", "React", "Node.js", "TypeScript", "Laravel", "NetSuite"];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Loader />
      <Navbar />
      <ProgressBar />
      <SectionSpy />
      <main id="main">
        <Hero />
        <Marquee items={ticker} />
        <About />
        <Journey />
        <SectionDivider variant="zigzag" accent="cobalt" />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Mascot />
      <ScrollToTop />
      <ShortcutHint />
    </>
  );
}
