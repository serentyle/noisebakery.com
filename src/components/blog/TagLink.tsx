import { Badge } from '@/components/ui/badge';

type Props = {
  tag: string;
};

export function TagLink({ tag: name }: Props) {
  return (
    <Badge
      variant="link"
      className="link font-mono text-xs"
      render={<a href={`/blog/?tag=${encodeURIComponent(name)}`} />}
    >
      {`#${name}`}
    </Badge>
  );
}
