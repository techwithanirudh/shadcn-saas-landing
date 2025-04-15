import {
  baseOptions,
  linkItems,
  owner,
  postsPerPage,
} from '@/app/layout.config';
import { InlineLink } from '@/components/inline-link';
import { getSortedByDatePosts, getTags } from '@/lib/source';
import { cn } from '@/lib/utils';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import { ActiveLink } from '../active-link';
import { UserButton } from '../auth/user-button';
import { ThemeToggle } from '../theme-toggle';

export function Footer() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );

  const posts = getSortedByDatePosts();
  const tags = getTags();

  return (
    <footer
      className={cn(
        'container mx-auto flex flex-col gap-4',
        'border-b border-dashed border-border',
        'gap-16 px-8 py-16',
      )}
    >
      <div
        className={cn(
          'grid gap-8 text-muted-foreground text-sm sm:grid-cols-5',
        )}
      >
        <div className='flex flex-col gap-6'>
          <p className='font-medium text-foreground'>Pages</p>

          <ul className='flex flex-col gap-3'>
            <li>
              <ActiveLink href={'/'}>Home</ActiveLink>
            </li>
            {navItems
              .filter(
                (item) =>
                  item.type !== 'menu' &&
                  item.type !== 'custom' &&
                  item.type !== 'icon',
              )
              .map((item, i) => (
                <li key={item.url}>
                  <ActiveLink key={i.toString()} href={item.url}>
                    {item.text}
                  </ActiveLink>
                </li>
              ))}
          </ul>
        </div>

        <div className='flex flex-col gap-6'>
          <p className='font-medium text-foreground'>Posts</p>

          <ul className='flex flex-col gap-3'>
            {posts.slice(0, postsPerPage).map((post, i) => (
              <li key={post.url}>
                <ActiveLink key={i.toString()} href={post.url}>
                  {post.data.title}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-6'>
          <p className='font-medium text-foreground'>Tags</p>

          <ul className='flex flex-col gap-3'>
            {tags.slice(0, postsPerPage).map((name, i) => (
              <li key={`/tags/${name}`}>
                <ActiveLink key={i.toString()} href={`/tags/${name}`}>
                  <span className='capitalize'>{name}</span>
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-6'>
          <p className='font-medium text-foreground'>Socials</p>

          <ul className='flex flex-col gap-3'>
            {navItems
              .filter((item) => item.type === 'icon')
              .map((item, i) => (
                <li key={item.url}>
                  <InlineLink
                    key={i.toString()}
                    href={item.url}
                    className='inline-flex items-center gap-1.5 text-muted-foreground no-underline [&_svg]:size-4'
                  >
                    {item.icon}
                    {item.text}
                  </InlineLink>
                </li>
              ))}
          </ul>
        </div>

        <div className='flex flex-col gap-6'>
          <p className='font-medium text-foreground'>Legal</p>

          <ul className='flex flex-col gap-3'>
            <li>
              <ActiveLink href={'/privacy'}>Privacy Policy</ActiveLink>
            </li>
            <li>
              <ActiveLink href={'/terms'}>Terms of Service</ActiveLink>
            </li>
          </ul>
        </div>
      </div>
      <Copyright />
    </footer>
  );
}

function Copyright() {
  return (
    <div className='grid items-center gap-4 sm:grid-cols-3'>
      <div className='w-min'>
        <UserButton />
      </div>
      <div className='flex items-center sm:justify-center'>
        <p className='whitespace-nowrap text-muted-foreground text-sm'>
          &copy; {new Date().getFullYear()} {owner}. All rights reserved.
        </p>
      </div>
      <div className='flex items-center sm:justify-end'>
        <ThemeToggle mode='light-dark' />
      </div>
    </div>
  );
}
