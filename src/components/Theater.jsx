import { useEffect, useRef, useState } from 'react'
import PyramidLab from './PyramidLab.jsx'
import PythagorasLab from './PythagorasLab.jsx'
import BasicLab from './BasicLab.jsx'
import DirectedLab from './DirectedLab.jsx'
import ApproxLab from './ApproxLab.jsx'
import RationalLab from './RationalLab.jsx'
import PercentLab from './PercentLab.jsx'
import RatioLab from './RatioLab.jsx'
import AlgebraLab from './AlgebraLab.jsx'
import TopicLab from './TopicLab.jsx'
import { STAGE_W, STAGE_H } from './LabStage.jsx'

const LABS = {
  pyramid: PyramidLab,
  pythagoras: PythagorasLab,
  basic: BasicLab,
  directed: DirectedLab,
  approx: ApproxLab,
  rational: RationalLab,
  percent: PercentLab,
  ratio: RatioLab,
  algebra: AlgebraLab,
  // 其餘 PRE-DSE 章全部共用 TopicLab（場景由 mode「章.場景」驅動）
  k8: TopicLab,
  k9: TopicLab,
  k10: TopicLab,
  k11: TopicLab,
  k12: TopicLab,
  k13: TopicLab,
  k14: TopicLab,
  k15: TopicLab,
  k16: TopicLab,
  k17: TopicLab,
  k18: TopicLab,
  k19: TopicLab,
  k20: TopicLab,
  k21: TopicLab,
  k22: TopicLab,
  k23: TopicLab,
  k24: TopicLab,
  k25m: TopicLab,
  k26: TopicLab,
  k27: TopicLab,
  k28: TopicLab,
  k29: TopicLab,
  k30: TopicLab,
  k31: TopicLab,
  k32: TopicLab,
  // DSE 必修 + 延伸模組同樣共用 TopicLab
  u1: TopicLab,
  u2: TopicLab,
  u3: TopicLab,
  u4: TopicLab,
  u5: TopicLab,
  u6: TopicLab,
  u7: TopicLab,
  u8: TopicLab,
  u9: TopicLab,
  u10: TopicLab,
  u11: TopicLab,
  u12: TopicLab,
  u13: TopicLab,
  u14: TopicLab,
  u15: TopicLab,
  u16: TopicLab,
  u17: TopicLab,
  u18: TopicLab,
  u19: TopicLab,
  u20: TopicLab,
  m1: TopicLab,
  m2: TopicLab,
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

function Placeholder({ pendingTitle }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <p className="text-lg font-medium tracking-[0.35em] text-zinc-600">
        {pendingTitle ? `「${pendingTitle}」` : '請先揀選單元'}
      </p>
      {pendingTitle ? (
        <p className="text-xs tracking-[0.3em] text-zinc-600">單元製作中 — 敬請期待</p>
      ) : (
        <p className="text-xs tracking-[0.25em] text-zinc-700">左側課程列表 · 點一下就開始</p>
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

  // 自動貼合：量度舞台實際空間，計出場景（STAGE_W × STAGE_H）最大唔變形嘅尺寸
  // 手機/平板/桌面/投影機全部自動，唔使用戶調較
  const stageRef = useRef(null)
  const [fit, setFit] = useState({ w: STAGE_W, h: STAGE_H })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const recompute = () => {
      const r = el.getBoundingClientRect()
      if (r.width < 50 || r.height < 50) return
      const mobile = window.innerWidth < 768
      // 同下面 flex p-2 / p-5 對齊（兩邊合計），再留位俾頂部標題 / 右下角頁碼
      const padX = mobile ? 16 : 40
      const padY = mobile ? 16 : 40
      const chromeTop = mobile ? 44 : 36
      const chromeBottom = mobile ? 40 : 44
      const s = Math.min(
        (r.width - padX) / STAGE_W,
        (r.height - padY - chromeTop - chromeBottom) / STAGE_H,
      )
      // 用同一個 s 計寬高，避免分開 round 令比例歪 1px
      const next = { w: Math.round(STAGE_W * s), h: Math.round(STAGE_H * s) }
      setFit(next)
      // #region agent log
      requestAnimationFrame(() => {
        const lab = el.querySelector('.idx-lab')
        const info = el.querySelector('.absolute.bottom-4, .absolute.bottom-6')
        const topLbl = el.querySelector('span.absolute.left-16, span.absolute.md\\:left-8')
        let chromeOverlap = null
        if (lab && info) {
          const L = lab.getBoundingClientRect()
          const I = info.getBoundingClientRect()
          const ox = Math.max(0, Math.min(L.right, I.right) - Math.max(L.left, I.left))
          const oy = Math.max(0, Math.min(L.bottom, I.bottom) - Math.max(L.top, I.top))
          if (ox * oy > 20) chromeOverlap = { with: 'infoBar', area: Math.round(ox * oy), labBottom: Math.round(L.bottom), infoTop: Math.round(I.top) }
        }
        if (lab && topLbl && !chromeOverlap) {
          const L = lab.getBoundingClientRect()
          const T = topLbl.getBoundingClientRect()
          const ox = Math.max(0, Math.min(L.right, T.right) - Math.max(L.left, T.left))
          const oy = Math.max(0, Math.min(L.bottom, T.bottom) - Math.max(L.top, T.top))
          if (ox * oy > 20) chromeOverlap = { with: 'topLabel', area: Math.round(ox * oy) }
        }
        fetch('http://127.0.0.1:7691/ingest/cc9e9dff-d30f-40e1-a86b-8f44c754203f', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'fb17f7' },
          body: JSON.stringify({
            sessionId: 'fb17f7',
            runId: 'post-fix',
            hypothesisId: 'D',
            location: 'Theater.jsx:recompute',
            message: 'Theater fit vs chrome overlap',
            data: { fit: next, stageH: Math.round(r.height), stageW: Math.round(r.width), chromeTop, chromeBottom, chromeOverlap },
            timestamp: Date.now(),
          }),
        }).catch(() => {})
      })
      // #endregion
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
    <section ref={stageRef} className="relative h-[68%] w-full overflow-hidden bg-black md:h-[76%]">
      {/* 柔和的舞台燈光（呼吸微動） */}
      <div
        className="spotlight-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 45%, rgba(251,191,36,0.07), transparent 70%)',
        }}
      />
      {/* 極淡的數學格線（慢慢漂移） */}
      <div className="stage-grid grid-drift pointer-events-none absolute inset-0" />

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
          <div key={snap.beat.id} className="stage-in flex h-full w-full items-center justify-center overflow-hidden p-2 md:p-5">
            <div className="shrink-0 overflow-hidden" style={{ width: fit.w, height: fit.h }}>
              <Lab mode={snap.beat.mode} stage={stage} />
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
            點下面繼續 · 滑動 ↑↓
          </span>
          <span className="hidden text-[10px] tracking-[0.15em] text-zinc-600 md:inline">
            點下面繼續 · 快速鍵 ↑↓
          </span>
          {steps > 1 && (
            <span className="flex items-center gap-1">
              {Array.from({ length: steps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    i <= stage ? 'bg-amber-400' : 'bg-white/15'
                  } ${i === stage ? 'dot-active-pulse' : ''}`}
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
