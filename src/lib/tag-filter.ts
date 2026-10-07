import {
  asTag,
  PILL_SENTINEL,
  type PostSummary,
  type Tag,
} from './post-summary.ts';

export type Selection =
  | { readonly kind: 'all' }
  | { readonly kind: 'some'; readonly tags: readonly [Tag, ...Tag[]] };

export function allTags(posts: readonly PostSummary[]): readonly Tag[] {
  const tags: Tag[] = [];
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }
  return tags;
}

export function parseSelection(search: string, known: readonly Tag[]): Selection {
  const tags: Tag[] = [];
  for (const raw of new URLSearchParams(search).getAll('tag')) {
    const minted = asTag(raw);
    if (minted === null || tags.includes(minted)) continue;
    tags.push(known.find((tag) => tag === minted) ?? minted);
  }
  return selectionOf(tags);
}

export function pillValue(selection: Selection): string[] {
  if (selection.kind === 'all') return [PILL_SENTINEL];
  return [...selection.tags];
}

export function applyPillValue(
  prev: Selection,
  next: readonly string[],
  known: readonly Tag[],
): Selection {
  if (prev.kind === 'some' && next.includes(PILL_SENTINEL)) return { kind: 'all' };
  const picked: Tag[] = [];
  for (const tag of known) {
    if (next.includes(tag)) picked.push(tag);
  }
  for (const raw of next) {
    const minted = asTag(raw);
    if (minted === null || picked.includes(minted)) continue;
    picked.push(minted);
  }
  return selectionOf(picked);
}

export function visiblePosts(
  posts: readonly PostSummary[],
  selection: Selection,
): readonly PostSummary[] {
  if (selection.kind === 'all') return posts;
  return posts.filter((post) => post.tags.some((tag) => selection.tags.includes(tag)));
}

function selectionOf(tags: readonly Tag[]): Selection {
  const [first, ...rest] = tags;
  if (first === undefined) return { kind: 'all' };
  return { kind: 'some', tags: [first, ...rest] };
}
