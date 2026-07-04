import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SectionSpy from "@/components/SectionSpy";
import Marquee from "@/components/Marquee";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Loader />
      <Navbar />
      <ProgressBar />
      <SectionSpy />
      <main id="main">
        <div className="container section" id="hero" data-section="hero">
          <GhostNumber n="01" />
          <SectionTitle text="SCAFFOLD" />
        </div>
        <Marquee items={["Full Stack", "Vue", "React", "Laravel", "NetSuite"]} />
        <div style={{ height: "150vh" }} />
      </main>
    </>
  );
}
