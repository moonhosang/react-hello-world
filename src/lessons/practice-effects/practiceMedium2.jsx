import { useState, useEffect } from 'react'

// 🟣 시작/멈춤 제어. 타이머·정리는 됐고, running으로 켜고 끄자.
// 할 일:
//   TODO 1: running이 아니면 타이머를 걸지 않는다 → 맨 위에 if (!running) return
//   TODO 2: 의존성 배열을 [running]으로 — running이 바뀔 때마다 다시 걸고/정리한다

export default function PracticeEffectsControl() {
  const [sec, setSec] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    // TODO 1: if (!running) return
    const id = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, []) // TODO 2: []를 [running]으로

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⏱️ {sec}초</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className={'chip' + (running ? ' on' : '')} onClick={() => setRunning((v) => !v)}>
          {running ? '멈춤' : '시작'}
        </button>
      </div>
      <div className="demo-desc" style={{ margin: '6px 0 0' }}>
        지금은 시작/멈춤과 무관하게 무조건 돈다. running으로 제어되게 고치자.
      </div>
    </div>
  )
}
