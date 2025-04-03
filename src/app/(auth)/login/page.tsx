'use client';

import { baseOptions, linkItems } from '@/app/layout.config';
import { Icons } from '@/components/icons/icons';
import { Header } from '@/components/sections/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import { PlusIcon } from 'lucide-react';

const Cross = () => (
  <div className='relative h-6 w-6'>
    <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 bg-background'>
      <PlusIcon size={20} className='text-border/70 dark:text-border' />
    </div>
  </div>
);

function SignInCard() {
  return (
    <Card className='relative w-full max-w-xl rounded-none border border-border/70 border-dashed shadow-none dark:border-border'>
      <div className='-top-3 -left-3 absolute z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <div className='-top-3 -right-3 -translate-x-px absolute z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>Sign In</CardTitle>
        <CardDescription className='text-xs md:text-sm'>
          Sign in with your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div
            className={cn(
              'flex w-full items-center gap-2',
              'flex-col justify-between',
            )}
          >
            <Button
              variant='outline'
              className={cn(
                'w-full gap-2 rounded-none border border-border/70 border-dashed dark:border-border',
              )}
              onClick={async () => {
                await signIn.social({
                  provider: 'google',
                  callbackURL: '/',
                });
              }}
            >
              <Icons.google />
              Sign in with Google
            </Button>
            <Button
              variant='outline'
              className={cn(
                'w-full gap-2 rounded-none border border-border/70 border-dashed dark:border-border',
              )}
              onClick={async () => {
                await signIn.social({
                  provider: 'github',
                  callbackURL: '/',
                });
              }}
            >
              <Icons.gitHub />
              Sign in with Github
            </Button>
          </div>
        </div>
      </CardContent>
      <div className='-bottom-3 -left-3 absolute z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <div className='-bottom-3 -right-3 -translate-x-px absolute z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
    </Card>
  );
}

export default function LoginPage() {
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
      className='border-grid pt-0'
    >
      <main className='flex flex-1 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24'>
        <div className='container flex min-h-full flex-1 items-center justify-center border-border/70 border-x border-b border-dashed dark:border-border'>
          <SignInCard />
        </div>
      </main>
    </HomeLayout>
  );
}
