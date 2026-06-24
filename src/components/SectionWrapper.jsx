import { motion } from 'framer-motion'

export default function SectionWrapper({
  children,
  id,
  className = '',
  fullWidth = false,
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 md:py-32 ${fullWidth ? '' : 'px-4 sm:px-6 md:px-12 lg:px-20'} ${className}`}
    >
      <div className={fullWidth ? '' : 'mx-auto max-w-7xl'}>{children}</div>
    </section>
  )
}

export function SectionHeader({ label, title, subtitle, align = 'center' }) {
  const alignClass =
    align === 'left' ? 'text-left' : 'text-center mx-auto max-w-3xl'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 sm:mb-16 md:mb-20 ${alignClass}`}
    >
      {label && (
        <span className="mb-3 sm:mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-cyan">
          {label}
        </span>
      )}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base text-gray-400 md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}
