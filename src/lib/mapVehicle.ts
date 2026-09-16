import type { Vehicle } from '@/types'
import { resolveImageUrl } from './api'

// Placeholder tones for cars that don't have a real photo yet — same
// palette used in the old mock data, just reused here.
const PLACEHOLDER_TONES = ['#1a1a1a', '#2f2f2f', '#3d3d3d', '#242424', '#333333', '#1f1f1f']

// The raw shape FastAPI actually sends (snake_case, flat fields).
// This matches VehicleRead in the backend's app/schemas.py.
export interface ApiVehicle {
  id: number
  brand: string
  model: string
  variant: string
  year: number
  price: number
  emi_from: number
  fuel_type: string
  transmission: string
  ownership: string
  km_driven: number
  color: string
  body_type: string
  rto_code: string
  rto_district: string
  outlet_city: string
  registration_number?: string | null
  registration_year?: number | null
  original_price?: number | null
  negotiable?: boolean
  short_description?: string | null
  description?: string | null
  photo_url: string | null
  gallery: string[]
  engine: string | null
  mileage: string | null
  seating: number
  features: string[]
  certified: boolean
  sold: boolean
  new_arrival: boolean
  price_drop: boolean
  featured: boolean
  status: string
  created_at?: string
  updated_at?: string
}

/**
 * Converts one car object from the backend's shape into the shape every
 * existing frontend component (VehicleCard, FilterPanel, VehicleDetails...)
 * already expects. This is the ONLY place that needs to know about the
 * backend's field names.
 */
export function mapApiVehicle(raw: ApiVehicle, index = 0): Vehicle {
  const tone = PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length]
  const resolvedPhoto = resolveImageUrl(raw.photo_url)
  const resolvedGallery = raw.gallery && raw.gallery.length > 0
    ? raw.gallery.map((img) => resolveImageUrl(img) || img)
    : resolvedPhoto
      ? [resolvedPhoto]
      : [tone]

  return {
    id: String(raw.id),
    brand: raw.brand,
    model: raw.model,
    variant: raw.variant,
    year: raw.year,
    price: raw.price,
    emiFrom: raw.emi_from,
    fuelType: raw.fuel_type as Vehicle['fuelType'],
    transmission: raw.transmission as Vehicle['transmission'],
    ownership: raw.ownership as Vehicle['ownership'],
    kmDriven: raw.km_driven,
    color: raw.color,
    bodyType: raw.body_type as Vehicle['bodyType'],
    rtoCode: raw.rto_code,
    rtoDistrict: raw.rto_district,
    outletCity: raw.outlet_city,
    registrationNumber: raw.registration_number ?? undefined,
    registrationYear: raw.registration_year ?? undefined,
    originalPrice: raw.original_price ?? undefined,
    negotiable: raw.negotiable ?? false,
    shortDescription: raw.short_description ?? undefined,
    description: raw.description ?? undefined,
    photoUrl: resolvedPhoto,
    image: tone,
    gallery: resolvedGallery,
    specifications: {
      engine: raw.engine ?? 'Not specified',
      mileage: raw.mileage ?? 'Not specified',
      seating: raw.seating,
    },
    features: raw.features || [],
    badges: {
      certified: raw.certified,
      sold: raw.status === 'sold' || raw.sold,
      newArrival: raw.new_arrival,
      priceDrop: raw.price_drop,
      featured: raw.featured,
    },
    status: (raw.status as Vehicle['status']) || 'available',
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}
