import { FileText, ShieldCheck, CreditCard, Key, CheckCircle, Info } from 'lucide-react'

const documents = [
  {
    icon: FileText,
    title: 'Original RC (Registration Certificate)',
    desc: 'The original smart card or paper Registration Certificate issued by the RTO.',
    required: true,
  },
  {
    icon: ShieldCheck,
    title: 'Valid Car Insurance',
    desc: 'Active comprehensive or third-party insurance policy copy of the vehicle.',
    required: true,
  },
  {
    icon: CreditCard,
    title: 'Government ID & Address Proof',
    desc: 'Self-attested Aadhaar Card and PAN card of the registered vehicle owner.',
    required: true,
  },
  {
    icon: CreditCard,
    title: 'Bank Details (Cancelled Cheque)',
    desc: 'For instantaneous RTGS / IMPS payout directly to your bank account.',
    required: true,
  },
  {
    icon: FileText,
    title: 'Valid Pollution Under Control (PUC)',
    desc: 'Current emission certificate from any authorized testing center.',
    required: true,
  },
  {
    icon: Key,
    title: 'Original Car Keys & Service Records',
    desc: 'Both original sets of keys, vehicle owner manual, and service booklet (if available).',
    required: false,
  },
  {
    icon: Info,
    title: 'Loan Foreclosure Letter & Form 35 (If on loan)',
    desc: 'If your car is under finance, our team helps acquire the NOC and loan closure statement.',
    required: false,
  },
]

export function DocumentsRequired() {
  return (
    <section className="bg-paper py-20 sm:py-28 border-b border-line">
      <div className="container-lk">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Prepared &amp; Seamless</p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
              Documents Required to Sell Your Car
            </h2>
            <p className="text-sm text-slate/70 mt-3">
              Keep these documents handy when our evaluator arrives for the doorstep inspection. We handle all RTO documentation and Form 29/30 filings for you.
            </p>
          </div>
          <div className="bg-mist border border-line p-4 text-xs text-slate/80 shrink-0 max-w-sm">
            <p className="font-semibold text-ink flex items-center gap-1.5 mb-1">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              100% Free Paperwork Handling
            </p>
            <span>You don't need to visit the RTO. Our team manages the complete RC transfer process.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="bg-paper border border-line p-6 hover:border-slate/40 transition-colors flex items-start gap-4"
            >
              <div className="h-10 w-10 rounded-[2px] bg-mist border border-line flex items-center justify-center shrink-0 text-ink">
                <doc.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-ink">{doc.title}</h3>
                  {doc.required ? (
                    <span className="text-[9px] uppercase font-bold tracking-widest bg-ink text-paper px-1.5 py-0.5">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-semibold tracking-widest bg-mist border border-line text-slate/70 px-1.5 py-0.5">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate/70 mt-2 leading-relaxed">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
