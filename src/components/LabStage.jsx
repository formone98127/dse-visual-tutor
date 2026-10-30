import { useEffect, useId, useRef } from 'react'
import { GOLD, INK, SERIF } from '../lib/palette.js'

const on = (k, stage) => (stage >= k ? 1 : 0)
const FADE = { transition: 'opacity 0.4s ease' }

/** 固定分區——唔好跟住行數變高度，否則每頁圖都會跳、顯得錯位 */
const STAGE_W = 430
const STAGE_H = 396
const TITLE_Y = 20
/** 圖形框：略下移，唔同金色標題撞位（否則 titleHit 面積好大，睇落嚴重錯位） */
const DIAG_Y = 40
const DIAG_H = 290
/** 圖框底 = 330；中文行高 ~16，baseline 要留夠空位，唔好伸入圖區 */
const LINE_Y0 = 344
const LINE_GAP = 22
const LINE_SIZE = 13.5

/**
 * 共用舞台：標題 + 圖形區 + 底部推演行。
 * 圖形框高度同場景座標系（430×290）完全一致，所以圖係 1:1 鋪滿，唔會縮細置中。
 */
export default function LabStage({ title, stage, children, lines = [], ds = 0 }) {
  const clipId = useId().replace(/:/g, '')
  const titleSize = title && title.length > 18 ? 18 : title && title.length > 14 ? 20 : 23
  const rootRef = useRef(null)

  // #region agent log
  useEffect(() => {
    const svg = rootRef.current
    if (!svg) return
    const titleEl = svg.querySelector('text.title-in')
    const diag = svg.querySelector('svg.fx-diag')
    const outerTexts = [...svg.querySelectorAll(':scope > g > text')]
    const lineBoxes = outerTexts
      .filter((t) => t !== titleEl && +getComputedStyle(t).opacity > 0.05)
      .map((t) => {
        const b = t.getBBox()
        return { text: (t.textContent || '').slice(0, 36), y: +b.y.toFixed(1), h: +b.height.toFixed(1), bottom: +(b.y + b.height).toFixed(1) }
      })
    const gaps = []
    for (let i = 0; i < lineBoxes.length - 1; i++) {
      gaps.push({ a: lineBoxes[i].text, b: lineBoxes[i + 1].text, gap: +(lineBoxes[i + 1].y - lineBoxes[i].bottom).toFixed(1) })
    }
    let clipped = []
    let diagVsLines = []
    if (diag) {
      clipped = [...diag.querySelectorAll('text')]
        .filter((t) => +getComputedStyle(t).opacity > 0.05)
        .map((t) => {
          const b = t.getBBox()
          return { text: (t.textContent || '').slice(0, 30), y: +b.y.toFixed(1), bottom: +(b.y + b.height).toFixed(1), clipped: b.y + b.height > 290 || b.y < 0 }
        })
        .filter((x) => x.clipped)
      // screen-space: diag text vs bottom lines
      const diagTexts = [...diag.querySelectorAll('text')].filter((t) => +getComputedStyle(t).opacity > 0.05)
      for (const dt of diagTexts) {
        const dr = dt.getBoundingClientRect()
        for (const lt of outerTexts) {
          if (lt === titleEl || +getComputedStyle(lt).opacity < 0.05) continue
          const lr = lt.getBoundingClientRect()
          const ox = Math.max(0, Math.min(dr.right, lr.right) - Math.max(dr.left, lr.left))
          const oy = Math.max(0, Math.min(dr.bottom, lr.bottom) - Math.max(dr.top, lr.top))
          if (ox * oy > 20) {
            diagVsLines.push({
              diag: (dt.textContent || '').slice(0, 24),
              line: (lt.textContent || '').slice(0, 24),
              area: Math.round(ox * oy),
            })
          }
        }
      }
    }
    let titleHit = null
    if (titleEl && diag) {
      const tb = titleEl.getBoundingClientRect()
      const db = diag.getBoundingClientRect()
      const oy = Math.max(0, Math.min(tb.bottom, db.bottom) - Math.max(tb.top, db.top))
      const ox = Math.max(0, Math.min(tb.right, db.right) - Math.max(tb.left, db.left))
      if (ox * oy > 10) titleHit = { area: Math.round(ox * oy) }
    }
    fetch('http://127.0.0.1:7691/ingest/cc9e9dff-d30f-40e1-a86b-8f44c754203f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'fb17f7' },
      body: JSON.stringify({
        sessionId: 'fb17f7',
        runId: 'post-fix',
        hypothesisId: 'B_C',
        location: 'LabStage.jsx:measure',
        message: 'LabStage line gaps + clipped diag text',
        data: { title, stage, lineBoxes, gaps, clipped, diagVsLines, titleHit, LINE_GAP, LINE_Y0, DIAG_H },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
  }, [title, stage, lines, ds])
  // #endregion

  return (
    <div className="idx-lab">
      <svg
        ref={rootRef}
        className="vm-svg"
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        role="img"
        aria-label={title}
        overflow="hidden"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={0} width={STAGE_W} height={STAGE_H} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <text
            x={215}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize={titleSize}
            fill={GOLD}
            fontWeight={700}
            fontFamily={SERIF}
            letterSpacing={1.2}
            className="title-in"
          >
            {title}
          </text>

          {/* 圖形框：高 290 = 場景座標系高度，1:1 唔縮細 */}
          <svg
            x={0}
            y={DIAG_Y}
            width={STAGE_W}
            height={DIAG_H}
            viewBox="0 0 430 290"
            preserveAspectRatio="xMidYMin meet"
            overflow="hidden"
            className="fx-diag"
          >
            {children}
          </svg>

          {lines.slice(0, 3).map((parts, i) => {
            const raw = parts.map((p) => p.t).join('')
            const long = raw.length > 26
            return (
              <text
                key={i}
                x={20}
                y={LINE_Y0 + i * LINE_GAP}
                opacity={on(ds + i, stage)}
                style={{ ...FADE, animationDelay: `${i * 0.09}s` }}
                className={on(ds + i, stage) ? 'caption-in' : undefined}
                fontFamily={SERIF}
                fontSize={long ? LINE_SIZE - 1 : LINE_SIZE}
                fontWeight={600}
              >
                {parts.map((p, j) => (
                  <tspan key={j} fill={p.fill || INK} fontWeight={p.b ? 700 : 600}>
                    {p.t}
                  </tspan>
                ))}
              </text>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export { on, FADE, STAGE_W, STAGE_H }
