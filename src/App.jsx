import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Theater from './components/Theater.jsx'
import ControlDeck from './components/ControlDeck.jsx'
import { LESSONS_BY_MODE } from './data/lessons.js'
import { SYLLABUS } from './data/syllabus.js'
import { loadProgress, saveProgress, clearProgress } from './lib/progress.js'
import { track } from './lib/analytics.js'
import { flatUnits, suggestNextUnit } from './lib/syllabusUtils.js'

export default function App() {
  const [mode, setMode] = useState('PRE_DSE')
  const [activeUnitId, setActiveUnitId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stageInBeat, setStageInBeat] = useState(0)
  const [menuOpen, setMenuOpen] = useState(true)
  const [showComplete, setShowComplete] = useState(false)
  const [continueInfo, setContinueInfo] = useState(null)
  const [gateOk, setGateOk] = useState(true)
  const startedLessonRef = useRef(null)
  const lastPageKeyRef = useRef(null)

  const lessons = LESSONS_BY_MODE[mode]
  const syllabus = SYLLABUS[mode]
  const pickingUnit = !activeUnitId
  const activeUnit = syllabus.flatMap((t) => t.units).find((u) => u.id === activeUnitId) ?? null
  const lesson = activeUnit?.lessonId
    ? (lessons.find((l) => l.id === activeUnit.lessonId) ?? null)
    : null
  const beat = lesson ? lesson.beats[currentStep] : null
  const total = lesson ? lesson.beats.length : 0
  const beatSteps = beat?.steps ?? 1
  const atStart = currentStep <= 0 && stageInBeat <= 0
  const atLessonEnd =
    Boolean(lesson) &&
    currentStep >= total - 1 &&
    stageInBeat >= beatSteps - 1
  const needsGate = beat?.gate === 'interact'
  const gateLocked = Boolean(needsGate && !gateOk)
  const gateHint = gateLocked
    ? beat?.gateHint || '先完成畫面上嘅互動，先可以繼續'
    : null

  // 換拍時：有 interact gate → 鎖住；否則即開
  useEffect(() => {
    setGateOk(beat?.gate !== 'interact')
  }, [lesson?.id, currentStep, beat?.id, beat?.gate])

  const onInteractComplete = useCallback(() => {
    setGateOk(true)
  }, [])

  const nextUnit = useMemo(
    () => (lesson ? suggestNextUnit(mode, lesson.id, lessons) : null),
    [mode, lesson, lessons],
  )

  const progressPct =
    !lesson || total === 0 ? 0 : total === 1 ? 100 : (currentStep / (total - 1)) * 100

  // 開首讀取本機進度 → 「繼續上課」卡
  useEffect(() => {
    const saved = loadProgress()
    if (!saved) return
    const units = flatUnits(saved.mode)
    const unit = units.find((u) => u.id === saved.unitId)
    if (!unit?.lessonId) return
    const les = LESSONS_BY_MODE[saved.mode]?.find((l) => l.id === unit.lessonId)
    if (!les) return
    setContinueInfo({
      mode: saved.mode,
      unitId: saved.unitId,
      step: Math.min(saved.step, les.beats.length - 1),
      stage: saved.stage,
      label: `${les.title} · ${unit.title}`,
    })
  }, [])

  // 自動儲存進度
  useEffect(() => {
    if (!activeUnitId || !lesson) return
    saveProgress({
      mode,
      unitId: activeUnitId,
      step: currentStep,
      stage: stageInBeat,
    })
    setContinueInfo({
      mode,
      unitId: activeUnitId,
      step: currentStep,
      stage: stageInBeat,
      label: `${lesson.title} · ${activeUnit?.title ?? ''}`,
    })
  }, [mode, activeUnitId, currentStep, stageInBeat, lesson, activeUnit?.title])

  // Analytics：開課、翻頁、完成
  useEffect(() => {
    if (!lesson) return
    if (startedLessonRef.current !== lesson.id) {
      startedLessonRef.current = lesson.id
      track('lesson_start', { lessonId: lesson.id, unitId: activeUnitId, mode })
    }
  }, [lesson, activeUnitId, mode])

  useEffect(() => {
    if (!lesson || !beat) return
    const key = `${lesson.id}:${currentStep}:${stageInBeat}`
    if (lastPageKeyRef.current === key) return
    lastPageKeyRef.current = key
    track('page_reach', {
      lessonId: lesson.id,
      unitId: activeUnitId,
      step: currentStep,
      stage: stageInBeat,
      beatId: beat.id,
    })
  }, [lesson, beat, currentStep, stageInBeat, activeUnitId])

  useEffect(() => {
    if (!showComplete || !lesson) return
    track('lesson_finish', { lessonId: lesson.id, unitId: activeUnitId, mode })
  }, [showComplete, lesson, activeUnitId, mode])

  const changeMode = (m) => {
    setMode(m)
    setActiveUnitId(null)
    setCurrentStep(0)
    setStageInBeat(0)
    setMenuOpen(true)
    setShowComplete(false)
  }

  const selectUnit = (unit) => {
    setActiveUnitId(unit.id)
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
    setShowComplete(false)
    track('unit_select', { unitId: unit.id, lessonId: unit.lessonId ?? null, mode })
  }

  const resumeContinue = () => {
    if (!continueInfo) return
    setMode(continueInfo.mode)
    setActiveUnitId(continueInfo.unitId)
    setCurrentStep(continueInfo.step)
    setStageInBeat(continueInfo.stage)
    setMenuOpen(false)
    setShowComplete(false)
    track('lesson_resume', {
      unitId: continueInfo.unitId,
      mode: continueInfo.mode,
      step: continueInfo.step,
    })
  }

  const goNext = useCallback(() => {
    if (!lesson || showComplete) return
    const b = lesson.beats[currentStep]
    if (b?.gate === 'interact' && !gateOk) return
    const st = b?.steps ?? 1
    if (stageInBeat < st - 1) {
      setStageInBeat((s) => s + 1)
      return
    }
    if (currentStep < lesson.beats.length - 1) {
      setCurrentStep((i) => i + 1)
      setStageInBeat(0)
      return
    }
    // 最後一頁揭晒 → 完成本課
    setShowComplete(true)
  }, [lesson, currentStep, stageInBeat, showComplete, gateOk])

  const goPrev = useCallback(() => {
    if (!lesson) return
    if (showComplete) {
      setShowComplete(false)
      return
    }
    if (stageInBeat > 0) {
      setStageInBeat((s) => s - 1)
      return
    }
    if (currentStep > 0) {
      const prevSteps = lesson.beats[currentStep - 1]?.steps ?? 1
      setCurrentStep((i) => i - 1)
      setStageInBeat(prevSteps - 1)
    }
  }, [lesson, currentStep, stageInBeat, showComplete])

  const takeNextLesson = () => {
    if (!nextUnit) return
    selectUnit(nextUnit)
  }

  const backHome = () => {
    setActiveUnitId(null)
    setCurrentStep(0)
    setStageInBeat(0)
    setMenuOpen(true)
    setShowComplete(false)
    clearProgress()
    setContinueInfo(null)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (e.key === 'Escape') {
        if (activeUnitId) setMenuOpen(false)
        return
      }
      if (showComplete) return
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
  }, [goNext, goPrev, activeUnitId, showComplete])

  const touchStartY = useRef(null)
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (touchStartY.current == null || showComplete) return
    const dy = touchStartY.current - e.changedTouches[0].clientY
    touchStartY.current = null
    if (Math.abs(dy) < 60) return
    if (dy > 0) goNext()
    else goPrev()
  }

  useEffect(() => {
    if (!lesson || !beat) return
    const match = syllabus
      .flatMap((t) => t.units)
      .find((u) => u.lessonId === lesson.id && u.beatId === beat.id)
    if (match && match.id !== activeUnitId) setActiveUnitId(match.id)
  }, [beat, lesson, syllabus, activeUnitId])

  // 行到最後一頁最後一段時，自動彈「完成本課」（亦可以由 goNext 觸發）
  useEffect(() => {
    if (atLessonEnd && beat?.mode === 'summary' && stageInBeat >= beatSteps - 1) {
      /* 等用戶再點一次先 complete——由 goNext 處理，呢度唔自動跳 */
    }
  }, [atLessonEnd, beat, stageInBeat, beatSteps])

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#0a0a0c] text-white">
      {menuOpen && !pickingUnit && (
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
        open={pickingUnit || menuOpen}
        home={pickingUnit}
        continueTarget={pickingUnit ? continueInfo : null}
        onContinue={pickingUnit ? resumeContinue : null}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main
        className={`relative flex h-full w-full flex-col md:w-3/4 ${pickingUnit ? 'max-md:hidden' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-white/[0.05]">
          <div
            className="progress-shine h-full bg-[#4cc9f0] shadow-[0_0_12px_rgba(76,201,240,0.9)] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {!pickingUnit && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="開啟課程選單"
            className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-zinc-200 backdrop-blur transition-colors hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            </svg>
          </button>
        )}

        <Theater
          mode={mode}
          lesson={lesson}
          beat={beat}
          stage={stageInBeat}
          steps={beatSteps}
          index={currentStep}
          total={total}
          unitTitle={activeUnit?.title ?? null}
          pendingTitle={activeUnit && !lesson ? activeUnit.title : null}
          onInteractComplete={onInteractComplete}
          gateLocked={gateLocked}
          gateHint={gateHint}
        />
        <ControlDeck
          beat={beat}
          onNext={goNext}
          onPrev={goPrev}
          atStart={atStart}
          showComplete={showComplete}
          nextLesson={nextUnit}
          onTakeNext={takeNextLesson}
          onBackHome={backHome}
          gateLocked={gateLocked}
          gateHint={gateHint}
        />
      </main>
    </div>
  )
}
