import { useState } from 'react'
import { Mail, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <section className="container-lk my-16 sm:my-20">
      <div className="relative overflow-hidden bg-ink text-paper p-8 sm:p-12 border border-white/15 shadow-elevated">
        {/* Glow Effects */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Love Kush Automotive Journal</span>
            </div>

            <h3 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-paper">
              Get Mewar&apos;s Best Automotive Insights &amp; Certified Stock Drops
            </h3>

            <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
              Join 5,000+ car owners across Rajasthan. Receive weekly price trend analyses, luxury buying guides, RTO
              updates, and early access to newly certified cars in Udaipur &amp; Chittorgarh.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Zero Spam Promise
              </span>
              <span>&bull;</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {subscribed ? (
              <div className="p-5 bg-white/10 border border-white/20 rounded-[2px] flex items-center gap-3 text-left max-w-md">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-sm text-paper block">Welcome to the Journal!</span>
                  <span className="text-xs text-white/70">
                    You are now subscribed with <strong>{email}</strong>. Check your inbox for our latest luxury car buying guide.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-paper border border-line pl-10 pr-3.5 py-3.5 text-xs sm:text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary-inverse"
                  size="md"
                  className="font-bold uppercase tracking-wider text-xs px-6 py-3.5 shadow-sm text-ink shrink-0"
                >
                  Subscribe Free
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
