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
export default function ControlDeck({ beat, index, total, stage = 0, steps = 1, zoom = 1, onZoom, onPrev, onNext }) {
  const atStart = index <= 0
  const atEnd = index >= total - 1 && stage >= steps - 1 // 最後一頁都要揭晒先算完
  const parsed = beat ? splitBeatTag(beat.caption) : null

  return (
    <section className="relative flex h-[42%] w-full flex-col border-t border-white/[0.08] bg-[#15151a] md:h-[30%]">
      {/* 坐喺分隔橫綫左邊：舞台縮放（字體＋圖畫一齊等比，0.7–1.4 倍） */}
      {onZoom && (
        <div className="absolute left-4 top-0 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-b from-black to-[#15151a] px-2.5 py-1 md:left-8">
          <button
            onClick={() => onZoom(-0.1)}
            disabled={zoom <= 0.7}
            aria-label="縮細舞台"
            className="h-6 w-6 rounded-full text-[11px] font-bold leading-none text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
          >
            A−
          </button>
          <span className="w-9 text-center font-mono text-[10px] text-zinc-500">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoom(0.1)}
            disabled={zoom >= 1.4}
            aria-label="放大舞台"
            className="h-6 w-6 rounded-full text-[11px] font-bold leading-none text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
          >
            A＋
          </button>
        </div>
      )}

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
