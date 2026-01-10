'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  NavigationMenuLink,
  NavigationMenuList,
} from 'fumadocs-ui/components/ui/navigation-menu';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import type { ReactNode } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Menu, MenuContent, MenuLinkItem, MenuTrigger } from './menu';
import { Navbar, NavbarMenuLink } from './navbar';

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

const SearchToggleButton = ({
  className,
  hideIfDisabled,
}: {
  className?: string;
  hideIfDisabled?: boolean;
}) => {
  const { enabled, setOpenSearch } = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type='button'
      className={cn(
        buttonVariants({ color: 'ghost', size: 'icon' }),
        className,
      )}
      data-search=''
      onClick={() => setOpenSearch(true)}
      aria-label='Open search'
    >
      <Search className='size-4' />
    </button>
  );
};

const LargeSearchToggleButton = ({
  className,
  hideIfDisabled,
}: {
  className?: string;
  hideIfDisabled?: boolean;
}) => {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type='button'
      data-search-full=''
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
        className,
      )}
      onClick={() => setOpenSearch(true)}
      aria-label='Open search'
    >
      <Search className='size-4' />
      {text.search}
      <div className='ms-auto inline-flex gap-0.5'>
        {hotKey.map((key: { display: ReactNode }, index: number) => (
          <kbd
            key={index.toString()}
            className='rounded-md border bg-fd-background px-1.5'
          >
            {key.display}
          </kbd>
        ))}
      </div>
    </button>
  );
};

export const Header = ({
  nav: { ...nav } = {},
  i18n = false,
  finalLinks,
}: HomeLayoutProps & {
  finalLinks: LinkItemType[];
}) => {
  const navItems = finalLinks.filter((item: LinkItemType) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );
  const menuItems = finalLinks.filter((item: LinkItemType) =>
    ['menu', 'all'].includes(item.on ?? 'all'),
  );

  return (
    <Navbar>
      <Link
        href={nav.url ?? '/'}
        className='inline-flex items-center gap-2.5 font-semibold'
      >
        {nav.title}
      </Link>
      {nav.children}
      <NavigationMenuList className='ml-2 flex flex-row items-center gap-2 max-sm:hidden'>
        {navItems
          .filter((item: LinkItemType) => !isSecondary(item))
          .map((item: LinkItemType, index: number) => (
            <NavbarLinkItem
              key={index.toString()}
              item={item}
              className='text-sm'
            />
          ))}
      </NavigationMenuList>
      <div className='flex flex-1 flex-row items-center justify-end lg:gap-1.5'>
        <SearchToggleButton className='lg:hidden' hideIfDisabled />
        <LargeSearchToggleButton
          className='w-full max-w-[240px] max-lg:hidden'
          hideIfDisabled
        />
        {navItems
          .filter(isSecondary)
          .map((item: LinkItemType, index: number) => (
            <NavbarLinkItem
              key={index.toString()}
              item={item}
              className='-me-1.5 max-lg:hidden'
            />
          ))}
        <Menu className='lg:hidden'>
          <MenuTrigger className='group -me-2'>
            <ChevronDown className='size-3 transition-transform duration-300 group-data-[state=open]:rotate-180' />
          </MenuTrigger>
          <MenuContent className='sm:flex-row sm:items-center sm:justify-end'>
            {menuItems
              .filter((item: LinkItemType) => !isSecondary(item))
              .map((item: LinkItemType, index: number) => (
                <MenuLinkItem
                  key={index.toString()}
                  item={item}
                  className='sm:hidden'
                />
              ))}
            <div className='-ms-1.5 flex flex-row items-center gap-1.5 max-sm:mt-2'>
              {menuItems
                .filter(isSecondary)
                .map((item: LinkItemType, index: number) => (
                  <MenuLinkItem
                    key={index.toString()}
                    item={item}
                    className='-me-1.5'
                  />
                ))}
              <div className='flex-1' />
              {i18n ? null : null}
            </div>
          </MenuContent>
        </Menu>
      </div>
    </Navbar>
  );
};

const NavbarLinkItem = ({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) => {
  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  if (item.type === 'menu') {
    const children = item.items.map((child: LinkItemType, index: number) => {
      if (child.type === 'custom')
        return <div key={index.toString()}>{child.children}</div>;

      const menuConfig = ('menu' in child ? child.menu : undefined) as
        | { banner?: ReactNode; footer?: ReactNode }
        | undefined;
      const { banner, footer, ...rest } = menuConfig ?? {};

      return (
        <NavbarMenuLink key={index.toString()} href={child.url} {...rest}>
          {banner ??
            (child.icon ? (
              <div className='w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4'>
                {child.icon}
              </div>
            ) : null)}
          <p className='-mb-1 font-medium text-sm'>{child.text}</p>
          {'description' in child && child.description ? (
            <p className='text-[13px] text-fd-muted-foreground'>
              {child.description}
            </p>
          ) : null}
          {footer}
        </NavbarMenuLink>
      );
    });

    return (
      <NavbarMenu>
        <NavbarMenuTrigger {...props}>
          {item.url ? <Link href={item.url}>{item.text}</Link> : item.text}
        </NavbarMenuTrigger>
        <NavbarMenuContent className='container border-border border-dashed sm:border-x'>
          {children}
        </NavbarMenuContent>
      </NavbarMenu>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        href={item.url}
        external={item.external}
        className={cn(navItemVariants({ variant: item.type }), props.className)}
        aria-label={item.type === 'icon' ? item.label : undefined}
      >
        {item.type === 'icon' ? item.icon : item.text}
      </Link>
    </NavigationMenuLink>
  );
};

const isSecondary = (item: LinkItemType): boolean => {
  return (
    ('secondary' in item && item.secondary === true) || item.type === 'icon'
  );
};
