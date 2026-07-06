import sharp from "sharp";

// Hero illustration: robot.png (1.3 MB) → robot.webp for the SVG <image> href
await sharp("assets/robot.png")
  .webp({ quality: 82 })
  .toFile("public/robot.webp");

// Favicon fallbacks rasterised from favicon.svg
await sharp("public/favicon.svg", { density: 300 })
  .resize(180, 180, { fit: "contain", background: "#ebe7dd" })
  .flatten({ background: "#ebe7dd" })
  .png()
  .toFile("public/apple-touch-icon.png");

await sharp("public/favicon.svg", { density: 300 })
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("public/icon-32.png");

for (const f of ["robot.webp", "apple-touch-icon.png", "icon-32.png"]) {
  const meta = await sharp(`public/${f}`).metadata();
  console.log(f, meta.width + "x" + meta.height);
}
