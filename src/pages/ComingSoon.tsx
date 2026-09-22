import { SEO } from '@/components/seo/SEO'
import { staticPageSEO, type SEOMetadata } from '@/data/seoRegistry'

interface ComingSoonProps {
  title: string
  note?: string
}

export default function ComingSoon({ title, note }: ComingSoonProps) {
  let seo: SEOMetadata = {
    title: `${title} | Love Kush Cars`,
    description: `${title} - Love Kush Cars, certified pre-owned luxury car dealership in Rajasthan.`,
    canonicalPath: `/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    noindex: title.toLowerCase().includes('not found'),
  }

  if (title === 'Testimonials') seo = staticPageSEO['/testimonials']
  else if (title === 'Privacy Policy') seo = staticPageSEO['/privacy-policy']
  else if (title === 'Terms & Conditions') seo = staticPageSEO['/terms-and-conditions']
  else if (title === 'Compare') seo = staticPageSEO['/compare']

  return (
    <div className="min-h-[70vh] flex items-center justify-center container-lk pt-32 pb-20 text-center">
      <SEO {...seo} />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate mb-4">Building Next</p>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mb-4">{title}</h1>
        <p className="text-slate max-w-md mx-auto">
          {note ?? 'This page is next in the build queue — the design system and Home are locked in first.'}
        </p>
      </div>
    </div>
  )
}
