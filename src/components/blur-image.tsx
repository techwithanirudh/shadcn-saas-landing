'use client';
import NextImage from 'next/image';
import { useState } from 'react';
/**
 * Copyright (c) Delba de Oliveira
 * Source: https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
 */
import { cn } from '@/lib/utils';

type ImageProps = {
  imageClassName?: string;
  lazy?: boolean;
} & React.ComponentProps<typeof NextImage>;

const BlurImage = (props: ImageProps) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}
    >
      <NextImage
        alt={alt}
        className={cn(
          isLoading && 'scale-[1.02] blur-xl grayscale',
          imageClassName
        )}
        loading={lazy ? 'lazy' : undefined}
        onLoad={() => setIsLoading(false)}
        priority={!lazy}
        quality={100}
        src={src}
        style={{
          transition: 'filter 700ms ease, scale 150ms ease',
        }}
        {...rest}
      />
    </div>
  );
};

export { BlurImage };
