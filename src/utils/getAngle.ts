import type { Point } from "../types";

export const getAngle = (a: Point, b: Point): number => {
  // slope
  const m = (b.y - a.y) / (b.x - a.x);

  // angle in radians
  const angle = Math.atan(m);

  return angle;
};
