import { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF } from '../lib/palette.js'
import { clamp01 } from '../lib/labMotion.js'
import { NumBox, NumberedCard } from './LabBits.jsx'
import LabStage, { on, FADE } from './LabStage.jsx'

/**
 * K1 基本運算 lab — 逐步推演（stage 驅動，唔係自動播放）。
 *
 * 用戶每撳一下 Next（或 ↓ / Space），揭一個元素 / 一行推演；
 * 揭晒成頁（stage = steps - 1）先會跳下一頁。
 * stage 由 App 傳入（0 起）；每頁段數喺 lessons.js beats 嘅 steps 欄。
 */

function Text({ x, y, size = 22, fill = INK, w = 600, children, anchor = 'middle', opacity = 1, vb = false }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={w}
      fontFamily={SERIF} opacity={opacity} dominantBaseline={vb ? 'central' : undefined}>
      {children}
    </text>
  )
}

function Frac({ x, y, n, d, size = 24, fill = INK, w = 22 }) {
  return (
    <g fontFamily={SERIF} fontWeight={600} fontSize={size} fill={fill} textAnchor="middle">
      <text x={x} y={y - 8}>{n}</text>
      <line x1={x - w} y1={y + 4} x2={x + w} y2={y + 4} stroke={fill} strokeWidth={2} />
      <text x={x} y={y + 30}>{d}</text>
    </g>
  )
}

/** 圖形/行嘅顯示狀態：stage >= k → 1，否則 0（CSS transition 負責淡入） */

