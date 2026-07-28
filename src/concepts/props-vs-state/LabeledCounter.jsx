import { useState } from 'react'

// 한 컴포넌트 안에서 props와 state를 둘 다 쓴다.
//   - label : 부모가 준 값 (props). 이 컴포넌트는 못 바꾼다 — 읽기만 한다.
//   - count : 스스로 가진 값 (state). 버튼으로 직접 바꾼다.

export default function LabeledCounter({ label }) {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-card center">
      <div className="pvs-label">{label}</div> {/* props: 부모가 정해줌 */}
      <div className="demo-emoji">{count}</div> {/* state: 내가 바꿈 */}
      <div className="button-row">
        <button onClick={() => setCount(count - 1)}>➖</button>
        <button onClick={() => setCount(count + 1)}>➕</button>
      </div>
    </div>
  )
}
