'use client';

import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Contact } from '@/lib/validators/contact';
import { ContactSchema } from '@/lib/validators/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Alert, AlertTitle } from '@/components/ui/alert';

import { Icons } from '@/components/icons/icons';
import { Textarea } from '@/components/ui/textarea';
import { Suspense } from 'react';
import { contact } from '../actions/contact';

const ContactFormInner = () => {
  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { execute, result, status } = useAction(contact);

  const onSubmit = (values: Contact) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className='bg-background'
                  placeholder='Jane Smith'
                  {...field}
                  disabled={status === 'executing'}
                />
              </FormControl>
              <FormDescription>
                Your full name, so we know who we are talking to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  className='bg-background'
                  placeholder='jane@acme.com'
                  {...field}
                  disabled={status === 'executing'}
                />
              </FormControl>
              <FormDescription>
                We will never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi there, I'm interested in..."
                  className='max-h-[20rem] min-h-[10rem] resize-y bg-background'
                  {...field}
                  disabled={status === 'executing'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={!form.formState.isValid || status === 'executing'}
        >
          {status === 'executing' ? (
            <Icons.spinner className='mr-2 size-4 animate-spin' />
          ) : null}
          Send Message
        </Button>
        {status === 'hasSucceeded' && (
          <Alert className='border-emerald-500/15 bg-emerald-500/15 p-3 px-3 py-2 text-emerald-500 has-[>svg]:gap-x-1.5'>
            <Icons.success size={16} />
            <AlertTitle className='mb-0 leading-normal'>
              {result.data?.success && result.data?.message
                ? result.data.message
                : "Your message has been sent! We'll get back to you soon."}
            </AlertTitle>
          </Alert>
        )}
        {result.serverError && (
          <Alert className='border-destructive/15 bg-destructive/15 p-3 px-3 py-2 text-destructive has-[>svg]:gap-x-1.5 dark:border-destructive dark:bg-destructive dark:text-destructive-foreground'>
            <Icons.warning className='size-4' />
            <AlertTitle className='mb-0 leading-normal'>
              {typeof result.serverError === 'string'
                ? result.serverError
                : 'An error occurred while sending your message.'}
            </AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export const ContactForm = () => (
  <Suspense>
    <ContactFormInner />
  </Suspense>
);
