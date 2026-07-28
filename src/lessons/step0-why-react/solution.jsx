import { useState } from 'react'

export default function SolutionCounter() {
  const [count, setCount] = useState(0)
  return (
    <div className="demo-card center">
      <div className="demo-emoji">{count}</div>
      <button onClick={() => setCount(count + 1)}>➕ 증가</button>
    </div>
  )
}
