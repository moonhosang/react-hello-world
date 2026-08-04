import { useState } from 'react'
import TodoInput from './TodoInput.jsx'
import TodoList from './TodoList.jsx'

// 🟢 조립 쉬움 — 로직(state·추가·토글·삭제)은 이미 다 돼 있다. 너는 '배치·연결'만.
// 지금은 목록(TodoList)만 놓여 있고 '입력창'이 없다. 위에 입력창을 놓고 onAdd에 add를 연결하자.
export default function AssembleEasy() {
  // ── 로직(부모가 소유) — 건드리지 않는다 ──────────────────
  const [todos, setTodos] = useState([{ id: 1, text: '첫 할 일', done: false }])
  const add = (text) => setTodos([...todos, { id: todos.reduce((m, t) => Math.max(m, t.id), 0) + 1, text, done: false }])
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  // ── 조립(배치·연결) — 여기만 채운다 ──────────────────────
  return (
    <div className="demo-card">
      {/* 🟢 TODO: 여기에 입력창을 놓고 onAdd에 add를 연결한다 → <TodoInput onAdd={add} /> */}

      <TodoList todos={todos} onToggle={toggle} onDelete={remove} />
    </div>
  )
}
