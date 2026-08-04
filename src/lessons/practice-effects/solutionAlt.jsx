import { useState, useEffect } from 'react'

// ✅ 다른 예시 정답 — 클릭 수를 브라우저 탭 제목에 동기화 (useEffect + 의존성 [count])
export default function SolutionTitleSync() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `클릭 ${count}`
    return () => { document.title = '리액트 입문 커리큘럼' } // 떠날 때 원래 제목으로 정리
  }, [count])
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b>클릭 {count}</b> — 브라우저 탭 제목을 보라
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  )
}
