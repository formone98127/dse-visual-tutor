import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'
import LabStage, { on, FADE } from './LabStage.jsx'

/**
 * K2 有向數 lab — 逐步推演（stage 驅動，11 場景）：
 *   number_line  有向數概念：數線、正負區
 *   opposite     相反數（負負得正）
 *   add_pos      加正數＝數線向右行
 *   add_neg      加負數＝數線向左行
 *   subtract     減 = 加相反數
 *   multiply     乘法符號法則（同正異負）
 *   divide       除法同乘法
 *   mixed_ops    混合運算逐行
 *   real_life    應用：氣溫
 *   mistakes     常犯錯誤
 *   summary      章總結
 */

function Text({ x, y, size = 22, fill = INK, w = 600, children, anchor = 'middle', opacity = 1, vb = false }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={w}
      fontFamily={SERIF} opacity={opacity} dominantBaseline={vb ? 'central' : undefined}>
      {children}
    </text>
  )
}

/** 數線：-5 至 5，y 預設 170 */
function Line({ y = 170, op = 1 }) {
  const ticks = []
  for (let v = -5; v <= 5; v++) {
    const x = 225 + v * 33
    ticks.push(
      <g key={v}>
        <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={v === 0 ? GOLD : LINE} strokeWidth={v === 0 ? 2.4 : 1.6} />
        <text x={x} y={y + 27} textAnchor="middle" fontSize={14} fill={v === 0 ? GOLD : MUTED} fontFamily={SERIF} fontWeight={v === 0 ? 700 : 400}>
          {v}
        </text>
      </g>,
    )
  }
  return (
    <g opacity={op}>
      <line x1={52} y1={y} x2={398} y2={y} stroke={LINE} strokeWidth={2.2} />
      {ticks}
    </g>
  )
}

/** 數線上嘅點 */
function Dot({ v, y = 170, fill = INK, label, op = 1, r = 10 }) {
  const x = 225 + v * 33
  return (
    <g opacity={op}>
      <circle cx={x} cy={y} r={r} fill={fill} fillOpacity={0.25} stroke={fill} strokeWidth={2.4} />
      {label && <text x={x} y={y - r - 8} textAnchor="middle" fontSize={16} fill={fill} fontFamily={SERIF} fontWeight={700}>{label}</text>}
    </g>
  )
}

