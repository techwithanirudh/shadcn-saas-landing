import { MailIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { env } from '@/env';
import type { Page } from '@/lib/source';
import heroImage from '../../../../public/images/gradient-noise-purple-azure-light.png';

const Hero = ({ posts }: { posts: Page[] }) => (
  <Section className='relative w-full overflow-hidden bg-dashed px-4 py-16 sm:px-16 sm:py-24 md:py-32'>
    <motion.div
      animate={{ opacity: 1 }}
      className='absolute inset-0 -z-10 h-full w-full'
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <Image
        alt='Hero Background'
        className='pointer-events-none absolute right-0 bottom-0 h-[900px] w-[1004px] max-w-[1004px] translate-x-1/2 translate-y-1/2 select-none opacity-80 dark:opacity-100'
        height={600}
        priority
        src={heroImage}
        width={704}
      />
    </motion.div>
    <div className='mx-auto flex flex-col items-center justify-center gap-8'>
      <Button
        asChild
        className='group gap-4 bg-muted/70'
        size='sm'
        variant='outline'
      >
        <Link href={`/blog/${posts?.[0]?.slugs?.join('/')}`}>
          Read our latest announcement
          <Icons.arrowUpRight className='size-4 transition-transform group-hover:-rotate-12' />
        </Link>
      </Button>
      <div className='flex flex-col gap-4'>
        <h1 className='max-w-2xl text-center font-regular text-5xl tracking-tighter md:text-7xl'>
          The Future of
          <br />
          Business Starts Here
        </h1>
        <p className='max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl'>
          Say goodbye to manual workflows and inefficient processes. SaasCN
          streamlines your business operations, making work intuitive,
          efficient, and tailored to your needs.
        </p>
      </div>
      <div className='flex flex-row gap-3'>
        <Button
          asChild
          className='group gap-4 bg-muted/70 shadow-none'
          size='lg'
          variant='outline'
        >
          <Link href='/contact'>
            Get in touch{' '}
            <MailIcon className='size-4 transition-transform group-hover:-rotate-12' />
          </Link>
        </Button>
        <Button asChild className='group gap-4' size='lg'>
          <Link href={env.NEXT_PUBLIC_APP_URL}>
            Sign up{' '}
            <Icons.arrowUpRight className='size-4 transition-transform group-hover:-rotate-12' />
          </Link>
        </Button>
      </div>
    </div>
  </Section>
);

export default Hero;
