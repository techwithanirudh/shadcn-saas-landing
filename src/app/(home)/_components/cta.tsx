import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { PhoneCall } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

export default function CTA(): React.ReactElement {
  return (
    <Section className='relative grid gap-8 px-4 py-10 sm:grid-cols-2 md:py-14 lg:px-6 lg:py-16'>
      <h2 className='max-w-xl font-regular text-3xl md:text-5xl'>
        Learn at lightspeed with AI Tutor
      </h2>

      <div className='flex w-full items-center'>
        <div className='max-w-xl space-y-4'>
          <p className='text-muted-foreground text-sm md:text-base'>
            Learn, explore, and grow with AI Tutor. Sign up today and unlock a
            world of knowledge at your fingertips.
          </p>
          <div className='flex flex-row gap-3'>
            <Button
              size='lg'
              className='group gap-4 bg-transparent shadow-none'
              variant='outline'
              asChild
            >
              <Link href='/contact'>
                Get in touch{' '}
                <PhoneCall className='group-hover:-rotate-12 size-4 transition-transform' />
              </Link>
            </Button>
            <Button size='lg' className='group gap-4' asChild>
              <Link href={env.NEXT_PUBLIC_APP_URL}>
                Sign up{' '}
                <Icons.arrowUpRight className='group-hover:-rotate-12 size-4 transition-transform' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
