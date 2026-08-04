import { useState } from 'react'

// 가짜 서버 — 각 0.6초 뒤 값을 준다. (그대로 두고 쓰면 된다)
const fetchName = () => new Promise((r) => setTimeout(() => r('김코딩'), 600))
const fetchGreeting = (name) => new Promise((r) => setTimeout(() => r(`${name}님, 환영합니다`), 600))

// 🔴 처음부터 (다른 예시) — await를 '두 번 이어' 순서대로 두 값을 받는다.
// 할 일:
//   TODO A: const [msg, setMsg] = useState(null); const [loading, setLoading] = useState(false)
//   TODO B: async load — setLoading(true) → const name = await fetchName()
//           → const greeting = await fetchGreeting(name) → setMsg(greeting) → setLoading(false)
//   TODO C: 버튼(onClick=load, loading이면 '⏳ 불러오는 중…')과 결과(💬 {msg})
export default function PracticeL6() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 '인사 받기' 버튼을 만들자
    </div>
  )
}
