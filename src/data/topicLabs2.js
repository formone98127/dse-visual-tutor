import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** K15–K21 嘅場景資料 */

export const S2 = {
  /* ============ K15 量度誤差 ============ */
  k15: {
    errors: {
      title: '量度誤差 · 真值 vs 量度值', ds: 1,
      lines: [[{ t: '尺最細一格 1 cm' }], [{ t: '量度值 12 cm 其實代表 11.5–12.5', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 60, y1: 130, x2: 370, y2: 130 },
        { k: 't', x: 215, y: 100, s: 22, text: '量度值 12 cm' },
        { k: 't', x: 120, y: 165, s: 15, f: MUTED, text: '11.5', at: 1 },
        { k: 'dot', x: 215, y: 130, r: 7, f: GOLD, at: 1 },
        { k: 't', x: 310, y: 165, s: 15, f: MUTED, text: '12.5', at: 1 },
        { k: 'line', x1: 125, y1: 140, x2: 305, y2: 140, f: BLUE, dash: '5 4', at: 2 },
        { k: 't', x: 215, y: 205, s: 18, f: BLUE, text: '真值喺呢段入面', at: 2 },
      ],
    },
    max: {
      title: '最大絕對誤差', ds: 1,
      lines: [[{ t: '= 最細刻度 ÷ 2' }], [{ t: '12 cm（刻度 1 cm）→ ±0.5 cm', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: '最大絕對誤差 = ½ × 刻度' },
        { k: 't', x: 215, y: 150, s: 24, text: '½ × 1 cm = 0.5 cm', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 22, f: GOLD, w: 700, text: '上限 12.5 · 下限 11.5', at: 2 },
      ],
    },
    rel: {
      title: '相對誤差與百分誤差', ds: 1,
      lines: [[{ t: '相對誤差 = 誤差 ÷ 量度值' }], [{ t: '百分誤差 = 相對誤差 × 100%', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: '0.5 ÷ 12' },
        { k: 't', x: 215, y: 145, s: 22, f: BLUE, w: 700, text: '≈ 0.0417（相對）', at: 1 },
        { k: 't', x: 215, y: 200, s: 24, f: GOLD, w: 700, text: '≈ 4.17%（百分）', at: 2 },
      ],
    },
    summary: {
      title: 'K15 完成', ds: 1,
      lines: [[{ t: '絕對誤差 ±½格 · 百分誤差' }], [{ t: '下一章：K16 弧長與扇形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '±½格' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '上下限', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '%誤差', at: 2 },
      ],
    },
  },

  /* ============ K16 弧長與扇形面積 ============ */
  k16: {
    arc: {
      title: '弧長公式', ds: 1,
      lines: [[{ t: '圓周 2πr，佔 θ/360 咋' }], [{ t: '弧長 = 2πr × θ/360', fill: GOLD, b: true }]],
      art: [
        { k: 'circle', x: 215, y: 155, r: 70, f: BLUE, w: 2 },
        { k: 'path', d: 'M 215 85 A 70 70 0 0 1 275 116', f: GOLD, w: 4, at: 1 },
        { k: 'line', x1: 215, y1: 155, x2: 215, y2: 85, at: 1 },
        { k: 'line', x1: 215, y1: 155, x2: 275, y2: 116, at: 1 },
        { k: 't', x: 268, y: 92, s: 16, f: GOLD, w: 700, text: 'θ', at: 1 },
        { k: 't', x: 340, y: 210, s: 16, f: MUTED, text: 'r', at: 2 },
      ],
    },
    sector: {
      title: '扇形面積公式', ds: 1,
      lines: [[{ t: '成個圓 πr²，扇形佔 θ/360' }], [{ t: '面積 = πr² × θ/360', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 155 L 215 85 A 70 70 0 0 1 275 116 Z', f: GOLD, w: 2.5 },
        { k: 't', x: 240, y: 125, s: 15, f: GOLD, w: 700, text: 'θ', at: 1 },
        { k: 't', x: 215, y: 258, s: 20, f: MUTED, text: '扇形 = 一塊薄薄嘅批', at: 2 },
      ],
    },
    problems: {
      title: '應用 · r=6 θ=60°', ds: 1,
      lines: [[{ t: '代入兩條公式' }], [{ t: '弧長 2π · 面積 6π', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: '弧長 = 2π(6) × 60/360' },
        { k: 't', x: 215, y: 145, s: 24, f: BLUE, w: 700, text: '= 2π', at: 1 },
        { k: 't', x: 215, y: 200, s: 24, f: GOLD, w: 700, text: '面積 = π(36) × 1/6 = 6π', at: 2 },
      ],
    },
    summary: {
      title: 'K16 完成', ds: 1,
      lines: [[{ t: '兩條公式都乘 θ/360' }], [{ t: '下一章：K17 立體圖形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '弧長' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '扇形', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: 'θ/360', at: 2 },
      ],
    },
  },

  /* ============ K17 立體圖形 ============ */
  k17: {
    prisms: {
      title: '柱體 vs 錐體', ds: 1,
      lines: [[{ t: '柱體：上下兩面一樣' }], [{ t: '錐體：一個頂點收埋', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 70, y: 90, w: 110, h: 110, f: BLUE, fill: 1 },
        { k: 't', x: 125, y: 150, s: 17, f: BLUE, w: 700, text: '柱體', at: 1 },
        { k: 'path', d: 'M 240 200 L 295 90 L 350 200 Z', f: GOLD, w: 2.4, at: 2 },
        { k: 't', x: 295, y: 165, s: 17, f: GOLD, w: 700, text: '錐體', at: 2 },
      ],
    },
    nets: {
      title: '展開圖 · 摺返做立體', ds: 1,
      lines: [[{ t: '正方體 6 面展開' }], [{ t: '圓柱 = 長方形 + 兩個圓', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 60, y: 100, w: 52, h: 52, f: BLUE, fill: 1 },
        { k: 'rect', x: 112, y: 100, w: 52, h: 52, f: BLUE, fill: 1, at: 1 },
        { k: 'rect', x: 164, y: 100, w: 52, h: 52, f: BLUE, fill: 1, at: 1 },
        { k: 'rect', x: 112, y: 48, w: 52, h: 52, f: BLUE, fill: 1, at: 2 },
        { k: 'rect', x: 112, y: 152, w: 52, h: 52, f: BLUE, fill: 1, at: 2 },
        { k: 'circle', x: 320, y: 100, r: 26, f: GOLD, fill: 1, at: 3 },
        { k: 'rect', x: 294, y: 100, w: 52, h: 66, f: GOLD, fill: 1, at: 3 },
        { k: 't', x: 320, y: 205, s: 15, f: MUTED, text: '圓柱展開', at: 3 },
      ],
    },
    summary: {
      title: 'K17 完成', ds: 1,
      lines: [[{ t: '認得柱錐 · 摺得返展開圖' }], [{ t: '下一章：K18 求積法', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '柱體' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '錐體', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '展開圖', at: 2 },
      ],
    },
  },

  /* ============ K18 求積法 ============ */
  k18: {
    volumes: {
      title: '體積公式 · 柱與錐', ds: 1,
      lines: [[{ t: '柱體 V = 底面積 × 高' }], [{ t: '錐體 V = ⅓ × 柱體', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 95, w: 150, h: 60, f: BLUE, label: 'V柱 = A × h' },
        { k: 'chip', x: 55, y: 175, w: 150, h: 60, f: GOLD, label: 'V錐 = ⅓Ah', at: 1 },
        { k: 'blocks', x: 240, y: 170, n: 3, f: GOLD, size: 30, at: 2 },
        { k: 't', x: 310, y: 145, s: 16, f: MUTED, text: '3 個錐 = 1 個柱', at: 2 },
      ],
    },
    cylinder: {
      title: '圓柱體積', ds: 1,
      lines: [[{ t: '底係圓：A = πr²' }], [{ t: 'V = πr²h', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: 'V = π × r² × h' },
        { k: 't', x: 215, y: 150, s: 22, text: 'r = 3、h = 5 → V = 45π', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 18, f: MUTED, text: '答案留 π 仲標準', at: 2 },
      ],
    },
    surface: {
      title: '表面積', ds: 1,
      lines: [[{ t: '全部出面面積加埋' }], [{ t: '圓柱 = 2πrh + 2πr²', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 70, y: 110, w: 120, h: 80, f: BLUE, fill: 1 },
        { k: 't', x: 130, y: 155, s: 16, f: BLUE, w: 700, text: '側面 2πrh', at: 1 },
        { k: 'circle', x: 240, y: 130, r: 22, f: GOLD, fill: 1, at: 2 },
        { k: 'circle', x: 240, y: 185, r: 22, f: GOLD, fill: 1, at: 2 },
        { k: 't', x: 320, y: 165, s: 16, f: GOLD, w: 700, text: '2 圓 2πr²', at: 2 },
      ],
    },
    relations: {
      title: '放大 · 邊長 2 倍', ds: 1,
      lines: [[{ t: '邊長 ×2 → 面積 ×4 → 體積 ×8' }], [{ t: '一次方/二次方/三次方', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 80, y: 150, w: 50, h: 50, f: BLUE, fill: 1 },
        { k: 'rect', x: 220, y: 110, w: 100, h: 90, f: GOLD, fill: 1, at: 1 },
        { k: 't', x: 105, y: 225, s: 16, f: BLUE, text: '邊 1', at: 0 },
        { k: 't', x: 270, y: 225, s: 16, f: GOLD, text: '邊 2', at: 1 },
        { k: 't', x: 215, y: 70, s: 18, f: OK, w: 700, text: '面積 ×4 · 體積 ×8', at: 2 },
      ],
    },
    summary: {
      title: 'K18 完成', ds: 1,
      lines: [[{ t: 'V=Ah · V錐=⅓ · 表面積 · 放大' }], [{ t: '下一章：K19 角與平行線', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 100, h: 70, f: BLUE, label: '柱V' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '錐V', at: 1 },
        { k: 'chip', x: 290, y: 110, w: 100, h: 70, f: OK, label: '×2ⁿ', at: 2 },
      ],
    },
  },

  /* ============ K19 角與平行線 ============ */
  k19: {
    angles: {
      title: '三種角 · F Z C', ds: 1,
      lines: [[{ t: '平行線上：同位角(F)相等' }], [{ t: '內錯角(Z)相等 · 同側內角(C)互補', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 70, y1: 110, x2: 360, y2: 110, f: BLUE, w: 2.5 },
        { k: 'line', x1: 70, y1: 190, x2: 360, y2: 190, f: BLUE, w: 2.5 },
        { k: 'line', x1: 150, y1: 70, x2: 250, y2: 230, f: GOLD, w: 2.4, at: 1 },
        { k: 't', x: 110, y: 95, s: 15, f: OK, w: 700, text: 'a', at: 1 },
        { k: 't', x: 300, y: 210, s: 15, f: OK, w: 700, text: 'a', at: 2 },
        { k: 't', x: 190, y: 155, s: 14, f: MUTED, text: 'F 形', at: 3 },
      ],
    },
    conditions: {
      title: '判別平行', ds: 1,
      lines: [[{ t: '同位角相等 → 平行' }], [{ t: '反過嚟都啱', fill: MUTED }]],
      art: [
        { k: 't', x: 215, y: 95, s: 24, text: '同位角相等 ⇔ 平行', w: 700 },
        { k: 't', x: 215, y: 150, s: 24, text: '內錯角相等 ⇔ 平行', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 24, text: '同側內角互補 ⇔ 平行', f: GOLD, w: 700, at: 2 },
      ],
    },
    problems: {
      title: '應用 · 求角', ds: 1,
      lines: [[{ t: '65° 同位角過去對面' }], [{ t: 'x = 65°', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 70, y1: 110, x2: 360, y2: 110, f: BLUE, w: 2.5 },
        { k: 'line', x1: 70, y1: 190, x2: 360, y2: 190, f: BLUE, w: 2.5, at: 1 },
        { k: 'line', x1: 160, y1: 60, x2: 240, y2: 240, f: GOLD, w: 2.4, at: 1 },
        { k: 't', x: 115, y: 95, s: 17, f: GOLD, w: 700, text: '65°', at: 2 },
        { k: 't', x: 285, y: 215, s: 17, f: OK, w: 700, text: 'x = 65°', at: 3 },
      ],
    },
    summary: {
      title: 'K19 完成', ds: 1,
      lines: [[{ t: 'F 相等 · Z 相等 · C 互補' }], [{ t: '下一章：K20 多邊形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: 'F' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: 'Z', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: 'C', at: 2 },
      ],
    },
  },

  /* ============ K20 多邊形 ============ */
  k20: {
    regular: {
      title: '正多邊形', ds: 1,
      lines: [[{ t: '邊同角全部一樣' }], [{ t: '正六邊形可以鋪滿地面', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 70 L 285 105 L 285 175 L 215 210 L 145 175 L 145 105 Z', f: BLUE, w: 2.5 },
        { k: 't', x: 215, y: 145, s: 16, f: BLUE, w: 700, text: '正六邊形', at: 1 },
        { k: 't', x: 215, y: 245, s: 17, f: MUTED, text: '六邊形每個內角 120°', at: 2 },
      ],
    },
    interior: {
      title: '內角和公式', ds: 1,
      lines: [[{ t: '由一個頂點切三角形' }], [{ t: '內角和 = (n−2) × 180°', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 24, text: '五邊形 → 3 個三角形' },
        { k: 't', x: 215, y: 140, s: 24, text: '3 × 180° = 540°', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 195, s: 22, f: GOLD, w: 700, text: '(n−2) × 180°', at: 2 },
      ],
    },
    exterior: {
      title: '外角和 · 永遠 360°', ds: 1,
      lines: [[{ t: '行一個圈，轉晒成周' }], [{ t: 'n 邊形外角和 = 360°', fill: GOLD, b: true }]],
      art: [
        { k: 'circle', x: 215, y: 140, r: 70, f: BLUE, dash: '6 5' },
        { k: 't', x: 215, y: 148, s: 24, f: GOLD, w: 700, text: '360°', at: 1 },
        { k: 't', x: 215, y: 245, s: 17, f: MUTED, text: '幾多邊都係 360°', at: 2 },
      ],
    },
    tiling: {
      title: '鋪砌 · 邊啲可以鋪滿？', ds: 1,
      lines: [[{ t: '內角要夾埋啱啱 360°' }], [{ t: '3·4·6 邊形得 · 5 邊形唔得', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 100, w: 100, h: 64, f: OK, label: '三角形', sub: '60×6=360' },
        { k: 'chip', x: 165, y: 100, w: 100, h: 64, f: BLUE, label: '四邊形', sub: '90×4=360', at: 1 },
        { k: 'chip', x: 275, y: 100, w: 100, h: 64, f: GOLD, label: '六邊形', sub: '120×3=360', at: 2 },
        { k: 't', x: 215, y: 215, s: 19, f: RED, w: 700, text: '✗ 五邊形 108° 砌唔滿', at: 3 },
      ],
    },
    summary: {
      title: 'K20 完成', ds: 1,
      lines: [[{ t: '(n−2)×180° · 外角和 360°' }], [{ t: '下一章：K21 全等三角形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '內角和' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '360°', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '鋪砌', at: 2 },
      ],
    },
  },

  /* ============ K21 全等三角形 ============ */
  k21: {
    congruence: {
      title: '全等 = 完全一樣', ds: 1,
      lines: [[{ t: '疊埋一齊完全重疊' }], [{ t: '符號 ≅', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 70 200 L 150 90 L 210 200 Z', f: BLUE, w: 2.5 },
        { k: 'path', d: 'M 250 200 L 330 90 L 390 200 Z', f: GOLD, w: 2.5, at: 1 },
        { k: 't', x: 320, y: 245, s: 18, f: GOLD, w: 700, text: '△ABC ≅ △DEF', at: 2 },
      ],
    },
    conditions: {
      title: '四個全等條件', ds: 1,
      lines: [[{ t: '三邊 / 兩邊夾角 / 兩角夾邊 / 直角斜邊邊' }], [{ t: 'SSS · SAS · ASA · RHS', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 95, w: 80, h: 52, f: BLUE, label: 'SSS' },
        { k: 'chip', x: 135, y: 95, w: 80, h: 52, f: GOLD, label: 'SAS', at: 1 },
        { k: 'chip', x: 230, y: 95, w: 80, h: 52, f: OK, label: 'ASA', at: 2 },
        { k: 'chip', x: 325, y: 95, w: 80, h: 52, f: RED, label: 'RHS', at: 3 },
        { k: 't', x: 215, y: 200, s: 17, f: MUTED, text: '三隻角相等唔夠——形狀同但大細唔同', at: 4 },
      ],
    },
    isosceles: {
      title: '等腰三角形', ds: 1,
      lines: [[{ t: '兩邊相等 → 兩底角相等' }], [{ t: '底邊垂直平分線對稱', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 80 L 130 210 L 300 210 Z', f: GOLD, w: 2.5 },
        { k: 'line', x1: 215, y1: 80, x2: 215, y2: 210, f: BLUE, dash: '5 4', at: 1 },
        { k: 't', x: 155, y: 235, s: 15, f: OK, w: 700, text: '底角', at: 2 },
        { k: 't', x: 280, y: 235, s: 15, f: OK, w: 700, text: '底角', at: 2 },
      ],
    },
    summary: {
      title: 'K21 完成', ds: 1,
      lines: [[{ t: 'SSS SAS ASA RHS' }], [{ t: '下一章：K22 相似三角形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '≅' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '四條件', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '等腰', at: 2 },
      ],
    },
  },
}
