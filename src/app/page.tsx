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

const tickerA = ["Full Stack", "Vue", "React", "Node.js", "TypeScript", "Laravel", "NetSuite"];
const tickerB = ["Dashboards", "ERP Integrations", "Kanban Pipelines", "Data Viz", "APIs", "SEO"];

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
        <Marquee items={tickerA} />
        <About />
        <Marquee items={tickerB} accent="lime" />
        <Journey />
        <Marquee items={tickerA} accent="teal" />
        <Projects />
        <Marquee items={tickerB} accent="yellow" baseVelocity={-2.5} />
        <Skills />
        <Marquee items={tickerA} accent="cobalt" />
        <Contact />
      </main>
      <Footer />
      <Mascot />
    </>
  );
}
