/**
 * Static Route Pre-renderer & SEO HTML Generator for Love Kush Cars
 * Runs post-build (after `vite build`).
 * Injects custom metadata, Open Graph, Twitter cards, BreadcrumbList, and Schema.org JSON-LD
 * for every public route, blog post, and vehicle inventory page into dist/<route>/index.html.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

const SITE_NAME = 'Love Kush Cars'
const SITE_URL = 'https://lovekushcars.in'
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo/lk-logo.png`
const PRIMARY_PHONE = '+91 96942 66827'

function getTemplateHtml() {
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (!fs.existsSync(indexPath)) {
    throw new Error(`dist/index.html not found! Run "vite build" first.`)
  }
  return fs.readFileSync(indexPath, 'utf-8')
}

// 1. Extract blog posts
function loadBlogPosts() {
  const filePath = path.join(ROOT_DIR, 'src', 'data', 'blogPosts.ts')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/export const blogPosts[\s\S]*?=\s*(\[[\s\S]*?\n\];?)/)
  if (!match) return []
  try {
    // Evaluate safely
    const fn = new Function(`return ${match[1]}`)
    return fn() || []
  } catch (err) {
    console.warn('Failed to parse blog posts:', err)
    return []
  }
}

// 2. Extract vehicles
function loadVehicles() {
  const filePath = path.join(ROOT_DIR, 'src', 'data', 'mockVehicles.ts')
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/export const mockVehicles[\s\S]*?=\s*(\[[\s\S]*?\n\];?)/)
  if (!match) return []
  try {
    const fn = new Function(`return ${match[1]}`)
    return fn() || []
  } catch (err) {
    console.warn('Failed to parse vehicles:', err)
    return []
  }
}

// Schemas
function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Certified pre-owned luxury and premium cars in Rajasthan. Showrooms in Udaipur and Chittorgarh.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/inventory?searchQuery={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  }
}

function getAutoDealerSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AutoDealer',
      '@id': `${SITE_URL}/#dealer-udaipur`,
      name: 'Love Kush Cars — Udaipur Main Showroom',
      image: DEFAULT_OG_IMAGE,
      url: SITE_URL,
      telephone: PRIMARY_PHONE,
      priceRange: '₹3,00,000 - ₹1,50,00,000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar',
        addressLocality: 'Udaipur',
        addressRegion: 'Rajasthan',
        postalCode: '313001',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 24.6065, longitude: 73.7085 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:30',
          closes: '20:30',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1250',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AutoDealer',
      '@id': `${SITE_URL}/#dealer-chittorgarh`,
      name: 'Love Kush Cars — Chittorgarh Outlet',
      image: DEFAULT_OG_IMAGE,
      url: `${SITE_URL}/inventory?location=Chittorgarh`,
      telephone: PRIMARY_PHONE,
      priceRange: '₹3,00,000 - ₹1,50,00,000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Collectorate Circle, NH-27 Bypass',
        addressLocality: 'Chittorgarh',
        addressRegion: 'Rajasthan',
        postalCode: '312001',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 24.8887, longitude: 74.6269 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:30',
          closes: '20:00',
        },
      ],
    },
  ]
}

function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

function getFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

function getCarSchema(vehicle) {
  const imageUrl = vehicle.photoUrl || (vehicle.gallery && vehicle.gallery[0]) || DEFAULT_OG_IMAGE
  return {
    '@context': 'https://schema.org',
    '@type': ['Car', 'Product'],
    '@id': `${SITE_URL}/inventory/${vehicle.id}#car`,
    name: `${vehicle.year} ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''}`.trim(),
    description:
      vehicle.shortDescription ||
      vehicle.description ||
      `Certified pre-owned ${vehicle.year} ${vehicle.brand} ${vehicle.model} in pristine condition at Love Kush Cars Udaipur & Chittorgarh. 200-point inspection, warranty & instant finance available.`,
    image: [imageUrl],
    brand: { '@type': 'Brand', name: vehicle.brand },
    model: vehicle.model,
    modelDate: String(vehicle.year),
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.kmDriven,
      unitCode: 'KMT',
    },
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/inventory/${vehicle.id}`,
      seller: {
        '@type': 'AutoDealer',
        name: `Love Kush Cars (${vehicle.outletCity || 'Udaipur'})`,
        telephone: PRIMARY_PHONE,
      },
    },
  }
}

function getArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [post.heroImage.startsWith('http') ? post.heroImage : `${SITE_URL}${post.heroImage}`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

function renderHtmlForRoute(templateHtml, pageConfig) {
  const {
    title,
    description,
    canonicalUrl,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    breadcrumbs = [],
    schemas = [],
    fallbackHeading,
    fallbackText,
  } = pageConfig

  let html = templateHtml

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)

  // 2. Replace Description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/s,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`,
  )

  // 3. Replace Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )

  // 4. Update Open Graph
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`)
  html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/s, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`)
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${canonicalUrl}" />`)
  html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/s, `<meta property="og:image" content="${ogImage}" />`)
  html = html.replace(/<meta property="og:type" content=".*?"\s*\/?>/s, `<meta property="og:type" content="${ogType}" />`)

  // 5. Update Twitter
  html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`)
  html = html.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/s, `<meta name="twitter:image" content="${ogImage}" />`)

  // 6. Inject JSON-LD Schema
  if (schemas && schemas.length > 0) {
    const jsonLdContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2)
    const scriptTag = `\n    <script type="application/ld+json" id="lk-seo-jsonld">\n${jsonLdContent}\n    </script>\n`
    html = html.replace('</head>', `${scriptTag}</head>`)
  }

  // 7. Inject Semantic Static Crawler Content into <div id="root">
  if (fallbackHeading && fallbackText) {
    const breadcrumbsHtml =
      breadcrumbs.length > 0
        ? `<nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1rem;">` +
          breadcrumbs
            .map((b, i) =>
              i === breadcrumbs.length - 1
                ? `<span>${b.name}</span>`
                : `<a href="${b.url}">${b.name}</a> &gt; `,
            )
            .join('') +
          `</nav>`
        : ''

    const semanticContent = `
      <div style="max-width:1200px;margin:0 auto;padding:4rem 1.5rem;font-family:sans-serif;">
        ${breadcrumbsHtml}
        <h1 style="font-size:2.25rem;font-weight:bold;margin-bottom:1rem;">${fallbackHeading}</h1>
        <p style="font-size:1.125rem;line-height:1.6;color:#4a5568;max-width:800px;">${fallbackText}</p>
        <div style="margin-top:2rem;">
          <a href="/inventory" style="display:inline-block;padding:0.75rem 1.5rem;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;margin-right:1rem;">Browse Inventory</a>
          <a href="/contact" style="display:inline-block;padding:0.75rem 1.5rem;border:1px solid #ccc;color:#1a1a1a;text-decoration:none;border-radius:4px;">Contact Showrooms</a>
        </div>
      </div>
    `
    html = html.replace('<div id="root"></div>', `<div id="root">${semanticContent}</div>`)
  }

  return html
}

function writeRouteHtml(routePath, htmlContent) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, '')
  const dirPath = cleanPath === '' ? DIST_DIR : path.join(DIST_DIR, cleanPath)
  const filePath = path.join(dirPath, 'index.html')

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  fs.writeFileSync(filePath, htmlContent, 'utf-8')
}

// MAIN EXECUTION
function prerenderAll() {
  console.log('🚀 Starting SEO Pre-rendering for Googlebot and Search Crawlers...')
  const templateHtml = getTemplateHtml()

  // 1. Static Routes
  const staticRoutes = [
    {
      route: '/',
      title: 'Love Kush Cars | Certified Pre-Owned Luxury Cars in Udaipur & Chittorgarh',
      description:
        'Explore 100+ certified pre-owned luxury cars in Rajasthan at Love Kush Cars. 24+ years of trust, 20,000+ satisfied buyers, 200-point inspection, and instant auto loans.',
      canonicalUrl: `${SITE_URL}/`,
      breadcrumbs: [{ name: 'Home', url: '/' }],
      schemas: [getWebSiteSchema(), ...getAutoDealerSchemas()],
      fallbackHeading: 'Certified Pre-Owned Luxury Cars in Rajasthan',
      fallbackText:
        'Love Kush Cars has been delivering trust, automotive excellence, and transparent vehicle handovers across Udaipur and Chittorgarh since 2002. Over 20,000 satisfied buyers.',
    },
    {
      route: '/inventory',
      title: 'Certified Pre-Owned Car Inventory | Udaipur & Chittorgarh | Love Kush Cars',
      description:
        'Browse verified pre-owned luxury SUVs, sedans & automatics in Udaipur and Chittorgarh. Rigorous 200-point inspection, transparent pricing, and instant financing.',
      canonicalUrl: `${SITE_URL}/inventory`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Inventory', url: '/inventory' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Certified Inventory', url: '/inventory' },
        ]),
        ...getAutoDealerSchemas(),
      ],
      fallbackHeading: 'Certified Pre-Owned Inventory — Udaipur & Chittorgarh',
      fallbackText:
        'Explore our comprehensive collection of thoroughly inspected luxury and executive pre-owned cars. Every vehicle passes our 200-point diagnostic inspection with warranty.',
    },
    {
      route: '/sell-your-car',
      title: 'Sell Your Car Online at Best Price | Free Doorstep Inspection | Love Kush Cars',
      description:
        'Sell your used car in 30 minutes in Udaipur & Chittorgarh. Instant bank payment, hassle-free RC transfer, zero hidden fees, and complimentary doorstep evaluation.',
      canonicalUrl: `${SITE_URL}/sell-your-car`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Sell Your Car', url: '/sell-your-car' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Sell Your Car', url: '/sell-your-car' },
        ]),
        getFaqSchema([
          {
            question: 'How quickly can I sell my car at Love Kush Cars?',
            answer:
              'You can complete the evaluation and receive instant bank payment in as little as 30 minutes after inspection.',
          },
          {
            question: 'Who handles the RC transfer and paperwork?',
            answer:
              'Our dedicated legal team manages the entire RTO RC transfer with full legal indemnity so you have zero liabilities.',
          },
          {
            question: 'Is doorstep car inspection free?',
            answer:
              'Yes, we provide 100% complimentary doorstep evaluation across Udaipur, Chittorgarh, and nearby districts.',
          },
        ]),
      ],
      fallbackHeading: 'Sell Your Car at the Best Market Price in Rajasthan',
      fallbackText:
        'Instant valuation, doorstep physical inspection, prompt same-day payment, and complete RTO legal ownership transfer handled end-to-end by Love Kush Cars.',
    },
    {
      route: '/finance',
      title: 'Used Car Loan & Instant EMI Financing | 9+ Bank Partners | Love Kush Cars',
      description:
        'Avail low-interest used car loans up to 90% funding with 9+ national banks (HDFC, ICICI, SBI). Flexible tenures up to 84 months, minimal paperwork, and same-day approval.',
      canonicalUrl: `${SITE_URL}/finance`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Auto Finance', url: '/finance' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Auto Finance', url: '/finance' },
        ]),
        getFaqSchema([
          {
            question: 'What interest rates are available on used car loans?',
            answer:
              'Rates start from 8.75% p.a. depending on your credit profile, loan tenure, and the vehicle segment.',
          },
          {
            question: 'Which banks are partnered with Love Kush Cars?',
            answer:
              'We have direct tie-ups with HDFC Bank, ICICI Bank, State Bank of India, Axis Bank, Kotak Mahindra, and leading NBFCs.',
          },
          {
            question: 'Can I get a loan against my existing car?',
            answer:
              'Yes, we offer Loan Against Car (refinance) up to 150% of the vehicle valuation with same-day disbursement.',
          },
        ]),
      ],
      fallbackHeading: 'Used Car Loan & Auto Financing Desk',
      fallbackText:
        'Compare interest rates and calculate EMIs from top banks including HDFC, ICICI, SBI, Axis, and Kotak. Up to 90% on-road funding with swift approvals.',
    },
    {
      route: '/about',
      title: 'About Us | 24+ Years of Trust & 20,000+ Cars Sold | Love Kush Cars Rajasthan',
      description:
        'Learn about Love Kush Cars, established in 2002. Over 24 years of automotive excellence delivering 20,000+ verified vehicles across Udaipur and Chittorgarh, Rajasthan.',
      canonicalUrl: `${SITE_URL}/about`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]),
        ...getAutoDealerSchemas(),
      ],
      fallbackHeading: '24+ Years of Heritage & 20,000+ Delighted Families',
      fallbackText:
        'Established in Udaipur in 2002, Love Kush Cars has set Rajasthan’s benchmark in certified pre-owned automobile transparency, 200-point vehicle certification, and customer satisfaction.',
    },
    {
      route: '/about-us',
      title: 'About Us | 24+ Years of Trust & 20,000+ Cars Sold | Love Kush Cars Rajasthan',
      description:
        'Learn about Love Kush Cars, established in 2002. Over 24 years of automotive excellence delivering 20,000+ verified vehicles across Udaipur and Chittorgarh, Rajasthan.',
      canonicalUrl: `${SITE_URL}/about`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]),
      ],
      fallbackHeading: 'About Love Kush Cars Rajasthan',
      fallbackText:
        'Established in Udaipur in 2002, Love Kush Cars has set Rajasthan’s benchmark in certified pre-owned automobile transparency.',
    },
    {
      route: '/contact',
      title: 'Contact Us | Udaipur & Chittorgarh Showrooms | Love Kush Cars Rajasthan',
      description:
        'Visit Love Kush Cars at our flagship Udaipur showroom (100 Ft Road, Meera Nagar) or our Chittorgarh outlet (NH-27 Bypass). Call +91 96942 66827 for test drives.',
      canonicalUrl: `${SITE_URL}/contact`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' },
        ]),
        ...getAutoDealerSchemas(),
      ],
      fallbackHeading: 'Connect with Love Kush Cars — Udaipur & Chittorgarh',
      fallbackText:
        'Visit our flagship showroom on 100 Ft Road, Meera Nagar, Udaipur or our new showroom outlet on NH-27 Bypass, Chittorgarh. Helpline: +91 96942 66827.',
    },
    {
      route: '/contact-us',
      title: 'Contact Us | Udaipur & Chittorgarh Showrooms | Love Kush Cars Rajasthan',
      description:
        'Visit Love Kush Cars at our flagship Udaipur showroom (100 Ft Road, Meera Nagar) or our Chittorgarh outlet (NH-27 Bypass). Call +91 96942 66827 for test drives.',
      canonicalUrl: `${SITE_URL}/contact`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' },
        ]),
      ],
      fallbackHeading: 'Contact Us',
      fallbackText: 'Contact Love Kush Cars Udaipur & Chittorgarh.',
    },
    {
      route: '/blog',
      title: 'Automotive Journal & Pre-Owned Car Buying Guides | Love Kush Cars',
      description:
        'Expert car buying guides, maintenance checklists, RTO legal advice, and luxury SUV reviews crafted by Love Kush Cars automotive specialists in Rajasthan.',
      canonicalUrl: `${SITE_URL}/blog`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Automotive Journal', url: '/blog' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Automotive Journal', url: '/blog' },
        ]),
      ],
      fallbackHeading: 'Automotive Journal & Pre-Owned Car Guides',
      fallbackText:
        'Comprehensive buying advice, vehicle maintenance tips, and RTO paperwork guides written by certified automotive experts at Love Kush Cars.',
    },
    {
      route: '/testimonials',
      title: 'Customer Reviews & Testimonials | 4.9★ Rating | Love Kush Cars',
      description:
        'Read verified reviews from 20,000+ happy car buyers across Rajasthan. Discover why Love Kush Cars is rated 4.9 stars on Google for pre-owned luxury car sales.',
      canonicalUrl: `${SITE_URL}/testimonials`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Testimonials', url: '/testimonials' },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Testimonials', url: '/testimonials' },
        ]),
      ],
      fallbackHeading: 'What Rajasthan Says About Love Kush Cars',
      fallbackText:
        'Over 20,000 customers have trusted us since 2002. Read real reviews and handover stories from car buyers in Udaipur, Chittorgarh, Bhilwara, and across Rajasthan.',
    },
    {
      route: '/compare',
      title: 'Compare Certified Pre-Owned Cars Side by Side | Love Kush Cars',
      description:
        'Compare specifications, prices, fuel types, mileage, and features of pre-owned luxury cars side-by-side to make the smartest purchase decision.',
      canonicalUrl: `${SITE_URL}/compare`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Compare Cars', url: '/compare' },
      ],
      fallbackHeading: 'Compare Certified Vehicles Side-by-Side',
      fallbackText: 'Compare engines, fuel efficiency, pricing, and features of certified luxury cars at Love Kush Cars.',
    },
    {
      route: '/privacy-policy',
      title: 'Privacy Policy | Love Kush Cars',
      description:
        'Review our privacy policy regarding how Love Kush Cars collects, protects, and uses customer information for car buying, selling, and financing.',
      canonicalUrl: `${SITE_URL}/privacy-policy`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy-policy' },
      ],
      fallbackHeading: 'Privacy Policy',
      fallbackText: 'Love Kush Cars values customer data privacy and ensures secure handling of all inquiries.',
    },
    {
      route: '/terms-and-conditions',
      title: 'Terms and Conditions | Love Kush Cars',
      description:
        'Read the official terms and conditions for purchasing, selling, inspecting, and financing certified pre-owned vehicles with Love Kush Cars.',
      canonicalUrl: `${SITE_URL}/terms-and-conditions`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Terms & Conditions', url: '/terms-and-conditions' },
      ],
      fallbackHeading: 'Terms and Conditions',
      fallbackText: 'Review terms governing vehicle sales, inspections, and financing at Love Kush Cars.',
    },
  ]

  let count = 0
  for (const item of staticRoutes) {
    const html = renderHtmlForRoute(templateHtml, item)
    writeRouteHtml(item.route, html)
    count++
  }
  console.log(`✅ Pre-rendered ${count} static core pages.`)

  // 2. Blog Posts
  const blogPosts = loadBlogPosts()
  let blogCount = 0
  for (const post of blogPosts) {
    const postConfig = {
      title: `${post.title} | Love Kush Cars Automotive Journal`,
      description: post.excerpt,
      canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
      ogImage: post.heroImage.startsWith('http') ? post.heroImage : `${SITE_URL}${post.heroImage}`,
      ogType: 'article',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Automotive Journal', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Automotive Journal', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]),
        getArticleSchema(post),
      ],
      fallbackHeading: post.title,
      fallbackText: `${post.subtitle ? post.subtitle + ' — ' : ''}${post.excerpt}`,
    }
    const html = renderHtmlForRoute(templateHtml, postConfig)
    writeRouteHtml(`/blog/${post.slug}`, html)
    blogCount++
  }
  console.log(`✅ Pre-rendered ${blogCount} blog article pages.`)

  // 3. Vehicles
  const vehicles = loadVehicles()
  let vehicleCount = 0
  for (const v of vehicles) {
    const carTitle = `${v.year} ${v.brand} ${v.model} ${v.variant || ''} for Sale in ${v.outletCity || 'Udaipur'} | Love Kush Cars`.trim()
    const priceFormatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(v.price)
    const carDesc = `Certified pre-owned ${v.year} ${v.brand} ${v.model} ${v.variant || ''} priced at ${priceFormatted}. ${Number(v.kmDriven).toLocaleString('en-IN')} km, ${v.fuelType}, ${v.transmission} in ${v.outletCity || 'Udaipur'}. 200-point inspected with warranty.`
    const carImage = v.photoUrl || (v.gallery && v.gallery[0]) || DEFAULT_OG_IMAGE

    const vehicleConfig = {
      title: carTitle,
      description: carDesc,
      canonicalUrl: `${SITE_URL}/inventory/${v.id}`,
      ogImage: carImage.startsWith('http') ? carImage : `${SITE_URL}${carImage}`,
      ogType: 'product',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Inventory', url: '/inventory' },
        { name: `${v.year} ${v.brand} ${v.model}`, url: `/inventory/${v.id}` },
      ],
      schemas: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Inventory', url: '/inventory' },
          { name: `${v.year} ${v.brand} ${v.model}`, url: `/inventory/${v.id}` },
        ]),
        getCarSchema(v),
      ],
      fallbackHeading: `${v.year} ${v.brand} ${v.model} ${v.variant || ''}`,
      fallbackText: `${carDesc} Available for immediate test drive at Love Kush Cars ${v.outletCity || 'Udaipur'}. Call ${PRIMARY_PHONE}.`,
    }

    const html = renderHtmlForRoute(templateHtml, vehicleConfig)
    writeRouteHtml(`/inventory/${v.id}`, html)
    vehicleCount++
  }
  console.log(`✅ Pre-rendered ${vehicleCount} vehicle inventory pages.`)

  console.log(`🎉 Total pre-rendered routes: ${count + blogCount + vehicleCount}. All pages ready for instant Google indexing!`)
}

prerenderAll()
