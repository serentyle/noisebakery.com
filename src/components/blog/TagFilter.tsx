import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { formatPostDate, type PostCard } from '@/lib/post-card';

type Props = {
  posts: readonly PostCard[];
};

export function TagFilter({ posts }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const tags: string[] = [];
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }
  const visible =
    selected.length === 0
      ? posts
      : posts.filter((post) => post.tags.some((tag) => selected.includes(tag)));

  return (
    <div className="flex flex-col gap-6">
      <ToggleGroup
        multiple
        value={selected}
        onValueChange={setSelected}
        aria-label="タグで絞り込む"
      >
        {tags.map((tag) => (
          <ToggleGroupItem key={tag} value={tag}>
            {tag}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {visible.length === 0 ? (
        <p>該当する記事はありません。</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {visible.map((post) => (
            <li key={post.url}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <a href={post.url}>{post.title}</a>
                  </CardTitle>
                  <CardDescription>
                    <time dateTime={post.pubDate}>{formatPostDate(post.pubDate)}</time>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p>{post.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="secondary">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
