import { useState } from 'react'

// ✅ 정답 (다른 예시) — useCounter 커스텀 훅
// useState를 감싼 커스텀 훅을 만들어, 컴포넌트에서 한 줄로 재사용한다.
function useCounter(start = 0) {
  const [count, setCount] = useState(start)
  const increment = () => setCount((c) => c + 1)
  const reset = () => setCount(start)
  return { count, increment, reset }
}

export default function SolutionCounter() {
  const { count, increment, reset } = useCounter(0) // 반드시 최상위에서 호출
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🔢 {count}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={increment}>+1</button>
        <button className="chip" onClick={reset}>리셋</button>
      </div>
    </div>
  )
}
