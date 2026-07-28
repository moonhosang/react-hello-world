import { useReducer, useState } from 'react'

// 할 일 목록(배열)을 useReducer로 관리한다.
// add / toggle / delete — 상태를 바꾸는 방법이 여러 개다.
// 이 모든 로직을 reducer 한 곳에 모으고, 화면은 action만 dispatch 한다.

let nextId = 4

// reducer는 순수 함수다.
// 배열을 직접 바꾸지 않고(push/splice ❌), 항상 "새 배열"을 return 한다.
function todoReducer(todos, action) {
  switch (action.type) {
    case 'add':
      // 새 항목을 붙인 새 배열을 만든다
      return [...todos, { id: nextId++, text: action.text, done: false }]
    case 'toggle':
      // 해당 항목만 done을 뒤집은 새 배열을 만든다
      return todos.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      )
    case 'delete':
      // 해당 항목만 뺀 새 배열을 만든다
      return todos.filter((t) => t.id !== action.id)
    default:
      return todos
  }
}

const initialTodos = [
  { id: 1, text: '리액트 컴포넌트 복습', done: true },
  { id: 2, text: 'useReducer 익히기', done: false },
  { id: 3, text: '할 일 앱 만들어 보기', done: false },
]

export default function TodoReducer() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)
  const [text, setText] = useState('')

  function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch({ type: 'add', text: trimmed }) // "추가해"라고만 보낸다
    setText('')
  }

  const doneCount = todos.filter((t) => t.done).length

  return (
    <div className="card">
      <div className="file-label">📄 TodoReducer.jsx</div>

      <div className="todo-input-row" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          placeholder="할 일을 적고 추가를 누른다"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>➕ 추가</button>
      </div>

      {todos.length === 0 ? (
        <p className="section-desc" style={{ margin: 0 }}>할 일이 없다. 하나 추가해 보자.</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todos.map((t) => (
            <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                className={'chip' + (t.done ? ' on' : '')}
                onClick={() => dispatch({ type: 'toggle', id: t.id })}
              >
                {t.done ? '✅' : '⬜'}
              </button>
              <span
                style={{
                  flex: 1,
                  textDecoration: t.done ? 'line-through' : 'none',
                  opacity: t.done ? 0.55 : 1,
                }}
              >
                {t.text}
              </span>
              <button className="chip" onClick={() => dispatch({ type: 'delete', id: t.id })}>
                🗑️ 삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="section-desc" style={{ margin: '12px 0 0' }}>
        전체 {todos.length}개 중 {doneCount}개 완료 · 세 가지 버튼이 전부{' '}
        <code>dispatch(...)</code> 한 줄이다.
      </p>
    </div>
  )
}