export default function BasicLab({ mode, stage = 99 }) {
  /* ---- 1 · 整除性 4：316（steps 4：數字 → 底線 → 行1 → 行2 → 行3） ---- */
  if (mode === 'div4') {
    return (
      <LabStage title="整除性檢驗 ① · ÷4" stage={stage} ds={2}
        lines={[
          [{ t: '尾兩位 16 ÷ 4 = 4 無餘數 ' }, { t: '✓', fill: OK, b: true }],
          [{ t: '∴ 316 係 4 嘅倍數，' }, { t: '316 ÷ 4 = 79', fill: GOLD, b: true }],
          [{ t: '÷8 就睇尾三位：1,024 → 024 ÷ 8 ✓ → 128', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <text x={150} y={140} fontFamily={SERIF} fontSize={76} fontWeight={600}>
            <tspan fill={INK}>3</tspan>
            <tspan fill={GOLD}>16</tspan>
          </text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <line x1={188} y1={158} x2={288} y2={158} stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" />
          <Text x={238} y={192} size={16} fill={MUTED}>尾兩位</Text>
        </g>
        <Text x={215} y={262} size={30} fill={OK} w={700} opacity={on(2, stage)} style={FADE}>✓</Text>
      </LabStage>
    )
  }

  /* ---- 2 · 整除性 8：1,024 ---- */
  if (mode === 'div8') {
    return (
      <LabStage title="整除性檢驗 ② · ÷8" stage={stage} ds={2}
        lines={[
          [{ t: '尾三位 024 即 24，24 ÷ 8 = 3 無餘數 ' }, { t: '✓', fill: OK, b: true }],
          [{ t: '∴ 1,024 係 8 嘅倍數，' }, { t: '1,024 ÷ 8 = 128', fill: GOLD, b: true }],
          [{ t: '口訣：÷4 睇尾兩位 · ÷8 睇尾三位', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <text x={96} y={140} fontFamily={SERIF} fontSize={72} fontWeight={600}>
            <tspan fill={INK}>1,0</tspan>
            <tspan fill={GOLD}>24</tspan>
          </text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <line x1={238} y1={158} x2={334} y2={158} stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" />
          <Text x={286} y={192} size={16} fill={MUTED}>尾三位 = 24</Text>
        </g>
        <Text x={215} y={262} size={30} fill={OK} w={700} opacity={on(2, stage)} style={FADE}>✓</Text>
      </LabStage>
    )
  }

  /* ---- 3 · 整除性 9：477 ---- */
  if (mode === 'div9') {
    const boxes = [
      { x: 110, d: '4' },
      { x: 190, d: '7' },
      { x: 270, d: '7' },
    ]
    return (
      <LabStage title="整除性檢驗 ③ · ÷9 睇數字和" stage={stage} ds={4}
        lines={[
          [{ t: '數字和 4 + 7 + 7 = 18 → 1 + 8 = 9 ' }, { t: '✓', fill: OK, b: true }],
          [{ t: '∴ 477 係 9 嘅倍數，' }, { t: '477 ÷ 9 = 53', fill: GOLD, b: true }],
          [{ t: '÷3 同一招：數字和 18 ÷ 3 得 ✓', fill: MUTED }],
        ]}
      >
        {boxes.map((b, i) => (
          <g key={i} opacity={on(i, stage)} style={FADE}>
            <NumBox x={b.x} y={70} w={56} h={56} rx={12} label={b.d} labelSize={32} sw={2} />
            {i < 2 && <Text x={b.x + 70} y={98} size={26} fill={MUTED} vb>{'+'}</Text>}
          </g>
        ))}
        <g opacity={on(3, stage)} style={FADE}>
          <path d="M 215 145 L 215 175 M 208 168 L 215 178 L 222 168" fill="none" stroke={MUTED} strokeWidth={2} />
          <Text x={215} y={218} size={30} fill={GOLD} w={700}>4 + 7 + 7 = 18</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 4 · 整除性 6：258 ---- */
  if (mode === 'div6') {
    const card = (x, title, l1, l2, op) => (
      <g opacity={op} style={FADE}>
        <rect x={x} y={110} width={170} height={120} rx={14} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth={1.6} />
        <Text x={x + 85} y={140} size={16} fill={GOLD} w={700}>{title}</Text>
        <Text x={x + 85} y={172} size={17}>{l1}</Text>
        <Text x={x + 85} y={200} size={17} fill={OK} w={700}>{l2}</Text>
      </g>
    )
    return (
      <LabStage title="整除性檢驗 ④ · ÷6 = 過兩關" stage={stage} ds={3}
        lines={[
          [{ t: '第一關 俾 2：尾位 8 係雙數 ✓' }],
          [{ t: '第二關 俾 3：2 + 5 + 8 = 15，15 ÷ 3 ✓' }],
          [{ t: '兩關都過 ∴ 258 ÷ 6 = 43', fill: GOLD, b: true }],
        ]}
      >
        <g className="idx-pulse" opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={80} size={34} fill={GOLD} w={700}>6 = 2 × 3</Text>
        </g>
        {card(25, '第一關 · 俾 2 整除', '258 尾位係 8', '雙數 ✓', on(1, stage))}
        {card(235, '第二關 · 俾 3 整除', '2+5+8 = 15', '15 ÷ 3 ✓', on(2, stage))}
      </LabStage>
    )
  }

  /* ---- 5 · 冪 ---- */
  if (mode === 'power') {
    return (
      <LabStage title="冪 · aⁿ = n 個 a 相乘" stage={stage} ds={4}
        lines={[
          [{ t: '2³ = 2 × 2 × 2 = ' }, { t: '8', fill: GOLD, b: true }, { t: '　　5² = 5 × 5 = ' }, { t: '25', fill: GOLD, b: true }],
          [{ t: '10⁴ = 10 × 10 × 10 × 10 = ' }, { t: '10 000', fill: GOLD, b: true }],
          [{ t: '錯例：2³ ≠ 2 × 3 = 6 ✗ 指數唔係乘數！', fill: RED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={130} y={140} size={84}>2</Text>
          <Text x={185} y={100} size={48} fill={GOLD}>3</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <line x1={100} y1={120} x2={70} y2={95} stroke={MUTED} strokeWidth={1.4} />
          <Text x={62} y={88} size={16} fill={MUTED} anchor="end">基數（乘嘅係佢）</Text>
          <line x1={198} y1={82} x2={228} y2={58} stroke={MUTED} strokeWidth={1.4} />
          <Text x={234} y={52} size={16} fill={GOLD}>指數（乘幾多次）</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={300} y={140} size={30}>{'= 2 × 2 × 2'}</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={310} y={196} size={38} fill={GOLD} w={700}>{'= 8'}</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 6 · 質因數分解樹（60） ---- */
  if (mode === 'tree') {
    const Node = ({ x, y, t, prime, op }) => (
      <g opacity={op} style={FADE}>
        <circle cx={x} cy={y} r={21} fill={prime ? 'rgba(255,209,102,0.15)' : 'rgba(255,255,255,0.05)'}
          stroke={prime ? GOLD : LINE} strokeWidth={prime ? 2.2 : 1.6} />
        <Text x={x} y={y} size={21} fill={prime ? GOLD : INK} w={700} vb>{t}</Text>
      </g>
    )
    const Edge = ({ x1, y1, x2, y2, op }) => (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={MUTED} strokeWidth={1.6} opacity={op} style={FADE} />
    )
    return (
      <LabStage title="質因數分解 · 60 = ?" stage={stage} ds={4}
        lines={[
          [{ t: '60 = 2 × 2 × 3 × 5 = ' }, { t: '2² × 3 × 5', fill: GOLD, b: true }],
          [{ t: '一路拆，拆到淨係剩質數（金圈）先停' }],
          [{ t: '之後 HCF / LCM 就係靠呢串質因數', fill: MUTED }],
        ]}
      >
        <Node x={215} y={38} t="60" op={on(0, stage)} />
        <g opacity={on(1, stage)} style={FADE}>
          <Edge x1={200} y1={52} x2={148} y2={106} op={1} />
          <Edge x1={230} y1={52} x2={282} y2={106} op={1} />
          <Node x={140} y={124} t="2" prime op={1} />
          <Node x={290} y={124} t="30" op={1} />
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Edge x1={275} y1={138} x2={243} y2={182} op={1} />
          <Edge x1={305} y1={138} x2={337} y2={182} op={1} />
          <Node x={235} y={200} t="2" prime op={1} />
          <Node x={345} y={200} t="15" op={1} />
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Edge x1={330} y1={214} x2={306} y2={250} op={1} />
          <Edge x1={360} y1={214} x2={384} y2={250} op={1} />
          <Node x={298} y={268} t="3" prime op={1} />
          <Node x={392} y={268} t="5" prime op={1} />
        </g>
      </LabStage>
    )
  }

  /* ---- 7 · HCF ---- */
  if (mode === 'hcf') {
    return (
      <LabStage title="HCF(12, 18) · 只攞「共有」" stage={stage} ds={4}
        lines={[
          [{ t: '12 = 2 × 2 × ' }, { t: '3', fill: GOLD, b: true }, { t: '　　18 = ' }, { t: '2', fill: GOLD, b: true }, { t: ' × 3 × 3' }],
          [{ t: '共有嘅質因數：2、3 → HCF = 2 × 3 = ' }, { t: '6', fill: GOLD, b: true }],
          [{ t: '驗算：12 ÷ 6 = 2 ✓　18 ÷ 6 = 3 ✓', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <circle cx={150} cy={150} r={92} fill="rgba(76,201,240,0.08)" stroke={BLUE} strokeWidth={2} />
          <circle cx={280} cy={150} r={92} fill="rgba(255,209,102,0.08)" stroke={GOLD} strokeWidth={2} />
          <Text x={92} y={40} size={16} fill={BLUE} w={700}>12</Text>
          <Text x={338} y={40} size={16} fill={GOLD} w={700}>18</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE} fontFamily={SERIF} fontWeight={700} fontSize={22} fill={INK} textAnchor="middle">
          <text x={106} y={130}>2</text>
          <text x={106} y={175}>2</text>
        </g>
        <g opacity={on(2, stage)} style={FADE} fontFamily={SERIF} fontWeight={700} fontSize={22} fill={INK} textAnchor="middle">
          <text x={324} y={130}>3</text>
          <text x={324} y={175}>3</text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <g fontFamily={SERIF} fontWeight={700} fontSize={22} fill={GOLD} textAnchor="middle">
            <text x={215} y={130}>2</text>
            <text x={215} y={175}>3</text>
          </g>
          <circle cx={215} cy={152} r={44} fill="none" stroke={OK} strokeWidth={2.5} strokeDasharray="6 5" />
        </g>
      </LabStage>
    )
  }

  /* ---- 8 · LCM ---- */
  if (mode === 'lcm') {
    return (
      <LabStage title="LCM(12, 18) · 攞「全部」" stage={stage} ds={3}
        lines={[
          [{ t: '全部質因數都要：2、2、3、3' }],
          [{ t: 'LCM = 2 × 2 × 3 × 3 = ' }, { t: '36', fill: GOLD, b: true }],
          [{ t: '驗算：36 ÷ 12 = 3 ✓　36 ÷ 18 = 2 ✓', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <circle cx={150} cy={150} r={92} fill="rgba(76,201,240,0.08)" stroke={BLUE} strokeWidth={2} />
          <circle cx={280} cy={150} r={92} fill="rgba(255,209,102,0.08)" stroke={GOLD} strokeWidth={2} />
          <Text x={92} y={40} size={16} fill={BLUE} w={700}>12</Text>
          <Text x={338} y={40} size={16} fill={GOLD} w={700}>18</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE} fontFamily={SERIF} fontWeight={700} fontSize={22} textAnchor="middle">
          <text x={106} y={130} fill={INK}>2</text>
          <text x={106} y={175} fill={INK}>2</text>
          <text x={215} y={130} fill={GOLD}>2</text>
          <text x={215} y={175} fill={GOLD}>3</text>
          <text x={324} y={130} fill={INK}>3</text>
          <text x={324} y={175} fill={INK}>3</text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <rect x={44} y={50} width={342} height={145} rx={16} fill="none" stroke={OK} strokeWidth={2.5} strokeDasharray="7 6" />
        </g>
      </LabStage>
    )
  }

  /* ---- 9 · 分數乘法 ---- */
  if (mode === 'frac_mul') {
    return (
      <LabStage title="分數乘法 · 2/3 × 3/4" stage={stage} ds={2}
        lines={[
          [{ t: '分子乘分子：2 × 3 = 6；分母乘分母：3 × 4 = 12' }],
          [{ t: '2/3 × 3/4 = 6/12，約分（÷6）= ' }, { t: '1/2', fill: GOLD, b: true }],
          [{ t: '快捷：乘之前 3 同 3 先對消，一樣答案', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Frac x={130} y={70} n="2" d="3" size={26} />
          <Text x={195} y={68} size={26} fill={MUTED}>{'×'}</Text>
          <Frac x={260} y={70} n="3" d="4" size={26} />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Frac x={130} y={200} n="6" d="12" size={24} fill={GOLD} />
          <Text x={215} y={198} size={24} fill={MUTED}>{'='}</Text>
          <Frac x={300} y={200} n="1" d="2" size={24} fill={GOLD} />
        </g>
      </LabStage>
    )
  }

  /* ---- 10 · 分數加法 ---- */
  if (mode === 'frac_add') {
    return (
      <LabStage title="分數加法 · 同分母 / 異分母" stage={stage} ds={2}
        lines={[
          [{ t: '同分母：分母唔變，分子相加 → 2/2 = ' }, { t: '1', fill: GOLD, b: true }],
          [{ t: '異分母：先用 LCM 通分（2 同 3 嘅 LCM = 6）', fill: MUTED }],
          [{ t: '1/2 + 1/3 = 3/6 + 2/6 = ' }, { t: '5/6', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Frac x={120} y={80} n="1" d="2" size={26} />
          <Text x={185} y={78} size={26} fill={MUTED}>{'+'}</Text>
          <Frac x={250} y={80} n="1" d="2" size={26} />
          <Text x={315} y={78} size={30} fill={OK} w={700}>{'= 1'}</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Frac x={120} y={210} n="1" d="3" size={26} />
          <Text x={185} y={208} size={26} fill={MUTED}>{'+'}</Text>
          <Frac x={250} y={210} n="1" d="3" size={26} />
          <Text x={315} y={208} size={28} fill={GOLD} w={700}>{'= 5/6'}</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 11 · 混合運算 ---- */
  if (mode === 'mixed') {
    return (
      <LabStage title="混合運算 · 1/2 + 2/3 × 3/4" stage={stage} ds={3}
        lines={[
          [{ t: '先乘：2/3 × 3/4 = 1/2' }],
          [{ t: '後加：1/2 + 1/2 = 2/2 = ' }, { t: '1', fill: GOLD, b: true }],
          [{ t: '口訣：先乘除，後加減；一行一行寫，唔好跳步', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Frac x={110} y={70} n="1" d="2" size={24} />
          <Text x={168} y={68} size={24} fill={MUTED}>{'+'}</Text>
          <Frac x={228} y={70} n="2" d="3" size={24} />
          <Text x={286} y={68} size={24} fill={MUTED}>{'×'}</Text>
          <Frac x={344} y={70} n="3" d="4" size={24} />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={165} size={22} fill={GOLD} w={700}>先乘 → 1/2 + 1/2</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={240} size={30} fill={OK} w={700}>= 1 ✓</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 冪 · 展開練習 ---- */
  if (mode === 'power_expand') {
    return (
      <LabStage title="冪 · 展開三條" stage={stage} ds={3}
        lines={[
          [{ t: '每條都係：指數 = 乘幾多次' }],
          [{ t: '底數唔同、指數唔同，都係同一套玩法', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={90} size={30} w={700}>5² = 5 × 5 = 25</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={165} size={30} w={700}>3³ = 3 × 3 × 3 = 27</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={240} size={26} w={700}>10⁴ = 10 × 10 × 10 × 10 = 10 000</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 冪 · 常用平方立方表 ---- */
  if (mode === 'power_table') {
    const SQ = [[1, 1], [2, 4], [3, 9], [4, 16], [5, 25], [6, 36], [7, 49], [8, 64], [9, 81], [10, 100], [11, 121], [12, 144]]
    const CB = [[2, 8], [3, 27], [4, 64], [5, 125]]
    return (
      <LabStage title="背呢頁 · 常用平方數與立方數" stage={stage} ds={3}
        lines={[
          [{ t: '11² = 121、12² = 144 最常考，一定要背' }],
          [{ t: '立方常用四個：8、27、64、125', fill: MUTED }],
        ]}
      >
        {SQ.slice(0, 6).map(([n, v], i) => (
          <g key={n} opacity={on(0, stage)} style={FADE}>
            <rect x={16 + i * 68} y={62} width={62} height={58} rx={10} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth={1.4} />
            <Text x={16 + i * 68 + 31} y={84} size={14} fill={MUTED}>{n}²</Text>
            <Text x={16 + i * 68 + 31} y={110} size={18} w={700}>{v}</Text>
          </g>
        ))}
        {SQ.slice(6).map(([n, v], i) => (
          <g key={n} opacity={on(1, stage)} style={FADE}>
            <rect x={16 + i * 68} y={128} width={62} height={58} rx={10} fill="rgba(255,255,255,0.05)" stroke={LINE} strokeWidth={1.4} />
            <Text x={16 + i * 68 + 31} y={150} size={14} fill={MUTED}>{n}²</Text>
            <Text x={16 + i * 68 + 31} y={176} size={18} w={700}>{v}</Text>
          </g>
        ))}
        {CB.map(([n, v], i) => (
          <g key={n} opacity={on(2, stage)} style={FADE}>
            <rect x={20 + i * 100} y={200} width={92} height={58} rx={10} fill="rgba(255,209,102,0.07)" stroke={GOLD} strokeWidth={1.4} />
            <Text x={20 + i * 100 + 46} y={222} size={14} fill={GOLD}>{n}³</Text>
            <Text x={20 + i * 100 + 46} y={248} size={18} w={700}>{v}</Text>
          </g>
        ))}
      </LabStage>
    )
  }

  /* ---- 冪 · 2³ vs 3² 對比 ---- */
  if (mode === 'power_compare') {
    return (
      <LabStage title="小心比較 · 2³ vs 3²" stage={stage} ds={3}
        lines={[
          [{ t: '底同指數調轉，結果唔同：8 ≠ 9' }],
          [{ t: '2³ 讀「2 的 3 次方」；3² 讀「3 的 2 次方」' }],
          [{ t: '錯例：2³ 唔等於 2 × 3 = 6 ✗', fill: RED }],
        ]}
      >
        <g opacity={on(0, stage)}>
          <rect x={30} y={70} width={175} height={130} rx={14} fill="rgba(76,201,240,0.07)" stroke={BLUE} strokeWidth={1.8} />
          <Text x={117} y={118} size={36} w={700}>2³</Text>
          <Text x={117} y={162} size={20}>= 2 × 2 × 2</Text>
          <Text x={117} y={192} size={24} fill={GOLD} w={700}>= 8</Text>
        </g>
        <g opacity={on(1, stage)}>
          <rect x={225} y={70} width={175} height={130} rx={14} fill="rgba(255,209,102,0.07)" stroke={GOLD} strokeWidth={1.8} />
          <Text x={312} y={118} size={36} w={700}>3²</Text>
          <Text x={312} y={162} size={20}>= 3 × 3</Text>
          <Text x={312} y={192} size={24} fill={GOLD} w={700}>= 9</Text>
        </g>
        <g opacity={on(2, stage)}>
          <Text x={215} y={248} size={24} fill={GOLD} w={700}>8 ≠ 9 — 唔一樣！</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 質數與合數 ---- */
  if (mode === 'primes') {
    const NUMS = [[2, 1], [3, 1], [4, 0], [5, 1], [6, 0], [7, 1], [8, 0], [9, 0], [10, 0], [11, 1], [12, 0], [13, 1], [14, 0], [15, 0], [16, 0]]
    // 5×3 格：固定喺圖形區上半，唔好撞到底部說明行
    const COLS = 5
    const BOX_W = 64
    const BOX_H = 48
    const GAP_X = 12
    const GAP_Y = 12
    const GRID_W = COLS * BOX_W + (COLS - 1) * GAP_X
    const ORIGIN_X = Math.round((430 - GRID_W) / 2)
    const ORIGIN_Y = 52
    return (
      <LabStage title="質數 vs 合數 · 2 到 16" stage={stage} ds={2}
        lines={[
          [{ t: '質數：只有 1 同自己兩個因數 — 2、3、5、7、11、13', fill: GOLD, b: true }],
          [{ t: '合數：因數多過兩個 — 4、6、8、9、10、12、14、15、16' }],
          [{ t: '1 既唔係質數亦唔係合數 · 金色格 = 質數', fill: MUTED }],
        ]}
      >
        {NUMS.map(([v, prime], i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const x = ORIGIN_X + col * (BOX_W + GAP_X)
          const y = ORIGIN_Y + row * (BOX_H + GAP_Y)
          return (
            <NumBox
              key={v}
              x={x} y={y} w={BOX_W} h={BOX_H}
              label={v}
              labelSize={22}
              labelFill={prime ? GOLD : MUTED}
              fill={prime ? 'rgba(255,209,102,0.12)' : 'rgba(255,255,255,0.04)'}
              stroke={prime ? GOLD : LINE}
              sw={prime ? 2 : 1.3}
              op={on(0, stage)}
            />
          )
        })}
      </LabStage>
    )
  }

  /* ---- 質因數分解 · 短除法 ---- */
  if (mode === 'short_div') {
    return (
      <LabStage title="短除法 · 60 = ?" stage={stage} ds={4}
        lines={[
          [{ t: '60 = 2 × 2 × 3 × 5 = ' }, { t: '2² × 3 × 5', fill: GOLD, b: true }],
          [{ t: '同分解樹一樣答案——鍾意邊種用邊種', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={170} y={92} size={24} anchor="start">2 ) 60</Text>
          <Text x={300} y={92} size={17} fill={MUTED} anchor="start">60 ÷ 2 = 30</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={170} y={132} size={24} anchor="start">2 ) 30</Text>
          <Text x={300} y={132} size={17} fill={MUTED} anchor="start">30 ÷ 2 = 15</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={170} y={172} size={24} anchor="start">3 ) 15</Text>
          <Text x={300} y={172} size={17} fill={MUTED} anchor="start">15 ÷ 3 = 5</Text>
          <Text x={196} y={212} size={24} fill={GOLD} w={700}>5</Text>
          <Text x={300} y={212} size={17} fill={OK} anchor="start">5 係質數，停！</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={268} size={26} fill={GOLD} w={700}>60 = 2² × 3 × 5</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 質因數分解 · 點解要拆 ---- */
  if (mode === 'factor_why') {
    return (
      <LabStage title="點解要拆 · 84 嘅例子" stage={stage} ds={3}
        lines={[
          [{ t: '每個合數嘅質因數分解得一份（唯一）' }],
          [{ t: 'HCF、LCM、約分、通分——全部靠佢', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={90} size={26} w={700}>84 = 2 × 42</Text>
          <Text x={215} y={132} size={26} w={700}>= 2 × 2 × 21</Text>
          <Text x={215} y={174} size={26} w={700}>= 2 × 2 × 3 × 7</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={228} size={30} fill={GOLD} w={700}>84 = 2² × 3 × 7</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={274} size={16} fill={MUTED}>無論你點拆，最後都係呢串質因數</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- 短除法一石二鳥：HCF + LCM（12, 18） ---- */
  if (mode === 'short_both') {
    return (
      <LabStage title="短除法一石二鳥 · HCF 同 LCM 一次過" stage={stage} ds={5}
        lines={[
          [{ t: 'HCF（左邊乘埋）= 2 × 3 = ' }, { t: '6', fill: GOLD, b: true }],
          [{ t: 'LCM（左邊 × 底行）= 2 × 3 × 2 × 3 = ' }, { t: '36', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={110} y={92} size={24} anchor="start">2 ) 12　18</Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={110} y={136} size={24} anchor="start">3 ) 　6　　9</Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={146} y={180} size={24} fill={GOLD} w={700}>2　　3</Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={110} y={228} size={22} fill={OK} w={700}>HCF = 2 × 3 = 6（左邊兩個除數乘埋）</Text>
        </g>
        <g opacity={on(4, stage)} style={FADE}>
          <Text x={110} y={266} size={22} fill={BLUE} w={700}>LCM = 2 × 3 × 2 × 3 = 36（連底行乘埋）</Text>
        </g>
      </LabStage>
    )
  }

  /* ---- HCF / LCM 應用題 ---- */
  if (mode === 'hcf_app') {
    const appCard = (x, title, body, ans, color, op) => (
      <g opacity={op} style={FADE}>
        <rect x={x} y={70} width={175} height={160} rx={14} fill="rgba(255,255,255,0.05)" stroke={color} strokeWidth={1.8} />
        <Text x={x + 87} y={100} size={16} fill={color} w={700}>{title}</Text>
        <Text x={x + 87} y={134} size={16}>{body}</Text>
        <Text x={x + 87} y={162} size={16}>{ans}</Text>
        <Text x={x + 87} y={208} size={20} fill={color} w={700}>{color === OK ? 'HCF' : 'LCM'}</Text>
      </g>
    )
    return (
      <LabStage title="應用 · 幾時用 HCF 幾時用 LCM" stage={stage} ds={3}
        lines={[
          [{ t: '剪到「最長」等長 → HCF（要啱啱好分得勻）' }],
          [{ t: '下次「再一齊」發生 → LCM（一同例必係公倍數）' }],
          [{ t: '關鍵字：剪/分 → HCF；同/再一齊 → LCM', fill: MUTED }],
        ]}
      >
        {appCard(25, '剪絲帶 · 用 HCF', '兩條絲帶 12cm、18cm', '剪成最長嘅等長段？', OK, on(0, stage))}
        {appCard(230, '閃燈 · 用 LCM', '甲燈每 12 分鐘閃', '乙燈每 18 分鐘閃，下次同閃？', GOLD, on(1, stage))}
        <Text x={215} y={268} size={18} fill={GOLD} w={700} opacity={on(2, stage)}>答：6cm　·　36 分鐘後</Text>
      </LabStage>
    )
  }

  /* ---- 分數比大小 ---- */
  if (mode === 'frac_compare') {
    return (
      <LabStage title="比大小 · 3/4 vs 5/6" stage={stage} ds={3}
        lines={[
          [{ t: '通分：LCM(4, 6) = 12 → 3/4 = 9/12　·　5/6 = 10/12' }],
          [{ t: '10/12 > 9/12 → ' }, { t: '5/6 較大', fill: GOLD, b: true }],
          [{ t: '通分唔止加減用，比大小都用得', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Frac x={130} y={90} n="3" d="4" size={28} />
          <Text x={215} y={88} size={28} fill={MUTED}>{'vs'}</Text>
          <Frac x={300} y={90} n="5" d="6" size={28} />
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Frac x={130} y={200} n="9" d="12" size={24} fill={MUTED} />
          <Text x={215} y={198} size={24} fill={RED} w={700}>{'<'}</Text>
          <Frac x={300} y={200} n="10" d="12" size={24} fill={GOLD} />
        </g>
        <Text x={215} y={272} size={24} fill={GOLD} w={700} opacity={on(2, stage)}>5/6 大過 3/4 ✓</Text>
      </LabStage>
    )
  }

  /* ---- 12 · 章總結 ---- */
  if (mode === 'summary') {
    const CARDS = [
      ['1', '整除檢驗', '睇尾位 / 數字和'],
      ['2', '冪', '2³ = 2 × 2 × 2'],
      ['3', '質因數分解', '60 = 2² × 3 × 5'],
      ['4', 'HCF·LCM', '中間 vs 全部'],
      ['5', '分數運算', '先乘除，後加減'],
    ]
    const POS = [[16, 55], [152, 55], [288, 55], [84, 185], [220, 185]]
    return (
      <div className="idx-lab">
        <svg className="vm-svg" viewBox="0 0 430 382" role="img" aria-label="第一章五件工具總結">
          {CARDS.map(([num, t, ex], i) => (
            <NumberedCard
              key={num}
              x={POS[i][0]}
              y={POS[i][1]}
              num={num}
              title={t}
              note={ex}
              op={on(i, stage)}
            />
          ))}
          {stage >= 5 && (
            <g className="idx-pulse" style={FADE}>
              <Text x={215} y={322} size={18} fill={GOLD} w={700}>第一章 · 基本運算 ✓ 下一章：K2 有向數</Text>
            </g>
          )}
        </svg>
      </div>
    )
  }

  return null
}
