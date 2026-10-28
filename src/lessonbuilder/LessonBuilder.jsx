import { useEffect, useMemo, useState } from 'react'

/**
 * DSE Visual Tutor · 後台劇本制作器（內部工具）
 *
 * 導師喺 GUI 度砌步驟，即時預覽 + 下載 JSON。
 * 出嘅格式跟現有 lessonScript 慣例：
 *   { title, module, steps: [{ id, text, action }] }
 * text/action 對應 lessons.js 入面 beat 嘅 caption/mode 來源。
 */

// ---- 常數 ---------------------------------------------------------------

/** 課程單元（label 畀人睇，value 畀程式用） */
const MODULES = [
  ['COMPULSORY', '必修'],
  ['M1', 'M1'],
  ['M2', 'M2'],
  ['PRE_DSE', 'PRE-DSE'],
]

/** 下拉選單嘅預設視覺動作——按 lab 分組，「通用」= 用戶指定四個；其餘係現有 Lab 真正支援嘅 mode */
const ACTION_GROUPS = [
  {
    label: '通用指令',
    actions: [
      ['show_triangle', 'show_triangle — 顯示三角形'],
      ['draw_line', 'draw_line — 畫線'],
      ['highlight_angle', 'highlight_angle — 高亮角度'],
      ['extract_2d', 'extract_2d — 3D 拆 2D'],
    ],
  },
  {
    label: '畢氏定理 Lab',
    actions: [
      ['draw_squares', 'draw_squares — 畫 a² / b² 正方形'],
      ['build_square', 'build_square — 起 (a+b) 大正方形'],
      ['arrange_pieces', 'arrange_pieces — 排滿碎片'],
      ['shift_pieces', 'shift_pieces — 剪碎移位'],
      ['reveal_c2', 'reveal_c2 — 顯示 c²'],
      ['conclude', 'conclude — 結論'],
    ],
  },
  {
    label: '百分數 Lab（K5）',
    actions: [
      ['pct_concept', 'pct_concept — 變化公式'],
      ['pct_increase', 'pct_increase — 增加 +30%'],
      ['pct_decrease', 'pct_decrease — 減少 −20%'],
      ['pct_tricky', 'pct_tricky — 升跌唔對稱陷阱'],
      ['profit', 'profit — 盈利（基數=成本）'],
      ['discount', 'discount — 折扣 8 折'],
      ['interest', 'interest — 單利息'],
      ['real_life', 'real_life — 手機減價'],
      ['mistakes', 'mistakes — 常犯錯誤'],
      ['summary', 'summary — 章總結'],
    ],
  },
  {
    label: '有理無理 Lab（K4）',
    actions: [
      ['nth_root', 'nth_root — 根號與平方根'],
      ['irrational', 'irrational — √2 無理數'],
      ['rational', 'rational — 有理數 p/q'],
      ['classify', 'classify — 分類練習'],
      ['simplify', 'simplify — 化簡 √8'],
      ['surd_add', 'surd_add — 同類根式相加'],
      ['surd_mul', 'surd_mul — 根式相乘'],
      ['real_life', 'real_life — 正方形邊長'],
      ['mistakes', 'mistakes — 常犯錯誤'],
      ['summary', 'summary — 章總結'],
    ],
  },
  {
    label: '近似值 Lab（K3）',
    actions: [
      ['concept', 'concept — 真值 vs 近似值（數線）'],
      ['decimal_round', 'decimal_round — 四捨五入小數位'],
      ['sig_fig', 'sig_fig — 有效數字'],
      ['round_place', 'round_place — 十/百/千位'],
      ['estimate', 'estimate — 湊整速算'],
      ['real_life', 'real_life — 購物估計'],
      ['mistakes', 'mistakes — 常犯錯誤'],
      ['summary', 'summary — 章總結'],
    ],
  },
  {
    label: '有向數 Lab（K2）',
    actions: [
      ['number_line', 'number_line — 數線與正負區'],
      ['opposite', 'opposite — 相反數'],
      ['add_pos', 'add_pos — 加正數向右'],
      ['add_neg', 'add_neg — 加負數向左'],
      ['subtract', 'subtract — 減 = 加相反數'],
      ['multiply', 'multiply — 乘法符號法則'],
      ['divide', 'divide — 除法符號法則'],
      ['mixed_ops', 'mixed_ops — 混合運算'],
      ['real_life', 'real_life — 氣溫應用'],
      ['mistakes', 'mistakes — 常犯錯誤'],
      ['summary', 'summary — 章總結'],
    ],
  },
  {
    label: '基本運算 Lab（K1）',
    actions: [
      ['div4', 'div4 — 整除性 4（316 逐行）'],
      ['div8', 'div8 — 整除性 8（1,024 逐行）'],
      ['div9', 'div9 — 整除性 9/3（數字和）'],
      ['div6', 'div6 — 整除性 6（雙重檢驗）'],
      ['power', 'power — 冪：定義 + 三例'],
      ['power_expand', 'power_expand — 冪展開三例'],
      ['power_table', 'power_table — 平方立方表'],
      ['power_compare', 'power_compare — 2³ vs 3²'],
      ['primes', 'primes — 質數 vs 合數'],
      ['tree', 'tree — 質因數分解（短除法）'],
      ['short_div', 'short_div — 短除法 60'],
      ['factor_why', 'factor_why — 84 例子與唯一性'],
      ['hcf', 'hcf — HCF 完整計算'],
      ['lcm', 'lcm — LCM 完整計算 + 驗算'],
      ['short_both', 'short_both — 短除法 HCF+LCM'],
      ['hcf_app', 'hcf_app — 剪絲帶/閃燈應用'],
      ['frac_mul', 'frac_mul — 分數乘法逐行'],
      ['frac_add', 'frac_add — 分數加法/通分'],
      ['frac_compare', 'frac_compare — 分數比大小'],
      ['mixed', 'mixed — 混合運算逐行'],
      ['summary', 'summary — 章總結'],
    ],
  },
  {
    label: '直立角錐 Lab（2012 Q18）',
    actions: [
      ['figure', 'figure — 先睇圖'],
      ['question', 'question — 題目文字'],
      ['why', 'why — 已知：直立（VO ⊥ 底面）'],
      ['face', 'face — 已知：面角 ∠VAB'],
      ['pq', 'pq — 已知：切面位置 P·Q'],
      ['pb', 'pb — 已知：∠PBA'],
      ['ask', 'ask — 切走 VPBCQ'],
      ['whatA', 'whatA — 問 (a) 搵 AP'],
      ['whatB', 'whatB — 問 (b) 比 α 同 β'],
      ['va', 'va — 搵 VA'],
      ['tri', 'tri — △ABP 收角'],
      ['ap', 'ap — 正弦定律搵 AP'],
      ['build', 'build — 起 α 垂直線'],
      ['vo', 'vo — 搵高度 VO'],
      ['ph', 'ph — 線性縮放搵 PH'],
      ['hh', 'hh — 上視圖搵 HH′'],
      ['alpha', 'alpha — tan α'],
      ['beta', 'beta — β 角'],
      ['compare', 'compare — 點解 α 勝'],
      ['answer', 'answer — 答案總覽'],
      ['verify', 'verify — 驗證'],
      ['guide', 'guide — 解題指南'],
    ],
  },
]

