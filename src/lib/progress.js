/** 本機進度：記住 mode / 單元 / 頁 / 段，刷新唔會從頭再嚟 */

const KEY = 'dvt.progress.v1'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    if (!data.mode || !data.unitId) return null
    return {
      mode: data.mode,
      unitId: data.unitId,
      step: Number(data.step) || 0,
      stage: Number(data.stage) || 0,
      updatedAt: data.updatedAt ?? null,
    }
  } catch {
    return null
  }
}

export function saveProgress({ mode, unitId, step = 0, stage = 0 }) {
  if (!mode || !unitId) return
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        mode,
        unitId,
        step,
        stage,
        updatedAt: Date.now(),
      }),
    )
  } catch {
    /* private mode / quota — ignore */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
