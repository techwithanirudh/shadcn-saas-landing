'use client';
import { buttonVariants } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type NumberedPaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

function NumberedPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
}: NumberedPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  const handlePageChange = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className='inline-flex gap-0 -space-x-px rtl:space-x-reverse w-full'>
        <PaginationItem>
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50',
            )}
            href='#'
            onClick={handlePageChange(currentPage - 1)}
            aria-label='Go to previous page'
            aria-disabled={currentPage === 1}
          >
            <ChevronLeft size={16} strokeWidth={2} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>

        <div className='w-full inline-flex justify-center '>
          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationLink
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'pointer-events-none rounded-none shadow-none',
                )}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )}

          {pages.map((page) => (
            <PaginationItem key={page} className='w-max'>
              <PaginationLink
                className={cn(
                  buttonVariants({
                    variant: page === currentPage ? 'default' : 'ghost',
                  }),
                  'rounded-none border-0 shadow-none focus-visible:z-10',
                  page === currentPage &&
                    'min-w-full dark:bg-primary dark:hover:bg-primary/90',
                )}
                href='#'
                onClick={handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationLink
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'pointer-events-none rounded-none shadow-none',
                )}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50',
            )}
            href='#'
            onClick={handlePageChange(currentPage + 1)}
            aria-label='Go to next page'
            aria-disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} strokeWidth={2} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { NumberedPagination };
