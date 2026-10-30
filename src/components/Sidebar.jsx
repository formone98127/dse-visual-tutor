import { useEffect, useMemo, useRef, useState } from 'react'
import { SYLLABUS } from '../data/syllabus.js'
import { countReady } from '../lib/syllabusUtils.js'

const MODE_OPTIONS = [
  { key: 'PRE_DSE', label: 'PRE-DSE', suffix: '初中' },
  { key: 'DSE', label: 'DSE', suffix: '高中' },
]

function ModeToggle({ mode, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="課程模式切換"
      className="mt-7 flex rounded-full border border-white/10 bg-white/[0.04] p-1"
    >
      {MODE_OPTIONS.map((opt) => {
        const active = mode === opt.key
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={`flex-1 whitespace-nowrap rounded-full px-1.5 py-2.5 text-[13px] font-bold transition-all duration-300 md:px-2 md:text-sm ${
              active
                ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {opt.label}
            <span
              className={`ml-1.5 text-xs font-medium ${
                active ? 'text-zinc-800' : 'text-zinc-500'
              }`}
            >
              ({opt.suffix})
            </span>
          </button>
        )
      })}
    </div>
  )
}

function UnitRow({ unit, active, onSelect }) {
  const ready = Boolean(unit.lessonId)
  return (
    <li>
      <button
        onClick={() => onSelect(unit)}
        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
          active
            ? 'bg-amber-500/[0.12] text-amber-300'
            : ready
              ? 'text-zinc-300 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white'
              : 'text-zinc-500 hover:bg-white/[0.04]'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
            active ? 'bg-amber-400' : ready ? 'bg-emerald-400/80' : 'bg-zinc-700'
          }`}
        />
        <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug">{unit.title}</span>
        {ready ? (
          active ? (
            <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-400">
              上緊
            </span>
          ) : (
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400/90">
              可上課
            </span>
          )
        ) : (
          <span className="text-[10px] text-zinc-600">即將推出</span>
        )}
      </button>
    </li>
  )
}

function TopicAccordion({ topic, open, onToggle, activeUnitId, onSelectUnit, readyOnly }) {
  const units = readyOnly ? topic.units.filter((u) => u.lessonId) : topic.units
  if (readyOnly && units.length === 0) return null
  const readyCount = topic.units.filter((u) => u.lessonId).length

  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        open
          ? 'border-amber-500/30 bg-white/[0.04]'
          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {topic.icon ? (
          <span className="text-xl leading-none">{topic.icon}</span>
        ) : (
          <span
            className={`flex h-7 w-9 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold tracking-wide transition-colors ${
              open ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' : 'border-white/10 bg-white/[0.04] text-zinc-400'
            }`}
          >
            {topic.code}
          </span>
        )}
        <span className="flex-1">
          <span className={`block text-sm font-bold ${open ? 'text-white' : 'text-zinc-200'}`}>
            {topic.title}
          </span>
          <span className="mt-0.5 block text-[11px] text-zinc-500">
            {[
              topic.strand,
              readyCount > 0 ? `${readyCount}/${topic.units.length} 可上課` : `${topic.units.length} 個單元 · 即將推出`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </span>
        <svg
          viewBox="0 0 16 16"
          className={`chev h-4 w-4 shrink-0 text-zinc-500 ${open ? 'open text-amber-400' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6 L8 10 L12 6" />
        </svg>
      </button>

      <div className={`acc-body ${open ? 'open' : ''}`}>
        <div>
          <ul className="space-y-1 px-3 pb-3">
            {units.map((unit) => (
              <UnitRow
                key={unit.id}
                unit={unit}
                active={unit.id === activeUnitId}
                onSelect={onSelectUnit}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({
  mode,
  onChangeMode,
  activeUnitId,
  onSelectUnit,
  open,
  home = false,
  continueTarget = null,
  onContinue = null,
  onCloseMenu = null,
}) {
  const syllabus = SYLLABUS[mode]
  const stats = useMemo(() => countReady(mode), [mode])
  const [readyOnly, setReadyOnly] = useState(true)
  const [openTopic, setOpenTopic] = useState(syllabus[0]?.id ?? null)
  const swipeStart = useRef(null)

  // 轉 mode / 揀單元時，自動攤開「上緊課」所在嘅主題；篩選可上課時攤開第一個有課嘅
  useEffect(() => {
    const cur = SYLLABUS[mode].find((t) => t.units.some((u) => u.id === activeUnitId))
    if (cur) {
      setOpenTopic(cur.id)
      return
    }
    const firstReady = SYLLABUS[mode].find((t) => t.units.some((u) => u.lessonId))
    setOpenTopic(firstReady?.id ?? SYLLABUS[mode][0]?.id ?? null)
  }, [mode, activeUnitId])

  // 手機：向左滑收起側欄，返去 Theater（首頁未揀課唔收）
  const onTouchStart = (e) => {
    const t = e.touches[0]
    swipeStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!swipeStart.current || home || !onCloseMenu) {
      swipeStart.current = null
      return
    }
    const t = e.changedTouches[0]
    const dx = t.clientX - swipeStart.current.x
    const dy = t.clientY - swipeStart.current.y
    swipeStart.current = null
    // 明顯向左、而且橫多過直 → 收起側欄
    if (dx < -60 && Math.abs(dx) > Math.abs(dy) * 1.2) onCloseMenu()
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r border-white/[0.08] bg-[#0e0e12] shadow-2xl transition-transform duration-300 md:static md:w-1/4 md:translate-x-0 md:shadow-none ${
        home ? 'w-full max-md:border-r-0' : 'w-72'
      } ${open ? 'translate-x-0' : '-translate-x-full'}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header className="px-7 pb-2 pt-9">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-amber-500/80">
          DSE Visual Tutor
        </p>
        <h1 className="mt-2.5 font-serif text-3xl font-black leading-tight text-white">
          DSE 數學神技
        </h1>
        {home && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            請先揀一個單元開始上課
          </p>
        )}
        <ModeToggle mode={mode} onChange={onChangeMode} />

        {continueTarget && onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="mt-4 w-full rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/20 to-amber-500/10 px-4 py-3 text-left transition-colors hover:border-amber-400/50 hover:from-amber-400/30"
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/90">
              繼續上課
            </span>
            <span className="mt-1 block truncate text-sm font-semibold text-white">
              {continueTarget.label}
            </span>
          </button>
        )}
      </header>

      <section className="flex-1 overflow-y-auto px-7 py-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            {home ? '選擇單元' : '課程列表區'}
          </p>
          <span className="font-mono text-[10px] text-zinc-500">
            {stats.ready}/{stats.total} · {stats.pct}%
          </span>
        </div>

        <div className="mb-4 flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => setReadyOnly(true)}
            className={`flex-1 rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors ${
              readyOnly ? 'bg-emerald-400/20 text-emerald-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            可上課
          </button>
          <button
            type="button"
            onClick={() => setReadyOnly(false)}
            className={`flex-1 rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors ${
              !readyOnly ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            全部大綱
          </button>
        </div>

        <div key={`${mode}-${readyOnly}`} className="syllabus-in flex flex-col gap-3">
          {syllabus.map((topic) => (
            <TopicAccordion
              key={topic.id}
              topic={topic}
              open={openTopic === topic.id}
              onToggle={() => setOpenTopic((cur) => (cur === topic.id ? null : topic.id))}
              activeUnitId={activeUnitId}
              onSelectUnit={onSelectUnit}
              readyOnly={readyOnly}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-7 py-4">
        <p className="text-[11px] text-zinc-600">DSE網上課程 · MVP v0.1</p>
      </footer>
    </aside>
  )
}
