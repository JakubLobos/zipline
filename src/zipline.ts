import type { Point } from "./types";

export class Zipline {
  private points: Point[] = [];
  private meshPoints: Point[] = [];
  private debug: boolean;
  private resolution: number;

  constructor(resolution: number = 50, debug: boolean = true) {
    this.resolution = resolution;
    this.debug = debug;
  }

  addPoint(x: number, y: number): void {
    this.points.push({ x, y });
    if (this.points.length === 2) {
      this.generateMesh();
    }
  }

  private generateMesh(): void {
    if (this.points.length < 2) return;

    const start = this.points[0];
    const end = this.points[1];

    this.meshPoints = [];

    for (let i = 0; i <= this.resolution; i++) {
      const t = i / this.resolution;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      this.meshPoints.push({ x, y });
    }
  }

  getMeshPoints(): Point[] {
    return this.meshPoints;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.meshPoints.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.meshPoints[0].x + 0.5, this.meshPoints[0].y + 0.5);

    // draw line
    for (let i = 1; i < this.meshPoints.length; i++) {
      ctx.lineTo(this.meshPoints[i].x + 0.5, this.meshPoints[i].y + 0.5);
    }
    ctx.stroke();

    if (this.debug) {
      ctx.fillStyle = "red";
      ctx.font = "11px Arial";
      this.meshPoints.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(idx.toString(), p.x + 4, p.y - 4);
      });
    }
  }
}
