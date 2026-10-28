/**
 * 課程數據庫。
 *
 * beat = { id, caption, mode }
 *   caption  字幕（老師講解），可用「階段詞——內容」格式，ControlDeck 會拆 badge
 *   mode     駕駛 Theater 入面 lab 組件嘅場景旗
 *
 * 注意：唔好加「到你」互動問答 beat（用戶指示 2026-10-27——quiz 關卡一律移走，
 * 解釋直接交畀「點解」beat 做）。PyramidLab 嘅 gate mode 留起做休眠代碼。
 *
 * Q18 文字沿用 visual-calculus-web 已通過版權審查嘅中文版
 * （自己嘅話轉述，數字不變；phase 以「已知條件」分組，唔係句子順序）。
 */

/** PyramidLab 用嘅畫面內文字（zh-Hant） */
export const Q18_TEXT = {
  askPulse: '切走 VPBCQ 呢一角',
  whatSubA: '(a) 搵 AP（2 分）',
  whatSubB: '(b) 比較 α 同 β，邊個大？（6 分）',
  qTextA:
    '設定：一件直立角錐企喺正方底 ABCD 上面，\n底邊 20 cm，面角 ∠VAB = 72°。\nP 喺 VA 上面、Q 喺 VD 上面，兩點同一高度——\nPQ ∥ BC，而且 ∠PBA = 60°。',
  qTextB:
    '個角 VPBCQ 被切走，整成一件模型。\n(a) 搵 AP。\n(b) α 量度切面斜離底面幾多；\nβ 量度 PB 斜離底面幾多——邊個斜得多？',
  faceSub: '∠VAB——面 VAB 上面嘅角',
  pqSub: 'P 喺 VA 上 · Q 喺 VD 上 · PQ ∥ BC',
  pbSub: '∠PBA = 60°——PB 同 BA 嘅角',
  whyText: 'VO ⊥ 底面',
  gatePulse: 'α 定 β 大？',
  whyB: 'BH 係斜邊——分母大咗，tan 反而細',
  whyC: 'BH ≠ HH′——兩個 tan 唔同',
  whyD: '係嚴格大於——呢度 BH > HH′',
  hint: '點一個選項…',
  guideLaw0: '讀題：直立角錐 · 正方底 20 cm',
  guideLaw1: '(a) △ABP → 正弦定律',
  guideLaw2: '高度沿邊 VA 線性縮放',
  guideLaw3: '(b)(i) 兩條垂直線起 tan α',
  guideLaw4: '(b)(ii) 斜邊 BH > HH′',
}

/** 畢氏定理 · 視覺證明 — 課程脚本（action 駕駛 PythagorasLab 場景）。
 *  神技部份拆做 4 步：起大正方形 → 排滿 → 移位 → 睇返剩低嘅 c² → 結論 */
export const lessonScript = [
  {
    id: 1,
    text: '同學，睇下呢個直角三角形。第一步，我哋唔好死背公式，睇下邊長 a, b, c。',
    action: 'show_triangle',
  },
  {
    id: 2,
    text: '我哋喺 a 邊同 b 邊，分別畫出面積為 a² (藍色) 同 b² (黃色) 嘅正方形。',
    action: 'draw_squares',
  },
  {
    id: 3,
    text: '神技開始！而家攞一個大正方形，佢每條邊都啱啱好係 a + b 咁長。',
    action: 'build_square',
  },
  {
    id: 4,
    text: '將藍色 a²、黃色 b² 放入去；隔籬嗰兩個 a×b 長方形沿對角線剪開變 4 塊——啱啱好填滿成個大正方形！',
    action: 'arrange_pieces',
  },
  {
    id: 5,
    text: '剪碎移位！將 4 塊三角形移去四隻角，藍同黃就會讓出中間位置。',
    action: 'shift_pieces',
  },
  {
    id: 6,
    text: '睇！中間剩低一個傾斜正方形，佢嘅邊正正係斜邊 c——所以呢塊面積就係 c²。',
    action: 'reveal_c2',
  },
  {
    id: 7,
    text: '大正方形面積唔變、4 塊三角形又一樣，所以藍 + 黃 = c²：a² + b² = c²，畢氏定理證明完！',
    action: 'conclude',
  },
]

