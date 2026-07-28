import { useState } from 'react'

// 📐 '설계도' — Counter는 여기서 딱 한 번 정의한다.
// 자기만의 useState(count)를 가진 작은 카운터다.
function Counter({ label }) {
  const [count, setCount] = useState(0) // 👈 이 state는 '인스턴스마다' 따로 생긴다

  return (
    <button className="chip on" onClick={() => setCount(count + 1)}>
      {label} · 카운트 {count} ➕
    </button>
  )
}

// 같은 설계도(Counter)를 두 번 쓴다 — 사용처마다 '독립 인스턴스'가 생긴다.
// 그래서 🔴 A의 ➕를 눌러도 🔵 B의 숫자는 그대로다. 상태는 각자 것이다.
export default function InstanceDemo() {
  return (
    <div className="button-row">
      <Counter label="🔴 A" />
      <Counter label="🔵 B" />
    </div>
  )
}
