import { useEffect, useState } from 'react'
import { beep, clamp01, useFly } from '../lib/labMotion.js'
import { Q18_TEXT as t } from '../data/lessons.js'

/**
 * 2012 DSE P1 Q18 角錐 lab — 由 visual-calculus-web PyramidLab.tsx 移植。
 * mode 旗驅動：每個 beat 一個畫面，one slide one message。
 * gate mode：四個選項 chip，答啱 call onInteractComplete() 解鎖 Next。
 */

const GOLD = '#ffd166'
const BLUE = '#4cc9f0'
const RED = '#ff6b7a'
const OK = '#b8f27c'
const INK = '#f2f5ff'
const MUTED = 'rgba(242, 245, 255, 0.55)'
const LINE = 'rgba(242, 245, 255, 0.72)'

function Tex({ x, y, size = 26, parts, anchor = 'middle', opacity = 1 }) {
  let wasSup = false
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      opacity={opacity}
      fontFamily="'Fraunces', Georgia, serif"
      fontSize={size}
      fontWeight={600}
      fill={INK}
    >
      {parts.map((p, i) => {
        const dy = p.sup ? -size * 0.45 : wasSup ? size * 0.45 : 0
        wasSup = !!p.sup
        return (
          <tspan
            key={i}
            dy={dy}
            fontSize={p.sup ? size * 0.62 : size}
            fill={p.fill ?? INK}
            fontStyle={p.it ? 'italic' : 'normal'}
          >
            {p.t}
          </tspan>
        )
      })}
    </text>
  )
}

function Card({ x, y, w = 96, h = 58, op = 1 }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={12}
      fill="rgba(255, 255, 255, 0.05)"
      stroke={LINE}
      strokeWidth={1.6}
      opacity={op}
    />
  )
}

/* ---- 角錐本體，全課共用 ----
   真 3D → 畫面：正方底 ABCD（20 cm）透視圖，V 喺中心 O 正上方，隱藏邊虛線。 */
const PV = { x: 210, y: 55 }
const PA = { x: 75, y: 235 }
const PB = { x: 265, y: 245 }
const PC = { x: 345, y: 185 }
const PD = { x: 155, y: 175 }
const PO = { x: 210, y: 210 }
const PP = { x: 172, y: 105 }
const PQ = { x: 172, y: 89 }
const PH = { x: 172, y: 217 }
const PHP = { x: 294, y: 223 }

function Lbl({ x, y, t: label, fill = MUTED, anchor = 'middle', size = 13 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontStyle="italic" fontFamily="'Fraunces', Georgia, serif">
      {label}
    </text>
  )
}

/** 直立角錐，可加圖層：O/VO · 切點 P,Q · α 作圖 */
function PyramidFig({ u, showO, showCut, showCon }) {
  const base = clamp01(u / 0.35)
  const ou = clamp01((u - 0.35) / 0.3)
  const cu = clamp01((u - 0.3) / 0.3)
  const conu = clamp01((u - 0.55) / 0.3)
  return (
    <g>
      <g opacity={base}>
        {/* 隱藏邊 */}
        <line x1={PD.x} y1={PD.y} x2={PC.x} y2={PC.y} stroke={MUTED} strokeWidth={1.3} strokeDasharray="4 4" />
        <line x1={PD.x} y1={PD.y} x2={PA.x} y2={PA.y} stroke={MUTED} strokeWidth={1.3} strokeDasharray="4 4" />
        <line x1={PV.x} y1={PV.y} x2={PD.x} y2={PD.y} stroke={MUTED} strokeWidth={1.3} strokeDasharray="4 4" />
        {/* 可見邊 */}
        <line x1={PA.x} y1={PA.y} x2={PB.x} y2={PB.y} stroke={LINE} strokeWidth={1.6} />
        <line x1={PB.x} y1={PB.y} x2={PC.x} y2={PC.y} stroke={LINE} strokeWidth={1.6} />
        <line x1={PV.x} y1={PV.y} x2={PA.x} y2={PA.y} stroke={LINE} strokeWidth={1.6} />
        <line x1={PV.x} y1={PV.y} x2={PB.x} y2={PB.y} stroke={LINE} strokeWidth={1.6} />
        <line x1={PV.x} y1={PV.y} x2={PC.x} y2={PC.y} stroke={LINE} strokeWidth={1.6} />
        <text x={170} y={266} textAnchor="middle" fontSize={12} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
          20 cm
        </text>
        <Lbl x={210} y={45} t="V" fill={INK} />
        <Lbl x={66} y={242} t="A" fill={INK} />
        <Lbl x={274} y={254} t="B" fill={INK} />
        <Lbl x={352} y={188} t="C" fill={INK} />
        <Lbl x={146} y={170} t="D" fill={INK} />
      </g>
      {showO && (
        <g opacity={ou}>
          <line x1={PV.x} y1={PV.y} x2={PO.x} y2={PO.y} stroke={GOLD} strokeWidth={1.4} strokeDasharray="5 4" />
          <circle cx={PO.x} cy={PO.y} r={3.5} fill={GOLD} />
          {/* 直角符號：VO ⊥ 底面（向 F，即 AB 中點） */}
          <path d="M 210 201 L 202.8 206.4 L 202.8 215.4" fill="none" stroke={GOLD} strokeWidth={1.2} />
          <Lbl x={221} y={222} t="O" fill={GOLD} size={12} />
        </g>
      )}
      {showCut && (
        <g opacity={cu}>
          <line x1={PP.x} y1={PP.y} x2={PB.x} y2={PB.y} stroke={MUTED} strokeWidth={1.2} />
          <line x1={PQ.x} y1={PQ.y} x2={PC.x} y2={PC.y} stroke={MUTED} strokeWidth={1.2} />
          <line x1={PP.x} y1={PP.y} x2={PQ.x} y2={PQ.y} stroke={GOLD} strokeWidth={1.6} />
          <circle cx={PP.x} cy={PP.y} r={3.5} fill={GOLD} />
          <circle cx={PQ.x} cy={PQ.y} r={3.5} fill={GOLD} />
          <Lbl x={161} y={109} t="P" fill={INK} anchor="end" />
          <Lbl x={161} y={87} t="Q" fill={INK} anchor="end" />
        </g>
      )}
      {showCon && (
        <g opacity={conu}>
          <line x1={PP.x} y1={PP.y} x2={PH.x} y2={PH.y} stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 4" />
          <line x1={PH.x} y1={PH.y} x2={PHP.x} y2={PHP.y} stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 4" />
          <line x1={PHP.x} y1={PHP.y} x2={PP.x} y2={PP.y} stroke={GOLD} strokeWidth={2} />
          <circle cx={PH.x} cy={PH.y} r={3.5} fill={BLUE} />
          <circle cx={PHP.x} cy={PHP.y} r={3.5} fill={BLUE} />
          <Lbl x={161} y={226} t="H" fill={BLUE} anchor="end" size={12} />
          <Lbl x={302} y={235} t="H′" fill={BLUE} anchor="start" size={12} />
          {/* 直角：PH ⊥ 底面於 H · HH′ ⊥ BC 於 H′ */}
          <path d="M 172 209 L 180 209.4 L 180 217.4" fill="none" stroke={BLUE} strokeWidth={1.1} />
          <path d="M 286 222.6 L 279.6 227.4 L 287.6 227.8" fill="none" stroke={BLUE} strokeWidth={1.1} />
          {/* α = ∠PH′H */}
          <path d="M 270 222 A 24 24 0 0 1 276.7 206.3" fill="none" stroke={GOLD} strokeWidth={1.6} />
          <Lbl x={258} y={208} t="α" fill={GOLD} size={14} />
        </g>
      )}
    </g>
  )
}

