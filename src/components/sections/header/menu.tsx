'use client';

import { cva } from 'class-variance-authority';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import {
  type ButtonProps,
  buttonVariants,
} from 'fumadocs-ui/components/ui/button';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from 'fumadocs-ui/components/ui/navigation-menu';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { cn } from 'fumadocs-ui/utils/cn';
import { isActive } from 'fumadocs-ui/utils/is-active';
import { Search } from 'lucide-react';
import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

const menuItemVariants = cva('', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-2 py-1.5 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4',
      icon: buttonVariants({
        size: 'icon',
        color: 'ghost',
      }),
      button: buttonVariants({
        color: 'secondary',
        className: 'gap-1.5 [&_svg]:size-4',
      }),
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

const LinkItem = ({
  item,
  ...props
}: ComponentPropsWithoutRef<'a'> & { item: LinkItemType }) => {
  const pathname = usePathname();
  const activeType = 'active' in item ? (item.active ?? 'url') : 'url';
  const url = 'url' in item ? item.url : undefined;
  const active =
    activeType !== 'none' && url
      ? isActive(url, pathname, activeType === 'nested-url')
      : false;

  if (!url) return null;

  return (
    <Link
      {...props}
      href={url}
      external={'external' in item ? item.external : undefined}
      data-active={active}
    >
      {props.children}
    </Link>
  );
};

export const MenuLinkItem = ({
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
          {'url' in item && item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url}>{header}</Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MenuLinkItem key={i.toString()} item={child} />
        ))}
      </div>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <LinkItem
        item={item}
        className={cn(
          menuItemVariants({ variant: item.type }),
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

export const Menu = NavigationMenuItem;

export const MenuTrigger = ({
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuTrigger> & {}) => {
  return (
    <NavigationMenuTrigger
      {...props}
      className={cn(
        buttonVariants({
          size: 'icon',
          color: 'ghost',
        }),
        props.className,
      )}
    >
      {props.children}
    </NavigationMenuTrigger>
  );
};

export const MenuContent = (
  props: ComponentPropsWithoutRef<typeof NavigationMenuContent>,
) => {
  return (
    <NavigationMenuContent
      {...props}
      className={cn('flex flex-col p-4', props.className)}
    >
      {props.children}
    </NavigationMenuContent>
  );
};

interface SearchToggleProps
  extends Omit<ComponentProps<'button'>, 'color'>,
    ButtonProps {
  hideIfDisabled?: boolean;
}

export const SearchToggle = ({
  hideIfDisabled,
  size = 'icon-sm',
  color = 'ghost',
  ...props
}: SearchToggleProps) => {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type='button'
      className={cn(
        buttonVariants({
          size,
          color,
        }),
        props.className,
      )}
      data-search=''
      aria-label='Open Search'
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
};

export const LargeSearchToggle = ({
  hideIfDisabled,
  ...props
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) => {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type='button'
      data-search-full=''
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-fd-muted-foreground text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className='size-4' />
      {text.search}
      <div className='ms-auto inline-flex gap-0.5'>
        {hotKey.map((key, i) => (
          <kbd
            key={i.toString()}
            className='rounded-md border bg-fd-background px-1.5'
          >
            {key.display}
          </kbd>
        ))}
      </div>
    </button>
  );
};
