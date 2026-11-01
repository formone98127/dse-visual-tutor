/**
 * 輕量分析：事件寫入本機 + console，再轉發 GA4（如果 /ga4.js 已啟用）。
 * 呼叫端照舊 track(name, props)，唔使理送去邊。
 */

const KEY = 'dvt.analytics.v1'
const MAX_EVENTS = 400

/** GA4 啟用中（/ga4.js 插入咗真 ID）先會送出 */
function forwardToGa(name, props) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, props)
  } catch {
    /* ignore */
  }
}

function readStore() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { events: [], counts: {} }
    const data = JSON.parse(raw)
    return {
      events: Array.isArray(data.events) ? data.events : [],
      counts: data.counts && typeof data.counts === 'object' ? data.counts : {},
    }
  } catch {
    return { events: [], counts: {} }
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

/** @param {string} name @param {Record<string, unknown>} [props] */
export function track(name, props = {}) {
  const store = readStore()
  const event = {
    name,
    props,
    t: Date.now(),
  }
  store.events.push(event)
  if (store.events.length > MAX_EVENTS) {
    store.events = store.events.slice(-MAX_EVENTS)
  }
  const key = props.lessonId ? `${name}:${props.lessonId}` : name
  store.counts[key] = (store.counts[key] || 0) + 1
  writeStore(store)
  if (typeof console !== 'undefined' && console.debug) {
    console.debug('[dvt]', name, props)
  }
  forwardToGa(name, props)
  if (typeof window !== 'undefined') {
    window.__DVT_ANALYTICS = store
  }
}

export function getAnalyticsSnapshot() {
  return readStore()
}
