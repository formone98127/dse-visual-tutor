function pad(n) {
  return String(n).padStart(2, '0')
}

/** 開頭階段詞 → badge 顏色 class（題目 / 已知條件 / 問咩 / 點解 / 驗證 / 到你） */
const BEAT_TAGS = [
  [/^(題目|單元)/, 'tag-q'],
  [/^(已知條件|元素)\s*(\d+)?/, 'tag-el'],
  [/^(問咩)/, 'tag-ask'],
  [/^(點解|驗證|秒殺法)/, 'tag-why'],
  [/^(到你)/, 'tag-ask'],
]

/** 「已知條件 3——切面深度：…」→ { tag: '已知條件 3', cls, rest: '切面深度：…' }；冇階段詞就 null */
function splitBeatTag(caption) {
  for (const [re, cls] of BEAT_TAGS) {
    const m = caption.match(re)
    if (!m) continue
    const rest = caption.slice(m[0].length).replace(/^[\s,，、:：.·—-]+/, '')
    if (!rest) return null
    return { tag: m[0].trim(), cls, rest }
  }
  return null
}

/**
 * ControlDeck — 下半部 30%：字幕 + Prev/Next 控制台。
 */
export default function ControlDeck({ beat, index, total, stage = 0, steps = 1, onPrev, onNext }) {
  const atStart = index <= 0
  const atEnd = index >= total - 1 && stage >= steps - 1 // 最後一頁都要揭晒先算完
  const parsed = beat ? splitBeatTag(beat.caption) : null

  return (
    <section className="relative flex h-[30%] w-full flex-col border-t border-white/[0.08] bg-[#15151a]">
      {/* 右上角：頁內推演圓點 + 步數（冇課程時唔顯示） */}
      <div className="absolute right-4 top-4 flex items-center gap-3 md:right-8 md:top-5">
        {total > 0 && (
          <>
            <span className="hidden text-[10px] tracking-[0.15em] text-zinc-600 md:inline">
              快速鍵 ↑↓
            </span>
            {steps > 1 && (
              <span className="flex items-center gap-1">
                {Array.from({ length: steps }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      i <= stage ? 'bg-amber-400' : 'bg-white/15'
                    }`}
                  />
                ))}
              </span>
            )}
            <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-500">
              {pad(index + 1)} / {pad(total)}
            </span>
          </>
        )}
      </div>

      {/* 字幕區 */}
      <div className="flex flex-1 items-center justify-center px-6 text-center md:px-16">
        {beat ? (
          <div className="max-w-4xl">
            {parsed && (
              <p className="mb-3">
                <span className={`beat-tag ${parsed.cls}`}>{parsed.tag}</span>
              </p>
            )}
            <p className="text-xl font-bold leading-relaxed text-white sm:text-2xl md:text-3xl">
              {parsed ? parsed.rest : beat.caption}
            </p>
          </div>
        ) : (
          <p className="text-xl font-bold text-white sm:text-2xl md:text-3xl">這裡會顯示老師的講解文字</p>
        )}
      </div>

      {/* 控制按鈕 */}
      <div className="flex items-center justify-center gap-3 pb-6 md:gap-4 md:pb-7">
        <button
          onClick={onPrev}
          disabled={atStart}
          className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base font-bold text-zinc-200 transition-colors duration-300 hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/5 md:px-10"
        >
          上一步 (Prev)
        </button>
        <button
          onClick={onNext}
          disabled={atEnd}
          className={`rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-9 py-3.5 text-base font-black text-zinc-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl hover:shadow-amber-400/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:from-amber-400 disabled:hover:to-amber-500 md:px-12 ${
            !atEnd ? 'animate-pulse' : ''
          }`}
        >
          下一步 (Next)
        </button>
      </div>
    </section>
  )
}
