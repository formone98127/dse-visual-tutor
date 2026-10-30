import { useEffect, useRef, useState } from 'react'
import LabStage from './LabStage.jsx'
import { beep, clamp01, useFly } from '../lib/labMotion.js'
import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'

/**
 * DSE U1 一元二次方程 · 旗艦互動實驗室
 * mode 例「u1.concept」；挑戰頁（complete / disc / build）要做完互動先解鎖 Next。
 */

function sceneKey(mode) {
  if (!mode) return 'concept'
  const i = mode.indexOf('.')
  return i < 0 ? mode : mode.slice(i + 1)
}

/* ---- 共用座標（diag 430×290）----
 * 頂帶 0–40：方程／狀態字（避開 LabStage 金色標題）
 * 圖帶 45–215：座標軸＋拋物線
 * 底帶 230–280：撳掣 CTA（唔同圖／根標籤打架）
 */
const OX = 215
const OY = 145
const SX = 40
const SY = 13
const CTA_Y = 242

function toX(x) {
  return OX + x * SX
}
function toY(y) {
  return OY - y * SY
}

function parabolaPath(a, b, c, x0 = -4.2, x1 = 4.2, n = 48) {
  const pts = []
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    const y = a * x * x + b * x + c
    pts.push(`${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`)
  }
  return pts.join(' ')
}

function Axes({ showY = true }) {
  return (
    <g>
      <line x1={40} y1={OY} x2={390} y2={OY} stroke={LINE} strokeWidth={1.4} />
      <line x1={382} y1={OY - 5} x2={390} y2={OY} stroke={LINE} strokeWidth={1.4} />
      <line x1={382} y1={OY + 5} x2={390} y2={OY} stroke={LINE} strokeWidth={1.4} />
      {showY && (
        <>
          <line x1={OX} y1={48} x2={OX} y2={215} stroke={LINE} strokeWidth={1.4} />
          <line x1={OX - 5} y1={56} x2={OX} y2={48} stroke={LINE} strokeWidth={1.4} />
          <line x1={OX + 5} y1={56} x2={OX} y2={48} stroke={LINE} strokeWidth={1.4} />
        </>
      )}
      <text x={396} y={OY + 14} fontSize={12} fill={MUTED} fontFamily={SERIF}>
        x
      </text>
      {showY && (
        <text x={OX + 8} y={44} fontSize={12} fill={MUTED} fontFamily={SERIF}>
          y
        </text>
      )}
    </g>
  )
}

