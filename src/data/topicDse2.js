import { GOLD, BLUE, OK, RED, MUTED } from '../lib/palette.js'

/** DSE U8–U14 場景（教材補齊） */

export const D2 = {
  u8: {
    concept: {
      title: "不等式入門",
      ds: 1,
      lines: [
        [
          {
            t: "解唔係一點 · 係一段範圍",
          },
        ],
        [
          {
            t: "用數線標清楚",
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
          text: "x > 2",
        },
        {
          k: "line",
          x1: 70,
          y1: 160,
          x2: 360,
          y2: 160,
          at: 1,
        },
        {
          k: "arrow",
          x1: 200,
          y1: 160,
          x2: 350,
          y2: 160,
          f: GOLD,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "空心點 = 唔包等號",
          f: MUTED,
          at: 2,
        },
      ],
    },
    compound: {
      title: "複合不等式",
      ds: 1,
      lines: [
        [
          {
            t: "−1 < x ≤ 4：兩邊夾住",
          },
        ],
        [
          {
            t: "「及」要同時成立",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "line",
          x1: 70,
          y1: 140,
          x2: 360,
          y2: 140,
        },
        {
          k: "circle",
          x: 120,
          y: 140,
          r: 8,
          f: BLUE,
          at: 1,
        },
        {
          k: "rect",
          x: 120,
          y: 128,
          width: 180,
          height: 24,
          f: OK,
          fill: 1,
          at: 1,
        },
        {
          k: "t",
          x: 120,
          y: 190,
          s: 15,
          text: "−1",
          f: BLUE,
          at: 1,
        },
        {
          k: "t",
          x: 300,
          y: 190,
          s: 15,
          text: "4（包）",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    quadratic: {
      title: "二次不等式",
      ds: 1,
      lines: [
        [
          {
            t: "x²−3x+2 > 0",
          },
        ],
        [
          {
            t: "x < 1 或 x > 2",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "path",
          d: "M 90 70 Q 215 272 340 70",
          f: BLUE,
          w: 3,
        },
        {
          k: "dot",
          x: 148,
          y: 178,
          r: 6,
          f: GOLD,
          label: "1",
          at: 1,
        },
        {
          k: "dot",
          x: 282,
          y: 178,
          r: 6,
          f: GOLD,
          label: "2",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 22,
          text: "x < 1 或 x > 2",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    two_var: {
      title: "二元線性不等式",
      ds: 1,
      lines: [
        [
          {
            t: "y > x + 1 = 上半邊",
          },
        ],
        [
          {
            t: "畫線 → 試點決定影邊",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "line",
          x1: 80,
          y1: 200,
          x2: 360,
          y2: 70,
          f: BLUE,
          w: 2.6,
        },
        {
          k: "dot",
          x: 140,
          y: 90,
          r: 6,
          f: OK,
          label: "(0,2)",
          at: 1,
        },
        {
          k: "t",
          x: 300,
          y: 200,
          s: 16,
          text: "上半影 = 解",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    lp: {
      title: "線性規劃",
      ds: 1,
      lines: [
        [
          {
            t: "限制重疊 = 可行域",
          },
        ],
        [
          {
            t: "最大／最細喺頂點",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "path",
          d: "M 100 200 L 100 110 L 210 70 L 300 200 Z",
          f: BLUE,
          w: 2.4,
          fill: 1,
          at: 1,
        },
        {
          k: "t",
          x: 200,
          y: 145,
          s: 15,
          text: "可行域",
          f: BLUE,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 17,
          text: "目標函數喺角位試",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    apply: {
      title: "應用 · 可行域頂點",
      ds: 1,
      lines: [
        [
          {
            t: "利潤 P = 3x + 2y",
          },
        ],
        [
          {
            t: "試晒頂點揀最大",
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
          text: "頂點 A、B、C",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 20,
          text: "逐點計 P",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 24,
          text: "最大利潤喺某頂點",
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
            t: "乘負數要反轉不等式",
          },
        ],
        [
          {
            t: "二次：根之外定方向",
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
          text: "✗ −2x > 4 → x > −2",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 除負：變 x < −2",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 二次先求根再睇圖",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U8 完成",
      ds: 1,
      lines: [
        [
          {
            t: "複合 · 二次 · 半平面 · 規劃",
          },
        ],
        [
          {
            t: "下一章：U9 函數圖像進一步",
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
          label: "複合",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "半平面",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "頂點",
          at: 2,
        },
      ],
    },
  },
  u9: {
    sketch: {
      title: "各類函數圖像",
      ds: 1,
      lines: [
        [
          {
            t: "直線 · 拋物線 · 反比",
          },
        ],
        [
          {
            t: "認形狀就識畫",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "line",
          x1: 60,
          y1: 190,
          x2: 150,
          y2: 80,
          f: BLUE,
          w: 2.6,
        },
        {
          k: "path",
          d: "M 170 220 Q 230 60 290 220",
          f: GOLD,
          w: 2.6,
          at: 1,
        },
        {
          k: "path",
          d: "M 310 80 Q 340 190 390 210",
          f: OK,
          w: 2.6,
          at: 2,
        },
        {
          k: "t",
          x: 105,
          y: 60,
          s: 14,
          text: "直線",
          f: BLUE,
        },
        {
          k: "t",
          x: 230,
          y: 50,
          s: 14,
          text: "拋物線",
          f: GOLD,
          at: 1,
        },
        {
          k: "t",
          x: 350,
          y: 60,
          s: 14,
          text: "反比",
          f: OK,
          at: 2,
        },
      ],
    },
    eqk: {
      title: "圖解 f(x) = k",
      ds: 1,
      lines: [
        [
          {
            t: "畫 y = f(x) 同水平線 y = k",
          },
        ],
        [
          {
            t: "交點嘅 x 就係根",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "path",
          d: "M 80 210 Q 215 60 350 210",
          f: BLUE,
          w: 3,
        },
        {
          k: "line",
          x1: 60,
          y1: 130,
          x2: 370,
          y2: 130,
          f: GOLD,
          w: 2.2,
          dash: "6 5",
          at: 1,
        },
        {
          k: "dot",
          x: 130,
          y: 130,
          r: 6,
          f: OK,
          at: 2,
        },
        {
          k: "dot",
          x: 300,
          y: 130,
          r: 6,
          f: OK,
          at: 2,
        },
      ],
    },
    ineq: {
      title: "圖解 f(x) > k",
      ds: 1,
      lines: [
        [
          {
            t: "曲線高過水平線嗰段",
          },
        ],
        [
          {
            t: "讀出 x 範圍",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "path",
          d: "M 80 210 Q 215 60 350 210",
          f: BLUE,
          w: 3,
        },
        {
          k: "line",
          x1: 60,
          y1: 130,
          x2: 370,
          y2: 130,
          f: GOLD,
          dash: "6 5",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 240,
          s: 20,
          text: "中間高過 k → 中間段",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    translate: {
      title: "平移變換",
      ds: 1,
      lines: [
        [
          {
            t: "f(x−h) 右移 · f(x)+k 上移",
          },
        ],
        [
          {
            t: "總結 P11",
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
          w: 110,
          h: 64,
          f: BLUE,
          label: "f(x−h)",
          sub: "右移 h",
        },
        {
          k: "chip",
          x: 160,
          y: 95,
          w: 110,
          h: 64,
          f: GOLD,
          label: "f(x+h)",
          sub: "左移 h",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 95,
          w: 110,
          h: 64,
          f: OK,
          label: "f(x)+k",
          sub: "上移 k",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 18,
          text: "f(x)−k → 下移 k",
          f: MUTED,
          at: 3,
        },
      ],
    },
    reflect: {
      title: "反射變換",
      ds: 1,
      lines: [
        [
          {
            t: "f(−x) 左右翻 · −f(x) 上下翻",
          },
        ],
        [
          {
            t: "關於軸對稱",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 70,
          y: 100,
          w: 130,
          h: 70,
          f: BLUE,
          label: "y=f(−x)",
          sub: "對 y 軸",
        },
        {
          k: "chip",
          x: 230,
          y: 100,
          w: 130,
          h: 70,
          f: GOLD,
          label: "y=−f(x)",
          sub: "對 x 軸",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 230,
          s: 17,
          text: "總結 P11 反射",
          f: MUTED,
          at: 2,
        },
      ],
    },
    stretch: {
      title: "放大縮小",
      ds: 1,
      lines: [
        [
          {
            t: "f(2x) 左右壓 · 2f(x) 上下拉",
          },
        ],
        [
          {
            t: "常用於三角",
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
          label: "f(2x)",
          sub: "水平壓",
        },
        {
          k: "chip",
          x: 160,
          y: 100,
          w: 110,
          h: 64,
          f: GOLD,
          label: "f(x/2)",
          sub: "水平拉",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 100,
          w: 110,
          h: 64,
          f: OK,
          label: "2f(x)",
          sub: "垂直拉",
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
            t: "f(x−2) 係右移唔係左",
          },
        ],
        [
          {
            t: "代入法核對更穩",
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
          text: "✗ f(x−2) 當左移",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ f(x−2) 右移 2",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 用代數代入核對",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U9 完成",
      ds: 1,
      lines: [
        [
          {
            t: "素描 · 圖解 · 四種變換",
          },
        ],
        [
          {
            t: "下一章：U10 直線方程",
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
          label: "圖解",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "平移",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "反射",
          at: 2,
        },
      ],
    },
  },
  u10: {
    concept: {
      title: "直線方程",
      ds: 1,
      lines: [
        [
          {
            t: "斜率 m · 截距 c",
          },
        ],
        [
          {
            t: "y = mx + c",
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
          s: 28,
          text: "y = mx + c",
        },
        {
          k: "chip",
          x: 70,
          y: 150,
          w: 120,
          h: 64,
          f: BLUE,
          label: "m",
          sub: "斜率",
          at: 1,
        },
        {
          k: "chip",
          x: 230,
          y: 150,
          w: 120,
          h: 64,
          f: GOLD,
          label: "c",
          sub: "y 截距",
          at: 1,
        },
      ],
    },
    forms: {
      title: "三種寫法",
      ds: 1,
      lines: [
        [
          {
            t: "斜截 · 點斜 · 一般式",
          },
        ],
        [
          {
            t: "隨時互轉",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 75,
          s: 20,
          text: "y = mx + c",
          f: BLUE,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 20,
          text: "y − y₁ = m(x − x₁)",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 20,
          text: "Ax + By + C = 0",
          f: GOLD,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 235,
          s: 16,
          text: "一般式斜率 = −A/B",
          f: MUTED,
          at: 3,
        },
      ],
    },
    slope: {
      title: "求斜率與截距",
      ds: 1,
      lines: [
        [
          {
            t: "兩點：m = (y₂−y₁)/(x₂−x₁)",
          },
        ],
        [
          {
            t: "代 x=0／y=0 搵截距",
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
          text: "過 (1,2) 同 (3,8)",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 22,
          text: "m = (8−2)/(3−1) = 3",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 26,
          text: "y − 2 = 3(x − 1)",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    parallel: {
      title: "平行與垂直",
      ds: 1,
      lines: [
        [
          {
            t: "平行：m₁ = m₂",
          },
        ],
        [
          {
            t: "垂直：m₁·m₂ = −1",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "chip",
          x: 55,
          y: 100,
          w: 140,
          h: 70,
          f: BLUE,
          label: "平行",
          sub: "m 相同",
        },
        {
          k: "chip",
          x: 235,
          y: 100,
          w: 140,
          h: 70,
          f: GOLD,
          label: "垂直",
          sub: "積 = −1",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 230,
          s: 17,
          text: "數學總結 P34",
          f: MUTED,
          at: 2,
        },
      ],
    },
    intersect: {
      title: "兩線交點",
      ds: 1,
      lines: [
        [
          {
            t: "聯立兩條直線方程",
          },
        ],
        [
          {
            t: "解出 (x, y)",
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
          text: "y = 2x + 1",
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 20,
          text: "y = −x + 4",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 175,
          s: 20,
          text: "2x+1 = −x+4 → x=1",
          f: BLUE,
          w: 700,
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 235,
          s: 28,
          text: "交點 (1, 3)",
          f: GOLD,
          w: 700,
          at: 3,
        },
      ],
    },
    distance: {
      title: "點到直線距離",
      ds: 1,
      lines: [
        [
          {
            t: "d = |Ax₁+By₁+C| / √(A²+B²)",
          },
        ],
        [
          {
            t: "牛津 5B08",
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
          text: "點到 Ax+By+C=0",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 22,
          text: "d = |…| / √(A²+B²)",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "課程範圍外公式 · 常考",
          f: MUTED,
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
            t: "垂直係積 −1 唔係互為負",
          },
        ],
        [
          {
            t: "一般式斜率 −A/B",
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
          text: "✗ 垂直：m₂ = −m₁",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 垂直：m₁·m₂ = −1",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 斜率 = −A/B",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U10 完成",
      ds: 1,
      lines: [
        [
          {
            t: "三寫法 · 平行垂直 · 交點",
          },
        ],
        [
          {
            t: "下一章：U11 圓的基本性質",
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
          label: "y=mx+c",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "⊥",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "交點",
          at: 2,
        },
      ],
    },
  },
  u11: {
    concept: {
      title: "圓的基本性質",
      ds: 1,
      lines: [
        [
          {
            t: "弦 · 弧 · 角 · 切線",
          },
        ],
        [
          {
            t: "幾何證明大熱門",
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
          label: "弦弧",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "圓角",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "切線",
          at: 2,
        },
      ],
    },
    chords: {
      title: "弦與弧",
      ds: 1,
      lines: [
        [
          {
            t: "垂直弦嘅直徑平分弦",
          },
        ],
        [
          {
            t: "等弦對等弧",
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
          text: "直徑 ⊥ 弦 → 平分弦",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 22,
          text: "等弦 → 等弧",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "反之亦然",
          f: MUTED,
          at: 2,
        },
      ],
    },
    angles: {
      title: "圓角性質",
      ds: 1,
      lines: [
        [
          {
            t: "圓心角 = 2 × 圓周角",
          },
        ],
        [
          {
            t: "半圓圓周角 = 90°",
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
          text: "同弧：圓心角 = 2×圓周角",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 20,
          text: "同弧圓周角相等",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 24,
          text: "半圓上 ∠ = 90°",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    cyclic: {
      title: "圓內接四邊形",
      ds: 1,
      lines: [
        [
          {
            t: "對角互補",
          },
        ],
        [
          {
            t: "外角 = 內對角",
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
          text: "∠A + ∠C = 180°",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 24,
          text: "外角 = 內對角",
          f: GOLD,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "證明四點共圓常用",
          f: MUTED,
          at: 2,
        },
      ],
    },
    tangents: {
      title: "切線性質",
      ds: 1,
      lines: [
        [
          {
            t: "切線 ⊥ 半徑（過切點）",
          },
        ],
        [
          {
            t: "弦切角 = 交錯弓形角",
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
          text: "切線 ⊥ 半徑",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "由外點兩切線等長",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 22,
          text: "弦切角 = 交錯圓周角",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    concyclic: {
      title: "共圓檢驗",
      ds: 1,
      lines: [
        [
          {
            t: "同弓形圓周角相等",
          },
        ],
        [
          {
            t: "或對角互補",
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
          text: "四點共圓？",
        },
        {
          k: "t",
          x: 215,
          y: 150,
          s: 20,
          text: "對角互補 → 共圓",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 215,
          s: 20,
          text: "同弧圓周角相等 → 共圓",
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
            t: "圓心角唔係圓周角",
          },
        ],
        [
          {
            t: "切線一定過切點先 ⊥",
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
          text: "✗ 當圓心角=圓周角",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 圓心角 = 2×圓周角",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 半徑 ⊥ 切線（切點）",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U11 完成",
      ds: 1,
      lines: [
        [
          {
            t: "弦 · 角 · 內接 · 切線 · 共圓",
          },
        ],
        [
          {
            t: "下一章：U12 軌跡",
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
          label: "圓角",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "切線",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "共圓",
          at: 2,
        },
      ],
    },
  },
  u12: {
    concept: {
      title: "乜嘢係軌跡",
      ds: 1,
      lines: [
        [
          {
            t: "符合條件嘅所有點行出嚟嘅路",
          },
        ],
        [
          {
            t: "先描述再寫方程",
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
          text: "條件 → 路徑",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "例如：同定點等距 → 圓",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "數學總結 P35",
          f: MUTED,
          at: 2,
        },
      ],
    },
    circle: {
      title: "定距一點",
      ds: 1,
      lines: [
        [
          {
            t: "距定點 (x₁,y₁) 固定 r",
          },
        ],
        [
          {
            t: "軌跡：圓",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "circle",
          x: 215,
          y: 140,
          r: 70,
          f: BLUE,
        },
        {
          k: "dot",
          x: 215,
          y: 140,
          r: 5,
          f: GOLD,
          label: "中心",
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 18,
          text: "半徑 = r",
          f: MUTED,
          at: 2,
        },
      ],
    },
    perp: {
      title: "等距兩點",
      ds: 1,
      lines: [
        [
          {
            t: "距 A、B 相等",
          },
        ],
        [
          {
            t: "軌跡：AB 垂直平分線",
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
          text: "PA = PB",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 24,
          text: "→ AB 嘅垂直平分線",
          f: GOLD,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "總結 P35 第 2 款",
          f: MUTED,
          at: 2,
        },
      ],
    },
    angle: {
      title: "等距兩線",
      ds: 1,
      lines: [
        [
          {
            t: "距兩相交線相等",
          },
        ],
        [
          {
            t: "軌跡：角平分線（兩條）",
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
          text: "距 L₁ = 距 L₂",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 24,
          text: "→ 兩條角平分線",
          f: GOLD,
          w: 700,
          at: 1,
        },
      ],
    },
    algebra: {
      title: "代數求方程",
      ds: 1,
      lines: [
        [
          {
            t: "設點 (x,y) 寫條件",
          },
        ],
        [
          {
            t: "展開化簡",
            fill: GOLD,
            b: true,
          },
        ],
      ],
      art: [
        {
          k: "t",
          x: 215,
          y: 75,
          s: 20,
          text: "例：距 (0,0)=(4,0) 相等",
        },
        {
          k: "t",
          x: 215,
          y: 125,
          s: 20,
          text: "√(x²+y²)=√((x−4)²+y²)",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 180,
          s: 20,
          text: "平方：x² = (x−4)²",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 240,
          s: 28,
          text: "x = 2",
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
            t: "開方方程要平方記得驗",
          },
        ],
        [
          {
            t: "先認形再寫式",
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
          text: "✗ 平方後唔驗根",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 代返原條件檢查",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 先講「係乜路徑」",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U12 完成",
      ds: 1,
      lines: [
        [
          {
            t: "圓 · 垂平分 · 角平分 · 方程",
          },
        ],
        [
          {
            t: "下一章：U13 圓的方程",
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
          label: "圓",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "垂平分",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "方程",
          at: 2,
        },
      ],
    },
  },
  u13: {
    concept: {
      title: "圓的方程",
      ds: 1,
      lines: [
        [
          {
            t: "圓心 + 半徑",
          },
        ],
        [
          {
            t: "(x−a)²+(y−b)² = r²",
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
          text: "(x−a)² + (y−b)² = r²",
        },
        {
          k: "t",
          x: 215,
          y: 160,
          s: 20,
          text: "圓心 (a,b) · 半徑 r",
          f: BLUE,
          w: 700,
          at: 1,
        },
      ],
    },
    general: {
      title: "一般式",
      ds: 1,
      lines: [
        [
          {
            t: "x²+y²+Dx+Ey+F=0",
          },
        ],
        [
          {
            t: "配方搵圓心半徑",
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
          text: "x²+y²+Dx+Ey+F=0",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 20,
          text: "圓心 (−D/2, −E/2)",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 195,
          s: 20,
          text: "r² = (D/2)²+(E/2)²−F",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 250,
          s: 16,
          text: "r²>0 先係圓",
          f: MUTED,
          at: 3,
        },
      ],
    },
    convert: {
      title: "標準 ↔ 一般",
      ds: 1,
      lines: [
        [
          {
            t: "展開或配方",
          },
        ],
        [
          {
            t: "兩邊等價",
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
          text: "(x−2)²+(y+1)²=9",
        },
        {
          k: "t",
          x: 215,
          y: 135,
          s: 18,
          text: "展開：x²−4x+4+y²+2y+1=9",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 195,
          s: 20,
          text: "x²+y²−4x+2y−4=0",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    intersect: {
      title: "直線與圓",
      ds: 1,
      lines: [
        [
          {
            t: "圓心到線距離 d",
          },
        ],
        [
          {
            t: "d?r 決定關係",
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
          w: 110,
          h: 70,
          f: OK,
          label: "d < r",
          sub: "相交兩點",
        },
        {
          k: "chip",
          x: 160,
          y: 95,
          w: 110,
          h: 70,
          f: BLUE,
          label: "d = r",
          sub: "相切",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 95,
          w: 110,
          h: 70,
          f: RED,
          label: "d > r",
          sub: "相離",
          at: 2,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "代入消元睇 Δ 亦可",
          f: MUTED,
          at: 3,
        },
      ],
    },
    apply: {
      title: "應用 · 搵圓",
      ds: 1,
      lines: [
        [
          {
            t: "圓心 (1,2) 過 (4,6)",
          },
        ],
        [
          {
            t: "r = 5",
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
          text: "r = √[(4−1)²+(6−2)²]",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 22,
          text: "= √(9+16) = 5",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 24,
          text: "(x−1)²+(y−2)²=25",
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
            t: "一般式圓心係負一半",
          },
        ],
        [
          {
            t: "r² 要 > 0",
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
          text: "✗ 圓心當 (D/2,E/2)",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 圓心 (−D/2,−E/2)",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 先確認 r²>0",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U13 完成",
      ds: 1,
      lines: [
        [
          {
            t: "標準式 · 一般式 · 線圓關係",
          },
        ],
        [
          {
            t: "下一章：U14 三角進一步",
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
          label: "標準",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "一般",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "d?r",
          at: 2,
        },
      ],
    },
  },
  u14: {
    concept: {
      title: "三角進一步",
      ds: 1,
      lines: [
        [
          {
            t: "任意三角形工具",
          },
        ],
        [
          {
            t: "正弦 · 餘弦 · 面積",
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
          label: "正弦",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "餘弦",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "面積",
          at: 2,
        },
      ],
    },
    sine: {
      title: "正弦公式",
      ds: 1,
      lines: [
        [
          {
            t: "a/sinA = b/sinB = c/sinC",
          },
        ],
        [
          {
            t: "知兩角一邊／兩邊一对角",
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
          text: "a / sin A = b / sin B",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "= c / sin C = 2R",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "注意：SSA 可能兩解",
          f: MUTED,
          at: 2,
        },
      ],
    },
    cosine: {
      title: "餘弦公式",
      ds: 1,
      lines: [
        [
          {
            t: "c² = a²+b²−2ab·cosC",
          },
        ],
        [
          {
            t: "知三邊或兩邊夾角",
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
          text: "c² = a² + b² − 2ab cos C",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "亦可反求角：cos C = …",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 220,
          s: 17,
          text: "直角時變畢氏",
          f: MUTED,
          at: 2,
        },
      ],
    },
    area: {
      title: "面積公式",
      ds: 1,
      lines: [
        [
          {
            t: "A = ½ab sin C",
          },
        ],
        [
          {
            t: "希羅：√[s(s−a)(s−b)(s−c)]",
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
          text: "A = ½ ab sin C",
        },
        {
          k: "t",
          x: 215,
          y: 145,
          s: 20,
          text: "s = (a+b+c)/2",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 210,
          s: 20,
          text: "A = √[s(s−a)(s−b)(s−c)]",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    equations: {
      title: "三角方程",
      ds: 1,
      lines: [
        [
          {
            t: "sin θ = ½",
          },
        ],
        [
          {
            t: "θ = 30° 或 150°（0–360）",
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
          text: "sin θ = 1/2",
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 20,
          text: "參考角 30°",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 26,
          text: "θ = 30° 或 150°",
          f: GOLD,
          w: 700,
          at: 2,
        },
      ],
    },
    projection: {
      title: "投影與立體",
      ds: 1,
      lines: [
        [
          {
            t: "三垂線：線 · 影 · 平面",
          },
        ],
        [
          {
            t: "立體角逐層落平面",
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
          text: "平面外線 → 投影",
        },
        {
          k: "t",
          x: 215,
          y: 155,
          s: 20,
          text: "影線 ⊥ 平面內線 → 斜線亦 ⊥",
          f: BLUE,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 230,
          s: 17,
          text: "實戰見 2012 Q18",
          f: MUTED,
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
            t: "正弦 SSA 要查兩解",
          },
        ],
        [
          {
            t: "餘弦符號：鈍角 cos 負",
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
          text: "✗ SSA 只答一個角",
          f: RED,
          w: 700,
        },
        {
          k: "t",
          x: 215,
          y: 140,
          s: 18,
          text: "✓ 檢查會唔會兩解",
          f: OK,
          w: 700,
          at: 1,
        },
        {
          k: "t",
          x: 215,
          y: 200,
          s: 18,
          text: "✓ 鈍角 cos C < 0",
          f: OK,
          w: 700,
          at: 2,
        },
      ],
    },
    summary: {
      title: "U14 完成",
      ds: 1,
      lines: [
        [
          {
            t: "正弦 · 餘弦 · 面積 · 方程",
          },
        ],
        [
          {
            t: "下一章：U15 排列組合",
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
          label: "sine",
        },
        {
          k: "chip",
          x: 160,
          y: 110,
          w: 110,
          h: 70,
          f: GOLD,
          label: "cosine",
          at: 1,
        },
        {
          k: "chip",
          x: 280,
          y: 110,
          w: 110,
          h: 70,
          f: OK,
          label: "面積",
          at: 2,
        },
      ],
    },
  },
}
