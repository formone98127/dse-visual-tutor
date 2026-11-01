const fs = require('fs')
const path = require('path')

const coursePacks = `/**
 * Course packs — marketing packaging over PRE_DSE / DSE syllabus codes.
 * Landing page cards mirror this list; learn.html deep-links use ctaHref.
 */
export const COURSE_PACKS = [
  {
    id: 'number-sense',
    title: '數感起步',
    subtitle: '整除、有向數、估計、無理數、百分數、比率',
    codes: ['K1', 'K2', 'K3', 'K4', 'K5', 'K6'],
    strandLabel: '數與代數基礎',
    highlight: '打好數感底子，之後代數同圖形先唔會亂',
    lessonHint: 'K1–K6 · 6 個單元',
    badge: null,
    accent: 'gold',
    ctaHref: 'learn.html?mode=PRE_DSE&topic=k1',
    ctaLabel: '開始數感',
  },
  {
    id: 'algebra',
    title: '方程與代數',
    subtitle: '代數式到不等式',
    codes: ['K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13', 'K14'],
    strandLabel: '數與代數',
    highlight: '由文字建方程，一路練到不等式',
    lessonHint: 'K7–K14 · 8 個單元',
    badge: null,
    accent: 'blue',
    ctaHref: 'learn.html?mode=PRE_DSE&topic=k7',
    ctaLabel: '開始代數',
  },
  {
    id: 'geometry',
    title: '圖形神技',
    subtitle: '度量、圖形與空間',
    codes: ['K15', 'K16', 'K17', 'K18', 'K19', 'K20', 'K21', 'K22', 'K23', 'K24', 'K25', 'K26', 'K27'],
    strandLabel: '度量、圖形與空間',
    highlight: '立體、全等相似、畢氏、三角比一次睇明',
    lessonHint: '含畢氏視覺證明',
    badge: '明星賣點',
    accent: 'ok',
    ctaHref: 'learn.html?mode=PRE_DSE&topic=k25',
    ctaLabel: '睇圖形神技',
  },
  {
    id: 'data',
    title: '數據與概率',
    subtitle: '整理、表達、集中趨勢、概率',
    codes: ['K28', 'K29', 'K30', 'K31'],
    strandLabel: '數據處理',
    highlight: '圖表點揀、平均數點計、概率點諗',
    lessonHint: 'K28–K31 · 4 個單元',
    badge: null,
    accent: 'blue',
    ctaHref: 'learn.html?mode=PRE_DSE&topic=k28',
    ctaLabel: '開始數據',
  },
  {
    id: 'dse-core',
    title: 'DSE 高中精讀',
    subtitle: '必修 20 個學習單位',
    codes: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'U19', 'U20'],
    strandLabel: '高中必修',
    highlight: '對齊 EDB 高中學習單位，逐步補齊視覺課',
    lessonHint: 'U1–U20 · 逐步開放',
    badge: '逐步開放',
    accent: 'gold',
    ctaHref: 'learn.html?mode=DSE',
    ctaLabel: '進入高中',
  },
]

export function getCoursePack(id) {
  return COURSE_PACKS.find((p) => p.id === id) ?? null
}
`

fs.writeFileSync(path.join('src', 'data', 'coursePacks.js'), coursePacks, 'utf8')
console.log('coursePacks.js ok', Buffer.byteLength(coursePacks))
