/**
 * DSE U1–U20 / M1 / M2 教材來源對照表
 *
 * 定案（計劃）：
 * - 牛津資料夾只有工作紙／鞏固練習（無完整課文 PDF）
 * - 牛津有工作紙嘅單元：牛津為準、新思維作補充例題
 * - 牛津冇嘅單元：新思維為準（A–E 必修彩色 PDF +《數學總結》公式頁）
 *
 * 路徑：
 * - 牛津：C:/Users/Administrator/math/dse_maths/TB/牛津数学资料
 * - 新思維：C:/Users/Administrator/math/dse_maths/TB/数学新思维/教材
 * - 總結：C:/Users/Administrator/math/dse_maths/TB/数学总结.pdf（P8＝一元二次）
 */

/** @typedef {'oxford'|'xinsiwei'|'both'} SourcePrimary */

/**
 * @type {Array<{
 *   code: string,
 *   title: string,
 *   primary: SourcePrimary,
 *   oxford: string|null,
 *   xinsiwei: string,
 *   notes: string,
 * }>}
 */
export const DSE_SOURCE_MAP = [
  {
    code: 'U1',
    title: '一元二次方程',
    primary: 'xinsiwei',
    oxford: '5B07（判別式／距離重溫，僅補充）',
    xinsiwei: 'A 冊 · 方程；數學總結 P8',
    notes: '主源新思維；牛津 5B07 有 Δ 相關練習可作補充',
  },
  {
    code: 'U2',
    title: '函數及其圖像',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'A 冊 · 函數及其圖像；數學總結「函數」章',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U3',
    title: '指數函數與對數函數',
    primary: 'oxford',
    oxford: '4B07 整數指數定律；4B08 對數定義與求值',
    xinsiwei: 'A/B 冊 · 指數對數（補充例題）',
    notes: '牛津工作紙為準；新思維補完整定義敘述',
  },
  {
    code: 'U4',
    title: '多項式的進一步認識',
    primary: 'oxford',
    oxford: '4B09 HCF/LCM、因式分解、定義域、因式定理',
    xinsiwei: 'A 冊 · 多項式／因式定理（補充）',
    notes: '牛津為準；可回顧 PRE-DSE 因式',
  },
  {
    code: 'U5',
    title: '方程的進一步認識',
    primary: 'xinsiwei',
    oxford: '5B06 率比百分、聯立方程（重溫）',
    xinsiwei: 'A/B 冊 · 聯立／可化二次',
    notes: '新思維為主；牛津 5B06 作應用重溫',
  },
  {
    code: 'U6',
    title: '變異',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'B 冊 · 變異',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U7',
    title: '等差數列與等比數列',
    primary: 'oxford',
    oxford: '601 數列概念與通項；602 等比數列',
    xinsiwei: 'B/C 冊 · 數列（補充例題）',
    notes: '牛津為準',
  },
  {
    code: 'U8',
    title: '不等式與線性規劃',
    primary: 'oxford',
    oxford: '603 複合不等式',
    xinsiwei: 'B 冊 · 不等式／線性規劃（補充）',
    notes: '牛津為準（複合不等式）；線性規劃靠新思維',
  },
  {
    code: 'U9',
    title: '以圖像解方程',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'B/C 冊 · 圖像解方程',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U10',
    title: '直線方程',
    primary: 'oxford',
    oxford: '5B07 距離、直線方程；5B08 點線距、平行線距',
    xinsiwei: 'C 冊 · 直線（補充例題）',
    notes: '牛津為準',
  },
  {
    code: 'U11',
    title: '圓的基本性質',
    primary: 'both',
    oxford: '5B07 圓性質（部分）',
    xinsiwei: 'C/D 冊 · 圓性質',
    notes: '牛津有圓性質練習；完整課文靠新思維',
  },
  {
    code: 'U12',
    title: '軌跡',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'D 冊 · 軌跡',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U13',
    title: '圓的方程',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'D 冊 · 圓方程',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U14',
    title: '三角學的進一步認識',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'D 冊 · 三角進一步',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U15',
    title: '排列與組合',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'E 冊 · 排列組合',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U16',
    title: '概率的進一步認識',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'E 冊 · 概率進一步',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U17',
    title: '離差的量度',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'E 冊 · 離差',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U18',
    title: '統計的應用與誤用',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: 'E 冊 · 統計應用與誤用',
    notes: '牛津缺 → 新思維為準',
  },
  {
    code: 'U19',
    title: '進一步應用',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: '跨單元專題（新思維應用章 + 現有骨架加深）',
    notes: '牛津缺 → 新思維／專題加深',
  },
  {
    code: 'U20',
    title: '探究與調查',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: '探究指引（新思維 + 課程指引）',
    notes: '牛津缺 → 新思維／課程指引',
  },
  {
    code: 'M1',
    title: '微積分與統計（延伸）',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: '新思維延伸／現有骨架加深',
    notes: '牛津夾內無對應工作紙套',
  },
  {
    code: 'M2',
    title: '代數與微積分（延伸）',
    primary: 'xinsiwei',
    oxford: null,
    xinsiwei: '新思維延伸／現有骨架加深',
    notes: '牛津夾內無對應工作紙套',
  },
]

/** 牛津章節碼 → App 單元（計劃已核實） */
export const OXFORD_CODE_TO_UNITS = {
  '4B07': ['U3', 'K10'],
  '4B08': ['U3'],
  '4B09': ['U4'],
  '5B06': ['U5'],
  '5B07': ['U10', 'U1', 'U11'],
  '5B08': ['U10'],
  '601': ['U7'],
  '602': ['U7'],
  '603': ['U8'],
}
