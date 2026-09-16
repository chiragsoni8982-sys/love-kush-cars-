export interface FinancePartner {
  id: string
  name: string
  shortName: string
  subText: string
  brandColor: string
  accentColor: string
  logoInitial: string
}

export const financePartners: FinancePartner[] = [
  {
    id: 'mahindra-finance',
    name: 'Mahindra Finance',
    shortName: 'Mahindra Finance',
    subText: 'Mahindra & Mahindra Financial Services',
    brandColor: '#e31837',
    accentColor: '#111111',
    logoInitial: 'MF',
  },
  {
    id: 'hero-fincorp',
    name: 'Hero FinCorp',
    shortName: 'Hero MotoCorp Group',
    subText: 'Hero MotoCorp Financial Services',
    brandColor: '#ee3124',
    accentColor: '#111111',
    logoInitial: 'HERO',
  },
  {
    id: 'cholamandalam',
    name: 'Cholamandalam Finance',
    shortName: 'Chola',
    subText: 'Murugappa Group Institution',
    brandColor: '#ff6600',
    accentColor: '#00539b',
    logoInitial: 'CHOLA',
  },
  {
    id: 'au-bank',
    name: 'AU Small Finance Bank',
    shortName: 'AU Bank',
    subText: 'Retail Banking Partner',
    brandColor: '#6f2b90',
    accentColor: '#f58220',
    logoInitial: 'AU',
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    shortName: 'HDFC Bank',
    subText: 'Auto Loans Division',
    brandColor: '#004c8f',
    accentColor: '#ed232a',
    logoInitial: 'HDFC',
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    shortName: 'ICICI Bank',
    subText: 'Vehicle Finance Desk',
    brandColor: '#b02a30',
    accentColor: '#f58220',
    logoInitial: 'ICICI',
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    shortName: 'Kotak Mahindra',
    subText: 'Premium Auto Loans',
    brandColor: '#da251d',
    accentColor: '#003366',
    logoInitial: 'KOTAK',
  },
  {
    id: 'idbi',
    name: 'IDBI Bank',
    shortName: 'IDBI Bank',
    subText: 'Retail Auto Financing',
    brandColor: '#005b54',
    accentColor: '#f7941d',
    logoInitial: 'IDBI',
  },
  {
    id: 'piramal',
    name: 'Piramal Capital & Housing Finance',
    shortName: 'Piramal Finance',
    subText: 'Piramal Enterprises Group',
    brandColor: '#e03a2f',
    accentColor: '#1d2327',
    logoInitial: 'PIRAMAL',
  },
]
