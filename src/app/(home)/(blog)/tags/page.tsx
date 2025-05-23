import { title as homeTitle } from '@/app/layout.config';
import { Section } from '@/components/section';
import { TagCard } from '@/components/tags/tag-card';
import { createMetadata } from '@/lib/metadata';
import { getTags } from '@/lib/source';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export default function Page() {
  const tags = getTags();

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          Tags
        </h1>
      </Section>
      <Section className='h-full' sectionClassName='flex flex-1'>
        <div className='grid grid-cols-1 divide-y divide-dashed divide-border sm:grid-cols-2 lg:grid-cols-4'>
          {tags.map((tag, index) => (
            <TagCard
              key={tag}
              displayCount={true}
              name={tag}
              className={cn(
                'items-center justify-start gap-2 rounded-none border-r-0 bg-card/50 p-6 last:border-border last:border-b last:border-dashed hover:bg-card/80',
                tags.at(index - 1) && 'border-l',
              )}
            />
          ))}
          {tags.length % 2 === 1 && (
            <div className='size-full border-border border-dashed bg-dashed sm:border-b sm:border-l' />
          )}
        </div>
      </Section>
    </>
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
