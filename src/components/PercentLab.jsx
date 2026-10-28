import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'
import { NumBox, NumberedCard } from './LabBits.jsx'

/**
 * K5 百分數的應用 lab — 逐步推演（stage 驅動，10 場景）：
 *   pct_concept   核心公式：百分比變化 = (新 − 舊) ÷ 舊 × 100%
 *   pct_increase  增加：$200 → $260 = +30%
 *   pct_decrease  減少：$250 → $200 = −20%（基數係舊值）
 *   pct_tricky    大陷阱：升 20% 再跌 20% ≠ 原值
 *   profit        盈利百分數（基數 = 成本）
 *   discount      折扣：8 折 = 80%
 *   interest      單利息 I = P × r% × t
 *   real_life     綜合應用：手機減價
 *   mistakes      常犯錯誤
 *   summary       章總結
 */

function Text({ x, y, size = 22, fill = INK, w = 600, children, anchor = 'middle', opacity = 1, vb = false }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={w}
      fontFamily={SERIF} opacity={opacity} dominantBaseline={vb ? 'central' : undefined}>
      {children}
    </text>
  )
}

const on = (k, stage) => (stage >= k ? 1 : 0)
const FADE = { transition: 'opacity 0.4s ease' }

function Stage({ title, stage, children, lines = [], ds = 0 }) {
  return (
    <div className="idx-lab">
      <svg className="vm-svg" viewBox="0 0 430 330" role="img">
        <text x={215} y={22} textAnchor="middle" fontSize={14} fill={GOLD} fontWeight={700}
          fontFamily={SERIF} letterSpacing={2}>
          {title}
        </text>
        <g transform="translate(60.2 18.2) scale(0.72)">{children}</g>
        {lines.map((parts, i) => (
          <text key={i} x={50} y={266 + i * 27} opacity={on(ds + 1 + i, stage)}
            style={FADE} fontFamily={SERIF} fontSize={17.5} fontWeight={600}>
            {parts.map((p, j) => (
              <tspan key={j} fill={p.fill || INK} fontWeight={p.b ? 700 : 600}>{p.t}</tspan>
            ))}
          </text>
        ))}
      </svg>
    </div>
  )
}

/** 柱狀條（由底線向上長） */
function Bar({ x, w = 90, h, y0 = 250, fill, label, value, op }) {
  return (
    <g opacity={op} style={FADE}>
      <rect x={x} y={y0 - h} width={w} height={h} rx={6} fill={fill} fillOpacity={0.3} stroke={fill} strokeWidth={2.2} />
      <Text x={x + w / 2} y={y0 - h - 12} size={19} fill={fill} w={700}>{value}</Text>
      <Text x={x + w / 2} y={y0 + 26} size={15} fill={MUTED}>{label}</Text>
    </g>
  )
}

