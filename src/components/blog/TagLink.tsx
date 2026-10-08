import { Badge } from '@/components/ui/badge';
import { tagListHref } from '@/lib/posts';

type Props = {
  tag: string;
};

export function TagLink({ tag: name }: Props) {
  return (
    <Badge
      variant="link"
      className="link font-mono text-xs"
      render={<a href={tagListHref(name)} />}
    >
      {`#${name}`}
    </Badge>
  );
}
