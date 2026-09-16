import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import type { BlogPost } from '@/data/blogPosts'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-paper border border-line flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 group overflow-hidden"
    >
      <div>
        {/* Card Thumbnail Image */}
        <Link to={`/blog/${post.slug}`} className="block relative h-52 sm:h-56 w-full overflow-hidden border-b border-line">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-ink/90 backdrop-blur-sm text-paper text-[10px] font-bold uppercase tracking-wider border border-white/10">
              {post.category}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wider">
              {post.readTime}
            </span>
          </div>
        </Link>

        {/* Card Body */}
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
            <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-ink group-hover:text-slate transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate/80 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-semibold text-slate/60 bg-mist px-2 py-0.5 border border-line"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 border-t border-line/60 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-7 w-7 rounded-full object-cover border border-line"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-mist flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-slate/60" />
            </div>
          )}
          <span className="text-xs font-semibold text-ink truncate max-w-[130px]">{post.author.name}</span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink group-hover:translate-x-1 transition-transform"
        >
          <span>Read</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  )
}
