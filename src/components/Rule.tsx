type RuleKind = 'trace' | 'dither';

type RuleRect = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
};

type RuleGeometry = {
  rects: RuleRect[];
  d?: string;
};

const RULE_WIDTH = 552;
const FOREGROUND = 'currentColor';

const ruleViewBox = `0 0 ${RULE_WIDTH} 8`;

function ruleGeometry(kind: RuleKind, seed: number): RuleGeometry {
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
  } else {
    const never: never = kind;
    return never;
  }

  return d.length > 0 ? { rects, d } : { rects };
}

type Props = {
  kind: RuleKind;
  seed: number;
};

export function Rule({ kind, seed }: Props) {
  const { rects, d } = ruleGeometry(kind, seed);
  return (
    <svg
      aria-hidden="true"
      viewBox={ruleViewBox}
      preserveAspectRatio="none"
      overflow="visible"
      className="block h-2 w-full overflow-visible text-foreground"
    >
      {rects.map((rect, index) => (
        <rect key={index} x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={rect.fill} />
      ))}
      {d ? (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}
