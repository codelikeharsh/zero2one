import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { scaleIn, staggerContainer } from '../utils/animations'

const projects = [
  {
    name: 'Bloom Café',
    category: 'Restaurant & Café',
    gradient: 'from-amber-900/40 via-orange-800/20 to-navy-card',
    accent: '#f59e0b',
  },
  {
    name: 'Studio Arjun',
    category: 'Creative Portfolio',
    gradient: 'from-purple-900/40 via-violet-800/20 to-navy-card',
    accent: '#a78bfa',
  },
  {
    name: 'FitLife Coaching',
    category: 'Health & Wellness',
    gradient: 'from-emerald-900/40 via-teal-800/20 to-navy-card',
    accent: '#14b8a6',
  },
  {
    name: 'Urban Realty',
    category: 'Real Estate',
    gradient: 'from-blue-900/40 via-cyan-800/20 to-navy-card',
    accent: '#00d4ff',
  },
  {
    name: 'Craft & Co.',
    category: 'E-commerce',
    gradient: 'from-rose-900/40 via-pink-800/20 to-navy-card',
    accent: '#f472b6',
    span: true,
  },
]

export default function Portfolio() {
  return (
    <SectionWrapper id="portfolio" className="bg-navy-light/50">
      <SectionHeader
        label="Portfolio"
        title="Work we're proud of"
        subtitle="A selection of websites we've built for businesses going from zero to one."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            custom={i}
            variants={scaleIn}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-navy-card ${
              project.span ? 'md:col-span-2' : ''
            }`}
          >
            <div
              className={`relative aspect-[16/10] bg-gradient-to-br ${project.gradient} ${project.span ? 'md:aspect-[21/9]' : ''}`}
            >
              {/* Placeholder UI mockup */}
              <div className="absolute inset-3 sm:inset-6 rounded-lg border border-white/10 bg-navy/60 p-3 sm:p-4 opacity-60 transition-opacity group-hover:opacity-30 md:group-hover:opacity-30">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                  <div className="h-1.5 w-16 rounded bg-white/10" />
                  <div className="h-1.5 w-8 rounded bg-white/5" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded bg-white/10" />
                  <div className="h-2 w-1/2 rounded bg-white/5" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded bg-white/5" />
                  <div className="h-12 rounded bg-white/5" />
                  <div className="h-12 rounded bg-white/5" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 opacity-0 backdrop-blur-sm transition-all duration-500 md:group-hover:opacity-100">
                <motion.div
                  initial={false}
                  className="text-center"
                >
                  <span
                    className="mb-2 block text-xs font-medium uppercase tracking-widest"
                    style={{ color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    {project.name}
                  </h3>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-cyan transition-colors hover:text-white"
                  >
                    View Live
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 p-4 sm:p-5 transition-colors md:group-hover:bg-white/[0.02]">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">{project.name}</h3>
                <p className="truncate text-sm text-gray-500">{project.category}</p>
              </div>
              <ExternalLink
                size={18}
                className="shrink-0 text-gray-600 transition-colors md:group-hover:text-cyan"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
