export default function GhostNumber({ n }: { n: string }) {
  return (
    <div className="ghost-number-wrap" aria-hidden="true">
      <span className="ghost-number">{n}</span>
    </div>
  );
}
