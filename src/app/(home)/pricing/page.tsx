import { Section } from '@/components/section';
import type { Metadata } from 'next';
import { PricingSection } from './components/pricing-section';

const title = 'Simple, transparent pricing';
const description =
  'No hidden fees. No surprises. 15-day trial. Cancel anytime.';

export const metadata: Metadata = {
  title,
  description,
};

const Pricing = async () => {
  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='mb-2 font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          {title}
        </h1>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </Section>
      <PricingSection />
    </>
  );
};

export default Pricing;
