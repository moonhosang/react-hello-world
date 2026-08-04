import { useState } from 'react'

const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// 🟢 아주 쉬움 — 거의 다 됐다. 딱 한 곳에 await만 붙이면 이름이 뜬다.
// 지금은 await가 없어서 name에 '값'이 아니라 아직 안 온 상자(Promise)가 담긴다.
export default function PracticeL1() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const name = fakeFetch() // 🟢 TODO: fakeFetch() 앞에 await를 붙여 '값'을 기다린다
    setUser(name)
    setLoading(false)
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
