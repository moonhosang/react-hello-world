import { useState } from 'react'

// ✅ 다른 예시 정답 — 메모 추가 폼 (문자열 state + 배열 목록)
// 방명록과 같은 기술: controlled input · 제출(preventDefault) · 배열 불변 추가 · 빈 값 검증.
export default function SolutionMemo() {
  const [text, setText] = useState('')
  const [memos, setMemos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    setMemos([...memos, text])
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="demo-card" style={{ padding: 12 }}>
      <div className="button-row">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="메모 제목" style={{ padding: '6px 8px' }} />
        <button className="chip on">추가</button>
      </div>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {memos.length === 0 ? <li className="demo-desc">아직 메모가 없다.</li> : memos.map((m, i) => <li key={i}>📝 {m}</li>)}
      </ul>
    </form>
  )
}
