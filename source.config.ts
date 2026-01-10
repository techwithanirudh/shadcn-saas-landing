import { transformerRemoveNotationEscape } from '@shikijs/transformers';
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import jsonSchema from 'fumadocs-mdx/plugins/json-schema';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { transformerTwoslash } from 'fumadocs-twoslash';
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
          context.issues.push({
            code: 'custom',
            message: 'The value could not be transformed to Date type.',
            input: value,
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
  plugins: [
    jsonSchema({
      insert: true,
    }),
    lastModified(),
  ],
  mdxOptions: async () => {
    const { rehypeCodeDefaultOptions } = await import(
      'fumadocs-core/mdx-plugins/rehype-code'
    );
    const { remarkSteps } = await import(
      'fumadocs-core/mdx-plugins/remark-steps'
    );
    const { default: remarkMath } = await import('remark-math');
    const { default: rehypeKatex } = await import('rehype-katex');
    const { remarkAutoTypeTable } = await import('fumadocs-typescript');

    return {
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
      remarkCodeTabOptions: {
        parseMdx: true,
      },
      remarkNpmOptions: {
        persist: {
          id: 'package-manager',
        },
      },
      remarkPlugins: [remarkSteps, remarkMath, remarkAutoTypeTable],
      rehypePlugins: (v) => [rehypeKatex, ...v],
    };
  },
});