const pythagoras = {
  id: 'pythagoras-vis',
  mode: 'PRE_DSE',
  title: '畢氏定理 · 視覺證明',
  subtitle: '唔使死背——剪碎移位，睇住 a² + b² 點樣變 c²',
  lab: 'pythagoras',
  beats: lessonScript.map((s) => ({ id: `s${s.id}`, caption: s.text, mode: s.action })),
}

/** K1 基本運算 — 第一章（最基礎）課程脚本：黑板式逐行推演，12 頁 */
export const k1Script = [
  { id: 1, text: '第一招：整除性檢驗（4）——唔使計機，三行搞掂一條判斷題。', action: 'div4' },
  { id: 2, text: '整除性檢驗（8）：今次睇尾三位，同樣一行一行寫清楚。', action: 'div8' },
  { id: 3, text: '整除性檢驗（9）：冇得靠尾位，要數字和——其實 3 都係同一招。', action: 'div9' },
  { id: 4, text: '整除性檢驗（6）：6 = 2 × 3，兩關都過先算得，一行一行過。', action: 'div6' },
  { id: 5, text: '第二招：冪。2³ 唔係 2×3！指數 3 係話「三個 2 相乘」——2×2×2 = 8。', action: 'power' },
  { id: 6, text: '冪嘅運用：5²、3³、10⁴ 一條一條展開寫清楚。', action: 'power_expand' },
  { id: 7, text: '背呢頁：1² 到 12² 嘅平方數，加埋四個常用立方數。', action: 'power_table' },
  { id: 8, text: '小心比較：2³ = 8，3² = 9——底同指數調轉，答案唔同！', action: 'power_compare' },
  { id: 9, text: '第三招：質因數分解。先分清楚質數同合數——質數只有 1 同自己兩個因數。', action: 'primes' },
  { id: 10, text: '分解樹：將 60 一路拆，拆到淨係剩質數（金圈）——60 = 2²×3×5。', action: 'tree' },
  { id: 11, text: '同一個答案，短除法寫法：2 ) 60、2 ) 30、3 ) 15——一行一行除。', action: 'short_div' },
  { id: 12, text: '點解要拆？因為質因數分解係唯一嘅，仲係 HCF、LCM 嘅地基。例：84 = 2²×3×7。', action: 'factor_why' },
  { id: 13, text: '第四招：HCF——兩條質因數式擺埋，只攞「共有」嗰啲：12、18 → 6。', action: 'hcf' },
  { id: 14, text: 'LCM——攞「全部」質因數：2²×3² = 36，仲要驗算。', action: 'lcm' },
  { id: 15, text: '短除法一石二鳥：2 ) 12,18、3 ) 6,9——左邊乘埋 = HCF 6；全部乘埋 = LCM 36。', action: 'short_both' },
  { id: 16, text: '應用兩條：剪絲帶剪到最長等長 → HCF；兩個燈下一次同閃 → LCM。', action: 'hcf_app' },
  { id: 17, text: '分數乘法：分子乘分子、分母乘分母，最後記住約分。', action: 'frac_mul' },
  { id: 18, text: '分數加法：同分母直接加；異分母先用 LCM 通分。', action: 'frac_add' },
  { id: 19, text: '比大小：3/4 同 5/6 邊個大？通分做 9/12 vs 10/12——5/6 勝。', action: 'frac_compare' },
  { id: 20, text: '混合運算：先乘除，後加減——一行一行寫，唔好跳步。', action: 'mixed' },
  { id: 21, text: '第一章完成——五件工具以後每一章都靠佢哋，行晒一次溫故知新。', action: 'summary' },
]