/* ---- 題目問咩 ---- */
const ASK_A = [
  { t: '(a)   ', fill: MUTED },
  { t: 'AP', it: true, fill: GOLD },
  { t: ' = ?', fill: GOLD },
]
const ASK_B = [
  { t: '(b)   ', fill: MUTED },
  { t: 'α', it: true, fill: GOLD },
  { t: '  vs  ', fill: GOLD },
  { t: 'β', it: true, fill: GOLD },
  { t: ' = ?', fill: GOLD },
]

/* ---- 面三角形 VAB（2D 按比例：∠A = 72°） ---- */
const COS_LAW = [{ t: 'cos 72° = AF / VA' }]
const VA_RESULT = [
  { t: 'VA = ' },
  { t: '10 / cos 72°', fill: BLUE },
  { t: ' ≈ ' },
  { t: '32.36', fill: GOLD },
]

/* ---- 三角形 ABP ---- */
const TRI_GIVEN = [{ t: '∠PAB = 72°   ·   ∠PBA = 60°' }]
const TRI_SUM = [
  { t: '∠APB = 180° − 72° − 60° = ' },
  { t: '48°', fill: GOLD },
]

/* ---- (a) 正弦定律 ---- */
const SINE_LAW = [{ t: 'AP / sin 60° = 20 / sin 48°' }]

/* ---- (b)(i) 起 α ---- */
const ALPHA_DEF = [
  { t: 'α', it: true, fill: GOLD },
  { t: ' = ∠ ', fill: GOLD },
  { t: 'P', it: true, fill: GOLD },
  { t: 'H′', it: true, fill: GOLD },
  { t: 'H', it: true, fill: GOLD },
]

/* ---- VO ---- */
const VO_LAW = [{ t: 'VO² + OF² = VF²' }]
const VO_SRC = [{ t: 'VF = VA sin 72° = 30.78' }]
const VO_RESULT = [
  { t: 'VO = ' },
  { t: '√(30.78² − 10²)', fill: BLUE },
  { t: ' ≈ ' },
  { t: '29.11', fill: GOLD },
]

/* ---- PH 沿邊縮放 ---- */
const PH_LAW = [{ t: 'PH / VO = AP / VA' }]
const PH_RESULT = [
  { t: 'PH = 0.72 × 29.11 ≈ ' },
  { t: '20.96', fill: GOLD },
]

/* ---- 上視圖：HH′ ---- */
const HH_LAW = [{ t: 'AH = 0.72 × AO' }]
const HH_RESULT = [
  { t: 'HH′ = 20 − 0.72 × 10 = ' },
  { t: '12.8', fill: GOLD },
]

/* ---- α ---- */
const TAN_LAW = [{ t: 'tan α = PH / HH′' }]
const ALPHA_RESULT = [
  { t: 'tan α = 20.96 / 12.8 = 1.637 → ' },
  { t: 'α ≈ 58.6°', fill: GOLD },
]

