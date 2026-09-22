import { useEffect } from 'react'
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  type SEOMetadata,
} from '@/data/seoRegistry'

function setOrCreateMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function setOrCreateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = 'website',
  schemas,
  noindex = false,
}: SEOMetadata) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title

    // 2. Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
    const fullCanonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`
    setOrCreateCanonical(fullCanonicalUrl)

    // 3. Primary Meta Tags
    setOrCreateMeta('description', description)
    if (keywords && keywords.length > 0) {
      setOrCreateMeta('keywords', keywords.join(', '))
    }
    setOrCreateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    // 4. Open Graph Tags
    const resolvedOgImage = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${SITE_URL}${ogImage}`
      : DEFAULT_OG_IMAGE

    setOrCreateMeta('og:title', title, true)
    setOrCreateMeta('og:description', description, true)
    setOrCreateMeta('og:url', fullCanonicalUrl, true)
    setOrCreateMeta('og:type', ogType, true)
    setOrCreateMeta('og:site_name', SITE_NAME, true)
    setOrCreateMeta('og:image', resolvedOgImage, true)

    // 5. Twitter Card Tags
    setOrCreateMeta('twitter:card', 'summary_large_image')
    setOrCreateMeta('twitter:title', title)
    setOrCreateMeta('twitter:description', description)
    setOrCreateMeta('twitter:image', resolvedOgImage)

    // 6. JSON-LD Structured Data
    if (schemas && schemas.length > 0) {
      const scriptId = 'lk-seo-jsonld'
      let script = document.getElementById(scriptId) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
    }

    // Scroll to top upon page navigation
    window.scrollTo(0, 0)
  }, [title, description, keywords, canonicalPath, ogImage, ogType, schemas, noindex])

  return null
}
