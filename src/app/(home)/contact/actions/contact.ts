'use server';

import { Resend } from 'resend';
import { ActionError, actionClient } from '@/lib/safe-action';
import { ContactSchema } from '@/lib/validators/contact';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY as string);

export const contact = actionClient
  .schema(ContactSchema)
  .action(async ({ parsedInput: { name, email, message } }) => {
    try {
      const { data, error } = await resend.emails.send({
        from: env.EMAIL_FROM,
        to: env.EMAIL_FROM,
        subject: `New contact form submission from ${name}`,
        text: message,
        replyTo: email,
      });

      if (error) {
        console.error('Error sending contact email:', error);
        throw new ActionError(`Failed to send contact email: ${error.message}`);
      }

      return {
        success: true,
        message: 'Your message has been sent! We\'ll get back to you soon.',
      };
    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof ActionError) throw error;
      throw new ActionError('Failed to send your message. Please try again later.');
    }
  });
