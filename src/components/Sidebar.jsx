import { useEffect, useState } from 'react'
import { SYLLABUS } from '../data/syllabus.js'

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
  return (
    <li>
      <button
        onClick={() => onSelect(unit)}
        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
          active
            ? 'bg-amber-500/[0.12] text-amber-300'
            : 'text-zinc-400 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
            active ? 'bg-amber-400' : 'bg-zinc-600 group-hover:bg-zinc-400'
          }`}
        />
        <span className="flex-1 truncate text-[13px] font-medium">{unit.title}</span>
        {unit.lessonId ? (
          active && (
            <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-400">
              上緊
            </span>
          )
        ) : (
          <span className="text-[10px] text-zinc-600">即將推出</span>
        )}
      </button>
    </li>
  )
}

function TopicAccordion({ topic, open, onToggle, activeUnitId, onSelectUnit }) {
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
            {[topic.strand, topic.hours ? `${topic.hours} 小時` : null, `${topic.units.length} 個單元`]
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
            {topic.units.map((unit) => (
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

export default function Sidebar({ mode, onChangeMode, activeUnitId, onSelectUnit, open }) {
  const syllabus = SYLLABUS[mode]
  const [openTopic, setOpenTopic] = useState(syllabus[0]?.id ?? null)

  // 轉 mode / 揀單元時，自動攤開「上緊課」所在嘅主題
  useEffect(() => {
    const cur = SYLLABUS[mode].find((t) => t.units.some((u) => u.id === activeUnitId))
    setOpenTopic(cur?.id ?? SYLLABUS[mode][0]?.id ?? null)
  }, [mode, activeUnitId])

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 flex-col border-r border-white/[0.08] bg-[#0e0e12] shadow-2xl transition-transform duration-300 md:static md:w-1/4 md:translate-x-0 md:shadow-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* 標題區 */}
      <header className="px-7 pb-2 pt-9">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-amber-500/80">
          DSE Visual Tutor
        </p>
        <h1 className="mt-2.5 font-serif text-3xl font-black leading-tight text-white">
          DSE 數學神技
        </h1>
        <ModeToggle mode={mode} onChange={onChangeMode} />
      </header>

      {/* 課程列表區：EDB 課程大綱手風琴 */}
      <section className="flex-1 overflow-y-auto px-7 py-6">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-600">課程列表區</p>
        {/* key={mode} 令切換時成組選單淡入，平滑過場 */}
        <div key={mode} className="syllabus-in flex flex-col gap-3">
          {syllabus.map((topic) => (
            <TopicAccordion
              key={topic.id}
              topic={topic}
              open={openTopic === topic.id}
              onToggle={() => setOpenTopic((cur) => (cur === topic.id ? null : topic.id))}
              activeUnitId={activeUnitId}
              onSelectUnit={onSelectUnit}
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
