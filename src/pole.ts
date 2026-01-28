import ZiplinePoleSVG from "./assets/pole.svg";
import type { Point } from "./types";

export class Pole {
  private point: Point;
  private img: HTMLImageElement;

  constructor(point: Point) {
    this.img = new Image();
    this.img.src = ZiplinePoleSVG;

    this.point = point;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const poleHeight = 77;
    const poleWidth = 29;
    ctx.drawImage(
      this.img,
      this.point.x - poleWidth / 2,
      this.point.y - 4,
      poleWidth,
      poleHeight,
    );
  }
}
