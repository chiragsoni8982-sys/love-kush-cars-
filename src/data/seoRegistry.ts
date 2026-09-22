/**
 * SEO Registry & Structured Data Generators for Love Kush Cars
 * Canonical domain: https://lovekushcars.in
 */

import type { Vehicle } from '@/types'
import type { BlogPost } from '@/data/blogPosts'

export const SITE_NAME = 'Love Kush Cars'
export const SITE_URL = 'https://lovekushcars.in'
export const DEFAULT_OG_IMAGE = 'https://lovekushcars.in/logo/lk-logo.png'
export const PRIMARY_PHONE = '+91 96942 66827'
export const DEALERSHIP_EMAIL = 'contact@lovekushcars.in'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  canonicalPath: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  breadcrumbs?: BreadcrumbItem[]
  schemas?: Record<string, unknown>[]
  noindex?: boolean
}

// 1. Schema.org WebSite with Sitelinks Search Box
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Certified pre-owned luxury and premium cars in Rajasthan. Showrooms in Udaipur and Chittorgarh.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo/lk-logo.png`,
      },
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

// 2. Schema.org AutoDealer / LocalBusiness (Udaipur & Chittorgarh)
export function getAutoDealerSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AutoDealer',
      '@id': `${SITE_URL}/#dealer-udaipur`,
      name: 'Love Kush Cars — Udaipur Main Showroom',
      image: `${SITE_URL}/logo/lk-logo.png`,
      url: SITE_URL,
      telephone: '+91 96942 66827',
      priceRange: '₹3,00,000 - ₹1,50,00,000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar',
        addressLocality: 'Udaipur',
        addressRegion: 'Rajasthan',
        postalCode: '313001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.6065,
        longitude: 73.7085,
      },
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
      image: `${SITE_URL}/logo/lk-logo.png`,
      url: `${SITE_URL}/inventory?location=Chittorgarh`,
      telephone: '+91 96942 66827',
      priceRange: '₹3,00,000 - ₹1,50,00,000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Collectorate Circle, NH-27 Bypass',
        addressLocality: 'Chittorgarh',
        addressRegion: 'Rajasthan',
        postalCode: '312001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8887,
        longitude: 74.6269,
      },
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

// 3. Schema.org BreadcrumbList generator
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
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

// 4. Schema.org FAQ generator
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
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

