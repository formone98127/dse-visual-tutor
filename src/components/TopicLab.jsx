import { useLayoutEffect, useRef, useState } from 'react'
import LabStage, { on, FADE } from './LabStage.jsx'
import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'
import { TOPIC_SCENES, topicSteps } from '../data/topicLabs.js'

/**
 * TopicLab — 其餘 PRE-DSE 章節共用舞台。
 * mode 格式「章.場景」（例 k8.solve）；場景資料喺 src/data/topicLabs.js。
 * 圖示元素逐段淡入（on/FADE），同 K1–K6 現有風格一致。
 */

/** 粗略估算文字闊度（中文 1em、西文約 0.55em）——用嚟決定卡片字要唔要縮 */
function textW(str, fontSize) {
  let w = 0
  for (const ch of String(str)) {
    const c = ch.codePointAt(0)
    if (c < 0x2e80) w += fontSize * 0.55
    else w += fontSize
  }
  return w
}

function Art({ el, stage }) {
  const vis = on(el.at || 0, stage)
  const common = { opacity: vis, style: FADE }
  const f = el.f || INK
  // 線條類：無 dash → 畫出嚟；有 dash → 流動虛線
  const strokeCls = vis ? (el.dash ? 'fx-march' : 'fx-draw') : undefined
  const pathLen = el.dash ? undefined : 1

  switch (el.k) {
    case 't':
      return (
        <text {...common} className={vis ? 'fx-pop' : undefined} x={el.x} y={el.y} textAnchor={el.a || 'middle'} fontSize={el.s || 22}
          fill={el.f || INK} fontWeight={el.w || 600} fontFamily={SERIF}>
          {el.text}
        </text>
      )
    case 'chip': {
      // 卡片文字自動縮：估算闊度超過卡內寬度就逐級縮字，唔會撐出圓角框
      const inner = el.w - 18
      let size = el.s || 20
      if (el.label != null) {
        while (size > 11 && textW(el.label, size) > inner) size -= 0.5
      }
      const subSize = el.sub && textW(el.sub, 12.5) > inner
        ? Math.max(9, 12.5 * (inner / textW(el.sub, 12.5)))
        : 12.5
      return (
        <g {...common} className={vis ? 'fx-rise' : undefined}>
          <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={12} fill={f} fillOpacity={0.12} stroke={f} strokeWidth={1.8} />
          {el.label != null && (
            <text x={el.x + el.w / 2} y={el.y + el.h / 2 + (el.sub ? -4 : size * 0.35)} textAnchor="middle" fontSize={size}
              fill={f} fontWeight={700} fontFamily={SERIF}>{el.label}</text>
          )}
          {el.sub && (
            <text x={el.x + el.w / 2} y={el.y + el.h / 2 + 22} textAnchor="middle" fontSize={subSize}
              fill={MUTED} fontFamily={SERIF}>{el.sub}</text>
          )}
        </g>
      )
    }
    case 'blocks':
      return (
        <g {...common}>
          {Array.from({ length: el.n }).map((_, i) => (
            <rect key={i} x={el.x + i * ((el.size || 22) + (el.gap ?? 8))} y={el.y} width={el.size || 22} height={el.size || 22} rx={5}
              fill={f} fillOpacity={0.3} stroke={f} strokeWidth={1.6}
              className={vis ? 'fx-pop' : undefined} style={{ animationDelay: vis ? `${i * 0.07}s` : undefined }} />
          ))}
        </g>
      )
    case 'bar':
      return (
        <g {...common}>
          <rect x={el.x} y={el.y0 - el.h} width={el.w || 60} height={el.h} rx={5} fill={f} fillOpacity={0.3} stroke={f} strokeWidth={2}
            className={vis ? 'fx-grow-y' : undefined} />
          <text x={el.x + (el.w || 60) / 2} y={el.y0 - el.h - 8} textAnchor="middle" fontSize={14} fill={f} fontWeight={700} fontFamily={SERIF}>{el.value ?? ''}</text>
          {el.label && <text x={el.x + (el.w || 60) / 2} y={el.y0 + 18} textAnchor="middle" fontSize={12.5} fill={MUTED} fontFamily={SERIF}>{el.label}</text>}
        </g>
      )
    case 'line':
      return <line {...common} className={strokeCls} pathLength={pathLen} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke={el.f || LINE} strokeWidth={el.w || 2} strokeDasharray={el.dash} />
    case 'arrow':
      return (
        <g {...common}>
          <line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke={el.f || GOLD} strokeWidth={2.4}
            className={vis ? 'fx-draw' : undefined} pathLength={1} />
          <path d={`M ${el.x2} ${el.y2} L ${el.x2 - 9} ${el.y2 - 6} M ${el.x2} ${el.y2} L ${el.x2 - 9} ${el.y2 + 6}`} fill="none" stroke={el.f || GOLD} strokeWidth={2.4} strokeLinecap="round"
            className={vis ? 'fx-pop' : undefined} style={{ animationDelay: vis ? '0.4s' : undefined }} />
        </g>
      )
    case 'dot':
      return (
        <g {...common} className={vis ? 'fx-pop' : undefined}>
          <circle cx={el.x} cy={el.y} r={el.r || 6} fill={f} fillOpacity={0.3} stroke={f} strokeWidth={2} />
          {el.label && <text x={el.x} y={el.y - (el.r || 6) - 6} textAnchor="middle" fontSize={13} fill={f} fontWeight={700} fontFamily={SERIF}>{el.label}</text>}
        </g>
      )
    case 'circle':
      return <circle {...common} className={strokeCls} pathLength={pathLen} cx={el.x} cy={el.y} r={el.r} fill={el.fill ? f : 'none'} fillOpacity={el.fill ? 0.12 : undefined} stroke={el.f || LINE} strokeWidth={el.w || 1.8} strokeDasharray={el.dash} />
    case 'rect':
      return <rect {...common} className={strokeCls} pathLength={pathLen} x={el.x} y={el.y} width={el.w} height={el.h} rx={el.rx ?? 6} fill={el.fill ? f : 'none'} fillOpacity={el.fill ? 0.1 : undefined} stroke={el.f || LINE} strokeWidth={el.w || 1.8} strokeDasharray={el.dash} />
    case 'path':
      return <path {...common} className={strokeCls} pathLength={pathLen} d={el.d} fill="none" stroke={el.f || GOLD} strokeWidth={el.w || 2.2} strokeDasharray={el.dash} strokeLinecap="round" />
    case 'check':
      return (
        <text {...common} className={vis ? 'fx-pop-bounce' : undefined} x={el.x} y={el.y} textAnchor="middle" fontSize={el.s || 30} fill={OK} fontWeight={700}>✓</text>
      )
    case 'cross':
      return (
        <text {...common} className={vis ? 'fx-shake-in' : undefined} x={el.x} y={el.y} textAnchor="middle" fontSize={el.s || 22} fill={RED} fontWeight={700}>{el.text || '✗'}</text>
      )
    default:
      return null
  }
}

