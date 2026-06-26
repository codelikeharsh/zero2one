import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, ExternalLink, Globe2 } from 'lucide-react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { cn } from '../utils/cn'

const MAX_VISIBLE = 7

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1, x: 0, y: 0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
]

const projects = [
  {
    category: 'Herbal Tea',
    title: 'Aurea',
    description: 'A refined product website for a herbal tea brand with a calm, premium feel.',
    url: 'https://saadk66.sg-host.com/',
    imgUrl: 'https://i.ibb.co/gZXMXBnX/Screenshot-2026-06-27-at-12-25-12-AM.png',
    focus: 'Product-first brand site',
    build: 'Custom code',
    gradient: 'from-white/[0.08] via-white/[0.03] to-navy-card',
  },
  {
    category: 'Portfolio Website',
    title: '3D Portfolio',
    description: 'An immersive personal portfolio with interactive 3D visual storytelling.',
    url: 'https://3dportfolio-zero2one.vercel.app/',
    imgUrl: 'https://i.ibb.co/DHSzK6Sn/Screenshot-2026-06-27-at-12-25-52-AM.png',
    focus: '3D showcase',
    build: 'React experience',
    gradient: 'from-white/[0.08] via-white/[0.03] to-navy-card',
  },
  {
    category: 'Dental Clinic',
    title: 'Dental Health',
    description: 'A trustworthy clinic website built around services, confidence, and easy contact.',
    url: 'https://zero2one-dental-health.vercel.app',
    imgUrl: 'https://i.ibb.co/Sw6Zk5br/Screenshot-2026-06-27-at-12-26-20-AM.png',
    focus: 'Clinic conversion',
    build: 'Custom code',
    gradient: 'from-white/[0.08] via-white/[0.03] to-navy-card',
  },
  {
    category: 'Portfolio Website',
    title: 'Cosmic Portfolio',
    description: 'A bold portfolio concept with cosmic visuals and high-impact motion.',
    url: 'https://zero2one-cosmic-portfolio.vercel.app',
    imgUrl: 'https://i.ibb.co/0Rfb6bSK/Screenshot-2026-06-27-at-12-27-10-AM.png',
    focus: 'Animated brand',
    build: 'Motion-led UI',
    gradient: 'from-white/[0.08] via-white/[0.03] to-navy-card',
  },
  {
    category: 'Landing Page',
    title: 'Space Travel',
    description: 'A sleek landing page concept with space-themed visuals and polished sections.',
    url: 'https://zero2one-space-travel.vercel.app',
    imgUrl: 'https://i.ibb.co/JWDjXCRd/Screenshot-2026-06-27-at-12-28-30-AM.png',
    focus: 'Campaign landing',
    build: 'Responsive UI',
    gradient: 'from-white/[0.08] via-white/[0.03] to-navy-card',
  },
]

function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28
  if (width < 640) return 0.38
  if (width < 768) return 0.5
  if (width < 1024) return 0.75
  return 1
}

function getHeightMultiplier(width) {
  let idealPx
  if (width < 480) idealPx = 22 * 16
  else if (width < 640) idealPx = 26 * 16
  else if (width < 768) idealPx = 28 * 16
  else if (width < 1024) idealPx = 34 * 16
  else idealPx = 38 * 16

  const available = window.innerHeight * 0.7
  if (available >= idealPx) return 1
  return available / idealPx
}

function getSlotConfig(totalCards, slot) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot]
  const center = totalCards >> 1
  const distance = totalCards > 1 ? (slot - center) / center : 0
  const absDistance = Math.abs(distance)

  return {
    rot: distance * 21,
    scale: 1 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  }
}

