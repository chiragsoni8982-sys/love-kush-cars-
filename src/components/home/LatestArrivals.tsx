import { latestArrivals } from '@/data/mockVehicles'
import { VehicleCard } from '@/components/vehicle/VehicleCard'

export function LatestArrivals() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-lk mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Just In</p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl">Latest Arrivals</h2>
      </div>
      <div className="pl-6 md:pl-10 overflow-x-auto no-scrollbar">
        <div className="flex gap-6 pr-6 md:pr-10">
          {[...latestArrivals, ...latestArrivals].map((v, i) => (
            <VehicleCard key={`${v.id}-${i}`} vehicle={v} compact />
          ))}
        </div>
      </div>
    </section>
  )
}
