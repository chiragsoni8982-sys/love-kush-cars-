import fs from 'fs'

async function syncVehicles() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch('https://love-kush-cars-api.onrender.com/vehicles', { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('API returned status ' + res.status)
    const rawVehicles = await res.json()
    if (!Array.isArray(rawVehicles) || rawVehicles.length === 0) {
      console.log('No vehicles returned from API, keeping existing mockVehicles.ts')
      return
    }
    const API_BASE = 'https://love-kush-cars-api.onrender.com'

    function resolveImageUrl(url) {
      if (!url) return undefined
      if (url.startsWith('http://') || url.startsWith('https://')) return url
      return API_BASE + '/' + url.replace(/^\/+/, '')
    }

    const mapped = rawVehicles.map((raw) => {
      const photoUrl = resolveImageUrl(raw.photo_url)
      const gallery =
        raw.gallery && raw.gallery.length > 0
          ? raw.gallery.map((img) => resolveImageUrl(img) || img)
          : photoUrl
            ? [photoUrl]
            : []

      return {
        id: String(raw.id),
        brand: raw.brand,
        model: raw.model,
        variant: raw.variant,
        year: raw.year,
        price: raw.price,
        emiFrom: raw.emi_from,
        fuelType: raw.fuel_type,
        transmission: raw.transmission,
        ownership: raw.ownership,
        kmDriven: raw.km_driven,
        color: raw.color,
        bodyType: raw.body_type,
        rtoCode: raw.rto_code,
        rtoDistrict: raw.rto_district,
        outletCity: raw.outlet_city,
        registrationNumber: raw.registration_number || undefined,
        registrationYear: raw.registration_year || undefined,
        originalPrice: raw.original_price || undefined,
        negotiable: raw.negotiable ?? false,
        shortDescription: raw.short_description || undefined,
        description: raw.description || undefined,
        photoUrl: photoUrl,
        image: photoUrl || '#1a1a1a',
        gallery: gallery,
        specifications: {
          engine: raw.engine || 'Not specified',
          mileage: raw.mileage || 'Not specified',
          seating: raw.seating || 5,
        },
        features: raw.features || [],
        badges: {
          certified: raw.certified ?? true,
          sold: raw.status === 'sold' || Boolean(raw.sold),
          newArrival: raw.new_arrival ?? true,
          priceDrop: raw.price_drop ?? false,
          featured: raw.featured ?? true,
        },
        status: raw.status || 'available',
      }
    })

    const content = `import type { Vehicle, Testimonial, Outlet } from '@/types'

export const outlets: Outlet[] = [
  {
    id: 'udaipur',
    city: 'Udaipur',
    name: 'Love Kush Cars — Udaipur Main Showroom',
    address: '100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar, Udaipur, Rajasthan 313001',
    phone: '+91 96942 66827',
    isNew: false,
    description: 'Our main luxury flagship showroom & delivery center, housing our certified vehicle inspection lab and primary inventory.',
  },
  {
    id: 'chittorgarh',
    city: 'Chittorgarh',
    name: 'Love Kush Cars — Chittorgarh Outlet',
    address: 'Near Collectorate Circle, NH-27 Bypass, Chittorgarh, Rajasthan 312001',
    phone: '+91 96942 66827',
    isNew: true,
    description: 'Our newest showroom outlet featuring premium certified SUVs, luxury sedans, and immediate on-site test drives.',
  },
]

export const mockVehicles: Vehicle[] = ${JSON.stringify(mapped, null, 2)}

export const featuredVehicles = mockVehicles.filter((v) => v.badges?.featured)
export const latestArrivals = mockVehicles.filter((v) => v.badges?.newArrival)

export const brands = [
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'BYD',
  'Chevrolet',
  'Citroën',
  'Ferrari',
  'Fiat',
  'Force Motors',
  'Ford',
  'Honda',
  'Hyundai',
  'Isuzu',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Mahindra',
  'Maruti Suzuki',
  'Maserati',
  'Mercedes-Benz',
  'MG Motor',
  'MINI',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Renault',
  'Rolls-Royce',
  'Skoda',
  'Tata',
  'Toyota',
  'Volkswagen',
  'Volvo',
]

export const popularBrands = brands

export const brandCategories = [
  {
    category: 'Luxury & Exotics',
    brands: ['Aston Martin', 'Audi', 'Bentley', 'BMW', 'Ferrari', 'Jaguar', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati', 'Mercedes-Benz', 'MINI', 'Porsche', 'Rolls-Royce', 'Volvo'],
  },
  {
    category: 'Leading Indian Market',
    brands: ['Toyota', 'Hyundai', 'Tata', 'Mahindra', 'Maruti Suzuki', 'Kia', 'Honda', 'Volkswagen', 'Skoda', 'MG Motor', 'Jeep', 'Renault', 'Nissan', 'Citroën'],
  },
  {
    category: 'Iconic & Enthusiast Classics',
    brands: ['Ford', 'Mitsubishi', 'Chevrolet', 'Fiat', 'BYD', 'Force Motors', 'Isuzu'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    customerName: 'Arvind Rathore',
    rating: 5,
    comment: 'The inspection report gave me total confidence before I ever saw the car in person. Handover was quick and completely transparent.',
    vehiclePurchased: 'Mercedes-Benz C220d',
  },
  {
    id: 't2',
    customerName: 'Priya Chouhan',
    rating: 5,
    comment: 'Sold my old car through their Sell Your Car process — fair valuation, no back-and-forth haggling, paid the same week.',
    vehiclePurchased: 'Sold: Honda City',
  },
  {
    id: 't3',
    customerName: 'Karan Singh Bhati',
    rating: 5,
    comment: 'Finance was sorted in two days flat. The EMI calculator on the site matched exactly what the bank quoted me.',
    vehiclePurchased: 'Audi Q5',
  },
]
`

    fs.writeFileSync('src/data/mockVehicles.ts', content, 'utf8')
    console.log('Successfully synced ' + mapped.length + ' vehicles to mockVehicles.ts!')
  } catch (err) {
    console.warn('Vehicle sync skipped (using existing mockVehicles):', err.message)
  }
}

syncVehicles()
