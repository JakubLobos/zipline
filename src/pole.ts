import ZiplinePoleSVG from "./assets/pole.svg";
import type { Point } from "./types";
import { WorldObject } from "./world-object";

export class Pole extends WorldObject {
  private img: HTMLImageElement;

  constructor(point: Point) {
    super(point.x, point.y);
    this.img = new Image();
    this.img.src = ZiplinePoleSVG;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const poleHeight = 77;
    const poleWidth = 29;
    ctx.drawImage(
      this.img,
      this.position.x - poleWidth / 2,
      this.position.y - 4,
      poleWidth,
      poleHeight,
    );
  }
}
