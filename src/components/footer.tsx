import { baseOptions, linkItems, title } from '@/app/layout.config';
import { owner } from '@/app/layout.config';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Link from 'next/link';
import React from 'react';
import { InlineLink } from './inline-link';

export function Footer() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all'),
  );

  return (
    <footer className='border-grid border-t py-6 md:py-0'>
      <div className='container-wrapper'>
        <div className='container mx-auto py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl font-bold'>{title}</span>
            </div>

            <nav className='flex flex-wrap justify-end gap-4 md:gap-8'>
              {navItems
                .filter(
                  (item) =>
                    item.type !== 'menu' &&
                    item.type !== 'custom' &&
                    item.type !== 'icon',
                )
                .map((item, i) => (
                  <InlineLink
                    key={i.toString()}
                    href={item.url}
                    className='hover:text-foreground/80 text-foreground no-underline uppercase text-sm font-medium transition-colors'
                  >
                    {item.text}
                  </InlineLink>
                ))}
            </nav>
          </div>

          <div className='mt-8 text-center md:text-left text-sm text-gray-500'>
            © {new Date().getFullYear()} {owner}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
