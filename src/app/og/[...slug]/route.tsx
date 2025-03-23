import { readFileSync } from 'node:fs';
import { generateOGImage } from '@/app/og/[...slug]/og';
import { metadataImage } from '@/lib/metadata-image';
import type { ImageResponse } from 'next/og';

const font = readFileSync('./src/app/og/[...slug]/fonts/Inter-Regular.ttf');
const fontSemiBold = readFileSync(
  './src/app/og/[...slug]/fonts/Inter-SemiBold.ttf',
);
const fontBold = readFileSync('./src/app/og/[...slug]/fonts/Inter-Bold.ttf');
const headingFont = readFileSync(
  './src/app/og/[...slug]/fonts/BricolageGrotesque-Regular.ttf',
);

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    primaryTextColor: 'rgb(240,240,240)',
    title: page.data.title,
    description: page.data.description,
    fonts: [
      {
        name: 'Inter',
        data: font,
        weight: 400,
      },
      {
        name: 'Inter',
        data: fontSemiBold,
        weight: 600,
      },
      {
        name: 'Inter',
        data: fontBold,
        weight: 700,
      },
      {
        name: 'Bricolage_Grotesque',
        data: headingFont,
        weight: 400,
      },
    ],
  });
});

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
