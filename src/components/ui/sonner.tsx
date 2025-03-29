'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--color-fd-popover)',
          '--normal-text': 'var(--color-fd-popover-foreground)',
          '--normal-border': 'var(--color-fd-border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
