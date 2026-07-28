import { useState } from 'react'

// ⚠️ 연속 setState 함정
// setCount(count + 1)을 세 번 해도 +1만 오른다.
// 이유: 한 번의 이벤트가 처리되는 동안 count는 '같은 값(스냅샷)'으로 고정돼 있다.
// 해결: 이전 값을 받는 '함수형 업데이트' setCount(c => c + 1)를 쓴다.

export default function TrapCounter() {
  const [count, setCount] = useState(0)

  function wrong() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1) // 셋 다 같은 count(스냅샷)를 봐서 결국 +1
  }

  function right() {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1) // 각자 '직전 값'을 받아 +3
  }

  return (
    <div className="card counter-card">
      <div className="file-label">📄 TrapCounter.jsx</div>
      <div className="counter-value">{count}</div>
      <div className="button-row">
        <button onClick={wrong}>❌ +3 (count + 1 세 번)</button>
        <button onClick={right}>✅ +3 (함수형 업데이트)</button>
        <button onClick={() => setCount(0)}>🔄</button>
      </div>
      <p className="demo-desc">
        ❌ 버튼은 <b>+1</b>만 오른다. ✅ 버튼(<code>c =&gt; c + 1</code>)은 <b>+3</b>. 눌러서 차이를 보자.
      </p>
    </div>
  )
}
