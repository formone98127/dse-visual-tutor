import { GOLD, INK, MUTED, LINE, SERIF } from '../lib/palette.js'

/** 階段顯示：唔顯示就完全唔渲染（避免隱形層重疊） */
export function Pop({ show, delay = 0, children }) {
  if (!show) return null
  const d = Math.min(Math.max(0, delay), 4)
  const cls = d === 0 ? 'lab-pop' : `lab-pop lab-pop-d${d}`
  return <g className={cls}>{children}</g>
}

export function T({
  x,
  y,
  size = 22,
  fill = INK,
  w = 600,
  children,
  anchor = 'middle',
  opacity = 1,
  vb = false,
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={fill}
      fontWeight={w}
      fontFamily={SERIF}
      opacity={opacity}
      dominantBaseline={vb ? 'central' : undefined}
    >
      {children}
    </text>
  )
}

export function Blocks({ x, y, n, fill = GOLD, gap = 8, size = 22 }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={x + i * (size + gap)}
          y={y}
          width={size}
          height={size}
          rx={5}
          fill={fill}
          fillOpacity={0.35}
          stroke={fill}
          strokeWidth={1.6}
        />
      ))}
    </g>
  )
}

export function Arrow({ x1, y1, x2, y2, stroke = LINE, flow = false }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={2.2}
        className={flow ? 'lab-flow' : undefined}
      />
      <path
        d={`M ${x2} ${y2} L ${x2 - 9} ${y2 - 6} M ${x2} ${y2} L ${x2 - 9} ${y2 + 6}`}
        fill="none"
        stroke={stroke}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </g>
  )
}

export function Chip({ x, y, w, h, fill, children, pulse = false }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={fill}
        fillOpacity={0.14}
        stroke={fill}
        strokeWidth={1.8}
        className={pulse ? 'lab-pulse' : undefined}
      />
      {children}
    </g>
  )
}

export function Check({ x, y, show }) {
  if (!show) return null
  return (
    <g className="lab-pop">
      <circle cx={x} cy={y} r={18} fill="rgba(184,242,124,0.2)" stroke="#b8f27c" strokeWidth={2} />
      <T x={x} y={y + 7} size={22} fill="#b8f27c" w={700}>
        ✓
      </T>
    </g>
  )
}

export { GOLD, INK, MUTED, LINE, SERIF }
