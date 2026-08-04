import { useState } from 'react'

// 🎯 처음부터 (다른 예시) — 검색어 지우기
// 같은 기술(useRef로 DOM 만지기)을 다른 예시로 한 번 더. 빈 화면에서 처음부터 만든다.
// 할 일:
//   TODO A: useRef를 import하고, const inputRef = useRef(null) 로 참조 상자를 만든다.
//   TODO B: <input>에 ref={inputRef} 로 연결한다. (value/onChange는 text state로)
//   TODO C: [지우기] 버튼 → setText('') 로 비우고 inputRef.current.focus() 로 다시 포커스.

export default function PracticeL6() {
  const [text, setText] = useState('')
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 '검색어 지우기'를 만들자 — 입력창 + [지우기] 버튼(비우고 다시 포커스)
    </div>
  )
}
