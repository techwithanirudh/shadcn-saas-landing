'use client';

import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/app/layout.shared';
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

const Cross = () => (
  <div className='relative h-6 w-6'>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background'>
      <Icons.add className='text-border/70 dark:text-border' size={20} />
    </div>
  </div>
);

function SignInCard() {
  return (
    <div className='relative mx-auto w-full max-w-xl'>
      <div className='absolute -top-3 -left-3 z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <div className='absolute -top-3 -right-3 z-10 hidden h-6 -translate-x-px sm:block'>
        <Cross />
      </div>
      <div className={cn('border-border border-x border-y border-dashed')}>
        <Card className='rounded-none border-none'>
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
                  'flex-col justify-between'
                )}
              >
                <Button
                  className={cn(
                    'w-full gap-2 rounded-none border border-border border-dashed'
                  )}
                  onClick={async () => {
                    await signIn.social({
                      provider: 'google',
                      callbackURL: '/',
                    });
                  }}
                  variant='outline'
                >
                  <Icons.google />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='absolute -bottom-3 -left-3 z-10 hidden h-6 sm:block'>
        <Cross />
      </div>
      <div className='absolute -right-3 -bottom-3 z-10 hidden h-6 -translate-x-px sm:block'>
        <Cross />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <HomeLayout
      {...baseOptions}
      className='pt-0'
      links={linkItems}
      nav={{
        component: <Header links={linkItems} {...baseOptions} />,
      }}
    >
      <main className='flex flex-1'>
        <div className='container relative mx-auto flex min-h-full flex-1 items-center justify-center border-border border-x border-b border-dashed'>
          <SignInCard />
        </div>
      </main>
    </HomeLayout>
  );
}
