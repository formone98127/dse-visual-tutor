import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** K22–K32 嘅場景資料 */

export const S3 = {
  /* ============ K22 相似三角形 ============ */
  k22: {
    concept: {
      title: '相似 = 形狀同 · 大小唔同', ds: 1,
      lines: [[{ t: '三角相等（AAA）＋ 邊成比例' }], [{ t: '符號 ∽', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 70 200 L 140 100 L 190 200 Z', f: BLUE, w: 2.5 },
        { k: 'path', d: 'M 250 200 L 340 60 L 400 200 Z', f: GOLD, w: 2.5, at: 1 },
        { k: 't', x: 320, y: 245, s: 18, f: GOLD, w: 700, text: '△ABC ∽ △DEF', at: 2 },
      ],
    },
    ratio: {
      title: '對應邊成比例', ds: 1,
      lines: [[{ t: '放大 2 倍：每條邊都 ×2' }], [{ t: '對應邊比例一樣', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: 'AB : DE = BC : EF = CA : FD' },
        { k: 't', x: 215, y: 150, s: 26, f: BLUE, w: 700, text: '2 : 4 = 3 : 6', at: 1 },
        { k: 't', x: 215, y: 205, s: 20, f: MUTED, text: '比例常數 = 相似比', at: 2 },
      ],
    },
    problems: {
      title: '應用 · 影子測高', ds: 1,
      lines: [[{ t: '棍 2 m 影 3 m；樹影 12 m' }], [{ t: '樹高 8 m', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 60, y1: 210, x2: 380, y2: 210, w: 3, at: 0 },
        { k: 'rect', x: 100, y: 160, w: 6, h: 50, f: BLUE, at: 1 },
        { k: 't', x: 130, y: 180, s: 14, f: BLUE, text: '棍 2m 影 3m', at: 1 },
        { k: 'rect', x: 280, y: 90, w: 8, h: 120, f: GOLD, at: 2 },
        { k: 't', x: 320, y: 120, s: 15, f: GOLD, w: 700, text: '影 12m', at: 2 },
        { k: 't', x: 215, y: 250, s: 22, f: OK, w: 700, text: '2/3 = h/12 → h = 8 m', at: 3 },
      ],
    },
    summary: {
      title: 'K22 完成', ds: 1,
      lines: [[{ t: 'AAA · 對應邊成比例' }], [{ t: '下一章：K23 四邊形', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '∽' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '比例', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '應用', at: 2 },
      ],
    },
  },

  /* ============ K23 四邊形 ============ */
  k23: {
    para: {
      title: '平行四邊形性質', ds: 1,
      lines: [[{ t: '對邊平行相等 · 對角相等' }], [{ t: '對角線互相平分', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 90 190 L 140 90 L 340 90 L 290 190 Z', f: BLUE, w: 2.5 },
        { k: 'line', x1: 140, y1: 90, x2: 290, y2: 190, f: GOLD, dash: '5 4', at: 1 },
        { k: 'line', x1: 90, y1: 190, x2: 340, y2: 90, f: GOLD, dash: '5 4', at: 1 },
        { k: 'dot', x: 215, y: 140, r: 5, f: OK, at: 2 },
      ],
    },
    special: {
      title: '菱形 · 長方形 · 正方形', ds: 1,
      lines: [[{ t: '菱形四邊等 · 長方形四角直' }], [{ t: '正方形兩樣都齊', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 75 145 L 115 90 L 175 145 L 135 200 Z', f: BLUE, w: 2.4 },
        { k: 't', x: 125, y: 235, s: 14, f: BLUE, text: '菱形', at: 1 },
        { k: 'rect', x: 200, y: 95, w: 80, h: 70, f: GOLD, at: 2 },
        { k: 't', x: 240, y: 235, s: 14, f: GOLD, text: '長方形', at: 2 },
        { k: 'rect', x: 305, y: 95, w: 70, h: 70, f: OK, at: 3 },
        { k: 't', x: 340, y: 235, s: 13, f: OK, text: '正方形', at: 3 },
      ],
    },
    midpoint: {
      title: '中點定理', ds: 1,
      lines: [[{ t: '三角形兩邊中點連線' }], [{ t: '= 第三邊一半，而且平行', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 70 L 90 210 L 340 210 Z', f: BLUE, w: 2.5 },
        { k: 'dot', x: 152, y: 140, r: 5, f: GOLD, at: 1 },
        { k: 'dot', x: 278, y: 140, r: 5, f: GOLD, at: 1 },
        { k: 'line', x1: 152, y1: 140, x2: 278, y2: 140, f: GOLD, w: 3, at: 2 },
        { k: 't', x: 215, y: 250, s: 18, f: GOLD, w: 700, text: '中點連線 = ½ × 底邊', at: 3 },
      ],
    },
    summary: {
      title: 'K23 完成', ds: 1,
      lines: [[{ t: '平行四邊形 · 特殊四邊形 · 中點定理' }], [{ t: '下一章：K24 三角形的心', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '平行' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '菱矩形', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '中點', at: 2 },
      ],
    },
  },

  /* ============ K24 三角形的心 ============ */
  k24: {
    bisectors: {
      title: '兩條重要線', ds: 1,
      lines: [[{ t: '角平分線：到兩邊等距' }], [{ t: '垂直平分線：到兩端等距', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 70 L 90 210 L 340 210 Z', f: BLUE, w: 2.5 },
        { k: 'line', x1: 215, y1: 70, x2: 215, y2: 210, f: GOLD, dash: '5 4', at: 1 },
        { k: 't', x: 215, y: 250, s: 17, f: MUTED, text: '平分線上有神秘平衡力量', at: 2 },
      ],
    },
    concurrence: {
      title: '四心 · 三線共點', ds: 1,
      lines: [[{ t: '重心(中線) · 外心(垂直平分線)' }], [{ t: '內心(角平分線) · 垂心(高)', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 215 70 L 90 210 L 340 210 Z', f: BLUE, w: 2.5 },
        { k: 'dot', x: 215, y: 163, r: 6, f: GOLD, label: '重心', at: 1 },
        { k: 'dot', x: 215, y: 120, r: 6, f: BLUE, label: '外心', at: 2 },
        { k: 'dot', x: 240, y: 175, r: 6, f: OK, label: '內心', at: 3 },
        { k: 't', x: 215, y: 250, s: 16, f: MUTED, text: '重心：中線 2:1 分點', at: 4 },
      ],
    },
    summary: {
      title: 'K24 完成', ds: 1,
      lines: [[{ t: '角平分線 · 垂直平分線 · 四心' }], [{ t: '度量幾何完成', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '重心' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '外心', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '內心', at: 2 },
      ],
    },
  },

  /* ============ K26 直角坐標系 ============ */
  k26: {
    system: {
      title: '直角坐標系', ds: 1,
      lines: [[{ t: 'x 軸橫 · y 軸直 · 交點係原點' }], [{ t: '(x, y) 好似地址', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 60, y1: 145, x2: 380, y2: 145, w: 2.5 },
        { k: 'line', x1: 215, y1: 45, x2: 215, y2: 240, w: 2.5, at: 1 },
        { k: 't', x: 390, y: 165, s: 15, f: BLUE, w: 700, text: 'x', at: 0 },
        { k: 't', x: 228, y: 55, s: 15, f: OK, w: 700, text: 'y', at: 1 },
        { k: 'dot', x: 290, y: 95, r: 6, f: GOLD, label: '(3, 2)', at: 2 },
      ],
    },
    distance: {
      title: '兩點距離公式', ds: 1,
      lines: [[{ t: '(1,2) 到 (4,6)：橫 3 直 4' }], [{ t: 'd = √(3² + 4²) = 5', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 85, s: 22, text: 'd = √[(x₁−x₂)² + (y₁−y₂)²]' },
        { k: 't', x: 215, y: 140, s: 22, text: '= √(3² + 4²)', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 195, s: 30, f: GOLD, w: 700, text: '= 5', at: 2 },
      ],
    },
    midpoint: {
      title: '中點公式', ds: 1,
      lines: [[{ t: '兩個坐標各自除 2 加埋' }], [{ t: '(1,2)+(4,6) → (2.5, 4)', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 22, text: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)' },
        { k: 't', x: 215, y: 150, s: 24, f: GOLD, w: 700, text: '((1+4)/2, (2+6)/2) = (2.5, 4)', at: 1 },
      ],
    },
    transform: {
      title: '變換 · 點會郁', ds: 1,
      lines: [[{ t: '右移 +x · 上移 +y' }], [{ t: '反射 x 軸：y 變 −y', fill: GOLD, b: true }]],
      art: [
        { k: 'dot', x: 150, y: 180, r: 7, f: BLUE, label: '(2, 3)', at: 0 },
        { k: 'arrow', x1: 160, y1: 180, x2: 240, y2: 180, f: GOLD, at: 1 },
        { k: 'dot', x: 255, y: 180, r: 7, f: GOLD, label: '+2 右', at: 1 },
        { k: 'dot', x: 255, y: 110, r: 7, f: OK, label: '反射後', at: 2 },
      ],
    },
    areas: {
      title: '坐標圖形面積', ds: 1,
      lines: [[{ t: '矩形底×高 · 三角形底×高÷2' }], [{ t: '用坐標差搵底同高', fill: GOLD, b: true }]],
      art: [
        { k: 'rect', x: 100, y: 90, w: 130, h: 90, f: BLUE, fill: 1 },
        { k: 't', x: 165, y: 140, s: 17, f: BLUE, w: 700, text: '底 13 × 高 9', at: 1 },
        { k: 't', x: 320, y: 140, s: 22, f: GOLD, w: 700, text: 'A = 117', at: 2 },
      ],
    },
    summary: {
      title: 'K26 完成', ds: 1,
      lines: [[{ t: '坐標 · 距離 · 中點 · 變換' }], [{ t: '下一章：K27 三角比', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '(x,y)' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '距離', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '中點', at: 2 },
      ],
    },
  },

  /* ============ K27 三角比 ============ */
  k27: {
    ratios: {
      title: 'sin · cos · tan', ds: 1,
      lines: [[{ t: '對邊 / 斜邊 = sin　鄰 / 斜 = cos' }], [{ t: '對 / 鄰 = tan（TOA）', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 100 200 L 300 200 L 300 90 Z', f: BLUE, w: 2.5 },
        { k: 't', x: 200, y: 225, s: 15, f: OK, text: '鄰', at: 1 },
        { k: 't', x: 322, y: 145, s: 15, f: GOLD, text: '對', at: 1 },
        { k: 't', x: 190, y: 135, s: 15, f: RED, text: '斜', at: 2 },
        { k: 't', x: 120, y: 185, s: 16, f: GOLD, w: 700, text: 'θ', at: 0 },
        { k: 't', x: 215, y: 260, s: 17, f: MUTED, text: 'SOH · CAH · TOA', at: 3 },
      ],
    },
    exact: {
      title: '特殊角準確值', ds: 1,
      lines: [[{ t: '30° · 45° · 60° 要背' }], [{ t: 'sin30=½ · cos60=½ · tan45=1', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 45, y: 100, w: 105, h: 64, f: BLUE, label: 'sin30=½' },
        { k: 'chip', x: 162, y: 100, w: 105, h: 64, f: GOLD, label: 'cos60=½', at: 1 },
        { k: 'chip', x: 279, y: 100, w: 105, h: 64, f: OK, label: 'tan45=1', at: 2 },
        { k: 't', x: 215, y: 210, s: 17, f: MUTED, text: 'sin45 = cos45 = √2/2', at: 3 },
      ],
    },
    elev: {
      title: '仰角與俯角', ds: 1,
      lines: [[{ t: '仰角：抬頭望上 · 俯角：低頭望落' }], [{ t: '都係同水平線嘅夾角', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 80, y1: 180, x2: 360, y2: 180, w: 2.5, at: 0 },
        { k: 'rect', x: 90, y: 80, w: 10, h: 100, f: BLUE, at: 1 },
        { k: 't', x: 130, y: 75, s: 15, f: BLUE, w: 700, text: '塔', at: 1 },
        { k: 'path', d: 'M 320 180 L 100 85', f: GOLD, w: 2.4, at: 2 },
        { k: 't', x: 285, y: 168, s: 15, f: GOLD, w: 700, text: '仰角 θ', at: 2 },
      ],
    },
    apply: {
      title: '應用 · 求邊', ds: 1,
      lines: [[{ t: 'sin35° = x / 10' }], [{ t: 'x = 10 × sin35° ≈ 5.7', fill: GOLD, b: true }]],
      art: [
        { k: 'path', d: 'M 120 205 L 330 205 L 330 95 Z', f: BLUE, w: 2.5 },
        { k: 'path', d: 'M 316 205 L 316 191 L 330 191', f: MUTED, w: 1.8 },
        { k: 't', x: 162, y: 197, s: 15, f: GOLD, w: 700, text: '35°', at: 1 },
        { k: 't', x: 206, y: 138, s: 16, f: BLUE, text: '10', at: 1 },
        { k: 't', x: 348, y: 155, s: 16, f: GOLD, w: 700, text: 'x', at: 1 },
        { k: 't', x: 215, y: 245, s: 15, f: MUTED, text: '對邊 = 斜邊 × sin', at: 2 },
      ],
    },
    summary: {
      title: 'K27 完成', ds: 1,
      lines: [[{ t: 'SOH CAH TOA · 特殊角 · 仰俯角' }], [{ t: '下一章：K28 數據整理', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: 'sin' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: 'cos', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: 'tan', at: 2 },
      ],
    },
  },

  /* ============ K28 數據整理 ============ */
  k28: {
    discrete: {
      title: '離散 vs 連續數據', ds: 1,
      lines: [[{ t: '離散：一格一格數（家庭人數）' }], [{ t: '連續：可以無限細分（身高）', fill: GOLD, b: true }]],
      art: [
        { k: 'blocks', x: 60, y: 120, n: 5, f: BLUE, size: 28, at: 1 },
        { k: 't', x: 130, y: 190, s: 15, f: BLUE, text: '離散：數得出', at: 1 },
        { k: 'line', x1: 230, y1: 160, x2: 380, y2: 120, f: GOLD, w: 3, at: 2 },
        { k: 't', x: 300, y: 190, s: 15, f: GOLD, text: '連續：量出嚟', at: 2 },
      ],
    },
    grouping: {
      title: '頻數表 · 分組', ds: 1,
      lines: [[{ t: '成組數：60-64 有 5 人' }], [{ t: '組中點 = (上限+下限) ÷ 2', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 60, y: 100, w: 130, h: 60, f: BLUE, label: '60–64', sub: '5 人' },
        { k: 'chip', x: 210, y: 100, w: 130, h: 60, f: GOLD, label: '65–69', sub: '8 人', at: 1 },
        { k: 't', x: 215, y: 210, s: 18, f: MUTED, text: '60–64 組中點 = 62', at: 2 },
      ],
    },
    summary: {
      title: 'K28 完成', ds: 1,
      lines: [[{ t: '離散連續分清 · 頻數表' }], [{ t: '下一章：K29 數據表達', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '離散' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '連續', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '頻數', at: 2 },
      ],
    },
  },

  /* ============ K29 數據表達 ============ */
  k29: {
    stem: {
      title: '幹葉圖', ds: 1,
      lines: [[{ t: '幹 = 十位 · 葉 = 個位' }], [{ t: '保留晒原始數據', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 105, y: 90, s: 20, f: BLUE, w: 700, text: '2 | 1 4 8', a: 'start' },
        { k: 't', x: 105, y: 130, s: 20, f: BLUE, w: 700, text: '3 | 0 5 5 9', a: 'start', at: 1 },
        { k: 't', x: 105, y: 170, s: 20, f: BLUE, w: 700, text: '4 | 2 7', a: 'start', at: 2 },
        { k: 't', x: 330, y: 130, s: 15, f: MUTED, text: '即 21,24,28…', at: 3 },
      ],
    },
    hist: {
      title: '直方圖 · 頻數多邊形', ds: 1,
      lines: [[{ t: '直方圖：組距相連柱體' }], [{ t: '多邊形：組中點連線', fill: GOLD, b: true }]],
      art: [
        { k: 'bar', x: 90, y0: 200, h: 60, w: 50, f: BLUE, label: 'A', value: '5' },
        { k: 'bar', x: 150, y0: 200, h: 95, w: 50, f: BLUE, label: 'B', value: '8', at: 1 },
        { k: 'bar', x: 210, y0: 200, h: 45, w: 50, f: BLUE, label: 'C', value: '4', at: 1 },
        { k: 'bar', x: 270, y0: 200, h: 75, w: 50, f: BLUE, label: 'D', value: '6', at: 2 },
        { k: 'path', d: 'M 115 135 L 175 100 L 235 150 L 295 120', f: GOLD, w: 2.2, dash: '5 4', at: 3 },
      ],
    },
    choose: {
      title: '揀啱圖表', ds: 1,
      lines: [[{ t: '趨勢 → 折線 · 佔比 → 圓餅' }], [{ t: '比較 → 柱形 · 分佈 → 直方', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 95, w: 105, h: 60, f: BLUE, label: '折線', sub: '趨勢' },
        { k: 'chip', x: 162, y: 95, w: 105, h: 60, f: GOLD, label: '圓餅', sub: '佔比', at: 1 },
        { k: 'chip', x: 284, y: 95, w: 105, h: 60, f: OK, label: '柱形', sub: '比較', at: 2 },
        { k: 't', x: 215, y: 210, s: 17, f: MUTED, text: '標題、軸名、單位一樣唔可以少', at: 3 },
      ],
    },
    summary: {
      title: 'K29 完成', ds: 1,
      lines: [[{ t: '幹葉 · 直方 · 多邊形 · 揀圖' }], [{ t: '下一章：K30 集中趨勢', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '幹葉' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '直方', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '揀圖', at: 2 },
      ],
    },
  },

  /* ============ K30 集中趨勢 ============ */
  k30: {
    mmm: {
      title: '平均 · 中位 · 眾數', ds: 1,
      lines: [[{ t: '數據 2, 4, 4, 10' }], [{ t: '平均 5 · 中位 4 · 眾數 4', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 90, s: 24, text: '2 · 4 · 4 · 10' },
        { k: 't', x: 215, y: 140, s: 20, text: '平均 = (2+4+4+10)÷4 = 5', f: BLUE, at: 1 },
        { k: 't', x: 215, y: 185, s: 20, text: '中位 = 中間兩數平均 = 4', f: GOLD, at: 2 },
        { k: 't', x: 215, y: 230, s: 20, text: '眾數 = 出現最多 = 4', f: OK, at: 3 },
      ],
    },
    grouped: {
      title: '分組數據', ds: 1,
      lines: [[{ t: '用組中點做代表計平均' }], [{ t: '最多人嗰組 = 模態組', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 22, text: '平均 ≈ Σ(組中點×頻數) ÷ 總頻數' },
        { k: 't', x: 215, y: 155, s: 24, f: GOLD, w: 700, text: '模態組 = 頻數最大嗰組', at: 1 },
      ],
    },
    weighted: {
      title: '加權平均數', ds: 1,
      lines: [[{ t: '佔比大嘅影響大' }], [{ t: 'Σ(值×權) ÷ Σ權', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 22, text: '科 4 學分考 80 · 科 2 學分考 60' },
        { k: 't', x: 215, y: 150, s: 24, text: '(80×4 + 60×2) ÷ 6', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 28, f: GOLD, w: 700, text: '≈ 73.3', at: 2 },
      ],
    },
    abuses: {
      title: '平均嘅陷阱', ds: 1,
      lines: [[{ t: '老闆人工 $90k，員工 $15k' }], [{ t: '「平均人工 $25k」誤導！', fill: RED }]],
      art: [
        { k: 't', x: 215, y: 95, s: 22, text: '1 人 $90k + 4 人 $15k' },
        { k: 't', x: 215, y: 150, s: 24, f: RED, w: 700, text: '平均 $30k —— 冇人係 $30k！', at: 1 },
        { k: 't', x: 215, y: 205, s: 20, f: OK, w: 700, text: '中位數 $15k 先講到實情', at: 2 },
      ],
    },
    summary: {
      title: 'K30 完成', ds: 1,
      lines: [[{ t: '三個平均 · 加權 · 誤用' }], [{ t: '下一章：K31 概率', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 110, w: 100, h: 70, f: BLUE, label: '平均' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '中位', at: 1 },
        { k: 'chip', x: 290, y: 110, w: 100, h: 70, f: OK, label: '眾數', at: 2 },
      ],
    },
  },

  /* ============ K31 概率 ============ */
  k31: {
    concept: {
      title: '概率 · 0 至 1', ds: 1,
      lines: [[{ t: 'P = 有利結果 ÷ 全部結果' }], [{ t: '0 = 冇可能 · 1 = 必然', fill: GOLD, b: true }]],
      art: [
        { k: 'line', x1: 80, y1: 150, x2: 350, y2: 150, w: 3, at: 0 },
        { k: 't', x: 80, y: 180, s: 16, f: RED, w: 700, text: '0', at: 1 },
        { k: 't', x: 350, y: 180, s: 16, f: OK, w: 700, text: '1', at: 1 },
        { k: 't', x: 215, y: 180, s: 16, f: MUTED, text: '½', at: 2 },
        { k: 'dot', x: 290, y: 150, r: 8, f: GOLD, label: '擲公字 ½', at: 3 },
      ],
    },
    listing: {
      title: '列舉法 · 擲兩個毫子', ds: 1,
      lines: [[{ t: '四個結果：HH HT TH TT' }], [{ t: 'P(一公一字) = 2/4 = ½', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 95, w: 100, h: 56, f: BLUE, label: 'HH' },
        { k: 'chip', x: 165, y: 95, w: 100, h: 56, f: GOLD, label: 'HT', at: 1 },
        { k: 'chip', x: 275, y: 95, w: 100, h: 56, f: GOLD, label: 'TH', at: 1 },
        { k: 'chip', x: 55, y: 165, w: 100, h: 56, f: BLUE, label: 'TT', at: 2 },
        { k: 't', x: 265, y: 195, s: 22, f: OK, w: 700, text: 'P = 2/4 = ½', at: 3 },
      ],
    },
    expect: {
      title: '期望值', ds: 1,
      lines: [[{ t: 'E = Σ(結果 × 概率)' }], [{ t: '長遠平均數', fill: GOLD, b: true }]],
      art: [
        { k: 't', x: 215, y: 95, s: 22, text: '抽獎：中 $100（P=0.1）' },
        { k: 't', x: 215, y: 150, s: 24, text: 'E = 100 × 0.1 = $10', f: BLUE, w: 700, at: 1 },
        { k: 't', x: 215, y: 205, s: 18, f: MUTED, text: '票價貴過 $10 就唔抵玩', at: 2 },
      ],
    },
    problems: {
      title: '應用 · 袋入面抽波', ds: 1,
      lines: [[{ t: '3 紅 2 藍，抽一個' }], [{ t: 'P(紅) = 3/5', fill: GOLD, b: true }]],
      art: [
        { k: 'blocks', x: 120, y: 100, n: 3, f: RED, size: 34, at: 1 },
        { k: 'blocks', x: 250, y: 100, n: 2, f: BLUE, size: 34, at: 1 },
        { k: 't', x: 160, y: 170, s: 14, f: RED, text: '紅 3', at: 1 },
        { k: 't', x: 290, y: 170, s: 14, f: BLUE, text: '藍 2', at: 1 },
        { k: 't', x: 215, y: 225, s: 24, f: GOLD, w: 700, text: 'P(紅) = 3/5 · P(藍) = 2/5', at: 2 },
      ],
    },
    summary: {
      title: 'K31 完成', ds: 1,
      lines: [[{ t: 'P = 有利÷全部 · 列舉 · 期望' }], [{ t: 'PRE-DSE 統計完成', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: 'P' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '列舉', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '期望', at: 2 },
      ],
    },
  },

  /* ============ K32 探究與調查 ============ */
  k32: {
    inquiry: {
      title: '數學探究 · 四步曲', ds: 1,
      lines: [[{ t: '問問題 → 作模型 → 試吓 → 結論' }], [{ t: '錯咗就調整再嚟', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 40, y: 100, w: 90, h: 64, f: BLUE, label: '①問' },
        { k: 'arrow', x1: 135, y1: 132, x2: 158, y2: 132, f: MUTED, at: 1 },
        { k: 'chip', x: 165, y: 100, w: 90, h: 64, f: GOLD, label: '②模', at: 1 },
        { k: 'arrow', x1: 260, y1: 132, x2: 283, y2: 132, f: MUTED, at: 2 },
        { k: 'chip', x: 290, y: 100, w: 90, h: 64, f: OK, label: '③試', at: 2 },
        { k: 't', x: 215, y: 210, s: 20, f: GOLD, w: 700, text: '④結論 + 反思', at: 3 },
      ],
    },
    summary: {
      title: 'K32 完成 · PRE-DSE 全部完成', ds: 1,
      lines: [[{ t: '32 章初中課程行晒' }], [{ t: '準備好就入 DSE 高中課程', fill: GOLD, b: true }]],
      art: [
        { k: 'chip', x: 55, y: 110, w: 100, h: 70, f: BLUE, label: '探究' },
        { k: 'chip', x: 165, y: 110, w: 100, h: 70, f: GOLD, label: '調查', at: 1 },
        { k: 'chip', x: 275, y: 110, w: 100, h: 70, f: OK, label: '畢業', at: 2 },
      ],
    },
  },
}
