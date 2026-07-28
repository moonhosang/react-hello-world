import { useState, useRef } from 'react'

// 🟢 쉬움 — 할 일 관리 앱 (CRUD)
// 거의 다 완성돼 있다. 딱 두 군데(🟢 TODO)만 채우면 앱이 완전히 동작한다.
//   🟢 TODO 1 (Create): 추가할 때 '새 배열'을 만들어 넣는다.
//   🟢 TODO 2 (Delete): 그 항목만 뺀 '새 배열'을 만든다.
// 나머지(입력 controlled, 목록 렌더, 토글)는 이미 되어 있다.

export default function PracticeTodoEasy() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const nextId = useRef(1)

  // Create
  function addTodo() {
    const value = text.trim()
    if (value === '') return // 빈 값은 무시
    // 🟢 TODO 1: 아래 한 줄을 완성하자.
    //   지금 todos 뒤에 { id: nextId.current++, text: value, done: false } 를 붙인
    //   '새 배열'로 set 해야 한다.
    setTodos(todos) // ← 이 줄을 [...todos, 새항목] 형태로 바꾸자
    setText('')
  }

  // Update (완료 토글) — 이미 완성돼 있다.
  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  // Delete
  function deleteTodo(id) {
    // 🟢 TODO 2: id가 '다른' 항목만 남긴 새 배열로 set 하자. (filter 한 줄)
    setTodos(todos) // ← todos.filter(...) 로 바꾸자
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
