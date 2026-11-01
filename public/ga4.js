/**
 * GA4 接線（全站共用）：index.html 同 learn.html 都載入呢個檔。
 *
 * ★ 換真 ID 只改下面一個字串 ★
 * 到 analytics.google.com → 管理 → 資料串流 → 網頁，抄個「G-」開頭嘅測量 ID，
 * 將 'G-PLACEHOLDER' 換成佢，部署一次就生效。
 *
 * 係 placeholder 嘅時候：唔會載入任何 Google script、唔送任何資料。
 */
(function () {
  var MEASUREMENT_ID = 'G-PLACEHOLDER'

  // 要似正式 GA4 ID（G- + 至少 6 個英數）先會啟動
  if (!/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID) || MEASUREMENT_ID === 'G-PLACEHOLDER') return

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments)
    }
  window.gtag('js', new Date())
  // 匿名化 IP；唔開廣告個人化，純流量統計
  window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true, allow_google_signals: false })

  var s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID
  document.head.appendChild(s)
})()
