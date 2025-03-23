import { BlurImage } from '@/components/blur-image';
import { CalendarIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import Balancer from 'react-wrap-balancer';

interface PostCardProps {
  title: string;
  description: string;
  image?: string | null;
  url: string;
  date: string;
  author: string;
  tags?: string[];
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  image,
  url,
  date,
  author,
  tags,
}) => {
  return (
    <Link
      href={url}
      className='grid grid-cols-1 gap-4 bg-card/50 px-6 py-6 transition-colors hover:bg-card/80 md:grid-cols-3 xl:grid-cols-4'
    >
      <div className='order-2 flex h-full flex-col justify-between gap-4 md:order-1 md:col-span-2 xl:col-span-3'>
        <div className='flex-1 gap-4'>
          <h2 className='font-medium text-lg md:text-xl lg:text-2xl'>
            {title}
          </h2>
          <p className='line-clamp-3 overflow-hidden text-ellipsis text-medium text-muted-foreground'>
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div className='flex flex-col justify-center gap-4'>
          {/* <div className='flex flex-wrap gap-2'>
            {tags?.map((tag) => (
              <>
                <TagCard name={tag} key={tag} className='p-0 [&_svg]:size-4 [&_span]:text-muted-foreground gap-1' />
                {index < tags.length - 1 && <span className='text-muted-foreground'>•</span>}
              </>
            ))}
          </div> */}
          <div className='group inline-flex items-center gap-2 text-muted-foreground text-sm'>
            <span className='inline-flex items-center gap-1 capitalize'>
              <UserIcon className='size-4 transition-transform hover:scale-125' />
              {author}
            </span>
            <span>•</span>
            <span className='inline-flex items-center gap-1'>
              <CalendarIcon className='size-4 transition-transform hover:scale-125' />
              {date}
            </span>
          </div>
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
