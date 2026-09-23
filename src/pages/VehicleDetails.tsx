import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Phone,
  MessageCircle,
  CalendarDays,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Users,
  Palette,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  GitCompareArrows,
} from 'lucide-react'
import { useCompare } from '@/hooks/useCompare'
import { VehicleImage } from '@/components/vehicle/VehicleImage'
import { VehicleCard } from '@/components/vehicle/VehicleCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EmiCalculator } from '@/components/finance/EmiCalculator'
import { formatINR, formatKm, cn } from '@/lib/utils'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle } from '@/lib/mapVehicle'
import { getWhatsAppUrl, getCallUrl } from '@/lib/contact'
import type { Vehicle } from '@/types'
import { mockVehicles } from '@/data/mockVehicles'
import { SEO } from '@/components/seo/SEO'
import { getVehicleSEOMetadata } from '@/data/seoRegistry'

const TABS = ['Overview', 'Specifications', 'Features', 'Ownership'] as const
type Tab = (typeof TABS)[number]

function Gallery({
  gallery,
  photoUrl,
  brand,
  model,
}: {
  gallery: string[]
  photoUrl?: string
  brand: string
  model: string
}) {
  const [active, setActive] = useState(0)
  const initialShots = gallery && gallery.length > 0 ? gallery : photoUrl ? [photoUrl] : ['#1a1a1a']
  const shots = initialShots.length ? initialShots : ['#1a1a1a']

  const safeActive = active < shots.length ? active : 0
  const activeSrc = shots[safeActive] && !shots[safeActive].startsWith('#') ? shots[safeActive] : photoUrl

  return (
    <div className="w-full min-w-0">
      {/* Main Image Stage - 100% visible, uncut photography with ambient backdrop */}
      <div className="relative group rounded-lg overflow-hidden border border-line/60 bg-[#0a0a0a] shadow-md">
        <VehicleImage
          tone={shots[safeActive]}
          src={activeSrc}
          brand={brand}
          model={model}
          fit="contain"
          showBackdrop={true}
          className="h-72 sm:h-[420px] md:h-[480px] lg:h-[500px] w-full"
        />

        {/* Previous / Next Arrow Controls */}
        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev > 0 ? prev - 1 : shots.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev < shots.length - 1 ? prev + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Photo Counter Pill */}
            <div className="absolute bottom-3 right-3 z-20 bg-black/75 text-white text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md">
              <span>{safeActive + 1}</span>
              <span className="text-white/50">/</span>
              <span>{shots.length}</span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {shots.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto no-scrollbar w-full max-w-full pb-1 pt-0.5">
          {shots.map((item, i) => {
            const thumbSrc = item && !item.startsWith('#') ? item : photoUrl
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'shrink-0 h-16 w-24 sm:h-20 sm:w-28 rounded-md border-2 transition-all overflow-hidden bg-[#0a0a0a]',
                  safeActive === i
                    ? 'border-ink ring-2 ring-ink/30 scale-[1.02] shadow-sm'
                    : 'border-transparent opacity-60 hover:opacity-100',
                )}
              >
                <VehicleImage
                  tone={item}
                  src={thumbSrc}
                  brand={brand}
                  model={model}
                  fit="contain"
                  showBackdrop={false}
                  className="h-full w-full"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TestDriveModal({ open, onClose, vehicleName }: { open: boolean; onClose: () => void; vehicleName: string }) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <Modal open={open} onClose={() => { onClose(); setSubmitted(false) }}>
      {submitted ? (
        <div className="text-center py-6">
          <ShieldCheck className="h-8 w-8 mx-auto mb-4" strokeWidth={1.5} />
          <p className="font-semibold mb-1">Request received</p>
          <p className="text-sm text-slate">We'll call you shortly to confirm your test drive for the {vehicleName}.</p>
          <Button className="mt-6" onClick={onClose}>Done</Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate mb-1">Book a Test Drive</p>
            <h3 className="text-lg font-bold">{vehicleName}</h3>
          </div>
          <Input label="Full Name" placeholder="Your name" required />
          <Input label="Phone Number" type="tel" placeholder="+91 " required />
          <Input label="Preferred Date" type="date" required />
          <Button type="submit" className="mt-2">Request Test Drive</Button>
        </form>
      )}
    </Modal>
  )
}

export default function VehicleDetails() {
  const { vehicleId } = useParams()
  const { isComparing, toggleCompare } = useCompare()
  const [tab, setTab] = useState<Tab>('Overview')
  const [testDriveOpen, setTestDriveOpen] = useState(false)

  // Initialize immediately from mockVehicles if available, then refresh from API
  const [vehicle, setVehicle] = useState<Vehicle | null>(() => {
    return mockVehicles.find((v) => v.id === vehicleId) || null
  })
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>(mockVehicles)
  const [loading, setLoading] = useState(!mockVehicles.some((v) => v.id === vehicleId))
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const cached = mockVehicles.find((v) => v.id === vehicleId)
    if (!cached) setLoading(true)
    setNotFound(false)

    apiFetch<Parameters<typeof mapApiVehicle>[0]>(`/vehicles/${vehicleId}`)
      .then((raw) => setVehicle(mapApiVehicle(raw)))
      .catch(() => {
        const fallback = mockVehicles.find((v) => v.id === vehicleId)
        if (fallback) {
          setVehicle(fallback)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))

    apiFetch<Parameters<typeof mapApiVehicle>[0][]>('/vehicles')
      .then((data) => setAllVehicles(data.map((raw, i) => mapApiVehicle(raw, i))))
      .catch(() => {
        // Fall back to mockVehicles for similar vehicles
      })
  }, [vehicleId])

  const similar = useMemo(() => {
    if (!vehicle) return []
    return allVehicles
      .filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.brand === vehicle.brand))
      .slice(0, 3)
  }, [vehicle, allVehicles])

  const seoData = useMemo(() => {
    if (vehicle) return getVehicleSEOMetadata(vehicle)
    return {
      title: 'Vehicle Details | Love Kush Cars Udaipur & Chittorgarh',
      description: 'Certified pre-owned luxury car with 200-point inspection and instant financing.',
      canonicalPath: `/inventory/${vehicleId || ''}`,
      noindex: notFound,
    }
  }, [vehicle, vehicleId, notFound])

  if (loading) {
    return (
      <div className="container-lk pt-40 pb-24 text-center text-slate">
        <SEO {...seoData} />
        Loading vehicle…
      </div>
    )
  }

  if (notFound || !vehicle) {
    return (
      <div className="container-lk pt-40 pb-24 text-center">
        <SEO {...seoData} />
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl mb-4">Vehicle Not Found</h1>
        <p className="text-slate mb-8">This listing may have been sold or moved.</p>
        <Link to="/inventory">
          <Button>Back to Inventory</Button>
        </Link>
      </div>
    )
  }

  const vehicleName = `${vehicle.year} ${vehicle.brand} ${vehicle.model}`

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <SEO {...seoData} />
      <div className="container-lk pt-24 sm:pt-28 pb-24">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate mb-6 pt-4">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/inventory" className="hover:text-ink">Inventory</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-ink truncate">{vehicleName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.4fr)_380px] gap-8 xl:gap-12 items-start w-full">
          {/* Left: gallery + tabs */}
          <div className="min-w-0 w-full">
            <Gallery gallery={vehicle.gallery} photoUrl={vehicle.photoUrl} brand={vehicle.brand} model={vehicle.model} />

            <div className="mt-10 min-w-0 w-full">
              <div className="flex gap-6 border-b border-line overflow-x-auto no-scrollbar w-full max-w-full">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      'py-3 text-sm font-semibold uppercase tracking-wide whitespace-nowrap border-b-2 -mb-px transition-colors shrink-0',
                      tab === t ? 'border-ink text-ink' : 'border-transparent text-slate hover:text-ink',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="py-8 min-w-0 w-full">
                {tab === 'Overview' && (
                  <div>
                    <p className="text-slate leading-relaxed mb-8">
                      This {vehicleName} ({vehicle.variant}) comes certified and fully inspected, with{' '}
                      {formatKm(vehicle.kmDriven)} on the odometer and a clean {vehicle.ownership.toLowerCase()} history.
                      Finished in {vehicle.color.toLowerCase()}, it's ready for immediate test drive and handover.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div>
                        <Gauge className="h-5 w-5 mb-2 text-slate" strokeWidth={1.5} />
                        <p className="text-xs text-slate">Kilometers</p>
                        <p className="text-sm font-semibold">{formatKm(vehicle.kmDriven)}</p>
                      </div>
                      <div>
                        <Fuel className="h-5 w-5 mb-2 text-slate" strokeWidth={1.5} />
                        <p className="text-xs text-slate">Fuel Type</p>
                        <p className="text-sm font-semibold">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <Settings2 className="h-5 w-5 mb-2 text-slate" strokeWidth={1.5} />
                        <p className="text-xs text-slate">Transmission</p>
                        <p className="text-sm font-semibold">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <Users className="h-5 w-5 mb-2 text-slate" strokeWidth={1.5} />
                        <p className="text-xs text-slate">Seating</p>
                        <p className="text-sm font-semibold">{vehicle.specifications.seating} Seater</p>
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'Specifications' && (
                  <dl className="divide-y divide-line">
                    {[
                      ['Engine', vehicle.specifications.engine],
                      ['Mileage', vehicle.specifications.mileage],
                      ['Seating Capacity', `${vehicle.specifications.seating} Seater`],
                      ['Fuel Type', vehicle.fuelType],
                      ['Transmission', vehicle.transmission],
                      ['Body Type', vehicle.bodyType],
                      ['Color', vehicle.color],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-3 text-sm">
                        <dt className="text-slate">{label}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {tab === 'Features' && (
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((f) => (
                      <span key={f} className="border border-line px-3.5 py-2 text-xs font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {tab === 'Ownership' && (
                  <dl className="divide-y divide-line">
                    {[
                      ['Ownership', vehicle.ownership],
                      ['Registration Year', vehicle.year],
                      ['RTO', `${vehicle.rtoCode} \u2014 ${vehicle.rtoDistrict}`],
                      ['Color', vehicle.color],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-3 text-sm">
                        <dt className="text-slate">{label}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-10 min-w-0 w-full">
              <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Finance</p>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl mb-6">Estimate Your EMI</h2>
              <div className="bg-mist p-6 sm:p-8 border border-line rounded-lg">
                <EmiCalculator defaultPrincipal={vehicle.price} />
              </div>
            </div>
          </div>

          {/* Right: sticky action panel */}
          <div className="min-w-0 w-full lg:sticky lg:top-24 h-fit">
            <div className="border border-line p-6 sm:p-7 bg-paper shadow-sm rounded-lg">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {vehicle.status === 'sold' && <Badge variant="filled" className="bg-purple-700 text-white border-purple-600 font-bold">Sold</Badge>}
                {vehicle.status === 'reserved' && <Badge variant="filled" className="bg-amber-600 text-white border-amber-500 font-bold">Reserved</Badge>}
                {vehicle.badges?.certified && <Badge variant="filled">Certified</Badge>}
                {vehicle.badges?.newArrival && <Badge>New Arrival</Badge>}
                {vehicle.badges?.priceDrop && <Badge>Price Drop</Badge>}
              </div>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl leading-tight text-ink">
                {vehicleName}
              </h1>
              <p className="text-sm text-slate mt-1">{vehicle.variant}</p>

              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-ink">{formatINR(vehicle.price)}</p>
                <p className="text-sm text-slate mt-1">EMI from {formatINR(vehicle.emiFrom)}/mo</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button size="lg" icon={<CalendarDays className="h-4 w-4" />} onClick={() => setTestDriveOpen(true)}>
                  Book Test Drive
                </Button>

                {/* Compare Action */}
                <button
                  type="button"
                  onClick={() => toggleCompare(vehicle.id, vehicleName)}
                  className={cn(
                    'w-full py-3 px-4 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all',
                    isComparing(vehicle.id)
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-mist hover:bg-paper text-ink border-line hover:border-ink',
                  )}
                >
                  <GitCompareArrows className="h-4 w-4" />
                  {isComparing(vehicle.id) ? 'Added to Comparison' : 'Add to Compare with Stock'}
                </button>

                {isComparing(vehicle.id) && (
                  <Link
                    to="/compare"
                    className="text-center text-xs font-semibold text-ink underline underline-offset-2 hover:opacity-80 transition-opacity"
                  >
                    View Side-by-Side Comparison &rarr;
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <a href={getCallUrl()} className="block w-full">
                    <Button variant="secondary" size="lg" className="w-full" icon={<Phone className="h-4 w-4" />}>
                      Call
                    </Button>
                  </a>
                  <a
                    href={getWhatsAppUrl(`Hi Love Kush Cars, I am interested in the ${vehicleName} (${vehicle.variant}) listed for ${formatINR(vehicle.price)}. Please share more details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="secondary" size="lg" className="w-full text-emerald-700 font-semibold" icon={<MessageCircle className="h-4 w-4 text-emerald-600" />}>
                      WhatsApp
                    </Button>
                  </a>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate hover:text-ink mt-1"
                >
                  <MapPin className="h-3.5 w-3.5" /> Get Directions to Showroom
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-line flex items-center gap-2 text-xs text-slate">
                <Palette className="h-4 w-4 shrink-0" /> <span className="truncate">{vehicle.color} &middot; {vehicle.rtoCode} {vehicle.rtoDistrict}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar cars */}
        {similar.length > 0 && (
          <div className="mt-20 pt-14 border-t border-line min-w-0 w-full">
            <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">You Might Also Like</p>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl mb-8">Similar Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}

        <TestDriveModal open={testDriveOpen} onClose={() => setTestDriveOpen(false)} vehicleName={vehicleName} />
      </div>
    </div>
  )
}
