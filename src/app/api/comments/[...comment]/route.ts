import { auth, storage } from '@/server/comments/config';
import { NextComment } from '@fuma-comment/server/next';

export const { GET, DELETE, PATCH, POST } = NextComment({
  // role: 'database', todo use role in auth
  mention: { enabled: true },
  auth: auth,
  storage: storage,
});
