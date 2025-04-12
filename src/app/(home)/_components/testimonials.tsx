'use client';

import { Section } from '@/components/section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    title: 'Best decision',
    description:
      'Our goal was to streamline SMB trade, making it easier and faster than ever and we did it together.',
    author: {
      name: 'Hayden Bleasel',
      image: 'https://github.com/haydenbleasel.png',
    },
  },
  {
    title: 'Game changer',
    description:
      'This platform revolutionized how we handle our day-to-day operations. The efficiency gains have been remarkable.',
    author: {
      name: 'Lee Robinson',
      image: 'https://github.com/leerob.png',
    },
  },
  {
    title: 'Exceeded expectations',
    description:
      'Implementation was smooth and the results were immediate. Our team adapted quickly and productivity soared.',
    author: {
      name: 'shadcn',
      image: 'https://github.com/shadcn.png',
    },
  },
  {
    title: 'Outstanding support',
    description:
      'Not only is the platform powerful, but the customer support team has been exceptional in helping us maximize its potential.',
    author: {
      name: 'Pontus Abrahamsson',
      image: 'https://github.com/pontusab.png',
    },
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    }, 4000);
  }, [api, current]);

  return (
    <Section className='relative w-full pt-10 md:pt-14'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2 px-6'>
          <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
            Loved by the community
          </h2>
          <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
            See what others are saying about AI Tutor.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className='w-full border-border/70 border-t border-dashed dark:border-border'
        >
          <CarouselContent className='ml-0 divide-x divide-dashed divide-border/70 dark:divide-border'>
            {testimonials.map((item, index) => (
              <CarouselItem
                className='pl-0 lg:basis-1/2'
                key={`${item.title}_${index}`}
              >
                <div className='flex aspect-video flex-col justify-between p-6 hover:bg-card lg:col-span-2'>
                  <User className='h-8 w-8 stroke-1 transition-transform hover:rotate-12 hover:scale-125' />
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      <h3 className='text-xl tracking-tight'>{item.title}</h3>
                      <p className='max-w-xs text-base text-muted-foreground'>
                        {item.description}
                      </p>
                    </div>
                    <p className='flex flex-row items-center gap-2 text-sm'>
                      <span className='text-muted-foreground'>By</span>
                      <Avatar className='h-6 w-6'>
                        <AvatarImage src={item.author.image} />
                        <AvatarFallback>??</AvatarFallback>
                      </Avatar>
                      <span>{item.author.name}</span>
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
};

export default Testimonials;
