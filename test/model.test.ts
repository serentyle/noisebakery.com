import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { filterArticlesByTags, formatArticleDate, neighborsOf } from '../src/lib/blog.ts';
import type { ArticleSummary } from '../src/lib/types.ts';
import { copyrightLine } from '../src/lib/site.ts';

const articles: ArticleSummary[] = [
  {
    url: '/blog/a/',
    title: 'A',
    iso: '2026-10-05T00:00:00.000Z',
    date: '2026.10.05',
    tags: ['サイト', '日記'],
  },
  {
    url: '/blog/b/',
    title: 'B',
    iso: '2026-10-04T00:00:00.000Z',
    date: '2026.10.04',
    tags: ['サイト'],
  },
  {
    url: '/blog/c/',
    title: 'C',
    iso: '2026-10-03T15:00:00.000Z',
    date: '2026.10.04',
    tags: ['日記'],
  },
];

describe('formatArticleDate', () => {
  it('formats Tokyo calendar dates as YYYY.MM.DD', () => {
    assert.equal(formatArticleDate('2026-10-04T00:00:00.000Z'), '2026.10.04');
    assert.equal(formatArticleDate('2026-10-03T15:00:00.000Z'), '2026.10.04');
  });
});

describe('copyrightLine', () => {
  it('uses the Tokyo calendar year', () => {
    assert.equal(copyrightLine(new Date('2025-12-31T15:00:00.000Z')), '© 2026 noisebakery.com');
    assert.equal(copyrightLine(new Date('2025-12-31T14:59:00.000Z')), '© 2025 noisebakery.com');
  });
});

describe('neighborsOf', () => {
  const summaries: ArticleSummary[] = [
    {
      url: '/blog/new/',
      title: '新しい',
      iso: '2026-10-05T00:00:00.000Z',
      date: '2026.10.05',
      tags: [],
    },
    {
      url: '/blog/mid/',
      title: '中間',
      iso: '2026-10-04T00:00:00.000Z',
      date: '2026.10.04',
      tags: [],
    },
    {
      url: '/blog/old/',
      title: '古い',
      iso: '2026-10-03T00:00:00.000Z',
      date: '2026.10.03',
      tags: [],
    },
  ];

  it('lists the older article first and omits a missing side', () => {
    assert.deepEqual(neighborsOf(summaries, 1), [
      { url: '/blog/old/', title: '古い', label: '前の記事' },
      { url: '/blog/new/', title: '新しい', label: '次の記事' },
    ]);
    assert.deepEqual(neighborsOf(summaries, 0), [
      { url: '/blog/mid/', title: '中間', label: '前の記事' },
    ]);
    assert.deepEqual(neighborsOf(summaries, 2), [
      { url: '/blog/mid/', title: '中間', label: '次の記事' },
    ]);
  });
});

describe('filterArticlesByTags', () => {
  it('shows every article for an empty selection, ORs one or more tags, and drops an unknown tag', () => {
    assert.deepEqual(
      filterArticlesByTags(articles, []).map((article) => article.title),
      ['A', 'B', 'C'],
    );
    assert.deepEqual(
      filterArticlesByTags(articles, ['日記']).map((article) => article.title),
      ['A', 'C'],
    );
    assert.deepEqual(
      filterArticlesByTags(articles, ['サイト', '日記']).map((article) => article.title),
      ['A', 'B', 'C'],
    );
    assert.deepEqual(filterArticlesByTags(articles, ['unknown']), []);
  });
});
