import { useState } from 'react'

// 🟢 쉬움 — 입력창을 controlled로 만들자.
// 할 일: onChange의 TODO 한 줄만 채우면 타이핑한 글자가 반영된다.

export default function PracticeEasy() {
  const [text, setText] = useState('')

  const onChange = (e) => {
    // TODO: 입력한 값을 text에 넣는다. (예: setText(e.target.value))
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input value={text} onChange={onChange} placeholder="여기에 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>리액트가 아는 값: <b>{text || '(없음)'}</b></p>
    </div>
  )
}
