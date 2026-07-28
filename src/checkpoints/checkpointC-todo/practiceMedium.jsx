import { useState, useRef } from 'react'

// 🟡 중간 — 할 일 관리 앱 (CRUD)
// 껍데기와 렌더는 되어 있다. 핵심 함수 3개 중 절반 정도가 비어 있다.
//   addTodo    : 힌트로 절반만 채워져 있다 → 나머지 한 줄(set)을 채운다.
//   toggleTodo : 비어 있다 → 직접 채운다.
//   deleteTodo : 이미 완성돼 있다(예시).
// 규칙: 상태는 언제나 '새 배열'로 set 한다(불변성).

export default function PracticeTodoMedium() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const nextId = useRef(1)

  // Create — 절반만 채워져 있다.
  function addTodo() {
    const value = text.trim()
    if (value === '') return // 빈 값은 무시 (이 가드는 이미 됨)
    const newTodo = { id: nextId.current++, text: value, done: false }
    // 🟡 TODO: todos 뒤에 newTodo를 붙인 '새 배열'로 setTodos 하자.
    // setTodos([...todos, newTodo])
    setText('')
  }

  // Update (완료 토글) — 비어 있다. 직접 채우자.
  function toggleTodo(id) {
    // 🟡 TODO: id가 같은 항목만 done을 뒤집은 '새 배열'로 setTodos 하자.
    //   힌트: todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
  }

  // Delete — 완성 예시. 이렇게 '새 배열'을 만들면 된다.
  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="demo-card">
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

      <p className="demo-desc" style={{ marginBottom: 10 }}>
        전체 {todos.length}개 · 남은 일 {remaining}개
      </p>

      {todos.length === 0 ? (
        <p className="demo-desc">할 일이 없다. 하나 추가해 보자 📝</p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0 }}>
          {todos.map((todo) => (
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
