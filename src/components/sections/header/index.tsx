'use client';

import { cva } from 'class-variance-authority';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'fumadocs-ui/components/ui/navigation-menu';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import {
  type LinkItemType,
  type NavOptions,
  resolveLinkItems,
} from 'fumadocs-ui/layouts/shared';
import { cn } from 'fumadocs-ui/utils/cn';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import { ChevronDown } from 'lucide-react';
import { type ComponentProps, Fragment, useMemo, useState } from 'react';
import { LinkItem } from './link-item';
import { LargeSearchToggle, SearchToggle } from './search-toggle';
import { ThemeToggle } from './theme-toggle';

const navItemVariants = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 p-2 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      button: buttonVariants({
        color: 'secondary',
        className: 'gap-1.5',
      }),
      icon: buttonVariants({
        color: 'ghost',
        size: 'icon',
      }),
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export const Header = ({
  nav = {},
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {},
  className,
}: HomeLayoutProps & { className?: string }) => {
  const { navItems, menuItems } = useMemo(() => {
    const navItems: LinkItemType[] = [];
    const menuItems: LinkItemType[] = [];

    for (const item of resolveLinkItems({ links, githubUrl })) {
      switch (item.on ?? 'all') {
        case 'menu':
          menuItems.push(item);
          break;
        case 'nav':
          navItems.push(item);
          break;
        default:
          navItems.push(item);
          menuItems.push(item);
      }
    }

    return { navItems, menuItems };
  }, [links, githubUrl]);

  return (
    <HeaderNavigationMenu
      transparentMode={nav.transparentMode}
      className={className}
    >
      <Link
        href={nav.url ?? '/'}
        className='inline-flex items-center gap-2.5 font-semibold'
      >
        {nav.title}
      </Link>
      {nav.children}
      <ul className='flex flex-row items-center gap-2 px-3 max-sm:hidden'>
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavigationMenuLinkItem
              key={i.toString()}
              item={item}
              className='text-sm'
            />
          ))}
      </ul>
      <div className='flex flex-1 flex-row items-center justify-end gap-1.5 max-lg:hidden'>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ?? (
            <LargeSearchToggle
              className='w-full max-w-60 rounded-full ps-2.5'
              hideIfDisabled
            />
          ))}
        {themeSwitch.enabled !== false &&
          (themeSwitch.component ?? <ThemeToggle mode={themeSwitch?.mode} />)}
        <ul className='flex flex-row items-center gap-2 empty:hidden'>
          {navItems.filter(isSecondary).map((item, i) => (
            <NavigationMenuLinkItem
              key={i.toString()}
              className={cn(
                item.type === 'icon' && '-mx-1 first:ms-0 last:me-0',
              )}
              item={item}
            />
          ))}
        </ul>
      </div>
      <ul className='-me-1.5 ms-auto flex flex-row items-center lg:hidden'>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.sm ?? (
            <SearchToggle className='p-2' hideIfDisabled />
          ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label='Toggle Menu'
            className={cn(
              buttonVariants({
                size: 'icon',
                color: 'ghost',
                className: 'group [&_svg]:size-5.5',
              }),
            )}
            onPointerMove={
              nav.enableHoverToOpen
                ? undefined
                : (event) => event.preventDefault()
            }
          >
            <ChevronDown className='transition-transform duration-300 group-data-[state=open]:rotate-180' />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='flex flex-col p-4 sm:flex-row sm:items-center sm:justify-end'>
            {menuItems
              .filter((item) => !isSecondary(item))
              .map((item, i) => (
                <MobileNavigationMenuLinkItem
                  key={i.toString()}
                  item={item}
                  className='sm:hidden'
                />
              ))}
            <div className='-ms-1.5 flex flex-row items-center gap-2 max-sm:mt-2'>
              {menuItems.filter(isSecondary).map((item, i) => (
                <MobileNavigationMenuLinkItem
                  key={i.toString()}
                  item={item}
                  className={cn(item.type === 'icon' && '-mx-1 first:ms-0')}
                />
              ))}
              {themeSwitch.enabled !== false &&
                (themeSwitch.component ?? (
                  <ThemeToggle mode={themeSwitch?.mode} />
                ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </ul>
    </HeaderNavigationMenu>
  );
};

const HeaderNavigationMenu = ({
  transparentMode = 'none',
  ...props
}: ComponentProps<'div'> & {
  transparentMode?: NavOptions['transparentMode'];
}) => {
  const [value, setValue] = useState('');
  const isTop = useIsScrollTop({ enabled: transparentMode === 'top' }) ?? true;
  const isTransparent =
    transparentMode === 'top' ? isTop : transparentMode === 'always';

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id='nd-nav'
        {...props}
        className={cn('sticky top-0 z-40 box-content w-full bg-fd-background/80 transition-colors border-b border-dashed', props.className)}
      >
        <div
          className={cn(
            'backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--fd-layout-width)',
            // value.length > 0 && 'max-lg:rounded-b-2xl max-lg:shadow-lg',
            'border-border border-dashed sm:border-x container',
            (!isTransparent || value.length > 0) && 'bg-fd-background/80',
          )}
        >
          <NavigationMenuList
            className='flex h-14 w-full items-center px-4 lg:px-6'
            asChild
          >
            <nav>{props.children}</nav>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </div>
      </header>
    </NavigationMenu>
  );
};

const isSecondary = (item: LinkItemType): boolean => {
  return (
    ('secondary' in item && item.secondary === true) || item.type === 'icon'
  );
};

const NavigationMenuLinkItem = ({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) => {
  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  if (item.type === 'menu') {
    const children = item.items.map((child, j) => {
      if (child.type === 'custom') {
        return <Fragment key={j.toString()}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className='w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4'>
            {child.icon}
          </div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavigationMenuLink key={`${j}-${child.url}`} asChild>
          <Link
            href={child.url}
            external={child.external}
            {...rest}
            className={cn(
              'flex flex-col gap-2 rounded-lg border border-border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
              rest.className,
            )}
          >
            {rest.children ?? (
              <>
                {banner}
                <p className='font-medium text-base'>{child.text}</p>
                <p className='text-fd-muted-foreground text-sm empty:hidden'>
                  {child.description}
                </p>
              </>
            )}
          </Link>
        </NavigationMenuLink>
      );
    });

    return (
      <NavigationMenuItem {...props}>
        <NavigationMenuTrigger className={cn(navItemVariants(), 'rounded-md')}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className='grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3'>
          {children}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuLink asChild>
        <LinkItem
          item={item}
          aria-label={item.type === 'icon' ? item.label : undefined}
          className={cn(navItemVariants({ variant: item.type }))}
        >
          {item.type === 'icon' ? item.icon : item.text}
        </LinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileNavigationMenuLinkItem = ({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) => {
  if (item.type === 'custom')
    return <div className={cn('grid', props.className)}>{item.children}</div>;

  if (item.type === 'menu') {
    const header = (
      <>
        {item.icon}
        {item.text}
      </>
    );

    return (
      <div className={cn('mb-4 flex flex-col', props.className)}>
        <p className='mb-1 text-fd-muted-foreground text-sm'>
          {item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url} external={item.external}>
                {header}
              </Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MobileNavigationMenuLinkItem key={i.toString()} item={child} />
        ))}
      </div>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <LinkItem
        item={item}
        className={cn(
          {
            main: 'inline-flex items-center gap-2 py-1.5 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4',
            icon: buttonVariants({
              size: 'icon',
              color: 'ghost',
            }),
            button: buttonVariants({
              color: 'secondary',
              className: 'gap-1.5 [&_svg]:size-4',
            }),
          }[item.type ?? 'main'],
          props.className,
        )}
        aria-label={item.type === 'icon' ? item.label : undefined}
      >
        {item.icon}
        {item.type === 'icon' ? undefined : item.text}
      </LinkItem>
    </NavigationMenuLink>
  );
};
