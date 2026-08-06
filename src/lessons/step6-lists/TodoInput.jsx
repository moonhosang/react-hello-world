import { useState } from 'react'

// 할 일을 입력받는 컴포넌트다.
// 입력창의 글자는 "이 컴포넌트만의 상태(input)"로 관리한다.
//   - onAdd : 추가 버튼(또는 엔터)을 눌렀을 때 부모에게 텍스트를 전달하는 함수
//
// 👉 입력값은 여기서 관리하지만, "할 일 목록"은 부모가 관리한다.
//    그래서 다 입력하면 onAdd(text)로 부모에게 넘겨준다.

export default function TodoInput({ onAdd }) {
  const [input, setInput] = useState('')

  function handleAdd() {
    const text = input.trim()
    if (text === '') return // 빈 값이면 무시
    onAdd(text) // 부모에게 전달
    setInput('') // 입력창 비우기
  }

  return (
    <div className="todo-input-row">
      <input
        value={input}
        placeholder="할 일을 입력하세요"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd() // 엔터로도 추가
        }}
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  )
}
