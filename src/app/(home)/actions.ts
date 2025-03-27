'use server';

import { ActionError, actionClient } from '@/lib/safe-action';
import { NewsletterSchema } from '@/lib/validators';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const subscribeUser = actionClient
  .schema(NewsletterSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const { data, error } = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });

      if (!data || error) {
        throw new ActionError('Failed to subscribe');
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw new ActionError('Failed to subscribe');
    }
  });
