import { useState } from 'react'

// ✅ 정답 — controlled input (value+onChange) + 글자 수 + 초기화
export default function SolutionInputCard() {
  const [text, setText] = useState('')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 입력"
        style={{ padding: '6px 8px' }}
      />
      <p style={{ marginTop: 8 }}>
        리액트가 아는 값: <b>{text || '(없음)'}</b> · <b>{text.length}</b>자
      </p>
      <div className="button-row">
        <button className="chip" onClick={() => setText('')}>초기화</button>
      </div>
    </div>
  )
}
