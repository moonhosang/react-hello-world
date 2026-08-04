import { useRef } from 'react'

// 🟢 쉬움 — 버튼을 누르면 입력창에 포커스가 가게 하자.
// 할 일: onFocus의 TODO 한 줄만 채운다. ref는 이미 <input>에 연결돼 있다.

export default function PracticeEasy() {
  const inputRef = useRef(null)

  const onFocus = () => {
    // TODO: 입력창에 포커스를 준다. (예: inputRef.current.focus())
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input ref={inputRef} placeholder="여기에 커서가 가야 한다" style={{ padding: '6px 8px' }} />
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={onFocus}>입력창 포커스</button>
      </div>
    </div>
  )
}
