import { useState } from 'react'

// 가짜 서버 — 각 0.6초 뒤 값을 준다.
const fetchName = () => new Promise((r) => setTimeout(() => r('김코딩'), 600))
const fetchGreeting = (name) => new Promise((r) => setTimeout(() => r(`${name}님, 환영합니다`), 600))

// ✅ 정답 (다른 예시) — await를 '두 번 이어' 순서대로 두 값을 받는다.
export default function SolutionTwoAwaits() {
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const name = await fetchName() // 1) 먼저 이름을 기다린다
    const greeting = await fetchGreeting(name) // 2) 그 이름으로 인사말을 기다린다
    setMsg(greeting)
    setLoading(false)
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <button className="chip on" onClick={load} disabled={loading}>
        {loading ? '⏳ 불러오는 중…' : '인사 받기'}
      </button>
      {msg && <p style={{ marginTop: 8 }}>💬 {msg}</p>}
    </div>
  )
}
