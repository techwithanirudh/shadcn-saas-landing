import { transformerRemoveNotationEscape } from '@shikijs/transformers';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content',
  schema: frontmatterSchema.extend({
    date: z
      .string()
      .or(z.date())
      .transform((value, context) => {
        try {
          return new Date(value);
        } catch {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date',
          });
          return z.NEVER;
        }
      }),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
        transformerRemoveNotationEscape(),
      ],
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
