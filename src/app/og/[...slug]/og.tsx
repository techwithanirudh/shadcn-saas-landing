import type { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types';
import { ImageResponse } from 'next/og';
import type { ReactElement } from 'react';

interface GenerateProps {
  title: string;
  description?: string;
}

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions,
): ImageResponse {
  const { title, description, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    },
  );
}

export function generate({
  title,
  description = 'Learn more about this post by visiting the website.',
}: GenerateProps): ReactElement {
  return (
    <div
      tw='flex h-full w-full bg-black text-white'
      style={{ fontFamily: 'Geist Sans' }}
    >
      <div tw='flex border absolute border-stone-900 border-dashed inset-y-0 left-16 w-[1px]' />
      <div tw='flex border absolute border-stone-900 border-dashed inset-y-0 right-16 w-[1px]' />
      <div tw='flex border absolute border-stone-900 inset-x-0 h-[1px] top-16' />
      <div tw='flex border absolute border-stone-900 inset-x-0 h-[1px] bottom-16' />
      <div tw='flex flex-col absolute w-[896px] justify-center inset-32'>
        <div
          tw='tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]'
          style={{
            textWrap: 'balance',
            fontWeight: 600,
            fontSize: title && title.length > 20 ? 64 : 80,
            letterSpacing: '-0.04em',
          }}
        >
          {title}
        </div>
        <div
          tw='text-[40px] leading-[1.5] flex-grow-1 text-stone-400'
          style={{
            fontWeight: 500,
            textWrap: 'balance',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
