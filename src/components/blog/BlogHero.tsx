import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, Clock, Calendar, ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { BlogPost } from '@/data/blogPosts'

interface BlogHeroProps {
  featuredPost: BlogPost
}

export function BlogHero({ featuredPost }: BlogHeroProps) {
  return (
    <section className="relative bg-ink text-paper pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #2d2d2d 0%, #111111 70%), linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
        }}
      />

      <div className="container-lk relative z-10">
        {/* Header Intro Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-300" />
            <span>The Love Kush Automotive Journal &bull; Rajasthan Edition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper"
          >
            AUTOMOTIVE ADVISORY, INSIGHTS &amp; GUIDES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-xs sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Expert buying advice, luxury car comparisons, maintenance secrets, RTO legal procedures, and auto finance
            insights from Rajasthan&apos;s most trusted automotive specialists since 2002.
          </motion.p>
        </div>

        {/* Featured Cover Story Mega Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl mx-auto bg-[#181818] border border-white/15 shadow-elevated overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Photo Banner */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.heroImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/20">
                    <Sparkles className="h-3 w-3" /> Featured Cover Story
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-ink text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {featuredPost.publishedAt}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-[family-name:var(--font-display)] font-extrabold text-xl sm:text-2xl md:text-3xl text-paper hover:text-amber-300 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-white/70 mt-3 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Author Info & CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {featuredPost.author.avatar ? (
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="h-10 w-10 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-white/60" />
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-xs text-paper block">{featuredPost.author.name}</span>
                      <span className="text-[10px] text-white/50 block truncate max-w-[180px]">
                        {featuredPost.author.role}
                      </span>
                    </div>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`} className="w-full sm:w-auto">
                    <Button
                      variant="primary-inverse"
                      size="md"
                      className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs text-ink shadow-sm"
                    >
                      Read Story <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
