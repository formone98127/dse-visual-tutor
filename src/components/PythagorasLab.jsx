import { useEffect, useRef } from 'react'
import { clamp01, useFly } from '../lib/labMotion.js'

/**
 * 畢氏定理 · 視覺證明 lab — 場景（lessonScript.action 驅動）：
 *   show_triangle   直角三角形，睇住 a, b, c
 *   draw_squares    a² (藍) 同 b² (黃) 正方形，c² 虛線預告
 *   build_square    起 (a+b)² 大正方形，標明邊長拆法
 *   arrange_pieces  藍 a² + 黃 b² + 4 塊三角形（兩個 a×b 長方形剪開）排滿大正方形
 *   shift_pieces    4 塊三角形移去四隻角，藍黃讓出中間
 *   reveal_c2       中間剩低傾斜 c²，強調條邊就係斜邊 c
 *   conclude        c² 藍黃漸變填充 + a² + b² = c²
 *
 * 幾何（3-4-5，u=30px）：a=90, b=120, c=150, (a+b)²=210。
 */

const GOLD = '#ffd166'
const BLUE = '#4cc9f0'
const INK = '#f2f5ff'
const MUTED = 'rgba(242, 245, 255, 0.55)'
const LINE = 'rgba(242, 245, 255, 0.72)'
const SERIF = "'Fraunces', Georgia, serif"

/* ---- stage 1/2：直角三角形（直角喺 (150,200)） ---- */
const TRI = [
  [150, 200], // 直角頂點
  [270, 200], // b 邊盡頭
  [150, 110], // a 邊盡頭
]

/* ---- stage 3+：(a+b)² 大正方形 (110,60)-(320,270) ----
   排列 A：藍 a² (230,180,90,90)、黃 b² (110,60,120,120)、兩個 a×b 長方形沿對角線剪開嘅 4 塊
   排列 B：4 塊移去四角，中間剩低傾斜 c² (200,60),(320,150),(230,270),(110,180) */
const PIECES = [
  {
    tint: BLUE,
    A: [[230, 270], [110, 270], [230, 180]],
    B: [[110, 270], [230, 270], [110, 180]],
  },
  {
    tint: GOLD,
    A: [[110, 270], [110, 180], [230, 180]],
    B: [[200, 60], [110, 60], [110, 180]],
  },
  {
    tint: GOLD,
    A: [[230, 180], [320, 180], [320, 60]],
    B: [[320, 270], [320, 150], [230, 270]],
  },
  {
    tint: BLUE,
    A: [[230, 60], [230, 180], [320, 60]],
    B: [[320, 60], [200, 60], [320, 150]],
  },
]
const C2 = [[200, 60], [320, 150], [230, 270], [110, 180]]

const lerpPt = (p1, p2, t) => [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]
const ptsStr = (pts) => pts.map((p) => p.join(',')).join(' ')

/** 圖底說明帶——同邊長標註分區，避免撞字 */
const CAPTION_Y = 348

/** (a+b)² 大正方形 + 邊長 a、b 分割標註 */
function BigSquare({ u, showEdgeLabels = true }) {
  return (
    <g opacity={clamp01(u / 0.35)}>
      <rect x={110} y={60} width={210} height={210} fill="rgba(255,255,255,0.03)" stroke={LINE} strokeWidth={1.8} rx={6} />
      {showEdgeLabels ? (
        <g opacity={clamp01((u - 0.3) / 0.4)} fontFamily={SERIF} fontStyle="italic" fontWeight={600} fontSize={17}>
          {/* 底邊：左段 b (120px)，右段 a (90px)——貼近邊，留空俾 CAPTION_Y */}
          <line x1={230} y1={270} x2={230} y2={278} stroke={MUTED} strokeWidth={1.4} />
          <text x={170} y={288} textAnchor="middle" fill={INK}>b</text>
          <text x={275} y={288} textAnchor="middle" fill={INK}>a</text>
          {/* 左邊：上段 b (120px)，下段 a (90px) */}
          <line x1={101} y1={180} x2={110} y2={180} stroke={MUTED} strokeWidth={1.4} />
          <text x={92} y={125} textAnchor="end" fill={INK}>b</text>
          <text x={92} y={232} textAnchor="end" fill={INK}>a</text>
        </g>
      ) : null}
    </g>
  )
}

