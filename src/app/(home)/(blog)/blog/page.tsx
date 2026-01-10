import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { postsPerPage } from '@/app/layout.shared';
import { PostCard } from '@/components/blog/post-card';
import { NumberedPagination } from '@/components/numbered-pagination';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { getSortedByDatePosts } from '@/lib/source';

export const dynamicParams = false;

const totalPosts = getSortedByDatePosts().length;
const pageCount = Math.ceil(totalPosts / postsPerPage);

const CurrentPostsCount = ({
  startIndex,
  endIndex,
}: {
  startIndex: number;
  endIndex: number;
}) => {
  const start = startIndex + 1;
  const end = endIndex < totalPosts ? endIndex : totalPosts;
  if (start === end) {
    return <span>({start})</span>;
  }
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Pagination = ({ pageIndex }: { pageIndex: number }) => {
  const handlePageChange = async (page: number) => {
    'use server';
    redirect(`/blog?page=${page}`);
  };

  return (
    <Section className='bg-dashed'>
      <NumberedPagination
        currentPage={pageIndex + 1}
        onPageChange={handlePageChange}
        paginationItemsToDisplay={5}
        totalPages={pageCount}
      />
    </Section>
  );
};

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page[0] ?? '', 10) - 1
    : 0;
  if (pageIndex < 0 || pageIndex >= pageCount) {
    notFound();
  }

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getSortedByDatePosts().slice(startIndex, endIndex);

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          All {totalPosts} Posts{' '}
          <CurrentPostsCount endIndex={endIndex} startIndex={startIndex} />
        </h1>
      </Section>
      <Section className='h-full' sectionClassName='flex flex-1'>
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
        </div>
      </Section>
      {pageCount > 1 && <Pagination pageIndex={pageIndex} />}
    </>
  );
}

export const generateStaticParams = () => {
  const slugs = Array.from({ length: pageCount }, (_, index) => ({
    slug: [(index + 1).toString()],
  }));

  return [{ slug: [] }, ...slugs];
};

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  props: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const _params = await props.params;
  const searchParams = await props.searchParams;

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page as string, 10)
    : 1;

  const isFirstPage = pageIndex === 1 || !searchParams.page;
  const pageTitle = isFirstPage ? 'Posts' : `Posts - Page ${pageIndex}`;
  const canonicalUrl = isFirstPage ? '/blog' : `/blog?page=${pageIndex}`;

  return createMetadata({
    title: pageTitle,
    description: `Posts${isFirstPage ? '' : ` - Page ${pageIndex}`}`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  });
}
