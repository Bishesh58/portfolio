import GhostNumber from "@/components/GhostNumber";
import SectionTitle from "@/components/SectionTitle";

interface Props {
  n: string;
  title: string;
}

export default function SectionHeader({ n, title }: Props) {
  return (
    <div className="section-header">
      <SectionTitle text={title} />
      <GhostNumber n={n} />
    </div>
  );
}
