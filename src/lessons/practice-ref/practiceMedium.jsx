import { useRef } from 'react'

// 🟡 중간 — ref를 입력창에 '연결'해야 포커스가 먹는다.
// 할 일: 아래 <input>에 ref={inputRef}를 붙인다. (포커스 로직은 이미 되어 있다)

export default function PracticeMedium() {
  const inputRef = useRef(null)

  const onFocus = () => {
    inputRef.current?.focus() // 연결만 되면 이 줄이 동작한다
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO: 아래 input에 ref={inputRef}를 붙여 실제 DOM을 담는다 */}
      <input placeholder="여기에 커서가 가야 한다" style={{ padding: '6px 8px' }} />
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={onFocus}>입력창 포커스</button>
      </div>
    </div>
  )
}
