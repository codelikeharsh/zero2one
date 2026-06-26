import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Code2, Eye, Rocket } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { fadeUp, staggerContainer } from '../utils/animations'
import { useGeoPricing } from '../hooks/useGeoPricing'

export default function HowItWorks() {
  const { demoPrice } = useGeoPricing()

  const steps = useMemo(
    () => [
      {
        icon: MessageSquare,
        number: '01',
        title: 'Tell us about your business',
        description:
          'Share your vision, brand, and what you need. A quick conversation is all it takes to get started.',
      },
      {
        icon: Code2,
        number: '02',
        title: `We build your ${demoPrice} demo`,
        description:
          'Our team crafts a live demo website tailored to your business — real design, real code, not a mockup.',
      },
      {
        icon: Eye,
        number: '03',
        title: 'Review & refine',
        description:
          'See your demo, share feedback, and request changes. No commitment until you love what you see.',
      },
      {
        icon: Rocket,
        number: '04',
        title: 'Full custom website',
        description:
          'Love the demo? We build your complete, customized website with every detail perfected.',
      },
    ],
    [demoPrice],
  )

  return (
    <SectionWrapper id="how-it-works" className="bg-navy-light/50">
      <SectionHeader
        label="How It Works"
        title="Your path from zero to one"
        subtitle="A simple, transparent process designed to remove the risk from going online."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative"
      >
        {/* Desktop timeline line */}
        <div className="absolute top-12 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={fadeUp}
              className="group relative h-full"
            >
              <div className="relative flex h-full min-h-[270px] flex-col rounded-2xl border border-white/5 bg-navy-card/80 p-5 transition-all duration-500 sm:p-6 md:hover:border-white/15 md:hover:bg-navy-card md:hover:shadow-lg md:hover:shadow-black/20 lg:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.045] text-cyan ring-1 ring-white/10 transition-all group-hover:bg-white/[0.075] group-hover:ring-white/15">
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-gray-600">{step.number}</span>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
              </div>

              {/* Mobile vertical connector */}
              {i < steps.length - 1 && (
                <div className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-white/15 to-transparent lg:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.045] to-cyan/[0.055] p-5 text-center sm:mt-16 sm:p-6 md:p-8"
      >
        <p className="text-balance text-sm text-gray-300 md:text-base">
          <span className="font-semibold text-cyan">The {demoPrice} demo</span> is our promise —
          see your website before you commit to the full project. No templates, no
          surprises.
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
