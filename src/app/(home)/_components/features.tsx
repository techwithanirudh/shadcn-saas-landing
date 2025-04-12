'use client';

import { Section } from '@/components/section';
import { cva } from 'class-variance-authority';
import { User } from 'lucide-react';

// Create a variant for feature items
const featureItemVariants = cva(
  'group flex flex-col justify-between rounded-md bg-muted p-6',
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
    title: 'Affordable Learning',
    description:
      'Say goodbye to overpriced tutors. AI Tutor offers quality education without breaking the bank.',
    aspect: 'auto',
    colSpan: 'double',
  },
  {
    id: 2,
    title: 'Natural Voice Interaction',
    description:
      'Speak to it like a real tutor. AI Tutor understands voice commands and responds just like a human would.',
    aspect: 'square',
    colSpan: 'normal',
  },
  {
    id: 3,
    title: 'Focus-First Design',
    description:
      'Prevents distractions and keeps kids engaged with smart monitoring and redirection cues.',
    aspect: 'square',
    colSpan: 'normal',
  },
  {
    id: 4,
    title: 'Guided Thinking, Not Just Answers',
    description:
      'AI Tutor doesn’t just hand out answers — it encourages critical thinking and problem-solving before offering help.',
    aspect: 'auto',
    colSpan: 'double',
  },
];

const Features = () => (
  <Section className='relative w-full px-6 py-10 md:py-14 lg:px-6 lg:py-16'>
    <div className='mx-auto'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
              Why AI Tutor?
            </h2>
            <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
              Teaching a child today isn’t easy — but with AI Tutor, it doesn’t
              have to be hard either.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={featureItemVariants({
                aspect: feature.aspect as 'square' | 'auto',
                colSpan: feature.colSpan as 'normal' | 'double',
              })}
            >
              <User className='h-8 w-8 stroke-1 transition-transform hover:rotate-12 hover:scale-125' />
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
