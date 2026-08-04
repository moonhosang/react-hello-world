import { useState } from 'react'
import TodoInput from './TodoInput.jsx'
import TodoList from './TodoList.jsx'

// ✅ 정답 — 조립 완성본. 부모(TodoBoard)가 state를 소유하고,
//   입력창엔 onAdd로 add를, 목록엔 todos·onToggle·onDelete를 연결했다. (데이터 흐름 완성)
export default function SolutionAssembly() {
  const [todos, setTodos] = useState([{ id: 1, text: '첫 할 일', done: false }])
  const add = (text) => setTodos([...todos, { id: todos.reduce((m, t) => Math.max(m, t.id), 0) + 1, text, done: false }])
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="demo-card">
      <TodoInput onAdd={add} />
      <p className="demo-desc" style={{ margin: '8px 0' }}>전체 {todos.length}개 · 남은 일 {remaining}개</p>
      <TodoList todos={todos} onToggle={toggle} onDelete={remove} />
    </div>
  )
}
