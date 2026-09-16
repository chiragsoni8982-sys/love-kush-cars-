export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid'
export type Transmission = 'Manual' | 'Automatic'
export type Ownership = '1st Owner' | '2nd Owner' | '3rd Owner' | '4th+ Owner'
export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'MUV' | 'Luxury' | 'Coupe'
export type VehicleStatus = 'available' | 'sold' | 'reserved'

export interface VehicleBadges {
  certified?: boolean
  sold?: boolean
  newArrival?: boolean
  priceDrop?: boolean
  featured?: boolean
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  variant: string
  year: number
  price: number
  emiFrom: number
  fuelType: FuelType
  transmission: Transmission
  ownership: Ownership
  kmDriven: number
  color: string
  bodyType: BodyType
  rtoCode: string
  rtoDistrict: string
  outletCity: string
  registrationNumber?: string
  registrationYear?: number
  originalPrice?: number
  negotiable?: boolean
  shortDescription?: string
  description?: string
  image: string
  photoUrl?: string
  gallery: string[]
  specifications: {
    engine: string
    mileage: string
    seating: number
  }
  features: string[]
  badges: VehicleBadges
  status: VehicleStatus
  createdAt?: string
  updatedAt?: string
}

export interface AdminUser {
  id: number
  username: string
  createdAt: string
}

export interface AdminStats {
  totalCars: number
  availableCars: number
  reservedCars: number
  soldCars: number
  featuredCars: number
  totalEnquiries: number
  recentCars: Vehicle[]
}

export interface Lead {
  id: number
  leadType: 'sell' | 'exchange' | 'test_drive' | 'finance' | 'contact' | string
  name: string
  phone: string
  email?: string
  location?: string
  vehicleId?: number
  details: Record<string, any>
  status: 'new' | 'contacted' | 'closed' | string
  createdAt: string
}

export interface Outlet {
  id: string
  city: string
  name: string
  address: string
  phone: string
  isNew?: boolean
  description?: string
}

export interface Testimonial {
  id: string
  customerName: string
  rating: number
  comment: string
  vehiclePurchased: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  coverImage: string
  excerpt: string
  author: string
  tags: string[]
}
