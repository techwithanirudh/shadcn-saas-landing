import { Section } from '@/components/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { Page } from '@/lib/source';
import { PostCard } from './update-card';

const Updates = ({ posts }: { posts: Page[] }) => {
  return (
    <Section className='relative w-full pt-10'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2 px-6'>
          <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
            Updates
          </h2>
          {/* <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
            See what others are saying about SaasCN.
          </p> */}
        </div>

        <Carousel className='w-full border-border border-t border-dashed'>
          <CarouselContent className='ml-0 divide-x divide-dashed divide-border'>
            {posts.map((post) => {
              const date = new Date(post.data.date).toDateString();
              return (
                <CarouselItem
                  className='min-h-full pl-0 md:basis-1/2 lg:basis-1/3'
                  key={post.url}
                >
                  <PostCard
                    title={post.data.title}
                    description={post.data.description ?? ''}
                    image={post.data.image}
                    url={post.url}
                    date={date}
                    author={post.data.author}
                    tags={post.data.tags}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
};

export default Updates;
