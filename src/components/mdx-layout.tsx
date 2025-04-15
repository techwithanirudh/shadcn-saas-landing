import { PostComments } from '@/app/(home)/(blog)/blog/[slug]/page.client';
import type { TOCItemType } from 'fumadocs-core/server';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import type { ReactNode } from 'react';
import { Section } from './section';

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: TOCItemType[] | null;
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
        <h1 className='text-center font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          {title}
        </h1>
      </Section>

      <Section className='h-full' sectionClassName='flex flex-1'>
        <article className='flex min-h-full flex-col lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            {toc?.length ? (
              <InlineTOC
                items={toc}
                className='rounded-none border-0 border-b border-dashed border-border'
              />
            ) : null}
            <div className='prose min-w-0 flex-1 px-4'>{children}</div>
            {comments ? (
              <PostComments
                slug={slug}
                className='[&_form>div]:!rounded-none rounded-none border-0 border-t border-dashed border-border'
              />
            ) : null}
          </div>
        </article>
      </Section>
    </>
  );
}
