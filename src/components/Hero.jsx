import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedBackground, { TypingHeadline } from './AnimatedBackground'
import { useMagnetic } from '../hooks/useMagnetic'
import { useGeoPricing } from '../hooks/useGeoPricing'

function MagneticButton({ children, variant = 'primary', onClick, className = '' }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.25)

  const base =
    'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3.5 text-sm font-semibold transition-all duration-300'

  const variants = {
    primary:
      'bg-cyan text-navy hover:shadow-xl hover:shadow-cyan/30 md:hover:scale-[1.03]',
    secondary:
      'border border-white/10 bg-white/5 text-white hover:border-cyan/40 hover:bg-cyan/5 md:hover:scale-[1.03]',
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </motion.button>
  )
}

export default function Hero() {
  const { demoPrice } = useGeoPricing()

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-16 md:px-12 lg:px-20"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 text-[11px] font-medium tracking-wide text-cyan sm:px-4 sm:text-xs"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan animate-pulse" />
          <span className="text-balance">Taking your business from 0 to 1, Online</span>
        </motion.div>

        <h1 className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl sm:leading-[1.1] md:text-6xl lg:text-7xl">
          <TypingHeadline text="From Zero, We Build Your One." />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-5 sm:mt-6 max-w-2xl text-sm text-gray-400 sm:text-base md:text-lg"
        >
          We help small businesses and independent professionals take their first
          step into the digital world — starting with a live demo website for
          just {demoPrice}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-8 sm:mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo('#contact')}>
            Get Your {demoPrice} Demo
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollTo('#portfolio')}>
            See Our Work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2 text-[11px] text-gray-500 sm:gap-8 sm:text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan">{demoPrice}</span>
            <span>demo first</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan">0→1</span>
            <span>digital journey</span>
          </div>
          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-mono text-cyan">100%</span>
            <span>custom code</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
