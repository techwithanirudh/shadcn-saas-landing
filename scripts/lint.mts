import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import matter from 'gray-matter';
import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link';

const getUrl = createGetUrl('/blog');

async function readFromPath(file: string) {
  const content = await fs
    .readFile(path.resolve(file))
    .then((res) => res.toString());
  const parsed = matter(content);
  const slugs = getSlugs(path.relative('content', file));

  return {
    path: file,
    data: parsed.data,
    content: parsed.content,
    url: getUrl(slugs),
    slugs,
  };
}

async function checkLinks() {
  const blogFiles = await Promise.all(
    await fg('content/**/*.mdx').then((files) => files.map(readFromPath)),
  );

  const scanned = await scanURLs({
    populate: {
      '(home)/blog/[slug]': blogFiles.map((file) => ({
        value: file.slugs[0],
        hashes: [],
      })),
    },
  });

  console.log(
    `collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`,
  );

  const files: FileObject[] = blogFiles.map((file) => ({
    data: file.data,
    url: file.url,
    path: file.path,
    content: file.content,
  }));

  printErrors(
    await validateFiles(files, {
      scanned,
    }),
    true,
  );
}

await checkLinks();
