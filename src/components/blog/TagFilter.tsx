import { useEffect, useLayoutEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PostList } from '@/components/PostList';
import { Rule } from '@/components/Rule';
import { tagLabel, PILL_SENTINEL, type PostSummary } from '@/lib/post-summary';
import {
  allTags,
  applyPillValue,
  parseSelection,
  pillValue,
  visiblePosts,
  type Selection,
} from '@/lib/tag-filter';

type Props = {
  posts: readonly PostSummary[];
};

function sameSelection(a: Selection, b: Selection): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'all' || b.kind === 'all') return true;
  return a.tags.length === b.tags.length && a.tags.every((tag, index) => tag === b.tags[index]);
}

const pillClass =
  'h-7 rounded-full border border-foreground/25 bg-transparent px-3 font-normal text-foreground hover:bg-transparent hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:hover:bg-foreground data-[state=on]:hover:text-background';

export function TagFilter({ posts }: Props) {
  const tags = allTags(posts);
  const [selection, setSelection] = useState<Selection>({ kind: 'all' });

  useLayoutEffect(() => {
    const next = parseSelection(window.location.search, allTags(posts));
    setSelection((current) => (sameSelection(current, next) ? current : next));
  }, [posts]);

  useEffect(() => {
    const sync = () => {
      const next = parseSelection(window.location.search, allTags(posts));
      setSelection((current) => (sameSelection(current, next) ? current : next));
    };
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, [posts]);

  return (
    <div className="flex flex-col gap-8">
      <ToggleGroup
        multiple
        spacing={8}
        value={pillValue(selection)}
        onValueChange={(next) => {
          setSelection((current) => applyPillValue(current, next, tags));
        }}
        aria-label="タグで絞り込む"
        className="w-full flex-wrap"
      >
        <ToggleGroupItem value={PILL_SENTINEL} className={pillClass}>
          すべて
        </ToggleGroupItem>
        {tags.map((tag) => (
          <ToggleGroupItem key={tag} value={tag} className={pillClass}>
            {tagLabel(tag)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Rule kind="scale" />
      <PostList posts={visiblePosts(posts, selection)} meta="date-and-tags" />
    </div>
  );
}
