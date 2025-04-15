import { title as homeTitle } from '@/app/layout.config';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { NewsletterForm } from '@/app/(home)/(blog)/newsletter/components/newsletter-form';
import { Section } from '@/components/section';
import type React from 'react';

export default function NewsletterPage(): React.ReactElement {
  return (
    // todo use faq like stylor
    <Section className='grid divide-y divide-dashed lg:grid-cols-2 lg:divide-x lg:divide-y-0 divide-border'>
      <div className='flex flex-col gap-2 px-6 py-10 md:py-14'>
        <h4 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
          Subscribe to the Newsletter
        </h4>
        <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
          Get the latest articles and updates delivered straight to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>

      <div className='flex w-full items-center px-6 py-10 md:py-14'>
        <NewsletterForm />
      </div>
    </Section>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = `News and updates from ${homeTitle}. Stay informed with the latest articles, features, and insights.`;

  return createMetadata({
    title: 'Newsletter',
    description,
    openGraph: {
      url: '/newsletter',
    },
    alternates: {
      canonical: '/newsletter',
    },
  });
}
