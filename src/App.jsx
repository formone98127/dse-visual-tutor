import { useCallback, useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Theater from './components/Theater.jsx'
import ControlDeck from './components/ControlDeck.jsx'
import { LESSONS_BY_MODE } from './data/lessons.js'
import { SYLLABUS, defaultUnitId } from './data/syllabus.js'

export default function App() {
  const [mode, setMode] = useState('PRE_DSE') // 'PRE_DSE' | 'DSE'
  const [activeUnitId, setActiveUnitId] = useState(() => defaultUnitId('PRE_DSE'))
  const [currentStep, setCurrentStep] = useState(0) // 而家上到邊一個 beat
  const [stageInBeat, setStageInBeat] = useState(0) // 呢一頁入面揭到第幾段
  const [menuOpen, setMenuOpen] = useState(false) // 手機版抽屜選單

  const lessons = LESSONS_BY_MODE[mode]
  const syllabus = SYLLABUS[mode]
  const activeUnit = syllabus.flatMap((t) => t.units).find((u) => u.id === activeUnitId) ?? null
  const lesson = activeUnit?.lessonId
    ? (lessons.find((l) => l.id === activeUnit.lessonId) ?? null)
    : null
  const beat = lesson ? lesson.beats[currentStep] : null
  const total = lesson ? lesson.beats.length : 0
  const beatSteps = beat?.steps ?? 1 // 呢頁有幾多段推演（冇寫 = 一頁一段）

  // 頂部進度條：currentStep / (總步數 - 1)，第一步 0%、最後一步 100%
  const progressPct =
    !lesson || total === 0 ? 0 : total === 1 ? 100 : (currentStep / (total - 1)) * 100

  const changeMode = (m) => {
    setMode(m)
    setActiveUnitId(defaultUnitId(m))
    setCurrentStep(0)
    setStageInBeat(0)
    setMenuOpen(false) // 手機揀完自動收起選單，專心上課
  }

  const selectUnit = (unit) => {
    setActiveUnitId(unit.id)
    // 小節帶 beatId 錨點：直接跳去課程入面對應嗰頁（例：冪的概念 → K1 第 5 頁）
    const les = unit.lessonId
      ? (LESSONS_BY_MODE[mode].find((l) => l.id === unit.lessonId) ?? null)
      : null
    let idx = 0
    if (les && unit.beatId) {
      const bi = les.beats.findIndex((b) => b.id === unit.beatId)
      if (bi >= 0) idx = bi
    }
    setCurrentStep(idx)
    setStageInBeat(0)
    setMenuOpen(false)
  }

  // 下一步：一頁入面未揭晒 → 揭下一段；揭晒 → 下一頁
  const goNext = useCallback(() => {
    if (!lesson) return
    const b = lesson.beats[currentStep]
    const st = b?.steps ?? 1
    if (stageInBeat < st - 1) {
      setStageInBeat((s) => s + 1)
      return
    }
    if (currentStep < lesson.beats.length - 1) {
      setCurrentStep((i) => i + 1)
      setStageInBeat(0)
    }
  }, [lesson, currentStep, stageInBeat])

  // 上一步：一頁入面有揭開嘅段 → 收返一段；去到頁首 → 上一頁（揭晒狀態）
  const goPrev = useCallback(() => {
    if (!lesson) return
    if (stageInBeat > 0) {
      setStageInBeat((s) => s - 1)
      return
    }
    if (currentStep > 0) {
      const prevSteps = lesson.beats[currentStep - 1]?.steps ?? 1
      setCurrentStep((i) => i - 1)
      setStageInBeat(prevSteps - 1)
    }
  }, [lesson, currentStep, stageInBeat])

  // 快速鍵：Space / ↓ / → 下一步，↑ / ← 上一步，Esc 收起手機選單
  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key === ' ' || e.code === 'Space' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // 手機滑動：向上滑 = 下一步，向下滑 = 上一步（淨係認垂直方向，斜側唔觸發）
  const touchStartY = useRef(null)
  const onTouchStart = (e) => {
    document.documentElement.dataset.ts = String(Math.round(e.touches[0].clientY))
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return
    const dy = touchStartY.current - e.changedTouches[0].clientY
    touchStartY.current = null
    document.documentElement.dataset.te = String(Math.round(dy))
    if (Math.abs(dy) < 60) return
    if (dy > 0) goNext()
    else goPrev()
  }

  // 反向同步：行到有 beatId 錨點嘅頁時，左欄自動跳去對應小節
  // （例：K1 行到第 5 頁「冪」，高亮就由「整除性檢驗」跳去「冪的概念」）
  useEffect(() => {
    if (!lesson || !beat) return
    const match = syllabus
      .flatMap((t) => t.units)
      .find((u) => u.lessonId === lesson.id && u.beatId === beat.id)
    if (match && match.id !== activeUnitId) setActiveUnitId(match.id)
  }, [beat, lesson, syllabus, activeUnitId])

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#0a0a0c] text-white">
      {/* 手機版：抽屜背板（點一下收起） */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Sidebar
        mode={mode}
        onChangeMode={changeMode}
        activeUnitId={activeUnitId}
        onSelectUnit={selectUnit}
        open={menuOpen}
      />

      <main
        className="relative flex h-full w-full flex-col md:w-3/4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* 1 · 頂部進度條（螢光藍，極細） */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-white/[0.05]">
          <div
            className="h-full bg-[#4cc9f0] shadow-[0_0_12px_rgba(76,201,240,0.9)] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* 4 · 手機版漢堡選單（避開劉海安全區） */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="開啟課程選單"
          className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-zinc-200 backdrop-blur transition-colors hover:bg-white/10 md:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 5.5h14M3 10h14M3 14.5h14" />
          </svg>
        </button>

        <Theater
          mode={mode}
          lesson={lesson}
          beat={beat}
          stage={stageInBeat}
          pendingTitle={activeUnit && !lesson ? activeUnit.title : null}
        />
        <ControlDeck
          beat={beat}
          index={currentStep}
          total={total}
          stage={stageInBeat}
          steps={beatSteps}
          onPrev={goPrev}
          onNext={goNext}
        />
      </main>
    </div>
  )
}
