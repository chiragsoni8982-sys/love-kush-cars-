import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Car,
  DollarSign,
  FileText,
  Camera,
  Layers,
  Plus,
  X,
} from 'lucide-react'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'
import { PhotoUploader } from '@/components/admin/PhotoUploader'
import { calculateEmi, formatINR, cn } from '@/lib/utils'

const POPULAR_BRANDS = [
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Toyota',
  'Hyundai',
  'Honda',
  'Tata',
  'Mahindra',
  'Kia',
  'Volkswagen',
  'Skoda',
  'Volvo',
  'Land Rover',
  'Jaguar',
  'Porsche',
  'MG',
  'Jeep',
  'Maruti Suzuki',
]

const STANDARD_FEATURES = [
  'Panoramic Sunroof',
  'Sunroof',
  'Alloy Wheels',
  'ABS with EBD',
  '6+ Airbags',
  'Rear Camera',
  '360° Camera',
  'Parking Sensors',
  'Cruise Control',
  'Adaptive Cruise',
  'Android Auto',
  'Apple CarPlay',
  'Wireless Charging',
  'Automatic Climate Control',
  'Dual Zone Climate',
  'Push Button Start',
  'Keyless Entry',
  'Ventilated Seats',
  'Leather Upholstery',
  'LED Projector Headlamps',
  'Premium Sound System',
  'Ambient Lighting',
]

