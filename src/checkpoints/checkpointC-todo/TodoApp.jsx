import { useState, useEffect } from 'react'
import TodoItem from './TodoItem.jsx'

// ✅ 할 일 관리 앱 (CRUD + 필터 + 저장) — 라이브 데모
//   - Create : controlled input으로 입력받아 배열에 새 항목을 넣는다 (빈 값은 무시)
//   - Read   : 배열을 map + key로 렌더하고, 개수를 보여준다
//   - Update : 체크박스/클릭으로 done을 토글한다 (map으로 새 배열)
//   - Delete : ✕ 버튼으로 항목을 뺀다 (filter로 새 배열)
//   - 필터   : 전체/미완료/완료 — 원본은 그대로 두고 '보여줄 것만' 골라 렌더한다(파생 값)
//   - 저장   : localStorage에 저장해 새로고침해도 남는다
const STORAGE_KEY = 'checkpointC-todos'
const DEFAULT_TODOS = [
  { id: 1, text: '리액트 state 복습하기', done: true },
  { id: 2, text: '할 일 앱 직접 만들어 보기', done: false },
]

export default function TodoApp() {
  // 초기값을 localStorage에서 읽는다(lazy initializer — 처음 한 번만 실행).
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_TODOS
    } catch {
      return DEFAULT_TODOS
    }
  })
  const [text, setText] = useState('') // 입력창 값(controlled input)
  const [filter, setFilter] = useState('all') // 현재 필터 상태: all | active | done

  // todos가 바뀔 때마다 localStorage에 저장한다.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Create — 새 배열을 만들어 넣는다. id는 기존 최댓값 + 1로 안전하게.
  function addTodo() {
    const value = text.trim()
    if (value === '') return // 빈 값은 무시
    const nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1
    setTodos([...todos, { id: nextId, text: value, done: false }])
    setText('')
  }

  // Update — 해당 id만 done을 뒤집은 '새 배열'
  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  // Delete — 해당 id를 뺀 '새 배열'
  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  // 남은 일 개수 — state로 두지 않고 todos에서 매 렌더 계산한다(파생 값).
  const remaining = todos.filter((t) => !t.done).length

  // 필터는 원본을 바꾸지 않고, 보여줄 것만 고른 '파생 목록'이다.
  const visible = todos.filter((t) =>
    filter === 'active' ? !t.done : filter === 'done' ? t.done : true
  )

  // 필터 버튼 목록 — key와 화면 라벨을 묶어 map으로 그린다.
  const FILTERS = [
    { key: 'all', label: '전체' },
    { key: 'active', label: '미완료' },
    { key: 'done', label: '완료' },
  ]

  return (
    <div className="demo-card">
      {/* Create: 폼 제출(Enter) 또는 버튼 */}
      <form
        className="shop-input"
        onSubmit={(e) => {
          e.preventDefault() // 새로고침 막기
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

      {/* 필터 버튼 */}
      <div className="button-row" style={{ margin: '4px 0 8px' }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? 'chip on' : 'chip'}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Read: 개수 표시 */}
      <p className="demo-desc" style={{ marginBottom: 10 }}>
        전체 {todos.length}개 · 남은 일 {remaining}개 · 보이는 항목 {visible.length}개
      </p>

      {/* Read: map + key로 '보이는 목록'만 렌더 */}
      {visible.length === 0 ? (
        <p className="demo-desc">
          {todos.length === 0 ? '할 일이 없다. 하나 추가해 보자 📝' : '이 필터에 해당하는 할 일이 없다.'}
        </p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0 }}>
          {visible.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
