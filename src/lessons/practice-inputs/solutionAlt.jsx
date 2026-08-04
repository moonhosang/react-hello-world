import { useState } from 'react'

// ✅ 정답 (다른 예시) — 검색어 입력을 대문자로
// 글자 수 카드와 같은 controlled input(value+onChange) + 파생 값이다. 소재만 다르다.
export default function SolutionSearchUpper() {
  const [q, setQ] = useState('')
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="검색어 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>대문자: <b>{q.toUpperCase() || '(비어 있음)'}</b></p>
    </div>
  )
}
