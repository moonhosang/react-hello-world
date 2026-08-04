import { useState } from 'react'

// 🟢 아주 쉬움 — 목록 한 줄만 채운다.
// 다 됐는데 목록이 안 보인다: map 콜백이 아무것도 반환하지 않아서다.
// 각 tag를 <li>로 반환한다. 목록엔 고유 key가 필요하다.

export default function PracticeL1() {
  const [tags, setTags] = useState(['리액트', 'JS'])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTags((list) => [...list, t])
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
          {tags.map((tag, i) => {
            // TODO: 각 tag를 <li>로 반환한다. key도 붙인다 → return <li key={i}>#{tag}</li>
            return null
          })}
        </ul>
      )}
    </div>
  )
}
