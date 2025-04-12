import Hero from '@/app/(home)/_components/hero';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import CTA from './_components/call-to-action';
import Features from './_components/features';
import Testimonials from './_components/testimonials';

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Features />
      <Separator />
      <Testimonials />
      <CTA />
    </>
  );
}
