import Link from 'fumadocs-core/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'fumadocs-ui/components/ui/navigation-menu';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import {
  type LinkItemType,
  resolveLinkItems,
} from 'fumadocs-ui/layouts/shared';
import { ChevronDown } from 'lucide-react';
import {
  LargeSearchToggle,
  Menu,
  MenuContent,
  MenuLinkItem,
  MenuTrigger,
  SearchToggle,
} from './menu';
import { Navbar, NavbarMenuLink } from './navbar';

export const Header = ({
  nav = {},
  links = [],
  githubUrl,
  searchToggle = {},
}: HomeLayoutProps) => {
  const enableSearch = searchToggle.enabled !== false;
  const finalLinks = resolveLinkItems({ links, githubUrl });
  const navItems = finalLinks.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );
  const menuItems = finalLinks.filter((item) =>
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
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavbarLinkItem
              key={i.toString()}
              item={item}
              className='text-sm'
            />
          ))}
      </NavigationMenuList>
      <div className='flex flex-1 flex-row items-center justify-end lg:gap-1.5'>
        {enableSearch ? (
          <>
            <SearchToggle className='lg:hidden' hideIfDisabled />
            <LargeSearchToggle
              className='w-full max-w-[240px] max-lg:hidden'
              hideIfDisabled
            />
          </>
        ) : null}
        {navItems.filter(isSecondary).map((item, i) => (
          <NavbarLinkItem
            key={i.toString()}
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
              .filter((item) => !isSecondary(item))
              .map((item, i) => (
                <MenuLinkItem
                  key={i.toString()}
                  item={item}
                  className='sm:hidden'
                />
              ))}
            <div className='-ms-1.5 flex flex-row items-center gap-1.5 max-sm:mt-2'>
              {menuItems.filter(isSecondary).map((item, i) => (
                <MenuLinkItem
                  key={i.toString()}
                  item={item}
                  className='-me-1.5'
                />
              ))}
              <div className='flex-1' />
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
    const children = item.items.map((child, index) => {
      if (child.type === 'custom')
        return <div key={index.toString()}>{child.children}</div>;

      if (!('url' in child) || !child.url) return null;

      const menuOptions = 'menu' in child ? child.menu : undefined;
      const banner = menuOptions?.banner;

      return (
        <NavbarMenuLink
          key={index.toString()}
          href={child.url}
          className={menuOptions?.className}
        >
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
        </NavbarMenuLink>
      );
    });

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={props.className}>
          {'url' in item && item.url ? (
            <Link href={item.url}>{item.text}</Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className='container border-border border-dashed sm:border-x'>
          {children}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return <MenuLinkItem item={item} {...props} />;
};

const isSecondary = (item: LinkItemType): boolean => {
  return (
    ('secondary' in item && item.secondary === true) || item.type === 'icon'
  );
};
