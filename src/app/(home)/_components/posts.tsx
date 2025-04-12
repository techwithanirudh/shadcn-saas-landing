import { PostCard } from '@/components/blog/post-card';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import type { Page } from '@/lib/source';
import Link from 'next/link';

export default function Posts({ posts }: { posts: Page[] }) {
  return (
    <Section>
      <div className='grid divide-y divide-dashed divide-border/70 text-left dark:divide-border'>
        {posts.map((post) => {
          const date = new Date(post.data.date).toDateString();
          return (
            <PostCard
              title={post.data.title}
              description={post.data.description ?? ''}
              image={post.data.image}
              url={post.url}
              date={date}
              key={post.url}
              author={post.data.author}
              tags={post.data.tags}
            />
          );
        })}
        <Link
          href='/posts'
          className={buttonVariants({
            variant: 'default',
            className: 'group rounded-none py-4 sm:py-8',
          })}
        >
          View More
          <Icons.arrowUpRight className='group-hover:-rotate-12 ml-2 size-5 transition-transform' />
        </Link>
      </div>
    </Section>
  );
}
