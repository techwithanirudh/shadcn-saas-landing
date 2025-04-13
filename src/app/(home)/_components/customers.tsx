'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Anything from '../../../../public/images/logos/anything.png';
import Nothing from '../../../../public/images/logos/nothing.png';
import Pear from '../../../../public/images/logos/pear.png';
import Something from '../../../../public/images/logos/something.png';

import { Section } from '@/components/section';

const logos = [
  { src: Something, name: 'Something' },
  { src: Nothing, name: 'Nothing' },
  { src: Anything, name: 'Anything' },
  { src: Pear, name: 'Pear' },
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
    <Section className='relative flex grid grid-cols-8 flex-col items-center justify-between gap-8 p-6 sm:flex-row sm:gap-16'>
      <p className='col-span-4 text-muted-foreground sm:max-w-xs'>
        Join {closest}+ companies in building better products with Eververse
      </p>
      <div className='col-span-4'>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {logos.map(({ src, name }, index) => (
              <CarouselItem className='basis-1/4' key={name}>
                <div className='flex items-center justify-center rounded-md'>
                  <Image
                    src={src}
                    alt={name}
                    width={96}
                    height={24}
                    className='h-12 w-48 object-contain dark:invert'
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
