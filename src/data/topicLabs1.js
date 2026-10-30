import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** K8–K14 + 畢氏應用 嘅場景資料 */

export const S1 = {
  /* ============ K8 一元一次方程 ============ */
  k8: {
    balance: {
      title: '方程 · 天平概念', ds: 1,
      lines: [[{ t: '方程＝天平：兩邊永遠相等' }], [{ t: 'x + 3 = 8', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 90, y1: 120, x2: 340, y2: 120, f: GOLD, w: 3 },
        { k: 'circle', x: 90, y: 190, r: 34, f: BLUE, fill: 1, at: 1 },
        { k: 't', x: 90, y: 196, s: 20, f: BLUE, w: 700, text: 'x + 3', at: 1 },
        { k: 't', x: 215, y: 150, s: 26, text: '=', at: 1 },
        { k: 'circle', x: 340, y: 190, r: 34, f: GOLD, fill: 1, at: 1 },
        { k: 't', x: 340, y: 196, s: 20, f: GOLD, w: 700, text: '8', at: 1 },
      ],
    },
    solve: {
      title: '解 x + 3 = 8', ds: 1,
      lines: [[{ t: '兩邊同減 3，天平照舊平' }], [{ t: 'x = 5', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 32, text: 'x + 3 = 8' },
        { k: 't', x: 215, y: 140, s: 20, f: MUTED, text: '兩邊同減 3', at: 1 },
        { k: 't', x: 215, y: 175, s: 26, text: 'x = 8 − 3', at: 2 },
        { k: 't', x: 215, y: 225, s: 36, f: GOLD, w: 700, text: 'x = 5', at: 3 },
      ],
    },
    two_step: {
      title: '解 2x + 3 = 11', ds: 1,
      lines: [[{ t: '先減 3、再除 2——次序唔可以亂' }], [{ t: 'x = 4', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 30, text: '2x + 3 = 11' },
        { k: 't', x: 215, y: 130, s: 22, text: '2x = 8', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 175, s: 22, text: 'x = 8 ÷ 2', at: 2 },
        { k: 't', x: 215, y: 225, s: 34, f: GOLD, w: 700, text: 'x = 4', at: 3 },
      ],
    },
    inverse: {
      title: '移項 · 過對面要變號', ds: 1,
      lines: [[{ t: '+ ↔ −　·　× ↔ ÷' }], [{ t: 'x = 4', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 28, text: '3x = x + 8' },
        { k: 't', x: 215, y: 125, s: 20, f: MUTED, text: 'x 移過左邊變 −x', at: 1 },
        { k: 't', x: 215, y: 165, s: 24, text: '3x − x = 8', at: 2 },
        { k: 't', x: 215, y: 205, s: 24, text: '2x = 8', f: BLUE, w: 700, at: 2 },
        { k: 't', x: 215, y: 245, s: 30, f: GOLD, w: 700, text: 'x = 4', at: 3 },
      ],
    },
    formulate: {
      title: '文字題 → 方程', ds: 1,
      lines: [[{ t: '設 x 為某數，逐句翻譯' }], [{ t: '2x + 3 = 11', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 105, y: 80, w: 100, h: 56, f: BLUE, label: '某數', sub: '設佢做 x' },
        { k: 't', x: 215, y: 155, s: 24, text: '× 2　→　2x', at: 1 },
        { k: 't', x: 215, y: 195, s: 24, text: '+ 3　→　2x + 3', at: 2 },
        { k: 't', x: 215, y: 235, s: 26, f: GOLD, w: 700, text: '2x + 3 = 11', at: 3 },
      ],
    },
    problems: {
      title: '應用 · 買嘢', ds: 1,
      lines: [[{ t: '3 支筆加一包 $2 紙，共 $11' }], [{ t: 'x = 3', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 90, w: 100, h: 64, f: BLUE, label: '筆 ×3', sub: '每支 $x' },
        { k: 't', x: 175, y: 125, s: 22, text: '+', at: 1 },
        { k: 'chip', x: 200, y: 90, w: 80, h: 64, f: GOLD, label: '$2', sub: '紙', at: 1 },
        { k: 't', x: 315, y: 125, s: 22, text: '= $11', at: 2 },
        { k: 't', x: 215, y: 210, s: 24, text: '3x + 2 = 11', w: 700, at: 3 },
        { k: 't', x: 215, y: 250, s: 26, f: GOLD, w: 700, text: 'x = 3（每支 $3）', at: 4 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '移項要變號；兩邊要同步做' }], [{ t: '每步檢查天平', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 90, s: 22, f: RED, w: 700, text: '✗ 2x = 8 + x（冇變號）' },
        { k: 't', x: 215, y: 140, s: 22, f: OK, w: 700, text: '✓ 2x = 8 + x？不，x 過嚟變 −x', at: 1 },
        { k: 't', x: 215, y: 185, s: 22, f: RED, w: 700, text: '✗ 2x + 3 = 11 → 2x = 14', at: 2 },
        { k: 't', x: 215, y: 230, s: 22, f: OK, w: 700, text: '✓ 2x + 3 = 11 → 2x = 8', at: 3 },
      ],
    },
    summary: {
      title: 'K8 完成', ds: 1,
      lines: [[{ t: '天平 · 移項變號 · 文字變方程' }], [{ t: '下一章：K9 聯立方程', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 110, h: 70, f: BLUE, label: '天平', sub: '兩邊相等' },
        { k: 'chip', x: 160, y: 110, w: 110, h: 70, f: GOLD, label: '移項', sub: '過面變號', at: 1 },
        { k: 'chip', x: 280, y: 110, w: 110, h: 70, f: OK, label: '應用', sub: '文字→式', at: 2 },
      ],
    },
  },

  /* ============ K9 二元一次聯立方程 ============ */
  k9: {
    concept: {
      title: '聯立 · 兩條式一齊解', ds: 1,
      lines: [[{ t: '兩個未知數，要兩條式先有唯一解' }], [{ t: 'x = 4 · y = 3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: 'x + y = 7' },
        { k: 't', x: 215, y: 135, s: 26, text: 'x − y = 1', at: 1 },
        { k: 't', x: 215, y: 190, s: 22, f: MUTED, text: '兩條一齊成立 → 唯一一組答案', at: 2 },
        { k: 't', x: 215, y: 235, s: 30, f: GOLD, w: 700, text: 'x = 4 · y = 3', at: 3 },
      ],
    },
    subst: {
      title: '代入法', ds: 1,
      lines: [[{ t: '由第一條表達 y，代入第二條' }], [{ t: 'x = 4 · y = 3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 80, s: 22, text: 'x + y = 7　·　x − y = 1' },
        { k: 't', x: 215, y: 125, s: 20, f: BLUE, w: 700, text: 'y = 7 − x', at: 1 },
        { k: 't', x: 215, y: 165, s: 20, text: 'x − (7 − x) = 1', at: 2 },
        { k: 't', x: 215, y: 205, s: 22, text: '2x = 8 → x = 4', f: BLUE, w: 700, at: 3 },
        { k: 't', x: 215, y: 245, s: 26, f: GOLD, w: 700, text: 'y = 7 − 4 = 3', at: 4 },
      ],
    },
    elim: {
      title: '消去法 · 加減', ds: 1,
      lines: [[{ t: '兩式相加，y 消失' }], [{ t: 'x = 4 · y = 3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 22, text: 'x + y = 7' },
        { k: 't', x: 215, y: 125, s: 22, text: '+　x − y = 1', at: 1 },
        { k: 'line', x1: 120, y1: 140, x2: 310, y2: 140, at: 1 },
        { k: 't', x: 215, y: 175, s: 24, f: BLUE, w: 700, text: '2x = 8 → x = 4', at: 2 },
        { k: 't', x: 215, y: 220, s: 26, f: GOLD, w: 700, text: '代返：y = 3', at: 3 },
      ],
    },
    graph: {
      title: '圖解法 · 交點就係解', ds: 1,
      lines: [[{ t: '兩條直線嘅交點 = 聯立解' }], [{ t: '交點 (4, 3)', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 70, y1: 210, x2: 360, y2: 60, f: BLUE, w: 2.4, at: 0 },
        { k: 'line', x1: 70, y1: 120, x2: 360, y2: 200, f: GOLD, w: 2.4, at: 1 },
        { k: 'dot', x: 225, y: 140, r: 8, f: OK, label: '(4, 3)', at: 2 },
        { k: 't', x: 100, y: 70, s: 13, f: BLUE, text: 'x+y=7', at: 1 },
        { k: 't', x: 330, y: 225, s: 13, f: GOLD, text: 'x−y=1', at: 1 },
      ],
    },
    problems: {
      title: '應用 · 門票', ds: 1,
      lines: [[{ t: '成人 $x、小童 $y；兩個條件兩條式' }], [{ t: '成人 $20 · 小童 $10', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 20, text: '2 成人 + 3 小童 = $70' },
        { k: 't', x: 215, y: 125, s: 20, text: '1 成人 + 1 小童 = $30', at: 1 },
        { k: 't', x: 215, y: 170, s: 22, text: '2x + 3y = 70 · x + y = 30', f: BLUE, at: 2 },
        { k: 't', x: 215, y: 220, s: 26, f: GOLD, w: 700, text: 'x = 20 · y = 10', at: 3 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '兩條式要一齊成立，唔係揀一條' }], [{ t: '代完記得求返第二個未知數', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 100, s: 21, f: RED, w: 700, text: '✗ 只用一條式解兩個未知數' },
        { k: 't', x: 215, y: 150, s: 21, f: RED, w: 700, text: '✗ 求到 x 就當做完', at: 1 },
        { k: 't', x: 215, y: 200, s: 21, f: OK, w: 700, text: '✓ x、y 兩個都要寫出嚟', at: 2 },
      ],
    },
    summary: {
      title: 'K9 完成', ds: 1,
      lines: [[{ t: '代入 · 消去 · 圖解交點' }], [{ t: '下一章：K10 指數定律', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '代入' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '消去', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '圖解', at: 2 },
      ],
    },
  },

  /* ============ K10 整數指數定律 ============ */
  k10: {
    zero: {
      title: '零指數與負指數', ds: 1,
      lines: [[{ t: 'a⁰ = 1（除落自己）' }], [{ t: '2⁻³ = 1/8', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 130, y: 110, s: 36, text: 'a⁰ = 1' },
        { k: 't', x: 310, y: 110, s: 30, text: '2⁻³ = 1/2³', at: 1 },
        { k: 't', x: 310, y: 160, s: 26, f: GOLD, w: 700, text: '= 1/8', at: 2 },
      ],
    },
    laws: {
      title: '指數定律 · 三條', ds: 1,
      lines: [[{ t: '乘加、除減、乘方相乘' }], [{ t: '全都是指數運算', fill: MUTED }]],
      art: [
        { k: 'chip', x: 40, y: 80, w: 175, h: 56, f: BLUE, label: 'aᵐ × aⁿ = aᵐ⁺ⁿ' },
        { k: 'chip', x: 40, y: 150, w: 175, h: 56, f: GOLD, label: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', at: 1 },
        { k: 'chip', x: 40, y: 220, w: 175, h: 56, f: OK, label: '(aᵐ)ⁿ = aᵐⁿ', at: 2 },
        { k: 't', x: 330, y: 112, s: 20, text: '2³ × 2² = 2⁵', at: 1 },
        { k: 't', x: 330, y: 182, s: 20, text: '3⁵ ÷ 3² = 3³', at: 2 },
      ],
    },
    sci: {
      title: '科學記數法', ds: 1,
      lines: [[{ t: 'a × 10ⁿ，a 喺 1 至 10 之間' }], [{ t: '0.0047 = 4.7 × 10⁻³', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 28, text: '5 200 = 5.2 × 10³' },
        { k: 't', x: 215, y: 150, s: 24, text: '0.0047 = 4.7 × 10⁻³', f: GOLD, w: 700, at: 1 },
        { k: 't', x: 215, y: 200, s: 18, f: MUTED, text: '大數指數正 · 細數指數負', at: 2 },
      ],
    },
    binary: {
      title: '二進制', ds: 1,
      lines: [[{ t: '1011₂ = 8 + 2 + 1' }], [{ t: '= 11', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 30, text: '1011₂' },
        { k: 't', x: 215, y: 145, s: 20, text: '8　4　2　1（位值）', f: MUTED, at: 1 },
        { k: 't', x: 215, y: 190, s: 24, text: '8 + 0 + 2 + 1', f: BLUE, at: 2 },
        { k: 't', x: 215, y: 235, s: 30, f: GOLD, w: 700, text: '= 11', at: 3 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '指數相乘唔係相乘底' }], [{ t: '(2³)² = 2⁶ = 64', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 21, f: RED, w: 700, text: '✗ 2³ × 2² = 4⁵' },
        { k: 't', x: 215, y: 140, s: 21, f: OK, w: 700, text: '✓ 2³ × 2² = 2⁵', at: 1 },
        { k: 't', x: 215, y: 190, s: 21, f: RED, w: 700, text: '✗ 2⁰ = 0', at: 2 },
        { k: 't', x: 215, y: 235, s: 21, f: OK, w: 700, text: '✓ 2⁰ = 1', at: 3 },
      ],
    },
    summary: {
      title: 'K10 完成', ds: 1,
      lines: [[{ t: 'a⁰ = 1 · 三條指數定律 · 科学記數' }], [{ t: '下一章：K11 多項式', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: 'a⁰=1' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '定律', sub: '加減乘', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '10ⁿ', at: 2 },
      ],
    },
  },

  /* ============ K11 多項式 ============ */
  k11: {
    concept: {
      title: '多項式 · 項與次數', ds: 1,
      lines: [[{ t: '3x² − 2x + 5 有三項' }], [{ t: '最高次數 = 次數 2', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 32, text: '3x² − 2x + 5' },
        { k: 'chip', x: 60, y: 140, w: 90, h: 52, f: BLUE, label: '3x²', at: 1 },
        { k: 'chip', x: 170, y: 140, w: 90, h: 52, f: GOLD, label: '−2x', at: 1 },
        { k: 'chip', x: 280, y: 140, w: 90, h: 52, f: OK, label: '+5', sub: '常數項', at: 1 },
        { k: 't', x: 215, y: 235, s: 20, f: MUTED, text: '最高次數嗰項決定「次數」', at: 2 },
      ],
    },
    add: {
      title: '合併同類項', ds: 1,
      lines: [[{ t: 'x 項同 x 項先可以加' }], [{ t: '= 5x + 3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 28, text: '3x + 2x + 3' },
        { k: 'blocks', x: 110, y: 130, n: 3, f: BLUE, size: 26, at: 1 },
        { k: 'blocks', x: 230, y: 130, n: 2, f: BLUE, size: 26, at: 1 },
        { k: 't', x: 215, y: 205, s: 30, f: GOLD, w: 700, text: '= 5x + 3', at: 2 },
      ],
    },
    mul: {
      title: '展開 · (x+2)(x+3)', ds: 1,
      lines: [[{ t: '逐項相乘再合併' }], [{ t: '= x² + 5x + 6', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 26, text: '(x + 2)(x + 3)' },
        { k: 't', x: 215, y: 135, s: 20, text: 'x·x　x·3　2·x　2·3', f: MUTED, at: 1 },
        { k: 't', x: 215, y: 180, s: 22, text: 'x² + 3x + 2x + 6', f: BLUE, at: 2 },
        { k: 't', x: 215, y: 230, s: 28, f: GOLD, w: 700, text: '= x² + 5x + 6', at: 3 },
      ],
    },
    factorise: {
      title: '因式分解', ds: 1,
      lines: [[{ t: '抽公因數：6x + 9 = 3(2x + 3)' }], [{ t: 'x²+5x+6 = (x+2)(x+3)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: '6x + 9 = 3(2x + 3)' },
        { k: 't', x: 215, y: 150, s: 24, text: 'x² + 5x + 6', at: 1 },
        { k: 't', x: 215, y: 190, s: 20, f: MUTED, text: '搵兩數：積 6、和 5 → 2 同 3', at: 2 },
        { k: 't', x: 215, y: 235, s: 26, f: GOLD, w: 700, text: '= (x + 2)(x + 3)', at: 3 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '唔同類唔可以合併' }], [{ t: 'x² + x 係最簡', fill: OK }]],
      art: [
        { k: 't', x: 215, y: 100, s: 21, f: RED, w: 700, text: '✗ x² + x = x³' },
        { k: 't', x: 215, y: 150, s: 21, f: OK, w: 700, text: '✓ x² + x 已經最簡', at: 1 },
        { k: 't', x: 215, y: 200, s: 21, f: RED, w: 700, text: '✗ 3(x + 2) = 3x + 2', at: 2 },
        { k: 't', x: 215, y: 245, s: 21, f: OK, w: 700, text: '✓ 3(x + 2) = 3x + 6', at: 3 },
      ],
    },
    summary: {
      title: 'K11 完成', ds: 1,
      lines: [[{ t: '同類項 · 展開 · 因式分解' }], [{ t: '下一章：K12 恆等式', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '同類項' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '展開', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '分解', at: 2 },
      ],
    },
  },

  /* ============ K12 恆等式 ============ */
  k12: {
    concept: {
      title: '恆等式 ≡', ds: 1,
      lines: [[{ t: '≡ 表示 x 係乜都成立' }], [{ t: '(x+1)² ≡ x²+2x+1', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: '方程：某啲 x 先成立' },
        { k: 't', x: 215, y: 150, s: 24, text: '恆等式：全部 x 都成立', f: GOLD, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 24, text: '(x + 1)² ≡ x² + 2x + 1', f: BLUE, w: 700, at: 2 },
      ],
    },
    square: {
      title: '(a+b)² 展開', ds: 1,
      lines: [[{ t: '大正方形邊長 a + b' }], [{ t: 'a²+2ab+b²', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 90, y: 70, w: 120, h: 120, f: BLUE, fill: 1, at: 0 },
        { k: 't', x: 150, y: 135, s: 18, f: BLUE, w: 700, text: 'a²', at: 0 },
        { k: 'rect', x: 210, y: 70, w: 50, h: 50, f: OK, fill: 1, at: 1 },
        { k: 'rect', x: 90, y: 190, w: 50, h: 50, f: OK, fill: 1, at: 1 },
        { k: 't', x: 300, y: 110, s: 20, f: OK, text: 'ab ×2', at: 1 },
        { k: 't', x: 340, y: 215, s: 20, f: GOLD, w: 700, text: '+b²', at: 2 },
        { k: 't', x: 215, y: 262, s: 20, f: GOLD, w: 700, text: '(a+b)² = a² + 2ab + b²', at: 3 },
      ],
    },
    diff: {
      title: '(a+b)(a−b)', ds: 1,
      lines: [[{ t: '平方差：中間項互相抵銷' }], [{ t: '= a² − b²', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 26, text: '(a + b)(a − b)' },
        { k: 't', x: 215, y: 150, s: 22, text: 'a² − ab + ab − b²', f: MUTED, at: 1 },
        { k: 't', x: 215, y: 205, s: 30, f: GOLD, w: 700, text: '= a² − b²', at: 2 },
      ],
    },
    factorise: {
      title: '反用恆等式', ds: 1,
      lines: [[{ t: '見平方差就拆兩邊' }], [{ t: 'x² − 9 = (x+3)(x−3)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 26, text: 'x² − 9' },
        { k: 't', x: 215, y: 140, s: 20, f: MUTED, text: '9 = 3²，係平方差', at: 1 },
        { k: 't', x: 215, y: 195, s: 26, f: GOLD, w: 700, text: '= (x + 3)(x − 3)', at: 2 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '(a+b)² ≠ a² + b²' }], [{ t: '中間 2ab 唔可以唔見', fill: GOLD }]],
      art: [
        { k: 't', x: 215, y: 100, s: 22, f: RED, w: 700, text: '✗ (a+b)² = a² + b²' },
        { k: 't', x: 215, y: 150, s: 22, f: OK, w: 700, text: '✓ = a² + 2ab + b²', at: 1 },
        { k: 't', x: 215, y: 205, s: 18, f: MUTED, text: '代 a=2, b=1 驗：9 ≠ 5', at: 2 },
      ],
    },
    summary: {
      title: 'K12 完成', ds: 1,
      lines: [[{ t: '≡ 全 x 成立 · 平方差 · 完全平方' }], [{ t: '下一章：K13 公式', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '≡' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: 'a²−b²', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '(a+b)²', at: 2 },
      ],
    },
  },

  /* ============ K13 公式 ============ */
  k13: {
    subst: {
      title: '公式代入', ds: 1,
      lines: [[{ t: 'A = ½bh；b = 8、h = 5' }], [{ t: 'A = 20', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: 'A = ½bh' },
        { k: 't', x: 215, y: 140, s: 22, text: 'A = ½ × 8 × 5', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 195, s: 30, f: GOLD, w: 700, text: 'A = 20', at: 2 },
      ],
    },
    subject: {
      title: '主項變換', ds: 1,
      lines: [[{ t: 'v = u + at，變 a 做主項' }], [{ t: 'a = (v − u) / t', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: 'v = u + at' },
        { k: 't', x: 215, y: 140, s: 22, text: 'v − u = at', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 195, s: 26, f: GOLD, w: 700, text: 'a = (v − u) / t', at: 2 },
      ],
    },
    fraction: {
      title: '代數分式', ds: 1,
      lines: [[{ t: '分子分母約走公因式' }], [{ t: '6x²/3x = 2x', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 26, text: '6x² ÷ 3x' },
        { k: 't', x: 215, y: 145, s: 20, f: MUTED, text: '6 ÷ 3 = 2 · x² ÷ x = x', at: 1 },
        { k: 't', x: 215, y: 200, s: 30, f: GOLD, w: 700, text: '= 2x', at: 2 },
      ],
    },
    mistakes: {
      title: '常犯錯誤', ds: 1,
      lines: [[{ t: '主項變換逐步做，唔好跳步' }], [{ t: '每步兩邊一齊做', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 100, s: 21, f: RED, w: 700, text: '✗ v = u + at → a = v − u − t' },
        { k: 't', x: 215, y: 155, s: 21, f: OK, w: 700, text: '✓ 先減 u，再除 t', at: 1 },
      ],
    },
    summary: {
      title: 'K13 完成', ds: 1,
      lines: [[{ t: '代入 · 主項變換 · 分式' }], [{ t: '下一章：K14 不等式', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '代入' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '主項', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '分式', at: 2 },
      ],
    },
  },

  /* ============ K14 一元一次不等式 ============ */
  k14: {
    concept: {
      title: '不等式 · 符號與數線', ds: 1,
      lines: [[{ t: '< ≤ > ≥ 四個符號' }], [{ t: 'x > 2：2 右邊全部', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 70, y1: 150, x2: 360, y2: 150 },
        { k: 'circle', x: 215, y: 150, r: 9, f: GOLD, at: 1 },
        { k: 't', x: 215, y: 186, s: 16, f: GOLD, w: 700, text: '2', at: 1 },
        { k: 'arrow', x1: 228, y1: 150, x2: 350, y2: 150, f: BLUE, at: 2 },
        { k: 't', x: 289, y: 130, s: 18, f: BLUE, w: 700, text: 'x > 2', at: 2 },
      ],
    },
    solve: {
      title: '解 2x + 1 > 9', ds: 1,
      lines: [[{ t: '同方程一樣解法' }], [{ t: 'x > 4', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 28, text: '2x + 1 > 9' },
        { k: 't', x: 215, y: 140, s: 24, text: '2x > 8', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 195, s: 30, f: GOLD, w: 700, text: 'x > 4', at: 2 },
      ],
    },
    flip: {
      title: '乘負數 · 符號反轉', ds: 1,
      lines: [[{ t: '兩邊乘 / 除負數，> 要變 <' }], [{ t: 'x < −3', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 26, text: '−2x > 6' },
        { k: 't', x: 215, y: 140, s: 20, f: RED, w: 700, text: '÷(−2)：方向反轉！', at: 1 },
        { k: 't', x: 215, y: 195, s: 30, f: GOLD, w: 700, text: 'x < −3', at: 2 },
      ],
    },
    problems: {
      title: '應用 · 坐巴士', ds: 1,
      lines: [[{ t: '$50 買 $8 票，最多幾多程？' }], [{ t: '最多 6 程', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: '8x ≤ 50' },
        { k: 't', x: 215, y: 145, s: 24, text: 'x ≤ 6.25', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 200, s: 24, f: GOLD, w: 700, text: '答：最多 6 程', at: 2 },
      ],
    },
    summary: {
      title: 'K14 完成', ds: 1,
      lines: [[{ t: '解法同方程 · 乘負要反轉' }], [{ t: '下一章：K15 量度誤差', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '< >' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '數線', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '反轉', at: 2 },
      ],
    },
  },

  /* ============ 畢氏定理 · 逆定理與應用（K25 其餘部分） ============ */
  k25m: {
    converse: {
      title: '畢氏逆定理', ds: 1,
      lines: [[{ t: 'a² + b² = c² 成立 → 直角三角形' }], [{ t: '5² + 12² = 13² ✓', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 22, text: '三邊 5 · 12 · 13' },
        { k: 't', x: 215, y: 140, s: 24, text: '5² + 12² = 25 + 144 = 169', f: BLUE, at: 1 },
        { k: 't', x: 215, y: 185, s: 24, text: '13² = 169 ✓', f: OK, w: 700, at: 2 },
        { k: 't', x: 215, y: 235, s: 22, f: GOLD, w: 700, text: '∴ 係直角三角形', at: 3 },
      ],
    },
    triples: {
      title: '常用勾股數', ds: 1,
      lines: [[{ t: '背住三組，考試快人一步' }], [{ t: '3·4·5　5·12·13　8·15·17', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 36, y: 100, w: 112, h: 70, f: BLUE, label: '3·4·5', sub: '最常見' },
        { k: 'chip', x: 159, y: 100, w: 112, h: 70, f: GOLD, label: '5·12·13', at: 1 },
        { k: 'chip', x: 282, y: 100, w: 112, h: 70, f: OK, label: '8·15·17', at: 2 },
        { k: 't', x: 215, y: 215, s: 18, f: MUTED, text: '仲有 7·24·25、9·40·41', at: 3 },
      ],
    },
    problems: {
      title: '應用 · 梯靠牆', ds: 1,
      lines: [[{ t: '梯 5 m、腳離牆 3 m' }], [{ t: '掂到 4 m 高', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 120, y1: 220, x2: 120, y2: 78, f: BLUE, w: 4 },
        { k: 'line', x1: 120, y1: 220, x2: 260, y2: 220, w: 3, at: 1 },
        { k: 'path', d: 'M 120 78 L 260 220', f: GOLD, w: 3, at: 2 },
        { k: 't', x: 300, y: 150, s: 18, f: GOLD, w: 700, text: '梯 5 m', at: 2 },
        { k: 't', x: 190, y: 245, s: 16, text: '3 m', at: 1 },
        { k: 't', x: 95, y: 150, s: 18, f: BLUE, w: 700, text: '? m', at: 3 },
        { k: 't', x: 215, y: 272, s: 20, f: OK, w: 700, text: 'h = √(25−9) = 4 m', at: 4 },
      ],
    },
    summary: {
      title: '畢氏應用完成', ds: 1,
      lines: [[{ t: '逆定理 · 勾股數 · 應用' }], [{ t: 'PRE-DSE 幾何核心完成', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '逆定理' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '勾股數', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '應用', at: 2 },
      ],
    },
  },
}
