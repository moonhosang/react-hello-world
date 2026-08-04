import { useRef } from 'react'

// ✅ 정답 — ref로 DOM 포커스 + 리렌더 없는 클릭 수 세기
export default function SolutionFocusRef() {
  const inputRef = useRef(null)   // DOM 손잡이
  const clicksRef = useRef(0)     // 화면과 무관한 보관함

  const focus = () => inputRef.current.focus()
  const count = () => {
    clicksRef.current += 1 // 값만 바뀌고 화면은 다시 안 그려진다
    alert(`버튼을 ${clicksRef.current}번 눌렀다 (화면 리렌더 없음)`)
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input ref={inputRef} placeholder="여기에 커서가 가야 한다" style={{ padding: '6px 8px' }} />
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={focus}>입력창 포커스</button>
        <button className="chip" onClick={count}>클릭 수 세기</button>
      </div>
    </div>
  )
}
