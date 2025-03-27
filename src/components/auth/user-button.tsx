'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from '@/lib/auth-client';
import { signOut, useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import type { UserAvatarClassNames } from './user-avatar';
import { UserAvatar } from './user-avatar';

export interface UserButtonClassNames {
  base?: string;
  skeleton?: string;
  trigger?: {
    base?: string;
    avatar?: UserAvatarClassNames;
    skeleton?: string;
  };
  content?: {
    base?: string;
    avatar?: UserAvatarClassNames;
    menuItem?: string;
    separator?: string;
  };
}

export interface UserButtonProps {
  className?: string;
  classNames?: UserButtonClassNames;
}

export function UserButton({ className, classNames }: UserButtonProps) {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user ?? null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn('rounded-md bg-transparent', classNames?.trigger?.base)}
        asChild
      >
        <Button
          variant='ghost'
          className='size-auto rounded-md border-none bg-transparent p-1.5 hover:bg-accent dark:hover:bg-accent'
          disabled={isPending}
        >
          {isPending ? (
            <Skeleton
              className={cn(
                'size-5 rounded-md',
                className,
                classNames?.base,
                classNames?.skeleton,
                classNames?.trigger?.skeleton,
              )}
            />
          ) : (
            <UserAvatar
              className={cn('size-5', className, classNames?.base)}
              classNames={classNames?.trigger?.avatar}
              user={user}
            />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn('max-w-64', classNames?.content?.base)}
        onCloseAutoFocus={(e) => e.preventDefault()}
        align='end'
      >
        {user ? (
          <div className='flex items-center gap-2 p-2'>
            <UserAvatar classNames={classNames?.content?.avatar} user={user} />

            <div className='flex flex-col truncate'>
              <div className='truncate font-medium text-sm'>
                {user.name || user.email}
              </div>

              {user.name && (
                <div className='truncate text-muted-foreground text-xs'>
                  {user.email}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='px-2 py-1 text-muted-foreground text-xs'>Account</div>
        )}

        <DropdownMenuSeparator className={classNames?.content?.separator} />

        {!user ? (
          <>
            <DropdownMenuItem className={classNames?.content?.menuItem} asChild>
              <Link href={'/login'}>
                <Icons.logIn className='size-4' />
                Sign In
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className={classNames?.content?.menuItem}
              onClick={() => signOut()}
            >
              <Icons.logOut className='size-4' />
              Log Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
