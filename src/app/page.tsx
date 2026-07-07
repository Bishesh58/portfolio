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
import ShortcutHint from "@/components/wow/microdelights/ShortcutHint";
import KonamiConfetti from "@/components/wow/microdelights/KonamiConfetti";
import CommandPalette from "@/components/CommandPalette";
import RobotArcade from "@/components/wow/arcade/RobotArcade";
import BlueprintMode from "@/components/wow/BlueprintMode";
import ConsoleSignature from "@/components/wow/ConsoleSignature";
import HireSignal from "@/components/wow/HireSignal";
import Presence from "@/components/wow/Presence";

const stackTicker = ["Full Stack", "Vue", "React", "Node.js", "TypeScript", "Laravel", "NetSuite"];
const contactTicker = ["Open to work", "Let's talk", "Auckland NZ", "Open to work", "Let's talk", "Full Stack"];

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
        <Marquee items={stackTicker} variant="blue" />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Marquee items={contactTicker} variant="yellow" baseVelocity={-2.5} />
        <Contact />
      </main>
      <Footer />
      <Mascot />
      <ShortcutHint />
      <KonamiConfetti />
      <CommandPalette />
      <RobotArcade />
      <BlueprintMode />
      <ConsoleSignature />
      <HireSignal />
      <Presence />
    </>
  );
}
