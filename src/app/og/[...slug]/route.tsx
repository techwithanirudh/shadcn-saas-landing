import { generateOGImage } from '@/app/og/[...slug]/og';
import { getOgPost, getOgStaticParams } from '@/lib/metadata-image';
import type { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: 'normal' }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import('./fonts/geist-regular-otf.json').then((mod) => mod.default || mod),
    import('./fonts/geistmono-regular-otf.json').then(
      (mod) => mod.default || mod,
    ),
    import('./fonts/geist-semibold-otf.json').then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: 'Geist',
      data: Buffer.from(normal, 'base64'),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Geist Mono',
      data: Buffer.from(mono, 'base64'),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Geist',
      data: Buffer.from(semibold, 'base64'),
      weight: 600 as const,
      style: 'normal' as const,
    },
  ];
}

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
): Promise<ImageResponse | Response> => {
  const { slug } = await params;
  const page = getOgPost(slug);

  if (!page) {
    return new Response('Not found', { status: 404 });
  }

  const [fonts] = await Promise.all([loadAssets()]);

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    fonts,
  });
};

export const generateStaticParams = () => getOgStaticParams();
