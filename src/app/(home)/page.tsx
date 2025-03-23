import Hero from '@/app/(home)/_components/hero';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import CTA from './_components/cta';
import { Customers } from './_components/customers';
import { FAQ } from './_components/faq';
import Features from './_components/features';
import Testimonials from './_components/testimonials';

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <>
      <Hero posts={posts} />
      <Customers count={50} />
      <Separator />
      <Features />
      <Separator />
      <Testimonials />
      <Separator />
      <FAQ />
      <Separator />
      <CTA />
    </>
  );
}
