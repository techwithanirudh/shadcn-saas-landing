import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

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
      className='grid grid-cols-1 gap-4 bg-card/50 px-6 py-6 transition-colors hover:bg-card/80 md:grid-cols-[1fr_auto]'
    >
      <div className='order-2 flex h-full flex-col justify-between gap-2 md:order-1'>
        <div className='flex-1 gap-2'>
          <h2 className='mt-2 font-medium text-lg md:text-xl lg:text-2xl'>
            {title}
          </h2>
          <p className='line-clamp-3 overflow-hidden text-ellipsis text-medium text-muted-foreground'>
            {description}
          </p>
        </div>
        <div className='group inline-flex items-center gap-2 text-sm'>
          <CalendarIcon className='size-4 transition-transform hover:scale-125' />
          <p className='font-medium'>{date}</p>
        </div>
      </div>

      {image && (
        <div className='relative order-1 aspect-video min-h-[170px] w-full max-w-full md:order-2 md:w-auto md:max-w-[250px] lg:max-w-[300px]'>
          <Image
            src={image}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 300px, 350px'
            className='rounded-lg object-cover transition-transform duration-200 hover:scale-105'
          />
        </div>
      )}
    </Link>
  );
};
