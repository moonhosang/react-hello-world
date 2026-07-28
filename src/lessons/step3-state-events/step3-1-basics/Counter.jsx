import { useState } from 'react'

// 숫자를 세는 카운터 컴포넌트다.
// 이 컴포넌트는 "자기만의 상태(count)"를 가진다.
// useState()는 [현재값, 바꾸는함수]를 돌려준다.

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="card counter-card">
      <div className="file-label">📄 Counter.jsx</div>
      <div className="counter-value">{count}</div>
      <div className="button-row">
        {/* setCount로 바꿔야 화면이 다시 그려진다 */}
        <button onClick={() => setCount(count - 1)}>➖ 감소</button>
        <button onClick={() => setCount(0)}>🔄 초기화</button>
        <button onClick={() => setCount(count + 1)}>➕ 증가</button>
      </div>
    </div>
  )
}
