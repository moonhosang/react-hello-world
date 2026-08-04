import { useState } from 'react'

// 🔴 중간 — 두 조각을 직접. add 함수 본문과, 목록을 그리는 부분을 채운다.
// (지금은 add가 비었고, 목록도 안 그려진다. 빈 목록일 때 안내도 넣는다.)

export default function PracticeL3() {
  const [tags, setTags] = useState(['리액트', 'JS'])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    // TODO A: tags에 t 추가 — setTags((list) => [...list, t])
    setText('')
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <div className="button-row" style={{ marginBottom: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="태그 입력" style={{ padding: '6px 8px' }} />
        <button className="chip on" onClick={add}>추가</button>
      </div>
      {/* TODO B: tags가 비었으면 안내 문구를, 아니면 <ul>에 map으로 <li key={i}>#{tag}</li>를 그린다.
          예: tags.length === 0
            ? <p className="demo-desc">아직 태그가 없다</p>
            : <ul className="section-list">{tags.map((tag, i) => <li key={i}>#{tag}</li>)}</ul> */}
    </div>
  )
}
