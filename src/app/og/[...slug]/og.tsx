import { title } from '@/app/layout.config';
import type { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types';
import { ImageResponse } from 'next/og';
import type { ReactElement, ReactNode } from 'react';

interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
  primaryTextColor?: string;
}

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions,
): ImageResponse {
  const { title, description, primaryTextColor, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
      primaryTextColor,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    },
  );
}

export function generate({
  primaryTextColor = 'rgb(255,150,255)',
  ...props
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'white',
        background:
          'linear-gradient(to bottom, rgb(30, 30, 30), rgb(10, 10, 10), rgb(0, 0, 0))',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          top: '0px',
          right: '0px',
          zIndex: '0',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryTextColor}22, transparent 70%)`,
          top: '-100px',
          right: '-100px',
          zIndex: '0',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryTextColor}15, transparent 70%)`,
          bottom: '-50px',
          left: '-50px',
          zIndex: '0',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '2rem 4rem 0',
          color: primaryTextColor,
          zIndex: '1',
        }}
      >
        <p
          style={{
            fontSize: '46px',
            fontWeight: 600,
            fontFamily: 'Bricolage_Grotesque, sans-serif',
          }}
        >
          {title}
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '0 4rem 4rem',
          zIndex: '1',
        }}
      >
        <p
          style={{
            fontWeight: 800,
            fontSize: '80px',
            lineHeight: 1.2,
            margin: '0 0 24px 0',
            background: `linear-gradient(to right, white, ${primaryTextColor})`,
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: '38px',
            color: 'rgba(240,240,240,0.8)',
            maxWidth: '880px',
            lineHeight: 1.3,
          }}
        >
          {props.description}
        </p>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '8px',
            background: `linear-gradient(to right, transparent, ${primaryTextColor}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
