import { useEffect, useRef, useState } from 'react'
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

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Theater({ mode, lesson, beat, pendingTitle, unitTitle, stage, index = 0, total = 0, steps = 1 }) {
  const { snap, visible } = useStageSnapshot({ beat, lesson, pendingTitle, mode })
  const Lab = snap.lesson ? LABS[snap.lesson.lab] : null
  const playing = snap.lesson && snap.beat && Lab

  // 自動貼合：量度舞台實際空間，計出 430×330 場景最大唔變形嘅尺寸
  // 手機/平板/桌面/投影機全部自動，唔使用戶調較
  const stageRef = useRef(null)
  const [fit, setFit] = useState({ w: 430, h: 330 })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const recompute = () => {
      const r = el.getBoundingClientRect()
      if (r.width < 50 || r.height < 50) return
      const pad = window.innerWidth < 768 ? 8 : 40
      const s = Math.min((r.width - pad) / 430, (r.height - pad) / 330)
      setFit({ w: Math.round(430 * s), h: Math.round(330 * s) })
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(el)
    window.addEventListener('orientationchange', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', recompute)
    }
  }, [])

  return (
    <section ref={stageRef} className="relative h-[58%] w-full overflow-hidden bg-black md:h-[70%]">
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

      {/* 觀景窗四角（左上角手機版收起俾漢堡選單；右下角上課時收起俾資訊列） */}
      {[
        'top-6 left-6 border-t border-l hidden md:block',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        ...(total > 0 ? [] : ['bottom-6 right-6 border-b border-r']),
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

      {/* 右上角：小標題 · 而家上到邊一小節（同左上角對稱；手機版收起避免同左標題相撞） */}
      {unitTitle && (
        <span className="absolute right-4 top-4 z-10 hidden text-right text-[10px] font-medium tracking-[0.35em] text-zinc-500 md:right-8 md:top-7 md:block">
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
          /* 自動貼合尺寸：wrapper 尺寸由 ResizeObserver 計算，svg 填滿唔變形 */
          <div className="flex h-full w-full items-center justify-center p-2 md:p-5">
            <div className="shrink-0" style={{ width: fit.w, height: fit.h }}>
              <Lab key={snap.beat.id} mode={snap.beat.mode} stage={stage} />
            </div>
          </div>
        ) : (
          <Placeholder pendingTitle={snap.pendingTitle} mode={snap.mode} />
        )}
      </div>

      {/* 右下角資訊列：滑動提示(手機) / 快速鍵(桌面) + 頁內圓點 + 頁數
          —— 放入舞台範圍，唔跟內容淡化；右下角觀景窗標記讓位俾佢 */}
      {total > 0 && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 backdrop-blur md:bottom-6 md:right-8">
          <span className="text-[10px] tracking-[0.15em] text-zinc-600 md:hidden">
            滑動 ↑↓
          </span>
          <span className="hidden text-[10px] tracking-[0.15em] text-zinc-600 md:inline">
            快速鍵 ↑↓
          </span>
          {steps > 1 && (
            <span className="flex items-center gap-1">
              {Array.from({ length: steps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    i <= stage ? 'bg-amber-400' : 'bg-white/15'
                  }`}
                />
              ))}
            </span>
          )}
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-500">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>
      )}
    </section>
  )
}
