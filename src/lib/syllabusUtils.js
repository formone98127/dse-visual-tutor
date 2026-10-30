import { SYLLABUS } from '../data/syllabus.js'

/** 該 mode 全部單元（平坦） */
export function flatUnits(mode) {
  return SYLLABUS[mode].flatMap((t) => t.units.map((u) => ({ ...u, topicId: t.id, topicCode: t.code, topicTitle: t.title })))
}

export function countReady(mode) {
  const units = flatUnits(mode)
  const ready = units.filter((u) => u.lessonId).length
  return { ready, total: units.length, pct: units.length ? Math.round((ready / units.length) * 100) : 0 }
}

/** 下一個「有課」嘅單元（跟 syllabus 順序，跳過即將推出） */
export function nextReadyUnit(mode, currentUnitId) {
  const units = flatUnits(mode).filter((u) => u.lessonId)
  if (units.length === 0) return null
  const i = units.findIndex((u) => u.id === currentUnitId)
  if (i < 0) return units[0]
  return units[(i + 1) % units.length]
}

/** 用 lessonId 搵第一個掛住呢課嘅單元（用嚟「下一課」） */
export function firstUnitForLesson(mode, lessonId) {
  return flatUnits(mode).find((u) => u.lessonId === lessonId) ?? null
}

/** 建議下一課：而家呢課喺 LESSONS 列表嘅下一課 → 對應第一個單元 */
export function suggestNextUnit(mode, currentLessonId, lessons) {
  if (!currentLessonId || !lessons?.length) return null
  const idx = lessons.findIndex((l) => l.id === currentLessonId)
  if (idx < 0) return null
  const nextLesson = lessons[idx + 1]
  if (!nextLesson) return null
  const unit = firstUnitForLesson(mode, nextLesson.id)
  if (!unit) return null
  return {
    ...unit,
    title: nextLesson.title,
    lessonTitle: nextLesson.title,
  }
}
