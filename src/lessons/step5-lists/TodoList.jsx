import TodoItem from './TodoItem.jsx'

// 할 일 목록 전체를 그리는 컴포넌트다.
//   - todos    : 할 일 배열
//   - onToggle, onDelete : 각 항목에 그대로 넘겨줄 함수들
//
// 핵심 2가지:
//   1) 배열은 .map()으로 그린다
//   2) map으로 만든 요소에는 반드시 고유한 key를 준다

export default function TodoList({ todos, onToggle, onDelete }) {
  // 조건부 렌더링: 비어 있으면 안내 문구를 대신 보여준다.
  if (todos.length === 0) {
    return <p className="empty">할 일이 없다. 하나 추가해 보자! 🎉</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
