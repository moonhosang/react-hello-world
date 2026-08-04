import { useState } from 'react'
import TodoInput from './TodoInput.jsx'
import TodoList from './TodoList.jsx'

// 🔴 조립 어려움 — 조각(TodoInput·TodoList)과 로직은 다 있다. return을 '처음부터' 조립하자.
export default function AssembleHard() {
  // ── 로직(부모가 소유) — 건드리지 않는다 ──────────────────
  const [todos, setTodos] = useState([{ id: 1, text: '첫 할 일', done: false }])
  const add = (text) => setTodos([...todos, { id: todos.reduce((m, t) => Math.max(m, t.id), 0) + 1, text, done: false }])
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  // ── 조립 — 여기를 처음부터 만든다 ────────────────────────
  return (
    <div className="demo-card">
      {/* 🔴 TODO: TodoInput과 TodoList를 놓고, 위 add·toggle·remove·todos를 props/콜백으로 전부 연결한다 */}
      여기에 입력창과 목록을 조립하자
    </div>
  )
}
