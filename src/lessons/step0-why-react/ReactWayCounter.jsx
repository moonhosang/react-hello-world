import { useState } from 'react'

// ✅ 이게 "리액트 방식(선언형·반응형)"이다.
// 나는 화면을 직접 건드리지 않는다. 오직 "상태(count)"만 바꾼다.
// 그러면 리액트가 알아서 화면의 해당 부분을 다시 그려준다.
//
//   - {count} 라고 써두면 → count가 바뀔 때마다 그 자리가 자동으로 갱신됨
//   - displayRef.textContent = ... 같은 "직접 조작"이 전혀 없다!

export default function ReactWayCounter() {
  const [count, setCount] = useState(0)

  return (
    <div className="card compare-card react">
      <div className="file-label">📄 ReactWayCounter.jsx</div>
      <span className="compare-tag">⚛️ 리액트 방식 (반응형)</span>
      {/* count 값을 그냥 꽂아두기만 하면 됨 → 바뀌면 자동으로 다시 그려짐 */}
      <div className="counter-value">{count}</div>
      <button onClick={() => setCount(count + 1)}>➕ 증가</button>
      <p className="compare-note">
        화면을 직접 안 건드린다. <code>setCount</code>로 <b>상태만</b> 바꾸면
        <code>{'{count}'}</code> 자리가 <b>알아서</b> 갱신된다.
      </p>
    </div>
  )
}
