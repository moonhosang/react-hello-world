import { useRef } from 'react'

// 🔴 값 기억 — 리렌더 없는 값(clicksRef)을 직접 다뤄 보자.
// 포커스는 완성돼 있다. count의 TODO만 채워, 클릭할 때마다 화면 변화 없이 누적 횟수를 alert로 보여준다.

export default function PracticeCount() {
  const inputRef = useRef(null)
  const clicksRef = useRef(0) // 화면과 무관한 보관함 (이미 만들어 뒀다)

  const focus = () => inputRef.current.focus()
  const count = () => {
    // TODO: clicksRef.current를 1 늘리고, alert로 누적 횟수를 보여준다.
    //   힌트: clicksRef.current += 1; alert(`버튼을 ${clicksRef.current}번 눌렀다 (리렌더 없음)`)
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
