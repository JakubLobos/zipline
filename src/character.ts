import CharacterSVG from "./assets/character.svg";
import type { Point } from "./types";

const CHARACTER_SVG_MARGIN = 25;

export class Character {
  private position: Point;
  private radius: number;
  private img: HTMLImageElement;

  constructor(x: number, y: number, radius: number = 10) {
    this.position = { x, y };
    this.radius = radius;
    this.img = new Image();
    this.img.src = CharacterSVG;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.img.complete) return; // czekamy aż się wczyta

    const width = this.radius * 2;
    const scale = width / this.img.width;
    const height = this.img.height * scale;

    ctx.drawImage(
      this.img,
      this.position.x - width / 2,
      this.position.y - height / 2 + CHARACTER_SVG_MARGIN,
      width,
      height,
    );
  }
}
