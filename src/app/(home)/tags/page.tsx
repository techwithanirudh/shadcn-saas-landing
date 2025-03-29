import { title as homeTitle } from '@/app/layout.config';
import PageHeader from '@/components/page-header';
import { TagCard } from '@/components/tags/tag-card';
import { createMetadata } from '@/lib/metadata';
import { getTags } from '@/lib/source';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export default function Page() {
  const tags = getTags();

  return (
    <div className='flex flex-1 flex-col'>
      <PageHeader>
        <h1 className='font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          Tags
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        <div>
          <div className='grid grid-cols-1 divide-y divide-dashed divide-border/70 sm:grid-cols-2 lg:grid-cols-4 dark:divide-border'>
            {tags.map((tag, index) => (
              <TagCard
                key={tag}
                displayCount={true}
                name={tag}
                className={cn(
                  'items-center justify-start gap-2 rounded-none border-r-0 bg-card/50 p-6 last:border-border/70 last:border-b last:border-dashed hover:bg-card/80 last:dark:border-border',
                  tags.at(index - 1) && 'border-l',
                )}
              />
            ))}
            {tags.length % 2 === 1 && (
              <div className='size-full border-border/70 border-dashed bg-dashed sm:border-b sm:border-l dark:border-border' />
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
