'use client';

import Link, { type LinkProps } from 'fumadocs-core/link';
import { cn } from 'fumadocs-ui/components/api';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuViewport,
} from 'fumadocs-ui/components/ui/navigation-menu';
import { type HTMLAttributes, useState } from 'react';

export const Navbar = (props: HTMLAttributes<HTMLElement>) => {
  const [value, setValue] = useState('');

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id='nd-nav'
        {...props}
        className={cn(
          'sticky top-[var(--fd-banner-height)] z-30 box-content w-full bg-fd-background/80 backdrop-blur-lg transition-colors',
          'border-border/70 border-b border-dashed dark:border-border',
          // value.length > 0 ? 'shadow-lg' : 'shadow-xs',
          props.className,
        )}
      >
        <div
          className={cn(
            'container mx-auto flex size-full h-14 flex-row items-center px-4 md:gap-1.5 lg:px-6',
            'border-border/70 border-dashed sm:border-x dark:border-border',
          )}
        >
          {props.children}
        </div>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
};

export const NavbarMenuLink = (props: LinkProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        className={cn(
          'flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
          props.className,
        )}
      >
        {props.children}
      </Link>
    </NavigationMenuLink>
  );
};
