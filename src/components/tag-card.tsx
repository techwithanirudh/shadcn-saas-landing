import { Icons } from '@/components/ui/icons';
import { getPostsByTag } from '@/lib/source';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const TagCard = ({
  name,
  displayCount = false,
  className = '',
}: {
  name: string;
  displayCount?: boolean;
  className?: string;
}) => {
  const posts = getPostsByTag(name);

  return (
    <Link
      href={`/tags/${name}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg bg-card/50 px-3 py-2 text-sm transition-colors hover:bg-card/80',
        className,
      )}
    >
      <Icons.tag size={18} className='my-auto text-fd-muted-foreground' />
      <span className='text-fd-card-foreground'>{name}</span>
      {displayCount && (
        <span className='ml-auto text-fd-muted-foreground'>
          ({posts.length})
        </span>
      )}
    </Link>
  );
};
