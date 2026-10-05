import { Badge } from '@/components/ui/badge';
import { tagListHref } from '@/lib/post-card';

type Props = {
  tag: string;
};

export function TagLink({ tag }: Props) {
  return (
    <Badge variant="secondary" render={<a href={tagListHref(tag)} />}>
      {tag}
    </Badge>
  );
}
