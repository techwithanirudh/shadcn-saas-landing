'use client';

import Analytics from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ProgressProvider } from '@bprogress/next/app';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { unstable_ViewTransition as ViewTransition } from 'react';

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
      <RootProvider
        theme={{
          enabled: false,
        }}
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
      </RootProvider>
    </ThemeProvider>
  );
}