export default function DirectedLab({ mode, stage = 99 }) {

  /* ---- 1 · 有向數概念 ---- */
  if (mode === 'number_line') {
    return (
      <LabStage title="有向數 · 數線" stage={stage} ds={3}
        lines={[
          [{ t: '正數：大過 0，向右行　（例：+5）', fill: BLUE }],
          [{ t: '負數：細過 0，向左行　（例：−3）', fill: RED }],
          [{ t: '0 唔正唔負，係正負嘅分界', fill: MUTED }],
        ]}
      >
        <Line op={on(0, stage)} />
        <g opacity={on(1, stage)}>
          <Text x={330} y={120} size={15} fill={BLUE}>正數 →</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={118} y={120} size={15} fill={RED}>{'← 負數'}</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Dot v={5} fill={BLUE} label="+5" />
          <Dot v={-3} fill={RED} label="−3" />
        </g>
      </LabStage>
    )
  }

  /* ---- 2 · 相反數 ---- */
  if (mode === 'opposite') {
    return (
      <LabStage title="相反數 · +5 同 −5" stage={stage} ds={2}
        lines={[
          [{ t: '+5 同 −5 隔住 0 對望，距離一樣 — 互為相反數' }],
          [{ t: '負負得正：−(−7) = 7', fill: GOLD, b: true }],
          [{ t: '記法：a 嘅相反數寫 −a', fill: MUTED }],
        ]}
      >
        <Line op={on(0, stage)} />
        <g opacity={on(1, stage)}>
          <Dot v={5} fill={BLUE} label="+5" />
          <Dot v={-5} fill={RED} label="−5" />
          <path d="M 105 128 C 160 92, 290 92, 348 128" fill="none" stroke={GOLD} strokeWidth={2} strokeDasharray="6 5" />
        </g>
        <Text x={225} y={100} size={16} fill={GOLD} w={700} opacity={on(2, stage)}>互為相反數</Text>
      </LabStage>
    )
  }

  /* ---- 3 · 加正數：向右 ---- */
  if (mode === 'add_pos') {
    return (
      <LabStage title="加正數 · (−2) + 5" stage={stage} ds={2}
        lines={[
          [{ t: '由 −2 出發，向右行 5 格：−1 → 0 → 1 → 2 → 3' }],
          [{ t: '(−2) + 5 = ' }, { t: '+3', fill: GOLD, b: true }],
          [{ t: '加正數，答案向右郁', fill: MUTED }],
        ]}
      >
        <Line op={on(0, stage)} />
        <g opacity={on(1, stage)}>
          <Dot v={-2} fill={RED} label="起點 −2" />
        </g>
        <g opacity={on(2, stage)}>
          <path d="M 159 130 C 200 84, 280 84, 322 126" fill="none" stroke={GOLD} strokeWidth={2.4} />
          <path d="M 316 118 L 324 128 L 312 130" fill="none" stroke={GOLD} strokeWidth={2.4} />
          <Text x={240} y={92} size={15} fill={GOLD} w={700}>向右 5 格</Text>
          <Dot v={3} fill={GOLD} label="+3" />
        </g>
      </LabStage>
    )
  }

  /* ---- 4 · 加負數：向左 ---- */
  if (mode === 'add_neg') {
    return (
      <LabStage title="加負數 · (+3) + (−4)" stage={stage} ds={2}
        lines={[
          [{ t: '由 +3 出發，向左行 4 格：2 → 1 → 0 → −1' }],
          [{ t: '(+3) + (−4) = ' }, { t: '−1', fill: GOLD, b: true }],
          [{ t: '加負數，答案向左郁', fill: MUTED }],
        ]}
      >
        <Line op={on(0, stage)} />
        <g opacity={on(1, stage)}>
          <Dot v={3} fill={BLUE} label="起點 +3" />
        </g>
        <g opacity={on(2, stage)}>
          <path d="M 324 130 C 290 84, 235 84, 196 126" fill="none" stroke={RED} strokeWidth={2.4} />
          <path d="M 202 116 L 194 128 L 206 130" fill="none" stroke={RED} strokeWidth={2.4} />
          <Text x={262} y={92} size={15} fill={RED} w={700}>向左 4 格</Text>
          <Dot v={-1} fill={RED} label="−1" />
        </g>
      </LabStage>
    )
  }

  /* ---- 5 · 減 = 加相反數 ---- */
  if (mode === 'subtract') {
    return (
      <LabStage title="減法秘技 · 減 = 加相反數" stage={stage} ds={2}
        lines={[
          [{ t: '2 − (−3) 唔好死諗——減一個負數，即係加佢嘅相反數' }],
          [{ t: '2 − (−3) = 2 + (+3) = ' }, { t: '5', fill: GOLD, b: true }],
          [{ t: '例：0 − 5 = 0 + (−5) = −5', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={80} size={34} w={700}>2 − (−3)</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={140} size={28} fill={GOLD} w={700}>= 2 + (+3)</Text>
          <Text x={215} y={172} size={15} fill={MUTED}>− 變 +，(−3) 變 (+3)</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={222} size={38} fill={GOLD} w={700}>= 5</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 6 · 乘法符號法則 ---- */
  if (mode === 'multiply') {
    const RULES = [
      ['(+) × (+)', '+', OK, 40, 110],
      ['(+) × (−)', '−', RED, 225, 110],
      ['(−) × (+)', '−', RED, 40, 190],
      ['(−) × (−)', '+', OK, 225, 190],
    ]
    return (
      <LabStage title="乘法 · 同號得正，異號得負" stage={stage} ds={2}
        lines={[
          [{ t: '(−3) × (−4)：負 × 負 → 同號 → 得正' }],
          [{ t: '(−3) × (−4) = ' }, { t: '+12', fill: GOLD, b: true }],
          [{ t: '口訣：同號得正，異號得負', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          {RULES.map(([t, sign, c, x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width={165} height={56} rx={12} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth={1.5} />
              <Text x={x + 82} y={y + 14} size={19} vb>{t}</Text>
              <Text x={x + 82} y={y + 42} size={22} fill={c} w={700} vb>{`= ${sign}`}</Text>
            </g>
          ))}
        </g>
        {/* 聚焦同號例子：(−)×(−) 卡亮金框 */}
        <g opacity={on(1, stage)}>
          <rect x={225} y={190} width={165} height={56} rx={12} fill="rgba(251,191,36,0.10)" stroke={GOLD} strokeWidth={2.2} />
        </g>
      </LabStage>
    )
  }

  /* ---- 7 · 除法 ---- */
  if (mode === 'divide') {
    return (
      <LabStage title="除法 · 符號法則同乘法一樣" stage={stage} ds={2}
        lines={[
          [{ t: '同號相除得正：(−12) ÷ (−4) = ' }, { t: '+3', fill: GOLD, b: true }],
          [{ t: '異號相除得負：12 ÷ (−4) = ' }, { t: '−3', fill: GOLD, b: true }],
          [{ t: '先處理符號，再當普通數除', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={80} size={26} fill={GOLD} w={700}>同號 → 正　·　異號 → 負</Text>
        </g>
        <g opacity={on(1, stage)}>
          <rect x={30} y={110} width={175} height={72} rx={12} fill="rgba(184,242,124,0.08)" stroke={OK} strokeWidth={1.6} />
          <Text x={117} y={146} size={19}>(−12) ÷ (−4)</Text>
          <Text x={117} y={172} size={20} fill={OK} w={700}>= +3</Text>
        </g>
        <g opacity={on(2, stage)}>
          <rect x={225} y={110} width={175} height={72} rx={12} fill="rgba(255,107,122,0.08)" stroke={RED} strokeWidth={1.6} />
          <Text x={312} y={146} size={19}>12 ÷ (−4)</Text>
          <Text x={312} y={172} size={20} fill={RED} w={700}>= −3</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 8 · 混合運算 ---- */
  if (mode === 'mixed_ops') {
    return (
      <LabStage title="混合運算 · 先乘除後加減" stage={stage} ds={2}
        lines={[
          [{ t: '原式：(−2) + 3 × (−4)' }],
          [{ t: '先乘：3 × (−4) = −12 → (−2) + (−12)' }],
          [{ t: '後加：−2 − 12 = ' }, { t: '−14', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={85} size={32} w={700}>(−2) + 3 × (−4)</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={150} size={24} fill={GOLD} w={700}>先乘：3 × (−4) = −12</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={215} size={24}>(−2) + (−12)</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 9 · 應用：氣溫 ---- */
  if (mode === 'real_life') {
    return (
      <LabStage title="應用 · 氣溫變化" stage={stage} ds={2}
        lines={[
          [{ t: '昨晚 −5°C，今早升咗 8°C' }],
          [{ t: '(−5) + 8 = ' }, { t: '+3', fill: GOLD, b: true }, { t: '　→ 今早 +3°C', fill: MUTED }],
          [{ t: '同款題目：地下 −2 層上 5 層電梯 → 3 樓', fill: MUTED }],
        ]}
      >
        <Line y={170} op={on(0, stage)} />
        <g opacity={on(1, stage)}>
          <Dot v={-5} fill={RED} label="−5°C" />
        </g>
        <g opacity={on(2, stage)}>
          <path d="M 60 130 C 120 78, 290 78, 350 126" fill="none" stroke={GOLD} strokeWidth={2.4} />
          <path d="M 342 116 L 352 128 L 340 132" fill="none" stroke={GOLD} strokeWidth={2.4} />
          <Text x={205} y={88} size={15} fill={GOLD} w={700}>上升 8°C</Text>
          <Dot v={3} fill={GOLD} label="+3°C" />
        </g>
      </LabStage>
    )
  }

  /* ---- 10 · 常犯錯誤 ---- */
  if (mode === 'mistakes') {
    const card = (x, wrong, right, op) => (
      <g opacity={op}>
        <rect x={x} y={100} width={175} height={130} rx={14} fill="rgba(255,107,122,0.06)" stroke={RED} strokeWidth={1.6} />
        <Text x={x + 87} y={130} size={16} fill={RED} w={700}>✗ 常犯</Text>
        <Text x={x + 87} y={162} size={18}>{wrong}</Text>
        <line x1={x + 30} y1={176} x2={x + 144} y2={176} stroke={RED} strokeWidth={1.2} />
        <Text x={x + 87} y={202} size={17} fill={OK} w={700}>{right}</Text>
      </g>
    )
    return (
      <LabStage title="常犯錯誤 · 千祈唔好中招" stage={stage} ds={2}
        lines={[
          [{ t: '錯誤 1：−3 + 5 唔係 −8 —— 5 大過 3，跟 5 嘅正號 → +2' }],
          [{ t: '錯誤 2：(−2)² = (−2) × (−2) = +4，唔係 −4' }],
          [{ t: '個個都試一次計錯，記住呢兩個就贏', fill: MUTED }],
        ]}
      >
        {card(25, '−3 + 5 = −8', '−3 + 5 = +2', on(0, stage))}
        {card(230, '(−2)² = −4', '(−2)² = +4', on(1, stage))}
        <Text x={215} y={255} size={16} fill={GOLD} w={700} opacity={on(2, stage)}>符號同平方，係有向數兩大陷阱</Text>
      </LabStage>
    )
  }

  /* ---- 11 · 章總結 ---- */
  if (mode === 'summary') {
    const CARDS = [
      ['1', '數線', '正右負左，0 分界'],
      ['2', '相反數', '負負得正'],
      ['3', '加減', '右加左減 · 減=加相反'],
      ['4', '乘除', '同號正 · 異號負'],
      ['5', '應用', '氣溫 · 樓層 · 買賣'],
    ]
    const POS = [[16, 55], [152, 55], [288, 55], [84, 185], [220, 185]]
    return (
      <div className="idx-lab">
        <svg className="vm-svg" viewBox="0 0 430 382" role="img" aria-label="第二章有向數總結">
          {CARDS.map(([num, t, ex], i) => (
            <g key={num} opacity={on(i, stage)} style={FADE}>
              <rect x={POS[i][0]} y={POS[i][1]} width={126} height={112} rx={14} fill="rgba(255,255,255,0.05)" stroke="rgba(242,245,255,0.18)" strokeWidth={1.4} />
              <circle cx={POS[i][0] + 24} cy={POS[i][1] + 28} r={13} fill={GOLD} fillOpacity={0.2} stroke={GOLD} strokeWidth={1.4} />
              <Text x={POS[i][0] + 24} y={POS[i][1] + 28} size={13} fill={GOLD} w={700} vb>{num}</Text>
              <Text x={POS[i][0] + 44} y={POS[i][1] + 28} size={15} w={700} anchor="start" vb>{t}</Text>
              <Text x={POS[i][0] + 63} y={POS[i][1] + 82} size={12} fill={MUTED}>{ex}</Text>
            </g>
          ))}
          {stage >= 5 && (
            <g className="idx-pulse">
              <Text x={215} y={322} size={18} fill={GOLD} w={700}>第二章 · 有向數 ✓ 下一章：K3 近似值</Text>
            </g>
          )}
        </svg>
      </div>
    )
  }

  return null
}
