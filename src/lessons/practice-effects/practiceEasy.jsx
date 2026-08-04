import { useState, useEffect } from 'react'

// 🟢 쉬움 — useEffect로 브라우저 탭 제목을 count에 동기화하자.
// 할 일: useEffect의 의존성 배열만 채운다. count가 바뀔 때마다 다시 실행돼야 한다.

export default function PracticeEasy() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `클릭 ${count}`
    // TODO: 아래 의존성 배열을 채운다. count가 바뀔 때마다 제목을 다시 맞춰야 한다.
  }) // ← 지금은 배열이 없어 매 렌더마다 실행된다. [count]로 바꾸자.

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>클릭 {count}</b>
      <div className="demo-desc" style={{ margin: '4px 0 0' }}>👆 브라우저 탭 제목을 확인해 보라.</div>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  )
}
