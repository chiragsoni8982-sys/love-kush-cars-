/**
 * Automated Sitemap Generator for Love Kush Cars
 * Generates public/sitemap.xml with all static routes, blog posts, and vehicle inventory pages.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const BASE_URL = process.env.VITE_SITE_URL || 'https://lovekushcars.in'
const TODAY = new Date().toISOString().split('T')[0]

// Core public routes with priority and change frequency matching site navigation
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/inventory', priority: '0.9', changefreq: 'daily' },
  { path: '/sell-your-car', priority: '0.9', changefreq: 'weekly' },
  { path: '/finance', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/testimonials', priority: '0.7', changefreq: 'monthly' },
  { path: '/compare', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
]

function extractBlogSlugs() {
  const filePath = path.join(ROOT_DIR, 'src', 'data', 'blogPosts.ts')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g
  const slugs = []
  let match
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1])
  }
  return slugs
}

function extractVehicleIds() {
  const filePath = path.join(ROOT_DIR, 'src', 'data', 'mockVehicles.ts')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  // Match vehicle IDs inside mockVehicles list (excluding outlets or testimonials)
  const mockVehiclesBlock = content.split('export const mockVehicles')[1] || ''
  const idRegex = /id:\s*['"]([^'"]+)['"]/g
  const ids = []
  let match
  while ((match = idRegex.exec(mockVehiclesBlock)) !== null) {
    if (match[1].startsWith('t')) continue // skip testimonials
    ids.push(match[1])
  }
  return ids
}

function generateXml() {
  const blogSlugs = extractBlogSlugs()
  const vehicleIds = extractVehicleIds()

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Core Pages -->`

  for (const route of staticRoutes) {
    xml += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  }

  if (blogSlugs.length > 0) {
    xml += '\n\n  <!-- Blog Articles & Buyer Guides -->'
    for (const slug of blogSlugs) {
      xml += `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    }
  }

  if (vehicleIds.length > 0) {
    xml += '\n\n  <!-- Inventory Vehicles -->'
    for (const id of vehicleIds) {
      xml += `
  <url>
    <loc>${BASE_URL}/inventory/${id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    }
  }

  xml += '\n</urlset>\n'
  return xml
}

const publicPath = path.join(ROOT_DIR, 'public', 'sitemap.xml')
const distPath = path.join(ROOT_DIR, 'dist', 'sitemap.xml')
const xmlContent = generateXml()

fs.writeFileSync(publicPath, xmlContent, 'utf-8')
console.log(`Successfully generated sitemap.xml at: ${publicPath}`)

if (fs.existsSync(path.join(ROOT_DIR, 'dist'))) {
  fs.writeFileSync(distPath, xmlContent, 'utf-8')
  console.log(`Successfully synced sitemap.xml to: ${distPath}`)
}