function Cta({ x, y, w, h, label, onClick, done }) {
  return (
    <g
      className="idx-chip"
      onClick={(e) => {
        e.stopPropagation()
        if (!done) onClick?.()
      }}
      style={{ cursor: done ? 'default' : 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        className="idx-chip-bg"
        fill={done ? 'rgba(184,242,124,0.15)' : 'rgba(255,209,102,0.12)'}
        stroke={done ? OK : GOLD}
        strokeWidth={1.8}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill={done ? OK : GOLD}
        fontFamily={SERIF}
      >
        {done ? '✓ 完成' : label}
      </text>
    </g>
  )
}

const META = {
  concept: {
    title: '一元二次方程',
    lines: [
      [{ t: '最高次係 2 · 一個未知數' }],
      [{ t: 'ax² + bx + c = 0', fill: GOLD, b: true }],
    ],
  },
  factor: {
    title: '因式法',
    lines: [
      [{ t: '拆成兩個括號 · 邊個 = 0 都得' }],
      [{ t: '根喺 x 軸兩點', fill: GOLD, b: true }],
    ],
  },
  complete: {
    title: '配方法',
    lines: [
      [{ t: '缺角補成完全平方' }],
      [{ t: '撳「自動貼合」睇配方', fill: GOLD, b: true }],
    ],
  },
  formula: {
    title: '求根公式',
    lines: [
      [{ t: '公式計出嘅根 · 就係圖上交點' }],
      [{ t: 'x = 2 或 −1/2', fill: GOLD, b: true }],
    ],
  },
  disc: {
    title: '根的數目 · Δ',
    lines: [
      [{ t: '撳掣 · 睇拋物線掂唔掂到 x 軸' }],
      [{ t: 'Δ 決定交幾多點', fill: GOLD, b: true }],
    ],
  },
  build: {
    title: '由已知根建方程',
    lines: [
      [{ t: '撳掣 · 睇方程自己寫出嚟' }],
      [{ t: 'x² − (和)x + (積) = 0', fill: GOLD, b: true }],
    ],
  },
  coef: {
    title: '根與係數',
    lines: [
      [{ t: '唔使解根都可以讀和同積' }],
      [{ t: 'α+β = −b/a · αβ = c/a', fill: GOLD, b: true }],
    ],
  },
  squares: {
    title: 'α² + β² 恆等式',
    lines: [
      [{ t: '大正方形減兩塊長方形' }],
      [{ t: 'α²+β² = (α+β)² − 2αβ', fill: GOLD, b: true }],
    ],
  },
  complex: {
    title: '複數運算',
    lines: [
      [{ t: 'i 每次乘 · 轉 90°' }],
      [{ t: 'i² = −1', fill: GOLD, b: true }],
    ],
  },
  complex_build: {
    title: '複數根建方程',
    lines: [
      [{ t: '有共軛對 → 係數全部係實數' }],
      [{ t: 'x² − 4x + 13 = 0', fill: GOLD, b: true }],
    ],
  },
  mistakes: {
    title: '常犯錯誤',
    lines: [
      [{ t: '分母 2a · 和有負號 · 共軛成對' }],
      [{ t: '睇圖對照就唔會錯', fill: MUTED }],
    ],
  },
  apply: {
    title: '應用 · 長方形',
    lines: [
      [{ t: '闊 x · 長 x+3 · 面積 40' }],
      [{ t: '闊 5 · 長 8', fill: GOLD, b: true }],
    ],
  },
  summary: {
    title: 'U1 完成',
    lines: [
      [{ t: '公式 · Δ · 共軛' }],
      [{ t: '下一章：U2 函數及其圖像', fill: GOLD, b: true }],
    ],
  },
}

export default function QuadraticLab({ mode, stage = 99, onInteractComplete }) {
  const scene = sceneKey(mode)
  const u = useFly(scene, scene === 'complete' || scene === 'formula' ? 1600 : 1100)
  const meta = META[scene] || META.concept

  const [factored, setFactored] = useState(false)
  const [fitted, setFitted] = useState(false)
  const [fitProg, setFitProg] = useState(0)
  const [discT, setDiscT] = useState(1)
  const [discPlayed, setDiscPlayed] = useState(false)
  const [r1, setR1] = useState(2)
  const [r2, setR2] = useState(3)
  const [buildPlayed, setBuildPlayed] = useState(false)
  const [iPow, setIPow] = useState(0)
  const [conjShown, setConjShown] = useState(false)
  const doneRef = useRef({})

  // 換場景時清本地旗標（App 亦會重設 gate）
  useEffect(() => {
    setFactored(false)
    setFitted(false)
    setFitProg(0)
    setDiscT(1)
    setDiscPlayed(false)
    setR1(2)
    setR2(3)
    setBuildPlayed(false)
    setIPow(0)
    setConjShown(false)
    doneRef.current = {}
  }, [scene])

  const markDone = (key) => {
    if (doneRef.current[key]) return
    doneRef.current[key] = true
    beep()
    onInteractComplete?.()
  }

  // 非挑戰頁：入場後自動解鎖（App 只對有 gate 嘅拍上鎖）
  useEffect(() => {
    if (!['complete', 'disc', 'build', 'factor'].includes(scene)) {
      onInteractComplete?.()
    }
  }, [scene, onInteractComplete])

  const runFit = () => {
    if (fitted) return
    setFitted(true)
    const start = performance.now()
    const tick = (now) => {
      const p = clamp01((now - start) / 900)
      setFitProg(p)
      if (p < 1) requestAnimationFrame(tick)
      else markDone('complete')
    }
    requestAnimationFrame(tick)
  }

  const onFactor = () => {
    setFactored(true)
    markDone('factor')
  }

  /** 只撳掣：兩根 → 相切 → 飛起無交點 */
  const runDiscDemo = () => {
    if (discPlayed) return
    setDiscPlayed(true)
    const start = performance.now()
    const dur = 1600
    const tick = (now) => {
      const p = clamp01((now - start) / dur)
      // t: 1 → 0.5 → 0
      setDiscT(1 - p)
      if (p < 1) requestAnimationFrame(tick)
      else markDone('disc')
    }
    requestAnimationFrame(tick)
  }

  /** 只撳掣：根由 2、3 滑去 −1、2，方程跟住改 */
  const runBuildDemo = () => {
    if (buildPlayed) return
    setBuildPlayed(true)
    const from1 = 2
    const from2 = 3
    const to1 = -1
    const to2 = 2
    const start = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = clamp01((now - start) / dur)
      const ease = p * p * (3 - 2 * p)
      setR1(Math.round((from1 + (to1 - from1) * ease) * 10) / 10)
      setR2(Math.round((from2 + (to2 - from2) * ease) * 10) / 10)
      if (p < 1) requestAnimationFrame(tick)
      else {
        setR1(to1)
        setR2(to2)
        markDone('build')
      }
    }
    requestAnimationFrame(tick)
  }

  const sum = r1 + r2
  const prod = r1 * r2

  // disc：t=0 → Δ<0；t=0.5 → Δ=0；t=1 → Δ>0。固定 a=1,b=−2，調 c。
  // vertex at x=1, y = 1−2+c = c−1. For tangent: vertex on axis → c=1, Δ=4−4c=0.
  // c = 1 + (0.5 - t)*2.4  → t=0.5 → c=1; t=1 → c=-0.2 Δ>0; t=0 → c=2.2 Δ<0
  const discC = 1 + (0.5 - discT) * 2.4
  const discA = 1
  const discB = -2
  const discDelta = discB * discB - 4 * discA * discC
  const discRoots =
    discDelta > 1e-6
      ? [(-discB - Math.sqrt(discDelta)) / 2, (-discB + Math.sqrt(discDelta)) / 2]
      : discDelta >= -1e-6
        ? [1]
        : []

  // formula example: 2x²−3x−2=0 → roots 2, −0.5
  const formA = 2
  const formB = -3
  const formC = -2

  // lines 留空：老師講解已喺 ControlDeck，避免舞台底同字幕双重疊（睇落好似錯位）
  return (
    <LabStage title={meta.title} stage={stage} ds={0} lines={[]}>
      {scene === 'concept' && <ConceptScene u={u} />}
      {scene === 'factor' && <FactorScene u={u} factored={factored} onFactor={onFactor} />}
      {scene === 'complete' && (
        <CompleteScene u={u} fitProg={fitProg} fitted={fitted} onFit={runFit} />
      )}
      {scene === 'formula' && <FormulaScene u={u} />}
      {scene === 'disc' && (
        <DiscScene
          u={u}
          a={discA}
          b={discB}
          c={discC}
          delta={discDelta}
          roots={discRoots}
          played={discPlayed}
          onPlay={runDiscDemo}
        />
      )}
      {scene === 'build' && (
        <BuildScene
          u={u}
          r1={r1}
          r2={r2}
          sum={sum}
          prod={prod}
          played={buildPlayed}
          onPlay={runBuildDemo}
        />
      )}
      {scene === 'coef' && <CoefScene u={u} r1={2} r2={3} />}
      {scene === 'squares' && <SquaresScene u={u} />}
      {scene === 'complex' && (
        <ComplexScene u={u} iPow={iPow} onSpin={() => setIPow((p) => Math.min(4, p + 1))} />
      )}
      {scene === 'complex_build' && (
        <ComplexBuildScene
          u={u}
          shown={conjShown}
          onShow={() => {
            setConjShown(true)
            beep()
          }}
        />
      )}
      {scene === 'mistakes' && <MistakesScene u={u} />}
      {scene === 'apply' && <ApplyScene u={u} />}
      {scene === 'summary' && <SummaryScene u={u} />}
    </LabStage>
  )
}

/* ===================== scenes ===================== */

function ConceptScene({ u }) {
  const path = parabolaPath(0.28, 0, -1.5)
  return (
    <g>
      <Axes />
      <path
        d={path}
        fill="none"
        stroke={BLUE}
        strokeWidth={2.6}
        opacity={clamp01(u / 0.45)}
        className={u > 0.05 ? 'fx-draw' : undefined}
        pathLength={1}
      />
      <text
        x={215}
        y={28}
        textAnchor="middle"
        fontSize={15}
        fill={MUTED}
        fontFamily={SERIF}
        opacity={clamp01((u - 0.2) / 0.35)}
      >
        圖像係一條拋物線
      </text>
      <g opacity={clamp01((u - 0.35) / 0.4)}>
        <Chip x={48} y={198} w={100} h={36} f={BLUE} label="a ≠ 0" sub="二次項" />
        <Chip x={165} y={198} w={100} h={36} f={GOLD} label="b" sub="一次項" />
        <Chip x={282} y={198} w={100} h={36} f={OK} label="c" sub="常數項" />
      </g>
    </g>
  )
}

function FactorScene({ u, factored, onFactor }) {
  const path = parabolaPath(0.4, -2, 2.1)
  return (
    <g>
      <Axes />
      <path d={path} fill="none" stroke={BLUE} strokeWidth={2.4} opacity={clamp01(u / 0.4)} />
      <text
        x={215}
        y={28}
        textAnchor="middle"
        fontSize={18}
        fill={INK}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={clamp01(u / 0.3)}
      >
        x² − 5x + 6 = 0
      </text>
      {factored && (
        <g className="fx-pop">
          <text x={215} y={52} textAnchor="middle" fontSize={16} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
            (x − 2)(x − 3) = 0
          </text>
          <circle cx={toX(2)} cy={OY} r={7} fill={GOLD} fillOpacity={0.35} stroke={GOLD} strokeWidth={2} />
          <circle cx={toX(3)} cy={OY} r={7} fill={OK} fillOpacity={0.35} stroke={OK} strokeWidth={2} />
          <text x={toX(2)} y={OY + 20} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
            2
          </text>
          <text x={toX(3)} y={OY + 20} textAnchor="middle" fontSize={13} fill={OK} fontFamily={SERIF} fontWeight={700}>
            3
          </text>
        </g>
      )}
      <Cta x={140} y={CTA_Y} w={150} h={38} label="拆因式" onClick={onFactor} done={factored} />
    </g>
  )
}

function CompleteScene({ u, fitProg, fitted, onFit }) {
  // Area model: x², two 3x halves → add 9
  const t = fitted ? fitProg : 0
  const patchOp = clamp01((t - 0.15) / 0.35)
  const squareOp = clamp01((t - 0.45) / 0.4)
  return (
    <g>
      <text
        x={215}
        y={26}
        textAnchor="middle"
        fontSize={17}
        fill={INK}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={clamp01(u / 0.3)}
      >
        x² − 6x + 5 = 0
      </text>
      <rect
        x={70}
        y={48}
        width={90}
        height={90}
        rx={4}
        fill={BLUE}
        fillOpacity={0.22}
        stroke={BLUE}
        strokeWidth={1.8}
        opacity={clamp01(u / 0.35)}
      />
      <text x={115} y={100} textAnchor="middle" fontSize={20} fill={BLUE} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.35)}>
        x²
      </text>
      <rect
        x={168}
        y={48}
        width={42}
        height={90}
        rx={4}
        fill={GOLD}
        fillOpacity={0.25}
        stroke={GOLD}
        strokeWidth={1.8}
        opacity={clamp01((u - 0.15) / 0.35)}
      />
      <text x={189} y={100} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.15) / 0.35)}>
        3x
      </text>
      <rect
        x={70}
        y={146}
        width={90}
        height={32}
        rx={4}
        fill={GOLD}
        fillOpacity={0.25}
        stroke={GOLD}
        strokeWidth={1.8}
        opacity={clamp01((u - 0.2) / 0.35)}
      />
      <text x={115} y={168} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.2) / 0.35)}>
        3x
      </text>
      <rect
        x={168}
        y={146}
        width={42}
        height={32}
        rx={4}
        fill={OK}
        fillOpacity={0.35}
        stroke={OK}
        strokeWidth={2}
        opacity={patchOp}
        className={patchOp > 0.1 ? 'fx-pop' : undefined}
      />
      <text x={189} y={168} textAnchor="middle" fontSize={13} fill={OK} fontFamily={SERIF} fontWeight={700} opacity={patchOp}>
        9
      </text>
      <text
        x={310}
        y={100}
        textAnchor="middle"
        fontSize={16}
        fill={GOLD}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={squareOp}
      >
        (x − 3)² = 4
      </text>
      <text
        x={310}
        y={130}
        textAnchor="middle"
        fontSize={17}
        fill={OK}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={clamp01((t - 0.7) / 0.3)}
      >
        x = 5 或 1
      </text>
      <Cta x={145} y={CTA_Y} w={140} h={38} label="自動貼合" onClick={onFit} done={fitted && t >= 1} />
    </g>
  )
}

