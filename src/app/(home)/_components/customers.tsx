'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Claude from '@/public/images/logos/claude.svg';
import Gemini from '@/public/images/logos/gemini.svg';
import Neon from '@/public/images/logos/neon.svg';
import OpenAI from '@/public/images/logos/openai.svg';
import Vercel from '@/public/images/logos/vercel.svg';

import { Section } from '@/components/section';

const logos = [
  { src: Vercel, name: 'Vercel' },
  { src: OpenAI, name: 'OpenAI' },
  { src: Claude, name: 'Claude' },
  { src: Gemini, name: 'Gemini' },
  { src: Neon, name: 'Neon' },
];

export const Customers = ({
  count,
}: {
  count: number;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const closest = Math.floor(count / 50) * 50;

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <Section className='relative flex flex-col items-center justify-between gap-8 p-6 sm:flex-row sm:gap-16'>
      <p className='text-muted-foreground sm:max-w-xs'>
        Powered by {closest}+ technologies, including:
      </p>
      <div className='md:w-[50%]'>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {logos.map(({ src, name }, index) => (
              <CarouselItem className='basis-1/4 md:basis-1/5' key={name}>
                <div className='flex items-center justify-center rounded-md'>
                  <Image
                    src={src}
                    alt={name}
                    width={96}
                    height={24}
                    className='h-6 w-24 select-none object-contain dark:invert'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
};
