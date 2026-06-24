import { useRef, useCallback } from 'react'

export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const isCoarsePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const handleMouseMove = useCallback(
    (e) => {
      if (isCoarsePointer) return

      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength, isCoarsePointer],
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