function FormulaScene({ u }) {
  // 形狀對應根 −0.5 同 2（同例題 2x²−3x−2=0）
  const path2 = parabolaPath(0.32, -0.48, -0.32)
  const showRoots = clamp01((u - 0.45) / 0.4)
  return (
    <g>
      <Axes />
      <path d={path2} fill="none" stroke={BLUE} strokeWidth={2.4} opacity={clamp01(u / 0.4)} />
      <text x={215} y={26} textAnchor="middle" fontSize={16} fill={INK} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.3)}>
        2x² − 3x − 2 = 0
      </text>
      <text
        x={215}
        y={48}
        textAnchor="middle"
        fontSize={12}
        fill={MUTED}
        fontFamily={SERIF}
        opacity={clamp01((u - 0.2) / 0.3)}
      >
        x = [−b ± √(b²−4ac)] / (2a)
      </text>
      <g opacity={showRoots}>
        <circle cx={toX(-0.5)} cy={OY} r={7} fill={GOLD} fillOpacity={0.35} stroke={GOLD} strokeWidth={2} className="fx-pop" />
        <circle cx={toX(2)} cy={OY} r={7} fill={OK} fillOpacity={0.35} stroke={OK} strokeWidth={2} className="fx-pop" />
        <text x={toX(-0.5)} y={OY + 20} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
          −1/2
        </text>
        <text x={toX(2)} y={OY + 20} textAnchor="middle" fontSize={13} fill={OK} fontFamily={SERIF} fontWeight={700}>
          2
        </text>
      </g>
      <text
        x={215}
        y={215}
        textAnchor="middle"
        fontSize={15}
        fill={GOLD}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={clamp01((u - 0.65) / 0.3)}
      >
        公式落地 = 圖上交點
      </text>
    </g>
  )
}

