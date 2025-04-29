'use client';
import { Section } from '@/components/section';
import { useState } from 'react';
import Balancer from 'react-wrap-balancer';
import { Customers } from '../_components/customers';
import { FAQ } from '../_components/faq';
import { PricingCard } from './components/pricing-card';
import { Tab } from './components/pricing-tab';
import { PricingTable } from './components/pricing-table';
import { frequencies, plans } from './data';

const title = 'Plans and Pricing';
const description =
  'Use SaasCN for free with your whole team. Upgrade to enable more features like advanced analytics, priority support, and more.';

// export const metadata: Metadata = {
//   title: "Pricing",
//   description,
// };

export default function PricingPage() {
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  return (
    <>
      <title>Pricing | SaasCN</title>
      <meta name='description' content={description} />
      <Section className='flex flex-col items-center p-6 text-center lg:p-12'>
        <h1 className='mb-2 font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          {title}
        </h1>
        <p className='max-w-xl text-md text-muted-foreground'>
          <Balancer>{description}</Balancer>
        </p>

        <div className='mt-8 flex w-fit items-center justify-center rounded-full bg-card p-1'>
          {frequencies.map((frequency) => (
            <Tab
              key={frequency}
              text={frequency}
              selected={frequency === selectedFrequency}
              setSelected={setSelectedFrequency}
              discount={frequency === 'yearly'}
            />
          ))}
        </div>
      </Section>
      <Section className='flex flex-col items-center divide-y divide-dashed divide-border'>
        <div className='grid w-full divide-x divide-dashed divide-border sm:grid-cols-2 xl:grid-cols-4'>
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              tier={plan}
              paymentFrequency={selectedFrequency}
            />
          ))}
        </div>
      </Section>
      <Customers count={50} />
      <Section className='p-6 lg:p-12'>
        <h1 className='text-center font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          Compare Plans
        </h1>
      </Section>
      <PricingTable paymentFrequency={selectedFrequency} />
      <FAQ />
    </>
  );
}
