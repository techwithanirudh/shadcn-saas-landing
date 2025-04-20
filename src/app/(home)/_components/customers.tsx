'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import ClaudeLight from '@/public/images/logos/light/claude.svg';
import GeminiLight from '@/public/images/logos/light/gemini.svg';
import NeonLight from '@/public/images/logos/light/neon.svg';
import OpenAILight from '@/public/images/logos/light/openai.svg';
import VercelLight from '@/public/images/logos/light/vercel.svg';

import ClaudeDark from '@/public/images/logos/dark/claude.svg';
import GeminiDark from '@/public/images/logos/dark/gemini.svg';
import NeonDark from '@/public/images/logos/dark/neon.svg';
import OpenAIDark from '@/public/images/logos/dark/openai.svg';
import VercelDark from '@/public/images/logos/dark/vercel.svg';

import { Section } from '@/components/section';
import Autoplay from 'embla-carousel-auto-scroll';
import { BlurImage } from '@/components/blur-image';

const logos = [
  {
    name: 'Vercel',
    light: VercelLight,
    dark: VercelDark,
  },
  {
    name: 'OpenAI',
    light: OpenAILight,
    dark: OpenAIDark,
  },
  {
    name: 'Claude',
    light: ClaudeLight,
    dark: ClaudeDark,
  },
  {
    name: 'Gemini',
    light: GeminiLight,
    dark: GeminiDark,
  },
  {
    name: 'Neon',
    light: NeonLight,
    dark: NeonDark,
  },
];

export const Customers = ({
  count,
}: {
  count: number;
}) => {
  const closest = Math.floor(count / 50) * 50;

  return (
    <Section className='relative flex flex-col items-center justify-between gap-8 p-6 sm:flex-row sm:gap-16'>
      <p className='text-muted-foreground sm:max-w-xs'>
        {closest}+ companies already use SaasCN to automate their workflows.
      </p>
      <div className='md:w-[50%]'>
        <Carousel
          plugins={[
            Autoplay({
              speed: 600 / 1000,
              startDelay: 100,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            align: 'start',
            dragFree: true,
            loop: true,
          }}
        >
          <CarouselContent>
            {logos.map((logo, index) => (
              <CarouselItem className='basis-1/4 md:basis-1/5' key={logo.name}>
                <div className='flex items-center justify-center'>
                  <BlurImage
                    src={logo.light}
                    alt={logo.name}
                    width={96}
                    height={24}
                    imageClassName='h-6 w-24 select-none object-contain'
                    className='dark:hidden rounded-md p-1'
                  />
                  <BlurImage
                    src={logo.dark}
                    alt={logo.name}
                    width={96}
                    height={24}
                    imageClassName='h-6 w-24 select-none object-contain'
                    className='hidden dark:block rounded-md p-1'
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
