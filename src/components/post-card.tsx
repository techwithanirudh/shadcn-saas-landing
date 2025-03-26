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
      className='px-6 py-6 bg-card/50 hover:bg-card/80 transition-colors flex flex-col md:flex-row justify-between gap-4 max-w-full overflow-hidden rounded-lg'
    >
      <div className='max-w-full flex flex-col gap-3 h-full order-2 md:order-1'>
        <div className='flex-1'>
          <h2 className='mt-2 text-lg md:text-xl lg:text-2xl font-medium'>
            {title}
          </h2>
          <p className='overflow-hidden text-ellipsis line-clamp-2 md:whitespace-nowrap text-medium text-fd-muted-foreground'>
            {description}
          </p>
        </div>

        <p className='font-medium'>{date}</p>
      </div>

      <div className='order-1 md:order-2 w-full md:w-auto'>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className='rounded-lg w-full object-cover'
          />
        ) : null}
      </div>
    </Link>
  );
};
