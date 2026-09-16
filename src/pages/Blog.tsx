import { useState, useMemo, useEffect } from 'react'
import { PhoneCall, MessageCircle, MapPin, AlertCircle } from 'lucide-react'
import { blogPosts } from '@/data/blogPosts'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogFilterBar } from '@/components/blog/BlogFilterBar'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogNewsletter } from '@/components/blog/BlogNewsletter'
import { Button } from '@/components/ui/Button'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    document.title = 'Automotive Journal & Buying Guides | Love Kush Cars Udaipur & Chittorgarh'
    window.scrollTo(0, 0)
  }, [])

  // Featured post for Hero
  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0]
  }, [])

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase()

      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)

      return matchesCategory && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-paper">
      {/* 1. HERO SPOTLIGHT MAGAZINE FEATURE */}
      <BlogHero featuredPost={featuredPost} />

      {/* 2. MAIN ARTICLES FEED WITH FILTER & SEARCH */}
      <section className="container-lk py-12 sm:py-16">
        <BlogFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredPosts.length}
        />

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-mist border border-line p-8 mt-10 max-w-xl mx-auto">
            <AlertCircle className="h-10 w-10 text-slate/40 mx-auto mb-3" />
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-ink">
              No matching articles found
            </h3>
            <p className="text-xs text-slate mt-1">
              Try adjusting your search terms or select another category from the filter above.
            </p>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-5"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* 3. NEWSLETTER SUBSCRIPTION CARD */}
      <BlogNewsletter />

      {/* 4. IN-PERSON CONSULTATION BANNER */}
      <section className="bg-ink text-paper py-16 sm:py-24 border-t border-white/10">
        <div className="container-lk">
          <div className="bg-[#191919] border border-white/15 p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-elevated">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 block mb-2">
                Have a Specific Car Question?
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl text-paper">
                Speak with Our Master Vehicle Appraisers in Udaipur &amp; Chittorgarh
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
                Whether you need advice on a specific luxury model, fair market valuation, or RTO legal clearance, our
                in-house automotive specialists are here to guide you with honest advice over tea.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-5 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white" /> 100 Ft Road, Meera Nagar, Udaipur (RJ27)
                </span>
                <span className="text-white/30">&bull;</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-300" /> NH-27 Bypass, Chittorgarh (RJ09)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919694266827"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink hover:bg-mist text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors font-semibold"
              >
                <PhoneCall className="h-4 w-4 text-ink" /> Call Advisory Desk
              </a>
              <a
                href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20have%20an%20automotive%20query%20after%20reading%20your%20journal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors font-semibold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
