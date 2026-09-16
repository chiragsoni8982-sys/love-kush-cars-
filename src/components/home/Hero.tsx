import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Car,
  CircleDollarSign,
  Landmark,
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Star,
  Camera,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { brands, outlets } from '@/data/mockVehicles'
import { formatINR, calculateEmi, cn } from '@/lib/utils'

const bodyTypes = ['SUV', 'Sedan', 'Luxury', 'Hatchback', 'MUV', 'Coupe']
const budgets = [
  { value: '0-1500000', label: 'Under ₹15 Lakh' },
  { value: '1500000-3000000', label: '₹15 – 30 Lakh' },
  { value: '3000000-6000000', label: '₹30 – 60 Lakh' },
  { value: '6000000-99999999', label: 'Above ₹60 Lakh (Luxury)' },
]

// 3 Cinematic Luxury Automotive Backgrounds
const HERO_SCENES = [
  {
    id: 'studio-luxury',
    title: 'Studio Luxury Showroom',
    tagline: 'Precision Certified Inventory',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'highway-sunset',
    title: 'Mewar Highway Cruiser',
    tagline: 'Tested Across Rajasthan',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'flagship-sedan',
    title: 'Executive German Sedans',
    tagline: 'Mercedes • BMW • Audi',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=85',
  },
]

