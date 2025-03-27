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
        <h1 className='text-center font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          {title}
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        <article className='container flex min-h-full flex-col px-4 lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            {toc?.length ? (
              <InlineTOC
                items={toc}
                className='-ml-4 -mr-4 xl:-ml-6 rounded-none border-0 border-border/70 border-b border-dashed lg:mr-0 xl:px-2 dark:border-border'
              />
            ) : null}
            <div className='prose min-w-0 flex-1 py-4 pr-4'>{children}</div>
          </div>
        </article>
      </div>
    </>
  );
}
