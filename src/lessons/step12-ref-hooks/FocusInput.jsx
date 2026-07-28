import { useRef } from 'react'

// useRef의 대표 쓰임 ① — 진짜 DOM 요소를 직접 만지기.
// 1) const inputRef = useRef(null) 로 '상자'를 만든다.
// 2) <input ref={inputRef} /> 로 그 상자에 실제 DOM을 담는다.
// 3) 이벤트에서 inputRef.current 로 DOM에 접근해 focus() 같은 걸 호출한다.
export default function FocusInput() {
  const inputRef = useRef(null)

  const focusInput = () => {
    // current 안에 실제 <input> DOM이 들어 있다.
    inputRef.current.focus()
  }

  const clearInput = () => {
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <div className="card">
      <div className="file-label">📄 FocusInput.jsx</div>
      <p style={{ marginTop: 0 }}>아래 버튼을 누르면 입력칸으로 커서가 '점프'한다.</p>
      <input ref={inputRef} placeholder="여기에 입력…" style={{ padding: '8px 10px', width: '100%', boxSizing: 'border-box' }} />
      <div className="button-row" style={{ marginTop: 10 }}>
        <button onClick={focusInput}>🎯 입력칸에 포커스</button>
        <button onClick={clearInput}>🧹 비우고 포커스</button>
      </div>
      <p className="section-desc" style={{ marginTop: 10, marginBottom: 0 }}>
        state로는 "커서를 옮겨라" 같은 명령을 못 한다. 이런 <b>DOM 직접 조작</b>이 ref의 몫이다.
      </p>
    </div>
  )
}
