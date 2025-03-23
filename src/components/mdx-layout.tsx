import type { ReactNode } from 'react';
import PageHeader from './page-header';

export default function MdxLayout({
  children,
  title,
}: { children: ReactNode; title: string }): ReactNode {
  return (
    <>
      <PageHeader>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl text-center'>
          {title}
        </h1>
      </PageHeader>
      <div className='container-wrapper flex-1'>
        <article className='container flex flex-col px-4 lg:flex-row min-h-full'>
          <div className='prose min-w-0 flex-1 py-4 pr-4'>{children}</div>
        </article>
      </div>
    </>
  );
}
