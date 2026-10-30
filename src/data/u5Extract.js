/**
 * U5 方程的進一步認識 — 由教材抽出
 *
 * 主源：數學總結.pdf P10「二元二次方程組」
 * 補充：新思維 A/B 冊聯立／可化二次；牛津 5B06 應用重溫
 */

export const U5_EXTRACT = {
  source: {
    primary: 'xinsiwei',
    files: [
      'TB/数学总结.pdf (P10 二元二次方程組 · 交點個數)',
      '牛津 5B06（聯立／應用重溫）',
    ],
  },

  methods: {
    substitute: {
      name: '代入消元',
      example: {
        system: ['y = x² − 5x − 32', 'y = 10 − 6x'],
        steps: [
          '兩式 y 相等：x² − 5x − 32 = 10 − 6x',
          '整理成 Ax²+Bx+C=0',
          '求根公式解 x',
          '代返其中一式搵 y',
        ],
      },
    },
    discriminant: {
      name: 'Δ 定交點個數',
      formula: '消元後 Δ = B² − 4AC',
      cases: [
        { cond: 'Δ > 0', result: '兩個交點' },
        { cond: 'Δ = 0', result: '一個交點（相切）' },
        { cond: 'Δ < 0', result: '無交點' },
        { cond: '有交點', result: 'Δ ≥ 0' },
      ],
      tip: '圓嘅切線：代入後 Δ = 0',
    },
    reduce: {
      name: '換元化二次',
      example: {
        q: 'x⁴ − 5x² + 4 = 0',
        work: ['設 y = x²', 'y² − 5y + 4 = 0', 'y=1 或 4', 'x=±1 或 ±2'],
      },
    },
  },

  mistakes: [
    { wrong: '換元後答 y 就停', right: '一定還原 x（開方記得 ±）' },
    { wrong: '「有交點」只寫 Δ>0', right: '有交點包含相切 → Δ≥0' },
  ],
}
