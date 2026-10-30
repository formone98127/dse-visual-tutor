import { GOLD, BLUE, OK, INK, MUTED, LINE, SERIF } from '../lib/palette.js'
import LabStage, { on, FADE } from './LabStage.jsx'

/**
 * K6 率、比與比例 lab — 概念 → 比 → 比例 → 應用
 */

function Text({ x, y, size = 22, fill = INK, w = 600, children, anchor = 'middle', opacity = 1 }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={fill}
      fontWeight={w}
      fontFamily={SERIF}
      opacity={opacity}
    >
      {children}
    </text>
  )
}



function Block({ x, y, w, h, fill, label, op }) {
  return (
    <g opacity={op} style={FADE}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} fillOpacity={0.28} stroke={fill} strokeWidth={2} />
      {label ? (
        <Text x={x + w / 2} y={y + h / 2 + 6} size={18} fill={fill} w={700}>
          {label}
        </Text>
      ) : null}
    </g>
  )
}

export default function RatioLab({ mode, stage = 99 }) {
  if (mode === 'rate_vs_ratio') {
    return (
      <LabStage
        title="率 · 比 · 比例"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '率：有單位（例如 km/h、$ / 件）', fill: MUTED }],
          [{ t: '比：無單位，只講兩量嘅關係', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={100} size={28} fill={GOLD} w={700}>
            率 ≠ 比 ≠ 比例
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={120} y={170} size={20} fill={BLUE} w={700}>
            率
          </Text>
          <Text x={120} y={205} size={16} fill={INK}>
            120 km / 2 h
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={310} y={170} size={20} fill={GOLD} w={700}>
            比
          </Text>
          <Text x={310} y={205} size={16} fill={INK}>
            3 : 2
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'ratio_concept') {
    return (
      <LabStage
        title="比 a : b"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '左係 a 份、右係 b 份——合共 a + b 份' }],
          [{ t: '可以約簡：6 : 4 = 3 : 2', fill: GOLD, b: true }],
        ]}
      >
        <Block x={70} y={100} w={80} h={100} fill={BLUE} label="3" op={on(0, stage)} />
        <Block x={160} y={100} w={80} h={100} fill={BLUE} label="3" op={on(0, stage)} />
        <Text x={155} y={230} size={16} fill={MUTED} opacity={on(0, stage)}>
          a = 6
        </Text>
        <Block x={280} y={100} w={70} h={100} fill={GOLD} label="2" op={on(1, stage)} />
        <Block x={360} y={100} w={50} h={100} fill={GOLD} label="2" op={on(1, stage)} />
        <Text x={340} y={230} size={16} fill={MUTED} opacity={on(1, stage)}>
          b = 4
        </Text>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={70} size={26} fill={GOLD} w={700}>
            6 : 4 = 3 : 2
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'ratio_scale') {
    return (
      <LabStage
        title="比可以同時 × / ÷"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '兩邊一齊 × k 或 ÷ k，比值不變' }],
          [{ t: '2 : 5 = 4 : 10 = 6 : 15', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={110} size={32} fill={INK} w={700}>
            2 : 5
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={160} size={22} fill={MUTED}>
            × 2
          </Text>
          <Text x={215} y={200} size={28} fill={BLUE} w={700}>
            4 : 10
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={245} size={22} fill={OK} w={700}>
            一樣嘅比！
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'proportion') {
    return (
      <LabStage
        title="比例 a : b = c : d"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '交叉相乘：a × d = b × c' }],
          [{ t: '用來搵未知項', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={100} size={30} fill={INK} w={700}>
            3 : 4 = 6 : x
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={155} size={22} fill={MUTED}>
            3 × x = 4 × 6
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={210} size={28} fill={GOLD} w={700}>
            x = 8
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'rate_speed') {
    return (
      <LabStage
        title="率 · 速度"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '速度 = 路程 ÷ 時間' }],
          [{ t: '240 km ÷ 3 h = 80 km/h', fill: GOLD, b: true }],
        ]}
      >
        <line x1={60} y1={180} x2={370} y2={180} stroke={LINE} strokeWidth={2} opacity={on(0, stage)} />
        <g opacity={on(0, stage)} style={FADE}>
          <circle cx={80} cy={180} r={8} fill={BLUE} />
          <Text x={80} y={210} size={14} fill={MUTED}>
            起點
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <circle cx={340} cy={180} r={8} fill={GOLD} />
          <Text x={340} y={210} size={14} fill={MUTED}>
            3 小時後
          </Text>
          <Text x={210} y={155} size={18} fill={INK}>
            240 km
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={100} size={26} fill={GOLD} w={700}>
            80 km/h
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'share_problem') {
    return (
      <LabStage
        title="應用 · 按比分配"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '合共 3 + 2 = 5 份' }],
          [{ t: '每份 60 ÷ 5 = 12 粒' }],
          [{ t: '甲 36 · 乙 24', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={85} size={20} fill={INK}>
            60 粒糖 · 甲 : 乙 = 3 : 2
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Block x={55} y={120} w={60} h={70} fill={BLUE} label="1" op={1} />
          <Block x={125} y={120} w={60} h={70} fill={BLUE} label="2" op={1} />
          <Block x={195} y={120} w={60} h={70} fill={BLUE} label="3" op={1} />
          <Block x={290} y={120} w={60} h={70} fill={GOLD} label="1" op={1} />
          <Block x={360} y={120} w={60} h={70} fill={GOLD} label="2" op={1} />
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={140} y={230} size={17} fill={BLUE} w={700}>
            甲 3 份
          </Text>
          <Text x={340} y={230} size={17} fill={GOLD} w={700}>
            乙 2 份
          </Text>
        </g>
        <g opacity={on(3, stage)} style={FADE}>
          <Text x={215} y={70} size={22} fill={OK} w={700}>
            36 粒 : 24 粒
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'map_scale') {
    return (
      <LabStage
        title="應用 · 地圖比例"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '圖上 1 cm 代表實際 2 km' }],
          [{ t: '圖距 3.5 cm → 實際 7 km', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={100} size={24} fill={INK} w={700}>
            1 : 200 000
          </Text>
          <Text x={215} y={140} size={16} fill={MUTED}>
            （1 cm ↔ 2 km）
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <line x1={100} y1={190} x2={280} y2={190} stroke={GOLD} strokeWidth={4} strokeLinecap="round" />
          <Text x={190} y={220} size={16} fill={MUTED}>
            圖上 3.5 cm
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={70} size={26} fill={GOLD} w={700}>
            7 km
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'mistakes') {
    return (
      <LabStage
        title="常犯錯誤"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '比嘅次序唔能調轉：3 : 2 ≠ 2 : 3' }],
          [{ t: '率要寫單位；比唔寫單位', fill: MUTED }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={110} size={20} fill={INK}>
            ✗ 甲:乙寫反咗
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={165} size={20} fill={INK}>
            ✗ 速度 = 80（冇單位）
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={220} size={22} fill={OK} w={700}>
            ✓ 先寫清邊個對邊個
          </Text>
        </g>
      </LabStage>
    )
  }

  if (mode === 'summary') {
    return (
      <LabStage
        title="K6 完成"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '率有單位 · 比無單位 · 比例交叉乘' }],
          [{ t: '下一章：K7 代數式', fill: GOLD, b: true }],
        ]}
      >
        <g opacity={on(0, stage)} style={FADE}>
          <Text x={215} y={120} size={24} fill={GOLD} w={700}>
            率 · 比 · 比例
          </Text>
        </g>
        <g opacity={on(1, stage)} style={FADE}>
          <Text x={215} y={170} size={18} fill={INK}>
            分配題：先加份數
          </Text>
        </g>
        <g opacity={on(2, stage)} style={FADE}>
          <Text x={215} y={215} size={18} fill={INK}>
            未知項：交叉相乘
          </Text>
        </g>
      </LabStage>
    )
  }

  return (
    <div className="idx-lab">
      <p className="text-zinc-600">未知場景</p>
    </div>
  )
}
