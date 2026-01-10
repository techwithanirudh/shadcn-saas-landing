import { type Page, getPost, getPosts } from '@/lib/source';

export const getOgImageUrl = (slugs: string[]) => `/og/${slugs.join('/')}`;

export const getOgStaticParams = () =>
  getPosts().map((post: Page) => ({ slug: post.slugs }));

export const getOgPost = (slugs: string[]) => getPost(slugs);
