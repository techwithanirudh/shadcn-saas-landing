import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { cn } from 'fumadocs-ui/utils/cn';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import type { PageTree } from '@/lib/source';
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
      <Header links={props.links} githubUrl={props.githubUrl} nav={nav} />
      <FumadocsDocsLayout
        tree={props.tree}
        sidebar={props.sidebar}
        nav={{ enabled: false }}
        containerProps={{
          ...props.containerProps,
          className: cn(
            'mx-auto w-full max-w-(--fd-layout-width) [--fd-banner-height:3.5rem]',
            props.containerProps?.className,
          ),
        }}
      >
        {props.children}
      </FumadocsDocsLayout>
    </div>
  );
};
