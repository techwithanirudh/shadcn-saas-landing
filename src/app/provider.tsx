'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ViewTransition } from 'react';
import type { ReactNode } from 'react';
import Analytics from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export function Provider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height='2px'
        color='var(--color-primary)'
        options={{
          showSpinner: false,
        }}
        stopDelay={1000}
        delay={1000}
        startOnLoad
        shallowRouting
      >
        <TooltipProvider>
          <ViewTransition>{children}</ViewTransition>
        </TooltipProvider>
      </ProgressProvider>
      <Analytics />
      <Toaster />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
