import { postsPerPage } from '@/app/layout.config';
import { NumberedPagination } from '@/components/numbered-pagination';
import PageHeader from '@/components/page-header';
import { PostCard } from '@/components/post-card';
import { createMetadata } from '@/lib/metadata';
import { getSortedByDatePosts } from '@/lib/source';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Pagination = ({ pageIndex }: { pageIndex: number }) => {
  const handlePageChange = async (page: number) => {
    'use server';
    redirect(`/posts?page=${page}`);
  };

  return (
    <div className='border-grid border-t'>
      <div className='container-wrapper bg-dashed'>
        <NumberedPagination
          currentPage={pageIndex + 1}
          totalPages={pageCount}
          paginationItemsToDisplay={5}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page[0], 10) - 1
    : 0;
  if (pageIndex < 0 || pageIndex >= pageCount) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getSortedByDatePosts().slice(startIndex, endIndex);

  return (
    <>
      <PageHeader>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl'>
          All {totalPosts} Posts{' '}
          <CurrentPostsCount startIndex={startIndex} endIndex={endIndex} />
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        {/* container */}
        <div>
          <div className='grid divide-y divide-dashed divide-border/70 dark:divide-border text-left'>
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
        </div>
      </div>
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

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page as string, 10)
    : 1;

  const isFirstPage = pageIndex === 1 || !searchParams.page;
  const pageTitle = isFirstPage ? 'Posts' : `Posts - Page ${pageIndex}`;
  const canonicalUrl = isFirstPage ? '/posts' : `/posts?page=${pageIndex}`;

  return createMetadata({
    title: pageTitle,
    description: `Posts${!isFirstPage ? ` - Page ${pageIndex}` : ''}`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  });
}
