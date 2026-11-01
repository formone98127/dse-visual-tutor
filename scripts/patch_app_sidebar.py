# -*- coding: utf-8 -*-
from pathlib import Path

app_path = Path('src/App.jsx')
text = app_path.read_text(encoding='utf-8')

old_state = """  const [mode, setMode] = useState('PRE_DSE')
  const [activeUnitId, setActiveUnitId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stageInBeat, setStageInBeat] = useState(0)
  const [menuOpen, setMenuOpen] = useState(true)
  const [showComplete, setShowComplete] = useState(false)
  const [continueInfo, setContinueInfo] = useState(null)
  const [gateOk, setGateOk] = useState(true)
  const startedLessonRef = useRef(null)
  const lastPageKeyRef = useRef(null)"""

new_state = """  const [mode, setMode] = useState('PRE_DSE')
  const [activeUnitId, setActiveUnitId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stageInBeat, setStageInBeat] = useState(0)
  const [menuOpen, setMenuOpen] = useState(true)
  const [showComplete, setShowComplete] = useState(false)
  const [continueInfo, setContinueInfo] = useState(null)
  const [gateOk, setGateOk] = useState(true)
  const [focusTopicId, setFocusTopicId] = useState(null)
  const startedLessonRef = useRef(null)
  const lastPageKeyRef = useRef(null)
  const bootQueryRef = useRef(false)"""

if old_state not in text:
    raise SystemExit('state block not found')
if 'bootQueryRef' in text:
    print('App.jsx already patched')
else:
    text = text.replace(old_state, new_state, 1)

    needle = """  // 開首讀取本機進度 → 「繼續上課」卡
  useEffect(() => {
    const saved = loadProgress()
    if (!saved) return
    const units = flatUnits(saved.mode)
    const unit = units.find((u) => u.id === saved.unitId)
    if (!unit?.lessonId) return
    const les = LESSONS_BY_MODE[saved.mode]?.find((l) => l.id === unit.lessonId)
    if (!les) return
    setContinueInfo({
      mode: saved.mode,
      unitId: saved.unitId,
      step: Math.min(saved.step, les.beats.length - 1),
      stage: saved.stage,
      label: `${les.title} · ${unit.title}`,
    })
  }, [])
"""

    insert = """  // Deep-link from landing: ?mode=PRE_DSE|DSE&topic=k25 (does not clear continue card)
  useEffect(() => {
    if (bootQueryRef.current) return
    bootQueryRef.current = true
    try {
      const params = new URLSearchParams(window.location.search)
      const m = params.get('mode')
      if (m === 'PRE_DSE' || m === 'DSE') setMode(m)
      const topic = (params.get('topic') || '').trim().toLowerCase()
      if (topic) setFocusTopicId(topic)
    } catch {
      /* ignore malformed search */
    }
  }, [])

  // 開首讀取本機進度 → 「繼續上課」卡
  useEffect(() => {
    const saved = loadProgress()
    if (!saved) return
    const units = flatUnits(saved.mode)
    const unit = units.find((u) => u.id === saved.unitId)
    if (!unit?.lessonId) return
    const les = LESSONS_BY_MODE[saved.mode]?.find((l) => l.id === unit.lessonId)
    if (!les) return
    setContinueInfo({
      mode: saved.mode,
      unitId: saved.unitId,
      step: Math.min(saved.step, les.beats.length - 1),
      stage: saved.stage,
      label: `${les.title} · ${unit.title}`,
    })
  }, [])
"""

    if needle not in text:
        raise SystemExit('progress effect not found')
    text = text.replace(needle, insert, 1)

    old_sidebar = """      <Sidebar
        mode={mode}
        onChangeMode={changeMode}
        activeUnitId={activeUnitId}
        onSelectUnit={selectUnit}
        open={pickingUnit || menuOpen}
        home={pickingUnit}
        continueTarget={pickingUnit ? continueInfo : null}
        onContinue={pickingUnit ? resumeContinue : null}
        onCloseMenu={() => setMenuOpen(false)}
      />"""

    new_sidebar = """      <Sidebar
        mode={mode}
        onChangeMode={changeMode}
        activeUnitId={activeUnitId}
        onSelectUnit={selectUnit}
        open={pickingUnit || menuOpen}
        home={pickingUnit}
        continueTarget={pickingUnit ? continueInfo : null}
        onContinue={pickingUnit ? resumeContinue : null}
        onCloseMenu={() => setMenuOpen(false)}
        preferredTopicId={focusTopicId}
      />"""

    if old_sidebar not in text:
        raise SystemExit('Sidebar block not found')
    text = text.replace(old_sidebar, new_sidebar, 1)
    app_path.write_text(text, encoding='utf-8')
    print('App.jsx patched')

# --- Sidebar ---
sb_path = Path('src/components/Sidebar.jsx')
sb = sb_path.read_text(encoding='utf-8')

old_props = """  activeUnitId,
  onSelectUnit,
  open,
  home = false,
  continueTarget = null,
  onContinue = null,
  onCloseMenu = null,
}) {"""

new_props = """  activeUnitId,
  onSelectUnit,
  open,
  home = false,
  continueTarget = null,
  onContinue = null,
  onCloseMenu = null,
  preferredTopicId = null,
}) {"""

if 'preferredTopicId' not in sb:
    if old_props not in sb:
        raise SystemExit('Sidebar props not found')
    sb = sb.replace(old_props, new_props, 1)

old_effect = """  // 轉 mode / 揀單元時，自動攤開「上緊課」所在嘅主題；篩選可上課時攤開第一個有課嘅
  useEffect(() => {
    const cur = SYLLABUS[mode].find((t) => t.units.some((u) => u.id === activeUnitId))
    if (cur) {
      setOpenTopic(cur.id)
      return
    }
    const firstReady = SYLLABUS[mode].find((t) => t.units.some((u) => u.lessonId))
    setOpenTopic(firstReady?.id ?? SYLLABUS[mode][0]?.id ?? null)
  }, [mode, activeUnitId])
"""

new_effect = """  // 轉 mode / 揀單元時，自動攤開「上緊課」所在嘅主題；篩選可上課時攤開第一個有課嘅
  // landing deep-link 可用 preferredTopicId（例如 k25）優先攤開
  useEffect(() => {
    const cur = SYLLABUS[mode].find((t) => t.units.some((u) => u.id === activeUnitId))
    if (cur) {
      setOpenTopic(cur.id)
      return
    }
    if (preferredTopicId) {
      const wanted = preferredTopicId.toLowerCase()
      const hit = SYLLABUS[mode].find(
        (t) => t.id === wanted || t.code?.toLowerCase() === wanted,
      )
      if (hit) {
        setOpenTopic(hit.id)
        return
      }
    }
    const firstReady = SYLLABUS[mode].find((t) => t.units.some((u) => u.lessonId))
    setOpenTopic(firstReady?.id ?? SYLLABUS[mode][0]?.id ?? null)
  }, [mode, activeUnitId, preferredTopicId])
"""

if 'preferredTopicId.toLowerCase' not in sb:
    if old_effect not in sb:
        raise SystemExit('Sidebar effect not found')
    sb = sb.replace(old_effect, new_effect, 1)
    sb_path.write_text(sb, encoding='utf-8')
    print('Sidebar.jsx patched')
else:
    print('Sidebar.jsx already patched')