function DiscScene({ u, a, b, c, delta, roots, played, onPlay }) {
  const path = parabolaPath(a * 0.4, b * 0.4, c * 0.4)
  const label =
    delta > 0.15 ? 'Δ > 0 · 兩個交點' : delta < -0.15 ? 'Δ < 0 · 無交點' : 'Δ = 0 · 相切（重根）'
  const color = delta > 0.15 ? OK : delta < -0.15 ? RED : GOLD
  return (
    <g>
      <Axes />
      <path d={path} fill="none" stroke={BLUE} strokeWidth={2.6} opacity={clamp01(u / 0.35)} />
      {roots.map((r, i) => (
        <circle
          key={i}
          cx={toX(r)}
          cy={OY}
          r={7}
          fill={color}
          fillOpacity={0.35}
          stroke={color}
          strokeWidth={2}
        />
      ))}
      <text x={215} y={26} textAnchor="middle" fontSize={15} fill={color} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.3)}>
        {label}
      </text>
      <text x={215} y={48} textAnchor="middle" fontSize={12} fill={MUTED} fontFamily={SERIF}>
        Δ ≈ {delta.toFixed(1)}
      </text>
      <Cta x={120} y={CTA_Y} w={190} h={38} label="播放 Δ 變化" onClick={onPlay} done={played} />
    </g>
  )
}

