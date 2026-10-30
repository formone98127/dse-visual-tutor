import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** DSE U15–U20 + M1/M2 場景（教材補齊） */

export const D3 = {
  u15: {
    concept: {
      title: "數法兩款",
      ds: 1,
      lines: [
        [
          {
            t: "有次序 → 排列",
          },
        ],
        [
          {
            t: "冇次序 → 組合",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 110,
          w: 130,
          h: 70,
          f: BLUE,
          label: "排列",
          sub: "次序有關",
        },
        {
          k: "chip",
          x: 230,
          y: 110,
          w: 130,
          h: 70,
          f: GOLD,
          label: "組合",
          sub: "次序無關",
          at: 1,
        },
      ],
    },
    rules: {
      title: "加法與乘法",
      ds: 1,
      lines: [
        [
          {
            t: "「或」相加 · 「然後」相乘",
          },
        ],
        [
          {
            t: "3×2 = 6 套",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "A 或 B → 加",
        },
        {
          k: "t",
          x: 215,
          y: 145,
          s: 22,
          text: "A 然後 B → 乘",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 26,
          text: "3 衫 × 2 褲 = 6",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    perm: {
      title: "排列 nPr",
      ds: 1,
      lines: [
        [
          {
            t: "5 人爭 3 名",
          },
        ],
        [
          {
            t: "5P3 = 60",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 22,
          text: "nPᵣ = n! / (n−r)!",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 22,
          text: "5P3 = 5×4×3",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 30,
          text: "= 60",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    comb: {
      title: "組合 nCr",
      ds: 1,
      lines: [
        [
          {
            t: "5 揀 2 一組",
          },
        ],
        [
          {
            t: "5C2 = 10",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 22,
          text: "nCᵣ = n! / [(n−r)! r!]",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 22,
          text: "5C2 = 5P2 / 2!",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 30,
          text: "= 10",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    link: {
      title: "P 同 C 關係",
      ds: 1,
      lines: [
        [
          {
            t: "nPᵣ = nCᵣ × r!",
          },
        ],
        [
          {
            t: "組合再排次序變排列",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "nPᵣ = nCᵣ × r!",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 18,
          text: "先揀人再排座位",
          f: MUTED,
          at: 1,
        },
      ],
    },
    apply: {
      title: "應用 · 委員會",
      ds: 1,
      lines: [
        [
          {
            t: "8 人揀 3 做委員",
          },
        ],
        [
          {
            t: "8C3 = 56",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "次序無關 → 組合",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 22,
          text: "8C3 = 56",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "有座位用 P · 冇座位用 C",
          },
        ],
        [
          {
            t: "唔好混用",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 18,
          text: "✗ 選隊長用組合",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 有職位分別 → 排列",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 純分組 → 組合",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U15 完成",
      ds: 1,
      lines: [
        [
          {
            t: "或加然後乘 · P · C",
          },
        ],
        [
          {
            t: "下一章：U16 概率進一步",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "nPr",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "nCr",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "次序",
          at: 2,
        },
      ],
    },
  },
  u16: {
    concept: {
      title: "概率進一步",
      ds: 1,
      lines: [
        [
          {
            t: "集合語言 + 定律",
          },
        ],
        [
          {
            t: "加法 · 乘法 · 條件",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "∪ ∩",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "加法",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "條件",
          at: 2,
        },
      ],
    },
    sets: {
      title: "集合語言",
      ds: 1,
      lines: [
        [
          {
            t: "∪ 並（或）· ∩ 交（及）",
          },
        ],
        [
          {
            t: "n(A∪B)=n(A)+n(B)−n(∩)",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "circle",
          x: 150,
          y: 140,
          r: 55,
          f: BLUE,
          fill: 1,
        },
        {
          k: "circle",
          x: 280,
          y: 140,
          r: 55,
          f: GOLD,
          fill: 1,
        },
        {
          k: "t",
          x: 215,
          y: 145,
          s: 14,
          text: "∩",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 230,
          s: 16,
          text: "要減重疊",
          f: MUTED,
          at: 2,
        },
      ],
    },
    addition: {
      title: "加法定律",
      ds: 1,
      lines: [
        [
          {
            t: "P(A∪B)=P(A)+P(B)−P(A∩B)",
          },
        ],
        [
          {
            t: "互斥就減 0",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "P(A 或 B) = P(A)+P(B)−P(兩樣)",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 22,
          text: "互斥 → 減 0",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    mult: {
      title: "乘法與條件",
      ds: 1,
      lines: [
        [
          {
            t: "獨立：直接乘",
          },
        ],
        [
          {
            t: "P(B|A)=P(A∩B)/P(A)",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 95,
          w: 160,
          h: 64,
          f: BLUE,
          label: "獨立 → 乘",
        },
        {
          k: "chip",
          x: 230,
          y: 95,
          w: 160,
          h: 64,
          f: GOLD,
          label: "P(B|A)",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 17,
          text: "「已知 A」之下 B 嘅機會",
          f: MUTED,
          at: 2,
        },
      ],
    },
    tree: {
      title: "樹形圖",
      ds: 1,
      lines: [
        [
          {
            t: "逐層乘沿支",
          },
        ],
        [
          {
            t: "同層互斥相加",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "第一層 × 第二層",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "沿支相乘 · 終點相加",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    pnc: {
      title: "排列組合計概率",
      ds: 1,
      lines: [
        [
          {
            t: "P = 有利 ÷ 全部",
          },
        ],
        [
          {
            t: "3C2 / 8C2 = 3/28",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "5 男 3 女抽 2 人全女",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 24,
          text: "P = 3C2 ÷ 8C2",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 28,
          text: "= 3/28",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "唔互斥要減重疊",
          },
        ],
        [
          {
            t: "條件概率分母係 P(A)",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 18,
          text: "✗ 唔互斥直接加",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 減 P(A∩B)",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ P(B|A) 分母 P(A)",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U16 完成",
      ds: 1,
      lines: [
        [
          {
            t: "集合 · 加法 · 條件 · 計數",
          },
        ],
        [
          {
            t: "下一章：U17 離差",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "∪",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "P(B|A)",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "樹圖",
          at: 2,
        },
      ],
    },
  },
  u17: {
    concept: {
      title: "離差概念",
      ds: 1,
      lines: [
        [
          {
            t: "平均一樣都唔夠",
          },
        ],
        [
          {
            t: "要睇數據散幾遠",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "兩組平均可以一樣",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "散佈唔同 → 離差唔同",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    range: {
      title: "分佈域",
      ds: 1,
      lines: [
        [
          {
            t: "range = 最大 − 最細",
          },
        ],
        [
          {
            t: "易俾極端值拉爆",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "range = max − min",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 18,
          text: "極端值一嚟就失真",
          f: MUTED,
          at: 1,
        },
      ],
    },
    iqr: {
      title: "四分位數間距",
      ds: 1,
      lines: [
        [
          {
            t: "IQR = Q₃ − Q₁",
          },
        ],
        [
          {
            t: "穩陣好多",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 26,
          text: "IQR = Q₃ − Q₁",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "中間一半數據嘅闊度",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "唔受極端值影響咁大",
          f: MUTED,
          at: 2,
        },
      ],
    },
    box: {
      title: "箱形圖",
      ds: 1,
      lines: [
        [
          {
            t: "五數摘要",
          },
        ],
        [
          {
            t: "min · Q₁ · 中位 · Q₃ · max",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "line",
          x1: 80,
          y1: 140,
          x2: 360,
          y2: 140,
          f: MUTED,
        },
        {
          k: "rect",
          x: 140,
          y: 110,
          width: 140,
          height: 60,
          f: BLUE,
          at: 1,
        },
        {
          k: "line",
          x1: 210,
          y1: 110,
          x2: 210,
          y2: 170,
          f: GOLD,
          w: 3,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 230,
          s: 16,
          text: "箱＝中間 50%",
          f: MUTED,
          at: 3,
        },
      ],
    },
    sd: {
      title: "標準差",
      ds: 1,
      lines: [
        [
          {
            t: "平均嚟講距離平均數幾遠",
          },
        ],
        [
          {
            t: "σ 細＝集中 · σ 大＝散",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "σ（標準差）",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "σ 細 → 集中",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 20,
          text: "σ 大 → 分散",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    apply: {
      title: "應用 · 比較",
      ds: 1,
      lines: [
        [
          {
            t: "兩班平均分一樣",
          },
        ],
        [
          {
            t: "σ 細嗰班更齊",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "甲班 σ=5 · 乙班 σ=12",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 24,
          text: "甲班成績更集中",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "淨睇平均會呃人",
          },
        ],
        [
          {
            t: "極端值先睇 IQR／箱形圖",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 18,
          text: "✗ 平均一樣＝分佈一樣",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 要再睇離差",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 極端值多用 IQR",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U17 完成",
      ds: 1,
      lines: [
        [
          {
            t: "range · IQR · 箱形圖 · σ",
          },
        ],
        [
          {
            t: "下一章：U18 統計應用",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "IQR",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "箱形",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "σ",
          at: 2,
        },
      ],
    },
  },
  u18: {
    concept: {
      title: "統計應用與誤用",
      ds: 1,
      lines: [
        [
          {
            t: "數字可以講真相",
          },
        ],
        [
          {
            t: "亦可以誤導",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "樣本 · 問法 · 圖像",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 22,
          text: "三關都要過",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    sampling: {
      title: "抽樣方法",
      ds: 1,
      lines: [
        [
          {
            t: "隨機 · 系統 · 分層",
          },
        ],
        [
          {
            t: "樣本要代表群體",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 100,
          w: 110,
          h: 64,
          f: BLUE,
          label: "隨機",
        },
        {
          k: "chip",
          x: 160,
          y: 100,
          w: 110,
          h: 64,
          f: GOLD,
          label: "系統",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 100,
          w: 110,
          h: 64,
          f: OK,
          label: "分層",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "偏咗就結論歪",
          f: MUTED,
          at: 3,
        },
      ],
    },
    abuses: {
      title: "圖像誤導",
      ds: 1,
      lines: [
        [
          {
            t: "Y 軸由 90 起跳",
          },
        ],
        [
          {
            t: "升幅睇落誇張",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "截斷縱軸",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "細變化睇落好大",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 20,
          text: "要睇刻度先信",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    questions: {
      title: "問題設計",
      ds: 1,
      lines: [
        [
          {
            t: "引導性問題會偏答案",
          },
        ],
        [
          {
            t: "用字要中性",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "「你同唔同意……好明顯……」",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 22,
          text: "引導 → 結果不可靠",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    assess: {
      title: "評估三問",
      ds: 1,
      lines: [
        [
          {
            t: "樣本邊嚟？",
          },
        ],
        [
          {
            t: "點問？圖點畫？",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 22,
          text: "① 樣本代表性",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 22,
          text: "② 問題中性",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 190,
          s: 22,
          text: "③ 圖像誠實",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 18,
          text: "三關過先可信",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    mistakes: {
      title: "常犯錯誤",
      ds: 1,
      lines: [
        [
          {
            t: "網上自願調查好易偏",
          },
        ],
        [
          {
            t: "相關唔等於因果",
            fill: MUTED,
            b: false,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 18,
          text: "✗ 自願填表＝全民意見",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 樣本可能好偏",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 相關 ≠ 因果",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U18 完成",
      ds: 1,
      lines: [
        [
          {
            t: "抽樣 · 誤導 · 評估",
          },
        ],
        [
          {
            t: "下一章：U19 進一步應用",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "抽樣",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "圖像",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "評估",
          at: 2,
        },
      ],
    },
  },
  u19: {
    concept: {
      title: "進一步應用",
      ds: 1,
      lines: [
        [
          {
            t: "跨單元解決現實問題",
          },
        ],
        [
          {
            t: "建模 → 計算 → 驗證",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "一次過用多個工具",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 20,
          text: "方程 · 統計 · 三角 …",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    model: {
      title: "建模四步",
      ds: 1,
      lines: [
        [
          {
            t: "理解 → 設未知數",
          },
        ],
        [
          {
            t: "列式 → 解 → 驗",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 100,
          w: 90,
          h: 64,
          f: BLUE,
          label: "1 理解",
        },
        {
          k: "chip",
          x: 140,
          y: 100,
          w: 90,
          h: 64,
          f: GOLD,
          label: "2 列式",
          at: 1,
        },
        {
          k: "chip",
          x: 240,
          y: 100,
          w: 90,
          h: 64,
          f: OK,
          label: "3 計算",
          at: 2,
        },
        {
          k: "chip",
          x: 340,
          y: 100,
          w: 70,
          h: 64,
          f: RED,
          label: "4 驗",
          at: 3,
        },
      ],
    },
    example: {
      title: "例 · 圍欄最大面積",
      ds: 1,
      lines: [
        [
          {
            t: "用二次函數極值",
          },
        ],
        [
          {
            t: "U2 工具再出場",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "圍欄固定 → A(x) 二次",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "頂點公式搵最大",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 22,
          text: "答要連單位同驗合理性",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    mix: {
      title: "例 · 三角 + 畢氏",
      ds: 1,
      lines: [
        [
          {
            t: "立體先拆平面",
          },
        ],
        [
          {
            t: "再拼返答案",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "3D → 畫直角三角形",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "正弦／畢氏逐段",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 18,
          text: "見 Q18 完整示範",
          f: MUTED,
          at: 2,
        },
      ],
    },
    checklist: {
      title: "交卷前檢查",
      ds: 1,
      lines: [
        [
          {
            t: "單位 · 範圍 · 代返驗",
          },
        ],
        [
          {
            t: "文字題答全句",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 20,
          text: "① 單位啱未",
        },
        {
          k: "t",
          x: 215,
          y: 130,
          s: 20,
          text: "② 根喺定義域？",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 180,
          s: 20,
          text: "③ 代返原式",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 240,
          s: 20,
          text: "④ 答題格式",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    summary: {
      title: "U19 完成",
      ds: 1,
      lines: [
        [
          {
            t: "建模 · 綜合 · 檢查",
          },
        ],
        [
          {
            t: "下一章：U20 探究",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 110,
          w: 130,
          h: 70,
          f: BLUE,
          label: "建模",
        },
        {
          k: "chip",
          x: 230,
          y: 110,
          w: 130,
          h: 70,
          f: GOLD,
          label: "綜合",
          at: 1,
        },
      ],
    },
  },
  u20: {
    concept: {
      title: "探究與調查",
      ds: 1,
      lines: [
        [
          {
            t: "自己問 · 自己試",
          },
        ],
        [
          {
            t: "用晒學過嘅工具",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "問題 → 探索 → 結論",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 18,
          text: "錯咗就調整再嚟",
          f: MUTED,
          at: 1,
        },
      ],
    },
    steps: {
      title: "探究四步",
      ds: 1,
      lines: [
        [
          {
            t: "問問題 · 作假設",
          },
        ],
        [
          {
            t: "收集／計算 · 結論",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 100,
          w: 90,
          h: 64,
          f: BLUE,
          label: "問",
        },
        {
          k: "chip",
          x: 140,
          y: 100,
          w: 90,
          h: 64,
          f: GOLD,
          label: "假設",
          at: 1,
        },
        {
          k: "chip",
          x: 240,
          y: 100,
          w: 90,
          h: 64,
          f: OK,
          label: "試",
          at: 2,
        },
        {
          k: "chip",
          x: 340,
          y: 100,
          w: 70,
          h: 64,
          f: RED,
          label: "結",
          at: 3,
        },
      ],
    },
    tools: {
      title: "可用工具",
      ds: 1,
      lines: [
        [
          {
            t: "圖像 · 方程 · 統計 · 三角",
          },
        ],
        [
          {
            t: "揀啱武器",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "唔使全部用",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "揀最直接嗰套",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    report: {
      title: "點寫報告",
      ds: 1,
      lines: [
        [
          {
            t: "過程比答案更重要",
          },
        ],
        [
          {
            t: "講清楚假設同限制",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 20,
          text: "① 題目同假設",
        },
        {
          k: "t",
          x: 215,
          y: 130,
          s: 20,
          text: "② 方法同計算",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 180,
          s: 20,
          text: "③ 結果同解釋",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 240,
          s: 20,
          text: "④ 局限／改進",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    summary: {
      title: "U20 完成",
      ds: 1,
      lines: [
        [
          {
            t: "DSE 必修 20 章行完",
          },
        ],
        [
          {
            t: "可選修：M1／M2",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 110,
          w: 130,
          h: 70,
          f: BLUE,
          label: "必修✓",
        },
        {
          k: "chip",
          x: 230,
          y: 110,
          w: 130,
          h: 70,
          f: GOLD,
          label: "M1/M2",
          at: 1,
        },
      ],
    },
  },
  m1: {
    concept: {
      title: "M1 微積分與統計",
      ds: 1,
      lines: [
        [
          {
            t: "延伸部分",
          },
        ],
        [
          {
            t: "二項式 · eˣ · 微分 · 積分",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "二項",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "微分",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "積分",
          at: 2,
        },
      ],
    },
    binomial: {
      title: "二項式展開",
      ds: 1,
      lines: [
        [
          {
            t: "Tᵣ₊₁ = nCᵣ aⁿ⁻ʳ bʳ",
          },
        ],
        [
          {
            t: "逐項計係數",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "(a+b)ⁿ 通項",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "Tᵣ₊₁ = nCᵣ aⁿ⁻ʳ bʳ",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    explog: {
      title: "e 與 ln",
      ds: 1,
      lines: [
        [
          {
            t: "e ≈ 2.718",
          },
        ],
        [
          {
            t: "連續增長 A = Pe^(rt)",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "ln = log_e",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "A = Pe^(rt)",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 18,
          text: "連續複利模型",
          f: MUTED,
          at: 2,
        },
      ],
    },
    diff: {
      title: "微分",
      ds: 1,
      lines: [
        [
          {
            t: "d/dx xⁿ = n xⁿ⁻¹",
          },
        ],
        [
          {
            t: "f′=0 搵平位（極值）",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 24,
          text: "d/dx xⁿ = n xⁿ⁻¹",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 20,
          text: "導數 = 該點斜率",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 22,
          text: "f′=0 → 候選極值",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    int: {
      title: "積分",
      ds: 1,
      lines: [
        [
          {
            t: "∫ xⁿ dx = xⁿ⁺¹/(n+1)+C",
          },
        ],
        [
          {
            t: "曲線下面積",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "∫ xⁿ dx = xⁿ⁺¹/(n+1)+C",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 20,
          text: "定積分 = 淨面積",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    apply: {
      title: "應用 · 極值",
      ds: 1,
      lines: [
        [
          {
            t: "設 A(x) · 求 A′=0",
          },
        ],
        [
          {
            t: "再驗最大／最小",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 20,
          text: "建模 → 微分 → 檢驗",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 22,
          text: "現實限制都要查",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    summary: {
      title: "M1 完成",
      ds: 1,
      lines: [
        [
          {
            t: "二項 · eˣ · 微分 · 積分",
          },
        ],
        [
          {
            t: "下一選修：M2",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 110,
          w: 130,
          h: 70,
          f: BLUE,
          label: "微分",
        },
        {
          k: "chip",
          x: 230,
          y: 110,
          w: 130,
          h: 70,
          f: GOLD,
          label: "積分",
          at: 1,
        },
      ],
    },
  },
  m2: {
    concept: {
      title: "M2 代數與微積分",
      ds: 1,
      lines: [
        [
          {
            t: "歸納 · 級數 · 極限",
          },
        ],
        [
          {
            t: "矩陣 · 向量",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 40,
          y: 110,
          w: 110,
          h: 70,
          f: BLUE,
          label: "歸納",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "極限",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "向量",
          at: 2,
        },
      ],
    },
    induction: {
      title: "數學歸納法",
      ds: 1,
      lines: [
        [
          {
            t: "n=1 成立",
          },
        ],
        [
          {
            t: "假設 n=k → 推 n=k+1",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 80,
          s: 22,
          text: "① 基礎步驟",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 22,
          text: "② 歸納假設",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 190,
          s: 22,
          text: "③ 推下一步",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 18,
          text: "好似骨牌全倒",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    binomial: {
      title: "二項式（任意 n）",
      ds: 1,
      lines: [
        [
          {
            t: "(1+x)ⁿ 無限級數",
          },
        ],
        [
          {
            t: "|x|<1 先收斂",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "(1+x)ⁿ = 1 + nx + …",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 20,
          text: "要 |x|<1",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    limit: {
      title: "極限",
      ds: 1,
      lines: [
        [
          {
            t: "lim sinx/x = 1",
          },
        ],
        [
          {
            t: "趨近但可以唔等於",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "lim (sin x)/x = 1",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 18,
          text: "微積分地基",
          f: MUTED,
          at: 1,
        },
      ],
    },
    matrix: {
      title: "矩陣",
      ds: 1,
      lines: [
        [
          {
            t: "數字表格 · 行乘列",
          },
        ],
        [
          {
            t: "注意 AB ≠ BA",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 24,
          text: "矩陣乘法",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "AB 未必 = BA",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    vector: {
      title: "向量",
      ds: 1,
      lines: [
        [
          {
            t: "有方向有長度",
          },
        ],
        [
          {
            t: "加減頭尾接 · 點積出角",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 90,
          s: 22,
          text: "a · b = |a||b| cos θ",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 20,
          text: "垂直 → 點積 0",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    summary: {
      title: "M2 完成",
      ds: 1,
      lines: [
        [
          {
            t: "全課程工具箱齊",
          },
        ],
        [
          {
            t: "PRE-DSE + DSE + 延伸",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 110,
          w: 130,
          h: 70,
          f: BLUE,
          label: "完成",
        },
        {
          k: "chip",
          x: 230,
          y: 110,
          w: 130,
          h: 70,
          f: GOLD,
          label: "加油",
          at: 1,
        },
      ],
    },
  },
}
