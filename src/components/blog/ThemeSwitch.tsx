import { Button } from '@/components/ui/button';

export function ThemeSwitch() {
  function flip() {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    localStorage.setItem('theme', next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11 -mr-[13px] cursor-pointer border-0 bg-transparent p-0 text-muted-foreground shadow-none hover:bg-transparent hover:text-muted-foreground focus-visible:ring-0 active:translate-y-0 dark:bg-transparent dark:hover:bg-transparent"
      aria-label="ライト／ダーク切替"
      onClick={flip}
    >
      <svg
        className="hidden size-[17px] dark:block"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="size-[17px] dark:hidden"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    </Button>
  );
}
