import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client' // Adjust based on your path

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gfdeuchecollections.vercel.app"

  // 1. Fetch all product slugs and their last update time from Sanity
  const products = await client.fetch(`
    *[_type == "product" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  // 2. Map products to sitemap format
  const productEntries = products.map((product: any) => ({
    url: `${baseUrl}/shop/product/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 3. Define your static main pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticPages, ...productEntries]
}