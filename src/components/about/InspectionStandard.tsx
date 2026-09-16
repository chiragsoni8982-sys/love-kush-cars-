import { motion } from 'framer-motion'
import { Cpu, Gauge, Wrench, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'

const PHASES = [
  {
    phase: '01',
    title: 'Engine & Powertrain Diagnostics',
    icon: Cpu,
    points: [
      'Digital OBD-II computer diagnostic scanning for ECU error codes',
      'Engine cylinder compression and turbocharger boost inspection',
      'Automatic/manual transmission gear shift smoothness and clutch bite',
      'Radiator, cooling fans, and coolant chemical analysis',
    ],
  },
  {
    phase: '02',
    title: 'Chassis & Structural Integrity Check',
    icon: ShieldCheck,
    points: [
      'Micrometer paint depth gauge testing across all metal panels',
      'A, B, C structural pillar and apron laser alignment checks',
      'Underbody inspection on hydraulic lift for floor pan rust or damage',
      'Chassis serial number matching against OEM factory records',
    ],
  },
  {
    phase: '03',
    title: 'Dynamic High-Speed Road Evaluation',
    icon: Gauge,
    points: [
      'High-speed highway stability and steering alignment testing',
      'ABS anti-lock braking performance and emergency stopping distance',
      'Suspension shock absorber rebound and bushing noise checks',
      'HVAC climate control efficiency & cabin air filtration testing',
    ],
  },
  {
    phase: '04',
    title: 'Multi-Stage Detailing & Seal of Approval',
    icon: Wrench,
    points: [
      'Comprehensive 3-step exterior paint swirl removal and glaze',
      'Full interior upholstery deep steam cleaning and sanitization',
      'Electrical switchgear, infotainment, and lighting verification',
      'Affixing the certified Love Kush Cars Quality Seal of Approval',
    ],
  },
]

export function InspectionStandard() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
        {/* Left Heading */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Wrench className="h-3.5 w-3.5 text-ink" />
            <span>Rigorous Quality Protocol</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            The Love Kush 200-Point Certification Standard
          </h2>

          <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            Only 1 out of every 5 pre-owned cars we evaluate in Rajasthan meets our stringent criteria. Before any car
            reaches the showroom floor in Udaipur or Chittorgarh, our master technicians put it through a four-phase
            quality certification process.
          </p>
        </div>

        {/* Right Visual Image Card */}
        <div className="lg:col-span-5">
          <div className="h-56 sm:h-64 w-full overflow-hidden border border-line relative shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
              alt="Love Kush Cars Diagnostic Bay"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent flex items-end p-5">
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>In-House Diagnostic &amp; Refurbishment Bay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Phases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHASES.map((phase, idx) => {
          const Icon = phase.icon
          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-paper border border-line p-6 flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-ink/20">
                    Phase {phase.phase}
                  </span>
                  <div className="h-10 w-10 rounded-[2px] bg-mist flex items-center justify-center text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-ink mb-4">
                  {phase.title}
                </h3>

                <ul className="space-y-2.5 text-xs text-slate/80">
                  {phase.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line text-[11px] font-bold text-ink uppercase tracking-wider">
                50-Point Phase Checklist &check;
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
