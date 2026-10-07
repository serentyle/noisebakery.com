import { Moon, Sun } from 'lucide-react';
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
    <Button variant="ghost" size="icon" aria-label="テーマを切り替える" onClick={flip}>
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
