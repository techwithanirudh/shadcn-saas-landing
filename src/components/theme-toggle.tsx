'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Airplay, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { type HTMLAttributes, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const itemVariants = cva(
  'relative m-auto size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'bg-fd-accent text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

const themes = [
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
  {
    key: 'system',
    icon: Airplay,
    label: 'System theme',
  },
];

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLElement> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const container = cn(
    'inline-flex items-center rounded-full border p-1',
    className,
  );

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  };

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null;

    return (
      <button
        className={container}
        aria-label={'Toggle Theme'}
        onClick={() => handleChangeTheme(value === 'light' ? 'dark' : 'light')}
        data-theme-toggle=''
        {...props}
      >
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = value === key;
          if (key === 'system') return;

          return (
            <div className='relative' key={key}>
              {isActive && (
                <motion.div
                  layoutId='activeTheme'
                  className='absolute inset-0 rounded-full bg-muted'
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <Icon
                fill='currentColor'
                className={cn(itemVariants({ active: isActive }))}
              />
            </div>
          );
        })}
      </button>
    );
  }

  const value = mounted ? currentTheme : null;

  return (
    <div className={container} data-theme-toggle='' {...props}>
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = value === key;

        return (
          <button
            type='button'
            key={key}
            aria-label={label}
            className={cn(itemVariants({ active: value === key }))}
            onClick={() => handleChangeTheme(key as Theme)}
          >
            {isActive && (
              <motion.div
                layoutId='activeTheme'
                className='absolute inset-0 rounded-full bg-muted'
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative m-auto size-full',
                isActive
                  ? 'text-fd-accent-foreground'
                  : 'text-fd-muted-foreground',
              )}
              fill='currentColor'
            />
          </button>
        );
      })}
    </div>
  );
}