export default function TopicLab({ mode, stage = 99 }) {
  const dot = mode.indexOf('.')
  const chapter = dot < 0 ? '' : mode.slice(0, dot)
  const scene = dot < 0 ? null : TOPIC_SCENES[chapter] && TOPIC_SCENES[chapter][mode.slice(dot + 1)]

  // 用瀏覽器真實邊界自我置中：渲染後量一次 getBBox，計出偏移再套 transform。
  // 曲線、圓弧、字寬全部由瀏覽器計，比人手估算準。
  const artRef = useRef(null)
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    const g = artRef.current
    if (!g || !scene) return
    const bb = g.getBBox()
    if (!bb.width) return
    const off = 215 - (bb.x + bb.width / 2)
    // 差太少唔郁；太闊（已經貼邊）都唔郁，免得推出界
    const next = Math.abs(off) < 6 || bb.width > 408 ? 0 : Math.round(off)
    setShift((prev) => (Math.abs(prev - next) > 1 ? next : prev))
  })

  if (!scene) return null

  return (
    <LabStage
      title={scene.title}
      stage={stage}
      ds={scene.ds ?? 0}
      lines={scene.lines}
    >
      <g ref={artRef} transform={shift ? `translate(${shift} 0)` : undefined}>
        {(scene.art || []).map((el, i) => (
          <Art key={i} el={el} stage={stage} />
        ))}
      </g>
      {scene.extra ? scene.extra(stage) : null}
    </LabStage>
  )
}

export { topicSteps }
