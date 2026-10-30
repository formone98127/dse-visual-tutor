/**
 * U4 多項式的進一步認識 — 由教材抽出
 *
 * 主源：牛津 4B09（HCF/LCM、因式分解、定義域、因式定理）工作紙
 * 公式對照：數學總結.pdf P6（多項式 HCF/LCM · 有理函數運算）
 * 補充：新思維 A 冊 · 多項式／因式定理
 */

export const U4_EXTRACT = {
  source: {
    primary: 'oxford',
    files: [
      '牛津 4B09 Lesson Worksheet（HCF/LCM、因式定理）',
      'TB/数学总结.pdf (P6 多項式 HCF/LCM · 有理函數)',
    ],
  },

  concept: {
    definition: '多項式進一步：長除、餘式定理、因式定理、HCF/LCM、有理式運算。',
  },

  methods: {
    division: {
      name: '多項式長除',
      example: {
        q: '(x² + 3x + 2) ÷ (x + 1)',
        work: ['商 = x + 2', '餘 = 0（整除）'],
      },
    },
    remainder: {
      name: '餘式定理',
      formula: 'f(x) ÷ (x − a) 嘅餘數 = f(a)',
      tip: '÷(x + a) 要代 f(−a)',
      example: { q: 'f(x)=x³−2x+1，÷(x−1)', work: ['餘 = f(1)=1−2+1=0'] },
    },
    factor: {
      name: '因式定理',
      formula: 'f(a)=0 ⇔ (x−a) 係 f(x) 嘅因式',
      tip: '試可能根 ±（常數項因數）/（首項因數）',
    },
    hcfLcm: {
      name: 'HCF / LCM',
      example: {
        q: '8x²(x+1)²y⁴ · 6x²y³ · 12(x+1)³y⁴',
        hcf: '2y³',
        lcm: '24x²(x+1)³y⁴',
        rule: 'HCF 取共有最低次；LCM 取所有最高次',
      },
    },
    rational: {
      name: '有理式加減',
      example: {
        q: '10/(x²+x−6) − 2/(x−2)',
        work: [
          '10/[(x+3)(x−2)] − 2/(x−2)',
          '= [10 − 2(x+3)] / [(x+3)(x−2)]',
          '= (−2x+4)/[(x+3)(x−2)]',
          '= −2/(x+3)',
        ],
      },
    },
  },

  mistakes: [
    { wrong: '÷(x+2) 代 f(2)', right: '÷(x+2) 代 f(−2)' },
    { wrong: '長除缺項唔補 0', right: '缺項補 0xⁿ 先除' },
    { wrong: 'HCF 取最高次', right: 'HCF 取共有最低次' },
  ],
}
