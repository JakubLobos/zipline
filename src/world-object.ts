import type { Point } from "./types";

export abstract class WorldObject {
  public readonly position: Point;
  public readonly radius: number = 0;

  constructor(x: number, y: number, radius: number = 0) {
    this.position = { x, y };
    this.radius = radius;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
