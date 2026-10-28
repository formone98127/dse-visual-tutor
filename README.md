# DSE Visual Tutor · DSE網上課程

香港 DSE 數學網上學習平台 — 每一頁逐行推演、每一步由學生自己揭開。

## 網址

- 學生版：`/`（index.html）
- 後台劇本制作器：`/builder.html`（內部工具）

## 技術

- Vite + React 19 + Tailwind CSS v4
- 課程內容對齊 EDB 官方課程（KS3 初中 32 單元 + 高中必修 20 單元 + M1/M2）
- 每章 = 官方 Learning Objectives → 逐行推演腳本（lessonScript）→ 專屬 SVG 動畫 Lab

## 開發

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 出 dist/（index.html + builder.html）
```

## 課程數據結構

- `src/data/syllabus.js` — EDB 課程大綱（Accordion 選單）
- `src/data/lessons.js` — 課程脚本（beats：caption + action + steps）
- `src/components/*Lab.jsx` — 每個 Lab 一組視覺場景，由 beat.action 驅動
