import { useState } from 'react'

export default function SolutionInput() {
  const [text, setText] = useState('')
  return (
    <div className="demo-card">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="여기에 입력" />
      <p className="demo-desc">입력값: {text || '(없음)'} · {text.length}자</p>
    </div>
  )
}
