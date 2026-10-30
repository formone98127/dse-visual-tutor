/**
 * 其餘 PRE-DSE 章節（K8–K32 + 畢氏應用）嘅場景資料。
 * 由 TopicLab 渲染：每個場景 = 標題 + 底部推演行 + 逐段淡入嘅圖示元素。
 * 元素 at = 第幾步先出現；steps 自動由資料計（topicSteps）。
 */

import { S1 } from './topicLabs1.js'
import { S2 } from './topicLabs2.js'
import { S3 } from './topicLabs3.js'
import { D1 } from './topicDse1.js'
import { D2 } from './topicDse2.js'
import { D3 } from './topicDse3.js'

export const TOPIC_SCENES = {
  ...S1,
  ...S2,
  ...S3,
  ...D1,
  ...D2,
  ...D3,
}

/** 場景需要幾多步（圖示段 + 推演行，取最大） */
export function topicSteps(chapter, sceneName) {
  const s = TOPIC_SCENES[chapter] && TOPIC_SCENES[chapter][sceneName]
  if (!s) return 1
  const ats = (s.art || []).map((e) => e.at || 0)
  return Math.max(0, ...ats, (s.ds ?? 0) + s.lines.length - 1) + 1
}
