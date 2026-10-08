import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatPostDate, neighborsOf, visiblePosts, type PostSummary } from '../src/lib/blog.ts';
import { ruleGeometry } from '../src/lib/rule.ts';
import { copyrightLine } from '../src/lib/site.ts';

const posts: PostSummary[] = [
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

describe('formatPostDate', () => {
  it('formats Tokyo calendar dates as YYYY.MM.DD', () => {
    assert.equal(formatPostDate('2026-10-04T00:00:00.000Z'), '2026.10.04');
    assert.equal(formatPostDate('2026-10-03T15:00:00.000Z'), '2026.10.04');
  });
});

describe('copyrightLine', () => {
  it('uses the Tokyo calendar year', () => {
    assert.equal(copyrightLine(new Date('2025-12-31T15:00:00.000Z')), '© 2026 noisebakery.com');
    assert.equal(copyrightLine(new Date('2025-12-31T14:59:00.000Z')), '© 2025 noisebakery.com');
  });
});

describe('ruleGeometry', () => {
  it('keeps the trace seed 3 path and the dither seed 1 rects', () => {
    const trace = ruleGeometry('trace');
    assert.equal(
      trace.d?.slice(0, 64),
      'M0,3.3L3,4.7L6,3.4L9,4.4L12,3.4L15,5.1L18,3.4L21,3.3L24,4.5L27,4',
    );

    const dither = ruleGeometry('dither');
    assert.equal(dither.rects.length, 430);
    for (const rect of dither.rects) {
      assert.equal(rect.fill, 'currentColor');
    }
  });
});

describe('neighborsOf', () => {
  const summaries: PostSummary[] = [
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

  it('lists the older post first and omits a missing side', () => {
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

describe('visiblePosts', () => {
  it('shows every post for an empty selection, ORs one or more tags, and drops an unknown tag', () => {
    assert.deepEqual(
      visiblePosts(posts, []).map((post) => post.title),
      ['A', 'B', 'C'],
    );
    assert.deepEqual(
      visiblePosts(posts, ['日記']).map((post) => post.title),
      ['A', 'C'],
    );
    assert.deepEqual(
      visiblePosts(posts, ['サイト', '日記']).map((post) => post.title),
      ['A', 'B', 'C'],
    );
    assert.deepEqual(visiblePosts(posts, ['unknown']), []);
  });
});
