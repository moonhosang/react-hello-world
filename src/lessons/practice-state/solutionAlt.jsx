import { useState } from 'react'

// ✅ 정답 (다른 예시) — 조회수 카운터
// 좋아요 카드와 같은 '숫자 state + 이벤트'다. 소재만 다르다.
export default function SolutionViews() {
  const [views, setViews] = useState(0)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>👁️ {views}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={() => setViews((v) => v + 1)}>조회 +1</button>
        <button className="chip" onClick={() => setViews(0)}>리셋</button>
      </div>
    </div>
  )
}
