'use client';

import { cva } from 'class-variance-authority';
import { Airplay, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { type HTMLAttributes, useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  }
);

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const container = cn(
    'relative flex items-center rounded-full p-1 ring-1 ring-border',
    className
  );

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeTheme = async (theme: Theme) => {
    function update() {
      setTheme(theme);
    }

    if (document.startViewTransition && theme !== resolvedTheme) {
      document.documentElement.style.viewTransitionName = 'theme-transition';
      await document.startViewTransition(update).finished;
      document.documentElement.style.viewTransitionName = '';
    } else {
      update();
    }
  };

  let value: string | null | undefined;

  if (!mounted) {
    value = null;
  } else if (mode === 'light-dark') {
    value = resolvedTheme;
  } else {
    value = currentTheme;
  }

  return (
    <div className={container} data-theme-toggle='' {...props}>
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = value === key;
        if (mode === 'light-dark' && key === 'system') {
          return null;
        }

        return (
          <button
            aria-label={label}
            className={itemVariants({ active: isActive })}
            key={key}
            onClick={() => {
              handleChangeTheme(key as Theme);
            }}
            type='button'
          >
            {isActive && (
              <motion.div
                className='absolute inset-0 rounded-full bg-accent'
                layoutId='activeTheme'
                transition={{
                  type: 'spring',
                  duration: 1.5,
                }}
              />
            )}
            <Icon
              className={'relative m-auto size-full'}
              fill={'currentColor'}
            />
          </button>
        );
      })}
    </div>
  );
}
