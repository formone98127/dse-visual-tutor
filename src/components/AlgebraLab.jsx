import { GOLD, BLUE, OK, RED, INK, MUTED, LINE } from '../lib/palette.js'
import LabStage from './LabStage.jsx'
import { Pop, T as Text, Blocks } from './LabFx.jsx'

/**
 * K7 代數式 — 圖示 + 動態；每步只顯示當前一層，避免文字重疊。
 */

export default function AlgebraLab({ mode, stage = 99 }) {
  /* 1 · 站位 */
  if (mode === 'intro') {
    return (
      <LabStage
        title="代數式 · 用字母代表數"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '字母代表「未知／可變」嘅數' }],
          [{ t: '例如：x、n、a……唔係亂寫符號', fill: MUTED }],
        ]}
      >
        <Pop show={stage === 0}>
          <Text x={215} y={140} size={24} fill={MUTED}>
            同一個位置，可以放唔同數
          </Text>
        </Pop>
        <Pop show={stage === 1} delay={1}>
          <Blocks x={55} y={110} n={4} fill={BLUE} />
          <Text x={115} y={170} size={14} fill={BLUE}>
            例如 7
          </Text>
          <line x1={180} y1={122} x2={230} y2={122} stroke={LINE} strokeWidth={2} />
          <path d="M230 122 L221 117 M230 122 L221 127" stroke={LINE} strokeWidth={2} fill="none" />
          <rect x={245} y={95} width={120} height={58} rx={12} fill="rgba(255,209,102,0.12)" stroke={GOLD} strokeWidth={2} />
          <Text x={305} y={132} size={28} fill={GOLD} w={700}>
            n
          </Text>
          <Text x={305} y={180} size={13} fill={MUTED}>
            字母站位
          </Text>
        </Pop>
        <Pop show={stage >= 2} delay={1}>
          <Text x={215} y={130} size={36} fill={GOLD} w={700}>
            3n + 2
          </Text>
          <Text x={215} y={175} size={15} fill={MUTED}>
            呢個亦都係代數式
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 2 · 文字 → 式（兩例分階段，唔堆埋） */
  if (mode === 'phrase_to_alg') {
    return (
      <LabStage
        title="文字 → 代數式"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '「多」→ +　「少」→ −　「倍」→ ×　「一半」→ ÷2' }],
          [{ t: '「某數」通常用 x 或 n 代表', fill: MUTED }],
        ]}
      >
        <Pop show={stage <= 1}>
          <Text x={215} y={70} size={16} fill={MUTED}>
            某數加 5
          </Text>
          <rect x={120} y={95} width={48} height={48} rx={10} fill="rgba(255,209,102,0.15)" stroke={GOLD} strokeWidth={2} />
          <Text x={144} y={125} size={22} fill={GOLD} w={700}>
            x
          </Text>
          {stage >= 1 && (
            <g className="lab-pop lab-pop-d1">
              <Text x={185} y={125} size={26} fill={INK}>
                +
              </Text>
              <Blocks x={210} y={108} n={5} fill={BLUE} size={18} gap={5} />
              <Text x={215} y={185} size={28} fill={GOLD} w={700}>
                x + 5
              </Text>
            </g>
          )}
        </Pop>
        <Pop show={stage >= 2}>
          <Text x={215} y={70} size={16} fill={MUTED}>
            某數嘅 3 倍減 2
          </Text>
          <Blocks x={70} y={105} n={3} fill={GOLD} size={28} gap={8} />
          {stage >= 3 && (
            <g className="lab-pop lab-pop-d1">
              <Text x={195} y={128} size={24} fill={INK}>
                −
              </Text>
              <Blocks x={220} y={105} n={2} fill={BLUE} size={28} gap={8} />
              <Text x={215} y={185} size={28} fill={GOLD} w={700}>
                3x − 2
              </Text>
            </g>
          )}
        </Pop>
      </LabStage>
    )
  }

  /* 3 · 左右對照，中間留空 */
  if (mode === 'alg_to_phrase') {
    return (
      <LabStage
        title="代數式 → 文字"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '讀式時跟運算次序：先乘除、後加減' }],
          [{ t: '2(n + 1) = 某數加 1，再乘 2', fill: GOLD, b: true }],
        ]}
      >
        <Pop show={stage >= 0}>
          <Text x={110} y={80} size={22} fill={INK} w={700}>
            2n + 1
          </Text>
          <Blocks x={60} y={100} n={2} fill={GOLD} size={26} gap={8} />
          <Text x={160} y={122} size={15} fill={MUTED}>
            +1
          </Text>
        </Pop>
        <Pop show={stage >= 1} delay={1}>
          <Text x={110} y={165} size={14} fill={GOLD}>
            兩倍之後再 +1
          </Text>
        </Pop>
        <Pop show={stage >= 2} delay={1}>
          <line x1={215} y1={70} x2={215} y2={180} stroke={LINE} strokeWidth={1} opacity={0.25} />
          <Text x={320} y={80} size={22} fill={INK} w={700}>
            2(n+1)
          </Text>
          <rect x={270} y={95} width={100} height={48} rx={10} fill="none" stroke={GOLD} strokeWidth={2.2} className="lab-draw" />
          <Blocks x={282} y={106} n={1} fill={BLUE} size={24} />
          <Text x={330} y={125} size={14} fill={MUTED}>
            +1
          </Text>
        </Pop>
        <Pop show={stage >= 3} delay={2}>
          <Text x={320} y={175} size={14} fill={GOLD}>
            先捆再 ×2
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 4 · 代入：逐步替換，唔重疊 */
  if (mode === 'substitute') {
    return (
      <LabStage
        title="代入求值"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '將字母換成數字，再計' }],
          [{ t: 'x = 4 → 3x + 2 = 14', fill: GOLD, b: true }],
        ]}
      >
        <Pop show={stage === 0}>
          <Text x={215} y={140} size={36} fill={INK} w={700}>
            3
            <tspan fill={GOLD}>x</tspan>
            {' + 2'}
          </Text>
        </Pop>
        <Pop show={stage === 1} delay={1}>
          <Text x={215} y={100} size={28} fill={INK} w={700}>
            3x + 2
          </Text>
          <rect x={155} y={130} width={120} height={40} rx={10} fill="rgba(76,201,240,0.12)" stroke={BLUE} strokeWidth={1.6} />
          <Text x={215} y={156} size={20} fill={BLUE} w={700}>
            x = 4
          </Text>
        </Pop>
        <Pop show={stage === 2} delay={1}>
          <Text x={215} y={100} size={18} fill={MUTED}>
            代入 x = 4
          </Text>
          <Text x={215} y={155} size={34} fill={BLUE} w={700}>
            3(4) + 2
          </Text>
        </Pop>
        <Pop show={stage >= 3} delay={1}>
          <Text x={215} y={100} size={22} fill={MUTED}>
            3(4) + 2
          </Text>
          <Text x={215} y={155} size={34} fill={GOLD} w={700}>
            = 14
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 5 · 數列：矮柱 + 數字，+2 放柱頂空隙 */
  if (mode === 'sequence') {
    const vals = [3, 5, 7, 9, 11]
    return (
      <LabStage
        title="數列 · 找規律"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '每一項都係前一項 + 2' }],
          [{ t: '呢個叫等差數列（公差 = 2）', fill: GOLD, b: true }],
        ]}
      >
        {vals.map((v, i) => {
          const revealAt = Math.min(i, 2)
          const cx = 50 + i * 78
          return (
            <Pop key={v} show={stage >= revealAt} delay={(i % 3) + 1}>
              <g>
                {Array.from({ length: Math.min(v, 6) }).map((_, k) => (
                  <circle
                    key={k}
                    cx={cx}
                    cy={160 - k * 10}
                    r={4}
                    fill={i === vals.length - 1 ? GOLD : BLUE}
                  />
                ))}
                <Text x={cx} y={178} size={16} fill={i === vals.length - 1 ? GOLD : INK} w={700}>
                  {v}
                </Text>
              </g>
            </Pop>
          )
        })}
        <Pop show={stage >= 3} delay={1}>
          {[0, 1, 2, 3].map((i) => (
            <Text key={i} x={89 + i * 78} y={55} size={13} fill={GOLD}>
              +2
            </Text>
          ))}
        </Pop>
      </LabStage>
    )
  }

  /* 6 · 通項：每步一條式，垂直排開 */
  if (mode === 'nth_term') {
    return (
      <LabStage
        title="第 n 項"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '第 1 項 = 3；每項 +2 → 第 n 項 = 3 + (n−1)×2' }],
          [{ t: '化簡：2n + 1', fill: GOLD, b: true }],
        ]}
      >
        <Pop show={stage >= 0}>
          {[3, 5, 7, 9].map((v, i) => (
            <g key={v}>
              <circle cx={70 + i * 75} cy={70} r={16} fill="rgba(255,255,255,0.05)" stroke={LINE} />
              <Text x={70 + i * 75} y={75} size={15} fill={INK}>
                {v}
              </Text>
            </g>
          ))}
          <Text x={370} y={75} size={16} fill={MUTED}>
            …
          </Text>
        </Pop>
        <Pop show={stage === 1} delay={1}>
          <Text x={215} y={150} size={20} fill={INK}>
            第 n 項 = 3 + (n−1)×2
          </Text>
        </Pop>
        <Pop show={stage === 2} delay={1}>
          <Text x={215} y={130} size={16} fill={MUTED}>
            3 + (n−1)×2
          </Text>
          <Text x={215} y={170} size={22} fill={BLUE} w={700}>
            = 3 + 2n − 2
          </Text>
        </Pop>
        <Pop show={stage >= 3} delay={1}>
          <Text x={215} y={120} size={16} fill={MUTED}>
            = 3 + 2n − 2
          </Text>
          <rect x={145} y={145} width={140} height={44} rx={12} fill="rgba(255,209,102,0.15)" stroke={GOLD} strokeWidth={2} />
          <Text x={215} y={174} size={26} fill={GOLD} w={700}>
            2n + 1
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 7 · 函數機：標籤上移，滾珠唔遮字 */
  if (mode === 'function_machine') {
    const ballX = stage >= 3 ? 355 : stage >= 2 ? 290 : stage >= 1 ? 215 : 75
    return (
      <LabStage
        title="函數初步 · 輸入 → 輸出"
        stage={stage}
        ds={4}
        lines={[
          [{ t: '同一個規則：入 x，出 2x + 1' }],
          [{ t: '寫做 f(x) = 2x + 1', fill: GOLD, b: true }],
        ]}
      >
        <line x1={50} y1={150} x2={380} y2={150} stroke={LINE} strokeWidth={2.5} opacity={0.25} />
        <Pop show={stage >= 0}>
          <rect x={40} y={115} width={70} height={70} rx={12} fill="rgba(76,201,240,0.12)" stroke={BLUE} strokeWidth={2} />
          <Text x={75} y={142} size={12} fill={MUTED}>
            入
          </Text>
          <Text x={75} y={168} size={22} fill={BLUE} w={700}>
            x
          </Text>
        </Pop>
        <Pop show={stage >= 1} delay={1}>
          <rect x={155} y={105} width={120} height={90} rx={14} fill="rgba(255,209,102,0.12)" stroke={GOLD} strokeWidth={2} />
          <Text x={215} y={140} size={13} fill={MUTED}>
            規則
          </Text>
          <Text x={215} y={172} size={20} fill={GOLD} w={700}>
            ×2 +1
          </Text>
        </Pop>
        <Pop show={stage >= 2} delay={1}>
          <rect x={320} y={115} width={70} height={70} rx={12} fill="rgba(184,242,124,0.12)" stroke={OK} strokeWidth={2} />
          <Text x={355} y={142} size={12} fill={MUTED}>
            出
          </Text>
          <Text x={355} y={168} size={16} fill={OK} w={700}>
            2x+1
          </Text>
        </Pop>
        <g
          style={{
            transform: `translate(${ballX}px, 150px)`,
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <circle cx={0} cy={0} r={8} fill={GOLD} />
        </g>
        <Pop show={stage >= 3} delay={2}>
          <Text x={215} y={195} size={16} fill={INK}>
            x=3→7　·　x=5→11
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 8 · 錯對：圖在上、說明在下，面板內唔擠 */
  if (mode === 'mistakes') {
    return (
      <LabStage
        title="常犯錯誤"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '2x + 1 ≠ 2(x + 1)（有冇括號差好遠）' }],
          [{ t: '括號 = 先捆一齊再乘', fill: MUTED }],
        ]}
      >
        <Pop show={stage >= 0}>
          <rect x={35} y={70} width={160} height={120} rx={12} fill="rgba(255,107,122,0.1)" stroke={RED} strokeWidth={1.8} />
          <Text x={115} y={105} size={18} fill={RED} w={700}>
            ✗ 2x+1
          </Text>
          <Blocks x={70} y={125} n={2} fill={RED} size={26} gap={8} />
          <Text x={115} y={175} size={13} fill={MUTED}>
            +1 喺外面
          </Text>
        </Pop>
        <Pop show={stage >= 1} delay={1}>
          <rect x={235} y={70} width={160} height={120} rx={12} fill="rgba(184,242,124,0.1)" stroke={OK} strokeWidth={1.8} />
          <Text x={315} y={105} size={18} fill={OK} w={700}>
            ✓ 2(x+1)
          </Text>
          <rect x={270} y={120} width={90} height={40} rx={8} fill="none" stroke={OK} strokeWidth={2} className="lab-draw" />
          <Blocks x={285} y={128} n={1} fill={OK} size={24} />
          <Text x={340} y={148} size={13} fill={MUTED}>
            +1
          </Text>
        </Pop>
        <Pop show={stage >= 2} delay={2}>
          <Text x={215} y={198} size={14} fill={MUTED}>
            左邊唔同右邊
          </Text>
        </Pop>
      </LabStage>
    )
  }

  /* 9 · 總結 */
  if (mode === 'summary') {
    return (
      <LabStage
        title="K7 完成"
        stage={stage}
        ds={3}
        lines={[
          [{ t: '文字 ↔ 代數式 · 代入 · 數列通項 · 函數規則' }],
          [{ t: '下一章：K8 一元一次方程', fill: GOLD, b: true }],
        ]}
      >
        <Pop show={stage >= 0}>
          <IconTile x={55} y={95} label="x" sub="字母" fill={GOLD} />
        </Pop>
        <Pop show={stage >= 1} delay={1}>
          <IconTile x={170} y={95} label="3,5…" sub="數列" fill={BLUE} />
        </Pop>
        <Pop show={stage >= 2} delay={2}>
          <IconTile x={285} y={95} label="f" sub="函數" fill={OK} />
        </Pop>
      </LabStage>
    )
  }

  return (
    <div className="idx-lab">
      <p className="text-zinc-600">未知場景</p>
    </div>
  )
}

function IconTile({ x, y, label, sub, fill }) {
  return (
    <g>
      <rect x={x} y={y} width={90} height={90} rx={14} fill={fill} fillOpacity={0.12} stroke={fill} strokeWidth={2} />
      <Text x={x + 45} y={y + 42} size={20} fill={fill} w={700}>
        {label}
      </Text>
      <Text x={x + 45} y={y + 70} size={13} fill={MUTED}>
        {sub}
      </Text>
    </g>
  )
}
