import { z } from 'zod';

export const NewsletterSchema = z.object({
  email: z.string().email(),
});
export type Newsletter = z.infer<typeof NewsletterSchema>;
