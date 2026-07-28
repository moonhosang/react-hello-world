// 할 일 한 줄을 그리는 컴포넌트.
// - 완료 여부(done)에 따라 취소선 등 시각 표시를 바꾼다.
// - 토글/삭제는 직접 하지 않고, 부모가 넘겨준 함수(onToggle·onDelete)를 호출한다.
//   (자식은 "무엇을 할지"만 알리고, 상태 변경은 상태를 가진 부모가 한다)

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 0',
        listStyle: 'none',
      }}
    >
      {/* 체크박스: done을 반영(checked)하고, 바꾸면 부모의 토글을 호출한다 */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ width: 'auto', margin: 0, cursor: 'pointer' }}
      />

      {/* 할 일 텍스트: 클릭해도 토글되고, done이면 취소선·흐리게 표시한다 */}
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          flex: 1,
          cursor: 'pointer',
          textDecoration: todo.done ? 'line-through' : 'none',
          opacity: todo.done ? 0.5 : 1,
        }}
      >
        {todo.text}
      </span>

      {/* 삭제 버튼: 부모의 삭제 함수에 이 항목 id를 넘긴다 */}
      <button className="mini-del" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </li>
  )
}
