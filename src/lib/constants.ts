export const isProduction = process.env.NODE_ENV === 'production';
export const baseUrl =
  !isProduction || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
