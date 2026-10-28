import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LessonBuilder from './LessonBuilder.jsx'
import '../index.css'

// 後台內部工具——同學生版 (index.html) 完全分開嘅入口
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LessonBuilder />
  </StrictMode>,
)
