/**
 * U2 函數及其圖像 — 由教材抽出嘅定義／公式／例題／易錯
 *
 * 主源：數學總結.pdf P11–12「函數及其圖像」
 * 補充：新思維 A 冊 · 函數及其圖像（掃描課本，公式對照總結頁）
 *
 * 五層對照：概念 → 方法 → 例題 → 常見錯 → 練習
 *
 * 註：總結 P11「變換」屬非基礎／乙卷 MC 熱門；App 詳細放 U9，
 * U2 只帶到頂點式 y = a(x−h)² + k 同平移含義。
 */

export const U2_EXTRACT = {
  source: {
    primary: 'xinsiwei',
    files: [
      'TB/数学总结.pdf (P11 變換概覽 · P12 二次函數／配方)',
      'TB/数学新思维/教材/数学新思维 A册 必修部分-彩266.pdf（函數章）',
    ],
  },

  /** 1. 概念 */
  concept: {
    definition: '若每個准許嘅 x 都只對應一個 y，就話 y 係 x 嘅函數，寫 y = f(x)。',
    why: '圖像同極大極小問題，都要先分清「邊個入、邊個出」。',
    symbols: [
      'f：規則（函數名）',
      'x：自變數（入）',
      'f(x)：因變數（出）',
      '定義域：准許入嘅 x 集合',
    ],
  },

  /** 2. 方法／公式 */
  methods: {
    notation: {
      name: '函數記法',
      example: {
        q: 'f(x) = 2x + 1，求 f(3)',
        work: ['f(3) = 2·3 + 1', '= 7'],
      },
      domainTip: '分母唔可以係 0；偶次根號入面 ≥ 0',
    },
    quadratic: {
      name: '二次函數標準形',
      formula: 'y = f(x) = ax² + bx + c（a ≠ 0）',
      mcRules: [
        'a > 0 開口向上；a < 0 開口向下',
        'c = y 截距（圖像交 y 軸）',
        '對稱軸／頂點 x 座標 = −b/(2a)',
        '同 x 軸交點個數睇 Δ = b² − 4ac',
      ],
    },
    vertex: {
      name: '頂點與對稱軸',
      formulas: [
        '頂點：(−b/(2a) , f(−b/(2a)))',
        '對稱軸：x = −b/(2a)',
      ],
    },
    discriminantGraph: {
      name: 'Δ 與 x 軸交點',
      formula: 'Δ = b² − 4ac',
      cases: [
        { cond: 'Δ > 0', result: '兩個交點' },
        { cond: 'Δ = 0', result: '一個交點（相切）' },
        { cond: 'Δ < 0', result: '無交點' },
        { cond: '有交點', result: 'Δ ≥ 0' },
      ],
    },
    completeSquare: {
      name: '配方法 → 頂點式',
      formula: 'y = a(x − h)² + k → 頂點 (h, k)，對稱軸 x = h',
      example: {
        q: '求 f(x) = 2x² + 6x + 1 嘅最小值同對應 x',
        work: [
          'f(x) = 2(x² + 3x) + 1',
          'f(x) = 2[(x + 3/2)² − (3/2)²] + 1',
          'f(x) = 2(x + 3/2)² − 9/2 + 1',
          'f(x) = 2(x + 3/2)² − 7/2',
          '最小值 = −7/2（當 x = −3/2）',
          '最低點：(−3/2 , −7/2)',
        ],
      },
    },
    transformPreview: {
      name: '頂點式嘅平移含義（詳見 U9）',
      notes: [
        'y = f(x − h) 右移 h；y = f(x + h) 左移 h',
        'y = f(x) + k 上移 k；y = f(x) − k 下移 k',
      ],
    },
  },

  /** 3. 常見錯 */
  mistakes: [
    {
      wrong: 'a > 0 當有最大值',
      right: 'a > 0 開口向上 → 有最小值',
    },
    {
      wrong: '頂點 x = b/(2a)',
      right: '頂點 x = −b/(2a)（有負號）',
    },
    {
      wrong: '「有交點」寫成只要 Δ > 0',
      right: '有交點包含相切 → Δ ≥ 0',
    },
  ],

  /** 4. 練習／應用 */
  practice: {
    q: '用 20 m 圍欄靠牆圍長方形，闊 x m，求最大面積。',
    setup: '兩邊闊用 2x，長 = 20 − 2x → A = x(20 − 2x) = 20x − 2x²',
    answer: '頂點 x = 5；A(5) = 50 → 最大面積 50 m²',
  },
}