export default function PercentLab({ mode, stage = 99 }) {

  /* ---- 1 · 核心公式 ---- */
  if (mode === 'pct_concept') {
    return (
      <Stage title="百分比變化 · 核心公式" stage={stage} ds={3}
        lines={[
          [{ t: '「舊值」係基數（分母）——永遠係原本嗰個數' }],
          [{ t: '新 > 舊 → 正數（增加）；新 < 舊 → 負數（減少）', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={90} size={26} fill={GOLD} w={700}>百分比變化 =</Text>
          <Text x={215} y={140} size={28} w={700}>(新 − 舊) ÷ 舊 × 100%</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={200} size={20} fill={OK} w={700}>新 &gt; 舊 → 增加中 ↗</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={238} size={20} fill={RED} w={700}>新 &lt; 舊 → 減少中 ↘</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 2 · 百分比增加 ---- */
  if (mode === 'pct_increase') {
    return (
      <Stage title="增加 · $200 → $260" stage={stage} ds={4}
        lines={[
          [{ t: '第 1 步　變化額：260 − 200 = 60' }],
          [{ t: '第 2 步　以舊值做基數：60 ÷ 200 = 0.3' }],
          [{ t: '結　論　× 100% → 增加 ' }, { t: '30%', fill: GOLD, b: true }],
        ]}
      >
        <line x1={70} y1={250} x2={360} y2={250} stroke={LINE} strokeWidth={1.6} opacity={on(0, stage)} />
        <Bar x={90} h={100} y0={250} fill={BLUE} label="原價" value="$200" op={on(0, stage)} />
        <Bar x={250} h={130} y0={250} fill={GOLD} label="新價" value="$260" op={on(1, stage)} />
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={78} size={21} fill={INK}>(260 − 200) ÷ 200</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={330} y={78} size={24} fill={GOLD} w={700}>= +30%</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 3 · 百分比減少 ---- */
  if (mode === 'pct_decrease') {
    return (
      <Stage title="減少 · $250 → $200" stage={stage} ds={4}
        lines={[
          [{ t: '第 1 步　變化額：200 − 250 = −50' }],
          [{ t: '第 2 步　基數仍然係舊值：−50 ÷ 250 = −0.2' }],
          [{ t: '結　論　× 100% → 減少 ' }, { t: '20%', fill: GOLD, b: true }],
        ]}
      >
        <line x1={70} y1={250} x2={360} y2={250} stroke={LINE} strokeWidth={1.6} opacity={on(0, stage)} />
        <Bar x={90} h={125} y0={250} fill={GOLD} label="原價" value="$250" op={on(0, stage)} />
        <Bar x={250} h={100} y0={250} fill={BLUE} label="新價" value="$200" op={on(1, stage)} />
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={78} size={21} fill={INK}>(200 − 250) ÷ 250</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={335} y={78} size={24} fill={RED} w={700}>= −20%</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 4 · 大陷阱：升跌唔對稱 ---- */
  if (mode === 'pct_tricky') {
    return (
      <Stage title="大陷阱 · 升 20% 再跌 20%" stage={stage} ds={5}
        lines={[
          [{ t: '直覺話「升 20 跌 20 打和」——錯！' }],
          [{ t: '因為基數變咗：240 嘅 20% = 48，唔係 40', fill: MUTED }],
          [{ t: '任何數：升 x% 再跌 x% → 一定細過原本', fill: MUTED }],
        ]}
      >
        <line x1={55} y1={250} x2={375} y2={250} stroke={LINE} strokeWidth={1.6} opacity={on(0, stage)} />
        <Bar x={70} h={100} y0={250} fill={BLUE} label="原價" value="$200" op={on(0, stage)} />
        <Bar x={185} h={120} y0={250} fill={GOLD} label="+20% → $240" value="$240" op={on(1, stage)} />
        <Bar x={300} h={96} y0={250} fill={RED} label="−20% → $192" value="$192" op={on(2, stage)} />
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={296} size={22} fill={RED} w={700}>$192 ≠ $200 — 蝕咗 $8！</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 5 · 盈利 ---- */
  if (mode === 'profit') {
    return (
      <Stage title="盈利 · 基數係成本" stage={stage} ds={4}
        lines={[
          [{ t: '盈利 = 售價 − 成本 = 1000 − 800 = $200' }],
          [{ t: '盈利百分數 = 盈利 ÷ ' }, { t: '成本', fill: GOLD, b: true }, { t: ' × 100% = 200 ÷ 800' }],
          [{ t: '結　論　盈利 ' }, { t: '25%', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <NumBox x={60} y={90} w={140} h={80} label="成本 $800" labelSize={19} labelFill={INK} fill="rgba(76,201,240,0.08)" stroke={BLUE} sw={1.8} />
          <NumBox x={230} y={90} w={140} h={80} label="售價 $1,000" labelSize={19} labelFill={INK} fill="rgba(255,209,102,0.08)" stroke={GOLD} sw={1.8} />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={216} size={22} fill={OK} w={700}>盈利 = 1000 − 800 = $200</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={262} size={22} fill={GOLD} w={700}>200 ÷ 800 × 100% = 25%</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 6 · 折扣 ---- */
  if (mode === 'discount') {
    return (
      <Stage title="折扣 · 標價 $400 打 8 折" stage={stage} ds={4}
        lines={[
          [{ t: '8 折 = 付標價嘅 80%' }],
          [{ t: '售價 = 400 × 80% = ' }, { t: '$320', fill: GOLD, b: true }],
          [{ t: '折扣額 = 400 − 320 = $80（即減 20%）', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={95} size={30} fill={MUTED} w={700}>
            <tspan>$400</tspan>
          </Text>
          <line x1={140} y1={86} x2={290} y2={86} stroke={RED} strokeWidth={3} opacity={0.8} />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={152} size={24} fill={GOLD} w={700}>× 80%（8 折）</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={216} size={36} fill={GOLD} w={700}>= $320</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 7 · 單利息 ---- */
  if (mode === 'interest') {
    return (
      <Stage title="單利息 · I = P × r% × t" stage={stage} ds={4}
        lines={[
          [{ t: '利息 I = 10 000 × 5% × 2 = $1,000' }],
          [{ t: '本利和 = 本金 + 利息 = 10 000 + 1 000 = ' }, { t: '$11,000', fill: GOLD, b: true }],
          [{ t: 'P 本金 · r 年利率 · t 年期', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <NumBox x={55} y={90} w={100} h={80} label="P" labelSize={20} labelFill={BLUE} fill="rgba(76,201,240,0.08)" stroke={BLUE} sw={1.8} note="$10,000 本金" />
          <NumBox x={165} y={90} w={100} h={80} label="r%" labelSize={20} labelFill={GOLD} fill="rgba(255,209,102,0.08)" stroke={GOLD} sw={1.8} note="5% 年利率" />
          <NumBox x={275} y={90} w={100} h={80} label="t" labelSize={20} labelFill={OK} fill="rgba(184,242,124,0.08)" stroke={OK} sw={1.8} note="2 年" />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={225} size={22} fill={OK} w={700}>利息 = 10 000 × 5% × 2 = $1,000</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={268} size={22} fill={GOLD} w={700}>本利和 = $11,000</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 8 · 綜合應用 ---- */
  if (mode === 'real_life') {
    return (
      <Stage title="綜合應用 · 手機減價" stage={stage} ds={4}
        lines={[
          [{ t: '手機原價 $3,000，減 15% —— 售價？' }],
          [{ t: '減 15% = 付 85% → 3 000 × 85%' }],
          [{ t: '售價 = ' }, { t: '$2,550', fill: GOLD, b: true }, { t: '　（慳咗 $450）', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={90} size={32} w={700}>$3,000</Text>
          <Text x={215} y={122} size={16} fill={MUTED}>原價</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={170} size={26} fill={RED} w={700}>↓ 減 15%</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={234} size={36} fill={GOLD} w={700}>$2,550</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 9 · 常犯錯誤 ---- */
  if (mode === 'mistakes') {
    const card = (x, wrong, right, op) => (
      <g opacity={op} style={FADE}>
        <rect x={x} y={100} width={175} height={130} rx={14} fill="rgba(255,107,122,0.06)" stroke={RED} strokeWidth={1.6} />
        <Text x={x + 87} y={130} size={16} fill={RED} w={700}>✗ 常犯</Text>
        <Text x={x + 87} y={160} size={17}>{wrong}</Text>
        <line x1={x + 30} y1={176} x2={x + 144} y2={176} stroke={RED} strokeWidth={1.2} />
        <Text x={x + 87} y={202} size={15} fill={OK} w={700}>{right}</Text>
      </g>
    )
    return (
      <Stage title="常犯錯誤 · 基數與對稱" stage={stage} ds={3}
        lines={[
          [{ t: '陷阱 1：升跌唔對稱 — 基數每次都唔同' }],
          [{ t: '陷阱 2：盈利 % 嘅基數係「成本」，唔係售價', fill: MUTED }],
        ]}
      >
        {card(25, '200 升 20% 跌 20% = 200', '實際 = 192', on(0, stage))}
        {card(230, '盈利 % 用售價計', '基數 = 成本', on(1, stage))}
        <Text x={215} y={278} size={17} fill={GOLD} w={700} opacity={on(2, stage)}>每一步都問自己：而家個基數係邊個？</Text>
      </Stage>
    )
  }

  /* ---- 10 · 章總結 ---- */
  if (mode === 'summary') {
    const CARDS = [
      ['1', '變化公式', '(新−舊)÷舊×100%'],
      ['2', '增減', '基數 = 舊值'],
      ['3', '盈利', '基數 = 成本'],
      ['4', '折扣', '8 折 = × 80%'],
      ['5', '單利息', 'P × r% × t'],
    ]
    const POS = [[16, 55], [152, 55], [288, 55], [84, 185], [220, 185]]
    return (
      <div className="idx-lab">
        <svg className="vm-svg" viewBox="0 0 430 330" role="img" aria-label="第五章百分數總結">
          {CARDS.map(([num, t, ex], i) => (
            <NumberedCard key={num} x={POS[i][0]} y={POS[i][1]} num={num} title={t} note={ex} op={on(i, stage)} />
          ))}
          <g className="idx-pulse" opacity={on(5, stage)}>
            <Text x={215} y={322} size={18} fill={GOLD} w={700}>第五章 · 百分數的應用 ✓ 下一章：K6 率、比與比例</Text>
          </g>
        </svg>
      </div>
    )
  }

  return null
}
