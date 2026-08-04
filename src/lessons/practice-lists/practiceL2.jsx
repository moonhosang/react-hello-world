import { useState } from 'react'

// 🟡 쉬움 — 목록은 나오는데 '추가'가 안 먹는다. add 안 한 줄을 채운다.
// 배열 state는 원본을 건드리지 말고 새 배열로 바꾼다: [...list, t].

export default function PracticeL2() {
  const [tags, setTags] = useState(['리액트', 'JS'])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    // TODO: tags에 t를 추가한다(불변). 예: setTags((list) => [...list, t])
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
