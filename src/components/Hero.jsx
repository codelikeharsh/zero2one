import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import liquidGlassHero from '../assets/liquid-glass-hero.png'
import { useMagnetic } from '../hooks/useMagnetic'
import { useGeoPricing } from '../hooks/useGeoPricing'
import { cn } from '../utils/cn'

function MagneticButton({ children, variant = 'primary', onClick, className = '' }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.25)

  const base =
    'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 text-sm font-semibold transition-all duration-300'

  const variants = {
    primary:
      'premium-button md:hover:scale-[1.02]',
    secondary:
      'border border-white/10 bg-white/[0.055] text-white/85 backdrop-blur-md hover:border-white/20 hover:bg-white/[0.09] hover:text-white md:hover:scale-[1.02]',
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </motion.button>
  )
}

function HeroStat({ value, label, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="text-2xl font-semibold leading-none text-white">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/42">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const { demoPrice } = useGeoPricing()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.35 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.35 })
  const imageX = useTransform(smoothX, [-1, 1], [-34, 34])
  const imageY = useTransform(smoothY, [-1, 1], [-22, 22])
  const imageRotate = useTransform(smoothX, [-1, 1], [-3.5, 3.5])
  const glowX = useTransform(smoothX, [-1, 1], ['32%', '78%'])
  const glowY = useTransform(smoothY, [-1, 1], ['24%', '72%'])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleHeroPointerMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const handleHeroPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      id="hero"
      onMouseMove={handleHeroPointerMove}
      onMouseLeave={handleHeroPointerLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy px-4 pt-20 pb-8 sm:px-6 sm:pt-22 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(143,234,255,0.12),transparent_32%),radial-gradient(circle_at_53%_58%,rgba(255,138,92,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
      <div className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_45%,black,transparent_80%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-cyan/10 blur-3xl"
        style={{ left: glowX, top: glowY, x: '-50%', y: '-50%' }}
      />

      <motion.img
        src={liquidGlassHero}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 0.88, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: imageX, y: imageY, rotate: imageRotate }}
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 h-auto w-[920px] max-w-none -translate-x-[40%] -translate-y-1/2 opacity-90 mix-blend-screen sm:w-[1120px] lg:left-[61%] lg:w-[1280px] xl:w-[1380px]"
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(3,3,5,0.72)_78%),linear-gradient(90deg,rgba(3,3,5,0.82),transparent_36%,rgba(3,3,5,0.54)_82%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
        <motion.h1
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl text-[clamp(3.15rem,7.3vw,7rem)] font-black leading-[0.96] tracking-tight text-white"
        >
          <span className="block">from zero,</span>
          <span className="block">we build</span>
          <span className="inline-block bg-gradient-to-r from-white via-cyan to-ember bg-clip-text pb-[0.08em] text-transparent">
            your one
          </span>
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/62 sm:text-base md:mt-5 md:text-lg"
        >
          We help small businesses and independent professionals take their first
          step into the digital world — starting with a live demo website for
          just {demoPrice}.
        </motion.p>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-xl border-l border-white/12 pl-4 text-xs leading-relaxed text-white/48 sm:text-sm"
        >
          Demo-first websites for businesses that want to see the work before they commit.
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mt-7"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo('#contact')}>
            Get Your {demoPrice} Demo
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollTo('#portfolio')}>
            See Our Work
          </MagneticButton>
        </motion.div>

        </div>

        <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl lg:hidden">
          <div className="border-r border-white/10 p-3">
            <div className="text-xl font-semibold text-white">{demoPrice}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/40">demo</div>
          </div>
          <div className="border-r border-white/10 p-3">
            <div className="text-xl font-semibold text-white">0→1</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/40">journey</div>
          </div>
          <div className="p-3">
            <div className="text-xl font-semibold text-white">100%</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/40">custom</div>
          </div>
        </div>
      </div>

      <HeroStat
        value={demoPrice}
        label="demo first"
        className="absolute right-[7%] top-[37%] z-10 hidden w-[190px] lg:block"
      />
      <HeroStat
        value="0→1"
        label="digital journey"
        className="absolute right-[15%] top-[56%] z-10 hidden w-[190px] lg:block"
      />
      <HeroStat
        value="100%"
        label="custom code"
        className="absolute bottom-[15%] right-[8%] z-10 hidden w-[190px] lg:block"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block"
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
