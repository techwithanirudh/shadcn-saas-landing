import { title as homeTitle } from '@/app/layout.config';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import Newsletter from './_components/newsletter';

export default Newsletter;

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = `News and updates from ${homeTitle}. Stay informed with the latest articles, features, and insights.`;

  return createMetadata({
    title: 'Newsletter',
    description,
    openGraph: {
      url: '/terms',
    },
    alternates: {
      canonical: '/terms',
    },
  });
}