/** 每頁嘅推演段數 = 圖形段 + 推演行數：用戶要撳幾多下 Next 先揭晒成頁 */
const K1_STEPS = [5, 5, 5, 5, 6, 5, 6, 6, 5, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 6]

const k1Basic = {
  id: 'k1-basic',
  mode: 'PRE_DSE',
  title: 'K1 基本運算',
  subtitle: '整除檢驗 · 冪 · 質因數分解 · HCF/LCM · 分數運算',
  lab: 'basic',
  beats: k1Script.map((s, i) => ({ id: `s${s.id}`, caption: s.text, mode: s.action, steps: K1_STEPS[i] })),
}

/** K2 有向數 — 第二章課程脚本 */
export const k2Script = [
  { id: 1, text: '第二章：有向數。數字有方向——正數向右，負數向左，0 係分界。', action: 'number_line' },
  { id: 2, text: '相反數：+5 同 −5 隔住 0 對望，互為相反數；負負得正，−(−7) = 7。', action: 'opposite' },
  { id: 3, text: '加正數＝向右行：(−2) + 5，由 −2 出發向右 5 格，到 +3。', action: 'add_pos' },
  { id: 4, text: '加負數＝向左行：(+3) + (−4)，由 3 出發向左 4 格，到 −1。', action: 'add_neg' },
  { id: 5, text: '減法秘技：減 = 加相反數。2 − (−3) = 2 + 3 = 5。', action: 'subtract' },
  { id: 6, text: '乘法符號：同號得正、異號得負。(−3) × (−4) = +12。', action: 'multiply' },
  { id: 7, text: '除法同乘法一樣：(−12) ÷ (−4) = +3；12 ÷ (−4) = −3。', action: 'divide' },
  { id: 8, text: '混合運算照舊先乘除後加減：(−2) + 3 × (−4) = −14。', action: 'mixed_ops' },
  { id: 9, text: '應用：昨晚 −5°C，今早升咗 8°C——(−5) + 8 = +3°C。', action: 'real_life' },
  { id: 10, text: '兩個常犯錯：−3 + 5 唔係 −8；(−2)² = +4 唔係 −4。', action: 'mistakes' },
  { id: 11, text: '第二章完成——有向數係代數嘅地基，下一章：K3 近似值與數值估計。', action: 'summary' },
]

const K2_STEPS = [7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]

const k2Directed = {
  id: 'k2-directed',
  mode: 'PRE_DSE',
  title: 'K2 有向數',
  subtitle: '數線 · 相反數 · 加減左右行 · 乘除同正異負 · 應用',
  lab: 'directed',
  beats: k2Script.map((s, i) => ({ id: `s${s.id}`, caption: s.text, mode: s.action, steps: K2_STEPS[i] })),
}

/** K3 近似值與數值估計 — 第三章課程脚本 */
export const k3Script = [
  { id: 1, text: '第三章：近似值。現實世界冇嘢係絕對精確——身高 171.3 cm，講到 cm 已經係近似。', action: 'concept' },
  { id: 2, text: '四捨五入：3.14159 去 2 位小數——睇第 3 位，1 細過 5，捨。', action: 'decimal_round' },
  { id: 3, text: '有效數字：由第一個非零數開始數，0.02046 嘅 3 位有效係 0.0205。', action: 'sig_fig' },
  { id: 4, text: '整數位四捨五入：2 748 到十 / 百 / 千，逐位睇、逐位寫。', action: 'round_place' },
  { id: 5, text: '估計策略：啲數醜就湊整——4.98 × 5.12 當 5 × 5，心算都計到。', action: 'estimate' },
  { id: 6, text: '現實應用：$49.9 買 3 件，當 $50 × 3 = $150，唔怕唔夠找。', action: 'real_life' },
  { id: 7, text: '常犯錯：有效數字由非零開始；5 係要進位，唔係捨。', action: 'mistakes' },
  { id: 8, text: '第三章完成——近似同估算係考試同現實嘅雙技能。下一章：K4 有理數與無理數。', action: 'summary' },
]

