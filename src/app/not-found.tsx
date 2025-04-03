import { Header } from '@/components/sections/header';
import { createMetadata } from '@/lib/metadata';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import type { Metadata } from 'next';
import { baseOptions, linkItems } from './layout.config';

export default function NotFound() {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
      className='pt-0'
    >
      <main className='flex flex-1 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24'>
        <div className='container flex min-h-full flex-1 items-center justify-center border-border/70 border-x border-b border-dashed dark:border-border'>
          <div className='flex flex-auto flex-col items-center justify-center px-4 text-center sm:flex-row'>
            <h1 className='border-border font-extrabold text-2xl text-foreground tracking-tight sm:mr-6 sm:border-r sm:pr-6 sm:text-3xl'>
              404
            </h1>
            <h2 className='mt-2 text-muted-foreground sm:mt-0'>
              This page could not be found.
            </h2>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = 'The page you are looking for could not be found.';

  return createMetadata({
    title: 'Not Found',
    description,
  });
}
