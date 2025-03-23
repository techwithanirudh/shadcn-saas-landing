import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Info, Mail, Newspaper, Rss, Tags, User } from 'lucide-react';

export const title = 'Blog';
export const description =
  'A blog about web development, software engineering, and the latest technologies.';
export const owner = 'Anirudh Sriram';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: 'https://github.com/techwithanirudh/blog',
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Info />,
    text: 'About',
    url: '/about',
    active: 'url',
  },
  {
    icon: <Newspaper />,
    text: 'Posts',
    url: '/posts',
    active: 'url',
  },
  {
    icon: <Tags />,
    text: 'Tags',
    url: '/tags',
    active: 'url',
  },
  {
    type: 'icon',
    label: 'rss',
    icon: <Rss />,
    text: 'RSS',
    url: '/api/rss.xml',
  },
];

export const postsPerPage = 5;
