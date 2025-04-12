'use client';

import { Section } from '@/components/section';
import { cva } from 'class-variance-authority';
import {
  AudioLinesIcon,
  FocusIcon,
  HandCoinsIcon,
  HandshakeIcon,
} from 'lucide-react';

// Create a variant for feature items
const featureItemVariants = cva(
  'group flex flex-col justify-between p-6 last:border-border/70 last:border-b last:border-dashed hover:bg-card hover:bg-card/80 last:dark:border-border',
  {
    variants: {
      aspect: {
        square: 'aspect-square',
        auto: 'aspect-square h-full lg:aspect-auto',
      },
      colSpan: {
        normal: '',
        double: 'lg:col-span-2',
      },
    },
    defaultVariants: {
      aspect: 'square',
      colSpan: 'normal',
    },
  },
);

const features = [
  {
    id: 1,
    Icon: HandCoinsIcon,
    title: 'Affordable Learning',
    description:
      'Say goodbye to overpriced tutors. AI Tutor offers quality education without breaking the bank.',
    aspect: 'auto',
    colSpan: 'double',
  },
  {
    id: 2,
    Icon: AudioLinesIcon,
    title: 'Natural Voice Interaction',
    description:
      'Speak to it like a real tutor. AI Tutor understands voice commands and responds just like a human would.',
    aspect: 'square',
    colSpan: 'normal',
  },
  {
    id: 3,
    Icon: FocusIcon,
    title: 'Focus-First Design',
    description:
      'Prevents distractions and keeps kids engaged with smart monitoring and redirection cues.',
    aspect: 'square',
    colSpan: 'normal',
  },
  {
    id: 4,
    Icon: HandshakeIcon,
    title: 'Guided Thinking, Not Just Answers',
    description:
      'AI Tutor doesn’t just hand out answers — it encourages critical thinking and problem-solving before offering help.',
    aspect: 'auto',
    colSpan: 'double',
  },
];

const Features = () => (
  <Section className='relative w-full pt-10 md:pt-14'>
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2 px-6'>
        <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
          Why AI Tutor?
        </h2>
        <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
          Teaching a child today isn’t easy — but with AI Tutor, it doesn’t have
          to be hard either.
        </p>
      </div>

      <div className='w-full border-border/70 border-t border-dashed pb-4 dark:border-border'>
        <div className='grid grid-cols-1 divide-x divide-y divide-dashed divide-border/70 text-left sm:grid-cols-2 lg:grid-cols-3 dark:divide-border'>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={featureItemVariants({
                aspect: feature.aspect as 'square' | 'auto',
                colSpan: feature.colSpan as 'normal' | 'double',
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
