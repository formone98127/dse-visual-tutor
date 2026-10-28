import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'

/**
 * K3 近似值與數值估計 lab — 逐步推演（stage 驅動，8 場景）：
 *   concept      近似值概念（真值 vs 近似，數線）
 *   decimal_round 四捨五入到小數位（3.14159）
 *   sig_fig      有效數字（3.14159 · 0.02046）
 *   round_place  整數位：十 / 百 / 千（2 748）
 *   estimate     估算策略：湊整速算
 *   real_life    應用：購物找續
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

export default function ApproxLab({ mode, stage = 99 }) {

  /* ---- 1 · 近似值概念：171.3 cm ---- */
  if (mode === 'concept') {
    // 數線 170 → 172（x 60-370）
    const vx = (v) => 60 + ((v - 170) / 2) * 310
    return (
      <Stage title="近似值 · 真值 vs 近似值" stage={stage} ds={3}
        lines={[
          [{ t: '真值 171.3 cm 通常唔會話人知咁精確' }],
          [{ t: '近似到個位（cm）：171.3 → ' }, { t: '171 cm', fill: GOLD, b: true }],
          [{ t: '近似值 = 溝通夠用就得，唔使絕對精確', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <line x1={60} y1={150} x2={370} y2={150} stroke={LINE} strokeWidth={2.2} />
          {[170, 171, 172].map((v) => (
            <g key={v}>
              <line x1={vx(v)} y1={143} x2={vx(v)} y2={157} stroke={LINE} strokeWidth={2} />
              <text x={vx(v)} y={180} textAnchor="middle" fontSize={15} fill={MUTED} fontFamily={SERIF}>{v}</text>
            </g>
          ))}
          {[0.3, 0.5, 0.7, 0.9, 0.1].map((d) => (
            <line key={d} x1={vx(170 + d)} y1={146} x2={vx(170 + d)} y2={154} stroke={MUTED} strokeWidth={1} opacity={0.5} />
          ))}
        </g>
        <g opacity={on(1, stage)}>
          <circle cx={vx(171.3)} cy={150} r={9} fill={GOLD} fillOpacity={0.3} stroke={GOLD} strokeWidth={2.4} />
          <Text x={vx(171.3)} y={118} size={17} fill={GOLD} w={700}>真值 171.3</Text>
        </g>
        <g opacity={on(2, stage)}>
          <path d={`M ${vx(171.3)} 165 C ${vx(171.3)} 200, ${vx(171)} 190, ${vx(171)} 168`} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="5 4" />
          <Text x={vx(171) - 8} y={218} size={16} fill={BLUE} w={700}>近似到 cm → 171</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 2 · 四捨五入到小數位：3.14159 → 2 d.p. ---- */
  if (mode === 'decimal_round') {
    // 數字位:3 . 1 4 | 1 5 9 — x 由 118 起,每 42px
    const dx = [118, 160, 202, 244, 286, 328, 370]
    return (
      <Stage title="四捨五入 · 3.14159（2 位小數）" stage={stage} ds={3}
        lines={[
          [{ t: '第 1 步　保留 2 位小數：3.14　睇後一個位：' }, { t: '1', fill: RED, b: true }],
          [{ t: '第 2 步　1 < 5 → 捨去（唔進位）' }],
          [{ t: '結　論　3.14159 ≈ ' }, { t: '3.14（2 d.p.）', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} fontFamily={SERIF} fontSize={44} fontWeight={600} textAnchor="middle">
          <text x={dx[0]} y={120} fill={INK}>3</text>
          <text x={dx[1]} y={112} fill={MUTED}>.</text>
          <text x={dx[2]} y={120} fill={INK}>1</text>
          <text x={dx[3]} y={120} fill={INK}>4</text>
          <g opacity={on(2, stage)}>
            <text x={dx[4]} y={120} fill={RED}>1</text>
            <text x={dx[5]} y={120} fill={MUTED}>5</text>
            <text x={dx[6]} y={120} fill={MUTED}>9</text>
          </g>
        </g>
        <g opacity={on(1, stage)}>
          <path d={`M ${dx[2] - 22} 138 L ${dx[3] + 22} 138`} stroke={OK} strokeWidth={3} strokeLinecap="round" fill="none" />
          <Text x={(dx[2] + dx[3]) / 2} y={162} size={14} fill={OK} w={700}>保留呢兩位</Text>
        </g>
        <g opacity={on(2, stage)}>
          <rect x={dx[4] - 20} y={86} width={40} height={48} rx={8} fill="none" stroke={RED} strokeWidth={2.4} />
          <Text x={dx[4]} y={162} size={14} fill={RED} w={700}>睇呢個位</Text>
        </g>
        <Text x={215} y={228} size={26} fill={GOLD} w={700} opacity={on(3, stage)}>3.14159 ≈ 3.14</Text>
      </Stage>
    )
  }

  /* ---- 3 · 有效數字 ---- */
  if (mode === 'sig_fig') {
    return (
      <Stage title="有效數字 · 由第一個非零開始數" stage={stage} ds={3}
        lines={[
          [{ t: '3.14159 → 3 位有效：3、1、4 → ' }, { t: '3.14', fill: GOLD, b: true }],
          [{ t: '0.02046：前面兩個 0 唔算，由 2 開始數' }],
          [{ t: '0.02046 → 3 位有效 → ' }, { t: '0.0205', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} fontFamily={SERIF} fontSize={34} fontWeight={600} textAnchor="middle">
          <text x={215} y={80}>
            <tspan fill={GOLD}>3</tspan>
            <tspan fill={GOLD}>1</tspan>
            <tspan fill={GOLD}>4</tspan>
            <tspan fill={MUTED}>159</tspan>
          </text>
          <Text x={330} y={80} size={14} fill={MUTED} anchor="start">← 數 3 個</Text>
        </g>
        <g opacity={on(1, stage)} fontFamily={SERIF} fontSize={34} fontWeight={600} textAnchor="middle">
          <text x={215} y={160}>
            <tspan fill={MUTED}>0.0</tspan>
            <tspan fill={GOLD}>2</tspan>
            <tspan fill={GOLD}>0</tspan>
            <tspan fill={GOLD}>4</tspan>
            <tspan fill={MUTED}>6</tspan>
          </text>
          <Text x={330} y={160} size={14} fill={MUTED} anchor="start">← 都係 3 個</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={210} size={19} fill={GOLD} w={700}>0.02046 ≈ 0.0205（3 s.f.）</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 4 · 整數位：2 748 → 十 / 百 / 千 ---- */
  if (mode === 'round_place') {
    return (
      <Stage title="四捨五入 · 2 748 到十 / 百 / 千" stage={stage} ds={3}
        lines={[
          [{ t: '到十位　睇個位 8 ≥ 5 → 進 1 → ' }, { t: '2 750', fill: GOLD, b: true }],
          [{ t: '到百位　睇十位 4 < 5 → 捨　→ ' }, { t: '2 700', fill: GOLD, b: true }],
          [{ t: '到千位　睇百位 7 ≥ 5 → 進 1 → ' }, { t: '3 000', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} fontFamily={SERIF} fontSize={52} fontWeight={600} textAnchor="middle">
          <text x={125} y={120} fill={BLUE}>2</text>
          <text x={195} y={120} fill={GOLD}>7</text>
          <text x={265} y={120} fill={OK}>4</text>
          <text x={335} y={120} fill={RED}>8</text>
        </g>
        <g opacity={on(0, stage)}>
          {[['千', 125], ['百', 195], ['十', 265], ['個', 335]].map(([t, x]) => (
            <Text key={t} x={x} y={156} size={15} fill={MUTED}>{t}</Text>
          ))}
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={200} size={19}>個位 8 → 幫十位進 1：74 + 1 = 75</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={232} size={19}>十位 4 細過 5 → 百位唔進：27 → 尾兩位變 00</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 5 · 估算策略：湊整 ---- */
  if (mode === 'estimate') {
    return (
      <Stage title="估算 · 湊整速算" stage={stage} ds={3}
        lines={[
          [{ t: '原式　4.98 × 5.12　（條數好醜）' }],
          [{ t: '湊整　≈ 5 × 5 = ' }, { t: '25', fill: GOLD, b: true }],
          [{ t: '真值　25.4976 —— 估計 25，差好少', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={85} size={34} w={700}>4.98 × 5.12</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={150} size={26} fill={GOLD} w={700}>≈ 5 × 5</Text>
          <Text x={215} y={182} size={15} fill={MUTED}>4.98 好近 5 · 5.12 好近 5</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={236} size={38} fill={GOLD} w={700}>= 25</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 6 · 應用：購物 ---- */
  if (mode === 'real_life') {
    return (
      <Stage title="應用 · 購物估計" stage={stage} ds={3}
        lines={[
          [{ t: '每件 $49.9，買 3 件 —— 大約要帶幾多錢？' }],
          [{ t: '估計：$50 × 3 = ' }, { t: '$150', fill: GOLD, b: true }],
          [{ t: '真值 $149.70 —— 估 $150 啱啱好，仲知要啲零頭', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={85} size={30} w={700}>$49.9 × 3</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={152} size={26} fill={GOLD} w={700}>$49.9 ≈ $50</Text>
          <Text x={215} y={186} size={15} fill={MUTED}>差 $0.1，當佢 $50 好計得多</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={236} size={36} fill={GOLD} w={700}>$50 × 3 = $150</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 7 · 常犯錯誤 ---- */
  if (mode === 'mistakes') {
    const card = (x, wrong, right, op) => (
      <g opacity={op}>
        <rect x={x} y={100} width={175} height={130} rx={14} fill="rgba(255,107,122,0.06)" stroke={RED} strokeWidth={1.6} />
        <Text x={x + 87} y={130} size={16} fill={RED} w={700}>✗ 常犯</Text>
        <Text x={x + 87} y={162} size={18}>{wrong}</Text>
        <line x1={x + 30} y1={176} x2={x + 144} y2={176} stroke={RED} strokeWidth={1.2} />
        <Text x={x + 87} y={202} size={16} fill={OK} w={700}>{right}</Text>
      </g>
    )
    return (
      <Stage title="常犯錯誤 · 兩大陷阱" stage={stage} ds={3}
        lines={[
          [{ t: '陷阱 1：有效數字由「第一個非零」開始數，0 唔算' }],
          [{ t: '陷阱 2：剛好 5 都要進位（四捨「五」入，5 就係入）' }],
          [{ t: '例：2.65 → 1 d.p. = 2.7，唔係 2.6', fill: MUTED }],
        ]}
      >
        {card(25, '0.02046 → 204', '→ 0.0205', on(0, stage))}
        {card(230, '2.65 → 2.6', '→ 2.7', on(1, stage))}
        <Text x={215} y={278} size={16} fill={GOLD} w={700} opacity={on(2, stage)}>前一個位先係「判官」，5 就進</Text>
      </Stage>
    )
  }

  /* ---- 8 · 章總結 ---- */
  if (mode === 'summary') {
    const CARDS = [
      ['1', '近似概念', '真值 vs 近似'],
      ['2', '四捨五入', '睇後一位定進捨'],
      ['3', '有效數字', '由非零開始數'],
      ['4', '估算策略', '湊整心算速查'],
      ['5', '現實應用', '購物 · 找續'],
    ]
    const POS = [[16, 55], [152, 55], [288, 55], [84, 185], [220, 185]]
    return (
      <div className="idx-lab">
        <svg className="vm-svg" viewBox="0 0 430 330" role="img" aria-label="第三章近似值總結">
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
              <Text x={215} y={322} size={18} fill={GOLD} w={700}>第三章 · 近似值與估計 ✓ 下一章：K4 有理數與無理數</Text>
            </g>
          )}
        </svg>
      </div>
    )
  }

  return null
}
