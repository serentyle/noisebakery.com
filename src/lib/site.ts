export const siteName = 'noisebakery.com';
export const siteDescription = 'noisebakery.com の記事';

export function copyrightLine(now: Date): string {
  const year =
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
    })
      .formatToParts(now)
      .find((part) => part.type === 'year')?.value ?? '';
  return `© ${year} ${siteName}`;
}
