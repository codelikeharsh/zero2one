import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-navy-light/50">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            label="About Us"
            title="We exist for the businesses that haven't gone online yet"
            align="left"
          />

          <div className="space-y-5 text-base leading-relaxed text-gray-400">
            <p>
              <span className="text-white font-medium">zero2one labs</span> was
              born from a simple observation: thousands of small businesses and
              independent professionals still don't have a website — not because
              they don't want one, but because the process feels expensive,
              confusing, or risky.
            </p>
            <p>
              We built a different model. Instead of asking you to commit thousands
              upfront, we start with a live demo for just ₹500. You see exactly
              what your website could look like before making any big decision.
            </p>
            <p>
              Every site we build is hand-coded with clean, modern technology —
              because we believe your business deserves better than a drag-and-drop
              template. We're developers who care about design, and designers who
              respect code.
            </p>
            <p>
              Our mission is simple: help local businesses and professionals take
              that first confident step into the digital world, and grow from zero
              to one.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-white/5 bg-navy-card p-6 sm:p-8 md:p-10">
            <div
              className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-30 blur-2xl"
              style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
            />

            <div className="mb-8 font-mono text-sm text-gray-500">
              <span className="text-cyan">const</span> mission ={' '}
              <span className="text-teal">'0 → 1'</span>;
            </div>

            <div className="space-y-6">
              {[
                { label: 'Founded with', value: 'a passion for clean code' },
                { label: 'Built for', value: 'small businesses & pros' },
                { label: 'Approach', value: 'demo first, commit later' },
                { label: 'Philosophy', value: 'quality over quantity' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-xs text-cyan/60">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">{item.label}</p>
                    <p className="mt-1 text-lg font-medium text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
