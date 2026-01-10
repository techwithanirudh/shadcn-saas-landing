import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import type { Page } from '@/lib/source';

export default function Posts({ posts }: { posts: Page[] }) {
  return (
    <Section>
      <div className='grid divide-y divide-dashed divide-border text-left'>
        {posts.map((post) => {
          const date = new Date(post.data.date).toDateString();
          return (
            <PostCard
              author={post.data.author ?? 'Unknown'}
              date={date}
              description={post.data.description ?? ''}
              image={post.data.image ?? null}
              key={post.url}
              tags={post.data.tags}
              title={post.data.title ?? 'Untitled'}
              url={post.url}
            />
          );
        })}
        <Link
          className={buttonVariants({
            variant: 'default',
            className: 'group rounded-none py-4 sm:py-8',
          })}
          href='/blog'
        >
          View More
          <Icons.arrowUpRight className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
        </Link>
      </div>
    </Section>
  );
}
