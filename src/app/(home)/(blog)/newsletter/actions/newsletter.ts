'use server';

import { getContact, sendWelcomeEmail, updateContact } from '@/lib/resend';
import { ActionError, actionClient } from '@/lib/safe-action';
import { getSortedByDatePosts } from '@/lib/source';
import { NewsletterSchema } from '@/lib/validators';
import { getSession } from '@/server/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);
const audienceId = process.env.RESEND_AUDIENCE_ID as string;

const splitName = (name = '') => {
  const [firstName, ...lastName] = name.split(' ').filter(Boolean);
  return {
    firstName: firstName,
    lastName: lastName.join(' '),
  };
};

export const subscribeUser = actionClient
  .schema(NewsletterSchema)
  .action(async ({ parsedInput: { email } }) => {
    const session = await getSession();
    const fullName = session?.user.name || '';
    const { firstName, lastName } = fullName
      ? splitName(fullName)
      : { firstName: '', lastName: '' };

    try {
      const contact = await getContact({ email, audienceId });

      if (contact) {
        await updateContact({
          email,
          firstName,
          lastName,
          audienceId,
          unsubscribed: false,
        });

        return {
          success: true,
          message: 'You are already subscribed to our newsletter!',
        };
      }

      const { data, error } = await resend.contacts.create({
        email,
        audienceId,
        firstName,
        lastName,
        unsubscribed: false,
      });

      if (!data || error) {
        throw new Error(
          `Failed to create contact: ${error?.message || 'Unknown error'}`,
        );
      }

      const posts = getSortedByDatePosts();
      await sendWelcomeEmail({
        posts,
        to: email,
        firstName: firstName || 'there',
      });

      return {
        success: true,
        message: 'You are now subscribed to our newsletter!',
      };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      if (error instanceof ActionError) throw error;
      throw new ActionError('Oops, something went wrong while subscribing.');
    }
  });
