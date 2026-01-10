import { createSearchAPI } from 'fumadocs-core/search/server';
import { getPosts } from '@/lib/source';

export const { GET } = createSearchAPI('advanced', {
  indexes: getPosts().map((page) => ({
    title: page.data.title ?? 'Untitled',
    structuredData: page.data.structuredData,
    id: page.url,
    url: page.url,
  })),
});
