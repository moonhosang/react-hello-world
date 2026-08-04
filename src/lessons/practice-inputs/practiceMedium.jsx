import { useState } from 'react'

// 🔴 중간 — value·onChange는 됐다(controlled). 입력값에서 '글자 수'를 파생해 덧붙인다.
// 할 일: 아래 문장 끝에 · {text.length}자 를 이어 붙인다. (state에서 계산하는 파생 값)

export default function PracticeMedium() {
  const [text, setText] = useState('')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="여기에 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>
        리액트가 아는 값: <b>{text || '(없음)'}</b>
        {/* TODO: 여기에 글자 수를 덧붙인다 — 예:  · <b>{text.length}</b>자 */}
      </p>
    </div>
  )
}
