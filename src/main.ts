import { Character } from "./character";
import { Zipline } from "./zipline";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const runButton = document.getElementById("button_run") as HTMLButtonElement;

const setupCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.scale(dpr, dpr);
  }

  return { width: rect.width, height: rect.height };
};

const draw = () => {
  const { width, height } = setupCanvas();
  const zipline = new Zipline(100, false);

  zipline.addPoint(50, 50);
  zipline.addPoint(1100, 150);

  const startPoint = zipline.getMeshPoints()[0];

  const character = new Character(startPoint.x + 30, startPoint.y, 15);

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    zipline.draw(ctx);
    character.draw(ctx);
  }
};

// Redraw on window resize to maintain crisp rendering
window.addEventListener("resize", draw);

draw();