/** 藍 a² / 黃 b²（排列 A 位置） */
function ZoneSquares({ op }) {
  return (
    <g opacity={op}>
      <rect x={230} y={180} width={90} height={90} fill={BLUE} fillOpacity={0.3} stroke={BLUE} strokeWidth={1.8} rx={4} />
      <text x={275} y={225} textAnchor="middle" fontSize={20} fill={BLUE} fontFamily={SERIF} fontWeight={700} dominantBaseline="central">a²</text>
      <rect x={110} y={60} width={120} height={120} fill={GOLD} fillOpacity={0.3} stroke={GOLD} strokeWidth={1.8} rx={4} />
      <text x={170} y={120} textAnchor="middle" fontSize={20} fill={GOLD} fontFamily={SERIF} fontWeight={700} dominantBaseline="central">b²</text>
    </g>
  )
}

function Triangle({ u, opacity = 1 }) {
  return (
    <g opacity={opacity}>
      <polygon points={ptsStr(TRI)} fill="rgba(255,255,255,0.06)" stroke={LINE} strokeWidth={2} strokeLinejoin="round" opacity={clamp01(u / 0.4)} />
      <path d="M 150 188 L 162 188 L 162 200" fill="none" stroke={GOLD} strokeWidth={1.4} opacity={clamp01((u - 0.3) / 0.3)} />
      <g opacity={clamp01((u - 0.4) / 0.35)} fontFamily={SERIF} fontStyle="italic" fontWeight={600}>
        <text x={136} y={160} textAnchor="end" fontSize={19} fill={INK}>a</text>
        <text x={210} y={218} textAnchor="middle" fontSize={19} fill={INK}>b</text>
        <text x={224} y={142} textAnchor="middle" fontSize={19} fill={GOLD}>c</text>
      </g>
    </g>
  )
}

const DUR = {
  build_square: 1600,
  arrange_pieces: 2200,
  shift_pieces: 2400,
  reveal_c2: 1700,
  conclude: 1600,
}

