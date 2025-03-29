import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { getTableOfContents } from 'fumadocs-core/server';
import { createGetUrl, getSlugs, parseFilePath } from 'fumadocs-core/source';
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

async function checkLinks() {
  const blogFiles = await Promise.all(
    await fg('content/**/*.mdx').then((files) => files.map(readFromPath)),
  );

  const blogs = blogFiles.map(async (file) => {
    const info = parseFilePath(path.relative('content', file.path));

    return {
      value: getSlugs(info)[0],
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
      '(home)/posts/[slug]': await Promise.all(blogs),
    },
  });

  console.log(
    `collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`,
  );

  const getUrl = createGetUrl('/posts');
  printErrors(
    await validateFiles([...blogFiles], {
      scanned,

      pathToUrl(value) {
        const info = parseFilePath(path.relative('content', value));
        return getUrl(getSlugs(info));
      },
    }),
    true,
  );
}

void checkLinks();
