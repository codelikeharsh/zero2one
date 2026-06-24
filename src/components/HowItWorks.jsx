import { motion } from 'framer-motion'
import { MessageSquare, Code2, Eye, Rocket } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { fadeUp, staggerContainer } from '../utils/animations'

const steps = [
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
    title: 'We build your ₹500 demo',
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
]

export default function HowItWorks() {
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
        <div className="absolute top-12 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent lg:block" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={fadeUp}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-white/5 bg-navy-card/80 p-5 transition-all duration-500 sm:p-6 md:hover:border-cyan/20 md:hover:bg-navy-card md:hover:shadow-lg md:hover:shadow-cyan/5 lg:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/20 transition-all group-hover:bg-cyan/15 group-hover:ring-cyan/30">
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-gray-600">{step.number}</span>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>

                {/* Connector dot for desktop */}
                <div className="absolute -top-3 left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-lg shadow-cyan/50 lg:block" />
              </div>

              {/* Mobile vertical connector */}
              {i < steps.length - 1 && (
                <div className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-cyan/30 to-transparent lg:hidden" />
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
        className="mt-12 sm:mt-16 rounded-2xl border border-cyan/10 bg-gradient-to-r from-cyan/5 to-teal/5 p-5 text-center sm:p-6 md:p-8"
      >
        <p className="text-balance text-sm text-gray-300 md:text-base">
          <span className="font-semibold text-cyan">The ₹500 demo</span> is our promise —
          see your website before you commit to the full project. No templates, no
          surprises.
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
