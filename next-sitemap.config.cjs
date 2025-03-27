const siteUrl =
  process.env.NODE_ENV === 'development' ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('https://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
};
