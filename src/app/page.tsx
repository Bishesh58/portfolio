import Marquee from "@/components/Marquee";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";

export default function Home() {
  return (
    <main id="main">
      <div className="container section">
        <GhostNumber n="01" />
        <SectionTitle text="SCAFFOLD" />
      </div>
      <Marquee items={["Full Stack", "Vue", "React", "Laravel", "NetSuite"]} />
      <div style={{ height: "150vh" }} />
    </main>
  );
}
