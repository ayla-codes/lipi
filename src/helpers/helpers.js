import { Canvg } from "canvg";

function extractAndReversePaths(svgString) {
  const pathRegex = /d="([^"]*)"/g;
  let match;
  const paths = [];

  while ((match = pathRegex.exec(svgString)) !== null) {
    paths.push(match[1]);
  }
  console.log("Paths:", paths);
  return paths.reverse();
}

const convertSvgToImageData = async (svgString) => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  console.log(ctx);
  // Set canvas dimensions (adjust as needed)
  canvas.width = 800;
  canvas.height = 600;

  // Use canvg to render SVG onto the canvas
  const canvg = new Canvg();
  canvg(canvas, svgString);

  // Get ImageData from the canvas
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return imgData;
};

export { extractAndReversePaths, convertSvgToImageData };
