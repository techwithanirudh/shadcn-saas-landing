import type { TOCItemType } from 'fumadocs-core/server';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import type { ReactNode } from 'react';
import PageHeader from './page-header';

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: TOCItemType[] | null;
}

export default function MdxLayout({
  children,
  title,
  toc,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <PageHeader>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl text-center'>
          {title}
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        <article className='container flex flex-col px-4 lg:flex-row min-h-full'>
          <div className='flex-1 flex flex-col gap-4'>
            {toc?.length ? (
              <InlineTOC
                items={toc}
                className='rounded-none -ml-4 -mr-4 xl:-ml-6  lg:mr-0 border-0 border-dashed border-border/70 dark:border-border border-b xl:px-2'
              />
            ) : null}
            <div className='prose min-w-0 flex-1 py-4 pr-4'>{children}</div>
          </div>
        </article>
      </div>
    </>
  );
}
