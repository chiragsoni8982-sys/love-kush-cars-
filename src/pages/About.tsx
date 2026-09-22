import { SEO } from '@/components/seo/SEO'
import { staticPageSEO } from '@/data/seoRegistry'
import { AboutHero } from '@/components/about/AboutHero'
import { FoundingStory } from '@/components/about/FoundingStory'
import { AboutTimeline } from '@/components/about/AboutTimeline'
import { TrustPillars } from '@/components/about/TrustPillars'
import { InspectionStandard } from '@/components/about/InspectionStandard'
import { ShowroomGallery } from '@/components/about/ShowroomGallery'
import { CustomerMoments } from '@/components/about/CustomerMoments'
import { AboutCta } from '@/components/about/AboutCta'

export default function About() {
  return (
    <div className="min-h-screen bg-paper">
      <SEO {...staticPageSEO['/about']} />
      {/* 1. CINEMATIC HERO WITH 2002 LEGACY & 20,000+ BENCHMARK */}
      <AboutHero />

      {/* 2. THE GENESIS & FOUNDING STORY (UDAIPUR 2002) */}
      <FoundingStory />

      {/* 3. INTERACTIVE CHRONOLOGICAL MILESTONES (2002 TO PRESENT) */}
      <AboutTimeline />

      {/* 4. 6 UNCOMPROMISING TRUST PILLARS */}
      <TrustPillars />

      {/* 5. 200-POINT CERTIFICATION & DIAGNOSTIC LAB BREAKDOWN */}
      <InspectionStandard />

      {/* 6. DUAL SHOWROOMS SHOWCASE (UDAIPUR & CHITTORGARH) */}
      <ShowroomGallery />

      {/* 7. 20,000+ STORIES OF JOY & CUSTOMER HANDOVER MOMENTS */}
      <CustomerMoments />

      {/* 8. WARM HOSPITALITY SHOWROOM VISIT & CONSULTATION CTA */}
      <AboutCta />
    </div>
  )
}
