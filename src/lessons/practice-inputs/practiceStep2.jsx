import { useState } from 'react'

// 🟡 쉬움+ — onChange는 됐다. input을 state에 '묶는' value 한 줄만 더한다.
// 할 일: <input>에 value={text} 를 붙인다. (지금은 value가 없어 uncontrolled — 리액트가 값을 화면에 못 되돌린다)

export default function PracticeStep2() {
  const [text, setText] = useState('')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO: 아래 input에 value={text} 를 붙인다 */}
      <input onChange={(e) => setText(e.target.value)} placeholder="여기에 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>리액트가 아는 값: <b>{text || '(없음)'}</b></p>
    </div>
  )
}
