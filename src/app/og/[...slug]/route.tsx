import { ImageResponse } from '@takumi-rs/image-response';
import { generate, getImageResponseOptions } from '@/app/og/[...slug]/og';
import { metadataImage } from '@/lib/metadata-image';
import type { Page } from '@/lib/source';

export const GET = metadataImage.createAPI(
  async (page: Page): Promise<ImageResponse> => {
    return new ImageResponse(
      generate({
        title: page.data.title ?? 'Untitled',
        description: page.data.description ?? '',
      }),
      await getImageResponseOptions(),
    );
  },
);

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
