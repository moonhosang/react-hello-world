import { useState } from 'react'

// 🟣 어려움 — state만 주어져 있다. add 함수와 화면(입력·추가·목록·빈 안내)을 직접 만든다.

export default function PracticeL4() {
  const [tags, setTags] = useState(['리액트', 'JS'])
  const [text, setText] = useState('')

  // TODO A: add 함수 — text를 다듬어(trim) 비어 있지 않으면 tags에 추가([...tags, t])하고 text 비우기.

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO B: 아래를 만든다 —
          · 입력창 <input value={text} onChange={...}> + <button onClick={add}>추가</button>
          · tags가 비었으면 안내, 아니면 <ul>에 map으로 <li key={i}>#{tag}</li> */}
      여기에 태그 목록 UI를 만들자
    </div>
  )
}