export default function AdminCarForm() {
  const { vehicleId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(vehicleId)

  const [loadingInitial, setLoadingInitial] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form State
  const [brand, setBrand] = useState('BMW')
  const [customBrand, setCustomBrand] = useState('')
  const [model, setModel] = useState('')
  const [variant, setVariant] = useState('')
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [registrationYear, setRegistrationYear] = useState<number>(new Date().getFullYear())
  const [registrationNumber, setRegistrationNumber] = useState('')

  // Specs
  const [fuelType, setFuelType] = useState('Petrol')
  const [transmission, setTransmission] = useState('Automatic')
  const [ownership, setOwnership] = useState('1st Owner')
  const [kmDriven, setKmDriven] = useState<number>(35000)
  const [bodyType, setBodyType] = useState('Sedan')
  const [color, setColor] = useState('')
  const [engine, setEngine] = useState('')
  const [mileage, setMileage] = useState('')
  const [seating, setSeating] = useState<number>(5)

  // Location
  const [outletCity, setOutletCity] = useState('Udaipur')
  const [rtoCode, setRtoCode] = useState('RJ27')
  const [rtoDistrict, setRtoDistrict] = useState('Udaipur')

  // Pricing
  const [price, setPrice] = useState<number>(3250000)
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined)
  const [negotiable, setNegotiable] = useState<boolean>(true)
  const [emiFrom, setEmiFrom] = useState<number>(55000)

  // Descriptions
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')

  // Features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Sunroof',
    'Alloy Wheels',
    'ABS with EBD',
    '6+ Airbags',
    'Rear Camera',
    'Apple CarPlay',
    'Android Auto',
  ])
  const [customFeatureInput, setCustomFeatureInput] = useState('')

  // Photos
  const [photos, setPhotos] = useState<string[]>([])
  const [primaryPhoto, setPrimaryPhoto] = useState<string>('')

  // Badges & Status
  const [status, setStatus] = useState<'available' | 'reserved' | 'sold'>('available')
  const [certified, setCertified] = useState(true)
  const [featured, setFeatured] = useState(false)
  const [newArrival, setNewArrival] = useState(true)
  const [priceDrop, setPriceDrop] = useState(false)

  // Fetch initial data if editing
  useEffect(() => {
    if (!isEditing || !vehicleId) return

    let isMounted = true
    setLoadingInitial(true)

    apiFetch<ApiVehicle>(`/vehicles/${vehicleId}`)
      .then((raw) => {
        if (!isMounted) return
        const v = mapApiVehicle(raw)

        if (POPULAR_BRANDS.includes(v.brand)) {
          setBrand(v.brand)
        } else {
          setBrand('Other')
          setCustomBrand(v.brand)
        }

        setModel(v.model)
        setVariant(v.variant)
        setYear(v.year)
        setRegistrationYear(v.registrationYear || v.year)
        setRegistrationNumber(v.registrationNumber || '')

        setFuelType(v.fuelType)
        setTransmission(v.transmission)
        setOwnership(v.ownership)
        setKmDriven(v.kmDriven)
        setBodyType(v.bodyType)
        setColor(v.color)
        setEngine(v.specifications.engine !== 'Not specified' ? v.specifications.engine : '')
        setMileage(v.specifications.mileage !== 'Not specified' ? v.specifications.mileage : '')
        setSeating(v.specifications.seating || 5)

        setOutletCity(v.outletCity || 'Udaipur')
        setRtoCode(v.rtoCode || 'RJ27')
        setRtoDistrict(v.rtoDistrict || 'Udaipur')

        setPrice(v.price)
        setOriginalPrice(v.originalPrice)
        setNegotiable(v.negotiable ?? true)
        setEmiFrom(v.emiFrom)

        setShortDescription(v.shortDescription || '')
        setDescription(v.description || '')

        setSelectedFeatures(v.features || [])

        // Photos
        const initialGallery = raw.gallery || []
        setPhotos(initialGallery)
        setPrimaryPhoto(raw.photo_url || initialGallery[0] || '')

        setStatus(v.status)
        setCertified(Boolean(v.badges.certified))
        setFeatured(Boolean(v.badges.featured))
        setNewArrival(Boolean(v.badges.newArrival))
        setPriceDrop(Boolean(v.badges.priceDrop))
      })
      .catch((err: any) => {
        if (isMounted) setErrorMessage(err.message || 'Failed to fetch vehicle data for editing.')
      })
      .finally(() => {
        if (isMounted) setLoadingInitial(false)
      })

    return () => {
      isMounted = false
    }
  }, [vehicleId, isEditing])

  // Auto-recalculate EMI helper
  function autoComputeEmi() {
    if (price > 0) {
      const calculated = calculateEmi(price, 9.5, 5)
      setEmiFrom(calculated)
    }
  }

  function handleAddCustomFeature() {
    const trimmed = customFeatureInput.trim()
    if (!trimmed) return
    if (!selectedFeatures.includes(trimmed)) {
      setSelectedFeatures([...selectedFeatures, trimmed])
    }
    setCustomFeatureInput('')
  }

  function handleToggleFeature(feature: string) {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    } else {
      setSelectedFeatures([...selectedFeatures, feature])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    const finalBrand = brand === 'Other' ? customBrand.trim() : brand
    if (!finalBrand) {
      setErrorMessage('Please specify the vehicle manufacturer / brand.')
      return
    }

    if (!model.trim()) {
      setErrorMessage('Please enter the model name (e.g. 3 Series, Fortuner, E-Class).')
      return
    }

    if (!variant.trim()) {
      setErrorMessage('Please enter the variant (e.g. 330i M Sport, Legender 4x2 AT).')
      return
    }

    if (!price || price <= 0) {
      setErrorMessage('Please enter a valid selling price.')
      return
    }

    setIsSaving(true)

    const payload = {
      brand: finalBrand,
      model: model.trim(),
      variant: variant.trim(),
      year: Number(year),
      registration_year: registrationYear ? Number(registrationYear) : Number(year),
      registration_number: registrationNumber.trim() || null,
      price: Number(price),
      original_price: originalPrice ? Number(originalPrice) : null,
      negotiable: Boolean(negotiable),
      emi_from: emiFrom > 0 ? Number(emiFrom) : calculateEmi(Number(price), 9.5, 5),
      fuel_type: fuelType,
      transmission,
      ownership,
      km_driven: Number(kmDriven),
      color: color.trim() || 'Not specified',
      body_type: bodyType,
      rto_code: rtoCode.trim() || 'RJ27',
      rto_district: rtoDistrict.trim() || 'Udaipur',
      outlet_city: outletCity,
      engine: engine.trim() || null,
      mileage: mileage.trim() || null,
      seating: Number(seating) || 5,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      features: selectedFeatures,
      photo_url: primaryPhoto || photos[0] || null,
      gallery: photos,
      certified: Boolean(certified),
      featured: Boolean(featured),
      new_arrival: Boolean(newArrival),
      price_drop: Boolean(priceDrop),
      status,
      sold: status === 'sold',
    }

    try {
      if (isEditing) {
        await apiFetch(`/vehicles/${vehicleId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setSuccessMessage(`Vehicle #${vehicleId} updated successfully!`)
      } else {
        const created = await apiFetch<ApiVehicle>('/vehicles', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setSuccessMessage(`New vehicle #${created.id} published successfully!`)
      }

      // Smooth transition back to inventory after short delay
      setTimeout(() => {
        navigate('/admin/inventory')
      }, 1200)
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save vehicle details to database.')
    } finally {
      setIsSaving(false)
    }
  }

  if (loadingInitial) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest text-white/50">Loading vehicle configuration...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/inventory"
            className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
              {isEditing ? `Edit Vehicle #${vehicleId}` : 'Add New Car to Inventory'}
            </h1>
            <p className="text-xs text-white/50 mt-0.5">
              {isEditing
                ? 'Update specifications, pricing, photo gallery, and availability.'
                : 'Enter complete used car details and upload photography. Changes reflect instantly on customer website.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-400 text-ink text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{isEditing ? 'Save Changes' : 'Publish Car'}</span>
        </button>
      </div>

      {/* Toast / Alerts */}
      {errorMessage && (
        <div className="p-4 bg-red-950/60 border border-red-800/80 rounded-lg text-red-200 text-xs flex items-start gap-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-bold">Error saving vehicle</p>
            <p className="text-red-300/80 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-700/80 rounded-lg text-emerald-200 text-xs flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="font-bold">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Multi-Angle Photography */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <Camera className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Vehicle Photography &amp; Gallery
            </h2>
          </div>
          <p className="text-xs text-white/50">
            Upload high-resolution vehicle photos. Select a cover image to appear on car search cards and hero listings.
          </p>
          <PhotoUploader
            photos={photos}
            primaryPhoto={primaryPhoto}
            onChange={(newPhotos, newPrimary) => {
              setPhotos(newPhotos)
              setPrimaryPhoto(newPrimary)
            }}
          />
        </div>

        {/* Section 2: Vehicle Identification */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <Car className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Vehicle Identification &amp; Core Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Brand / Manufacturer *
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {POPULAR_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
                <option value="Other">Other / Custom Brand</option>
              </select>
              {brand === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
                />
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Model Name *
              </label>
              <input
                type="text"
                placeholder="e.g. 3 Series, Fortuner, C-Class"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Variant */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Variant / Trim *
              </label>
              <input
                type="text"
                placeholder="e.g. 330i M Sport, 4x2 AT"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Model Year */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Manufacturing Year *
              </label>
              <input
                type="number"
                min={2000}
                max={2030}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Registration Year */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Registration Year
              </label>
              <input
                type="number"
                min={2000}
                max={2030}
                value={registrationYear}
                onChange={(e) => setRegistrationYear(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Registration Number
              </label>
              <input
                type="text"
                placeholder="e.g. RJ27-CA-1234"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technical Specifications */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <Layers className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Specifications &amp; Powertrain
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Fuel Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Fuel Type *
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Transmission *
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Ownership */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Ownership *
              </label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="1st Owner">1st Owner</option>
                <option value="2nd Owner">2nd Owner</option>
                <option value="3rd Owner">3rd Owner</option>
                <option value="4th+ Owner">4th+ Owner</option>
              </select>
            </div>

            {/* Kilometers Driven */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                KM Driven *
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={kmDriven}
                onChange={(e) => setKmDriven(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Body Type *
              </label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="MUV">MUV</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Exterior Colour
              </label>
              <input
                type="text"
                placeholder="e.g. Portimao Blue, Polar White"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Engine */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Engine Displacement
              </label>
              <input
                type="text"
                placeholder="e.g. 1998cc, 4-cyl Turbo"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Seating */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Seating Capacity
              </label>
              <input
                type="number"
                min={2}
                max={9}
                value={seating}
                onChange={(e) => setSeating(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Location & Outlet */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <Car className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Showroom Location &amp; RTO Jurisdiction
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Display Outlet *
              </label>
              <select
                value={outletCity}
                onChange={(e) => setOutletCity(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Udaipur">Udaipur (Meera Nagar Showroom)</option>
                <option value="Chittorgarh">Chittorgarh (NH-27 Showroom)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                RTO Code
              </label>
              <input
                type="text"
                placeholder="e.g. RJ27, DL01, MH02"
                value={rtoCode}
                onChange={(e) => setRtoCode(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                RTO District
              </label>
              <input
                type="text"
                placeholder="e.g. Udaipur, Chittorgarh, Jaipur"
                value={rtoDistrict}
                onChange={(e) => setRtoDistrict(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Pricing & Commercial Terms */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <DollarSign className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Pricing &amp; Financing (₹ INR)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Selling Price */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                step={5000}
                value={price}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setPrice(val)
                }}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
              />
              <p className="text-[10px] text-amber-400 font-mono mt-1">{formatINR(price)}</p>
            </div>

            {/* Original / Strikethrough Price */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Original / MSRP Price (Optional)
              </label>
              <input
                type="number"
                step={5000}
                placeholder="e.g. 3500000"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 font-mono"
              />
              {originalPrice && (
                <p className="text-[10px] text-white/40 font-mono mt-1 line-through">{formatINR(originalPrice)}</p>
              )}
            </div>

            {/* Estimated EMI */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  EMI from (₹/mo)
                </label>
                <button
                  type="button"
                  onClick={autoComputeEmi}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  Auto-compute
                </button>
              </div>
              <input
                type="number"
                step={500}
                value={emiFrom}
                onChange={(e) => setEmiFrom(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
              <p className="text-[10px] text-white/50 font-mono mt-1">{formatINR(emiFrom)}/mo</p>
            </div>

            {/* Negotiable Checkbox */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                  className="h-4 w-4 rounded bg-black/40 border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-white/80 font-medium">Price Negotiable</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 6: Descriptions */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <FileText className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Listing Descriptions
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Short Description (Subtitle / Summary)
              </label>
              <input
                type="text"
                placeholder="e.g. Single-owner luxury sedan in immaculate showroom condition with complete service records."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Detailed Vehicle Overview / Inspection Summary
              </label>
              <textarea
                rows={4}
                placeholder="Full vehicle history, warranty status, tire health, inspection remarks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 7: Features Checklist */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <Sparkles className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Vehicle Equipment &amp; Features ({selectedFeatures.length} Selected)
            </h2>
          </div>

          {/* Standard Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {STANDARD_FEATURES.map((feature) => {
              const checked = selectedFeatures.includes(feature)
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleToggleFeature(feature)}
                  className={cn(
                    'text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-between',
                    checked
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                      : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <span className="truncate">{feature}</span>
                  {checked && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400 ml-1" />}
                </button>
              )
            })}
          </div>

          {/* Custom Feature Input */}
          <div className="pt-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
              Add Custom Feature / Accessory
            </label>
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="e.g. Carbon Fiber Spoiler, HUD Display"
                value={customFeatureInput}
                onChange={(e) => setCustomFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCustomFeature()
                  }
                }}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddCustomFeature}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            {/* Custom Features Tags */}
            {selectedFeatures.filter((f) => !STANDARD_FEATURES.includes(f)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedFeatures
                  .filter((f) => !STANDARD_FEATURES.includes(f))
                  .map((customF) => (
                    <span
                      key={customF}
                      className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-1 rounded"
                    >
                      <span>{customF}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleFeature(customF)}
                        className="hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 8: Dealership Status & Badges */}
        <div className="bg-[#141418] border border-white/10 rounded-xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
            <CheckCircle2 className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Inventory Status &amp; Visibility Flags
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Status */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Current Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white focus:outline-none focus:border-amber-500"
              >
                <option value="available">Available (Public Listing)</option>
                <option value="reserved">Reserved (Token Received)</option>
                <option value="sold">Sold (Completed Deal)</option>
              </select>
            </div>

            {/* Certified */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={certified}
                  onChange={(e) => setCertified(e.target.checked)}
                  className="h-4 w-4 rounded bg-black/40 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-xs text-white/80 font-medium">200-Point Certified</span>
              </label>
            </div>

            {/* Featured */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded bg-black/40 border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-amber-300 font-bold">Featured on Homepage</span>
              </label>
            </div>

            {/* New Arrival */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newArrival}
                  onChange={(e) => setNewArrival(e.target.checked)}
                  className="h-4 w-4 rounded bg-black/40 border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-white/80 font-medium">New Arrival Badge</span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Bottom Submit */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/admin/inventory"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-amber-500 hover:bg-amber-400 text-ink text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isEditing ? 'Save Vehicle Updates' : 'Publish to Website'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
