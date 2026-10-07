import type { ReactNode } from 'react';

export type RuleKind = 'trace' | 'scale' | 'block-noise' | 'dither';

type Frame = {
  readonly viewBox: string;
  readonly height: number;
};

const tracePath =
  'M0 13 H36 L44 11 L52 15 L60 12 H108 L116 16 L124 10 L132 14 L140 12 H188 L196 15 L204 9 L212 14 H260 L268 12 L280 17 L292 8 L304 14 L316 12 H364 L372 15 L380 11 L388 13 H436 L444 10 L452 16 L460 12 H508 L516 14 L524 11 L536 18 L548 9 L560 14 H608 L616 12 L624 15 L632 13 H640';

const scaleHeights = [
  9, 3, 5, 2, 7, 4, 0, 11, 3, 2, 6, 4, 8, 0, 0, 5, 2, 9, 3, 4, 7, 2, 0, 6, 3, 10, 2, 4, 8, 3, 0,
  4, 7, 2, 5, 11, 3, 6, 0, 0, 8, 2, 4, 9, 3, 5, 2, 7, 0, 3, 6, 10, 2, 4, 8, 3, 0, 5, 2, 7, 4, 9, 3,
  6, 0, 11, 2, 4, 8, 3, 5, 7, 2, 0, 0, 6, 3, 9, 4, 2, 8,
] as const;

const blockNoise = [
  { x: 0, w: 36, fill: '#5c5a56' },
  { x: 42, w: 12, fill: '#a8602a' },
  { x: 60, w: 22, fill: '#8a8680' },
  { x: 88, w: 8, fill: '#3070e0' },
  { x: 102, w: 40, fill: '#3f3d3a' },
  { x: 148, w: 14, fill: '#e04070' },
  { x: 168, w: 28, fill: '#5c5a56' },
  { x: 202, w: 10, fill: '#f0b020' },
  { x: 218, w: 18, fill: '#8a8680' },
  { x: 242, w: 8, fill: '#a8602a' },
  { x: 256, w: 46, fill: '#3f3d3a' },
  { x: 308, w: 12, fill: '#3070e0' },
  { x: 326, w: 20, fill: '#5c5a56' },
  { x: 352, w: 8, fill: '#e04070' },
  { x: 366, w: 32, fill: '#8a8680' },
  { x: 404, w: 14, fill: '#f0b020' },
  { x: 424, w: 24, fill: '#3f3d3a' },
  { x: 454, w: 10, fill: '#a8602a' },
  { x: 470, w: 36, fill: '#5c5a56' },
  { x: 512, w: 8, fill: '#3070e0' },
  { x: 526, w: 18, fill: '#e04070' },
  { x: 550, w: 28, fill: '#8a8680' },
  { x: 584, w: 12, fill: '#f0b020' },
  { x: 602, w: 38, fill: '#3f3d3a' },
] as const;

const ditherRows = [
  '####.##.####..#...#.....##.####.##.####....#...#..####.##.####..#...#.....##.####.##.##',
  '#.##.#.##.#.#....#...#...#.##.#.##.#.#........#...#.##.#.##.#.#....#...#...#.##.#.##.#.',
  '##.####.##.####.##....#..##.####.##.####........##.####.##.####.##....#..##.####.##.###',
  '.#...#....#..#......#.....#...#....#..............#...#....#..#......#.....#...#....#..',
  '####.##.####..#...#.....##.####.##.####....#...#..####.##.####..#...#.....##.####.##.##',
] as const;

const frames: Record<Exclude<RuleKind, 'dither'>, Frame> = {
  trace: { viewBox: '0 0 640 24', height: 16 },
  scale: { viewBox: `0 0 ${scaleHeights.length * 8} 16`, height: 16 },
  'block-noise': { viewBox: '0 0 640 8', height: 8 },
};

export function Rule({ kind }: { kind: RuleKind }): ReactNode {
  if (kind === 'dither') return <DitherRule />;
  const frame = frames[kind];
  return (
    <svg
      viewBox={frame.viewBox}
      width="100%"
      height={frame.height}
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block text-foreground"
    >
      {shapes(kind)}
    </svg>
  );
}

function DitherRule(): ReactNode {
  const cell = 2;
  const width = ditherRows[0].length * cell;
  const height = ditherRows.length * cell;
  return (
    <svg width="100%" height={height} aria-hidden="true" className="block text-foreground">
      <defs>
        <pattern id="rule-dither" width={width} height={height} patternUnits="userSpaceOnUse">
          {ditherCells(cell)}
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#rule-dither)" />
    </svg>
  );
}

function ditherCells(cell: number): ReactNode {
  return ditherRows.flatMap((row, y) =>
    [...row].flatMap((mark, x) =>
      mark === '#' ? (
        <rect
          key={`${x}-${y}`}
          x={x * cell}
          y={y * cell}
          width={cell}
          height={cell}
          fill="currentColor"
        />
      ) : (
        []
      ),
    ),
  );
}

function shapes(kind: Exclude<RuleKind, 'dither'>): ReactNode {
  switch (kind) {
    case 'trace':
      return (
        <path
          d={tracePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      );
    case 'scale':
      return scaleHeights.flatMap((height, index) => {
        if (height === 0) return [];
        return (
          <line
            key={index}
            x1={index * 8}
            x2={index * 8}
            y1={16 - height}
            y2={16}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        );
      });
    case 'block-noise':
      return blockNoise.map((block) => (
        <rect key={block.x} x={block.x} y="0" width={block.w} height="8" fill={block.fill} />
      ));
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
}
