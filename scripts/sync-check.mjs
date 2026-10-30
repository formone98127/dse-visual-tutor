/**
 * Confirm web + phone app point at the same published tutor site.
 * Run: npm run sync:check
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const EXPECTED = 'https://dsemaths.canonlessons.com/'

const appJson = JSON.parse(readFileSync(resolve(root, 'mobile/app.json'), 'utf8'))
const appTsx = readFileSync(resolve(root, 'mobile/App.tsx'), 'utf8')
const version = readFileSync(resolve(root, 'src/data/contentVersion.js'), 'utf8')

const tutorUrl = appJson?.expo?.extra?.tutorUrl
const stampMatch = version.match(/CONTENT_STAMP\s*=\s*['"]([^'"]+)['"]/)

let ok = true
const say = (pass, msg) => {
  console.log(`${pass ? 'OK' : 'FAIL'}  ${msg}`)
  if (!pass) ok = false
}

say(
  typeof tutorUrl === 'string' && tutorUrl.replace(/\/?$/, '/') === EXPECTED,
  `app.json tutorUrl → ${tutorUrl}`,
)
say(appTsx.includes(EXPECTED), 'App.tsx production URL → dsemaths.canonlessons.com')
say(!!stampMatch, `content stamp → ${stampMatch?.[1] ?? '(missing)'}`)
say(
  appTsx.includes('content-version.json') && appTsx.includes('cacheEnabled={false}'),
  'App loads content-version.json and disables WebView cache',
)

console.log('')
if (ok) {
  console.log('Web and app share one site (dsemaths.canonlessons.com). Upload dist to Hostinger → phones see new lessons.')
  process.exit(0)
} else {
  console.log('Fix the FAIL lines so web and app stay in sync.')
  process.exit(1)
}
