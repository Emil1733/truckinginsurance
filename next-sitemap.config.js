/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.truckcoverageexperts.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
  // We exclude server-side sitemaps if we are generating them dynamically in app/sitemap.ts
  // But for now, a basic config ensures the build command doesn't crash.
}
