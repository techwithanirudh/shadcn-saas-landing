import type { AuthAdapter } from '@fuma-comment/server';
import { createBetterAuthAdapter } from '@fuma-comment/server/adapters/better-auth';
import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle';
import type { CustomRequest } from '@fuma-comment/server/custom';

import { auth as betterAuth } from '@/server/auth';
import { db } from '@/server/db';
import { comments, rates, roles, users } from '@/server/db/schema';

export const auth: AuthAdapter<CustomRequest> =
  createBetterAuthAdapter(betterAuth);
export const storage = createDrizzleAdapter({
  db,
  schemas: {
    comments,
    rates,
    roles,
    user: users,
  },
  auth: 'better-auth',
});
