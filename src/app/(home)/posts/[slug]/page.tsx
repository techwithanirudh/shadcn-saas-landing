import { Control } from '@/app/(home)/posts/[slug]/page.client';
import { PostJsonLd } from '@/components/json-ld';
import PageHeader from '@/components/page-header';
import { TagCard } from '@/components/tag-card';
import { createMetadata } from '@/lib/metadata';
import { metadataImage } from '@/lib/metadata-image';
import { type Page as MDXPage, getPost, getPosts } from '@/lib/source';
import { cn } from '@/lib/utils';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { description as homeDescription } from 'src/app/layout.config';

function Header(props: { page: MDXPage; tags?: string[] }) {
  const { page, tags } = props;

  return (
    <PageHeader>
      <div
        className={cn(
          'flex flex-col items-start justify-center gap-4 md:gap-6 py-8',
          'sm:items-center sm:rounded-lg sm:border sm:bg-muted/70 sm:dark:bg-muted sm:px-8 sm:py-20 sm:shadow-xs',
        )}
      >
        <div className='flex flex-col sm:text-center gap-2 md:gap-4'>
          <h1 className='max-w-4xl font-bold text-3xl leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'>
            {page.data.title}
          </h1>
          <p className='mx-auto max-w-4xl'>{page.data.description}</p>
        </div>
        <div className='flex gap-2 flex-wrap'>
          {tags?.map((tag) => (
            <TagCard name={tag} key={tag} className=' border border-border ' />
          ))}
        </div>
      </div>
    </PageHeader>
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getPost([params.slug]);

  if (!page) notFound();
  const { body: Mdx, toc, tags, lastModified } = page.data;

  const lastUpdate = lastModified ? new Date(lastModified) : undefined;

  return (
    <>
      <Header page={page} tags={tags} />

      <div className='container-wrapper flex-1'>
        <article className='container flex flex-col px-4 lg:flex-row min-h-full'>
          <div className='flex-1 flex flex-col gap-4'>
            <InlineTOC
              items={toc}
              className='rounded-none -ml-4 -mr-4 xl:-ml-6  lg:mr-0 border-0 border-dashed border-border/70 dark:border-border border-b xl:px-2'
            />
            <div className='prose min-w-0 flex-1 pr-4'>
              <Mdx
                components={{
                  ...defaultMdxComponents,
                  File,
                  Files,
                  Folder,
                  Tabs,
                  Tab,
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-4 lg:border-l lg:border-border/70 lg:dark:border-border lg:border-dashed p-4 text-sm lg:w-[250px] lg:sticky lg:top-[4rem] lg:self-start lg:h-[calc(100vh-4rem)] lg:overflow-y-auto'>
            <div>
              <p className='mb-1 text-fd-muted-foreground'>Written by</p>
              <p className='font-medium'>{page.data.author}</p>
            </div>
            <div>
              <p className='mb-1 text-sm text-fd-muted-foreground'>
                Created At
              </p>
              <p className='font-medium'>
                {new Date(page.data.date ?? page.file.name).toDateString()}
              </p>
            </div>
            {lastUpdate && (
              <div>
                <p className='mb-1 text-sm text-fd-muted-foreground'>
                  Updated At
                </p>
                <p className='font-medium'>{lastUpdate.toDateString()}</p>
              </div>
            )}
            <Control url={page.url} />
          </div>
        </article>
      </div>
      <PostJsonLd page={page} />
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = getPost([params.slug]);

  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? homeDescription;

  return createMetadata(
    metadataImage.withImage(page.slugs, {
      title,
      description,
      openGraph: {
        url: `/posts/${page.slugs.join('/')}`,
      },
      alternates: {
        canonical: page.url,
      },
    }),
  );
}

export function generateStaticParams(): { slug: string }[] {
  return getPosts().map((page) => ({
    slug: page.slugs[0],
  }));
}