export function Hero() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'finance'>('buy')
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)

  // Auto-cycle background scene every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % HERO_SCENES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  // Buy Filter State
  const [location, setLocation] = useState('')
  const [brand, setBrand] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [budget, setBudget] = useState('')

  // Sell Quick State
  const [sellBrand, setSellBrand] = useState('')
  const [sellYear, setSellYear] = useState('2021')

  // Finance Quick State
  const [loanPrincipal, setLoanPrincipal] = useState(2500000)
  const [loanTenure, setLoanTenure] = useState(60)
  const estimatedEmi = calculateEmi(loanPrincipal, 12.5, loanTenure)

  function handleSearchBuy() {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (brand) params.set('brand', brand)
    if (bodyType) params.set('bodyType', bodyType)
    if (budget) params.set('budget', budget)
    navigate(`/inventory?${params.toString()}`)
  }

  function handleQuickSell() {
    const params = new URLSearchParams()
    if (sellBrand) params.set('brand', sellBrand)
    if (sellYear) params.set('year', sellYear)
    navigate(`/sell-your-car?${params.toString()}`)
  }

  function handleApplyFinance() {
    navigate(`/finance?apply=true&loanType=used-car-loan`)
  }

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-ink pt-28 sm:pt-36 pb-14 sm:pb-20">
      {/* 1. CINEMATIC LUXURY AUTOMOTIVE BACKGROUND WITH KEN BURNS MOTION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_SCENES[activeSceneIndex].id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.42, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={HERO_SCENES[activeSceneIndex].image}
              alt={HERO_SCENES[activeSceneIndex].title}
              className="w-full h-full object-cover object-center filter grayscale-[30%] brightness-90 contrast-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Precision Geometric Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Glowing Spotlights (Warm Amber & Icy Platinum) */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Deep Contrast Vignette Gradients ensuring 100% text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/65 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-ink/40 to-ink pointer-events-none" />
      </div>

      {/* 2. MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 my-auto py-4 sm:py-6 max-w-5xl mx-auto">
        {/* Heritage Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white/95 text-xs font-semibold uppercase tracking-[0.2em] mb-4 sm:mb-5 backdrop-blur-md shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Serving Rajasthan Since 2002 &bull; Over 20,000+ Cars Delivered</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[family-name:var(--font-display)] font-extrabold text-white text-3xl sm:text-5xl md:text-7xl leading-[1.08] text-balance max-w-4xl tracking-tight drop-shadow-md"
        >
          DISCOVER THE LUXURY OF COMPLETE TRUST
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/80 text-xs sm:text-base md:text-lg mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
        >
          Rajasthan&apos;s premier certified pre-owned car destination in <strong>Udaipur (100 Ft Rd)</strong> &amp;{' '}
          <strong>Chittorgarh (NH-27 Bypass)</strong>. Every car is 200-point inspected with zero odometer tampering
          and clean RTO transfer guaranteed.
        </motion.p>

        {/* Multi-Intent Interactive Search & Action Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-4xl mx-auto mt-8 sm:mt-10 bg-[#161616]/95 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden text-left rounded-[2px]"
        >
          {/* 3 Intent Tabs */}
          <div className="grid grid-cols-3 border-b border-white/15 bg-black/60">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={cn(
                'py-3.5 px-3 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2',
                activeTab === 'buy'
                  ? 'bg-[#161616] text-white border-b-2 border-amber-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              )}
            >
              <Car className="h-4 w-4 text-amber-300" />
              <span className="truncate">Buy Certified Car</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={cn(
                'py-3.5 px-3 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2',
                activeTab === 'sell'
                  ? 'bg-[#161616] text-white border-b-2 border-emerald-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              )}
            >
              <CircleDollarSign className="h-4 w-4 text-emerald-400" />
              <span className="truncate">Sell Your Car</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('finance')}
              className={cn(
                'py-3.5 px-3 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2',
                activeTab === 'finance'
                  ? 'bg-[#161616] text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              )}
            >
              <Landmark className="h-4 w-4 text-white" />
              <span className="truncate">Instant EMI</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {activeTab === 'buy' && (
                <motion.div
                  key="buy-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Select
                      label="Showroom Outlet"
                      placeholder="All Rajasthan Stock"
                      labelClassName="text-white/80 text-[11px] font-semibold uppercase"
                      options={outlets.map((o) => ({
                        value: o.city,
                        label: `${o.city}${o.isNew ? ' (Chittorgarh Branch 🌟)' : ''}`,
                      }))}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="!bg-paper text-ink font-medium"
                    />

                    <Select
                      label="Car Make / Brand"
                      placeholder="Any Brand (36)"
                      labelClassName="text-white/80 text-[11px] font-semibold uppercase"
                      options={brands.map((b) => ({ value: b, label: b }))}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="!bg-paper text-ink font-medium"
                    />

                    <Select
                      label="Body Type"
                      placeholder="All Body Types"
                      labelClassName="text-white/80 text-[11px] font-semibold uppercase"
                      options={bodyTypes.map((b) => ({ value: b, label: b }))}
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      className="!bg-paper text-ink font-medium"
                    />

                    <Select
                      label="Budget"
                      placeholder="Any Price"
                      labelClassName="text-white/80 text-[11px] font-semibold uppercase"
                      options={budgets}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="!bg-paper text-ink font-medium"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3 text-xs text-white/70">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 100+ Inspected Cars
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5 text-amber-300" /> Udaipur &amp; Chittorgarh
                      </span>
                    </div>

                    <Button
                      onClick={handleSearchBuy}
                      variant="primary-inverse"
                      size="lg"
                      className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-3.5 text-ink shadow-md"
                    >
                      <Search className="h-4 w-4 mr-1.5 text-ink" /> Search Certified Cars
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sell' && (
                <motion.div
                  key="sell-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                        Select Your Car Make
                      </label>
                      <select
                        value={sellBrand}
                        onChange={(e) => setSellBrand(e.target.value)}
                        className="w-full bg-paper border border-line p-3 text-sm text-ink font-medium focus:outline-none"
                      >
                        <option value="">-- Choose Car Make (Toyota, Hyundai, Mercedes, etc.) --</option>
                        {brands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                        Manufacturing / Registration Year
                      </label>
                      <select
                        value={sellYear}
                        onChange={(e) => setSellYear(e.target.value)}
                        className="w-full bg-paper border border-line p-3 text-sm text-ink font-medium focus:outline-none"
                      >
                        {Array.from({ length: 15 }, (_, i) => 2025 - i).map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-white/70">
                      ⚡ Free doorstep vehicle appraisal across Udaipur, Chittorgarh, Bhilwara &amp; Rajsamand with
                      same-day payment.
                    </p>

                    <Button
                      onClick={handleQuickSell}
                      variant="primary-inverse"
                      size="lg"
                      className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-3.5 text-ink shadow-md"
                    >
                      <CircleDollarSign className="h-4 w-4 mr-1.5 text-ink" /> Get Instant Valuation
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'finance' && (
                <motion.div
                  key="finance-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-white/80 font-semibold mb-1">
                        <span>Loan Amount: {formatINR(loanPrincipal)}</span>
                      </div>
                      <input
                        type="range"
                        min={300000}
                        max={10000000}
                        step={50000}
                        value={loanPrincipal}
                        onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-white/80 font-semibold mb-1">
                        <span>Tenure: {loanTenure} Months ({(loanTenure / 12).toFixed(0)} Years)</span>
                      </div>
                      <input
                        type="range"
                        min={12}
                        max={84}
                        step={6}
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider block">
                        Estimated Monthly Installment (@ 12.5% p.a.)
                      </span>
                      <span className="text-xl font-extrabold text-emerald-400 font-[family-name:var(--font-display)]">
                        {formatINR(estimatedEmi)}/mo*
                      </span>
                    </div>

                    <Button
                      onClick={handleApplyFinance}
                      variant="primary-inverse"
                      size="md"
                      className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-6 text-ink shadow-md"
                    >
                      Apply for This Loan <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4 Trust Highlights Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs text-white/85"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> 200+ Point Certified
          </span>
          <span className="text-white/20">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-300" /> 30-Min Loan Approval
          </span>
          <span className="text-white/20">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Car className="h-4 w-4 text-white" /> 100% RC Transfer Free
          </span>
          <span className="text-white/20">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.9★ Customer Rating
          </span>
        </motion.div>

        {/* 3. INTERACTIVE BACKGROUND SCENE CONTROLLER (BOTTOM-RIGHT / CENTER) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] text-white/70"
        >
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Camera className="h-3 w-3" />
            <span className="hidden sm:inline">Showroom Atmosphere:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {HERO_SCENES.map((scene, sIdx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveSceneIndex(sIdx)}
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all',
                  activeSceneIndex === sIdx
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-white/50 hover:text-white hover:bg-white/10',
                )}
              >
                {scene.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
