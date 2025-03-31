import { postsPerPage } from '@/app/layout.config';
import { Icons } from '@/components/icons/icons';
import { TagJsonLd } from '@/components/json-ld';
import { NumberedPagination } from '@/components/numbered-pagination';
import { PostCard } from '@/components/posts/post-card';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { getPostsByTag, getTags } from '@/lib/source';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const dynamicParams = false;

const totalPosts = (title: string) => getPostsByTag(title).length;
const pageCount = (title: string) =>
  Math.ceil(totalPosts(title) / postsPerPage);

const CurrentPostsCount = ({
  startIndex,
  endIndex,
  tag,
}: {
  startIndex: number;
  endIndex: number;
  tag: string;
}) => {
  const total = totalPosts(tag);
  const start = startIndex + 1;
  const end = endIndex < total ? endIndex : total;
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Header = ({
  tag,
  startIndex,
  endIndex,
}: {
  tag: string;
  startIndex: number;
  endIndex: number;
}) => (
  <Section className='p-4 lg:p-6'>
    <div className='flex items-center gap-2'>
      <Icons.tag
        size={20}
        className='text-muted-foreground transition-transform hover:rotate-12 hover:scale-125'
      />
      <h1 className='font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
        {tag} <span className='text-muted-foreground'>Posts</span>{' '}
        <CurrentPostsCount
          startIndex={startIndex}
          endIndex={endIndex}
          tag={tag}
        />
      </h1>
    </div>
  </Section>
);

const Pagination = ({ pageIndex, tag }: { pageIndex: number; tag: string }) => {
  const handlePageChange = async (page: number) => {
    'use server';
    redirect(`/tags/${tag}?page=${page}`);
  };

  return (
    <Section className='bg-dashed'>
      <NumberedPagination
        currentPage={pageIndex + 1}
        totalPages={pageCount(tag)}
        paginationItemsToDisplay={5}
        onPageChange={handlePageChange}
      />
    </Section>
  );
};

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const tag = params.slug[0];
  if (!tag) return notFound();

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page[0] ?? '', 10) - 1
    : 0;

  if (pageIndex < 0 || pageIndex >= pageCount(tag)) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getPostsByTag(tag).slice(startIndex, endIndex);

  return (
    <>
      <Header tag={tag} startIndex={startIndex} endIndex={endIndex} />
      <Section className='h-full' sectionClassName='flex flex-1'>
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
              />
            );
          })}
        </div>
      </Section>
      {pageCount(tag) > 1 && <Pagination pageIndex={pageIndex} tag={tag} />}
      <TagJsonLd tag={tag} />
    </>
  );
}

export const generateStaticParams = () => {
  const tags = getTags();
  return [
    ...tags.map((tag) => ({ slug: [tag] })),
    ...tags.flatMap((tag) =>
      Array.from({ length: pageCount(tag) }, (_, index) => ({
        slug: [tag, (index + 1).toString()],
      })),
    ),
  ];
};

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const tag = params.slug[0];
  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page.toString(), 10)
    : 1;

  const isFirstPage = pageIndex === 1 || !searchParams.page;
  const pageTitle = isFirstPage
    ? `${tag} Posts`
    : `${tag} Posts - Page ${pageIndex}`;
  const canonicalUrl = isFirstPage
    ? `/tags/${tag}`
    : `/tags/${tag}?page=${pageIndex}`;

  return createMetadata({
    title: pageTitle,
    description: `Posts tagged with ${tag}${
      !isFirstPage ? ` - Page ${pageIndex}` : ''
    }`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  });
}
