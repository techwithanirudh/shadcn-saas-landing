import {
  boolean,
  index,
  integer,
  json,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { pgTableCreator } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `blog_${name}`);

export const roles = createTable('roles', {
  userId: varchar('userId', { length: 256 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  canDelete: boolean('canDelete').notNull(),
});

export const comments = createTable('comments', {
  id: serial('id').primaryKey().notNull(),
  page: varchar('page', { length: 256 }).notNull(),
  thread: integer('thread'),
  author: varchar('author', { length: 256 }).notNull(),
  content: json('content').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const rates = createTable(
  'rates',
  {
    userId: varchar('userId', { length: 256 }).notNull(),
    commentId: integer('commentId').notNull(),
    like: boolean('like').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.commentId] }),
    index('comment_idx').on(table.commentId),
  ],
);
