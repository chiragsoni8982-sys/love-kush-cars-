export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: 'Buying Guides' | 'Maintenance & Detailing' | 'RTO & Legal Guide' | 'Auto Finance' | 'Luxury & SUV Reviews'
  tags: string[]
  publishedAt: string
  readTime: string
  author: {
    name: string
    role: string
    avatar: string
  }
  heroImage: string
  featured?: boolean
  tableOfContents: { id: string; title: string }[]
  content: {
    intro: string
    sections: {
      id: string
      heading: string
      body: string[]
      highlight?: string
      warning?: string
      checklist?: string[]
      table?: { headers: string[]; rows: string[][] }
    }[]
    conclusion: string
  }
  relatedVehicleBrand?: string
}

export const blogCategories = [
  'All',
  'Buying Guides',
  'Maintenance & Detailing',
  'RTO & Legal Guide',
  'Auto Finance',
  'Luxury & SUV Reviews',
] as const

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'used-luxury-car-buying-checklist-rajasthan-2026',
    title: 'The Ultimate 2026 Checklist for Buying a Used Luxury Car in Rajasthan',
    subtitle: 'Everything you need to inspect from engine diagnostics to heat-damaged suspensions before signing the RC.',
    excerpt:
      'Buying a pre-owned Mercedes, BMW, Audi, or Toyota in Rajasthan offers incredible value — if you know how to spot hidden defects, verify digital service logs, and navigate local RTO requirements.',
    category: 'Buying Guides',
    tags: ['Pre-Owned Luxury', 'Inspection Checklist', 'Rajasthan Automotive', 'Udaipur Cars'],
    publishedAt: 'February 15, 2026',
    readTime: '6 min read',
    featured: true,
    author: {
      name: 'Vikram Singh Shekhawat',
      role: 'Chief Technical Evaluator, Love Kush Cars',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. The Rajasthan Factor: Climate & Road Considerations' },
      { id: 'sec-2', title: '2. OBD-II Diagnostics & Digital Odometer Cross-Check' },
      { id: 'sec-3', title: '3. Suspension, Air Struts & Undercarriage Inspection' },
      { id: 'sec-4', title: '4. Legal Verification: Hypothecation, Challans & RC Transfer' },
      { id: 'sec-5', title: '5. The Love Kush 200-Point Inspection Advantage' },
    ],
    content: {
      intro:
        'A two-to-four-year-old luxury German sedan or premium SUV has already absorbed the steepest 40% to 55% depreciation curve, making it one of the smartest automotive investments in India. However, the arid climate of Rajasthan, high summer temperatures, and highway driving conditions require a rigorous pre-purchase evaluation strategy.',
      sections: [
        {
          id: 'sec-1',
          heading: '1. The Rajasthan Factor: Climate & Road Considerations',
          body: [
            'Rajasthan’s extreme summer heat (often reaching 45°C+ in Udaipur, Chittorgarh, and Jodhpur) places unique stress on cooling systems, air-conditioning compressors, rubber weatherstripping, and radiator hoses.',
            'When evaluating a pre-owned luxury car, verify that the dual-zone or four-zone climate control cools down the cabin within 3 to 5 minutes at idle. Listen for compressor clutch squeals and inspect coolant reservoir expansion tanks for hairline thermal stress fractures.',
          ],
          highlight:
            'Pro Tip: Always test the car during peak daytime hours to confirm the cooling system can handle intense Mewar summers without the temperature gauge creeping past midpoint.',
        },
        {
          id: 'sec-2',
          heading: '2. OBD-II Diagnostics & Digital Odometer Cross-Check',
          body: [
            'Never buy a modern pre-owned car based on physical appearance alone. A pristine body wrap can easily conceal recurring transmission fault codes or airbag sensor bypasses.',
            'Plug a professional diagnostic scanner into the OBD-II port under the steering column to retrieve active and stored DTC (Diagnostic Trouble Codes). Pay special attention to camshaft timing codes, dual-clutch transmission temperature logs, and ABS wheel speed sensors.',
          ],
          warning:
            'Caution: Digital odometer tampering is widespread among uncertified private brokers. Always demand authorized brand service records (BMW, Mercedes-Benz, Audi, Toyota) to verify that timestamped service milestones match the instrument cluster mileage.',
          checklist: [
            'Scan all ECU modules (Engine, Transmission, SRS Airbags, ABS/ESP)',
            'Cross-check instrument cluster mileage with OEM authorized service software',
            'Inspect ignition coil and spark plug maintenance logs',
            'Verify transmission oil change history (critical at 60,000 km)',
          ],
        },
        {
          id: 'sec-3',
          heading: '3. Suspension, Air Struts & Undercarriage Inspection',
          body: [
            'Luxury vehicles with air suspension (Airmatic / Adaptive Air) provide unmatched ride quality on Rajasthan highways, but replacement air bellows can be costly if neglected.',
            'Inspect the vehicle after it has been parked overnight. If one corner sits lower than the others, an air spring or valve block has an internal pressure leak. On steel spring suspensions, look for oil leakage on strut bodies and worn control arm rubber bushings.',
          ],
        },
        {
          id: 'sec-4',
          heading: '4. Legal Verification: Hypothecation, Challans & RC Transfer',
          body: [
            'A mechanical masterpiece is worthless if the title is encumbered with unpaid bank loans, pending traffic e-challans, or disputed ownership.',
            'Before exchanging funds, verify the vehicle on the Ministry of Road Transport Parivahan Vahan portal. Ensure Form 35 (Hypothecation Removal) and an authentic bank NOC with bank seal and signature are present if the car had an earlier loan.',
          ],
          table: {
            headers: ['Document Name', 'Issuing Authority', 'Critical Verification Point'],
            rows: [
              ['Original RC Smart Card', 'State Transport Department', 'Check chassis & engine numbers match metal stampings'],
              ['Bank Loan NOC & Form 35', 'Lending Bank / NBFC', 'Ensure NOC validity is active and specifies full loan closure'],
              ['Comprehensive Insurance', 'IRDAI Insurer', 'Confirm NCB (No Claim Bonus) percentage and zero-dep status'],
              ['Pollution Certificate (PUC)', 'Authorized RTO Testing Center', 'Ensure emission compliance is updated'],
            ],
          },
        },
        {
          id: 'sec-5',
          heading: '5. The Love Kush 200-Point Inspection Advantage',
          body: [
            'At Love Kush Cars Udaipur & Chittorgarh, we eliminate this guesswork completely. Every car on our showroom floor has passed a 200-point diagnostic check, comes with certified non-accidental and genuine mileage guarantees, and includes complete RTO RC transfer directly to your name.',
          ],
        },
      ],
      conclusion:
        'Buying a certified pre-owned car should feel as exhilarating as driving it out of a brand-new showroom. By adhering to these five checkpoints, you can drive your dream luxury sedan or SUV across Rajasthan with total peace of mind.',
    },
    relatedVehicleBrand: 'Mercedes-Benz',
  },
  {
    id: 'post-2',
    slug: 'fortuner-vs-endeavour-vs-scorpio-n-mewar-highways',
    title: 'Fortuner vs Endeavour vs Scorpio-N: Best Pre-Owned SUV for Mewar Highways',
    subtitle: 'A detailed real-world comparison of ride comfort, maintenance costs, resale value, and ruggedness in Rajasthan.',
    excerpt:
      'We test and compare Rajasthan’s three favorite full-size pre-owned SUVs across Udaipur, Chittorgarh, and Kumbhalgarh terrains to help you pick the ultimate highway cruiser.',
    category: 'Luxury & SUV Reviews',
    tags: ['SUV Comparison', 'Toyota Fortuner', 'Ford Endeavour', 'Mahindra Scorpio-N', 'Off-Road'],
    publishedAt: 'February 10, 2026',
    readTime: '8 min read',
    author: {
      name: 'Raghavendra Joshi',
      role: 'Senior Automotive Analyst, Love Kush Cars',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. Highway Cruising & Engine Performance' },
      { id: 'sec-2', title: '2. Suspension, Ride Comfort & Cabin Noise' },
      { id: 'sec-3', title: '3. Long-Term Maintenance & Reliability in Rajasthan' },
      { id: 'sec-4', title: '4. Resale Value Retention in Udaipur & Chittorgarh' },
      { id: 'sec-5', title: '5. The Final Verdict: Which One Should You Buy?' },
    ],
    content: {
      intro:
        'In Rajasthan, a full-size body-on-frame SUV is more than just transportation — it is a symbol of capability, highway authority, and family safety. Whether navigating the four-lane expressways between Udaipur and Jaipur or the winding ghat sections of Kumbhalgarh and Mount Abu, buyers frequently ask us: Should I buy a pre-owned Toyota Fortuner, Ford Endeavour 3.2, or Mahindra Scorpio-N?',
      sections: [
        {
          id: 'sec-1',
          heading: '1. Highway Cruising & Engine Performance',
          body: [
            'The Toyota Fortuner 2.8L diesel delivers bulletproof 204 PS and 500 Nm of torque with aggressive mid-range punch that overtakes effortlessly on NH-48.',
            'The Ford Endeavour 3.2L 5-cylinder provides an unmatched locomotive-like low-end pull with its smooth torque-converter gearbox. Meanwhile, the modern Scorpio-N 2.2L mHawk diesel surprises with refined power delivery and nimble electric power steering.',
          ],
        },
        {
          id: 'sec-2',
          heading: '2. Suspension, Ride Comfort & Cabin Noise',
          body: [
            'For pure plush ride quality, the Ford Endeavour leads the trio thanks to its rear Watt’s linkage coil spring setup and Active Noise Cancellation cabin technology.',
            'The Scorpio-N features advanced Frequency Selective Damping (FSD) shocks that absorb sharp road joints better than older Mahindras. The Fortuner is undeniably stiffer at lower city speeds but becomes rock-solid once you hit triple-digit highway speeds.',
          ],
        },
        {
          id: 'sec-3',
          heading: '3. Long-Term Maintenance & Reliability in Rajasthan',
          body: [
            'Toyota remains the undisputed king of low ownership stress. Even with 1,50,000 km on the odometer, a well-maintained Fortuner runs like day one, with parts readily available in every district of Rajasthan.',
            'Scorpio-N enjoys affordable spare parts and widespread Mahindra service touchpoints across Udaipur and Chittorgarh. Endeavour owners should ensure their vehicle is sourced from certified dealerships like Love Kush Cars with verified service history.',
          ],
          table: {
            headers: ['Parameter', 'Toyota Fortuner (2.8D)', 'Ford Endeavour (3.2D)', 'Mahindra Scorpio-N (D)'],
            rows: [
              ['Engine Output', '204 PS / 500 Nm', '200 PS / 470 Nm', '175 PS / 400 Nm'],
              ['Highway Ride Quality', 'Stiff / Planted', 'Pillow Soft & Quiet', 'Balanced & Stable'],
              ['Average Service Cost', '₹8,500 / 10k km', '₹11,000 / 10k km', '₹6,500 / 10k km'],
              ['5-Year Resale Value', '75% - 82%', '60% - 68%', '68% - 74%'],
            ],
          },
        },
        {
          id: 'sec-4',
          heading: '4. Resale Value Retention in Udaipur & Chittorgarh',
          body: [
            'In Mewar’s pre-owned market, the Fortuner holds unprecedented resale value, frequently trading with minimal annual depreciation. Scorpio-N enjoys high demand due to long waiting periods on new bookings, while Endeavour offers unmatched luxury per rupee spent.',
          ],
        },
      ],
      conclusion:
        'If you prioritize bulletproof reliability and top resale value, choose the Fortuner. If you seek unmatched luxury and plush ride comfort, pick the Endeavour. For the best balance of modern tech, value, and agility, the Scorpio-N is a stellar choice.',
    },
    relatedVehicleBrand: 'Toyota',
  },
  {
    id: 'post-3',
    slug: 'remove-bank-hypothecation-transfer-rc-rajasthan-rto-guide',
    title: 'Complete Guide to Removing Bank Hypothecation (HP) & RC Transfer in Rajasthan (2026)',
    subtitle: 'A step-by-step walkthrough of Parivahan Vahan, Form 35, NOC validation, and RTO smart card issuance.',
    excerpt:
      'Everything you need to know about clearing bank hypothecation and transferring your vehicle RC across RJ27 Udaipur, RJ09 Chittorgarh, and Rajasthan RTOs without broker hassles.',
    category: 'RTO & Legal Guide',
    tags: ['RTO Transfer', 'Form 35', 'Hypothecation Removal', 'Parivahan', 'Legal Guide'],
    publishedAt: 'January 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Kailash Meena',
      role: 'Head of RTO Liaison & Documentation, Love Kush Cars',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. What is Hypothecation (HP) & Why Must It Be Cleared?' },
      { id: 'sec-2', title: '2. Required Documents for HP Removal in Rajasthan' },
      { id: 'sec-3', title: '3. Step-by-Step Online Application via Parivahan' },
      { id: 'sec-4', title: '4. Inter-District RC Transfer (e.g. RJ14 Jaipur to RJ27 Udaipur)' },
      { id: 'sec-5', title: '5. Hassle-Free RTO Handling by Love Kush Cars' },
    ],
    content: {
      intro:
        'When you pay off your auto loan in India, the vehicle is not automatically free in the government RTO records. Until you officially remove the Hypothecation (HP endorsement) from the Registration Certificate (RC), the lending bank remains the legal co-owner. Here is the step-by-step process for Rajasthan vehicle owners.',
      sections: [
        {
          id: 'sec-1',
          heading: '1. What is Hypothecation (HP) & Why Must It Be Cleared?',
          body: [
            'Hypothecation is an official legal note added to your car’s RC indicating that a bank or NBFC has a financial claim on the vehicle. You cannot legally sell the car, transfer ownership, or claim certain insurance settlements until this endorsement is removed.',
          ],
        },
        {
          id: 'sec-2',
          heading: '2. Required Documents for HP Removal in Rajasthan',
          body: [
            'To process hypothecation removal (HP Deletion / HPT) in Rajasthan, ensure you have collected the original Bank NOC (valid for 90 days from issuance date) along with two copies of Form 35 signed by the authorized bank manager.',
          ],
          checklist: [
            'Original Bank Loan Closure NOC letter',
            'Form 35 (2 copies with bank seal and applicant signature)',
            'Original RC Smart Card',
            'Valid Vehicle Insurance Certificate copy',
            'Valid Pollution Under Control (PUC) certificate',
            'Owner’s Aadhaar Card & PAN Card copy',
          ],
        },
        {
          id: 'sec-3',
          heading: '3. Step-by-Step Online Application via Parivahan',
          body: [
            '1. Visit the official parivahan.gov.in portal and select Vehicle Related Services.',
            '2. Enter your Rajasthan registration number and select your local RTO (e.g., RJ27 Udaipur or RJ09 Chittorgarh).',
            '3. Choose "Hypothecation Termination", upload scanned copies of Form 35 and Bank NOC, and pay the state RTO fee online.',
            '4. Submit the physical document dossier at the RTO single-window counter for verification and biometric authentication.',
          ],
        },
      ],
      conclusion:
        'At Love Kush Cars, our dedicated in-house RTO documentation team handles the entire HP removal and RC transfer process for every buyer and seller free of charge, ensuring your updated smart card is delivered right to your home.',
    },
  },
  {
    id: 'post-4',
    slug: 'protect-german-luxury-car-rajasthan-heat-dust',
    title: 'How to Protect Your Luxury Car Paint & Electronics from Rajasthan’s Summer Heat',
    subtitle: 'Proven detailing, ceramic coating, and thermal management tips from master automotive detailers.',
    excerpt:
      'High UV index, fine desert sand, and hard groundwater can degrade luxury paint and interior leather within months. Learn the exact car care regimen used by our Udaipur detailing studio.',
    category: 'Maintenance & Detailing',
    tags: ['Car Care', 'Ceramic Coating', 'Paint Protection', 'Summer Maintenance', 'Detailing'],
    publishedAt: 'January 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Narendra Sharma',
      role: 'Master Detailing & Refurbishment Specialist',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. The Danger of Dry Dusting & Swirl Marks' },
      { id: 'sec-2', title: '2. PPF vs Ceramic Coating for Rajasthan Conditions' },
      { id: 'sec-3', title: '3. Nappa Leather Conditioning & UV Sunroof Care' },
      { id: 'sec-4', title: '4. Battery Health & Coolant Flush Intervals' },
    ],
    content: {
      intro:
        'Rajasthan’s sun and airborne micro-particles are tough on luxury vehicles. Black, deep grey, and metallic finishes on BMW, Mercedes-Benz, and Audi cars require specialized care to maintain their deep showroom luster and prevent leather dashboard shrinkage.',
      sections: [
        {
          id: 'sec-1',
          heading: '1. The Danger of Dry Dusting & Swirl Marks',
          body: [
            'The biggest mistake car owners make in Udaipur and Chittorgarh is wiping dry dust off the car using a dry cloth or traditional cotton duster. Airborne sand contains sharp silica particles that act like sandpaper, etching deep swirl marks into the clear coat.',
            'Always use a pressure foam pre-wash or waterless detailing spray with high-lubricity polymers and plush 500+ GSM microfiber towels.',
          ],
        },
        {
          id: 'sec-2',
          heading: '2. PPF vs Ceramic Coating for Rajasthan Conditions',
          body: [
            'Paint Protection Film (PPF) is the gold standard for stone-chip defense on high-speed highway stretches like NH-48 and NH-27. Ceramic coatings (9H hardness) provide extreme hydrophobicity and UV rejection, preventing oxidation and paint fading under 45°C sun.',
          ],
        },
      ],
      conclusion:
        'Regular preventative maintenance preserves not only your driving pleasure but thousands of rupees in vehicle resale value when you decide to trade in your car.',
    },
    relatedVehicleBrand: 'BMW',
  },
  {
    id: 'post-5',
    slug: 'used-car-loan-vs-loan-against-car-financial-breakdown',
    title: 'Used Car Loan vs Loan Against Car: Which Saves You More in Interest?',
    subtitle: 'A transparent mathematical comparison of interest rates, LTV ratios, and repayment structuring.',
    excerpt:
      'Confused between financing a pre-owned car purchase or unlocking liquidity from your existing car? We break down bank bidding, tenure calculations, and foreclosure rules.',
    category: 'Auto Finance',
    tags: ['Car Finance', 'Used Car Loan', 'Loan Against Car', 'EMI Calculator', 'Interest Rates'],
    publishedAt: 'January 05, 2026',
    readTime: '7 min read',
    author: {
      name: 'Aditya Mehta',
      role: 'Head of Auto Finance, Love Kush Cars',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. How Used Car Purchase Financing Works' },
      { id: 'sec-2', title: '2. How Loan Against Existing Car (Refinance) Works' },
      { id: 'sec-3', title: '3. Comparative Interest Rates & Processing Fees' },
      { id: 'sec-4', title: '4. The 9-Bank Bidding Formula at Love Kush Cars' },
    ],
    content: {
      intro:
        'Securing auto financing in India has evolved rapidly. With competitive bidding between top private banks and NBFCs, smart buyers can negotiate lower interest rates and flexible tenures. Let’s compare the two primary auto loan products available at our finance desk.',
      sections: [
        {
          id: 'sec-1',
          heading: '1. How Used Car Purchase Financing Works',
          body: [
            'A Used Car Loan is structured specifically for purchasing a certified pre-owned car. Lenders fund up to 100% of the on-road price depending on the car’s valuation and your credit profile, with tenures stretching up to 84 months (7 years).',
          ],
        },
        {
          id: 'sec-2',
          heading: '2. How Loan Against Existing Car (Refinance) Works',
          body: [
            'Loan Against Car allows you to borrow instant cash equity against your currently owned vehicle (up to 150% of market value) without surrendering possession. You keep driving your car while funds are disbursed into your bank account within 24-48 hours.',
          ],
          table: {
            headers: ['Feature', 'Used Car Purchase Loan', 'Loan Against Car (Refinance)'],
            rows: [
              ['Primary Purpose', 'Buying a certified car', 'Emergency liquidity / Personal capital'],
              ['Max Funding Limit', 'Up to 100% on-road price', 'Up to 150% car market value'],
              ['Interest Rate Range', '11.0% – 18.5% p.a.', '12.0% – 19.5% p.a.'],
              ['Max Tenure', 'Up to 84 Months (7 Yrs)', 'Up to 60 Months (5 Yrs)'],
              ['Vehicle Possession', 'Buyer receives car keys', 'Owner continues driving car'],
            ],
          },
        },
      ],
      conclusion:
        'Our finance desk partners with 9+ banks including HDFC, ICICI, Mahindra Finance, and AU Bank to ensure you receive multiple competitive quotes through a single application.',
    },
  },
  {
    id: 'post-6',
    slug: 'why-buying-certified-pre-owned-luxury-cars-makes-financial-sense',
    title: 'Why Buying Certified Pre-Owned BMW & Mercedes in Udaipur Makes Pure Financial Sense',
    subtitle: 'How smart entrepreneurs in Rajasthan avoid steep new car depreciation while driving top-tier luxury.',
    excerpt:
      'A 3-year-old BMW 5 Series or Mercedes-Benz E-Class delivers 95% of the prestige and performance of a new car at less than half the invoice price. Here is the financial breakdown.',
    category: 'Buying Guides',
    tags: ['Luxury Cars', 'BMW 5 Series', 'Mercedes E-Class', 'Depreciation Advantage', 'Smart Buying'],
    publishedAt: 'December 22, 2025',
    readTime: '6 min read',
    author: {
      name: 'Vikram Singh Shekhawat',
      role: 'Chief Technical Evaluator, Love Kush Cars',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'sec-1', title: '1. The Math of New Car Depreciation in India' },
      { id: 'sec-2', title: '2. Upgrades, Features & Modern Safety Standards' },
      { id: 'sec-3', title: '3. Lower Registration Taxes & Insurance Premiums' },
      { id: 'sec-4', title: '4. Certified Quality with Love Kush Warranty' },
    ],
    content: {
      intro:
        'Business owners and luxury car lovers across Udaipur and Chittorgarh are increasingly choosing certified pre-owned vehicles. When you buy smart, you preserve capital for business expansion while enjoying the prestige and comfort of world-class automobiles.',
      sections: [
        {
          id: 'sec-1',
          heading: '1. The Math of New Car Depreciation in India',
          body: [
            'A brand-new luxury sedan costing ₹85 Lakh on-road loses nearly ₹30 Lakh in depreciation within its first 36 months, even with light usage. By purchasing a certified 3-year-old model for ₹48 Lakh, the previous owner absorbs the depreciation hit while you enjoy the prime years of the vehicle.',
          ],
        },
      ],
      conclusion:
        'Visit Love Kush Cars Udaipur or Chittorgarh to explore our curated multi-brand luxury lineup, fully inspected and ready for immediate delivery.',
    },
    relatedVehicleBrand: 'BMW',
  },
]
