import { useState } from 'react'

// ✅ 정답 — 태그 목록 (배열 state · map+key · 항목 추가 · 빈 목록 조건부 렌더링)
export default function SolutionTagList() {
  const [tags, setTags] = useState(['리액트', 'JS'])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTags((list) => [...list, t]) // 원본을 건드리지 않고 새 배열로
    setText('')
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <div className="button-row" style={{ marginBottom: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="태그 입력" style={{ padding: '6px 8px' }} />
        <button className="chip on" onClick={add}>추가</button>
      </div>
      {tags.length === 0 ? (
        <p className="demo-desc" style={{ margin: 0 }}>아직 태그가 없다. 위에서 추가해 보라.</p>
      ) : (
        <ul className="section-list" style={{ margin: 0 }}>
          {tags.map((tag, i) => <li key={i}>#{tag}</li>)}
        </ul>
      )}
    </div>
  )
}
