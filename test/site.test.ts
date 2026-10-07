import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { copyrightLine } from '../src/lib/site.ts';

describe('site', () => {
  it('uses the Tokyo year on the copyright line', () => {
    assert.equal(copyrightLine(new Date('2025-12-31T15:00:00Z')), '© 2026 noisebakery.com');
    assert.equal(copyrightLine(new Date('2025-12-31T14:59:00Z')), '© 2025 noisebakery.com');
  });
});