/* ---- β ---- */
const BH_SRC = [{ t: 'BH² = 7.2² + 12.8² = 215.7' }]
const BETA_RESULT = [
  { t: 'tan β = 20.96 / 14.69 → ' },
  { t: 'β ≈ 55.0°', fill: GOLD },
]

/* ---- 比較 ---- */
const CMP_WHY = [{ t: 'BH = √(7.2² + 12.8²) = 14.69 > 12.8' }]

/* ---- 解題指南 ---- */
const GUIDE_STEPS = [
  { n: '0', lawKey: 'guideLaw0', line: [{ t: '∠VAB = 72°  ·  ∠PBA = 60°  ·  PQ ∥ BC' }] },
  {
    n: '1',
    lawKey: 'guideLaw1',
    line: [{ t: 'AP = 20 sin 60° / sin 48° = ' }, { t: '23.3', fill: GOLD }],
  },
  {
    n: '2',
    lawKey: 'guideLaw2',
    line: [{ t: 'VA = 32.4 · VO = 29.1 · PH = ' }, { t: '20.96', fill: GOLD }],
  },
  {
    n: '3',
    lawKey: 'guideLaw3',
    line: [{ t: 'tan α = 20.96 / 12.8 → ' }, { t: 'α = 58.6°', fill: GOLD }],
  },
  {
    n: '4',
    lawKey: 'guideLaw4',
    line: [{ t: 'BH = 14.7 > HH′ → ' }, { t: 'α > β ✓', fill: OK }],
  },
]

const CHIP_W = 92
const CHIP_H = 54
const CHIP_Y = 222
const CHIP_X = [10, 116, 222, 328]

const OPTIONS = [
  { id: 'A', val: 'α > β' },
  { id: 'B', val: 'β > α' },
  { id: 'C', val: 'α = β' },
  { id: 'D', val: 'β ≥ α' },
]
const ANSWER = 'A'

