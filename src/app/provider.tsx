'use client';

import Analytics from '@/components/analytics';
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
    <RootProvider>
      <TooltipProvider>
        <ViewTransition>{children}</ViewTransition>
      </TooltipProvider>
      <Analytics />
    </RootProvider>
  );
}
