import { NewsletterForm } from '@/components/newsletter-form';
import { Section } from '@/components/section';
import type React from 'react';

export default function Newsletter(): React.ReactElement {
  return (
    // todo use faq like stylor
    <Section className='grid divide-y divide-dashed divide-border/70 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-border'>
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
