import type { Character } from "./character";
import { getAngle } from "./utils/getAngle";
import type { WorldObject } from "./world-object";
import type { Zipline } from "./zipline";

export class Engine {
  public isRunning = false;
  private zipline: Zipline;
  private character: Character;
  private timeStep = 0.016; // ~60 FPS
  private g = 9.81;
  private worldObjects: WorldObject[] = [];

  constructor(zipline: Zipline, character: Character) {
    this.zipline = zipline;
    this.character = character;
  }

  addWorldObject(obj: WorldObject | WorldObject[]) {
    if (Array.isArray(obj)) {
      this.worldObjects.push(...obj);
    } else {
      this.worldObjects.push(obj);
    }
  }

  private detectWorldCollisions(
    worldObjects: WorldObject[],
    onCollision: (obj: WorldObject) => void,
  ) {
    worldObjects.forEach((obj) => {
      // distance x to object
      const dx = this.character.position.x - obj.position.x;
      // distance y to object
      const dy = this.character.position.y - obj.position.y;

      // Pythagorean theorem
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (
        distance < this.character.radius + obj.radius &&
        obj.id !== this.character.id
      ) {
        onCollision(obj);
      }
    });
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

    this.detectWorldCollisions(this.worldObjects, (obj) => {
      console.log("Collision with object ID:", obj.id);
      // Simple collision response: stop the character
      this.character.updateVelocity(0, 0);
    });

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
    this.worldObjects.forEach((obj) => obj.draw(ctx));
  }

  run(ctx: CanvasRenderingContext2D) {
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.update();
      this.draw(ctx);
      this.worldObjects.forEach((obj) => {
        obj.draw(ctx);
        obj.drawHitbox(ctx);
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
  }
}