function BuildScene({ u, r1, r2, sum, prod, played, onPlay }) {
  const a = 0.35
  const b = -a * sum
  const c = a * prod
  const path = parabolaPath(a, b, c)
  return (
    <g>
      <Axes />
      <path d={path} fill="none" stroke={BLUE} strokeWidth={2.4} opacity={clamp01(u / 0.35)} />
      <g opacity={clamp01(u / 0.3)}>
        <circle cx={toX(r1)} cy={OY} r={9} fill={GOLD} fillOpacity={0.4} stroke={GOLD} strokeWidth={2.2} />
        <text x={toX(r1)} y={OY - 14} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
          {fmtNum(r1)}
        </text>
      </g>
      <g opacity={clamp01(u / 0.3)}>
        <circle cx={toX(r2)} cy={OY} r={9} fill={OK} fillOpacity={0.4} stroke={OK} strokeWidth={2.2} />
        <text x={toX(r2)} y={OY - 14} textAnchor="middle" fontSize={13} fill={OK} fontFamily={SERIF} fontWeight={700}>
          {fmtNum(r2)}
        </text>
      </g>
      <text
        x={215}
        y={26}
        textAnchor="middle"
        fontSize={16}
        fill={GOLD}
        fontFamily={SERIF}
        fontWeight={700}
        opacity={clamp01((u - 0.2) / 0.35)}
      >
        {`x² − (${fmtNum(sum)})x + (${fmtNum(prod)}) = 0`}
      </text>
      <text x={215} y={48} textAnchor="middle" fontSize={12} fill={MUTED} fontFamily={SERIF} opacity={clamp01((u - 0.3) / 0.3)}>
        和 {fmtNum(sum)} · 積 {fmtNum(prod)}
      </text>
      <Cta x={120} y={CTA_Y} w={190} h={38} label="示範建方程" onClick={onPlay} done={played} />
    </g>
  )
}

