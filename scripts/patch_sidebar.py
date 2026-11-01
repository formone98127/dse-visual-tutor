from pathlib import Path
p = Path('src/components/Sidebar.jsx')
s = p.read_text(encoding='utf-8')
old = "{home ? '選擇單元' : '課程列表區'}"
new = "{home ? 'By topic · 選擇單元' : 'By topic · 課程'}"
if old not in s:
    raise SystemExit('old string not found')
p.write_text(s.replace(old, new, 1), encoding='utf-8')
print('Sidebar patched')
t = Path('index.html').read_text(encoding='utf-8')
print('title', next(l for l in t.splitlines() if '<title>' in l))
print('by-topic', 'id="by-topic"' in t)
print('after-pp', 'id="after-pp"' in t)
print('m1m2', 'id="m1m2"' in t)
print('stamp file', Path('src/data/contentVersion.js').read_text(encoding='utf-8'))
