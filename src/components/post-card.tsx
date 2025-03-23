import Link from 'next/link';
import { Card } from './ui/card';

export const PostCard = ({
  title,
  description,
  url,
  date,
}: {
  title: string;
  description: string;
  url: string;
  date: string;
}) => {
  return (
    <Link
      href={url}
      className='px-6 py-12 bg-card/50 hover:bg-card/80 transition-colors flex justify-between flex-wrap gap-2 max-w-full overflow-hidden'
    >
      <div className='max-w-full'>
        <h2 className='mt-2 text-xl font-medium'>{title}</h2>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap text-medium text-fd-muted-foreground'>
          {description}
        </p>
      </div>
      <div>
        <p className='text-right font-medium'>{date}</p>
      </div>
    </Link>
  );
};
