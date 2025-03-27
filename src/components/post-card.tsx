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
      className='flex max-w-full flex-col justify-between gap-4 overflow-hidden rounded-lg bg-card/50 px-6 py-6 transition-colors hover:bg-card/80 md:flex-row'
    >
      <div className='order-2 flex h-full max-w-full flex-col gap-3 md:order-1'>
        <div className='flex-1'>
          <h2 className='mt-2 font-medium text-lg md:text-xl lg:text-2xl'>
            {title}
          </h2>
          <p className='line-clamp-2 overflow-hidden text-ellipsis text-fd-muted-foreground text-medium md:whitespace-nowrap'>
            {description}
          </p>
        </div>

        <p className='font-medium'>{date}</p>
      </div>

      <div className='order-1 w-full md:order-2 md:w-auto'>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className='w-full rounded-lg object-cover'
          />
        ) : null}
      </div>
    </Link>
  );
};
