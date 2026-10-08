import { Badge } from '@/components/ui/badge';
import { mono, quietLink } from '@/lib/face';
import { tagListHref } from '@/lib/posts';

const tagClass = `${mono} ${quietLink} text-[12px]`;

type Props = {
  tag: string;
};

export function TagLink({ tag: name }: Props) {
  return (
    <Badge variant="link" className={tagClass} render={<a href={tagListHref(name)} />}>
      {`#${name}`}
    </Badge>
  );
}
