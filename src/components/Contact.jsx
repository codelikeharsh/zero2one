import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { useGeoPricing } from '../hooks/useGeoPricing'

const websiteTypes = [
  'Business Website',
  'Portfolio / Personal Site',
  'Landing Page',
  'Restaurant / Café',
  'E-commerce',
  'Invitation Webpage',
  'Other',
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqgqneb'

export default function Contact() {
  const { demoPrice } = useGeoPricing()
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    websiteType: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email'
    if (!form.websiteType) newErrors.websiteType = 'Please select a website type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          businessName: form.business.trim(),
          email: form.email.trim(),
          websiteType: form.websiteType,
          additionalDetails: form.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us at contact@zero2one.live.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (submitError) setSubmitError('')
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        label="Contact"
        title="Let's build your first website"
        subtitle={`Tell us about your business and we'll get started on your ${demoPrice} demo.`}
      />

      <div className="grid gap-8 sm:gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            <a
              href="mailto:contact@zero2one.live"
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-navy-card p-4 transition-all hover:border-white/15 hover:shadow-lg hover:shadow-black/20 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.045] text-cyan ring-1 ring-white/10">
                <Mail size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-gray-500">Email us</p>
                <p className="truncate font-medium text-white transition-colors group-hover:text-white/85 sm:break-all sm:whitespace-normal">
                  contact@zero2one.live
                </p>
              </div>
            </a>

            <a
              href="https://instagram.com/zero2one.labs"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-navy-card p-4 transition-all hover:border-white/15 hover:shadow-lg hover:shadow-black/20 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.045] text-cyan ring-1 ring-white/10">
                <InstagramIcon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-gray-500">Instagram</p>
                <p className="truncate font-medium text-white transition-colors group-hover:text-white/85">
                  @zero2one.labs
                </p>
              </div>
            </a>

            <p className="text-sm text-gray-500">
              We typically respond within 24 hours. Ready to see your business online?
              The {demoPrice} demo is the easiest way to start.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl border border-white/5 bg-navy-card p-5 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 size={64} className="text-cyan" />
                  </motion.div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-gray-400">
                    Thanks for reaching out. We'll get back to you within 24 hours to
                    discuss your {demoPrice} demo.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setSubmitError('')
                      setForm({ name: '', business: '', email: '', websiteType: '', message: '' })
                    }}
                    className="mt-8 text-sm text-cyan hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        className={`w-full rounded-xl border bg-navy px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 ${
                          errors.name ? 'border-red-500/50' : 'border-white/10'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={form.business}
                        onChange={handleChange('business')}
                        className="w-full rounded-xl border border-white/10 bg-navy px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20"
                        placeholder="Your business"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      className={`w-full rounded-xl border bg-navy px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="you@business.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      What kind of website do you need?
                    </label>
                    <select
                      value={form.websiteType}
                      onChange={handleChange('websiteType')}
                      className={`w-full rounded-xl border bg-navy px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 ${
                        errors.websiteType ? 'border-red-500/50' : 'border-white/10'
                      } ${!form.websiteType ? 'text-gray-600' : ''}`}
                    >
                      <option value="" disabled>Select a type</option>
                      {websiteTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.websiteType && (
                      <p className="mt-1 text-xs text-red-400">{errors.websiteType}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Additional details (optional)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={handleChange('message')}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-navy px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20"
                      placeholder="Tell us more about your business and what you're looking for..."
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-red-400">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="premium-button flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-5 w-5 rounded-full border-2 border-navy/30 border-t-navy"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
