import { useRef } from 'react'

// 🔴 어려움 — 처음부터 만든다.
// 할 일:
//   TODO A: inputRef(useRef)로 input을 참조한다.
//   TODO B: '포커스' 버튼을 누르면 inputRef.current.focus().
//   TODO C: clicksRef(useRef)로 클릭 수를 세되, 화면 리렌더 없이 alert로 보여준다.

export default function PracticeHard() {
  // TODO A: const inputRef = useRef(null)
  // TODO C: const clicksRef = useRef(0)

  // TODO B: const focus = () => inputRef.current.focus()
  // TODO C: const count = () => { clicksRef.current += 1; alert(...) }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO A: <input ref={inputRef} ... />  ·  TODO B·C: 버튼 두 개 */}
      여기에 input과 버튼(포커스·클릭 수 세기)을 만들자
    </div>
  )
}
