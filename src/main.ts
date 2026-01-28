import { Character } from "./character";
import { Engine } from "./engine";
import { Pole } from "./pole";
import { setupCanvas } from "./utils/setupCanvas";
import { Zipline } from "./zipline";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const runButton = document.getElementById("button_run") as HTMLButtonElement;

const zipline = new Zipline(100, false);

zipline.addPoint(100, 250);
zipline.addPoint(1200, 600);

// draw poles
const poleA = new Pole(zipline.getMeshPoints()[0]);
const poleB = new Pole(
  zipline.getMeshPoints()[zipline.getMeshPoints().length - 1],
);

const startPoint = zipline.getMeshPoints()[0];

const character = new Character(startPoint.x + 60, startPoint.y + 10, 15);
const engine = new Engine(zipline, character);

engine.addWorldObject([poleA, poleB, character]);

const draw = () => {
  const { width, height } = setupCanvas(canvas);

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    poleA.draw(ctx);
    poleB.draw(ctx);
    engine.draw(ctx);
  }
};

// Redraw on window resize to maintain crisp rendering
window.addEventListener("resize", draw);
window.addEventListener("load", draw);

runButton.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    engine.isRunning ? engine.stop() : engine.run(ctx);
  }
});
