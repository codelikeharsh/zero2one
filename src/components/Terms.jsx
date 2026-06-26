import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { useGeoPricing } from '../hooks/useGeoPricing'

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-w-0 items-center justify-between gap-3 py-4 text-left transition-colors hover:text-white sm:py-5"
      >
        <span className="min-w-0 break-words font-medium text-white">{item.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-gray-500"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-400">{item.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Terms() {
  const { demoPrice } = useGeoPricing()
  const [openIndex, setOpenIndex] = useState(0)

  const terms = useMemo(
    () => [
      {
        title: 'Design & Development Only',
        content:
          'zero2one labs provides website design and development services. We craft your site — from demo to final delivery — as a standalone service.',
      },
      {
        title: 'Hosting & Domain Not Included',
        content:
          'Domain registration, hosting, deployment, and ongoing server maintenance are not included in our design/development fees. These are separately chargeable services that we can arrange for you at transparent rates.',
      },
      {
        title: `${demoPrice} Demo Fee Policy`,
        content: `The ${demoPrice} demo fee is non-refundable once work begins. However, if you proceed with the full website project, this amount will be adjusted and credited against your final project cost.`,
      },
      {
        title: 'Project Timeline & Revisions',
        content:
          'Delivery timelines and the number of revision rounds are communicated per project before work begins. We believe in setting clear expectations upfront — no surprises along the way.',
      },
      {
        title: 'Content & Assets',
        content:
          "Clients are responsible for providing business content (text, images, logos) unless otherwise agreed. We can guide you on what's needed during the demo phase.",
      },
      {
        title: 'Ownership & Handover',
        content:
          'Upon full payment for the completed project, you receive ownership of the delivered website files and design. Hosting arrangements remain separate if opted.',
      },
    ],
    [demoPrice],
  )

  return (
    <SectionWrapper id="terms" className="bg-navy-light/50">
      <SectionHeader
        label="Terms"
        title="Clear & simple terms"
        subtitle="We believe in transparency. Here's what you can expect when working with us."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl rounded-2xl border border-white/5 bg-navy-card px-4 sm:px-6 md:px-8"
      >
        {terms.map((item, i) => (
          <AccordionItem
            key={item.title}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
