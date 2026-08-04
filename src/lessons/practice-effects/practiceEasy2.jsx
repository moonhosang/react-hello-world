import { useState, useEffect } from 'react'

// 🟢+ 정리(cleanup)만 채우자. 타이머는 이미 걸려 있다.
// 할 일: return으로 clearInterval을 돌려줘, 컴포넌트가 사라질 때 타이머를 멈춘다.

export default function PracticeEffectsCleanup() {
  const [sec, setSec] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000) // 이미 완성 — 매초 +1
    // TODO: 여기서 정리 함수를 돌려준다 → return () => clearInterval(id)
  }, [])

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⏱️ {sec}초</b>
      <div className="demo-desc" style={{ margin: '4px 0 0' }}>
        타이머는 돈다. 정리를 안 하면 사라진 뒤에도 계속 돈다 — return으로 멈춰 주자.
      </div>
    </div>
  )
}
