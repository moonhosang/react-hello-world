import { useState, useEffect } from 'react'

// ✅ 정답 — 시작/멈춤 타이머 (useEffect로 setInterval 시작 + clearInterval 정리)
export default function SolutionTimer() {
  const [running, setRunning] = useState(false)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    if (!running) return // 멈춤 상태면 타이머를 걸지 않는다
    const id = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(id) // 정리 — running이 바뀌거나 사라질 때 타이머를 멈춘다
  }, [running])

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⏱️ {sec}초</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className={'chip' + (running ? ' on' : '')} onClick={() => setRunning((v) => !v)}>
          {running ? '멈춤' : '시작'}
        </button>
        <button className="chip" onClick={() => setSec(0)}>리셋</button>
      </div>
    </div>
  )
}
