import json
import sys
from pathlib import Path

failures = []


def check(label, ok):
    print(f"{'PASS' if ok else 'FAIL'} {label}")
    if not ok:
        failures.append(label)


STAMP = '2026-11-02-ga4'
GA_ID = 'G-XFB3Y5KTJQ'

landing = Path('dist/index.html').read_text(encoding='utf-8')
learn = Path('dist/learn.html').read_text(encoding='utf-8') if Path('dist/learn.html').exists() else ''
print('bytes', len(landing.encode()))
check('deploy stamp', STAMP in landing)
check('by-topic section', 'id="by-topic"' in landing)
check('after-pp section', '做完 past paper' in landing)
check('hero', '睇唔通圖' in landing)
check('m1m2 open copy', '視覺課已經開放' in landing)
check('no stale coming-soon', '逐步開放' not in landing)
check('landing gtag loads', f'googletagmanager.com/gtag/js?id={GA_ID}' in landing)
check('landing gtag config + privacy params', f"gtag('config', '{GA_ID}', {{ anonymize_ip: true, allow_google_signals: false }})" in landing)
check('learn.html bundled', bool(learn))
check('learn gtag loads', f'googletagmanager.com/gtag/js?id={GA_ID}' in learn)
check('learn gtag config + privacy params', f"gtag('config', '{GA_ID}', {{ anonymize_ip: true, allow_google_signals: false }})" in learn)
check('builder NOT bundled', not Path('dist/builder.html').exists())
check('ga4.js shipped', Path('dist/ga4.js').exists())

for asset in ('og-cover.jpg', 'favicon-32.png', 'apple-touch-icon.png', 'robots.txt', 'privacy.html'):
    check(f'asset {asset}', Path('dist', asset).exists())

check('topics pages shipped', Path('dist/topics/pythagoras.html').exists())

cv = json.loads(Path('dist/content-version.json').read_text(encoding='utf-8'))
check('content stamp matches', cv.get('stamp') == STAMP)
print('content-version.json:', cv)

sync = Path('scripts/sync-check.mjs').exists()
if sync:
    import subprocess
    r = subprocess.run(['node', 'scripts/sync-check.mjs'], capture_output=True, text=True, shell=True)
    print(r.stdout.strip())
    check('sync-check (web vs app)', r.returncode == 0)

if failures:
    print(f"\n{len(failures)} FAILED: {', '.join(failures)}")
    sys.exit(1)
print('\nAll dist checks passed.')
