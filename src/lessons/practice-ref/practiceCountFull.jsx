import { useRef } from 'react'

// 🟣 값 기억+ — 이번엔 보관함부터 직접 만든다. 포커스는 완성돼 있다.
// 할 일: 리렌더 없는 clicksRef 상자를 만들고(useRef(0)), count에서 값을 올려 alert로 보여준다.

export default function PracticeCountFull() {
  const inputRef = useRef(null)
  // TODO A: 클릭 수를 담을 '리렌더 없는' 상자를 만든다. (예: const clicksRef = useRef(0))

  const focus = () => inputRef.current.focus()
  const count = () => {
    // TODO B: clicksRef.current를 1 늘리고, alert로 누적 횟수를 보여준다.
    //   (state가 아니라 ref라서 값이 바뀌어도 화면은 다시 안 그려진다)
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
