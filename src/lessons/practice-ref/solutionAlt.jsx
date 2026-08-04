import { useRef, useState } from 'react'

// ✅ 정답 (다른 예시) — 검색어 지우기
// useRef로 input을 참조해, [지우기]를 누르면 값을 비우고 다시 포커스한다.
export default function SolutionClearInput() {
  const inputRef = useRef(null)
  const [text, setText] = useState('')

  const clear = () => {
    setText('')
    inputRef.current.focus() // 진짜 DOM을 직접 만진다
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="검색어"
        style={{ padding: '6px 8px' }}
      />
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={clear}>지우기</button>
      </div>
    </div>
  )
}
