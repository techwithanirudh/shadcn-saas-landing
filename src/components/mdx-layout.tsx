import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import type { ComponentProps, ReactNode } from 'react';
import { PostComments } from '@/app/(home)/(blog)/blog/[slug]/page.client';
import { Section } from './section';

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: ComponentProps<typeof InlineTOC>['items'];
  comments?: boolean;
  slug: string;
}

export default function MdxLayout({
  children,
  title,
  toc,
  comments,
  slug,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='text-center font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          {title}
        </h1>
      </Section>

      <Section className='h-full' sectionClassName='flex flex-1'>
        <article className='flex min-h-full flex-col lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            {toc?.length ? (
              <InlineTOC
                items={toc}
                className='rounded-none border-0 border-border border-b border-dashed'
              />
            ) : (
              <div className='py-2' />
            )}
            <div className='prose min-w-0 flex-1 px-4'>{children}</div>
            {comments ? (
              <PostComments
                slug={slug}
                className='[&_form>div]:!rounded-none rounded-none border-0 border-border border-t border-dashed'
              />
            ) : (
              <div className='py-2' />
            )}
          </div>
        </article>
      </Section>
    </>
  );
}
