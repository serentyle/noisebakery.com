import { ruleGeometry, ruleViewBox, type RuleKind } from '../lib/rule';

type Props = {
  kind: RuleKind;
};

export function RuleFigure({ kind }: Props) {
  const { rects, d } = ruleGeometry(kind);
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
