import { useState, useEffect } from 'react'

// 🟡 중간 — 1초마다 자동으로 오르는 타이머. 정리(cleanup)까지 채워야 한다.
// 할 일: setInterval로 매초 +1 하고, return으로 clearInterval을 돌려줘 정리한다.

export default function PracticeMedium() {
  const [sec, setSec] = useState(0)

  useEffect(() => {
    // TODO 1: 1초(1000ms)마다 sec를 1 늘리는 타이머를 건다.
    //   const id = setInterval(() => setSec((s) => s + 1), 1000)

    // TODO 2: 정리 함수를 돌려준다 — 타이머를 멈춘다.
    //   return () => clearInterval(id)
  }, [])

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⏱️ {sec}초</b>
      <div className="demo-desc" style={{ margin: '4px 0 0' }}>정리를 안 하면 이 컴포넌트가 사라진 뒤에도 타이머가 계속 돈다.</div>
    </div>
  )
}
