import Hero from '@/app/(home)/_components/hero';
import Posts from '@/app/(home)/_components/posts';
import PageHeader from '@/components/page-header';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import { NewspaperIcon } from 'lucide-react';
import { CTA } from './_components/call-to-action';

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <>
      <Hero />
      <PageHeader className=' py-8 sm:py-16'>
        <div className='relative'>
          <h2 className='text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl'>
            <span className='inline-flex items-center gap-3'>
              Posts{' '}
              <NewspaperIcon className='fill-fd-primary/30 text-fd-primary size-10 transition-transform hover:scale-125 hover:rotate-12' />
            </span>
          </h2>
        </div>
      </PageHeader>
      <Separator />
      <Posts posts={posts} />
      <Separator />
      <CTA />
    </>
  );
}
