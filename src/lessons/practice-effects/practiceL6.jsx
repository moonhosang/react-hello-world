import { useState } from 'react'

// 🔴 처음부터 (다른 예시) — 클릭 수를 브라우저 탭 제목에 동기화
// 타이머 대신 '제목 동기화'로 useEffect+의존성을 한 번 더. 껍데기에서 처음부터.
//   TODO A: import에 useEffect를 더한다
//   TODO B: useEffect로 document.title = `클릭 ${count}` 를 count에 맞춘다 (의존성 [count])
//   TODO C: +1 버튼(이미 있음)로 count를 올려 제목이 따라오게

export default function PracticeTitleSync() {
  const [count, setCount] = useState(0)
  // TODO B: useEffect(() => { document.title = `클릭 ${count}` }, [count])
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b>클릭 {count}</b> — 지금은 탭 제목이 안 바뀐다(고쳐 보라)
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  )
}