/** 「自訂」選項嘅哨兵值——揀咗先會顯示自由輸入欄 */
const CUSTOM = '__custom__'

/** localStorage 草稿 key */
const STORAGE_KEY = 'dse-vt-lesson-builder-draft'

/** 一個空步驟 */
const blankStep = () => ({ text: '', action: 'show_triangle', customAction: '' })

/** 初始草稿：一個空步驟起步 */
const initialDraft = () => ({ title: '', module: 'COMPULSORY', steps: [blankStep()] })

/** 由 localStorage 讀草稿；形狀唔啱就當無（防舊版 / 爛 JSON） */
const loadDraft = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const d = JSON.parse(raw)
    if (typeof d?.title !== 'string' || !Array.isArray(d?.steps)) return null
    return {
      title: d.title,
      module: MODULES.some(([v]) => v === d.module) ? d.module : 'COMPULSORY',
      steps: d.steps.map((s) => ({
        text: typeof s?.text === 'string' ? s.text : '',
        action: typeof s?.action === 'string' && s.action ? s.action : 'show_triangle',
        customAction: typeof s?.customAction === 'string' ? s.customAction : '',
      })),
    }
  } catch {
    return null
  }
}

// ---- 組件 ---------------------------------------------------------------

export default function LessonBuilder() {
  // lazy initial state：一開 render 就讀返上次草稿
  // （唔好用 load effect——StrictMode 雙掛載會令空白 save 搶先覆寫 localStorage）
  const [draft, setDraft] = useState(() => loadDraft() ?? initialDraft())

  // 任何改動自動存入本機
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      /* 私密模式寫唔入就算 */
    }
  }, [draft])

  // ---- 基本資料 ----
  const setTitle = (title) => setDraft((d) => ({ ...d, title }))
  const setModule = (module) => setDraft((d) => ({ ...d, module }))

  // ---- 步驟操作 ----
  const updateStep = (i, patch) =>
    setDraft((d) => ({
      ...d,
      steps: d.steps.map((s, j) => (j === i ? { ...s, ...patch } : s)),
    }))

  const addStep = () =>
    setDraft((d) => ({ ...d, steps: [...d.steps, blankStep()] }))

  const removeStep = (i) =>
    setDraft((d) => ({ ...d, steps: d.steps.filter((_, j) => j !== i) }))

  const moveStep = (i, dir) =>
    setDraft((d) => {
      const j = i + dir
      if (j < 0 || j >= d.steps.length) return d
      const steps = [...d.steps]
      ;[steps[i], steps[j]] = [steps[j], steps[i]]
      return { ...d, steps }
    })

  const resetDraft = () => {
    if (!window.confirm('確定清空成個草稿？呢個動作無得復原。')) return
    localStorage.removeItem(STORAGE_KEY)
    setDraft(initialDraft())
  }

  // ---- JSON 產生（id 由位置自動遞增，唔使手填）----
  const payload = useMemo(
    () => ({
      title: draft.title.trim(),
      module: draft.module,
      steps: draft.steps.map((s, i) => ({
        id: i + 1,
        text: s.text,
        action: s.action === CUSTOM ? s.customAction.trim() : s.action,
      })),
    }),
    [draft],
  )

  const jsonText = useMemo(() => JSON.stringify(payload, null, 2), [payload])

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText)
    } catch {
      // file:// 或舊瀏覽器無 clipboard API——兜底用隱形 textarea
      const ta = document.createElement('textarea')
      ta.value = jsonText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
  }

  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    // 檔名 = 課程標題.json；無標題就叫 lesson.json；濾走檔名非法字元
    const safeName = (draft.title.trim() || 'lesson').replace(/[\\/:*?"<>|]/g, '_')
    a.download = `${safeName}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const hasTitle = draft.title.trim() !== ''

  return (
    <div className="flex h-full flex-col bg-[#0a0a0c] text-zinc-100">
      {/* ---- 頂部標題 ---- */}
      <header className="shrink-0 border-b border-white/10 bg-black/40 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black tracking-tight md:text-2xl">
              DSE Visual Tutor <span className="text-zinc-500">·</span>{' '}
              <span className="text-[#4cc9f0]">後台劇本制作器</span>
            </h1>
            <p className="mt-0.5 text-xs text-zinc-500">
              內部工具 — 砌步驟、即時預覽、下載 JSON 劇本
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#4cc9f0]/30 bg-[#4cc9f0]/10 px-3 py-1 text-xs text-[#4cc9f0]">
              {draft.steps.length} 個步驟
            </span>
            <a
              href="/"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              ← 返學生版
            </a>
          </div>
        </div>
      </header>

      {/* ---- 主體：左 = 表單，右 = JSON 預覽 ---- */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 overflow-y-auto p-4 md:p-8 lg:flex-row">
        {/* 左欄 */}
        <section className="min-w-0 flex-1 space-y-6">
          {/* 課程基本資料 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-sm font-bold tracking-widest text-zinc-400">課程基本資料</h2>
              <span className="text-[11px] text-zinc-600">草稿會自動儲存喺本機</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  課程標題 (Title)
                </span>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例：2012 卷一 Q18 · 直立角錐切模型"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#4cc9f0]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                  課程單元 (Module)
                </span>
                <select
                  value={draft.module}
                  onChange={(e) => setModule(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#4cc9f0]"
                >
                  {MODULES.map(([v, label]) => (
                    <option key={v} value={v} className="bg-zinc-900">
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* 動態步驟 */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-zinc-400">教學步驟</h2>

            {draft.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
              >
                {/* 卡頂：步驟 ID（自動）+ 排序 + 刪除 */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-7 items-center gap-2 rounded-full bg-[#4cc9f0]/15 px-3 text-xs font-bold text-[#4cc9f0]">
                    步驟 {i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveStep(i, -1)}
                      disabled={i === 0}
                      aria-label="上移"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveStep(i, 1)}
                      disabled={i === draft.steps.length - 1}
                      aria-label="下移"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeStep(i)}
                      className="ml-1 rounded-lg border border-red-500/30 px-2.5 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/15 hover:text-red-300"
                    >
                      刪除此步驟
                    </button>
                  </div>
                </div>

                {/* 字幕 */}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                    教學字幕（老師講解）
                  </span>
                  <textarea
                    rows={3}
                    value={step.text}
                    onChange={(e) => updateStep(i, { text: e.target.value })}
                    placeholder="例：同學，睇下呢個直角三角形……"
                    className="w-full resize-y rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#4cc9f0]"
                  />
                </label>

                {/* 視覺動作 */}
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                    視覺動作指令 (Action)
                  </span>
                  <select
                    value={step.action}
                    onChange={(e) => updateStep(i, { action: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-[#4cc9f0]"
                  >
                    {ACTION_GROUPS.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.actions.map(([v, label]) => (
                          <option key={v} value={v} className="bg-zinc-900">
                            {label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <optgroup label="自訂">
                      <option value={CUSTOM} className="bg-zinc-900">
                        ⌨ 自訂指令…
                      </option>
                    </optgroup>
                  </select>
                </label>

                {/* 揀咗「自訂」先顯示 */}
                {step.action === CUSTOM && (
                  <input
                    type="text"
                    value={step.customAction}
                    onChange={(e) => updateStep(i, { customAction: e.target.value })}
                    placeholder="輸入自訂 action，例：zoom_in"
                    className="mt-2 w-full rounded-xl border border-[#4cc9f0]/40 bg-black/40 px-3.5 py-2 font-mono text-sm text-[#4cc9f0] outline-none placeholder:text-zinc-600 focus:border-[#4cc9f0]"
                  />
                )}
              </div>
            ))}

            {/* 新增按鈕 */}
            <button
              onClick={addStep}
              className="w-full rounded-2xl border-2 border-dashed border-[#4cc9f0]/40 bg-[#4cc9f0]/5 py-4 text-sm font-bold text-[#4cc9f0] transition-colors hover:border-[#4cc9f0] hover:bg-[#4cc9f0]/15"
            >
              ＋ 新增下一步
            </button>
          </div>

          <button
            onClick={resetDraft}
            className="text-xs text-zinc-600 underline-offset-2 transition-colors hover:text-red-400 hover:underline"
          >
            重設整個草稿
          </button>
        </section>

        {/* 右欄：JSON 預覽 + 匯出 */}
        <aside className="w-full shrink-0 lg:sticky lg:top-0 lg:w-[440px] lg:self-start">
          <div className="flex h-[60vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:h-[calc(100vh-9.5rem)]">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3.5">
              <h2 className="text-sm font-bold tracking-widest text-zinc-400">JSON 預覽</h2>
              <span className="font-mono text-[11px] text-zinc-600">唯讀 · 即時同步</span>
            </div>

            <pre className="flex-1 overflow-auto whitespace-pre p-5 font-mono text-[11px] leading-relaxed text-zinc-300">
              {jsonText}
            </pre>

            <div className="shrink-0 space-y-2.5 border-t border-white/10 p-5">
              {!hasTitle && (
                <p className="text-[11px] text-amber-400/90">
                  ⚠ 未填課程標題——下載時會用 lesson.json 做檔名
                </p>
              )}
              <button
                onClick={downloadJson}
                className="w-full rounded-xl bg-[#4cc9f0] py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(76,201,240,0.35)] transition-all hover:brightness-110 active:scale-[0.99]"
              >
                ⬇ 下載 JSON 檔案
              </button>
              <button
                onClick={copyJson}
                className="w-full rounded-xl border border-white/15 py-2.5 text-xs text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                複製 JSON 到剪貼簿
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
