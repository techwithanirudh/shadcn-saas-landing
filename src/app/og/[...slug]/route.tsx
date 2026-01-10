import { ImageResponse } from '@takumi-rs/image-response';
import { generate, getImageResponseOptions } from '@/app/og/[...slug]/og';
import { getPageImage } from '@/lib/metadata';
import { getPost, getPosts } from '@/lib/source';

export const GET = async (
  _request: Request,
  context: { params: Promise<{ slug?: string[] }> }
): Promise<ImageResponse | Response> => {
  const params = await context.params;
  const slug = params.slug ?? [];
  const page = getPost(slug.slice(0, -1));

  if (!page) {
    return new Response('Not Found', { status: 404 });
  }

  return new ImageResponse(
    generate({
      title: page.data.title ?? 'Untitled',
      description: page.data.description ?? '',
    }),
    await getImageResponseOptions()
  );
};

export function generateStaticParams(): {
  slug: string[];
}[] {
  return getPosts().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