const K3_STEPS = [5, 6, 5, 6, 5, 5, 5, 6]

const k3Approx = {
  id: 'k3-approx',
  mode: 'PRE_DSE',
  title: 'K3 近似值與數值估計',
  subtitle: '真值 vs 近似 · 四捨五入 · 有效數字 · 湊整速算',
  lab: 'approx',
  beats: k3Script.map((s, i) => ({ id: `s${s.id}`, caption: s.text, mode: s.action, steps: K3_STEPS[i] })),
}

/** K4 有理數與無理數 — 第四章課程脚本 */
export const k4Script = [
  { id: 1, text: '第四章：根號。√16 讀「16 嘅平方根」——邊個數自乘等於 16？答案係 4。', action: 'nth_root' },
  { id: 2, text: '√2 = 1.41421356... 小數位無限延續又唔循環——呢類數叫無理數。', action: 'irrational' },
  { id: 3, text: '有理數就係寫得到 p/q 嘅數：整數、分數、有限小數、循環小數都算。', action: 'rational' },
  { id: 4, text: '分類練習：√25 = 5 係有理；√7 開唔盡，係無理；π 都係無理。', action: 'classify' },
  { id: 5, text: '化簡根式：搵完全平方因數——√8 = √4 × √2 = 2√2。', action: 'simplify' },
  { id: 6, text: '同類根式先加到：3√2 + 5√2 = 8√2；√8 + √2 就先化簡再加。', action: 'surd_add' },
  { id: 7, text: '根式相乘：√a × √b = √ab——√2 × √8 = √16 = 4。', action: 'surd_mul' },
  { id: 8, text: '應用：正方形面積 2 m²，邊長 = √2 m ≈ 1.41 m——無理數都係實長度。', action: 'real_life' },
  { id: 9, text: '兩大陷阱：√2 + √3 唔係 √5；√9 = 3 唔係 ±3。', action: 'mistakes' },
  { id: 10, text: '第四章完成——有理無理分得清，根式化簡乘除妥。下一章：K5 百分數。', action: 'summary' },
]

const K4_STEPS = [7, 6, 7, 5, 6, 6, 7, 7, 5, 6]

const k4Rational = {
  id: 'k4-rational',
  mode: 'PRE_DSE',
  title: 'K4 有理數與無理數',
  subtitle: '根號 · √2 無理數 · p/q 有理數 · 化簡與乘除',
  lab: 'rational',
  beats: k4Script.map((s, i) => ({ id: `s${s.id}`, caption: s.text, mode: s.action, steps: K4_STEPS[i] })),
}

/** K5 百分數的應用 — 第五章課程脚本 */
export const k5Script = [
  { id: 1, text: '第五章：百分數的應用。核心公式一條：百分比變化 =（新 − 舊）÷ 舊 × 100%。', action: 'pct_concept' },
  { id: 2, text: '百分比增加：$200 升到 $260——(260−200) ÷ 200 = +30%。', action: 'pct_increase' },
  { id: 3, text: '百分比減少：$250 跌到 $200——(200−250) ÷ 250 = −20%。基數係「舊值」。', action: 'pct_decrease' },
  { id: 4, text: '大陷阱：升 20% 再跌 20%，唔係返返原價——200 → 240 → 192，實際蝕咗！', action: 'pct_tricky' },
  { id: 5, text: '盈利：成本 $800、售價 $1,000——盈利 $200，盈利百分數以「成本」做基數 = 25%。', action: 'profit' },
  { id: 6, text: '折扣：標價 $400 打 8 折——400 × 80% = $320，即係減 $80（20% off）。', action: 'discount' },
  { id: 7, text: '單利息：I = P × r% × t——$10,000 年利率 5% 存 2 年，利息 $1,000，本利和 $11,000。', action: 'interest' },
  { id: 8, text: '綜合應用：手機 $3,000 減 15%——3,000 × 85% = $2,550，一行搞掂。', action: 'real_life' },
  { id: 9, text: '兩大陷阱：升跌唔對稱；盈利百分數嘅基數係成本唔係售價。', action: 'mistakes' },
  { id: 10, text: '第五章完成——百分數係現實生活最常用嘅數學，下一章：K6 率、比與比例。', action: 'summary' },
]