export default function PyramidLab({ mode, onInteractComplete }) {
  const u = useFly(mode, mode === 'guide' ? 2800 : 1900)
  const [wrongId, setWrongId] = useState(null)
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    if (mode !== 'gate') {
      setWrongId(null)
      setSolved(false)
    }
  }, [mode])

  const pick = (id) => {
    if (solved) return
    if (id === ANSWER) {
      setWrongId(null)
      setSolved(true)
      beep()
      window.setTimeout(() => onInteractComplete?.(), 800)
    } else {
      setWrongId(id)
      window.setTimeout(() => setWrongId((cur) => (cur === id ? null : cur)), 1600)
    }
  }

  const flags = {
    figure: mode === 'figure',
    question: mode === 'question',
    face: mode === 'face',
    pq: mode === 'pq',
    pb: mode === 'pb',
    ask: mode === 'ask',
    whatA: mode === 'whatA',
    whatB: mode === 'whatB',
    why: mode === 'why',
    va: mode === 'va',
    tri: mode === 'tri',
    ap: mode === 'ap',
    build: mode === 'build',
    vo: mode === 'vo',
    ph: mode === 'ph',
    hh: mode === 'hh',
    alpha: mode === 'alpha',
    beta: mode === 'beta',
    gate: mode === 'gate',
    compare: mode === 'compare',
    answer: mode === 'answer',
    verify: mode === 'verify',
    guide: mode === 'guide',
  }

  const chips = (live) =>
    OPTIONS.map((o) => {
      const isAns = o.id === ANSWER
      const ci = CHIP_X[OPTIONS.findIndex((q) => q.id === o.id)]
      const cls =
        live && wrongId === o.id
          ? 'idx-chip is-wrong'
          : solved
            ? isAns
              ? 'idx-chip solved'
              : 'idx-chip dim'
            : live
              ? 'idx-chip'
              : 'idx-chip static'
      return (
        <g
          key={o.id}
          className={cls}
          onClick={
            live
              ? (e) => {
                  e.stopPropagation()
                  pick(o.id)
                }
              : undefined
          }
        >
          <rect className="idx-chip-bg" x={ci} y={CHIP_Y} width={CHIP_W} height={CHIP_H} rx={14} />
          <text x={ci + 13} y={CHIP_Y + 17} fontSize={11} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
            {o.id}
          </text>
          <text x={ci + CHIP_W / 2} y={CHIP_Y + CHIP_H / 2} textAnchor="middle" fontSize={17} fill={isAns && solved ? GOLD : INK} fontFamily="'Fraunces', Georgia, serif" fontWeight={600} dominantBaseline="central">
            {o.val}
          </text>
          {solved && isAns && (
            <g>
              <circle cx={ci + CHIP_W - 14} cy={CHIP_Y + 14} r={9} fill={OK} />
              <text x={ci + CHIP_W - 14} y={CHIP_Y + 18.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#0b1020">
                ✓
              </text>
            </g>
          )}
        </g>
      )
    })

  return (
    <div className={`idx-lab ${solved ? 'is-solved' : ''}`}>
      <svg className="vm-svg" viewBox="0 0 430 382" overflow="hidden" role="img" aria-label="直立角錐 VABCD 切模型：正弦定律搵 AP，兩條垂直線起 α，BH > HH′ 所以 α 大過 β">
        {/* ─── p0 · 先睇圖 ─── */}
        {flags.figure && <PyramidFig u={clamp01(u / 0.9)} />}

        {/* ─── p1 · 題目（自己嘅話） ─── */}
        {flags.question && (
          <g>
            {t.qTextA.split('\n').map((ln, i) => (
              <text key={`qa${i}`} x={54} y={66 + i * 30} fontSize={13.5} fill={INK} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01((u - 0.05 * i) / 0.22)}>
                {ln}
              </text>
            ))}
            {t.qTextB.split('\n').map((ln, i) => (
              <text key={`qb${i}`} x={54} y={192 + i * 30} fontSize={13.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600} opacity={clamp01((u - 0.2 - 0.05 * i) / 0.22)}>
                {ln}
              </text>
            ))}
          </g>
        )}

        {/* ─── 72° 喺邊 ─── */}
        {flags.face && (
          <g>
            <PyramidFig u={clamp01((u - 0.05) / 0.5)} />
            <g opacity={clamp01((u - 0.1) / 0.5)}>
              <line x1={75} y1={235} x2={210} y2={55} stroke={GOLD} strokeWidth={2.4} />
              <line x1={75} y1={235} x2={265} y2={245} stroke={GOLD} strokeWidth={2.4} />
              <path d="M 99 236.3 A 24 24 0 0 0 89.4 215.8" fill="none" stroke={GOLD} strokeWidth={1.6} />
              <text x={110} y={222} fontSize={12.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                72°
              </text>
            </g>
            <g className="idx-pulse" opacity={clamp01((u - 0.55) / 0.25)}>
              <text x={215} y={312} textAnchor="middle" fontSize={15.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700}>
                {t.faceSub}
              </text>
            </g>
          </g>
        )}

        {/* ─── P、Q 同 PQ ∥ BC ─── */}
        {flags.pq && (
          <g>
            <PyramidFig u={clamp01((u - 0.05) / 0.5)} />
            <g opacity={clamp01((u - 0.1) / 0.5)}>
              <line x1={265} y1={245} x2={345} y2={185} stroke={GOLD} strokeWidth={2.4} />
              <line x1={167} y1={97} x2={177} y2={97} stroke={GOLD} strokeWidth={1.6} />
              <line x1={302} y1={211} x2={308} y2={219} stroke={GOLD} strokeWidth={1.6} />
              <line x1={172} y1={105} x2={172} y2={89} stroke={GOLD} strokeWidth={2.4} />
              <circle cx={172} cy={105} r={3.5} fill={GOLD} />
              <circle cx={172} cy={89} r={3.5} fill={GOLD} />
              <Lbl x={161} y={109} t="P" fill={INK} anchor="end" />
              <Lbl x={161} y={87} t="Q" fill={INK} anchor="end" />
            </g>
            <g className="idx-pulse" opacity={clamp01((u - 0.55) / 0.25)}>
              <text x={215} y={312} textAnchor="middle" fontSize={15.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700}>
                {t.pqSub}
              </text>
            </g>
          </g>
        )}

        {/* ─── ∠PBA = 60° ─── */}
        {flags.pb && (
          <g>
            <PyramidFig u={clamp01((u - 0.05) / 0.5)} />
            <g opacity={clamp01((u - 0.1) / 0.5)}>
              <line x1={172} y1={105} x2={265} y2={245} stroke={GOLD} strokeWidth={2.2} />
              <circle cx={172} cy={105} r={3.5} fill={GOLD} />
              <path d="M 239 243.6 A 26 26 0 0 1 250.5 223.4" fill="none" stroke={GOLD} strokeWidth={1.6} />
              <text x={222} y={228} fontSize={12.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                60°
              </text>
            </g>
            <g className="idx-pulse" opacity={clamp01((u - 0.55) / 0.25)}>
              <text x={215} y={312} textAnchor="middle" fontSize={15.5} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700}>
                {t.pbSub}
              </text>
            </g>
          </g>
        )}

        {/* ─── 切走 VPBCQ ─── */}
        {flags.ask && (
          <g>
            <PyramidFig u={clamp01((u - 0.1) / 0.9)} showCut />
            <g className="idx-pulse" opacity={clamp01((u - 0.6) / 0.25)}>
              <text x={215} y={312} textAnchor="middle" fontSize={17} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700}>
                {t.askPulse}
              </text>
            </g>
          </g>
        )}

        {/* ─── 問咩：(a) (b) 分開兩 beat ─── */}
        {(flags.whatA || flags.whatB) && (
          <g>
            <g className="idx-pulse" opacity={clamp01(u / 0.35)}>
              <Tex x={215} y={158} size={30} parts={flags.whatA ? ASK_A : ASK_B} />
            </g>
            <text x={215} y={212} textAnchor="middle" fontSize={13.5} fill={MUTED} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01((u - 0.35) / 0.3)}>
              {flags.whatA ? t.whatSubA : t.whatSubB}
            </text>
          </g>
        )}

        {/* ─── 關鍵：VO ⊥ 底面 ─── */}
        {flags.why && (
          <g>
            <PyramidFig u={clamp01((u - 0.1) / 0.9)} showO />
            <text x={215} y={308} textAnchor="middle" fontSize={16} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700} opacity={clamp01((u - 0.6) / 0.25)}>
              {t.whyText}
            </text>
          </g>
        )}

        {/* ─── 面三角形 VAB → VA ─── */}
        {flags.va &&
          (() => {
            const fig = clamp01((u - 0.1) / 0.5)
            const res = clamp01((u - 0.55) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={COS_LAW} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={fig}>
                  <line x1={120} y1={272} x2={260} y2={272} stroke={LINE} strokeWidth={1.6} />
                  <line x1={120} y1={272} x2={190} y2={58} stroke={LINE} strokeWidth={1.6} />
                  <line x1={260} y1={272} x2={190} y2={58} stroke={LINE} strokeWidth={1.6} />
                  <line x1={190} y1={58} x2={190} y2={272} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
                  {/* F 點直角 */}
                  <path d="M 190 264 L 182 264 L 182 272" fill="none" stroke={MUTED} strokeWidth={1.1} />
                  {/* ∠A = 72° */}
                  <path d="M 150 272 A 30 30 0 0 0 129.3 243.5" fill="none" stroke={GOLD} strokeWidth={1.6} />
                  <text x={160} y={252} fontSize={13} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    72°
                  </text>
                  {/* VA = VB 喃嘸口 */}
                  <line x1={151.2} y1={163.8} x2={158.8} y2={166.2} stroke={LINE} strokeWidth={1.4} />
                  <line x1={223.8} y1={166.2} x2={231.2} y2={163.8} stroke={LINE} strokeWidth={1.4} />
                  <Lbl x={190} y={50} t="V" fill={INK} />
                  <Lbl x={110} y={284} t="A" fill={INK} />
                  <Lbl x={270} y={284} t="B" fill={INK} />
                  <Lbl x={190} y={290} t="F" size={12} />
                </g>
                <Tex x={215} y={318} size={17} parts={VA_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── 三角形 ABP：三隻角 ─── */}
        {flags.tri &&
          (() => {
            const fig = clamp01((u - 0.1) / 0.5)
            const s48 = clamp01((u - 0.55) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={TRI_GIVEN} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={fig}>
                  <line x1={125} y1={260} x2={305} y2={260} stroke={LINE} strokeWidth={1.6} />
                  <line x1={125} y1={260} x2={190} y2={60} stroke={LINE} strokeWidth={1.6} />
                  <line x1={305} y1={260} x2={190} y2={60} stroke={LINE} strokeWidth={1.6} />
                  <path d="M 155 260 A 34 34 0 0 0 135.5 227.7" fill="none" stroke={GOLD} strokeWidth={1.5} />
                  <path d="M 271 260 A 34 34 0 0 1 288.1 230.5" fill="none" stroke={GOLD} strokeWidth={1.5} />
                  <path d="M 205 86 A 30 30 0 0 1 180.7 88.5" fill="none" stroke={MUTED} strokeWidth={1.3} />
                  <text x={168} y={240} fontSize={13} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    72°
                  </text>
                  <text x={252} y={236} fontSize={13} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    60°
                  </text>
                  <Lbl x={190} y={52} t="P" fill={INK} />
                  <Lbl x={115} y={272} t="A" fill={INK} />
                  <Lbl x={315} y={272} t="B" fill={INK} />
                  <text x={215} y={282} textAnchor="middle" fontSize={12} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    20
                  </text>
                </g>
                <Tex x={215} y={318} size={17} parts={TRI_SUM} opacity={s48} />
              </g>
            )
          })()}

        {/* ─── (a) 正弦定律 → AP ─── */}
        {flags.ap && (
          <g>
            <Tex x={215} y={95} size={17} parts={SINE_LAW} opacity={0.6 * clamp01(u / 0.3)} />
            <g opacity={clamp01((u - 0.25) / 0.25)}>
              <line x1={215} y1={118} x2={215} y2={148} stroke={LINE} strokeWidth={1.4} />
              <path d="M 210 142 L 215 152 L 220 142" fill="none" stroke={LINE} strokeWidth={1.4} />
            </g>
            <g opacity={clamp01((u - 0.4) / 0.35)} transform={`translate(0, ${(1 - clamp01((u - 0.4) / 0.35)) * 14})`}>
              <Card x={55} y={168} w={320} h={84} />
              <circle cx={92} cy={210} r={16} fill={BLUE} fillOpacity={0.18} stroke={BLUE} strokeWidth={1.5} />
              <text x={92} y={215} textAnchor="middle" fontSize={15} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontStyle="italic" fontWeight={700}>
                a
              </text>
              <Tex x={245} y={198} size={13.5} parts={SINE_LAW} opacity={0.55} />
              <Tex x={245} y={230} size={21} parts={[{ t: 'AP', it: true }, { t: ' ≈ ' }, { t: '23.3 cm', fill: GOLD }]} />
            </g>
          </g>
        )}

        {/* ─── 喺角錐度起 α ─── */}
        {flags.build && (
          <g>
            <PyramidFig u={u} showCut showCon />
            <g className="idx-pulse" opacity={clamp01((u - 0.8) / 0.2)}>
              <Tex x={215} y={312} size={19} parts={ALPHA_DEF} />
            </g>
          </g>
        )}

        {/* ─── 直角三角形 VOF → VO ─── */}
        {flags.vo &&
          (() => {
            const fig = clamp01((u - 0.15) / 0.45)
            const res = clamp01((u - 0.55) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={VO_LAW} opacity={0.55 * clamp01(u / 0.3)} />
                <Tex x={215} y={52} size={13} parts={VO_SRC} opacity={0.5 * clamp01((u - 0.1) / 0.3)} />
                <g opacity={fig}>
                  <line x1={150} y1={78} x2={150} y2={230} stroke={LINE} strokeWidth={1.6} />
                  <line x1={150} y1={230} x2={97} y2={230} stroke={LINE} strokeWidth={1.6} />
                  <line x1={150} y1={78} x2={97} y2={230} stroke={LINE} strokeWidth={1.6} />
                  <path d="M 150 222 L 142 222 L 142 230" fill="none" stroke={GOLD} strokeWidth={1.2} />
                  <text x={92} y={148} textAnchor="end" fontSize={12} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    VF = 30.78
                  </text>
                  <text x={123} y={246} textAnchor="middle" fontSize={12} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    10
                  </text>
                  <Lbl x={150} y={70} t="V" fill={INK} />
                  <Lbl x={163} y={244} t="O" fill={INK} />
                  <Lbl x={86} y={244} t="F" fill={INK} />
                  <Tex x={158} y={155} size={13} anchor="start" parts={[{ t: 'VO', it: true, fill: GOLD }, { t: ' = ?', fill: GOLD }]} opacity={res} />
                </g>
                <Tex x={215} y={318} size={16.5} parts={VO_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── 高度沿邊縮 ─── */}
        {flags.ph &&
          (() => {
            const bars = clamp01((u - 0.1) / 0.4)
            const gold = clamp01((u - 0.45) / 0.3)
            const res = clamp01((u - 0.6) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={PH_LAW} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={bars}>
                  <line x1={140} y1={282} x2={140} y2={82} stroke={LINE} strokeWidth={1.8} />
                  <line x1={300} y1={282} x2={300} y2={82} stroke={MUTED} strokeWidth={1.2} />
                  <circle cx={140} cy={138} r={4} fill={GOLD} />
                  <Lbl x={128} y={134} t="P" fill={GOLD} anchor="end" size={13} />
                  <line x1={140} y1={138} x2={300} y2={138} stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 4" />
                  <Lbl x={128} y={296} t="A" fill={INK} anchor="end" size={12} />
                  <Lbl x={128} y={80} t="V" fill={INK} anchor="end" size={12} />
                  <Lbl x={312} y={296} t="O" fill={MUTED} anchor="start" size={12} />
                  <Lbl x={312} y={80} t="V" fill={MUTED} anchor="start" size={12} />
                </g>
                <g opacity={gold}>
                  <line x1={300} y1={282} x2={300} y2={138} stroke={GOLD} strokeWidth={3.2} strokeLinecap="round" />
                  <text x={312} y={112} fontSize={12} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    VO = 29.11
                  </text>
                  <text x={312} y={216} fontSize={13} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    PH ≈ 20.96
                  </text>
                </g>
                <Tex x={215} y={318} size={17} parts={PH_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── 上視圖 → HH′ ─── */}
        {flags.hh &&
          (() => {
            const sq = clamp01((u - 0.1) / 0.4)
            const con = clamp01((u - 0.4) / 0.3)
            const res = clamp01((u - 0.6) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={HH_LAW} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={sq}>
                  <line x1={105} y1={258} x2={295} y2={258} stroke={LINE} strokeWidth={1.6} />
                  <line x1={295} y1={258} x2={295} y2={68} stroke={LINE} strokeWidth={1.6} />
                  <line x1={295} y1={68} x2={105} y2={68} stroke={LINE} strokeWidth={1.6} />
                  <line x1={105} y1={68} x2={105} y2={258} stroke={LINE} strokeWidth={1.6} />
                  <line x1={105} y1={258} x2={295} y2={68} stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 4" />
                  <circle cx={200} cy={163} r={2.5} fill={MUTED} />
                  <Lbl x={208} y={158} t="O" size={11} />
                  <line x1={105} y1={258} x2={173} y2={190} stroke={BLUE} strokeWidth={2.2} />
                  <Lbl x={93} y={272} t="A" fill={INK} />
                  <Lbl x={307} y={272} t="B" fill={INK} />
                  <Lbl x={307} y={62} t="C" fill={INK} />
                  <Lbl x={93} y={62} t="D" fill={INK} />
                </g>
                <g opacity={con}>
                  <line x1={173} y1={190} x2={295} y2={190} stroke={GOLD} strokeWidth={1.8} strokeDasharray="5 4" />
                  <circle cx={173} cy={190} r={4} fill={GOLD} />
                  <circle cx={295} cy={190} r={4} fill={GOLD} />
                  <path d="M 287 190 L 287 198 L 295 198" fill="none" stroke={GOLD} strokeWidth={1.1} />
                  <Lbl x={160} y={184} t="H" fill={GOLD} anchor="end" size={13} />
                  <Lbl x={306} y={184} t="H′" fill={GOLD} anchor="start" size={13} />
                </g>
                <Tex x={215} y={318} size={17} parts={HH_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── (b)(i) tan α ─── */}
        {flags.alpha &&
          (() => {
            const fig = clamp01((u - 0.1) / 0.45)
            const res = clamp01((u - 0.55) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={TAN_LAW} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={fig}>
                  <line x1={140} y1={262} x2={266} y2={262} stroke={BLUE} strokeWidth={2} />
                  <line x1={140} y1={262} x2={140} y2={55} stroke={BLUE} strokeWidth={2} />
                  <line x1={266} y1={262} x2={140} y2={55} stroke={GOLD} strokeWidth={2.2} />
                  <path d="M 140 254 L 148 254 L 148 262" fill="none" stroke={BLUE} strokeWidth={1.1} />
                  <path d="M 232 262 A 34 34 0 0 1 248.3 233" fill="none" stroke={GOLD} strokeWidth={1.6} />
                  <text x={214} y={244} fontSize={15} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontStyle="italic" fontWeight={700}>
                    α
                  </text>
                  <text x={128} y={160} textAnchor="end" fontSize={13} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    20.96
                  </text>
                  <text x={203} y={282} textAnchor="middle" fontSize={13} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    12.8
                  </text>
                  <Lbl x={130} y={58} t="P" fill={INK} anchor="end" />
                  <Lbl x={132} y={280} t="H" fill={INK} anchor="end" />
                  <Lbl x={274} y={280} t="H′" fill={INK} anchor="start" />
                </g>
                <Tex x={215} y={318} size={16} parts={ALPHA_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── β：PB 對底面 ─── */}
        {flags.beta &&
          (() => {
            const fig = clamp01((u - 0.1) / 0.45)
            const res = clamp01((u - 0.55) / 0.3)
            return (
              <g>
                <Tex x={215} y={30} size={15} parts={BH_SRC} opacity={0.55 * clamp01(u / 0.3)} />
                <g opacity={fig}>
                  <line x1={295} y1={262} x2={173} y2={194} stroke={LINE} strokeWidth={1.8} />
                  <line x1={295} y1={262} x2={295} y2={194} stroke={MUTED} strokeWidth={1.1} />
                  <line x1={173} y1={194} x2={295} y2={194} stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 4" />
                  <line x1={173} y1={194} x2={173} y2={82} stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 4" />
                  <line x1={295} y1={262} x2={173} y2={82} stroke={GOLD} strokeWidth={2.2} />
                  <path d="M 181 194 L 181 186 L 173 186" fill="none" stroke={BLUE} strokeWidth={1.1} />
                  <path d="M 287 194 L 287 202 L 295 202" fill="none" stroke={BLUE} strokeWidth={1.1} />
                  <path d="M 268.8 247.4 A 30 30 0 0 1 278.2 237.2" fill="none" stroke={BLUE} strokeWidth={1.6} />
                  <text x={256} y={236} fontSize={15} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontStyle="italic" fontWeight={700}>
                    β
                  </text>
                  <Lbl x={308} y={276} t="B" fill={INK} />
                  <Lbl x={162} y={200} t="H" fill={INK} anchor="end" />
                  <Lbl x={306} y={188} t="H′" fill={INK} anchor="start" />
                  <Lbl x={162} y={78} t="P" fill={INK} anchor="end" />
                </g>
                <Tex x={215} y={318} size={16.5} parts={BETA_RESULT} opacity={res} />
              </g>
            )
          })()}

        {/* ─── 互動關卡：邊個大？ ─── */}
        {flags.gate && (
          <g opacity={clamp01(u / 0.35)}>
            <g className="idx-pulse">
              <text x={215} y={150} textAnchor="middle" fontSize={30} fontWeight={700} fill={GOLD} fontFamily="'Fraunces', Georgia, serif">
                {t.gatePulse}
              </text>
            </g>
            {chips(true)}
            {solved ? (
              <Tex x={215} y={314} size={16} parts={[{ t: 'BH > HH′ → ' }, { t: 'α > β', fill: OK }, { t: '  ✓', fill: OK }]} />
            ) : wrongId ? (
              <text x={215} y={314} textAnchor="middle" fontSize={14} fill={RED} fontFamily="'Fraunces', Georgia, serif">
                {wrongId === 'B' ? t.whyB : wrongId === 'C' ? t.whyC : t.whyD}
              </text>
            ) : (
              <text x={215} y={314} textAnchor="middle" fontSize={15} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                {t.hint}
              </text>
            )}
          </g>
        )}

        {/* ─── 點解 α 勝 ─── */}
        {flags.compare &&
          (() => {
            const l = clamp01((u - 0.1) / 0.35)
            const r = clamp01((u - 0.3) / 0.35)
            const why = clamp01((u - 0.5) / 0.3)
            const big = clamp01((u - 0.7) / 0.25)
            return (
              <g>
                <g opacity={l} transform={`translate(0, ${(1 - l) * 14})`}>
                  <Card x={28} y={108} w={172} h={132} />
                  <Tex x={114} y={132} size={14} parts={[{ t: 'tan ', fill: MUTED }, { t: 'α', it: true, fill: GOLD }]} />
                  <text x={114} y={166} textAnchor="middle" fontSize={19} fill={INK} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    20.96
                  </text>
                  <line x1={84} y1={176} x2={144} y2={176} stroke={LINE} strokeWidth={1.4} />
                  <text x={114} y={202} textAnchor="middle" fontSize={19} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    12.8
                  </text>
                  <text x={114} y={226} textAnchor="middle" fontSize={11} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    PH / HH′
                  </text>
                </g>
                <g opacity={r} transform={`translate(0, ${(1 - r) * 14})`}>
                  <Card x={230} y={108} w={172} h={132} />
                  <Tex x={316} y={132} size={14} parts={[{ t: 'tan ', fill: MUTED }, { t: 'β', it: true, fill: BLUE }]} />
                  <text x={316} y={166} textAnchor="middle" fontSize={19} fill={INK} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    20.96
                  </text>
                  <line x1={286} y1={176} x2={346} y2={176} stroke={LINE} strokeWidth={1.4} />
                  <text x={316} y={202} textAnchor="middle" fontSize={19} fill={BLUE} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
                    14.69
                  </text>
                  <text x={316} y={226} textAnchor="middle" fontSize={11} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                    PH / BH
                  </text>
                </g>
                <g className="idx-pulse" opacity={big}>
                  <text x={215} y={192} textAnchor="middle" fontSize={34} fontWeight={700} fill={GOLD} fontFamily="'Fraunces', Georgia, serif">
                    &gt;
                  </text>
                </g>
                <Tex x={215} y={270} size={13.5} parts={CMP_WHY} opacity={0.6 * why} />
                <g className="idx-pulse" opacity={big}>
                  <Tex x={215} y={312} size={32} parts={[{ t: 'α', it: true, fill: GOLD }, { t: ' > ', fill: GOLD }, { t: 'β', it: true, fill: GOLD }]} />
                </g>
              </g>
            )
          })()}

        {/* ─── 答案 ─── */}
        {flags.answer && (
          <g>
            <circle cx={215} cy={136} r={58} fill="none" stroke={GOLD} strokeWidth={1.5} opacity={0.5 * clamp01((u - 0.1) / 0.35)} />
            <text x={215} y={147} textAnchor="middle" fontSize={30} fontWeight={700} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01((u - 0.1) / 0.35)}>
              α &gt; β
            </text>
            <text x={215} y={228} textAnchor="middle" fontSize={13.5} fill={MUTED} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01((u - 0.45) / 0.3)}>
              AP = 23.3 cm&#160;&#160;·&#160;&#160;α = 58.6°&#160;&#160;·&#160;&#160;β = 55.0°
            </text>
            <text x={215} y={278} textAnchor="middle" fontSize={24} fontWeight={700} fill={OK} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01((u - 0.75) / 0.25)}>
              → 8 / 8 ✓
            </text>
          </g>
        )}

        {/* ─── 驗證 ─── */}
        {flags.verify && (
          <g>
            <text x={215} y={72} textAnchor="middle" fontSize={16} fill={MUTED} fontFamily="'Fraunces', Georgia, serif" opacity={clamp01(u / 0.3)}>
              VA = 10 / cos 72° = 32.36
            </text>
            {(() => {
              const cd = clamp01((u - 0.2) / 0.35)
              const fin = clamp01((u - 0.6) / 0.3)
              return (
                <g>
                  <g opacity={cd} transform={`translate(0, ${(1 - cd) * 14})`}>
                    <Card x={60} y={120} w={310} h={84} />
                    <circle cx={97} cy={162} r={16} fill={GOLD} fillOpacity={0.18} stroke={GOLD} strokeWidth={1.5} />
                    <text x={97} y={167} textAnchor="middle" fontSize={14} fill={GOLD} fontFamily="'Fraunces', Georgia, serif" fontStyle="italic" fontWeight={700}>
                      P
                    </text>
                    <Tex
                      x={237}
                      y={168}
                      size={15.5}
                      parts={[
                        { t: 'AP + VP = 23.30 + 9.06 = ' },
                        { t: '32.36', fill: GOLD },
                        { t: ' ✓', fill: OK },
                      ]}
                    />
                  </g>
                  <g className="idx-pulse" opacity={fin}>
                    <Tex x={215} y={248} size={20} parts={[{ t: '58.6° > 55.0° ', fill: OK }, { t: '✓', fill: OK }]} />
                  </g>
                </g>
              )
            })()}
          </g>
        )}

        {/* ─── 解題指南 ─── */}
        {flags.guide &&
          GUIDE_STEPS.map((step, i) => {
            const ui = clamp01((u - i * 0.14) / 0.4)
            const y = 42 + i * 52 + (1 - ui) * 16
            return (
              <g key={step.n} opacity={ui}>
                <rect x={18} y={y} width={394} height={46} rx={12} fill="rgba(255,255,255,0.04)" stroke="rgba(242,245,255,0.18)" strokeWidth={1.2} />
                <circle cx={42} cy={y + 23} r={12} fill={i === 4 ? OK : GOLD} fillOpacity={0.2} stroke={i === 4 ? OK : GOLD} strokeWidth={1.3} />
                <text x={42} y={y + 27} textAnchor="middle" fontSize={12} fill={i === 4 ? OK : GOLD} fontFamily="'Fraunces', Georgia, serif" fontWeight={700}>
                  {step.n === '0' ? 'Q' : step.n}
                </text>
                <text x={64} y={y + 18} fontSize={11} fill={MUTED} fontFamily="'Fraunces', Georgia, serif">
                  {t[step.lawKey]}
                </text>
                <Tex x={64} y={y + 38} size={15} parts={step.line} anchor="start" />
              </g>
            )
          })}
      </svg>
    </div>
  )
}
