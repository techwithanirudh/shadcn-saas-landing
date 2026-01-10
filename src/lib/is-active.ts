export function normalize(urlOrPath: string) {
  if (urlOrPath.length > 1 && urlOrPath.endsWith('/')) {
    return urlOrPath.slice(0, -1);
  }
  return urlOrPath;
}

/**
 * @returns if `href` is matching the given pathname
 */
export function isActive(
  href: string,
  pathname: string,
  nested = true
): boolean {
  const normalizedHref = normalize(href);
  const normalizedPathname = normalize(pathname);

  return (
    normalizedHref === normalizedPathname ||
    (nested && normalizedPathname.startsWith(`${normalizedHref}/`))
  );
}
