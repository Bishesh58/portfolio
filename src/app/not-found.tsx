import Link from "next/link";

/** On-brand 404 — same bone paper, hard borders, and stamp language as the site. */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "24px",
        textAlign: "center",
      }}
    >
      <p className="eyebrow">{"//"} Page not on the build sheet</p>
      <h1 className="display" style={{ fontSize: "clamp(5rem, 18vw, 12rem)" }}>
        404
      </h1>
      <p style={{ maxWidth: 420, fontWeight: 500 }}>
        This URL doesn&apos;t exist — or the robot filed it somewhere it
        shouldn&apos;t have.
      </p>
      <Link className="btn" href="/">
        Back to the spec<span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
