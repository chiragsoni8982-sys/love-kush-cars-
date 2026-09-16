import { Search, X, SlidersHorizontal } from 'lucide-react'
import { blogCategories } from '@/data/blogPosts'
import { cn } from '@/lib/utils'

interface BlogFilterBarProps {
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  totalCount: number
}

export function BlogFilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}: BlogFilterBarProps) {
  return (
    <div className="space-y-6 pb-8 border-b border-line">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          {blogCategories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase()
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={cn(
                  'px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[2px] whitespace-nowrap transition-all duration-200',
                  isSelected
                    ? 'bg-ink text-paper shadow-sm'
                    : 'bg-paper text-slate border border-line hover:border-ink hover:text-ink',
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search guides, models, RTO..."
            className="w-full bg-paper border border-line pl-10 pr-9 py-2.5 text-xs sm:text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Result Status Indicator */}
      <div className="flex items-center justify-between text-xs text-slate/70 pt-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-ink" />
          <span>
            Showing <strong className="text-ink font-bold">{totalCount}</strong> automotive article
            {totalCount === 1 ? '' : 's'}
          </span>
          {selectedCategory !== 'All' && (
            <span className="bg-mist border border-line px-2 py-0.5 text-[10px] uppercase font-bold text-ink">
              Category: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="bg-mist border border-line px-2 py-0.5 text-[10px] font-bold text-ink">
              &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All')
              onSearchChange('')
            }}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}