function CoefScene({ u, r1, r2 }) {
  const sum = r1 + r2
  const prod = r1 * r2
  const path = parabolaPath(0.35, -0.35 * sum, 0.35 * prod)
  return (
    <g>
      <Axes />
      <path d={path} fill="none" stroke={BLUE} strokeWidth={2.4} opacity={clamp01(u / 0.35)} />
      <circle cx={toX(r1)} cy={OY} r={7} fill={GOLD} fillOpacity={0.35} stroke={GOLD} strokeWidth={2} opacity={clamp01(u / 0.3)} />
      <circle cx={toX(r2)} cy={OY} r={7} fill={OK} fillOpacity={0.35} stroke={OK} strokeWidth={2} opacity={clamp01(u / 0.3)} />
      <Chip x={40} y={198} w={160} h={36} f={GOLD} label={`α+β = ${sum}`} sub="= −b/a" />
      <Chip
        x={230}
        y={198}
        w={160}
        h={36}
        f={OK}
        label={`αβ = ${prod}`}
        sub="= c/a"
        op={clamp01((u - 0.25) / 0.4)}
      />
      <text x={215} y={28} textAnchor="middle" fontSize={13} fill={MUTED} fontFamily={SERIF} opacity={clamp01((u - 0.45) / 0.35)}>
        例：x² − 5x + 6 → 和 5 · 積 6
      </text>
    </g>
  )
}

