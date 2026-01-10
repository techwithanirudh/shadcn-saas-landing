import type { ImageResponseOptions } from '@takumi-rs/image-response';
import type { ReactElement } from 'react';

interface GenerateProps {
  title: string;
  description?: string;
}

export async function getImageResponseOptions(): Promise<ImageResponseOptions> {
  return {
    format: 'webp',
    width: 1200,
    height: 630,
  };
}

export function generate({
  title,
  description = 'Learn more about this post by visiting the website.',
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        color: 'white',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              fontSize: title.length > 20 ? 64 : 80,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 40,
              lineHeight: 1.5,
              color: 'rgba(240,240,240,0.7)',
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
