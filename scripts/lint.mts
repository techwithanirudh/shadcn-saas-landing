import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { getTableOfContents } from 'fumadocs-core/content/toc';
import { createGetUrl } from 'fumadocs-core/source';
import { remarkInclude } from 'fumadocs-mdx/config';
import matter from 'gray-matter';
import { printErrors, scanURLs, validateFiles } from 'next-validate-link';
import remarkMdx from 'remark-mdx';

async function readFromPath(file: string) {
  const content = await fs
    .readFile(path.resolve(file))
    .then((res) => res.toString());
  const parsed = matter(content);

  return {
    path: file,
    data: parsed.data,
    content: parsed.content,
  };
}

function toSlugs(relativePath: string) {
  const normalized = relativePath.split(path.sep).join('/');
  const withoutExtension = normalized.replace(/\.mdx?$/, '');
  const segments = withoutExtension.split('/').filter(Boolean);

  if (segments[segments.length - 1] === 'index') {
    segments.pop();
  }

  return segments;
}

async function checkLinks() {
  const blogFiles = await Promise.all(
    await fg('content/**/*.mdx').then((files) => files.map(readFromPath)),
  );

  const blogs = blogFiles.map(async (file) => {
    const slugs = toSlugs(path.relative('content', file.path));

    return {
      value: slugs[0],
      hashes: (
        await getTableOfContents(
          {
            path: file.path,
            value: file.content,
          },
          [remarkMdx, remarkInclude],
        )
      ).map((item) => item.url.slice(1)),
    };
  });

  const scanned = await scanURLs({
    populate: {
      '(home)/blog/[slug]': await Promise.all(blogs),
    },
  });

  console.log(
    `collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`,
  );

  const getUrl = createGetUrl('/blog');
  printErrors(
    await validateFiles([...blogFiles], {
      scanned,

      pathToUrl(value) {
        const slugs = toSlugs(path.relative('content', value));
        return getUrl(slugs);
      },
    }),
    true,
  );
}

void checkLinks();
