import { NewsletterForm } from '@/components/newsletter-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type React from 'react';

export function CTA(): React.ReactElement {
  return (
    <section className='border-grid'>
      <div className='container-wrapper'>
        <div className='container relative grid gap-8 px-4 py-10 sm:grid-cols-2 md:px-8 md:py-14 lg:py-16'>
          <div className='max-w-xl space-y-2'>
            <h2 className='font-semibold text-2xl md:text-3xl lg:text-4xl'>
              Subscribe to the Newsletter
            </h2>
            <p className='text-muted-foreground text-sm md:text-base'>
              Get the latest articles and updates delivered straight to your
              inbox. No spam, unsubscribe anytime.
            </p>
          </div>

          <div className='flex w-full items-center'>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
