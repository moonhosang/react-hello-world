import { useState } from 'react'

const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// 🟣 어려움 — load 함수가 통째로 비어 있다. async 흐름을 직접 쓰자.
// 순서: 로딩 켜기 → await로 값 받기 → 화면에 넣기 → 로딩 끄기.
export default function PracticeL4() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    // 🟣 TODO: setLoading(true) → const name = await fakeFetch() → setUser(name) → setLoading(false)
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <button className="chip on" disabled={loading} onClick={load}>
        {loading ? '⏳ 불러오는 중…' : '불러오기'}
      </button>
      <p style={{ marginTop: 8 }}>{user ? `👤 ${user}` : '(아직 없음)'}</p>
    </div>
  )
}
