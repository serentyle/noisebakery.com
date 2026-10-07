export const sans = "font-['IBM_Plex_Sans_JP',system-ui,sans-serif]";
export const mono = "font-['IBM_Plex_Mono','IBM_Plex_Sans_JP',monospace]";

export const fg = 'text-[#222222] dark:text-[#E6E4DF]';
export const link = `${fg} underline-offset-4 decoration-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]`;
export const quietLink =
  'underline-offset-4 decoration-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]';

export const page = `relative min-h-screen overflow-hidden bg-[#F2F2F0] text-[16px] leading-[1.9] text-[#6B6A66] tabular-nums dark:bg-black dark:text-[#9C9A95] ${sans}`;
export const grain =
  'pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] dark:opacity-20';
export const column = 'relative mx-auto w-full max-w-[600px] px-6 pb-16';
export const header = 'flex items-center justify-between gap-4 pt-10';
export const wordmark = `flex min-h-11 items-center gap-2.5 ${fg}`;
export const wordmarkText = `${mono} text-[15px] font-semibold tracking-[-0.01em]`;
export const wordmarkRest = 'font-normal text-[#6B6A66] dark:text-[#9C9A95]';
export const nav = 'flex items-center gap-1 text-[15px]';
export const blogLink = `${quietLink} mr-1.5 py-2.5 aria-[current=page]:text-[#222222] dark:aria-[current=page]:text-[#E6E4DF]`;
export const themeButton =
  'size-11 -mr-[13px] cursor-pointer border-0 bg-transparent p-0 text-[#6B6A66] shadow-none hover:bg-transparent hover:text-[#6B6A66] focus-visible:ring-0 active:translate-y-0 dark:bg-transparent dark:text-[#9C9A95] dark:hover:bg-transparent dark:hover:text-[#9C9A95]';
export const rule = `block h-2 w-full overflow-visible ${fg}`;
export const copyright = 'pt-7 text-[13px]';

export const intro = 'pt-14 pb-10';
export const homeList = 'pt-7 pb-8';
export const pageLabel = 'mt-0 mb-0 text-[15px] font-normal';
export const sectionLabel = 'mt-0 mb-3 text-[15px] font-normal';
export const row = 'py-2.5';
export const homeTime = 'block text-[13px] leading-[1.6]';
export const allPosts = `${quietLink} mt-2.5 inline-block py-1.5 text-[14px]`;

export const blogHead = 'pt-14 pb-8';
export const pills = `mt-4 flex flex-wrap items-center gap-2 text-[13px] leading-none ${mono}`;
export const pill =
  'h-auto min-h-0 min-w-0 rounded-full border border-[#DCDBD6] bg-transparent px-3 py-2 text-[13px] font-normal text-[#222222] shadow-none hover:bg-transparent hover:text-[#222222] focus-visible:ring-0 data-[state=on]:border-[#222222] data-[state=on]:bg-[#222222] data-[state=on]:text-[#F2F2F0] aria-pressed:border-[#222222] aria-pressed:bg-[#222222] aria-pressed:text-[#F2F2F0] dark:border-[#262624] dark:text-[#E6E4DF] dark:hover:bg-transparent dark:hover:text-[#E6E4DF] dark:data-[state=on]:border-[#E6E4DF] dark:data-[state=on]:bg-[#E6E4DF] dark:data-[state=on]:text-black dark:aria-pressed:border-[#E6E4DF] dark:aria-pressed:bg-[#E6E4DF] dark:aria-pressed:text-black';
export const blogList = 'pt-4 pb-8';
export const byline = 'flex flex-wrap gap-3 text-[13px] leading-[1.6]';
export const tag = `${mono} ${quietLink} text-[12px]`;

export const entry = 'pt-14 pb-10';
export const entryTitle =
  'm-0 text-[26px] leading-[1.5] font-bold tracking-[-0.01em]';
export const meta =
  'mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px] leading-[1.6]';
export const hero = 'mt-6 block h-auto w-auto max-w-full';
export const prose =
  "mt-10 [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-[18px] [&_h2]:leading-[1.6] [&_h2]:font-bold [&_p]:mt-0 [&_p]:mb-6 [&_pre]:mb-6 [&_pre]:overflow-x-auto [&_pre]:bg-[#E6E5E1] [&_pre]:p-5 [&_pre]:font-['IBM_Plex_Mono','IBM_Plex_Sans_JP',monospace] [&_pre]:text-[13px] [&_pre]:leading-[1.75] dark:[&_pre]:bg-[#141414]";
export const neighbors = 'pt-[18px] pb-8';
export const neighborLabel = 'block text-[13px] leading-[1.6]';
