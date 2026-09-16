/**
 * Official Dealership Contact & Communication Configuration
 * Love Kush Cars — Udaipur & Chittorgarh, Rajasthan
 */

export const DEALERSHIP_PHONE = '9694266827'
export const DEALERSHIP_PHONE_INTL = '+919694266827'
export const DEALERSHIP_PHONE_DISPLAY = '+91 96942 66827'
export const DEALERSHIP_WHATSAPP_NUMBER = '919694266827'

/**
 * Generates an official WhatsApp Click-to-Chat URL
 * adhering to WhatsApp API standard: https://wa.me/<number>?text=<encoded_text>
 * 
 * @param customMessage Optional pre-filled text for customer chat
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const baseUrl = 'https://wa.me/' + DEALERSHIP_WHATSAPP_NUMBER
  if (!customMessage) return baseUrl
  return baseUrl + '?text=' + encodeURIComponent(customMessage)
}

/**
 * Generates a tel: link that invokes native dialers on smartphones and desktop apps.
 */
export function getCallUrl(): string {
  return 'tel:' + DEALERSHIP_PHONE_INTL
}
