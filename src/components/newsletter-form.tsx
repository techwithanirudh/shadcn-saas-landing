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

import { subscribeUser } from '@/app/(home)/actions';
import { Icons } from '@/components/ui/icons';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-4'>
        <div className='flex h-full min-h-10 overflow-hidden rounded-md border bg-muted p-0'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='group h-full'>
                  <FormControl className='h-full group-has-[p]:pt-3'>
                    <Input
                      {...field}
                      disabled={status === 'executing'}
                      placeholder='Email address'
                      type='email'
                      className='h-full rounded-md rounded-r-none border-none px-4 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage className='ml-4 pb-2 text-xs' />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={status === 'executing'}
            type='submit'
            size='icon'
            className='size-auto w-15 rounded-md rounded-l-none px-3'
          >
            {status === 'executing' ? (
              <Icons.spinner className='size-4 animate-spin' />
            ) : (
              <Icons.send className='size-4' />
            )}
          </Button>
        </div>

        {status === 'hasSucceeded' && (
          <Alert className='border-emerald-500/15 bg-emerald-500/15 p-3 px-3 py-2 text-emerald-500 has-[>svg]:gap-x-1.5'>
            <Icons.success size={16} />
            <AlertTitle className='mb-0 leading-normal'>
              {result.data?.message ?? "Hmm... Our server didn't respond."}
            </AlertTitle>
          </Alert>
        )}
        {result.serverError && (
          <Alert className='border-destructive/15 bg-destructive/15 p-3 px-3 py-2 text-destructive has-[>svg]:gap-x-1.5 dark:border-destructive dark:bg-destructive dark:text-destructive-foreground'>
            <Icons.warning className='size-4' />
            <AlertTitle className='mb-0 leading-normal'>
              {result.serverError}
            </AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};
