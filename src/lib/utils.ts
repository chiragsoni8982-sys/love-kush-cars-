export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('en-IN').format(km)} km`
}

export function calculateEmi(principal: number, annualRatePct: number, tenureMonths: number): number {
  const r = annualRatePct / 12 / 100
  if (r === 0) return Math.round(principal / tenureMonths)
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
  return Math.round(emi)
}
