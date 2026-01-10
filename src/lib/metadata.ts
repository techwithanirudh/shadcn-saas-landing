import type { Metadata } from 'next';
import { env } from '@/env';
import { title } from '@/app/layout.config';
import type { Page } from './source';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl.href,
      images: '/banner.png',
      siteName: title,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@AnirudhWith',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
  };
}

export function getPageImage(page: Page) {
  const segments = [...page.slugs, 'image.webp'];
  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export const baseUrl =
  env.NODE_ENV === 'development' || !env.NEXT_PUBLIC_APP_URL
    ? new URL('http://localhost:3000')
    : new URL(env.NEXT_PUBLIC_APP_URL);
