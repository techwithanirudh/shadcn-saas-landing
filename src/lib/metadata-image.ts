import type { ImageResponse } from '@takumi-rs/image-response';
import type { Metadata } from 'next';
import { getPost, getPosts, type Page } from '@/lib/source';

const createAPI = (
  render: (page: Page) => Promise<ImageResponse> | ImageResponse,
) => {
  return async (
    _request: Request,
    context: { params: Promise<{ slug?: string[] }> },
  ): Promise<ImageResponse | Response> => {
    const params = await context.params;
    const slug = params.slug ?? [];
    const page = getPost(slug);

    if (!page) {
      return new Response('Not Found', { status: 404 });
    }

    return render(page);
  };
};

const generateParams = () =>
  getPosts().map((page) => ({
    slug: page.slugs,
  }));

const withImage = (slugs: string[], metadata: Metadata): Metadata => {
  const imageUrl = `/og/${slugs.join('/')}`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: imageUrl,
    },
    twitter: {
      ...metadata.twitter,
      images: imageUrl,
    },
  };
};

export const metadataImage = {
  createAPI,
  generateParams,
  withImage,
};
