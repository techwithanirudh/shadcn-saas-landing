"use client"

import { useState } from 'react';
import { Section } from '@/components/section';
import { plans, frequencies } from '../data';
import { PricingCard } from './pricing-card';
import { Tab } from './pricing-tab';

interface PricingSectionProps {
  title: string;
  description: string;
}

export function PricingSection({ title, description }: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  return (
    <>
      <Section className='p-6 lg:p-12 flex flex-col items-center text-center'>
        <h1 className='mb-2 font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          {title}
        </h1>
        <p className='text-muted-foreground text-sm'>{description}</p>

        <div className='mt-8 flex items-center justify-center rounded-full bg-card p-1 w-fit'>
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
    </>
  );
}
