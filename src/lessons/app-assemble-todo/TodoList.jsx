import TodoItem from '../../checkpoints/checkpointC-todo/TodoItem.jsx'

// 완성된 조각 — 목록. 받은 todos를 map+key로 그리고, 각 줄은 TodoItem이 그린다.
// todos·onToggle·onDelete를 '연결 안 하면' 빈 목록으로 안전하게 렌더된다(조립 전 상태).
export default function TodoList({ todos = [], onToggle, onDelete }) {
  if (todos.length === 0) return <p className="demo-desc" style={{ margin: '8px 0 0' }}>할 일이 없다. 하나 추가해 보자 📝</p>
  return (
    <ul className="plain-list" style={{ paddingLeft: 0 }}>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
