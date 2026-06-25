import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IndianRupee, Zap, Code2, Shield, DollarSign } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { fadeUp, staggerContainer } from '../utils/animations'
import { useGeoPricing } from '../hooks/useGeoPricing'

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-mono text-3xl font-bold text-cyan md:text-4xl">
      {count}{suffix}
    </span>
  )
}

export default function WhyChooseUs() {
  const { demoPrice, country } = useGeoPricing()

  const trustPoints = useMemo(() => {
    const isIndia = country === 'IN'
    const demoAmount = isIndia ? 500 : 10
    const demoPrefix = isIndia ? '₹' : '$'
    const demoIcon = isIndia ? IndianRupee : DollarSign
    return [
      {
        icon: demoIcon,
        title: 'Affordable First Step',
        description: `Start with a ${demoPrice} demo — no large upfront investment required.`,
        stat: String(demoAmount),
        statLabel: 'demo price',
        prefix: demoPrefix,
      },
      {
        icon: Zap,
        title: 'Fast Turnaround',
        description: 'Your demo website delivered quickly so you can see results fast.',
        stat: '48',
        statLabel: 'hour demo',
        suffix: 'h',
      },
      {
        icon: Code2,
        title: 'Built by Developers',
        description: 'Hand-coded, custom websites — never generic templates.',
        stat: '100',
        statLabel: 'custom code',
        suffix: '%',
      },
      {
        icon: Shield,
        title: 'Transparent Pricing',
        description: 'Clear costs, no hidden fees. You know exactly what you are paying for.',
        stat: '0',
        statLabel: 'hidden fees',
      },
    ]
  }, [country, demoPrice])

  return (
    <SectionWrapper id="why-us">
      <SectionHeader
        label="Why Choose Us"
        title="Built for businesses like yours"
        subtitle="We understand the hesitation of going online. That's why we made the first step easy."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {trustPoints.map((point, i) => (
          <motion.div
            key={point.title}
            custom={i}
            variants={fadeUp}
            className="group rounded-2xl border border-white/5 bg-navy-card p-5 sm:p-6 transition-all duration-500 md:hover:border-cyan/15 md:hover:shadow-lg md:hover:shadow-cyan/5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
              <point.icon size={20} strokeWidth={1.5} />
            </div>

            <div className="mb-4">
              {point.prefix && (
                <span className="font-mono text-3xl font-bold text-cyan md:text-4xl">
                  {point.prefix}
                </span>
              )}
              <AnimatedCounter value={parseInt(point.stat)} suffix={point.suffix || ''} />
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                {point.statLabel}
              </p>
            </div>

            <h3 className="mb-2 font-semibold text-white">{point.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{point.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
