import { useState } from 'react'
import TodoInput from './TodoInput.jsx'
import TodoList from './TodoList.jsx'

// 🟡 조립 중간 — 조각은 놓여 있는데 '연결'이 안 됐다. props·콜백을 이어 데이터를 흐르게 하자.
// 지금은 <TodoInput />·<TodoList />가 값 없이 놓여 있어, 추가도 목록도 동작하지 않는다.
export default function AssembleMedium() {
  // ── 로직(부모가 소유) — 건드리지 않는다 ──────────────────
  const [todos, setTodos] = useState([{ id: 1, text: '첫 할 일', done: false }])
  const add = (text) => setTodos([...todos, { id: todos.reduce((m, t) => Math.max(m, t.id), 0) + 1, text, done: false }])
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  // ── 조립(연결) — 아래 props/콜백을 채운다 ────────────────
  return (
    <div className="demo-card">
      {/* 🟡 TODO 1: 입력창의 onAdd에 add를 연결한다 */}
      <TodoInput /* onAdd={?} */ />

      {/* 🟡 TODO 2: 목록에 todos를 내려 주고, onToggle·onDelete에 toggle·remove를 연결한다 */}
      <TodoList /* todos={?} onToggle={?} onDelete={?} */ />
    </div>
  )
}
