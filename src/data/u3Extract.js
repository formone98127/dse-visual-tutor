/**
 * U3 指數函數與對數函數 — 由教材抽出
 *
 * 主源：牛津 4B07（指數定律）／4B08（對數定義與求值）工作紙題型
 * 公式對照：數學總結.pdf P15（定律／根式／對數性質）· P17（圖像／互為反函數）
 * 補充：新思維 A/B 冊指數對數章
 */

export const U3_EXTRACT = {
  source: {
    primary: 'oxford',
    files: [
      '牛津 4B07 Lesson Worksheet（整數指數定律）',
      '牛津 4B08 Lesson Worksheet（對數定義與求值）',
      'TB/数学总结.pdf (P15 定律／對數性質 · P17 圖像)',
    ],
  },

  concept: {
    definition: 'a^c = b ⇔ log_a b = c（同一事實兩種寫法；a>0、a≠1、b>0）。',
    why: '增長／衰減、解指數方程、換底公式都靠呢對關係。',
  },

  methods: {
    indexLaws: {
      name: '指數定律',
      laws: [
        '(a^m)^n = a^(mn)',
        'a^m · a^n = a^(m+n)',
        'a^m / a^n = a^(m−n)',
        '(ab)^n = a^n b^n',
        'a^(−n) = 1/a^n',
        'a^0 = 1',
        'ⁿ√(a^m) = a^(m/n)',
      ],
    },
    rational: {
      name: '有理指數',
      formula: 'a^(m/n) = (ⁿ√a)^m',
      example: { q: '8^(2/3)', work: ['(∛8)²', '2² = 4'] },
    },
    surd: {
      name: '根式化簡（非基礎）',
      example: {
        q: '化簡 √288',
        work: ['√(144·2) = 12√2'],
      },
      note: '加減前要化到最簡根式',
    },
    logProps: {
      name: '對數性質',
      formulas: [
        'log(MN) = log M + log N',
        'log(M/N) = log M − log N',
        'log(M^n) = n log M',
        'log_a b = log b / log a（換底）',
      ],
      domain: '真數必須 > 0；底 a>0 且 a≠1',
    },
    graphs: {
      exp: {
        form: 'y = a^x',
        points: ['過 (0,1)', 'x 軸係水平漸近線', 'y=3^x 同 y=(1/3)^x 關於 y 軸對稱'],
      },
      log: {
        form: 'y = log_a x',
        points: ['過 (1,0)', 'y 軸係垂直漸近線', '同 y=a^x 關於 y=x 對稱（互為反函數）'],
      },
    },
    equations: {
      examples: [
        { q: '2^x = 8', ans: 'x = 3' },
        { q: 'log₂ x = 3', ans: 'x = 8' },
      ],
    },
  },

  mistakes: [
    { wrong: 'log(x+y) = log x + log y', right: '只有乘積先拆成加' },
    { wrong: '對負數／0 取 log', right: '真數必須 > 0' },
    { wrong: 'a^0 = 0', right: 'a^0 = 1（a≠0）' },
  ],

  practice: {
    q: '本金 $10 000，年息 5%，複利存 3 年，期末約幾多？',
    setup: 'A = P(1+r)^n = 10000 × 1.05³',
    answer: '≈ $11 576',
  },
}
