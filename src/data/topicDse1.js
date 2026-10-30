import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** DSE U1–U7 嘅場景資料（TopicLab 渲染） */

export const D1 = {
  /* ============ U1 一元二次方程（數學總結 P8–9） ============ */
  u1: {
    concept: {
      title: '一元二次方程', ds: 1,
      lines: [[{ t: 'ax² + bx + c = 0（a ≠ 0）' }], [{ t: '數學總結 P8 · 方程章', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 28, w: 700, text: 'ax² + bx + c = 0' },
        { k: 'chip', x: 40, y: 145, w: 110, h: 64, f: BLUE, label: 'a ≠ 0', sub: '二次項', at: 1 },
        { k: 'chip', x: 160, y: 145, w: 110, h: 64, f: GOLD, label: 'b', sub: '一次項', at: 1 },
        { k: 'chip', x: 280, y: 145, w: 110, h: 64, f: OK, label: 'c', sub: '常數項', at: 1 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '最高次係 2 · 一個未知數', at: 2 },
      ],
    },
    factor: {
      title: '因式法', ds: 1,
      lines: [[{ t: '拆成兩個括號 · 邊個 = 0 都得' }], [{ t: 'x = 2 或 x = 3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 75, s: 26, text: 'x² − 5x + 6 = 0' },
        { k: 't', x: 215, y: 125, s: 24, f: BLUE, w: 700, text: '(x − 2)(x − 3) = 0', at: 1 },
        { k: 't', x: 215, y: 175, s: 18, f: MUTED, text: 'x−2=0 或 x−3=0', at: 2 },
        { k: 't', x: 215, y: 230, s: 30, f: GOLD, w: 700, text: 'x = 2 或 x = 3', at: 3 },
      ],
    },
    complete: {
      title: '配方法', ds: 1,
      lines: [[{ t: '寫成完全平方式再開方' }], [{ t: 'x = 5 或 x = 1', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 24, text: 'x² − 6x + 5 = 0' },
        { k: 't', x: 215, y: 115, s: 20, f: BLUE, w: 700, text: 'x² − 6x + 9 = 4', at: 1 },
        { k: 't', x: 215, y: 155, s: 20, text: '(x − 3)² = 4', at: 2 },
        { k: 't', x: 215, y: 195, s: 20, text: 'x − 3 = ±2', at: 3 },
        { k: 't', x: 215, y: 245, s: 28, f: GOLD, w: 700, text: 'x = 5 或 x = 1', at: 4 },
      ],
    },
    formula: {
      title: '求根公式（P8）', ds: 1,
      lines: [[{ t: 'x = [−b ± √(b²−4ac)] / (2a)' }], [{ t: 'x = 2 或 −1/2', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 65, s: 20, text: '2x² − 3x − 2 = 0' },
        { k: 't', x: 215, y: 105, s: 17, f: MUTED, text: 'a=2 · b=−3 · c=−2', at: 1 },
        { k: 't', x: 215, y: 145, s: 20, f: BLUE, w: 700, text: 'Δ = 9 + 16 = 25', at: 2 },
        { k: 't', x: 215, y: 185, s: 18, text: 'x = [3 ± 5] / 4', at: 3 },
        { k: 't', x: 215, y: 235, s: 26, f: GOLD, w: 700, text: 'x = 2 或 −1/2', at: 4 },
      ],
    },
    disc: {
      title: '根的數目 · Δ（P8）', ds: 1,
      lines: [[{ t: 'Δ = b² − 4ac 決定根嘅數目' }], [{ t: '書上三種情形要背', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 90, w: 110, h: 72, f: OK, label: 'Δ > 0', sub: '兩個不同實根' },
        { k: 'chip', x: 160, y: 90, w: 110, h: 72, f: BLUE, label: 'Δ = 0', sub: '一個實根（重根）', at: 1 },
        { k: 'chip', x: 280, y: 90, w: 110, h: 72, f: RED, label: 'Δ < 0', sub: '無實數根', at: 2 },
        { k: 't', x: 215, y: 210, s: 18, f: MUTED, text: 'Δ 就係公式 √ 入面嗰份', at: 3 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '數學總結 P8 (2)', at: 3 },
      ],
    },
    build: {
      title: '由已知根建方程（P8）', ds: 1,
      lines: [[{ t: 'x² − (和)x + (積) = 0' }], [{ t: 'x² − 5x + 6 = 0', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 75, s: 22, text: '根 α=2 · β=3' },
        { k: 't', x: 215, y: 125, s: 20, f: BLUE, w: 700, text: '和 5 · 積 6', at: 1 },
        { k: 't', x: 215, y: 175, s: 20, text: 'x² − (α+β)x + αβ = 0', at: 2 },
        { k: 't', x: 215, y: 235, s: 28, f: GOLD, w: 700, text: 'x² − 5x + 6 = 0', at: 3 },
      ],
    },
    coef: {
      title: '根與係數（P8 非基礎）', ds: 1,
      lines: [[{ t: 'α+β = −b/a · αβ = c/a' }], [{ t: '唔使解出根都可以用', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 26, text: 'α + β = −b/a' },
        { k: 't', x: 215, y: 145, s: 26, f: GOLD, w: 700, text: 'αβ = c/a', at: 1 },
        { k: 't', x: 215, y: 210, s: 17, f: MUTED, text: '數學總結 P8 (4)', at: 2 },
      ],
    },
    squares: {
      title: 'α² + β² 恆等式', ds: 1,
      lines: [[{ t: 'α² + β² = (α+β)² − 2αβ' }], [{ t: '用和同積直接計', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: 'α² + β² = (α+β)² − 2αβ' },
        { k: 't', x: 215, y: 155, s: 18, f: BLUE, w: 700, text: '例：和 5 · 積 6', at: 1 },
        { k: 't', x: 215, y: 215, s: 26, f: GOLD, w: 700, text: 'α²+β² = 25 − 12 = 13', at: 2 },
      ],
    },
    complex: {
      title: '複數運算（P8）', ds: 1,
      lines: [[{ t: 'i² = −1 · 共軛 a−bi' }], [{ t: '(3+i)/(2−i) = 1+i', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 80, w: 90, h: 56, f: BLUE, label: 'i²', sub: '= −1' },
        { k: 'chip', x: 140, y: 80, w: 90, h: 56, f: GOLD, label: 'i³', sub: '= −i', at: 1 },
        { k: 'chip', x: 240, y: 80, w: 90, h: 56, f: OK, label: 'i⁴', sub: '= 1', at: 1 },
        { k: 't', x: 215, y: 175, s: 18, f: BLUE, w: 700, text: '(3+i)/(2−i) × (2+i)/(2+i)', at: 2 },
        { k: 't', x: 215, y: 230, s: 26, f: GOLD, w: 700, text: '= 1 + i', at: 3 },
      ],
    },
    complex_build: {
      title: '複數根建方程（P9）', ds: 1,
      lines: [[{ t: '有 2+3i → 必有 2−3i' }], [{ t: 'x² − 4x + 13 = 0', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 20, text: '一根：2 + 3i' },
        { k: 't', x: 215, y: 115, s: 20, f: BLUE, w: 700, text: '共軛根：2 − 3i', at: 1 },
        { k: 't', x: 215, y: 160, s: 18, text: '和 = 4 · 積 = 13', at: 2 },
        { k: 't', x: 215, y: 210, s: 26, f: GOLD, w: 700, text: 'x² − 4x + 13 = 0', at: 3 },
        { k: 't', x: 215, y: 255, s: 15, f: MUTED, text: '數學總結 P9 (6) 例', at: 4 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '分母 2a · Δ 減號 · 和有負號' }], [{ t: '複數根要連共軛', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 70, s: 17, f: RED, w: 700, text: '✗ 分母寫 2（漏 a）' },
        { k: 't', x: 215, y: 110, s: 17, f: OK, w: 700, text: '✓ 分母一定係 2a', at: 1 },
        { k: 't', x: 215, y: 155, s: 17, f: RED, w: 700, text: '✗ α+β = b/a', at: 2 },
        { k: 't', x: 215, y: 195, s: 17, f: OK, w: 700, text: '✓ α+β = −b/a', at: 3 },
        { k: 't', x: 215, y: 240, s: 17, f: OK, w: 700, text: '✓ 實係數 → 共軛根一齊寫', at: 4 },
      ],
    },
    apply: {
      title: '應用 · 長方形', ds: 1,
      lines: [[{ t: '長比闊多 3 · 面積 40' }], [{ t: '闊 5 · 長 8', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 75, s: 20, text: '設闊 = x → 長 = x + 3' },
        { k: 't', x: 215, y: 125, s: 22, f: BLUE, w: 700, text: 'x(x + 3) = 40', at: 1 },
        { k: 't', x: 215, y: 175, s: 20, text: 'x² + 3x − 40 = 0', at: 2 },
        { k: 't', x: 215, y: 230, s: 26, f: GOLD, w: 700, text: 'x = 5（−8 捨）', at: 3 },
      ],
    },
    summary: {
      title: 'U1 完成', ds: 1,
      lines: [[{ t: '公式 · Δ · 根係數 · 複數' }], [{ t: '下一章：U2 函數及其圖像', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: '公式' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: 'Δ', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: '共軛', at: 2 },
      ],
    },
  },

  /* ============ U2 函數及其圖像（數學總結 P11–12 · PRE-DSE 排版） ============ */
  u2: {
    concept: {
      title: '乜嘢係函數', ds: 1,
      lines: [[{ t: '每個准許嘅 x 只對應一個 y' }], [{ t: '寫 y = f(x)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 90, y: 140, s: 28, f: BLUE, w: 700, text: 'x' },
        { k: 'arrow', x1: 125, y1: 132, x2: 185, y2: 132, f: GOLD, at: 1 },
        { k: 'chip', x: 190, y: 100, w: 90, h: 64, f: GOLD, label: 'f', sub: '規則', at: 1 },
        { k: 'arrow', x1: 285, y1: 132, x2: 335, y2: 132, f: GOLD, at: 2 },
        { k: 't', x: 365, y: 140, s: 28, f: OK, w: 700, text: 'f(x)', at: 2 },
      ],
    },
    notation: {
      title: '記法 · 代入 · 定義域', ds: 1,
      lines: [[{ t: '括號入面嘅數代入 x' }], [{ t: 'f(3) = 7', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 28, text: 'f(x) = 2x + 1' },
        { k: 't', x: 215, y: 135, s: 24, f: BLUE, w: 700, text: 'f(3) = 2·3 + 1', at: 1 },
        { k: 't', x: 215, y: 190, s: 34, f: GOLD, w: 700, text: '= 7', at: 2 },
        { k: 't', x: 215, y: 245, s: 16, f: MUTED, text: '定義域：分母 ≠ 0 · 偶次根 ≥ 0', at: 3 },
      ],
    },
    quadratic: {
      title: '二次函數標準形', ds: 1,
      lines: [[{ t: 'y = ax² + bx + c（a ≠ 0）' }], [{ t: '最高次係 2', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 28, w: 700, text: 'y = ax² + bx + c' },
        { k: 'chip', x: 40, y: 150, w: 110, h: 64, f: BLUE, label: 'a ≠ 0', sub: '二次項', at: 1 },
        { k: 'chip', x: 160, y: 150, w: 110, h: 64, f: GOLD, label: 'b', sub: '一次項', at: 1 },
        { k: 'chip', x: 280, y: 150, w: 110, h: 64, f: OK, label: 'c', sub: '常數／y截', at: 1 },
        { k: 't', x: 215, y: 250, s: 17, f: MUTED, text: '數學總結 P12', at: 2 },
      ],
    },
    features: {
      title: '圖像四招（MC）', ds: 1,
      lines: [[{ t: '開口 · 截距 · 對稱軸 · Δ' }], [{ t: '四招對齊揀圖', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 90, w: 110, h: 64, f: BLUE, label: 'a 方向', sub: 'a>0 向上' },
        { k: 'chip', x: 160, y: 90, w: 110, h: 64, f: GOLD, label: 'c 截距', sub: '交 y 軸', at: 1 },
        { k: 'chip', x: 280, y: 90, w: 110, h: 64, f: OK, label: '−b/2a', sub: '對稱軸', at: 2 },
        { k: 'chip', x: 160, y: 175, w: 110, h: 64, f: RED, label: 'Δ', sub: '交幾點', at: 3 },
        { k: 't', x: 215, y: 270, s: 16, f: MUTED, text: '甲卷 MC 常用', at: 3 },
      ],
    },
    vertex: {
      title: '頂點與對稱軸', ds: 1,
      lines: [[{ t: '頂點 x = −b / 2a' }], [{ t: '對稱軸穿過頂點', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 90 90 Q 215 272 340 90', f: BLUE, w: 3 },
        { k: 'line', x1: 215, y1: 55, x2: 215, y2: 200, f: GOLD, dash: '5 4', at: 1 },
        { k: 'dot', x: 215, y: 178, r: 7, f: GOLD, label: '頂點', at: 2 },
        { k: 't', x: 215, y: 250, s: 18, f: MUTED, text: '(−b/2a , f(−b/2a))', at: 3 },
      ],
    },
    disc: {
      title: 'Δ 同 x 軸交點', ds: 1,
      lines: [[{ t: 'Δ = b² − 4ac 決定交幾點' }], [{ t: '有交點 ⇔ Δ ≥ 0', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 95, w: 110, h: 70, f: OK, label: 'Δ > 0', sub: '兩交點' },
        { k: 'chip', x: 160, y: 95, w: 110, h: 70, f: BLUE, label: 'Δ = 0', sub: '相切一點', at: 1 },
        { k: 'chip', x: 280, y: 95, w: 110, h: 70, f: RED, label: 'Δ < 0', sub: '無交點', at: 2 },
        { k: 't', x: 215, y: 220, s: 20, f: GOLD, w: 700, text: '「有交點」→ Δ ≥ 0', at: 3 },
      ],
    },
    complete: {
      title: '配方 → 頂點式', ds: 1,
      lines: [[{ t: '寫成 a(x − h)² + k' }], [{ t: '頂點 (h, k)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 22, text: 'f(x) = 2x² + 6x + 1' },
        { k: 't', x: 215, y: 115, s: 18, f: BLUE, w: 700, text: '2(x² + 3x) + 1', at: 1 },
        { k: 't', x: 215, y: 155, s: 18, text: '2[(x + 3/2)² − 9/4] + 1', at: 2 },
        { k: 't', x: 215, y: 200, s: 22, f: GOLD, w: 700, text: '2(x + 3/2)² − 7/2', at: 3 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '數學總結 P12 例', at: 4 },
      ],
    },
    maxmin: {
      title: '極大極小', ds: 1,
      lines: [[{ t: 'a > 0 → 有最小值' }], [{ t: '最低點 (−3/2 , −7/2)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 22, text: '2(x + 3/2)² − 7/2' },
        { k: 't', x: 215, y: 130, s: 20, f: BLUE, w: 700, text: '平方 ≥ 0 · 最小當括號 = 0', at: 1 },
        { k: 't', x: 215, y: 180, s: 22, text: 'x = −3/2', at: 2 },
        { k: 't', x: 215, y: 235, s: 28, f: GOLD, w: 700, text: '最小值 = −7/2', at: 3 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '開口方向 · 頂點負號 · Δ ≥ 0' }], [{ t: '搵到 x 一定代返 f(x)', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 75, s: 18, f: RED, w: 700, text: '✗ a>0 當有最大值' },
        { k: 't', x: 215, y: 115, s: 18, f: OK, w: 700, text: '✓ a>0 → 最小值', at: 1 },
        { k: 't', x: 215, y: 160, s: 18, f: RED, w: 700, text: '✗ 頂點 x = b/2a', at: 2 },
        { k: 't', x: 215, y: 200, s: 18, f: OK, w: 700, text: '✓ 頂點 x = −b/2a', at: 3 },
        { k: 't', x: 215, y: 245, s: 18, f: OK, w: 700, text: '✓ 有交點 → Δ ≥ 0', at: 4 },
      ],
    },
    apply: {
      title: '應用 · 最大面積', ds: 1,
      lines: [[{ t: '圍欄 20 m 靠牆做長方形' }], [{ t: '最大面積 = 50 m²', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 75, s: 20, text: '闊 x · 長 = 20 − 2x' },
        { k: 't', x: 215, y: 120, s: 22, f: BLUE, w: 700, text: 'A = 20x − 2x²', at: 1 },
        { k: 't', x: 215, y: 165, s: 20, text: '頂點 x = −20/(2·(−2)) = 5', at: 2 },
        { k: 't', x: 215, y: 210, s: 20, text: 'A(5) = 100 − 50', at: 3 },
        { k: 't', x: 215, y: 255, s: 28, f: GOLD, w: 700, text: '最大面積 = 50 m²', at: 4 },
      ],
    },
    summary: {
      title: 'U2 完成', ds: 1,
      lines: [[{ t: 'f(x) · 四招 · 配方 · 極值' }], [{ t: '下一章：U3 指數與對數', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: 'f(x)' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: '−b/2a', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: 'Δ', at: 2 },
      ],
    },
  },

  /* ============ U3 指數與對數（牛津 4B07/08 · 總結 P15/P17） ============ */
  u3: {
    concept: {
      title: '指數與對數互為反面', ds: 1,
      lines: [[{ t: 'a^c = b ⇔ log_a b = c' }], [{ t: '同一個事實 · 兩種寫法', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 100, w: 140, h: 70, f: BLUE, label: '2³ = 8', sub: '指數' },
        { k: 'chip', x: 235, y: 100, w: 140, h: 70, f: GOLD, label: 'log₂8=3', sub: '對數', at: 1 },
        { k: 't', x: 215, y: 230, s: 17, f: MUTED, text: '牛津 4B07／4B08 · a>0、a≠1、b>0', at: 2 },
      ],
    },
    laws: {
      title: '指數定律', ds: 1,
      lines: [[{ t: '乘加 · 除減 · 冪乘冪' }], [{ t: 'a⁰ = 1 · a⁻ⁿ = 1/aⁿ', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 85, w: 110, h: 58, f: BLUE, label: 'aᵐ·aⁿ', sub: 'a^(m+n)' },
        { k: 'chip', x: 160, y: 85, w: 110, h: 58, f: GOLD, label: 'aᵐ/aⁿ', sub: 'a^(m−n)', at: 1 },
        { k: 'chip', x: 280, y: 85, w: 110, h: 58, f: OK, label: '(aᵐ)ⁿ', sub: 'a^(mn)', at: 2 },
        { k: 'chip', x: 100, y: 165, w: 110, h: 58, f: BLUE, label: 'a⁰', sub: '= 1', at: 3 },
        { k: 'chip', x: 220, y: 165, w: 110, h: 58, f: GOLD, label: 'a⁻ⁿ', sub: '1/aⁿ', at: 3 },
        { k: 't', x: 215, y: 260, s: 15, f: MUTED, text: '數學總結 P15', at: 3 },
      ],
    },
    indices: {
      title: '有理指數', ds: 1,
      lines: [[{ t: 'a^(m/n) = (ⁿ√a)ᵐ' }], [{ t: '8^(2/3) = 4', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: 'a^(m/n) = (ⁿ√a)ᵐ' },
        { k: 't', x: 215, y: 150, s: 24, f: BLUE, w: 700, text: '8^(2/3) = (∛8)²', at: 1 },
        { k: 't', x: 215, y: 210, s: 30, f: GOLD, w: 700, text: '= 2² = 4', at: 2 },
      ],
    },
    surd: {
      title: '根式化簡', ds: 1,
      lines: [[{ t: '抽出完全平方' }], [{ t: '√288 = 12√2', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: '√288' },
        { k: 't', x: 215, y: 145, s: 22, f: BLUE, w: 700, text: '= √(144 · 2)', at: 1 },
        { k: 't', x: 215, y: 200, s: 28, f: GOLD, w: 700, text: '= 12√2', at: 2 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '加減前先化最簡', at: 3 },
      ],
    },
    log: {
      title: '對數三性質 · 換底', ds: 1,
      lines: [[{ t: '乘變加 · 除變減 · 冪落嚟' }], [{ t: 'log_a b = log b / log a', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 85, w: 110, h: 58, f: BLUE, label: 'log xy', sub: 'logx+logy' },
        { k: 'chip', x: 160, y: 85, w: 110, h: 58, f: GOLD, label: 'log(x/y)', sub: 'logx−logy', at: 1 },
        { k: 'chip', x: 280, y: 85, w: 110, h: 58, f: OK, label: 'log xⁿ', sub: 'n log x', at: 2 },
        { k: 't', x: 215, y: 185, s: 22, f: GOLD, w: 700, text: '換底：log_a b = log b / log a', at: 3 },
        { k: 't', x: 215, y: 240, s: 17, f: MUTED, text: '真數必須 > 0', at: 4 },
      ],
    },
    graphs: {
      title: '指數／對數圖像', ds: 1,
      lines: [[{ t: 'a^x 過 (0,1) · log 過 (1,0)' }], [{ t: '關於 y = x 對稱', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 80 220 Q 140 180 180 80', f: BLUE, w: 2.5 },
        { k: 'path', d: 'M 100 240 Q 200 160 320 120', f: GOLD, w: 2.5, at: 1 },
        { k: 'line', x1: 90, y1: 240, x2: 300, y2: 90, f: MUTED, dash: '4 4', at: 2 },
        { k: 't', x: 130, y: 70, s: 15, f: BLUE, text: 'y=2^x', at: 1 },
        { k: 't', x: 300, y: 150, s: 15, f: GOLD, text: 'y=log₂x', at: 1 },
        { k: 't', x: 250, y: 250, s: 15, f: MUTED, text: 'y=x', at: 2 },
      ],
    },
    eqns: {
      title: '指數與對數方程', ds: 1,
      lines: [[{ t: '2^x = 8 → x = 3' }], [{ t: 'log₂x = 3 → x = 8', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 26, text: '2^x = 8 = 2³ → x = 3' },
        { k: 't', x: 215, y: 165, s: 26, f: GOLD, w: 700, text: 'log₂x = 3 → x = 8', at: 1 },
        { k: 't', x: 215, y: 230, s: 17, f: MUTED, text: '互相反轉 · 用對數解指數', at: 2 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: 'log 加法陷阱 · 真數 · a⁰' }], [{ t: '寫完代返驗', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 75, s: 18, f: RED, w: 700, text: '✗ log(x+y)=logx+logy' },
        { k: 't', x: 215, y: 115, s: 18, f: OK, w: 700, text: '✓ 只有乘先拆成加', at: 1 },
        { k: 't', x: 215, y: 160, s: 18, f: RED, w: 700, text: '✗ log(−2) 當有答案', at: 2 },
        { k: 't', x: 215, y: 200, s: 18, f: OK, w: 700, text: '✓ 真數必須 > 0', at: 3 },
        { k: 't', x: 215, y: 245, s: 18, f: OK, w: 700, text: '✓ a⁰ = 1（唔係 0）', at: 4 },
      ],
    },
    life: {
      title: '應用 · 複利增長', ds: 1,
      lines: [[{ t: '$10 000 年息 5% 存 3 年' }], [{ t: '≈ $11 576', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: 'A = P(1 + r)ⁿ' },
        { k: 't', x: 215, y: 150, s: 22, f: BLUE, w: 700, text: '= 10 000 × 1.05³', at: 1 },
        { k: 't', x: 215, y: 215, s: 30, f: GOLD, w: 700, text: '≈ $11 576', at: 2 },
      ],
    },
    summary: {
      title: 'U3 完成', ds: 1,
      lines: [[{ t: '定律 · log · 圖像 · 方程' }], [{ t: '下一章：U4 多項式進一步', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: 'aᵐ·aⁿ' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: 'log', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: 'y=x', at: 2 },
      ],
    },
  },

  /* ============ U4 多項式（牛津 4B09 · 總結 P6） ============ */
  u4: {
    concept: {
      title: '多項式再進一步', ds: 1,
      lines: [[{ t: '長除 · 餘式 · 因式 · HCF/LCM' }], [{ t: '牛津 4B09 為準', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: '長除' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: '餘式', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: '因式', at: 2 },
      ],
    },
    division: {
      title: '多項式除法', ds: 1,
      lines: [[{ t: '好似數字長除，逐項除' }], [{ t: '商 = x + 2 · 餘 = 0', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 22, text: '(x² + 3x + 2) ÷ (x + 1)' },
        { k: 't', x: 215, y: 150, s: 24, f: BLUE, w: 700, text: '商 = x + 2', at: 1 },
        { k: 't', x: 215, y: 215, s: 22, f: OK, text: '餘數 = 0（整除）', at: 2 },
      ],
    },
    remainder: {
      title: '餘式定理', ds: 1,
      lines: [[{ t: '÷(x − a) 餘數 = f(a)' }], [{ t: 'f(1) = 0 → 餘 0', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 75, s: 22, text: 'f(x) = x³ − 2x + 1' },
        { k: 't', x: 215, y: 125, s: 20, f: MUTED, text: '÷ (x − 1)', at: 1 },
        { k: 't', x: 215, y: 175, s: 22, f: BLUE, w: 700, text: '餘 = f(1) = 1−2+1', at: 2 },
        { k: 't', x: 215, y: 235, s: 30, f: GOLD, w: 700, text: '= 0', at: 3 },
      ],
    },
    factor: {
      title: '因式定理', ds: 1,
      lines: [[{ t: 'f(a) = 0 ⇔ (x − a) 因式' }], [{ t: '餘 0 → (x−1) 係因式', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: '上面 f(1) = 0' },
        { k: 't', x: 215, y: 150, s: 26, f: OK, w: 700, text: '→ (x − 1) 係因式', at: 1 },
        { k: 't', x: 215, y: 215, s: 17, f: MUTED, text: '拆剩用長除繼續拆', at: 2 },
      ],
    },
    gcd: {
      title: 'HCF 同 LCM', ds: 1,
      lines: [[{ t: 'HCF 取共有最低次' }], [{ t: 'LCM 取所有最高次', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 16, f: MUTED, text: '總結 P6 三式例' },
        { k: 't', x: 215, y: 115, s: 22, f: BLUE, w: 700, text: 'HCF = 2y³', at: 1 },
        { k: 't', x: 215, y: 170, s: 20, text: 'LCM = 24x²(x+1)³y⁴', at: 2 },
        { k: 't', x: 215, y: 230, s: 16, f: MUTED, text: '係數先拆質因數', at: 3 },
      ],
    },
    rational: {
      title: '有理式加減', ds: 1,
      lines: [[{ t: '分母因式 → 通分 → 約簡' }], [{ t: '結果 = −2/(x+3)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 18, text: '10/(x²+x−6) − 2/(x−2)' },
        { k: 't', x: 215, y: 115, s: 17, f: BLUE, w: 700, text: '10/[(x+3)(x−2)] − 2/(x−2)', at: 1 },
        { k: 't', x: 215, y: 160, s: 17, text: '= (−2x+4)/[(x+3)(x−2)]', at: 2 },
        { k: 't', x: 215, y: 210, s: 26, f: GOLD, w: 700, text: '= −2/(x+3)', at: 3 },
        { k: 't', x: 215, y: 255, s: 15, f: MUTED, text: '數學總結 P6', at: 4 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '代值符號 · 缺項 · HCF 次' }], [{ t: '口訣：代值知餘 · 餘零即因式', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 75, s: 18, f: RED, w: 700, text: '✗ ÷(x+2) 代 f(2)' },
        { k: 't', x: 215, y: 115, s: 18, f: OK, w: 700, text: '✓ ÷(x+2) 代 f(−2)', at: 1 },
        { k: 't', x: 215, y: 160, s: 18, f: RED, w: 700, text: '✗ 缺項唔補 0', at: 2 },
        { k: 't', x: 215, y: 200, s: 18, f: OK, w: 700, text: '✓ 缺項補 0xⁿ 先除', at: 3 },
        { k: 't', x: 215, y: 245, s: 18, f: OK, w: 700, text: '✓ HCF 取共有最低次', at: 4 },
      ],
    },
    summary: {
      title: 'U4 完成', ds: 1,
      lines: [[{ t: '長除 · 餘式 · HCF · 有理式' }], [{ t: '下一章：U5 方程進一步', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: 'f(a)' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: 'HCF', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: '通分', at: 2 },
      ],
    },
  },

  /* ============ U5 方程進一步（總結 P10 聯立 · 可化二次） ============ */
  u5: {
    concept: {
      title: '聯立同可化二次', ds: 1,
      lines: [[{ t: '直線 + 二次 → 交點問題' }], [{ t: '高次可換元變二次', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 90 220 Q 215 40 340 220', f: BLUE, w: 3 },
        { k: 'line', x1: 80, y1: 200, x2: 360, y2: 90, f: GOLD, w: 2.4, at: 1 },
        { k: 'dot', x: 140, y: 165, r: 6, f: OK, at: 2 },
        { k: 'dot', x: 290, y: 130, r: 6, f: OK, at: 2 },
        { k: 't', x: 215, y: 60, s: 16, f: MUTED, text: '交點 = 解', at: 2 },
      ],
    },
    graphical: {
      title: '圖解聯立', ds: 1,
      lines: [[{ t: '直線同拋物線交點' }], [{ t: '交幾多點 = 幾多組解', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 90 220 Q 215 40 340 220', f: BLUE, w: 3 },
        { k: 'line', x1: 80, y1: 200, x2: 360, y2: 90, f: GOLD, w: 2.4, at: 1 },
        { k: 'dot', x: 130, y: 165, r: 6, f: OK, at: 2 },
        { k: 'dot', x: 300, y: 165, r: 6, f: OK, at: 2 },
        { k: 't', x: 215, y: 60, s: 16, f: MUTED, text: '數學總結 P10', at: 2 },
      ],
    },
    algebraic: {
      title: '代數法 · 代入消元', ds: 1,
      lines: [[{ t: '兩式 y 相等 → 二次' }], [{ t: '解 x 再代返搵 y', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 70, s: 18, text: 'y = x²−5x−32' },
        { k: 't', x: 215, y: 110, s: 18, text: 'y = 10 − 6x', at: 1 },
        { k: 't', x: 215, y: 155, s: 20, f: BLUE, w: 700, text: 'x² − 5x − 32 = 10 − 6x', at: 2 },
        { k: 't', x: 215, y: 200, s: 20, text: '→ 一元二次 → 求根公式', at: 3 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '總結 P10 例', at: 4 },
      ],
    },
    disc: {
      title: 'Δ 定交點個數', ds: 1,
      lines: [[{ t: '消元後睇 Δ = b²−4ac' }], [{ t: '有交點 ⇔ Δ ≥ 0', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 95, w: 110, h: 70, f: OK, label: 'Δ > 0', sub: '兩交點' },
        { k: 'chip', x: 160, y: 95, w: 110, h: 70, f: BLUE, label: 'Δ = 0', sub: '相切', at: 1 },
        { k: 'chip', x: 280, y: 95, w: 110, h: 70, f: RED, label: 'Δ < 0', sub: '無交點', at: 2 },
        { k: 't', x: 215, y: 220, s: 18, f: GOLD, w: 700, text: '例：y=8x+k 交 y=x²+20', at: 3 },
      ],
    },
    reduce: {
      title: '化做二次方程', ds: 1,
      lines: [[{ t: '設 y = x² → 變二次' }], [{ t: 'x = ±1 · ±2', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 24, text: 'x⁴ − 5x² + 4 = 0' },
        { k: 't', x: 215, y: 135, s: 22, f: BLUE, w: 700, text: '設 y = x²', at: 1 },
        { k: 't', x: 215, y: 185, s: 22, text: 'y² − 5y + 4 = 0', at: 2 },
        { k: 't', x: 215, y: 240, s: 28, f: GOLD, w: 700, text: 'x = ±1 · ±2', at: 3 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '換元後要還原 · 唔好漏 ±' }], [{ t: '代入 → 二次 → Δ → 還原', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 90, s: 20, f: RED, w: 700, text: '✗ 答 y=1,4 就停' },
        { k: 't', x: 215, y: 140, s: 20, f: OK, w: 700, text: '✓ 還原：x² = y 再開方', at: 1 },
        { k: 't', x: 215, y: 190, s: 20, f: RED, w: 700, text: '✗ 漏負根 ±', at: 2 },
        { k: 't', x: 215, y: 240, s: 20, f: OK, w: 700, text: '✓ x²=k → x=±√k', at: 3 },
      ],
    },
    problems: {
      title: '應用 · 長方形', ds: 1,
      lines: [[{ t: '長比闊多 3，面積 40' }], [{ t: '闊 5 · 長 8', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 22, text: '設闊 = x → 長 = x + 3' },
        { k: 't', x: 215, y: 145, s: 24, f: BLUE, w: 700, text: 'x(x + 3) = 40', at: 1 },
        { k: 't', x: 215, y: 210, s: 28, f: GOLD, w: 700, text: 'x = 5', at: 2 },
      ],
    },
    summary: {
      title: 'U5 完成', ds: 1,
      lines: [[{ t: '代入 · Δ · 換元 · 應用' }], [{ t: '下一章：U6 變異', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: '代入' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: 'Δ', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: '換元', at: 2 },
      ],
    },
  },

  /* ============ U6–U7（教材補齊） ============ */
  u6: {
    concept: {
      title: "乜嘢係變異",
      ds: 1,
      lines: [
        [
          {
            t: "兩個量跟固定規則一齊變",
          },
        ],
        [
          {
            t: "寫 ∝ 再換成等號加 k",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 28,
          text: "y ∝ x",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 24,
          text: "y = kx",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "數學總結 P14",
          f: MUTED,
          at: 2,
        },
      ],
    },
    direct: {
      title: "正變",
      ds: 1,
      lines: [
        [
          {
            t: "y 隨 x 正變 → y = kx",
          },
        ],
        [
          {
            t: "圖像：過原點直線",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 26,
          text: "y ∝ x → y = kx",
        },
        {
          k: "line",
          x1: 90,
          y1: 220,
          x2: 340,
          y2: 80,
          f: BLUE,
          w: 3,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 16,
          text: "k = 斜率",
          f: MUTED,
          at: 2,
        },
      ],
    },
    inverse: {
      title: "反變",
      ds: 1,
      lines: [
        [
          {
            t: "y 隨 x 反變 → y = k/x",
          },
        ],
        [
          {
            t: "圖像：雙曲線（掂唔到軸）",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 26,
          text: "y ∝ 1/x → y = k/x",
        },
        {
          k: "path",
          d: "M 100 80 Q 160 200 340 220",
          f: GOLD,
          w: 2.6,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 16,
          text: "亦可畫 y 對 1/x 變直線",
          f: MUTED,
          at: 2,
        },
      ],
    },
    joint: {
      title: "聯變",
      ds: 1,
      lines: [
        [
          {
            t: "幾個量一齊影響",
          },
        ],
        [
          {
            t: "z = kx² / y",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "x 隨 y、z 正變 → x = kyz",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "z 隨 x² 正變、隨 y 反變",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 28,
          text: "z = kx² / y",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    partial: {
      title: "部分變",
      ds: 1,
      lines: [
        [
          {
            t: "一部份固定 · 一部份跟 x",
          },
        ],
        [
          {
            t: "z = k₁ + k₂x",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "一部份固定 · 一部份隨 x 正變",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 28,
          text: "z = k₁ + k₂x",
          f: GOLD,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "兩組數據解兩個常數",
          f: MUTED,
          at: 2,
        },
      ],
    },
    apply: {
      title: "應用 · 求 k",
      ds: 1,
      lines: [
        [
          {
            t: "y 隨 x 正變，x=3 時 y=12",
          },
        ],
        [
          {
            t: "y = 4x",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 24,
          text: "y = kx · 代入 (3, 12)",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 22,
          text: "12 = 3k → k = 4",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 30,
          text: "y = 4x",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "正變唔等於「加固定數」",
          },
        ],
        [
          {
            t: "一定係乘 k（過原點）",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 18,
          text: "✗ y = x + 3 當正變",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 18,
          text: "✓ 正變 y = kx（過原點）",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 18,
          text: "✗ 反變寫 y = k − x",
          f: RED,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 225,
          s: 18,
          text: "✓ 反變 y = k/x",
          f: OK,
          w: 700,
          at: 3,
        },
      ],
    },
    summary: {
      title: "U6 完成",
      ds: 1,
      lines: [
        [
          {
            t: "正反 · 聯變 · 部分變",
          },
        ],
        [
          {
            t: "下一章：U7 數列求和",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "正變",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "反變",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "部分變",
          at: 2,
        },
      ],
    },
  },

  u7: {
    concept: {
      title: "數列概念",
      ds: 1,
      lines: [
        [
          {
            t: "跟規律排落去嘅一串數",
          },
        ],
        [
          {
            t: "要搵通項 Tₙ",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 26,
          text: "3 · 7 · 11 · 15 · …",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "每項有固定規則",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "牛津 601／602",
          f: MUTED,
          at: 2,
        },
      ],
    },
    ap: {
      title: "等差數列 AP",
      ds: 1,
      lines: [
        [
          {
            t: "每項加同一個 d",
          },
        ],
        [
          {
            t: "Tₙ = 4n − 1",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 75,
          s: 26,
          text: "3 · 7 · 11 · 15",
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 18,
          text: "公差 d = 4",
          f: MUTED,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 22,
          text: "Tₙ = 3 + (n−1)·4",
          f: BLUE,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 235,
          s: 28,
          text: "= 4n − 1",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    gp: {
      title: "等比數列 GP",
      ds: 1,
      lines: [
        [
          {
            t: "每項乘同一個 r",
          },
        ],
        [
          {
            t: "Tₙ = 2 × 3^(n−1)",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 26,
          text: "2 · 6 · 18 · 54",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 18,
          text: "公比 r = 3",
          f: MUTED,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 26,
          text: "Tₙ = 2 × 3^(n−1)",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    sum_ap: {
      title: "AP 求和",
      ds: 1,
      lines: [
        [
          {
            t: "Sₙ = n/2 [2a+(n−1)d]",
          },
        ],
        [
          {
            t: "S₁₀ = 210",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 75,
          s: 20,
          text: "首 3 · 公差 4 · 前 10 項",
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 20,
          text: "S₁₀ = 10/2 [6 + 36]",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 20,
          text: "= 5 × 42",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 235,
          s: 30,
          text: "S₁₀ = 210",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    sum_gp: {
      title: "GP 求和",
      ds: 1,
      lines: [
        [
          {
            t: "Sₙ = a(1−rⁿ)/(1−r)",
          },
        ],
        [
          {
            t: "S₄ = 80",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 75,
          s: 20,
          text: "a=2 · r=3 · 前 4 項",
        },
        {
          k: "t",
          x: 215,
          y: 130,
          s: 20,
          text: "S₄ = 2(1−81)/(1−3)",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 185,
          s: 20,
          text: "= 2(−80)/(−2)",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 245,
          s: 30,
          text: "S₄ = 80",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    infinity: {
      title: "無窮求和",
      ds: 1,
      lines: [
        [
          {
            t: "|r| < 1 先收斂",
          },
        ],
        [
          {
            t: "S∞ = 2",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 24,
          text: "1 + ½ + ¼ + ⅛ + …",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 20,
          text: "a=1 · r=½ · |r|<1",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 28,
          text: "S∞ = 1/(1−½) = 2",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "AP 用加 · GP 用乘",
          },
        ],
        [
          {
            t: "|r|≥1 唔可以無窮和",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 18,
          text: "✗ GP 通項當 a+(n−1)r",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 18,
          text: "✓ GP：Tₙ = ar^(n−1)",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 18,
          text: "✗ |r|=2 仲用 S∞",
          f: RED,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 225,
          s: 18,
          text: "✓ 要 |r|<1 先收斂",
          f: OK,
          w: 700,
          at: 3,
        },
      ],
    },
    summary: {
      title: "U7 完成",
      ds: 1,
      lines: [
        [
          {
            t: "AP · GP · 求和 · S∞",
          },
        ],
        [
          {
            t: "下一章：U8 不等式與規劃",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "AP",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "GP",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "S∞",
          at: 2,
        },
      ],
    },
  },
}