// 5. Schema.org Car / Product generator
export function getCarSchema(vehicle: Vehicle) {
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
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
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

// 6. Schema.org Article / BlogPosting generator
export function getArticleSchema(post: BlogPost) {
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
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo/lk-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

// Static Route SEO Definitions
export const staticPageSEO: Record<string, SEOMetadata> = {
  '/': {
    title: 'Love Kush Cars | Certified Pre-Owned Luxury Cars in Udaipur & Chittorgarh',
    description:
      'Explore 100+ certified pre-owned luxury cars in Rajasthan at Love Kush Cars. 24+ years of trust, 20,000+ satisfied buyers, 200-point inspection, and instant auto loans.',
    keywords: [
      'used luxury cars Udaipur',
      'certified pre-owned cars Chittorgarh',
      'second hand cars Rajasthan',
      'used BMW Udaipur',
      'used Mercedes Rajasthan',
      'Love Kush Cars',
      'car dealership Udaipur',
    ],
    canonicalPath: '/',
    ogType: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }],
    schemas: [getWebSiteSchema(), ...getAutoDealerSchemas()],
  },

  '/inventory': {
    title: 'Certified Pre-Owned Car Inventory | Udaipur & Chittorgarh | Love Kush Cars',
    description:
      'Browse verified pre-owned luxury SUVs, sedans & automatics in Udaipur and Chittorgarh. Rigorous 200-point inspection, transparent pricing, and instant financing.',
    keywords: [
      'buy used cars Udaipur',
      'certified cars Chittorgarh',
      'used SUV Rajasthan',
      'second hand luxury cars',
      'Love Kush Cars inventory',
    ],
    canonicalPath: '/inventory',
    ogType: 'website',
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
  },

  '/sell-your-car': {
    title: 'Sell Your Car Online at Best Price | Free Doorstep Inspection | Love Kush Cars',
    description:
      'Sell your used car in 30 minutes in Udaipur & Chittorgarh. Instant bank payment, hassle-free RC transfer, zero hidden fees, and complimentary doorstep evaluation.',
    keywords: [
      'sell car online Udaipur',
      'sell used car Chittorgarh',
      'best car valuation Rajasthan',
      'instant car sale Udaipur',
      'RC transfer car sale',
    ],
    canonicalPath: '/sell-your-car',
    ogType: 'website',
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
  },

  '/finance': {
    title: 'Used Car Loan & Instant EMI Financing | 9+ Bank Partners | Love Kush Cars',
    description:
      'Avail low-interest used car loans up to 90% funding with 9+ national banks (HDFC, ICICI, SBI). Flexible tenures up to 84 months, minimal paperwork, and same-day approval.',
    keywords: [
      'used car loan Udaipur',
      'car finance Chittorgarh',
      'second hand car EMI calculator',
      'auto loan against car Rajasthan',
      'low interest car loan',
    ],
    canonicalPath: '/finance',
    ogType: 'website',
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
  },

  '/about': {
    title: 'About Us | 24+ Years of Trust & 20,000+ Cars Sold | Love Kush Cars Rajasthan',
    description:
      'Learn about Love Kush Cars, established in 2002. Over 24 years of automotive excellence delivering 20,000+ verified vehicles across Udaipur and Chittorgarh, Rajasthan.',
    keywords: [
      'about Love Kush Cars',
      'car showroom Udaipur heritage',
      'certified pre-owned history',
      'Love Kush Cars Chittorgarh',
      'trusted car dealer Rajasthan',
    ],
    canonicalPath: '/about',
    ogType: 'website',
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
  },

  '/contact': {
    title: 'Contact Us | Udaipur & Chittorgarh Showrooms | Love Kush Cars Rajasthan',
    description:
      'Visit Love Kush Cars at our flagship Udaipur showroom (100 Ft Road, Meera Nagar) or our Chittorgarh outlet (NH-27 Bypass). Call +91 96942 66827 for test drives.',
    keywords: [
      'contact Love Kush Cars',
      'Love Kush Cars Udaipur address',
      'Love Kush Cars Chittorgarh phone',
      'book test drive Udaipur',
    ],
    canonicalPath: '/contact',
    ogType: 'website',
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
  },

  '/blog': {
    title: 'Automotive Journal & Pre-Owned Car Buying Guides | Love Kush Cars',
    description:
      'Expert car buying guides, maintenance checklists, RTO legal advice, and luxury SUV reviews crafted by Love Kush Cars automotive specialists in Rajasthan.',
    keywords: [
      'used car buying tips India',
      'RTO RC transfer guide',
      'luxury car maintenance cost India',
      'pre-owned car checklist Rajasthan',
      'Love Kush Cars blog',
    ],
    canonicalPath: '/blog',
    ogType: 'website',
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
  },

  '/testimonials': {
    title: 'Customer Reviews & Testimonials | 4.9★ Rating | Love Kush Cars',
    description:
      'Read verified reviews from 20,000+ happy car buyers across Rajasthan. Discover why Love Kush Cars is rated 4.9 stars on Google for pre-owned luxury car sales.',
    keywords: [
      'Love Kush Cars reviews',
      'customer testimonials Udaipur',
      'trusted used car dealer reviews',
      'Love Kush Cars ratings',
    ],
    canonicalPath: '/testimonials',
    ogType: 'website',
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
  },

  '/compare': {
    title: 'Compare Certified Pre-Owned Cars Side by Side | Love Kush Cars',
    description:
      'Compare specifications, prices, fuel types, mileage, and features of pre-owned luxury cars side-by-side to make the smartest purchase decision.',
    keywords: ['compare used cars', 'car comparison Rajasthan', 'used SUV vs sedan'],
    canonicalPath: '/compare',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Compare Cars', url: '/compare' },
    ],
  },

  '/privacy-policy': {
    title: 'Privacy Policy | Love Kush Cars',
    description:
      'Review our privacy policy regarding how Love Kush Cars collects, protects, and uses customer information for car buying, selling, and financing.',
    canonicalPath: '/privacy-policy',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
    ],
  },

  '/terms-and-conditions': {
    title: 'Terms and Conditions | Love Kush Cars',
    description:
      'Read the official terms and conditions for purchasing, selling, inspecting, and financing certified pre-owned vehicles with Love Kush Cars.',
    canonicalPath: '/terms-and-conditions',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Terms & Conditions', url: '/terms-and-conditions' },
    ],
  },
}

// Dynamic Vehicle SEO Generator
export function getVehicleSEOMetadata(vehicle: Vehicle): SEOMetadata {
  const title = `${vehicle.year} ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''} for Sale in ${vehicle.outletCity || 'Udaipur'} | Love Kush Cars`.trim()
  const priceFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(vehicle.price)

  const description =
    `Certified ${vehicle.year} ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''} priced at ${priceFormatted}. ${vehicle.kmDriven.toLocaleString('en-IN')} km, ${vehicle.fuelType}, ${vehicle.transmission} in ${vehicle.outletCity || 'Udaipur'}. 200-point inspected with warranty.`.trim()

  const imageUrl = vehicle.photoUrl || (vehicle.gallery && vehicle.gallery[0]) || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    keywords: [
      `used ${vehicle.brand} ${vehicle.model}`,
      `second hand ${vehicle.brand} ${vehicle.outletCity || 'Udaipur'}`,
      `${vehicle.year} ${vehicle.brand} price`,
      `certified ${vehicle.brand}`,
      'Love Kush Cars inventory',
    ],
    canonicalPath: `/inventory/${vehicle.id}`,
    ogImage: imageUrl,
    ogType: 'product',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Inventory', url: '/inventory' },
      { name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, url: `/inventory/${vehicle.id}` },
    ],
    schemas: [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Inventory', url: '/inventory' },
        { name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, url: `/inventory/${vehicle.id}` },
      ]),
      getCarSchema(vehicle),
    ],
  }
}

// Dynamic Blog Post SEO Generator
export function getBlogPostSEOMetadata(post: BlogPost): SEOMetadata {
  const title = `${post.title} | Love Kush Cars Automotive Journal`
  const description = post.excerpt

  return {
    title,
    description,
    keywords: post.tags,
    canonicalPath: `/blog/${post.slug}`,
    ogImage: post.heroImage,
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
  }
}