function SquaresScene({ u }) {
  // Visual: (α+β)² square minus two αβ rectangles
  const showMain = clamp01(u / 0.35)
  const showSub = clamp01((u - 0.35) / 0.4)
  const showEq = clamp01((u - 0.6) / 0.35)
  return (
    <g>
      <rect x={70} y={40} width={120} height={120} rx={4} fill={BLUE} fillOpacity={0.15} stroke={BLUE} strokeWidth={1.8} opacity={showMain} />
      <text x={130} y={108} textAnchor="middle" fontSize={17} fill={BLUE} fontFamily={SERIF} fontWeight={700} opacity={showMain}>
        (α+β)²
      </text>
      <rect x={230} y={55} width={70} height={50} rx={4} fill={RED} fillOpacity={0.2} stroke={RED} strokeWidth={1.6} opacity={showSub} />
      <rect x={310} y={55} width={70} height={50} rx={4} fill={RED} fillOpacity={0.2} stroke={RED} strokeWidth={1.6} opacity={showSub} />
      <text x={265} y={85} textAnchor="middle" fontSize={13} fill={RED} fontFamily={SERIF} fontWeight={700} opacity={showSub}>
        αβ
      </text>
      <text x={345} y={85} textAnchor="middle" fontSize={13} fill={RED} fontFamily={SERIF} fontWeight={700} opacity={showSub}>
        αβ
      </text>
      <text x={215} y={195} textAnchor="middle" fontSize={17} fill={GOLD} fontFamily={SERIF} fontWeight={700} opacity={showEq}>
        α²+β² = (α+β)² − 2αβ
      </text>
      <text x={215} y={220} textAnchor="middle" fontSize={14} fill={OK} fontFamily={SERIF} fontWeight={700} opacity={showEq}>
        例：25 − 12 = 13
      </text>
    </g>
  )
}

function ComplexScene({ u, iPow, onSpin }) {
  const labels = ['1', 'i', '−1', '−i', '1']
  const angles = [0, 90, 180, 270, 360]
  const ang = angles[iPow] || 0
  const rad = ((ang - 90) * Math.PI) / 180
  const cx = 215
  const cy = 125
  const R = 62
  const px = cx + R * Math.cos(rad)
  const py = cy + R * Math.sin(rad)
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={LINE} strokeWidth={1.4} opacity={clamp01(u / 0.3)} />
      <line x1={cx - R - 20} y1={cy} x2={cx + R + 20} y2={cy} stroke={LINE} strokeWidth={1.2} />
      <line x1={cx} y1={cy - R - 16} x2={cx} y2={cy + R + 16} stroke={LINE} strokeWidth={1.2} />
      <text x={cx + R + 24} y={cy + 4} fontSize={12} fill={MUTED} fontFamily={SERIF}>
        Re
      </text>
      <text x={cx + 6} y={cy - R - 20} fontSize={12} fill={MUTED} fontFamily={SERIF}>
        Im
      </text>
      <circle cx={px} cy={py} r={8} fill={GOLD} fillOpacity={0.4} stroke={GOLD} strokeWidth={2} opacity={clamp01(u / 0.3)} />
      <text x={px} y={py - 14} textAnchor="middle" fontSize={15} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
        {labels[iPow]}
      </text>
      <text x={215} y={28} textAnchor="middle" fontSize={15} fill={INK} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.3)}>
        乘 i → 逆時針轉 90°
      </text>
      <Cta x={140} y={CTA_Y} w={150} h={38} label={iPow >= 4 ? '轉晒一圈' : '再乘 i'} onClick={onSpin} done={iPow >= 4} />
    </g>
  )
}

function ComplexBuildScene({ u, shown, onShow }) {
  const cx = 215
  const cy = 125
  return (
    <g>
      <line x1={60} y1={cy} x2={370} y2={cy} stroke={LINE} strokeWidth={1.2} opacity={clamp01(u / 0.3)} />
      <line x1={cx} y1={48} x2={cx} y2={210} stroke={LINE} strokeWidth={1.2} opacity={clamp01(u / 0.3)} />
      <circle cx={cx + 40} cy={cy - 48} r={8} fill={GOLD} fillOpacity={0.4} stroke={GOLD} strokeWidth={2} opacity={clamp01(u / 0.3)} />
      <text x={cx + 40} y={cy - 62} textAnchor="middle" fontSize={13} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
        2+3i
      </text>
      {shown && (
        <g className="fx-pop">
          <circle cx={cx + 40} cy={cy + 48} r={8} fill={OK} fillOpacity={0.4} stroke={OK} strokeWidth={2} />
          <text x={cx + 40} y={cy + 70} textAnchor="middle" fontSize={13} fill={OK} fontFamily={SERIF} fontWeight={700}>
            2−3i
          </text>
          <line x1={cx + 40} y1={cy - 48} x2={cx + 40} y2={cy + 48} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
          <text x={215} y={28} textAnchor="middle" fontSize={15} fill={GOLD} fontFamily={SERIF} fontWeight={700}>
            x² − 4x + 13 = 0
          </text>
        </g>
      )}
      {!shown && (
        <text x={215} y={28} textAnchor="middle" fontSize={15} fill={INK} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.3)}>
          一根：2 + 3i
        </text>
      )}
      <Cta x={130} y={CTA_Y} w={170} h={38} label="顯示共軛根" onClick={onShow} done={shown} />
    </g>
  )
}

