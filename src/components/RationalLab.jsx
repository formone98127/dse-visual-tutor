import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'

/**
 * K4 有理數與無理數 lab — 逐步推演（stage 驅動，10 場景）：
 *   nth_root    根號 √ 與 n 次方根
 *   irrational  √2 = 1.41421356... 無限不循環 → 無理數
 *   rational    有理數 = 可寫成 p/q
 *   classify    分類：有理 vs 無理
 *   simplify    化簡根式 √8 = 2√2
 *   surd_add    同類根式相加
 *   surd_mul    根式相乘
 *   real_life   應用：正方形邊長 √2
 *   mistakes    常犯錯誤
 *   summary     章總結
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
        <text x={215} y={26} textAnchor="middle" fontSize={25} fill={GOLD} fontWeight={700}
          fontFamily={SERIF} letterSpacing={2}>
          {title}
        </text>
        <g transform="translate(60.2 18.2) scale(0.72)">{children}</g>
        {lines.map((parts, i) => (
          <text key={i} x={50} y={266 + i * 27} opacity={on(ds + i, stage)}
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

export default function RationalLab({ mode, stage = 99 }) {

  /* ---- 1 · 根號與 n 次方根 ---- */
  if (mode === 'nth_root') {
    return (
      <Stage title="根號 · √ 係咩意思" stage={stage} ds={4}
        lines={[
          [{ t: '√16 讀「16 嘅平方根」——邊個數自乘等於 16？' }],
          [{ t: '4 × 4 = 16　→　√16 = ', }, { t: '4', fill: GOLD, b: true }],
          [{ t: '三次方根：∛27 = 3（因為 3 × 3 × 3 = 27）', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={100} size={64} w={700}>√16 = 4</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={170} size={22} fill={MUTED}>√ 呢個符號叫「根號」</Text>
          <Text x={215} y={205} size={24}>邊個數 × 自己 = 16？</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={252} size={28} fill={OK} w={700}>4 × 4 = 16 ✓</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={300} size={22} fill={MUTED}>三次方根：∛27 = 3</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 2 · 無理數：√2 ---- */
  if (mode === 'irrational') {
    // 數線 0 → 2：x 60-370，√2 ≈ 1.414 → x = 60 + (1.414/2)*310 ≈ 279
    return (
      <Stage title="√2 · 一個除唔盡嘅數" stage={stage} ds={4}
        lines={[
          [{ t: '√2 = 1.41421356...　小數位無限延續、永不循環' }],
          [{ t: '唔能夠寫成分數 p/q → 呢類數叫', }, { t: '無理數', fill: RED, b: true }],
          [{ t: '唔好睇小：無理數喺數線上真係有位置', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <line x1={60} y1={170} x2={370} y2={170} stroke={LINE} strokeWidth={2.2} />
          {[0, 1, 2].map((v) => (
            <g key={v}>
              <line x1={60 + v * 155} y1={162} x2={60 + v * 155} y2={178} stroke={LINE} strokeWidth={2} />
              <text x={60 + v * 155} y={200} textAnchor="middle" fontSize={15} fill={MUTED} fontFamily={SERIF}>{v}</text>
            </g>
          ))}
          <line x1={172} y1={162} x2={172} y2={178} stroke={MUTED} strokeWidth={1.2} />
          <line x1={249} y1={162} x2={249} y2={178} stroke={MUTED} strokeWidth={1.2} />
          <text x={210} y={200} textAnchor="middle" fontSize={13} fill={MUTED} fontFamily={SERIF}>0.5</text>
          <text x={288} y={200} textAnchor="middle" fontSize={13} fill={MUTED} fontFamily={SERIF}>1.5</text>
        </g>
        <g opacity={on(1, stage)}>
          <Dot2 x={279} fill={GOLD} label="√2" />
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={105} size={20} fill={GOLD} w={700}>1.4142135623...</Text>
          <Text x={215} y={132} size={15} fill={MUTED}>小數位無限 + 唔循環</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 3 · 有理數 ---- */
  if (mode === 'rational') {
    return (
      <Stage title="有理數 · 寫得到 p/q 就係" stage={stage} ds={4}
        lines={[
          [{ t: '有理數 = 可以寫成 p/q（分數）嘅數' }],
          [{ t: '整數 ✓　分數 ✓　有限小數 ✓　循環小數 ✓' }],
          [{ t: '無理數（√2、π）寫唔成 p/q → 唔係有理數', fill: MUTED }],
        ]}
      >
        {[
          ['5', '5 = 5/1（整數）'],
          ['0.75', '0.75 = 3/4（有限小數）'],
          ['0.333...', '0.333... = 1/3（循環小數）'],
          ['−2', '−2 = −2/1（負整數）'],
        ].map(([num, note], i) => (
          <g key={i} opacity={on(i, stage)} style={FADE}>
            <rect x={40} y={64 + i * 56} width={150} height={44} rx={10} fill="rgba(76,201,240,0.08)" stroke={BLUE} strokeWidth={1.5} />
            <Text x={115} y={64 + i * 56 + 22} size={21} fill={INK} vb>{num}</Text>
            <Text x={210} y={64 + i * 56 + 22} size={17} fill={MUTED} anchor="start" vb>{note}</Text>
          </g>
        ))}
      </Stage>
    )
  }

  /* ---- 4 · 分類練習 ---- */
  if (mode === 'classify') {
    const ITEMS = [
      ['√25', '有理', BLUE, '= 5'],
      ['√7', '無理', RED, ''],
      ['0.5', '有理', BLUE, '= 1/2'],
      ['π', '無理', RED, ''],
      ['−3', '有理', BLUE, '= −3/1'],
      ['√2', '無理', RED, ''],
      ['0.7', '有理', BLUE, '= 7/10'],
      ['√49', '有理', BLUE, '= 7'],
    ]
    return (
      <Stage title="分類 · 有理定無理？" stage={stage} ds={4}
        lines={[
          [{ t: '有理（藍）：√25 = 5 · 0.5 · −3 · 0.7 · √49 = 7' }],
          [{ t: '無理（紅）：√7 · π · √2 —— 開唔盡 / 除唔盡', fill: MUTED }],
          [{ t: '貼士：√ 入面係完全平方 → 有理', fill: MUTED }],
        ]}
      >
        {ITEMS.map(([num, kind, color, note], i) => {
          const x = 24 + (i % 4) * 100
          const y = 64 + Math.floor(i / 4) * 92
          return (
            <g key={i} opacity={on(i % 4 === 0 ? i / 4 : Math.floor(i / 4), stage) && on(Math.floor(i / 4), stage)} style={FADE}>
              <rect x={x} y={y} width={88} height={74} rx={12} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth={1.4} />
              <Text x={x + 44} y={y + 24} size={24} vb>{num}</Text>
              <Text x={x + 44} y={y + 52} size={14} fill={color} w={700}>{kind}</Text>
              {note && <Text x={x + 44} y={y + 68} size={11} fill={MUTED}>{note}</Text>}
            </g>
          )
        })}
      </Stage>
    )
  }

  /* ---- 5 · 化簡根式 ---- */
  if (mode === 'simplify') {
    return (
      <Stage title="化簡根式 · √8 = ?" stage={stage} ds={4}
        lines={[
          [{ t: '搵最大完全平方因數：8 = 4 × 2' }],
          [{ t: '√8 = √4 × √2 = 2√2' }],
          [{ t: '再例：√18 = √9 × √2 = 3√2', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={85} size={44} w={700}>√8</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={150} size={26}>= √(4 × 2)</Text>
          <Text x={215} y={182} size={15} fill={MUTED}>4 係完全平方（2²）</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={224} size={26} fill={GOLD} w={700}>= √4 × √2 = 2√2</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 6 · 同類根式相加 ---- */
  if (mode === 'surd_add') {
    return (
      <Stage title="同類根式 · 加減要同根" stage={stage} ds={4}
        lines={[
          [{ t: '同類根式（√2 同 √2）先可以直接加：' }],
          [{ t: '3√2 + 5√2 = ' }, { t: '8√2', fill: GOLD, b: true }],
          [{ t: '√8 + √2：先化簡 √8 = 2√2 → 2√2 + √2 = 3√2', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={90} size={34} w={700}>3√2 + 5√2</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={150} size={24} fill={MUTED}>= (3 + 5)√2</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={210} size={34} fill={GOLD} w={700}>= 8√2</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 7 · 根式相乘 ---- */
  if (mode === 'surd_mul') {
    return (
      <Stage title="根式相乘 · √a × √b = √ab" stage={stage} ds={4}
        lines={[
          [{ t: '法則：√a × √b = √(ab)' }],
          [{ t: '例 1　√2 × √3 = √6' }],
          [{ t: '例 2　√2 × √8 = √16 = ' }, { t: '4', fill: GOLD, b: true }, { t: '　（乘完記得化簡）', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <Text x={215} y={90} size={32} w={700}>√a × √b = √(ab)</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={160} size={24}>√2 × √3 = √6</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={215} size={24}>√2 × √8 = √16</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={262} size={30} fill={GOLD} w={700}>= 4</Text>
        </g>
      </Stage>
    )
  }

  /* ---- 8 · 應用：正方形邊長 ---- */
  if (mode === 'real_life') {
    return (
      <Stage title="應用 · 面積 2 m² 嘅正方形" stage={stage} ds={4}
        lines={[
          [{ t: '正方形面積 = 邊長² → 邊長 = √面積' }],
          [{ t: '邊長 = √2 m ≈ ' }, { t: '1.41 m', fill: GOLD, b: true }, { t: '（無理數都係實長度！）' }],
          [{ t: '驗算：1.41 × 1.41 ≈ 2 ✓', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <rect x={140} y={70} width={150} height={150} rx={6} fill="rgba(76,201,240,0.08)" stroke={BLUE} strokeWidth={2.2} />
          <Text x={215} y={145} size={26} fill={BLUE} w={700} vb>2 m²</Text>
        </g>
        <g opacity={on(1, stage)}>
          <Text x={215} y={55} size={19} fill={GOLD} w={700}>邊長 = √2 m</Text>
          <line x1={140} y1={70} x2={290} y2={70} stroke={GOLD} strokeWidth={3} />
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={258} size={22} fill={GOLD} w={700}>√2 ≈ 1.41</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={296} size={16} fill={MUTED}>驗算：1.41 × 1.41 ≈ 2 ✓</Text>
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
        <Text x={x + 87} y={162} size={18}>{wrong}</Text>
        <line x1={x + 30} y1={176} x2={x + 144} y2={176} stroke={RED} strokeWidth={1.2} />
        <Text x={x + 87} y={202} size={16} fill={OK} w={700}>{right}</Text>
      </g>
    )
    return (
      <Stage title="常犯錯誤 · 根式兩大陷阱" stage={stage} ds={3}
        lines={[
          [{ t: '陷阱 1：√a + √b 唔等於 √(a+b)——加減唔可以入根號' }],
          [{ t: '陷阱 2：√ 嘅答案係正嗰個（√9 = 3，唔係 ±3）', fill: MUTED }],
        ]}
      >
        {card(25, '√2 + √3 = √5', '√2 + √3 留返咁寫', on(0, stage))}
        {card(230, '√9 + √16 = √25', '3 + 4 = 7 ≠ 5', on(1, stage))}
        <Text x={215} y={278} size={17} fill={GOLD} w={700} opacity={on(2, stage)}>乘除先入得根號，加減唔入！</Text>
      </Stage>
    )
  }

  /* ---- 10 · 章總結 ---- */
  if (mode === 'summary') {
    const CARDS = [
      ['1', '根號', '√16 = 4 · ∛27 = 3'],
      ['2', '無理數', '√2 = 1.41421...'],
      ['3', '有理數', '寫得到 p/q'],
      ['4', '化簡', '√8 = 2√2'],
      ['5', '乘除', '√a×√b = √ab'],
    ]
    const POS = [[16, 55], [152, 55], [288, 55], [84, 185], [220, 185]]
    return (
      <div className="idx-lab">
        <svg className="vm-svg" viewBox="0 0 430 330" role="img" aria-label="第四章有理數與無理數總結">
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
              <Text x={215} y={322} size={18} fill={GOLD} w={700}>第四章 · 有理數與無理數 ✓ 下一章：K5 百分數</Text>
            </g>
          )}
        </svg>
      </div>
    )
  }

  return null
}

function Dot2({ x, fill, label, op = 1 }) {
  return (
    <g opacity={op}>
      <circle cx={x} cy={170} r={10} fill={fill} fillOpacity={0.25} stroke={fill} strokeWidth={2.4} />
      <text x={x} y={140} textAnchor="middle" fontSize={17} fill={fill} fontFamily={SERIF} fontWeight={700}>{label}</text>
    </g>
  )
}