export default function PythagorasLab({ mode }) {
  const u = useFly(mode, DUR[mode] ?? 1400)
  const svgRef = useRef(null)

  // #region agent log
  useEffect(() => {
    const t = setTimeout(() => {
      const svg = svgRef.current
      if (!svg) return
      const texts = [...svg.querySelectorAll('text')]
        .filter((el) => +getComputedStyle(el).opacity > 0.05)
        .map((el) => {
          const b = el.getBBox()
          return { text: (el.textContent || '').trim().slice(0, 40), x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }
        })
      const textText = []
      for (let i = 0; i < texts.length; i++) {
        for (let j = i + 1; j < texts.length; j++) {
          const a = texts[i]
          const b = texts[j]
          const ox = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
          const oy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
          if (ox * oy > 20) textText.push({ a: a.text, b: b.text, area: Math.round(ox * oy) })
        }
      }
      const bottom = texts.filter((t) => t.y > 260).sort((a, b) => a.y - b.y)
      const crowding = []
      for (let i = 0; i < bottom.length - 1; i++) {
        const gap = bottom[i + 1].y - (bottom[i].y + bottom[i].h)
        if (gap < 8) crowding.push({ a: bottom[i].text, b: bottom[i + 1].text, gap: +gap.toFixed(1) })
      }
      fetch('http://127.0.0.1:7691/ingest/cc9e9dff-d30f-40e1-a86b-8f44c754203f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'fb17f7' },
        body: JSON.stringify({
          sessionId: 'fb17f7',
          runId: 'post-fix',
          hypothesisId: 'A_E',
          location: 'PythagorasLab.jsx:measure',
          message: 'Pythagoras text overlap / bottom crowding',
          data: { mode, u: +u.toFixed(2), textText, crowding, bottom, textCount: texts.length },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
    }, 500)
    return () => clearTimeout(t)
  }, [mode, u])
  // #endregion

  /* ---- 1 · 直角三角形 ---- */
  if (mode === 'show_triangle') {
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="直角三角形，邊長 a、b、c">
          <Triangle u={u} />
          <text x={215} y={CAPTION_Y} textAnchor="middle" fontSize={14} fill={MUTED} fontFamily={SERIF} opacity={clamp01((u - 0.6) / 0.3)}>
            直角三角形：a、b 係兩條直角邊，c 係斜邊
          </text>
        </svg>
      </div>
    )
  }

  /* ---- 2 · a² 藍 + b² 黃 ---- */
  if (mode === 'draw_squares') {
    const blueU = clamp01(u / 0.4)
    const yellowU = clamp01((u - 0.35) / 0.4)
    const cU = clamp01((u - 0.75) / 0.25)
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="喺 a 邊畫藍色 a²，b 邊畫黃色 b²，斜邊 c² 虛線預告">
          <g opacity={blueU}>
            <rect x={95} y={115} width={75} height={75} fill={BLUE} fillOpacity={0.3} stroke={BLUE} strokeWidth={2} rx={4} />
            <text x={132} y={152} textAnchor="middle" fontSize={20} fill={BLUE} fontFamily={SERIF} fontWeight={700} dominantBaseline="central">
              a²
            </text>
          </g>
          <g opacity={yellowU}>
            <rect x={170} y={190} width={100} height={100} fill={GOLD} fillOpacity={0.3} stroke={GOLD} strokeWidth={2} rx={4} />
            <text x={220} y={240} textAnchor="middle" fontSize={20} fill={GOLD} fontFamily={SERIF} fontWeight={700} dominantBaseline="central">
              b²
            </text>
          </g>
          {/* 三角形（縮放版 3:4:5，直角喺 (170,190)） */}
          <g opacity={clamp01(u / 0.4)}>
            <polygon points="170,115 270,190 170,190" fill="rgba(255,255,255,0.09)" stroke={LINE} strokeWidth={2.2} strokeLinejoin="round" />
            <path d="M 170 180 L 180 180 L 180 190" fill="none" stroke={GOLD} strokeWidth={1.4} opacity={clamp01((u - 0.25) / 0.3)} />
          </g>
          <g opacity={clamp01((u - 0.4) / 0.35)} fontFamily={SERIF} fontStyle="italic" fontWeight={600} fontSize={17}>
            <text x={184} y={158} fill={INK}>a</text>
            <text x={216} y={185} fill={INK}>b</text>
            <text x={232} y={136} fill={GOLD}>c</text>
          </g>
          <g opacity={cU}>
            <polygon points={ptsStr([[170, 115], [270, 190], [345, 90], [245, 15]])} fill="none" stroke={GOLD} strokeWidth={1.6} strokeDasharray="6 5" />
            <text x={257} y={105} textAnchor="middle" fontSize={15} fill={GOLD} fontFamily={SERIF} fontStyle="italic" fontWeight={600}>
              c² = ?
            </text>
          </g>
        </svg>
      </div>
    )
  }

  /* ---- 3 · 起 (a+b)² 大正方形 ---- */
  if (mode === 'build_square') {
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="大正方形，邊長 = a + b">
          <BigSquare u={u} />
          <text x={215} y={CAPTION_Y} textAnchor="middle" fontSize={15} fill={GOLD} fontFamily={SERIF} fontWeight={600} opacity={clamp01((u - 0.6) / 0.3)}>
            邊長 = a + b
          </text>
        </svg>
      </div>
    )
  }

  /* ---- 4 · 藍 + 黃 + 4 塊排滿 ---- */
  if (mode === 'arrange_pieces') {
    const pieceU = clamp01((u - 0.45) / 0.3)
    const pulseU = clamp01((u - 0.82) / 0.18)
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="藍 a²、黃 b² 同 4 塊三角形啱啱好填滿大正方形">
          <BigSquare u={clamp01(u / 0.15)} />
          <ZoneSquares op={clamp01((u - 0.15) / 0.3)} />
          {PIECES.map((p, i) => (
            <polygon
              key={i}
              points={ptsStr(p.A)}
              fill={p.tint}
              fillOpacity={0.3}
              stroke={p.tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              opacity={pieceU}
            />
          ))}
          <g className="idx-pulse" opacity={pulseU}>
            <text x={215} y={CAPTION_Y} textAnchor="middle" fontSize={15} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
              啱啱好填滿，一忽忽都唔多唔少！
            </text>
          </g>
        </svg>
      </div>
    )
  }

  /* ---- 5 · 4 塊移去四角 ---- */
  if (mode === 'shift_pieces') {
    const zoneOp = u < 0.7 ? 1 : 1 - ((u - 0.7) / 0.3) * 0.85
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="4 塊三角形移去四隻角，藍黃讓出中間">
          <BigSquare u={clamp01(u / 0.15)} />
          <ZoneSquares op={zoneOp} />
          {PIECES.map((p, i) => (
            <polygon
              key={i}
              points={ptsStr(p.A.map((v, k) => lerpPt(v, p.B[k], u)))}
              fill={p.tint}
              fillOpacity={0.22 + 0.1 * u}
              stroke={p.tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              opacity={clamp01(u / 0.15)}
            />
          ))}
        </svg>
      </div>
    )
  }

  /* ---- 6 · 中間剩低傾斜 c² ---- */
  if (mode === 'reveal_c2') {
    const inU = clamp01(u / 0.3)
    const c2U = clamp01((u - 0.3) / 0.3)
    const edgeU = clamp01((u - 0.55) / 0.25)
    const txtU = clamp01((u - 0.75) / 0.25)
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="中間剩低傾斜正方形，條邊係斜邊 c，面積 c²">
          <BigSquare u={clamp01(u / 0.15)} />
          {PIECES.map((p, i) => (
            <polygon
              key={i}
              points={ptsStr(p.B)}
              fill={p.tint}
              fillOpacity={0.28}
              stroke={p.tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              opacity={inU}
            />
          ))}
          <g opacity={c2U}>
            <polygon points={ptsStr(C2)} fill="rgba(255,209,102,0.08)" stroke={GOLD} strokeWidth={2.4} strokeLinejoin="round" />
          </g>
          {/* 強調：呢條邊就係斜邊 c */}
          <g opacity={edgeU}>
            <line x1={200} y1={60} x2={320} y2={150} stroke={GOLD} strokeWidth={4} strokeLinecap="round" />
            <text x={283} y={97} textAnchor="middle" fontSize={20} fill={GOLD} fontFamily={SERIF} fontStyle="italic" fontWeight={700}>
              c
            </text>
          </g>
          <text x={215} y={CAPTION_Y} textAnchor="middle" fontSize={15} fill={INK} fontFamily={SERIF} fontWeight={600} opacity={txtU}>
            剩低嘅面積 = 邊長 c 嘅正方形 = c²
          </text>
        </svg>
      </div>
    )
  }

  /* ---- 7 · 結論：a² + b² = c² ---- */
  if (mode === 'conclude') {
    const c2U = clamp01(u / 0.45)
    const eqU = clamp01((u - 0.5) / 0.4)
    return (
      <div className="idx-lab">
        <svg ref={svgRef} className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="c² 藍黃漸變填滿，a² + b² = c²">
          <defs>
            <linearGradient id="c2fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity="0.55" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <BigSquare u={clamp01(u / 0.15)} showEdgeLabels={false} />
          {PIECES.map((p, i) => (
            <polygon
              key={i}
              points={ptsStr(p.B)}
              fill={p.tint}
              fillOpacity={0.28}
              stroke={p.tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              opacity={clamp01(u / 0.15)}
            />
          ))}
          <g opacity={c2U}>
            <polygon points={ptsStr(C2)} fill="url(#c2fill)" stroke={GOLD} strokeWidth={2.2} strokeLinejoin="round" />
            <text x={215} y={165} textAnchor="middle" fontSize={30} fill={INK} fontFamily={SERIF} fontWeight={700} dominantBaseline="central">
              c²
            </text>
          </g>
          <g className="idx-pulse" opacity={eqU}>
            <text x={215} y={CAPTION_Y} textAnchor="middle" fontSize={24} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
              a² + b² = c²
            </text>
          </g>
        </svg>
      </div>
    )
  }

  return null
}
