import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StoredTheme = 'light' | 'dark';

export function ThemeSwitch() {
  const [theme, setTheme] = useState<StoredTheme | null>(null);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setTheme(dark ? 'dark' : 'light');
  }, []);

  function flip() {
    if (theme === null) return;
    const next: StoredTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  let icon = null;
  if (theme === 'light') icon = <Sun />;
  if (theme === 'dark') icon = <Moon />;

  return (
    <Button variant="ghost" size="icon" aria-label="テーマを切り替える" onClick={flip}>
      {icon}
    </Button>
  );
}
