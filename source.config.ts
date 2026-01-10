import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
  type MDXPresetOptions,
} from 'fumadocs-mdx/config';
import jsonSchema from 'fumadocs-mdx/plugins/json-schema';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import type { Element, ElementContent } from 'hast';
import type { ShikiTransformer } from 'shiki';
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

const transformerEscape = (): ShikiTransformer => {
  return {
    name: '@shikijs/transformers:remove-notation-escape',
    code(hast: Element) {
      const replace = (node: ElementContent) => {
        if (node.type === 'text') {
          node.value = node.value.replace('[\\!code', '[!code');
        } else if ('children' in node) {
          for (const child of node.children) {
            replace(child);
          }
        }
      };

      replace(hast);
      return hast;
    },
  };
};

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
        langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
        inline: 'tailing-curly-colon',
        themes: {
          light: 'github-light',
          dark: 'tokyo-night',
        },
        transformers: [
          ...(rehypeCodeDefaultOptions.transformers ?? []),
          transformerEscape(),
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
      rehypePlugins: (v: unknown[]) => [rehypeKatex, ...v],
    } as unknown as MDXPresetOptions;
  },
});
