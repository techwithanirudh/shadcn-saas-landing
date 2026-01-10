'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';
import { ViewTransition } from 'react';
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
      disableTransitionOnChange
      enableSystem
    >
      <ProgressProvider
        color='var(--color-primary)'
        delay={1000}
        height='2px'
        options={{
          showSpinner: false,
        }}
        shallowRouting
        startOnLoad
        stopDelay={1000}
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
