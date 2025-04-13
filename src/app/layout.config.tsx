import { Icons } from '@/components/icons/icons';
import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const title = 'AI Tutor';
export const description =
  'A smarter way to learn — with your personal AI tutor.';
export const owner = 'Anirudh Sriram';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: 'https://github.com/techwithanirudh/ai-tutor',
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: 'About',
    url: '/about',
    active: 'url',
  },
  {
    icon: <Icons.pricing />,
    text: 'Pricing',
    url: '/pricing',
    active: 'url',
  },
  {
    icon: <Icons.phone />,
    text: 'Contact',
    url: '/contact',
    active: 'url',
  },
  {
    type: 'menu',
    text: 'Blog',
    items: [
      {
        text: 'Posts',
        description: 'View all blog posts',
        url: '/blog',
        icon: <Icons.posts />,
      },
      {
        text: 'Tags',
        description: 'View blog posts by tags',
        url: '/tags',
        icon: <Icons.tags />,
      },
      {
        text: 'Newsletter',
        description: 'Subscribe to our newsletter',
        url: '/newsletter',
        icon: <Icons.mail />,
      },
    ],
  },
];

export const postsPerPage = 5;
