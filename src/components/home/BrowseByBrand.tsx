import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import { brands, brandCategories, mockVehicles } from '@/data/mockVehicles'
import { cn } from '@/lib/utils'

export function BrowseByBrand() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Map of available stock count per brand
  const inventoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    mockVehicles.forEach((v) => {
      counts[v.brand] = (counts[v.brand] || 0) + 1
    })
    return counts
  }, [])

  const filteredBrands = useMemo(() => {
    let list = brands

    if (activeCategory !== 'All') {
      const cat = brandCategories.find((c) => c.category === activeCategory)
      if (cat) {
        list = cat.brands
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      list = list.filter((b) => b.toLowerCase().includes(query))
    }

    return list
  }, [activeCategory, searchQuery])

  return (
    <section className="container-lk py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate mb-2">Explore Indian Market</p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl text-ink">
            Browse By Brand
          </h2>
        </div>

        {/* Quick Brand Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search brand (e.g. BMW, Tata)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mist/60 border border-line pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-slate/60 focus:outline-none focus:border-ink transition-colors"
          />
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate/70" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-line pb-4">
        <button
          onClick={() => setActiveCategory('All')}
          data-cursor="button"
          data-cursor-text="ALL"
          className={cn(
            'px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200',
            activeCategory === 'All'
              ? 'bg-ink text-paper shadow-sm'
              : 'bg-mist text-slate hover:bg-line hover:text-ink',
          )}
        >
          All Brands ({brands.length})
        </button>
        {brandCategories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            data-cursor="button"
            data-cursor-text="FILTER"
            className={cn(
              'px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200',
              activeCategory === cat.category
                ? 'bg-ink text-paper shadow-sm'
                : 'bg-mist text-slate hover:bg-line hover:text-ink',
            )}
          >
            {cat.category} ({cat.brands.length})
          </button>
        ))}
      </div>

      {/* Brand Cards Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line">
          {filteredBrands.map((brand) => {
            const inStock = inventoryCounts[brand] || 0
            return (
              <Link
                key={brand}
                to={`/inventory?brand=${encodeURIComponent(brand)}`}
                data-cursor="button"
                data-cursor-text="EXPLORE"
                className="group relative border-r border-b border-line p-6 flex flex-col items-center justify-center text-center hover:bg-ink transition-all duration-300 min-h-[110px]"
              >
                {inStock > 0 && (
                  <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[9px] font-semibold text-slate uppercase group-hover:text-paper/80 transition-colors">
                    <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                    {inStock} in stock
                  </span>
                )}
                <span className="font-[family-name:var(--font-display)] font-semibold text-sm sm:text-base text-ink group-hover:text-paper transition-colors">
                  {brand}
                </span>
                <span className="text-[10px] text-slate/60 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 group-hover:text-paper/60 transition-all duration-200">
                  View Inventory &rarr;
                </span>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="py-16 text-center border border-line bg-mist/30">
          <p className="text-sm text-slate">No car brand matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('All')
            }}
            className="mt-3 text-xs uppercase font-semibold underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}
