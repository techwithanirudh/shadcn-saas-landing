import { loader } from 'fumadocs-core/source';
import { blog } from 'fumadocs-mdx:collections/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const {
  getPage: getPost,
  getPages: getPosts,
  pageTree,
} = loader(toFumadocsSource(blog, []), {
  baseUrl: '/blog',
});

export type Post = ReturnType<typeof getPost>;
export type Page = ReturnType<typeof getPosts>[number];

const posts = getPosts();

export const getSortedByDatePosts = () =>
  posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getTags = () => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).toSorted();
};

export const getPostsByTag = (tag: string) => {
  return posts
    .filter((post) => post.data.tags?.includes(tag))
    .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
