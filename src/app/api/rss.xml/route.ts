import { description, title } from '@/app/layout.config';
import { owner } from '@/app/layout.config';
import { baseUrl } from '@/lib/metadata';
import { getPosts } from '@/lib/source';
import { Feed } from 'feed';

export const dynamic = 'force-static';

const escapeForXML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

export const GET = () => {
  const feed = new Feed({
    title,
    description,
    id: baseUrl.href,
    copyright: owner,
    link: baseUrl.href,
    feed: new URL('/api/rss.xml', baseUrl).href,
    language: 'en',
    updated: new Date(),
    favicon: new URL('/favicon.ico', baseUrl).href,
  });

  const posts = getPosts();

  for (const post of posts) {
    feed.addItem({
      title: post.data.title,
      description: post.data.description,
      link: new URL(post.url, baseUrl).href,
      image: {
        title: post.data.title,
        type: 'image/png',
        url: escapeForXML(
          new URL(`/og/${post.slugs.join('/')}/image.png`, baseUrl.href).href,
        ),
      },
      date: post.data.date,
      author: [
        {
          name: post.data.author,
          // link: new URL('/about', baseUrl).href,
        },
      ],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
