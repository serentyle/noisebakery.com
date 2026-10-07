export type RuleKind = 'trace' | 'ruler' | 'macroblock' | 'dither';

export type RuleRect = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
};

export type RuleGeometry = {
  rects: RuleRect[];
  d?: string;
};

const RULE_SEED = {
  trace: 3,
  ruler: 11,
  macroblock: 128,
  dither: 1,
} as const satisfies Record<RuleKind, number>;

const RULE_WIDTH = 552;
const FOREGROUND = 'currentColor';

export const ruleViewBox = `0 0 ${RULE_WIDTH} 8`;

export function ruleGeometry(kind: RuleKind): RuleGeometry {
  const seed = RULE_SEED[kind];
  let s = seed;
  const next = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const width = RULE_WIDTH;
  const rects: RuleRect[] = [];
  let d = '';

  if (kind === 'dither') {
    const matrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < width / 2; x++) {
        const t = x / (width / 2);
        const v =
          0.15 + 0.45 * (0.5 + 0.5 * Math.sin(t * Math.PI * 5 + seed)) + (next() - 0.5) * 0.15;
        const cell = matrix[y]?.[x % 4];
        if (cell !== undefined && v > (cell + 0.5) / 16) {
          rects.push({ x: x * 2, y: y * 2, w: 2, h: 2, fill: FOREGROUND });
        }
      }
    }
  } else if (kind === 'trace') {
    for (let i = 0; i <= 184; i++) {
      const x = i * 3;
      const spike = next() < 0.06;
      const y = 4 + (next() - 0.5) * (spike ? 8 : 2.4);
      d += (i ? 'L' : 'M') + x + ',' + y.toFixed(1);
    }
  } else if (kind === 'macroblock') {
    for (let x = 0; x < width; x += 8) {
      const k = next();
      if (k < 0.18) rects.push({ x, y: 0, w: 8, h: 8, fill: FOREGROUND });
      else if (k < 0.34) rects.push({ x, y: 0, w: 4, h: 8, fill: FOREGROUND });
      else if (k < 0.48) rects.push({ x, y: 4, w: 8, h: 4, fill: FOREGROUND });
      else if (k < 0.62) {
        rects.push({ x, y: 0, w: 4, h: 4, fill: FOREGROUND });
        rects.push({ x: x + 4, y: 4, w: 4, h: 4, fill: FOREGROUND });
      } else if (k < 0.7) rects.push({ x, y: 3, w: 8, h: 2, fill: FOREGROUND });
    }
  } else if (kind === 'ruler') {
    for (let x = 0; x < width; x += 4) {
      if (next() < 0.12) continue;
      const big = x % 32 === 0;
      const mid = x % 16 === 0;
      const h = big ? 8 : mid ? 5 : 2 + Math.floor(next() * 2);
      rects.push({
        x: x + (next() < 0.08 ? 1 : 0),
        y: 8 - h,
        w: 1,
        h,
        fill: FOREGROUND,
      });
    }
  } else {
    const never: never = kind;
    return never;
  }

  return d.length > 0 ? { rects, d } : { rects };
}
