import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://gfdeuchecollections.vercel.app"

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // We block these to save "Crawl Budget" and protect private areas
        disallow: [
          '/cart',
          '/checkout',
          '/store',    // Your Sanity Studio (if embedded)
          '/admin',
          '/api/',      // Protect your internal API routes
        ],
      },
      {
        // Specific rule for AI bots if you want to protect your designs
        userAgent: ['GPTBot', 'CCBot'],
        disallow: ['/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}