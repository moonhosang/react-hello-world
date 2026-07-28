import { useState, useRef } from 'react'

// 🔴 어려움 — 할 일 관리 앱 (CRUD)
// UI 껍데기만 있다. 상태·add·toggle·delete·목록 렌더를 거의 다 직접 만든다.
//
// 할 일:
//   1) 상태  : todos(배열), text(입력값). id는 useRef 카운터로 안전하게.
//   2) Create: 빈 값은 무시하고, '새 배열'로 새 항목을 추가한다. 추가 후 입력창 비우기.
//   3) Read  : todos.map으로 목록을 그린다(key 필수) + 개수 표시.
//   4) Update: 체크박스/클릭으로 done을 토글한다(map으로 새 배열).
//   5) Delete: ✕로 그 항목을 뺀다(filter로 새 배열).
// 규칙: 상태는 언제나 '새 배열'로 set 한다(불변성).

export default function PracticeTodoHard() {
  // 🔴 TODO 1: 상태를 선언하자.
  //   const [todos, setTodos] = useState([])
  //   const [text, setText] = useState('')
  //   const nextId = useRef(1)
  const todos = [] // ← 위 useState로 교체하자
  const text = '' // ← 위 useState로 교체하자

  // 🔴 TODO 2 (Create): 빈 값 무시 → { id, text, done:false }를 새 배열로 추가 → 입력창 비우기
  function addTodo() {
    // 여기를 채우자
  }

  // 🔴 TODO 4 (Update): id가 같은 항목만 done을 뒤집은 새 배열로 set
  function toggleTodo(id) {
    // 여기를 채우자
  }

  // 🔴 TODO 5 (Delete): id가 다른 항목만 남긴 새 배열로 set
  function deleteTodo(id) {
    // 여기를 채우자
  }

  return (
    <div className="demo-card">
      {/* Create: 입력창을 controlled로 만들고(value/onChange), 제출 시 addTodo 호출 */}
      <form
        className="shop-input"
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}
      >
        {/* 🔴 TODO 2: value={text} 와 onChange 를 연결하자 */}
        <input placeholder="할 일을 입력" />
        <button type="submit">추가</button>
      </form>

      {/* 🔴 TODO 3: 전체/남은 개수를 실제 값으로 표시하자 */}
      <p className="demo-desc" style={{ marginBottom: 10 }}>전체 0개</p>

      {/* 🔴 TODO 3·4·5: todos.map으로 목록 + 체크박스 토글 + ✕ 삭제 (아래는 자리표시자) */}
      <ul className="plain-list" style={{ paddingLeft: 0 }}>
        <li style={{ listStyle: 'none' }}>여기에 할 일 목록이 나오게 하자</li>
      </ul>
    </div>
  )
}
