export function isActive(
  url: string,
  pathname: string,
  nested = true,
): boolean {
  const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  return (
    normalizedUrl === normalizedPathname ||
    (nested && normalizedPathname.startsWith(`${normalizedUrl}/`))
  );
}
