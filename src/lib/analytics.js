/**
 * 輕量分析：事件寫入本機 + console。
 * 之後可改成送去 Plausible / GA，唔使改呼叫端。
 */

const KEY = 'dvt.analytics.v1'
const MAX_EVENTS = 400

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
  if (typeof window !== 'undefined') {
    window.__DVT_ANALYTICS = store
  }
}

export function getAnalyticsSnapshot() {
  return readStore()
}
