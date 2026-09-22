import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  PhoneCall,
  MessageCircle,
  MapPin,
} from 'lucide-react'
import { FinanceHero } from '@/components/finance/FinanceHero'
import { FinancePartners } from '@/components/finance/FinancePartners'
import { CibilScoreBanner } from '@/components/finance/CibilScoreBanner'
import { CibilScoreModal } from '@/components/finance/CibilScoreModal'
import { FinanceBenefits } from '@/components/finance/FinanceBenefits'
import { WhyFinanceLoveKush } from '@/components/finance/WhyFinanceLoveKush'
import { LoanComparisonSection } from '@/components/finance/LoanComparisonSection'
import { HowFinanceWorks } from '@/components/finance/HowFinanceWorks'
import { FinanceFaqSection } from '@/components/finance/FinanceFaqSection'
import { LoanApplicationModal, type LoanType } from '@/components/finance/LoanApplicationModal'
import { mockVehicles } from '@/data/mockVehicles'
import { SEO } from '@/components/seo/SEO'
import { staticPageSEO } from '@/data/seoRegistry'

export default function Finance() {
  const [searchParams] = useSearchParams()

  const queryCarId = searchParams.get('carId') || ''
  const queryLoanType = (searchParams.get('loanType') as LoanType) || 'used-car-loan'
  const shouldOpenApply = searchParams.get('apply') === 'true' || Boolean(queryCarId)
  const shouldOpenCibil = searchParams.get('cibil') === 'true'

  // Modal States
  const [applyModalOpen, setApplyModalOpen] = useState(shouldOpenApply)
  const [cibilModalOpen, setCibilModalOpen] = useState(shouldOpenCibil)
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>(queryLoanType)
  const [selectedCarId, setSelectedCarId] = useState<string>(queryCarId)
  const [initialLoanAmount, setInitialLoanAmount] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (queryCarId) {
      setSelectedCarId(queryCarId)
      const car = mockVehicles.find((v) => v.id === queryCarId)
      if (car) setInitialLoanAmount(car.price)
      setApplyModalOpen(true)
    }
    if (queryLoanType) {
      setSelectedLoanType(queryLoanType)
    }
  }, [queryCarId, queryLoanType])

  const handleOpenApplyModal = (loanType: LoanType = 'used-car-loan', carId?: string) => {
    setSelectedLoanType(loanType)
    if (carId) {
      setSelectedCarId(carId)
      const car = mockVehicles.find((v) => v.id === carId)
      if (car) setInitialLoanAmount(car.price)
    }
    setApplyModalOpen(true)
  }

  const handleApplyWithScore = (scoreData: { name: string; phone: string; score: number; preApprovedAmount: number }) => {
    setInitialLoanAmount(scoreData.preApprovedAmount)
    setSelectedLoanType('used-car-loan')
    setApplyModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-paper">
      <SEO {...staticPageSEO['/finance']} />
      {/* 1. HERO SECTION & INTEGRATED EMI CALCULATOR */}
      <FinanceHero
        onOpenApplyModal={handleOpenApplyModal}
        onOpenCibilModal={() => setCibilModalOpen(true)}
      />

      {/* 2. 9 FINANCE PARTNERS SHOWCASE */}
      <FinancePartners />

      {/* 3. CHECK FREE CIBIL SCORE BANNER (CARS24 REFERENCE) */}
      <CibilScoreBanner onOpenCheckScore={() => setCibilModalOpen(true)} />

      {/* 4. BENEFITS OF USED CAR LOAN FROM LOVE KUSH CARS */}
      <FinanceBenefits />

      {/* 5. LOAN COMPARISON MATRIX: USED CAR LOAN VS LOAN AGAINST CAR */}
      <LoanComparisonSection onApplyLoanType={handleOpenApplyModal} />

      {/* 6. WHY US / WHY LOVE KUSH CARS FINANCE */}
      <WhyFinanceLoveKush />

      {/* 7. HOW FINANCE WORKS (4 SIMPLE STEPS) */}
      <HowFinanceWorks />

      {/* 8. QUESTIONS & FAQS (WHY, HOW, ELIGIBILITY, DOCUMENTS) */}
      <FinanceFaqSection />

      {/* 9. IN-PERSON CONSULTATION & SHOWROOM BANNER */}
      <section className="bg-ink text-paper py-16 sm:py-24 border-t border-white/10">
        <div className="container-lk">
          <div className="bg-[#191919] border border-white/15 p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 block mb-2">
                Need In-Person Loan Advice?
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl text-paper">
                Speak With Our In-House Auto Finance Specialists
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
                Visit our dedicated finance desk at the Udaipur Main Showroom or Chittorgarh Outlet for one-on-one
                guidance, customized repayment structuring, and on-spot bank eligibility checks over tea.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-5 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white" /> 100 Ft Road, Meera Nagar, Udaipur (RJ27)
                </span>
                <span className="text-white/30">&bull;</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-300" /> NH-27 Bypass, Chittorgarh (RJ09)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919694266827"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink hover:bg-mist text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors"
              >
                <PhoneCall className="h-4 w-4" /> Call Finance Desk
              </a>
              <a
                href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%20Finance%2C%20I%20want%20to%20apply%20for%20a%20car%20loan.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <LoanApplicationModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        initialLoanType={selectedLoanType}
        initialCarId={selectedCarId}
        initialAmount={initialLoanAmount}
      />

      <CibilScoreModal
        open={cibilModalOpen}
        onClose={() => setCibilModalOpen(false)}
        onApplyWithScore={handleApplyWithScore}
      />
    </div>
  )
}
