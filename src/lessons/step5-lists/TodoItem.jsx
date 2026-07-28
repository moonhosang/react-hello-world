// 할 일 한 줄을 그리는 컴포넌트다.
// 자기 상태는 없고, props로 받은 것만 화면에 보여준다.
//   - todo     : { id, text, done }
//   - onToggle : 체크박스를 눌렀을 때 부모에게 알리는 함수
//   - onDelete : 삭제 버튼을 눌렀을 때 부모에게 알리는 함수
//
// 👉 이렇게 "함수도 props로 전달"할 수 있다.
//    실제 상태 변경은 부모(index.jsx)가 하고, 자식은 "눌렸다"고 알리기만 한다.

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={'todo-item' + (todo.done ? ' done' : '')}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span>{todo.text}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo.id)}>
        🗑️
      </button>
    </li>
  )
}
