import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../utils/cn'

function getParticleCount() {
  if (typeof window === 'undefined') return 50
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  if (window.matchMedia('(max-width: 768px)').matches) return 20
  if (window.matchMedia('(max-width: 1024px)').matches) return 35
  return 50
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let particleCount = getParticleCount()
    let connectionDistance = window.matchMedia('(max-width: 768px)').matches ? 80 : 120

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particleCount = getParticleCount()
      connectionDistance = window.matchMedia('(max-width: 768px)').matches ? 80 : 120
      initParticles()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()
      })

      if (window.matchMedia('(max-width: 768px)').matches) {
        animationId = requestAnimationFrame(draw)
        return
      }

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / connectionDistance)})`
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 grid-bg opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        }}
      />
      <div
        className="absolute -top-1/4 left-1/2 h-[min(800px,100vw)] w-[min(800px,100vw)] -translate-x-1/2 rounded-full opacity-20 blur-3xl animate-pulse-glow md:-top-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[min(600px,80vw)] w-[min(600px,80vw)] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, #0a0a0f 100%)',
        }}
      />
    </div>
  )
}

export function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-cyan/[0.12]',
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -120, rotate: rotate - 15 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate }
      }
      transition={{
        duration: shouldReduceMotion ? 0.3 : 2.2,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1 },
      }}
      className={cn('absolute', className)}
      aria-hidden="true"
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-r to-transparent',
            'border-2 border-white/[0.1] shadow-[0_8px_32px_0_rgba(143,234,255,0.08)] backdrop-blur-[2px]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]',
            gradient,
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export function ShapeHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(143,234,255,0.055),transparent_55%)]" />
      <div className="absolute inset-0 grid-bg opacity-45" />

      <ElegantShape
        delay={0.25}
        width={520}
        height={122}
        rotate={8}
        gradient="from-cyan/[0.1]"
        className="left-[-22%] top-[16%] sm:left-[-10%] lg:left-[-4%] lg:top-[20%]"
      />
      <ElegantShape
        delay={0.45}
        width={460}
        height={110}
        rotate={-10}
        gradient="from-white/[0.08]"
        className="right-[-24%] bottom-[24%] sm:right-[-12%] lg:right-[-3%]"
      />
      <ElegantShape
        delay={0.6}
        width={320}
        height={82}
        rotate={-8}
        gradient="from-teal/[0.08]"
        className="left-[7%] bottom-[9%] hidden sm:block"
      />
      <ElegantShape
        delay={0.75}
        width={220}
        height={58}
        rotate={22}
        gradient="from-white/[0.1]"
        className="right-[12%] top-[13%] hidden md:block"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/70 pointer-events-none" />
    </div>
  )
}

export function TypingHeadline({ text, className = '' }) {
  const words = text.split(' ')
  const shouldReduceMotion = useReducedMotion()

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, filter: 'blur(8px)' }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.3 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
