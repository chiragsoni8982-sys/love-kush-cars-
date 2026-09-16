import { Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/contact'

export function StickyActions() {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      <a
        href={getWhatsAppUrl('Hi Love Kush Cars, I would like to inquire about certified luxury cars in stock.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+91 96942 66827)"
        className="h-12 w-12 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-elevated hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={getCallUrl()}
        aria-label="Call +91 96942 66827"
        className="h-12 w-12 flex items-center justify-center bg-paper text-ink border border-ink rounded-full shadow-elevated hover:scale-110 transition-transform"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  )
}
