import { useEffect } from 'react'
import { ContactHero } from '@/components/contact/ContactHero'
import { ShowroomCards } from '@/components/contact/ShowroomCards'
import { ContactForm } from '@/components/contact/ContactForm'
import { DepartmentDirectory } from '@/components/contact/DepartmentDirectory'
import { ContactFaq } from '@/components/contact/ContactFaq'
import { ShowroomVisitCta } from '@/components/contact/ShowroomVisitCta'

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Udaipur & Chittorgarh Showrooms | Love Kush Cars Rajasthan'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-paper">
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
