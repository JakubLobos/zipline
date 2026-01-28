import type { Character } from "./character";
import { getAngle } from "./utils/getAngle";
import type { Zipline } from "./zipline";

export class Engine {
  public isRunning = false;
  private zipline: Zipline;
  private character: Character;
  private timeStep = 0.016; // ~60 FPS
  private g = 9.81;

  constructor(zipline: Zipline, character: Character) {
    this.zipline = zipline;
    this.character = character;
  }

  update() {
    const currentPos = this.character.position;
    const currentCharacterVelocity = this.character.velocity;
    const pointA = this.zipline.getMeshPoints()[0];
    const pointB =
      this.zipline.getMeshPoints()[this.zipline.getMeshPoints().length - 1];

    const angle = getAngle(pointA, pointB);
    const acceleration = this.g * Math.sin(angle);

    this.character.updateVelocity(
      currentCharacterVelocity.x +
        acceleration * Math.cos(angle) * this.timeStep,
      currentCharacterVelocity.y +
        acceleration * Math.sin(angle) * this.timeStep,
    );

    this.character.move(
      this.character["velocity"].x,
      this.character["velocity"].y,
    );

    // LOG
    console.log(
      "Angle (radians):",
      angle,
      "Angle (degrees):",
      (angle * 180) / Math.PI,
      "currentPos:",
      currentPos,
      "acceleration:",
      acceleration,
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.zipline.draw(ctx);
    this.character.draw(ctx);
  }

  run(ctx: CanvasRenderingContext2D) {
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return; // stop loop if engine stopped

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.update();
      this.draw(ctx);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop); // start animation
  }

  stop() {
    this.isRunning = false;
  }
}
