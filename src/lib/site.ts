export const siteName = 'noisebakery.com';
export const siteDescription = 'noisebakery.com の記事';
export const siteWordmark = 'noisebakery';

const tokyoYear = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
});

export function copyrightLine(now: Date): string {
  return `© ${tokyoYear.format(now)} ${siteName}`;
}
