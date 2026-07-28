import { useState, useRef } from 'react'

// ✅ 정답 예시 — 할 일 관리 앱 (CRUD)
// state 배열 + controlled input + map/key 를 한 파일에 모두 엮었다.
// 핵심: 상태는 항상 '새 배열'로 set 한다(불변성), id는 useRef 카운터로 안전하게.

export default function SolutionTodo() {
  const [todos, setTodos] = useState([]) // 할 일 배열 — 진짜 상태
  const [text, setText] = useState('') // 입력창 값(controlled input)
  const nextId = useRef(1) // id 카운터 — 렌더와 무관하므로 state 대신 ref

  // Create — 기존 배열에 새 항목을 더한 '새 배열'로 set 한다.
  function addTodo() {
    const value = text.trim()
    if (value === '') return // 빈 값은 무시
    setTodos([...todos, { id: nextId.current++, text: value, done: false }])
    setText('')
  }

  // Update (완료 토글) — 해당 id만 done을 뒤집은 '새 배열'
  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  // Delete — 해당 id를 뺀 '새 배열'
  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  // 남은 일 개수 — state로 두지 않고 todos에서 매 렌더 계산한다(파생 값).
  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="demo-card">
      {/* Create: 폼 제출(Enter) 또는 추가 버튼 */}
      <form
        className="shop-input"
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력"
        />
        <button type="submit">추가</button>
      </form>

      {/* Read: 개수 표시 */}
      <p className="demo-desc" style={{ marginBottom: 10 }}>
        전체 {todos.length}개 · 남은 일 {remaining}개
      </p>

      {/* 비었으면 안내, 있으면 map + key로 한 줄씩 렌더 (조건부 렌더링 + 리스트) */}
      {todos.length === 0 ? (
        <p className="demo-desc">할 일이 없다. 하나 추가해 보자 📝</p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0 }}>
          {todos.map((todo) => (
            // 항목 한 줄: 체크박스·텍스트 클릭은 토글, ✕는 삭제
            <li
              key={todo.id}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', listStyle: 'none' }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                style={{ width: 'auto', margin: 0, cursor: 'pointer' }}
              />
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  textDecoration: todo.done ? 'line-through' : 'none',
                  opacity: todo.done ? 0.5 : 1,
                }}
              >
                {todo.text}
              </span>
              <button className="mini-del" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
