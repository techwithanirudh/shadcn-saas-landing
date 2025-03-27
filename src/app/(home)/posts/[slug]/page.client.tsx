'use client';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Comments } from '@fuma-comment/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export function Share({ url }: { url: string }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const onClick = (): void => {
    setOpen(true);
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
  };

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className={cn(
          buttonVariants({ className: 'gap-2', variant: 'secondary' }),
        )}
        onClick={onClick}
      >
        <Icons.share className='size-4' />
        Share Post
      </TooltipTrigger>
      <TooltipContent className='rounded-lg border bg-fd-popover p-2 text-fd-popover-foreground text-sm'>
        Copied
      </TooltipContent>
    </Tooltip>
  );
}

export function PostComments({
  slug,
  className,
}: { slug: string; className?: string }) {
  return (
    <Comments
      page={slug}
      className={cn('w-full', className)}
      auth={{
        type: 'api',
        signIn: () => {
          redirect('/login');
        },
      }}
    />
  );
}
