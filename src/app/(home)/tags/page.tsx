import { title as homeTitle } from '@/app/layout.config';
import PageHeader from '@/components/page-header';
import { TagCard } from '@/components/tag-card';
import { createMetadata } from '@/lib/metadata';
import { getTags } from '@/lib/source';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export default function Page() {
  const tags = getTags();

  return (
    <div className='flex flex-1 flex-col'>
      <PageHeader>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl'>
          Tags
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-dashed divide-border/70 dark:divide-border'>
            {tags.map((tag, index) => (
              <TagCard
                key={tag}
                displayCount={true}
                name={tag}
                className={cn(
                  'rounded-none bg-card/50 p-6 hover:bg-card/80 items-center gap-2 justify-start last:border-b last:border-border/70 last:dark:border-border last:border-dashed border-r-0',
                  tags.at(index - 1) && 'border-l',
                )}
              />
            ))}
            {tags.length % 2 === 1 && (
              <div className='size-full bg-dashed sm:border-l sm:border-b border-border/70 dark:border-border border-dashed' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = `Explore all the tags on ${homeTitle}.`;

  return createMetadata({
    title: 'Tags',
    description,
    openGraph: {
      url: '/tags',
    },
    alternates: {
      canonical: '/tags',
    },
  });
}
