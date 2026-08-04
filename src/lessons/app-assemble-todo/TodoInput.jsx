import { useState } from 'react'

// 완성된 조각 — 입력창. 자기 입력값만 관리하고, [추가] 때 부모의 onAdd(text)를 부른다.
// (상태 변경은 부모가 한다 — 이 조각은 "무엇을 할지"만 값과 함께 알린다)
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const v = text.trim()
    if (!v) return
    onAdd && onAdd(v) // onAdd가 연결 안 됐으면(조립 전) 아무 일도 안 하게 안전 처리
    setText('')
  }
  return (
    <form className="shop-input" onSubmit={submit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력" />
      <button type="submit">추가</button>
    </form>
  )
}
