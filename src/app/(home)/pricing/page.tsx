'use client'
import type { Metadata } from 'next';
import { PricingTable } from './components/pricing-table';
import { Section } from '@/components/section';
import { frequencies, plans } from './data';
import { Tab } from './components/pricing-tab';
import { PricingCard } from './components/pricing-card';
import { useState } from 'react';

const title = 'Plans and Pricing';
const description =
  'Choose the plan that fits your needs.';

// export const metadata: Metadata = {
//   title: "Pricing",
//   description,
// };

export default function PricingPage() {
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  return <>
    <Section className='flex flex-col items-center p-6 text-center lg:p-12'>
      <h1 className='mb-2 font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
        {title}
      </h1>
      <p className='text-muted-foreground text-sm'>{description}</p>

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
    <Section className='p-4 lg:p-6 hidden lg:block'>
      <h1 className='text-center font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
        Compare Plans
      </h1>
    </Section>
    <PricingTable paymentFrequency={selectedFrequency} />
  </>;
}
