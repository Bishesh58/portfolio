import fs from "fs";
import sharp from "sharp";

/** Regenerate eye coordinates from robot.png for RobotIllustration.tsx */
const SVG_W = 557;
const SVG_H = 600;

function isGreen(r, g, b) {
  return g > 160 && g > r + 40 && g > b + 40;
}

function bbox(points) {
  let x1 = Infinity, x2 = -Infinity, y1 = Infinity, y2 = -Infinity;
  points.forEach((p) => {
    x1 = Math.min(x1, p.sx);
    x2 = Math.max(x2, p.sx);
    y1 = Math.min(y1, p.sy);
    y2 = Math.max(y2, p.sy);
  });
  return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

async function main() {
  const { data, info } = await sharp("assets/robot.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const greenPoints = [];
  for (let py = 0; py < info.height; py++) {
    for (let px = 0; px < info.width; px++) {
      const i = (py * info.width + px) * 4;
      if (isGreen(data[i], data[i + 1], data[i + 2])) {
        greenPoints.push({
          sx: (px / info.width) * SVG_W,
          sy: (py / info.height) * SVG_H,
        });
      }
    }
  }
  const eyeGreen = greenPoints.filter((p) => p.sy < 250);
  const midX = eyeGreen.reduce((s, p) => s + p.sx, 0) / eyeGreen.length;
  console.log(JSON.stringify({ left: bbox(eyeGreen.filter((p) => p.sx < midX)), right: bbox(eyeGreen.filter((p) => p.sx >= midX)) }, null, 2));
}

main();
