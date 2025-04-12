import Hero from '@/app/(home)/_components/hero';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import { CTA } from './_components/call-to-action';
import { Features } from './_components/features';

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Features />
      <Separator />
      <CTA />
    </>
  );
}
