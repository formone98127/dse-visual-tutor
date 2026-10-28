import { useEffect, useRef, useState } from 'react'

export function clamp01(x) {
  return Math.min(1, Math.max(0, x))
}

export function easeOutCubic(p) {
  return 1 - Math.pow(1 - p, 3)
}

/** rAF progress 0→1 (eased), restarts whenever `key` changes. */
export function useFly(key, dur = 950) {
  const [u, setU] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    cancelAnimationFrame(raf.current)
    setU(0)
    const start = performance.now()
    const tick = (now) => {
      const p = clamp01((now - start) / dur)
      setU(easeOutCubic(p))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [key, dur])
  return u
}

let _audioCtx = null

/** short confirmation blip when a gate answer is correct */
export function beep() {
  try {
    _audioCtx ??= new (window.AudioContext || window.webkitAudioContext)()
    const ctx = _audioCtx
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.frequency.value = 880
    g.gain.setValueAtTime(0.08, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35)
    o.start()
    o.stop(ctx.currentTime + 0.35)
  } catch {
    /* audio unavailable — stay silent */
  }
}
