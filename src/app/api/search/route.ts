import { createSearchAPI } from 'fumadocs-core/search/server';
import { getPosts } from '@/lib/source';

const emptyStructuredData = {
  headings: [],
  contents: [],
};

export const { GET } = createSearchAPI('advanced', {
  indexes: getPosts().map((page) => ({
    title: page.data.title ?? 'Untitled',
    structuredData:
      'structuredData' in page.data && page.data.structuredData
        ? page.data.structuredData
        : emptyStructuredData,
    id: page.url,
    url: page.url,
  })),
});
