import Hero from '@/app/(home)/_components/hero';
import Posts from '@/app/(home)/_components/posts';
import { Icons } from '@/components/icons/icons';
import PageHeader from '@/components/page-header';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import { CTA } from './_components/call-to-action';

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <>
      <Hero />
      <PageHeader className=' py-8 sm:py-16'>
        <div className='relative'>
          <h2 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            <span className='inline-flex items-center gap-3'>
              Posts{' '}
              <Icons.posts className='size-10 fill-fd-primary/30 text-fd-primary transition-transform hover:rotate-12 hover:scale-125' />
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