function MistakesScene({ u }) {
  const rows = [
    { bad: '分母寫 2（漏 a）', good: '分母一定係 2a' },
    { bad: 'α+β = b/a', good: 'α+β = −b/a' },
    { bad: '得一個複數根', good: '實係數 → 共軛成對' },
  ]
  return (
    <g>
      {rows.map((r, i) => {
        const op = clamp01((u - i * 0.18) / 0.35)
        return (
          <g key={i} opacity={op}>
            <text x={40} y={70 + i * 60} fontSize={14} fill={RED} fontFamily={SERIF} fontWeight={700}>
              ✗ {r.bad}
            </text>
            <text x={40} y={92 + i * 60} fontSize={14} fill={OK} fontFamily={SERIF} fontWeight={700}>
              ✓ {r.good}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function ApplyScene({ u }) {
  const w = 70 + clamp01((u - 0.2) / 0.5) * 40
  const h = w + 36
  return (
    <g>
      <rect
        x={120}
        y={70}
        width={w}
        height={h}
        rx={4}
        fill={BLUE}
        fillOpacity={0.18}
        stroke={BLUE}
        strokeWidth={2}
        opacity={clamp01(u / 0.35)}
      />
      <text x={120 + w / 2} y={70 + h / 2 + 5} textAnchor="middle" fontSize={16} fill={BLUE} fontFamily={SERIF} fontWeight={700} opacity={clamp01(u / 0.35)}>
        面積 40
      </text>
      <text x={120 + w / 2} y={70 + h + 22} textAnchor="middle" fontSize={14} fill={GOLD} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.25) / 0.35)}>
        闊 x
      </text>
      <text x={120 + w + 14} y={70 + h / 2} fontSize={14} fill={OK} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.3) / 0.35)}>
        x+3
      </text>
      <text x={300} y={110} textAnchor="middle" fontSize={16} fill={INK} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.45) / 0.35)}>
        x(x+3)=40
      </text>
      <text x={300} y={145} textAnchor="middle" fontSize={18} fill={GOLD} fontFamily={SERIF} fontWeight={700} opacity={clamp01((u - 0.65) / 0.3)}>
        x=5（−8 捨）
      </text>
    </g>
  )
}

function SummaryScene({ u }) {
  return (
    <g>
      <Chip x={40} y={100} w={110} h={70} f={BLUE} label="公式" sub="求根" op={clamp01(u / 0.3)} />
      <Chip x={160} y={100} w={110} h={70} f={GOLD} label="Δ" sub="交幾點" op={clamp01((u - 0.2) / 0.35)} />
      <Chip x={280} y={100} w={110} h={70} f={OK} label="共軛" sub="成對" op={clamp01((u - 0.4) / 0.35)} />
    </g>
  )
}

function Chip({ x, y, w, h, f, label, sub, op = 1 }) {
  const compact = h < 44
  return (
    <g opacity={op} className={op > 0.2 ? 'fx-rise' : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={compact ? 10 : 12} fill={f} fillOpacity={0.12} stroke={f} strokeWidth={1.8} />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? (compact ? -5 : -4) : 5)}
        textAnchor="middle"
        fontSize={compact ? 14 : 18}
        fill={f}
        fontWeight={700}
        fontFamily={SERIF}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + (compact ? 12 : 18)}
          textAnchor="middle"
          fontSize={compact ? 10 : 12}
          fill={MUTED}
          fontFamily={SERIF}
        >
          {sub}
        </text>
      )}
    </g>
  )
}

function fmtNum(n) {
  const r = Math.round(n * 100) / 100
  return Number.isInteger(r) ? String(r) : String(r)
}
