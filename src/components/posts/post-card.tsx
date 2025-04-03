import { BlurImage } from '@/components/blur-image';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import Balancer from 'react-wrap-balancer';

interface PostCardProps {
  title: string;
  description: string;
  image?: string | null;
  url: string;
  date: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  image,
  url,
  date,
}) => {
  return (
    <Link
      href={url}
      className='grid grid-cols-1 gap-4 bg-card/50 px-6 py-6 transition-colors hover:bg-card/80 md:grid-cols-3 xl:grid-cols-4'
    >
      <div className='order-2 flex h-full flex-col justify-between gap-2 md:order-1 md:col-span-2 xl:col-span-3'>
        <div className='flex-1 gap-2'>
          <h2 className='mt-2 font-medium text-lg md:text-xl lg:text-2xl'>
            {title}
          </h2>
          <p className='line-clamp-3 overflow-hidden text-ellipsis text-medium text-muted-foreground'>
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div className='group inline-flex items-center gap-2 text-sm'>
          <CalendarIcon className='size-4 transition-transform hover:scale-125' />
          <p className='font-medium'>{date}</p>
        </div>
      </div>

      {image && (
        <div className='group relative order-1 col-span-1 inline-flex items-center justify-center transition-transform hover:scale-105 md:order-2'>
          <BlurImage
            width={853}
            height={554}
            src={image}
            alt={title}
            className='relative rounded-lg'
          />
        </div>
      )}
    </Link>
  );
};
