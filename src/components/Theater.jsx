import { useEffect, useState } from 'react'
import PyramidLab from './PyramidLab.jsx'
import PythagorasLab from './PythagorasLab.jsx'
import BasicLab from './BasicLab.jsx'
import DirectedLab from './DirectedLab.jsx'
import ApproxLab from './ApproxLab.jsx'
import RationalLab from './RationalLab.jsx'
import PercentLab from './PercentLab.jsx'

const LABS = {
  pyramid: PyramidLab,
  pythagoras: PythagorasLab,
  basic: BasicLab,
  directed: DirectedLab,
  approx: ApproxLab,
  rational: RationalLab,
  percent: PercentLab,
}

/**
 * Theater — 上半部 70% 高度的視覺動畫區。
 * 有 lesson 時按 lesson.lab 揀組件，beat.mode（= lessonScript.action）驅動場景。
 *
 * 交叉淡化：beat / lesson / pendingTitle 轉變時，舊畫面先淡出（300ms），
 * 先至換上新畫面淡入——唔會硬切。實作係凍結一份「顯示中快照」，
 * 淡出期間照舊畫舊內容，計時完先換新。
 */
function useStageSnapshot(props) {
  const [snap, setSnap] = useState(props)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const changed =
      snap.beat !== props.beat ||
      snap.lesson !== props.lesson ||
      snap.pendingTitle !== props.pendingTitle ||
      snap.mode !== props.mode
    if (!changed) return
    setVisible(false)
    const t = setTimeout(() => {
      setSnap(props)
      setVisible(true)
    }, 300)
    return () => clearTimeout(t)
  }, [props, snap])

  return { snap, visible }
}

function Placeholder({ pendingTitle, mode }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium tracking-[0.5em] text-zinc-700">
        {pendingTitle ? `「${pendingTitle}」` : '請喺左邊揀選單元'}
      </p>
      {pendingTitle && (
        <p className="text-xs tracking-[0.3em] text-zinc-600">單元製作中 — 敬請期待</p>
      )}
    </div>
  )
}

export default function Theater({ mode, lesson, beat, pendingTitle, unitTitle, stage }) {
  const { snap, visible } = useStageSnapshot({ beat, lesson, pendingTitle, mode })
  const Lab = snap.lesson ? LABS[snap.lesson.lab] : null
  const playing = snap.lesson && snap.beat && Lab

  return (
    <section className="relative h-[70%] w-full overflow-hidden bg-black">
      {/* 柔和的舞台燈光 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 45%, rgba(251,191,36,0.07), transparent 70%)',
        }}
      />
      {/* 極淡的數學格線 */}
      <div className="stage-grid pointer-events-none absolute inset-0" />

      {/* 觀景窗四角（左上角手機版收起，俾位漢堡選單） */}
      {[
        'top-6 left-6 border-t border-l hidden md:block',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute h-6 w-6 border-white/15 ${pos}`}
        />
      ))}

      {/* 左上角： Theater · 而家上緊咩課（手機版讓位俾漢堡選單） */}
      <span className="absolute left-16 top-4 z-10 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-600 md:left-8 md:top-7">
        Theater · {snap.lesson ? snap.lesson.title : snap.mode === 'DSE' ? '高中' : '初中'}
      </span>

      {/* 右上角：小標題 · 而家上到邊一小節（同左上角對稱；手機版 right-4 唔使讓位） */}
      {unitTitle && (
        <span className="absolute right-4 top-4 z-10 text-right text-[10px] font-medium tracking-[0.35em] text-zinc-500 md:right-8 md:top-7">
          {unitTitle}
        </span>
      )}

      {/* 舞台內容（淡入淡出層） */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {playing ? (
          <div className="flex h-full items-center justify-center">
            <Lab key={snap.beat.id} mode={snap.beat.mode} stage={stage} />
          </div>
        ) : (
          <Placeholder pendingTitle={snap.pendingTitle} mode={snap.mode} />
        )}
      </div>
    </section>
  )
}
