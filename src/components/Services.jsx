import { motion } from 'framer-motion'
import { Palette, Briefcase, Layout, Server } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { scaleIn, staggerContainer } from '../utils/animations'

const services = [
  {
    icon: Palette,
    title: 'Custom Website Design',
    description:
      'Bespoke designs crafted for your brand — clean, modern, and built to convert visitors into customers.',
    gradient: 'from-white/[0.08] to-cyan/10',
  },
  {
    icon: Briefcase,
    title: 'Business & Portfolio Sites',
    description:
      'Professional websites for local businesses, freelancers, and creatives who need to stand out online.',
    gradient: 'from-white/[0.08] to-teal/10',
  },
  {
    icon: Layout,
    title: 'Landing Pages',
    description:
      'High-impact single-page sites designed to capture leads, showcase products, or launch campaigns.',
    gradient: 'from-white/[0.08] to-cyan/10',
  },
  {
    icon: Server,
    title: 'Deployment & Hosting',
    description:
      'Domain setup, hosting, and deployment available as separate paid services — we handle the technical side.',
    gradient: 'from-gray-500/10 to-gray-600/5',
    note: true,
  },
]

export default function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        label="Services"
        title="What we build"
        subtitle="Design and development services tailored for businesses taking their first digital step."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-navy-card transition-all duration-500 md:hover:border-white/15 md:hover:scale-[1.015] md:hover:shadow-xl md:hover:shadow-black/20"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 md:group-hover:opacity-100`}
            />
            <div className="relative p-6 md:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.045] text-cyan ring-1 ring-white/10 transition-all group-hover:bg-white/[0.075] group-hover:ring-white/15">
                <service.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{service.description}</p>
              {service.note && (
                <p className="mt-4 text-xs text-gray-500">
                  Separate paid service — see Terms for details.
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
