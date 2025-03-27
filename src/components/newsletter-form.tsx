'use client';

import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Newsletter } from '@/lib/validators';
import { NewsletterSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  CircleCheckIcon,
  SendHorizontalIcon,
  SendIcon,
  TriangleAlertIcon,
} from 'lucide-react';

import { subscribeUser } from '@/app/(home)/actions';
import { LoaderIcon } from 'lucide-react';

export const NewsletterForm = () => {
  const form = useForm({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute, result, status } = useAction(subscribeUser);

  const onSubmit = (values: Newsletter) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex-1'>
        <div className='overflow-hidden rounded-md border bg-muted p-0 flex min-h-10 h-full'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='h-full group'>
                  <FormControl className='h-full group-has-[p]:pt-3'>
                    <Input
                      {...field}
                      disabled={status === 'executing'}
                      placeholder='Email address'
                      type='email'
                      className='border-none rounded-md rounded-r-none px-4 focus-visible:ring-0 focus-visible:ring-offset-0 h-full'
                    />
                  </FormControl>
                  <FormMessage className='ml-4 text-xs pb-2' />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={status === 'executing'}
            type='submit'
            size='icon'
            className='rounded-md rounded-l-none px-3 size-auto'
          >
            {status === 'executing' ? (
              <LoaderIcon className='size-4 animate-spin' />
            ) : (
              <SendHorizontalIcon className='size-4' />
            )}
          </Button>
        </div>

        {status === 'hasSucceeded' && (
          <Alert className='bg-emerald-500/15 text-emerald-500 p-3 border-emerald-500/15 py-2 px-3 has-[>svg]:gap-x-1.5'>
            <CircleCheckIcon size={16} />
            <AlertTitle className='mb-0 leading-normal'>
              You are now subscribed to our newsletter!
            </AlertTitle>
          </Alert>
        )}
        {result.serverError && (
          <Alert className='bg-destructive/15 text-destructive dark:bg-destructive dark:text-destructive-foreground p-3 border-destructive/15 dark:border-destructive py-2 px-3 has-[>svg]:gap-x-1.5'>
            <TriangleAlertIcon className='size-4' />
            <AlertTitle className='mb-0 leading-normal'>
              {result.serverError}
            </AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};
