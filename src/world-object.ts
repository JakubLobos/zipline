import type { Point } from "./types";

export abstract class WorldObject {
  public readonly position: Point;
  public readonly radius: number = 0;
  // add world object ID
  public readonly id: string = crypto.randomUUID();

  constructor(x: number, y: number, radius: number = 0) {
    this.position = { x, y };
    this.radius = radius;
  }

  drawHitbox(ctx: CanvasRenderingContext2D): void {
    if (this.radius <= 0) return;

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fill();
    ctx.closePath();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
