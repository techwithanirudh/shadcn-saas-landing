import { generateOGImage } from '@/app/banner.png/og';

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

export async function GET() {
  const [fonts] = await Promise.all([loadAssets()]);

  return generateOGImage({
    title: 'John Doe',
    subtitle: 'Software Engineer',
    fonts,
  });
}
