'use client';

import { Section } from '@/components/section';
import { cva } from 'class-variance-authority';
import {
  BarChart3 as BarChartIcon, 
  Users as UsersIcon,
  Boxes as IntegrationsIcon,
  HandCoins as HandCoinsIcon
} from 'lucide-react';

// Create a variant for feature items
const featureItemVariants = cva(
  'group flex flex-col justify-between gap-10 p-6 last:border-border last:border-b last:border-dashed hover:bg-card hover:bg-card/80 sm:gap-22 md:gap-34 lg:gap-46',
  {
    variants: {
      size: {
        sm: '',
        lg: 'lg:col-span-2',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

const features = [
  {
    id: 1,
    Icon: HandCoinsIcon,
    title: 'Cost-Effective Solutions',
    description:
      'Maximize ROI with our affordable business automation solutions that scale with your needs.',
    size: 'lg',
  },
  {
    id: 2,
    Icon: BarChartIcon,
    title: 'Advanced Analytics',
    description:
      'Get deep insights into your business performance with comprehensive analytics and reporting tools.',
    size: 'sm',
  },
  {
    id: 3,
    Icon: UsersIcon,
    title: 'Team Collaboration',
    description:
      'Work seamlessly with your team through integrated collaboration features and real-time updates.',
    size: 'lg',
  },
  {
    id: 4,
    Icon: IntegrationsIcon,
    title: 'Easy Integration',
    description:
      'Connect with your favorite tools and services through our extensive integration ecosystem.',
    size: 'sm',
  },
];

const Features = () => (
  <Section className='relative w-full pt-10 md:pt-14'>
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2 px-6'>
        <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
          Why SaasCN?
        </h2>
        <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
          Powerful features to help your business succeed in today's competitive landscape.
        </p>
      </div>

      <div className='w-full border-border border-t border-dashed pb-4'>
        <div className='grid grid-cols-1 divide-x divide-y divide-dashed divide-border text-left sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={featureItemVariants({
                size: feature.size as 'sm' | 'lg',
              })}
            >
              <feature.Icon className='h-8 w-8 stroke-1 transition-transform hover:rotate-12 hover:scale-125' />
              <div className='flex flex-col '>
                <h3 className='text-xl tracking-tight transition-all'>
                  {feature.title}
                </h3>
                <p className='max-w-xs text-base text-muted-foreground transition-all'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
export default Features;
