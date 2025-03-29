import { title as homeTitle } from '@/app/layout.config';
import { owner } from '@/app/layout.config';
import { baseUrl } from '@/lib/constants';
import type { Post } from '@/lib/source';
import type { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';

export const PostJsonLd = ({ page }: { page: Post }) => {
  if (!page) {
    return null;
  }

  const url = new URL(page.url, baseUrl.href).href;

  const post: BlogPosting = {
    '@type': 'BlogPosting',
    headline: page.data.title,
    description: page.data.description,
    image: new URL(`/og/${page.slugs.join('/')}/image.png`, baseUrl.href).href,
    datePublished: new Date(page.data.date).toISOString(),
    dateModified: page.data.lastModified
      ? new Date(page.data.lastModified).toISOString()
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: page.data.author,
      // url: 'https://techwithanirudh.com/',
    },
    publisher: {
      '@type': 'Person',
      name: owner,
      url: 'https://techwithanirudh.com/',
    },
  };

  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeTitle,
        item: baseUrl.href,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${homeTitle} | Posts`,
        item: new URL('/posts', baseUrl.href).href,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.data.title,
        item: url,
      },
    ],
  };

  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [post, breadcrumbList],
  };

  return (
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};

export const TagJsonLd = ({ tag }: { tag: string }) => {
  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeTitle,
        item: baseUrl.href,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${homeTitle} | Tags`,
        item: new URL('/tags', baseUrl.href).href,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${homeTitle} | Posts tagged with ${tag}`,
        item: new URL(`/tags/${tag}`, baseUrl.href).href,
      },
    ],
  };

  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbList],
  };

  return (
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};
