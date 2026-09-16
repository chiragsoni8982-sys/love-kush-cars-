import { useEffect } from 'react'
import { Hero } from '@/components/home/Hero'
import { OutletShowcase } from '@/components/home/OutletShowcase'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { BrowseByBrand } from '@/components/home/BrowseByBrand'
import { SellCarTeaser } from '@/components/home/SellCarTeaser'
import { WhyLoveKush } from '@/components/home/WhyLoveKush'
import { FinancePreview } from '@/components/home/FinancePreview'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { HomeBlogPreview } from '@/components/home/HomeBlogPreview'
import { FinalCta } from '@/components/home/FinalCta'

export default function Home() {
  useEffect(() => {
    document.title = 'Love Kush Cars | Certified Pre-Owned Luxury Cars in Udaipur & Chittorgarh'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      {/* 1. Hero with Multi-Intent Tabs (Find Car / Sell Car / Instant EMI) */}
      <Hero />

      {/* 2. Dual Showroom Network in Rajasthan (Udaipur Meera Nagar & Chittorgarh NH-27) */}
      <OutletShowcase />

      {/* 3. Filterable Curated Certified Cars (SUVs, Luxury, Sedans, Automatic) */}
      <FeaturedCollection />

      {/* 4. Browse by 36+ Car Brands */}
      <BrowseByBrand />

      {/* 5. Sell Your Car in 30 Mins Teaser with Instant Valuation */}
      <SellCarTeaser />

      {/* 6. Why Love Kush: 2002 Founding, 20,000+ Cars Delivered, 200-Pt Check */}
      <WhyLoveKush />

      {/* 7. Auto Loan Desk with Live Interactive EMI Calculator */}
      <FinancePreview />

      {/* 8. Verified Rajasthan Customer Reviews (4.9★ Google Rating) */}
      <TestimonialsSection />

      {/* 9. Automotive Journal & Expert Buying Guides */}
      <HomeBlogPreview />

      {/* 10. Warm Hospitality Showroom Visit CTA */}
      <FinalCta />
    </div>
  )
}
