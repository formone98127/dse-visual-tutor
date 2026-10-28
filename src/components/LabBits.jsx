import { INK, MUTED, LINE, GOLD, BLUE, OK, RED, SERIF } from '../lib/palette.js'

/**
 * Lab 積木組件 — 「圖形 + 置中標籤」綁死一齊，杜絕人手擺位錯位。
 * 規則（2026-10-28）：任何「格入面有數字 / 圓圈入面有數字」嘅場景，
 * 一律用呢啲組件，唔好自己 <rect> + <text> 手動對位。
 */

/** SVG 文字 */
export function T({ x, y, size = 22, fill = INK, w = 600, children, anchor = 'middle', opacity = 1, vb = false, italic = false }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={w}
      fontFamily={SERIF} fontStyle={italic ? 'italic' : 'normal'} opacity={opacity}
      dominantBaseline={vb ? 'central' : undefined}>
      {children}
    </text>
  )
}

/** 疊式分數 */
export function Frac({ x, y, n, d, size = 24, fill = INK, w = 22 }) {
  return (
    <g fontFamily={SERIF} fontWeight={600} fontSize={size} fill={fill} textAnchor="middle">
      <text x={x} y={y - 8}>{n}</text>
      <line x1={x - w} y1={y + 4} x2={x + w} y2={y + 4} stroke={fill} strokeWidth={2} />
      <text x={x} y={y + 30}>{d}</text>
    </g>
  )
}

/**
 * 矩形格 + 置中標籤（自動數學置中，唔使計 baseline）
 * 可選小字注釋（標籤下面）
 */
export function NumBox({
  x, y, w = 62, h = 54, rx = 10,
  label, note,
  fill = 'rgba(255,255,255,0.06)', stroke = LINE, sw = 2,
  labelSize = 32, labelFill = INK, noteFill = MUTED,
  op = 1,
}) {
  return (
    <g opacity={op} style={{ transition: 'opacity 0.4s ease' }}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={sw} />
      <text x={x + w / 2} y={note ? y + h / 2 - 6 : y + h / 2} textAnchor="middle" dominantBaseline="central"
        fontSize={labelSize} fill={labelFill} fontWeight={700} fontFamily={SERIF}>
        {label}
      </text>
      {note && (
        <text x={x + w / 2} y={y + h - 8} textAnchor="middle" fontSize={11} fill={noteFill} fontFamily={SERIF}>
          {note}
        </text>
      )}
    </g>
  )
}

/** 圓形 + 置中數字 */
export function CircleNum({ cx, cy, r = 21, label, prime = false, fill, labelFill, op = 1, sw }) {
  return (
    <g opacity={op} style={{ transition: 'opacity 0.4s ease' }}>
      <circle cx={cx} cy={cy} r={r}
        fill={fill ?? (prime ? 'rgba(255,209,102,0.15)' : 'rgba(255,255,255,0.05)')}
        stroke={labelFill ?? (prime ? GOLD : LINE)} strokeWidth={sw ?? (prime ? 2.2 : 1.6)} />
      <text x={cx} cy={cy} textAnchor="middle" dominantBaseline="central"
        fontSize={Math.max(16, r * 0.95)} fontWeight={700} fontFamily={SERIF}
        fill={labelFill ?? (prime ? GOLD : INK)}>
        {label}
      </text>
    </g>
  )
}

/** 卡片：圓圈編號 + 標題 + 說明（總結頁用） */
export function NumberedCard({ x, y, w = 126, h = 112, num, title, note, op = 1 }) {
  return (
    <g opacity={op} style={{ transition: 'opacity 0.4s ease' }}>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="rgba(255,255,255,0.05)" stroke="rgba(242,245,255,0.18)" strokeWidth={1.4} />
      <circle cx={x + 24} cy={y + 28} r={13} fill={GOLD} fillOpacity={0.2} stroke={GOLD} strokeWidth={1.4} />
      <text x={x + 24} y={y + 28} textAnchor="middle" dominantBaseline="central" fontSize={13} fill={GOLD} fontWeight={700} fontFamily={SERIF}>
        {num}
      </text>
      <text x={x + 44} y={y + 28} textAnchor="start" dominantBaseline="central" fontSize={15} fill={INK} fontWeight={700} fontFamily={SERIF}>
        {title}
      </text>
      {note && (
        <text x={x + w / 2} y={y + 82} textAnchor="middle" fontSize={12.5} fill={MUTED} fontFamily={SERIF}>
          {note}
        </text>
      )}
    </g>
  )
}

/** 雙欄結果卡（例：正確 / 錯誤 對照） */
export function ResultCard({ x, y, w = 175, h = 130, title, body, verdict, verdictColor = OK, op = 1 }) {
  return (
    <g opacity={op} style={{ transition: 'opacity 0.4s ease' }}>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="rgba(255,255,255,0.05)" stroke={verdictColor} strokeWidth={1.6} />
      <Text x={x + w / 2} y={y + 30} size={16} fill={verdictColor} w={700}>{title}</Text>
      <Text x={x + w / 2} y={y + 62} size={18}>{body}</Text>
      <line x1={x + 30} y1={y + 76} x2={x + w - 30} y2={y + 76} stroke={verdictColor} strokeWidth={1.2} opacity={0.6} />
      <Text x={x + w / 2} y={y + 102} size={16} fill={verdictColor} w={700}>{verdict}</Text>
    </g>
  )
}

export { GOLD, BLUE, OK, RED, INK, MUTED, LINE, SERIF }
