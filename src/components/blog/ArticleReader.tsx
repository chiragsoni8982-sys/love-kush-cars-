import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  Car,
  Bookmark,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { BlogPost } from '@/data/blogPosts'

interface ArticleReaderProps {
  post: BlogPost
  prevPost?: BlogPost
  nextPost?: BlogPost
}

export function ArticleReader({ post, prevPost, nextPost }: ArticleReaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getWhatsAppShareUrl = () => {
    const text = `*${post.title}*\n${post.subtitle}\n\nRead full guide on Love Kush Cars:\n${window.location.href}`
    return `https://wa.me/?text=${encodeURIComponent(text)}`
  }

  return (
    <article className="min-h-screen bg-paper">
      {/* 1. Header & Article Title Meta Banner */}
      <section className="bg-ink text-paper pt-32 sm:pt-36 pb-14 sm:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 70% 30%, #2e2e2e 0%, transparent 70%)',
          }}
        />

        <div className="container-lk relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link to="/" className="hover:text-paper transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-paper transition-colors">
              Automotive Journal
            </Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </div>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Bookmark className="h-3 w-3" />
            <span>{post.category}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight text-paper">
            {post.title}
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-white/70 mt-4 leading-relaxed max-w-3xl">
            {post.subtitle}
          </p>

          {/* Author Meta & Share Tools Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-white/60" />
                </div>
              )}
              <div>
                <span className="font-bold text-xs sm:text-sm text-paper block">{post.author.name}</span>
                <span className="text-[11px] text-white/50 block">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {post.publishedAt}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>

              <div className="h-4 w-[1px] bg-white/20 mx-1" />

              {/* Share actions */}
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-[2px] transition-colors text-[11px] font-semibold"
                title="Share on WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-[2px] transition-colors text-[11px] font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image */}
      <div className="container-lk max-w-4xl mx-auto -mt-6 sm:-mt-10 relative z-20">
        <div className="h-72 sm:h-96 md:h-[450px] w-full overflow-hidden border-2 border-line shadow-elevated">
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 3. Main Article Body Container */}
      <div className="container-lk max-w-4xl mx-auto py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-12 space-y-10">
            {/* Table of Contents Box */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="p-6 bg-mist border border-line rounded-[2px]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate/70 block mb-3">
                  Table of Contents
                </span>
                <ul className="space-y-2 text-xs sm:text-sm font-medium text-ink">
                  {post.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <a href={`#${toc.id}`} className="hover:underline hover:text-slate flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink shrink-0" />
                        <span>{toc.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Intro Lead Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-ink font-medium leading-relaxed border-l-2 border-ink pl-4 italic">
              {post.content.intro}
            </p>

            {/* Article Sections */}
            {post.content.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24 pt-2">
                <h2 className="font-[family-name:var(--font-display)] font-extrabold text-xl sm:text-2xl md:text-3xl text-ink">
                  {section.heading}
                </h2>

                <div className="space-y-3 text-xs sm:text-sm md:text-base text-slate leading-relaxed">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Highlight Quote Box */}
                {section.highlight && (
                  <div className="p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs sm:text-sm font-medium rounded-r-[2px] flex items-start gap-3 my-4">
                    <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <p>{section.highlight}</p>
                  </div>
                )}

                {/* Warning Callout Box */}
                {section.warning && (
                  <div className="p-4 sm:p-5 bg-rose-50 border-l-4 border-rose-500 text-rose-900 text-xs sm:text-sm font-medium rounded-r-[2px] flex items-start gap-3 my-4">
                    <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    <p>{section.warning}</p>
                  </div>
                )}

                {/* Checklist Component */}
                {section.checklist && section.checklist.length > 0 && (
                  <div className="p-5 bg-mist border border-line rounded-[2px] my-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate/70 block mb-3">
                      Essential Verification Checklist:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-ink">
                      {section.checklist.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Comparative Table Component */}
                {section.table && (
                  <div className="overflow-x-auto my-6 border border-line">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-mist border-b border-line text-ink font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          {section.table.headers.map((h) => (
                            <th key={h} className="p-3.5 sm:p-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line bg-paper">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-mist/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 sm:p-4 text-slate">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <div className="p-6 bg-mist border border-line space-y-3">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink">Summary &amp; Takeaway</h3>
              <p className="text-xs sm:text-sm text-slate leading-relaxed">{post.content.conclusion}</p>
            </div>

            {/* Related Inventory Spotlight Callout */}
            {post.relatedVehicleBrand && (
              <div className="p-6 bg-ink text-paper border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-widest block">
                    Certified {post.relatedVehicleBrand} Cars in Stock
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] font-bold text-lg text-paper mt-0.5">
                    Looking for certified {post.relatedVehicleBrand} in Udaipur or Chittorgarh?
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    Every car is 200-point inspected with verified service history and immediate bank loan options.
                  </p>
                </div>
                <Link to="/inventory">
                  <Button variant="primary-inverse" size="md" className="shrink-0 font-bold uppercase text-xs text-ink">
                    <Car className="h-4 w-4 mr-1.5 text-ink" /> View Inventory
                  </Button>
                </Link>
              </div>
            )}

            {/* Article Tags */}
            <div className="pt-6 border-t border-line flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate uppercase tracking-wider mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-slate bg-mist border border-line px-3 py-1 rounded-[2px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Profile Bio Box */}
            <div className="p-6 bg-mist border border-line flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-line shrink-0"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-paper border border-line flex items-center justify-center shrink-0">
                  <User className="h-8 w-8 text-slate/60" />
                </div>
              )}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate/60 block">Written By</span>
                <h4 className="font-bold text-base text-ink mt-0.5">{post.author.name}</h4>
                <p className="text-xs text-slate font-medium">{post.author.role}</p>
                <p className="text-xs text-slate/80 mt-2 leading-relaxed">
                  Passionate automotive veteran with deep expertise in Rajasthan vehicle evaluation, luxury diagnostics,
                  and ownership advisory at Love Kush Cars.
                </p>
              </div>
            </div>

            {/* Next / Previous Article Pagination Navigation */}
            <div className="pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="p-4 border border-line hover:border-ink transition-colors flex flex-col text-left group"
                >
                  <span className="text-[10px] uppercase font-bold text-slate/60 tracking-wider flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="h-3 w-3" /> Previous Article
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-ink line-clamp-1 mt-1">{prevPost.title}</span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="p-4 border border-line hover:border-ink transition-colors flex flex-col text-right group"
                >
                  <span className="text-[10px] uppercase font-bold text-slate/60 tracking-wider flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
                    Next Article <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-ink line-clamp-1 mt-1">{nextPost.title}</span>
                </Link>
              )}
            </div>

            {/* Back to All Articles */}
            <div className="text-center pt-6">
              <Link to="/blog">
                <Button variant="secondary" size="md">
                  <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to All Articles &amp; Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
