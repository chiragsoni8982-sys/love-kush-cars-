import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { brands, outlets } from '@/data/mockVehicles'

const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'MUV', 'Luxury', 'Coupe']
const budgets = [
  { value: '0-2000000', label: 'Under ₹20 Lakh' },
  { value: '2000000-4000000', label: '₹20 – 40 Lakh' },
  { value: '4000000-7000000', label: '₹40 – 70 Lakh' },
  { value: '7000000-99999999', label: 'Above ₹70 Lakh' },
]

export function SearchPanel() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [brand, setBrand] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [budget, setBudget] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (brand) params.set('brand', brand)
    if (bodyType) params.set('bodyType', bodyType)
    if (budget) params.set('budget', budget)
    navigate(`/inventory?${params.toString()}`)
  }

  return (
    <div className="glass-dark relative z-10 mx-auto w-full max-w-5xl px-6 py-6 sm:px-8 sm:py-8 shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Outlet / City"
          placeholder="All Showrooms"
          labelClassName="text-white/70"
          options={outlets.map((o) => ({
            value: o.city,
            label: `${o.city}${o.isNew ? ' (New Outlet 🌟)' : ''}`,
          }))}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="!bg-white/95 text-ink font-medium"
        />
        <Select
          label="Brand"
          placeholder="Any Brand (36)"
          labelClassName="text-white/70"
          options={brands.map((b) => ({ value: b, label: b }))}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="!bg-white/95 text-ink font-medium"
        />
        <Select
          label="Body Type"
          placeholder="Any Body Type"
          labelClassName="text-white/70"
          options={bodyTypes.map((b) => ({ value: b, label: b }))}
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          className="!bg-white/95 text-ink font-medium"
        />
        <Select
          label="Budget"
          placeholder="Any Budget"
          labelClassName="text-white/70"
          options={budgets}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="!bg-white/95 text-ink font-medium"
        />
      </div>
      <Button onClick={handleSearch} className="w-full mt-5" size="lg" icon={<Search className="h-4 w-4" />}>
        Search Local Showroom Inventory
      </Button>
    </div>
  )
}
