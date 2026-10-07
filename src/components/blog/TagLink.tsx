import { Badge } from '@/components/ui/badge';
import { tag } from '@/lib/face';
import { tagListHref } from '@/lib/posts';

type Props = {
  tag: string;
};

export function TagLink({ tag: name }: Props) {
  return (
    <Badge variant="link" className={tag} render={<a href={tagListHref(name)} />}>
      {`#${name}`}
    </Badge>
  );
}
