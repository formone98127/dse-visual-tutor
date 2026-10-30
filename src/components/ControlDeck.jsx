import { useRef } from 'react'

/** 開頭階段詞 → badge 顏色 class（題目 / 已知條件 / 問咩 / 點解 / 驗證 / 到你） */
const BEAT_TAGS = [
  [/^(題目|單元)/, 'tag-q'],
  [/^(已知條件|元素)\s*(\d+)?/, 'tag-el'],
  [/^(問咩)/, 'tag-ask'],
  [/^(點解|驗證|秒殺法)/, 'tag-why'],
  [/^(到你)/, 'tag-ask'],
]

/** 「已知條件 3——切面深度：…」→ { tag, cls, rest }；「第一招：…——內容」都拆 */
function splitBeatTag(caption) {
  if (!caption) return null
  for (const [re, cls] of BEAT_TAGS) {
    const m = caption.match(re)
    if (!m) continue
    const rest = caption.slice(m[0].length).replace(/^[\s,，、:：.·—-]+/, '')
    if (!rest) return null
    return { tag: m[0].trim(), cls, rest }
  }
  const dash = caption.split(/\s*[—–]{1,2}\s*/)
  if (dash.length >= 2 && dash[0].length <= 18) {
    return { tag: dash[0].trim(), cls: 'tag-el', rest: dash.slice(1).join(' —— ') }
  }
  return null
}

/**
 * ControlDeck — 下半部：字幕；輕點 = 下一步；左下角細鍵 = 上一步。
 */
export default function ControlDeck({
  beat,
  zoom = 1,
  onZoom,
  onNext,
  onPrev,
  atStart = false,
  nextLesson = null,
  onTakeNext = null,
  onBackHome = null,
  showComplete = false,
  gateLocked = false,
  gateHint = null,
}) {
  const parsed = beat ? splitBeatTag(beat.caption) : null
  const tapStart = useRef(null)

  const onPointerDown = (e) => {
    tapStart.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e) => {
    if (!onNext || tapStart.current == null || showComplete || gateLocked) return
    const dx = e.clientX - tapStart.current.x
    const dy = e.clientY - tapStart.current.y
    tapStart.current = null
    if (Math.hypot(dx, dy) < 12) onNext()
  }

  return (
    <section
      className={`relative flex h-[32%] w-full flex-col overflow-hidden border-t border-white/[0.08] bg-[#15151a] pb-[env(safe-area-inset-bottom)] md:h-[24%] ${
        showComplete ? '' : 'cursor-pointer'
      }`}
      onPointerDown={showComplete ? undefined : onPointerDown}
      onPointerUp={showComplete ? undefined : onPointerUp}
      role={showComplete ? undefined : 'button'}
      tabIndex={showComplete ? undefined : 0}
      aria-label={showComplete ? undefined : '點一下進入下一步'}
      onKeyDown={
        showComplete || gateLocked
          ? undefined
          : (e) => {
              if (!onNext) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onNext()
              }
            }
      }
    >
      {onZoom && (
        <div
          className="absolute left-4 top-0 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-b from-black to-[#15151a] px-2.5 py-1 md:left-8"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
        >
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

      {/* 上一步：細鍵，唔搶字幕焦點 */}
      {onPrev && !showComplete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          disabled={atStart}
          aria-label="上一步"
          className="absolute bottom-4 left-3 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-bold text-zinc-300 backdrop-blur transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 md:bottom-5 md:left-6"
        >
          ← 上一步
        </button>
      )}

      {showComplete ? (
        <div className="caption-in flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400/90">完成本課</p>
          <p className="max-w-xl text-xl font-bold text-white sm:text-2xl">
            {nextLesson ? `下一課建議：${nextLesson.title}` : '你可以返去選單再揀其他單元'}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            {nextLesson && onTakeNext && (
              <button
                type="button"
                onClick={onTakeNext}
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-sm font-black text-zinc-950 shadow-md shadow-amber-500/25"
              >
                開始下一課
              </button>
            )}
            {onBackHome && (
              <button
                type="button"
                onClick={onBackHome}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-zinc-200 hover:bg-white/10"
              >
                返回選單
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-12 py-3 text-center sm:px-16 md:px-24">
          {beat ? (
            <div key={beat.id + beat.caption} className="caption-in w-full max-w-2xl overflow-hidden">
              {parsed && (
                <p className="mb-1">
                  <span className={`beat-tag ${parsed.cls}`}>{parsed.tag}</span>
                </p>
              )}
              <p className="line-clamp-2 text-sm font-bold leading-snug text-white sm:text-[15px] md:text-base">
                {parsed ? parsed.rest : beat.caption}
              </p>
            </div>
          ) : (
            <p className="text-sm font-bold text-white md:text-base">這裡會顯示老師的講解文字</p>
          )}
          {gateLocked ? (
            <p className="hint-bob mt-1.5 shrink-0 text-[10px] font-bold tracking-[0.15em] text-amber-400/90">
              {gateHint || '先完成畫面上嘅互動'}
            </p>
          ) : (
            <p className="hint-bob mt-1.5 shrink-0 text-[10px] tracking-[0.2em] text-zinc-600 md:hidden">點呢度繼續 →</p>
          )}
        </div>
      )}
    </section>
  )
}
