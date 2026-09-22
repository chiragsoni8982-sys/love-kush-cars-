import { SEO } from '@/components/seo/SEO'
import { staticPageSEO } from '@/data/seoRegistry'
import { ContactHero } from '@/components/contact/ContactHero'
import { ShowroomCards } from '@/components/contact/ShowroomCards'
import { ContactForm } from '@/components/contact/ContactForm'
import { DepartmentDirectory } from '@/components/contact/DepartmentDirectory'
import { ContactFaq } from '@/components/contact/ContactFaq'
import { ShowroomVisitCta } from '@/components/contact/ShowroomVisitCta'

export default function Contact() {
  return (
    <div className="min-h-screen bg-paper">
      <SEO {...staticPageSEO['/contact']} />
      {/* 1. HERO SECTION WITH HELPLINE NUMBERS */}
      <ContactHero />

      {/* 2. DUAL SHOWROOM CARDS (UDAIPUR & CHITTORGARH) */}
      <ShowroomCards />

      {/* 3. MULTI-PURPOSE INTERACTIVE INQUIRY FORM */}
      <ContactForm />

      {/* 4. DIRECT DEPARTMENT DIRECTORY */}
      <DepartmentDirectory />

      {/* 5. VISITING & INQUIRY FAQS */}
      <ContactFaq />

      {/* 6. WARM HOSPITALITY SHOWROOM VISIT CTA BANNER */}
      <ShowroomVisitCta />
    </div>
  )
}
