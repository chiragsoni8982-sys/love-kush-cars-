import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/data/blogPosts'

export function HomeBlogPreview() {
  const previewPosts = blogPosts.slice(0, 3)

  return (
    <section className="container-lk py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-mist border border-line text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
            <BookOpen className="h-3 w-3 text-ink" />
            <span>Automotive Advisory</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            Guides &amp; Car Ownership Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-xl leading-relaxed">
            Expert pre-purchase checklists, SUV comparisons, RTO legal procedures, and maintenance tips for Rajasthan car owners.
          </p>
        </div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink border border-line px-5 py-3 hover:bg-ink hover:text-paper transition-all shrink-0"
        >
          <span>Explore All Articles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-paper border border-line hover:border-ink transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-elevated"
          >
            <div>
              <Link to={`/blog/${post.slug}`} className="block relative h-48 w-full overflow-hidden border-b border-line">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-ink/90 backdrop-blur-sm text-paper text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.publishedAt}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg text-ink group-hover:text-slate transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate/80 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-line/60 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-ink">{post.author.name}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink group-hover:translate-x-1 transition-transform"
              >
                <span>Read &rarr;</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