const K5_STEPS = [5, 6, 6, 7, 6, 6, 6, 6, 5, 6]

const k5Percent = {
  id: 'k5-percent',
  mode: 'PRE_DSE',
  title: 'K5 百分數的應用',
  subtitle: '百分比變化 · 盈利 · 折扣 · 單利息 · 應用',
  lab: 'percent',
  beats: k5Script.map((s, i) => ({ id: `s${s.id}`, caption: s.text, mode: s.action, steps: K5_STEPS[i] })),
}

const q18 = {
  id: 'dse-2012-p1-q18',
  mode: 'DSE',
  title: '2012 卷一 Q18 · 直立角錐切模型',
  subtitle: '3D 拆做 2D——正弦定律 → 高度 → 平面角，再比 α 同 β',
  lab: 'pyramid',
  beats: [
    { id: 'p0', caption: '題目——先睇圖', mode: 'figure' },
    { id: 'p1', caption: '題目——用自己嘅話講一次', mode: 'question' },
    { id: 'p2', caption: '已知條件 1——成件嘢：直立角錐，V 啱啱喺正中心 O 上方', mode: 'why' },
    { id: 'p3', caption: '已知條件 2——面角：∠VAB = 72° 喺面 VAB 上面', mode: 'face' },
    { id: 'p4', caption: '已知條件 3——切面位置：P 喺 VA、Q 喺 VD，PQ ∥ BC', mode: 'pq' },
    { id: 'p5', caption: '已知條件 3——切面深度：∠PBA = 60° 定住 P', mode: 'pb' },
    { id: 'p6', caption: '已知條件 4——切走：VPBCQ 呢一塊', mode: 'ask' },
    { id: 'p7a', caption: '問咩——(a) 搵 AP', mode: 'whatA' },
    { id: 'p7b', caption: '問咩——(b) 比較 α 同 β，邊個大？', mode: 'whatB' },
    { id: 'p8', caption: '面三角形 VAB——先搵 VA', mode: 'va' },
    { id: 'p9', caption: '三角形 ABP——收齊三隻角', mode: 'tri' },
    { id: 'p10', caption: '(a) 正弦定律搵 AP', mode: 'ap' },
    { id: 'p11', caption: '起 α——由 P 掉垂直線落 H，再畫 HH′ ⊥ BC', mode: 'build' },
    { id: 'p12', caption: '直角三角形 VOF——搵高度 VO', mode: 'vo' },
    { id: 'p13', caption: '高度沿邊線性縮——PH', mode: 'ph' },
    { id: 'p14', caption: '上視圖——搵 HH′', mode: 'hh' },
    { id: 'p15', caption: '(b)(i) tan α = PH / HH′', mode: 'alpha' },
    { id: 'p16', caption: 'β——PB 同底面嘅角', mode: 'beta' },
    { id: 'p18', caption: '點解 α 勝——分子同、分母細', mode: 'compare' },
    { id: 'p19', caption: '(a)(b) 一齊睇——AP · α · β', mode: 'answer' },
    { id: 'p20', caption: '驗證——AP + VP = VA', mode: 'verify' },
    { id: 'p21', caption: '解題指南', mode: 'guide' },
  ],
}

export const LESSONS_BY_MODE = {
  PRE_DSE: [k1Basic, k2Directed, k3Approx, k4Rational, k5Percent, pythagoras],
  DSE: [q18],
}
