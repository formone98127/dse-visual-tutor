/**
 * U1 一元二次方程 — 嚴格跟教材抽出
 *
 * 主源：TB/数学总结.pdf P8–9「五、方程 · 1. 一元二次方程」
 * 補充：新思維 A 冊方程章（因式／配方步驟）；牛津 5B07（Δ 題型）
 *
 * 總結頁結構：
 *  (1) 解方程／求根公式
 *  (2) 根的數目（Δ）
 *  (3) 由已知根建方程
 *  (4) 根與係數（非基礎）+ α²+β²
 *  (5) 複數加減乘除（非基礎）
 *  (6) 利用複數根建方程（乙）
 */

export const U1_EXTRACT = {
  source: {
    primary: 'xinsiwei',
    files: [
      'TB/数学总结.pdf P8–9',
      'TB/数学新思维/教材/数学新思维 A册（方程章補充步驟）',
      '牛津 5B07（Δ 補充）',
    ],
    pageMap: {
      formula: 'P8 (1)',
      disc: 'P8 (2)',
      build: 'P8 (3)',
      vieta: 'P8 (4)',
      complexOps: 'P8 (5)',
      complexBuild: 'P9 (6)',
    },
  },

  concept: {
    definition: '形如 ax² + bx + c = 0（a ≠ 0）嘅方程叫一元二次方程。',
    formula: 'x = [−b ± √(b² − 4ac)] / (2a)',
  },

  methods: {
    formula: {
      name: '求根公式（總結 P8）',
      formula: 'x = [−b ± √(b² − 4ac)] / (2a)',
      example: {
        q: '解 2x² − 3x − 2 = 0',
        work: [
          'a=2, b=−3, c=−2',
          'Δ = (−3)² − 4·2·(−2) = 9 + 16 = 25',
          'x = [3 ± 5] / 4',
          'x = 2 或 x = −1/2',
        ],
      },
    },
    discriminant: {
      name: '根的數目',
      formula: 'Δ = b² − 4ac',
      cases: [
        { cond: 'Δ > 0', result: '兩個不同的實數根' },
        { cond: 'Δ = 0', result: '一個實數根（重根）' },
        { cond: 'Δ < 0', result: '無實數根' },
      ],
    },
    build: {
      name: '由已知根建立方程',
      formula: 'x² − (α+β)x + αβ = 0',
      example: { roots: [2, 3], equation: 'x² − 5x + 6 = 0' },
    },
    vieta: {
      name: '根與係數（非基礎）',
      formulas: [
        'α + β = −b/a',
        'αβ = c/a',
        'α² + β² = (α+β)² − 2αβ',
      ],
    },
    factor: {
      name: '因式法（新思維補充步驟）',
      example: {
        q: 'x² − 5x + 6 = 0',
        work: ['(x−2)(x−3)=0', 'x=2 或 x=3'],
      },
    },
    completeSquare: {
      name: '配方法（新思維補充步驟）',
      example: {
        q: 'x² − 6x + 5 = 0',
        work: ['(x−3)² = 4', 'x=5 或 x=1'],
      },
    },
    complexOps: {
      name: '複數運算（P8 (5)）',
      powers: ['i = √(−1)', 'i² = −1', 'i³ = −i', 'i⁴ = 1'],
      conjugate: 'a+bi 嘅共軛 = a−bi',
      divisionExample: {
        q: '(3+i)/(2−i)',
        ans: '1 + i',
        work: ['×(2+i)/(2+i)', '= (6+3i+2i+i²)/(4−i²)', '= (6+5i−1)/5', '= (5+5i)/5 = 1+i'],
      },
    },
    complexBuild: {
      name: '利用複數根建方程（P9 (6)）',
      note: '實係數方程：若 a+bi 係根，則 a−bi 亦係根',
      example: {
        q: '以 2+3i 為一根，建立二次方程',
        work: [
          '另一根 = 2−3i',
          '和 = 4 · 積 = 4−(3i)² 等等 → 13',
          'x² − 4x + 13 = 0',
        ],
        equation: 'x² − 4x + 13 = 0',
      },
    },
  },

  mistakes: [
    { wrong: '求根公式分母寫 2', right: '分母一定係 2a' },
    { wrong: 'Δ = b² + 4ac', right: 'Δ = b² − 4ac' },
    { wrong: 'α+β = b/a', right: 'α+β = −b/a' },
    { wrong: '複數根得寫一個', right: '實係數方程要連共軛根一齊寫' },
  ],

  practice: {
    q: '長方形長比闊多 3 cm，面積 40 cm²。求闊。',
    setup: 'x(x+3)=40 → x²+3x−40=0',
    answer: 'x=5（負根捨）；闊 5 cm，長 8 cm',
  },
}
