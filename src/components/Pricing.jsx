import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { fadeUp, staggerContainer } from '../utils/animations'
import { useGeoPricing } from '../hooks/useGeoPricing'

export default function Pricing() {
  const { demoPrice } = useGeoPricing()

  const tiers = useMemo(
    () => [
      {
        step: '01',
        title: `${demoPrice} Demo`,
        price: demoPrice,
        description:
          'A live demo website built for your business. See it, test it, love it — before any big commitment.',
        features: [
          'Custom demo tailored to your business',
          'Real design & real code',
          'Feedback & revision round',
          'Credited toward final project if you proceed',
        ],
        highlight: true,
      },
      {
        step: '02',
        title: 'Full Website',
        price: 'Custom Quote',
        description:
          'Your complete, customized website built to your exact specifications after you approve the demo.',
        features: [
          'Fully custom design & development',
          'Mobile-responsive & fast',
          'SEO-friendly structure',
          'Revision rounds as agreed per project',
        ],
        highlight: false,
      },
      {
        step: '03',
        title: 'Hosting & Maintenance',
        price: 'Separate',
        description:
          'Optional ongoing services — domain, hosting, deployment, and maintenance billed separately.',
        features: [
          'Domain registration assistance',
          'Hosting & deployment setup',
          'Ongoing maintenance plans',
          'Transparent separate pricing',
        ],
        highlight: false,
        optional: true,
      },
    ],
    [demoPrice],
  )

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="pricing">
      <SectionHeader
        label="Pricing"
        title="Simple, honest pricing"
        subtitle="No hidden costs. Start small, scale when you're ready."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.step}
            custom={i}
            variants={fadeUp}
            className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 ${
              tier.highlight
                ? 'border-cyan/30 bg-gradient-to-b from-cyan/10 to-navy-card shadow-xl shadow-cyan/10 lg:scale-105'
                : 'border-white/5 bg-navy-card md:hover:border-white/10'
            } ${tier.optional ? 'opacity-90' : ''}`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-4 py-1 text-xs font-semibold text-navy">
                Start Here
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500">{tier.step}</span>
              {tier.optional && (
                <span className="text-xs text-gray-500">Optional</span>
              )}
            </div>

            <h3 className="text-xl font-semibold text-white">{tier.title}</h3>
            <p className="mt-2 font-mono text-3xl font-bold text-cyan">{tier.price}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">{tier.description}</p>

            <ul className="mt-6 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                  {feature}
                </li>
              ))}
            </ul>

            {tier.highlight && (
              <button
                type="button"
                onClick={scrollToContact}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-cyan py-3 text-sm font-semibold text-navy transition-all hover:bg-cyan/90 hover:shadow-lg hover:shadow-cyan/25"
              >
                Get Your Demo
                <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-2 px-2 text-center text-sm text-gray-500"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[10px] sm:gap-3 sm:text-xs">
          <span className="text-cyan">{demoPrice} Demo</span>
          <ArrowRight size={12} className="shrink-0" />
          <span className="text-gray-400">Full Website</span>
          <ArrowRight size={12} className="shrink-0" />
          <span className="text-gray-400">Hosting (Optional)</span>
        </div>
        <p className="text-balance text-xs sm:text-sm">
          Demo fee is credited toward your final project cost when you proceed.
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
