import { useState } from 'react'

// ✅ 정답 (다른 예시) — 할 일 목록 (배열 state · map+key · 항목 추가 · 빈 목록 조건부 렌더링)
// 태그 목록과 같은 기술을 '할 일'이라는 다른 소재로 한 번 더.
export default function SolutionTodoList() {
  const [todos, setTodos] = useState(['리액트 공부', '산책'])
  const [text, setText] = useState('')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((list) => [...list, t]) // 원본을 건드리지 않고 새 배열로
    setText('')
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <div className="button-row" style={{ marginBottom: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일 입력" style={{ padding: '6px 8px' }} />
        <button className="chip on" onClick={add}>추가</button>
      </div>
      {todos.length === 0 ? (
        <p className="demo-desc" style={{ margin: 0 }}>할 일이 없다. 위에서 추가해 보라.</p>
      ) : (
        <ul className="section-list" style={{ margin: 0 }}>
          {todos.map((todo, i) => <li key={i}>✅ {todo}</li>)}
        </ul>
      )}
    </div>
  )
}