function PortfolioPreview({ project }) {
  if (project.imgUrl) {
    return (
      <img
        src={project.imgUrl}
        alt={`${project.title} website preview`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-8 pt-10">
      <div className="absolute left-1/2 top-[18%] h-56 w-56 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.025] blur-[1px]" />
      <div className="absolute left-[18%] top-[24%] h-28 w-28 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute bottom-[20%] right-[14%] h-32 w-32 rounded-full bg-ember/10 blur-3xl" />
      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-navy/65 p-4 shadow-2xl shadow-black/35 backdrop-blur-md">
        <div className="mb-4 h-24 rounded-lg border border-white/10 bg-[radial-gradient(circle_at_28%_25%,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_72%_35%,rgba(143,234,255,0.12),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
        <div className="mb-3 h-3 w-2/3 rounded-full bg-white/20" />
        <div className="mb-2 h-2 w-full rounded-full bg-white/10" />
        <div className="h-2 w-4/5 rounded-full bg-white/10" />
      </div>
      <div className="absolute left-6 top-16 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
        Preview
      </div>
      <div className="absolute bottom-36 left-6 right-6 text-center text-white/35">
        <p className="truncate text-xs">{project.url.replace(/^https?:\/\//, '')}</p>
      </div>
    </div>
  )
}

function PortfolioCard({ project, isActive }) {
  return (
    <div className="portfolio-card relative h-[400px] w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-navy-card shadow-2xl shadow-black/40 sm:h-[450px] sm:w-[320px] md:h-[520px] md:w-[380px] lg:h-[580px] lg:w-[420px]">
      <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient)} />

      <div className="absolute left-0 right-0 top-0 z-20 flex h-10 items-center gap-2 border-b border-white/10 bg-navy/90 px-3 backdrop-blur-md">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex max-w-[210px] items-center gap-1.5 truncate rounded-md bg-white/5 px-3 py-1 text-[10px] text-gray-400 ring-1 ring-white/5">
            <Globe2 className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">{project.url.replace(/^https?:\/\//, '')}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pt-10">
        {isActive ? (
          <iframe
            src={project.url}
            title={`${project.title} preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="pointer-events-none h-[760px] w-[1180px] origin-top-left scale-[0.24] border-0 sm:scale-[0.28] md:scale-[0.33] lg:scale-[0.36]"
          />
        ) : (
          <PortfolioPreview project={project} />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white md:p-6">
        <span className="mb-2 inline-block rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/75 backdrop-blur-sm">
          {project.category}
        </span>
        <h3 className="mb-2 text-xl font-bold md:text-2xl">{project.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-white/75">{project.description}</p>

        <div className="mb-4 flex gap-2 text-xs">
          <div className="flex-1 rounded-md bg-white/10 px-2 py-1.5 backdrop-blur-sm">
            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/50">Focus</p>
            <p className="font-semibold">{project.focus}</p>
          </div>
          <div className="flex-1 rounded-md bg-white/10 px-2 py-1.5 backdrop-blur-sm">
            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/50">Build</p>
            <p className="font-semibold">{project.build}</p>
          </div>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
        >
          Open Live Site
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function PortfolioCarousel() {
  const containerRef = useRef(null)
  const isAnimating = useRef(false)
  const hasEntered = useRef(false)
  const directionRef = useRef(null)
  const prevVisible = useRef(new Set())

  const totalCards = projects.length
  const visibleSlots = Math.min(MAX_VISIBLE, totalCards)
  const hasControls = totalCards > 1
  const [centerIndex, setCenterIndex] = useState(0)
  const [liveIndex, setLiveIndex] = useState(null)

  const getVisibleMap = useCallback(
    (center) => {
      const map = new Map()
      const centerSlot = visibleSlots >> 1

      for (let slot = 0; slot < visibleSlots; slot += 1) {
        map.set(((center + slot - centerSlot) % totalCards + totalCards) % totalCards, slot)
      }
      return map
    },
    [totalCards, visibleSlots],
  )

  const cycle = useCallback(
    (direction) => {
      if (isAnimating.current || !hasControls) return
      isAnimating.current = true
      directionRef.current = direction
      setLiveIndex(null)
      setCenterIndex((prev) =>
        direction === 'right' ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards,
      )
    },
    [hasControls, totalCards],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || !totalCards) return undefined

    const cardElements = Array.from(container.querySelectorAll('.fan-card'))
    if (!cardElements.length) return undefined

    gsap.killTweensOf(cardElements)

    const visibleMap = getVisibleMap(centerIndex)
    const previouslyVisible = prevVisible.current
    const direction = directionRef.current
    const isFirstMount = !hasEntered.current
    const multiplier = getResponsiveMultiplier(window.innerWidth)
    const hMult = getHeightMultiplier(window.innerWidth)
    const slotCount = visibleSlots
    const config = (slot) => getSlotConfig(slotCount, slot)

    if (isFirstMount) isAnimating.current = true

    let completedCount = 0
    const visibleCount = visibleMap.size
    const onCardDone = () => {
      completedCount += 1
      if (completedCount >= visibleCount) {
        isAnimating.current = false
        setLiveIndex(centerIndex)
        if (isFirstMount) hasEntered.current = true
      }
    }

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex)
      const wasVisible = previouslyVisible.has(cardIndex)

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot)
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
          force3D: true,
          transformPerspective: 1400,
        }

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
            force3D: true,
            transformPerspective: 1400,
          })
          gsap.to(card, {
            ...target,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.12 + slot * 0.035,
            onComplete: onCardDone,
          })
        } else if (!wasVisible) {
          const enterX = direction === 'right' ? 40 : -40
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === 'right' ? 30 : -30,
            scale: 0.5,
            opacity: 0,
            force3D: true,
            transformPerspective: 1400,
          })
          gsap.to(card, { ...target, duration: 0.55, ease: 'power3.out', onComplete: onCardDone })
        } else {
          gsap.to(card, { ...target, duration: 0.52, ease: 'power3.out', onComplete: onCardDone })
        }
      } else if (wasVisible) {
        const exitX = direction === 'right' ? -40 : 40
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: direction === 'right' ? -30 : 30,
          duration: 0.34,
          ease: 'power3.in',
          zIndex: 0,
          force3D: true,
        })
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0, force3D: true })
      }
    })

    prevVisible.current = new Set(visibleMap.keys())

    const visibleEntries = []
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i)
      if (slot !== undefined) visibleEntries.push({ el, slot })
    })
    visibleEntries.sort((a, b) => a.slot - b.slot)

    let activeSlot = null
    let leaveTimer = null
    const centerSlot = visibleEntries.length >> 1

    const updateHoverLayout = (hoveredSlot) => {
      const mult = getResponsiveMultiplier(window.innerWidth)
      const hM = getHeightMultiplier(window.innerWidth)

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot)
        let targetX = base.x * mult
        let targetY = base.y * hM
        let targetRot = base.rot
        let targetScale = base.scale
        let delay = 0

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot)
          delay = distance * 0.02

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM
            targetScale *= 1.08
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance))

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult
              targetRot -= 3 / (distance + 1)
            } else {
              targetX += pushStrength * mult
              targetRot += 3 / (distance + 1)
            }
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.36,
          delay,
          ease: 'power3.out',
          overwrite: 'auto',
          force3D: true,
        })
        gsap.set(el, { zIndex: base.zIndex })
      })
    }

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return
        if (leaveTimer) {
          clearTimeout(leaveTimer)
          leaveTimer = null
        }
        if (activeSlot !== slot) {
          activeSlot = slot
          updateHoverLayout(slot)
        }
      }
      el.addEventListener('mouseenter', handler)
      return { el, handler }
    })

    const onMouseLeave = () => {
      if (isAnimating.current) return
      if (leaveTimer) clearTimeout(leaveTimer)
      leaveTimer = setTimeout(() => {
        activeSlot = null
        updateHoverLayout(null)
      }, 50)
    }

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot)
    }

    container.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener('mouseenter', handler))
      container.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      if (leaveTimer) clearTimeout(leaveTimer)
    }
  }, [centerIndex, getVisibleMap, totalCards, visibleSlots])

  if (!totalCards) return null

  const centerProject = projects[centerIndex]

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div
          ref={containerRef}
          className="fan-layout relative flex min-h-[560px] w-full max-w-[80rem] items-center justify-center overflow-visible sm:min-h-[600px] md:min-h-[620px] lg:min-h-[650px]"
        >
          {projects.map((project, index) => (
            <div key={project.title} className="fan-card absolute">
              <PortfolioCard project={project} isActive={index === liveIndex} />
            </div>
          ))}
        </div>
      </div>

      {hasControls && (
        <div className="mx-auto mt-2 flex w-fit items-center justify-center gap-5 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => cycle('left')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-colors hover:bg-white/[0.08] hover:text-white sm:h-14 sm:w-14"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                onClick={() => {
                  if (isAnimating.current || i === centerIndex) return
                  directionRef.current = i > centerIndex ? 'right' : 'left'
                  isAnimating.current = true
                  setLiveIndex(null)
                  setCenterIndex(i)
                }}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-all duration-300',
                  i === centerIndex
                    ? 'scale-125 bg-white'
                    : 'bg-white/15 hover:bg-white/35',
                )}
                aria-label={`Show ${project.title}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => cycle('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-colors hover:bg-white/[0.08] hover:text-white sm:h-14 sm:w-14"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="mx-auto mt-6 max-w-2xl text-center">
        <p className="mb-4 text-sm text-gray-500">
          Hover a card to bring it forward, or open the centered project in a new tab.
        </p>
        <a
          href={centerProject.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
        >
          Open {centerProject.title}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </>
  )
}

export default function Portfolio() {
  return (
    <SectionWrapper id="portfolio" className="overflow-hidden bg-navy-light/50">
      <SectionHeader
        label="Portfolio"
        title="Websites built to feel alive"
        subtitle="Explore live websites we've built across brands, clinics, portfolios, and landing pages."
      />

      <PortfolioCarousel />
    </SectionWrapper>
  )
}
