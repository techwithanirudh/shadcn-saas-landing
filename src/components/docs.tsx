import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';

export const DocsLayout = (props: DocsLayoutProps): ReactNode => {
  return <FumadocsDocsLayout {...props} />;
};
