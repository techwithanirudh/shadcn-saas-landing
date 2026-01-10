import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import type { PageTree } from '@/lib/source';
import { cn } from '@/lib/utils';
import { Header } from './sections/header';

type FumadocsLayoutProps = ComponentProps<typeof FumadocsDocsLayout>;

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree;
  sidebar?: FumadocsLayoutProps['sidebar'];
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const DocsLayout = ({
  nav = {},
  ...props
}: DocsLayoutProps): ReactNode => {
  return (
    <div className='[--fd-layout-width:1280px]'>
      <Header githubUrl={props.githubUrl} links={props.links} nav={nav} />
      <FumadocsDocsLayout
        containerProps={{
          ...props.containerProps,
          className: cn(
            'mx-auto w-full max-w-(--fd-layout-width) [--fd-banner-height:3.5rem]',
            props.containerProps?.className
          ),
        }}
        nav={{ enabled: false }}
        sidebar={props.sidebar}
        tree={props.tree}
      >
        {props.children}
      </FumadocsDocsLayout>
    </div>
  );
};
