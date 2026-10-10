import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { collectTags, filterArticlesByTags, parseTagQuery } from '@/lib/blog';
import type { ArticleSummary } from '@/lib/types';
import { useLayoutEffect, useState } from 'react';
import { Rule } from '../Rule';
import { TagLink } from './TagLink';

const filterTag =
  'h-auto min-h-0 min-w-0 rounded-none border-0 bg-transparent p-0 px-0 py-0 text-sm font-normal text-muted-foreground no-underline shadow-none underline-offset-4 decoration-1 hover:border-0 hover:bg-transparent hover:text-muted-foreground hover:underline focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-[3px] focus-visible:ring-offset-background data-[state=on]:border-0 data-[state=on]:bg-transparent data-[state=on]:text-foreground data-[state=on]:underline data-[state=on]:hover:border-0 data-[state=on]:hover:bg-transparent data-[state=on]:hover:text-foreground data-[state=on]:hover:underline aria-pressed:border-0 aria-pressed:bg-transparent aria-pressed:text-foreground aria-pressed:underline';

type Props = {
  articles: readonly ArticleSummary[];
};

function sameTags(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((tag, index) => tag === b[index]);
}

export function TagFilter({ articles }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useLayoutEffect(() => {
    const sync = () => {
      const next = parseTagQuery(window.location.search);
      setSelected((current) => (sameTags(current, next) ? current : next));
    };
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, []);

  const tags = collectTags(articles);
  const visible = filterArticlesByTags(articles, selected);

  return (
    <>
      <section className="pt-4 pb-4">
        <h1 className="mt-0 mb-0 text-sm font-normal">記事</h1>
        <div
          className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
          role="group"
          aria-label="タグで絞り込む"
        >
          <Toggle
            pressed={selected.length === 0}
            onPressedChange={() => setSelected((current) => (current.length === 0 ? current : []))}
            className={filterTag}
          >
            すべて
          </Toggle>
          <ToggleGroup
            multiple
            value={selected}
            onValueChange={setSelected}
            spacing={3}
            className="w-fit flex-wrap gap-x-3 gap-y-1"
          >
            {tags.map((tag) => (
              <ToggleGroupItem
                key={tag}
                value={tag}
                className={filterTag}
              >
                {`#${tag}`}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </section>
      <Rule kind="trace" seed={2} />
      <section className="pt-4 pb-4">
        {visible.length === 0 ? (
          <p>該当する記事はありません。</p>
        ) : (
          visible.map((article) => (
            <div key={article.url} className="py-1.5">
              <a className="text-foreground link leading-5" href={article.url}>
                {article.title}
              </a>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                <time dateTime={article.iso}>{article.date}</time>
                {article.tags.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
