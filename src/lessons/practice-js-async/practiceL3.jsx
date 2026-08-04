import { useState } from 'react'

const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// 🔴 중간 — 값은 받아오는데 '로딩 표시'가 없다. 시작·끝에 loading을 켜고 끄자.
// (0.8초 기다리는 동안 "불러오는 중…"이 떠야 사용자가 안다.)
export default function PracticeL3() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    // 🔴 TODO A: 불러오기 시작 — setLoading(true)
    const name = await fakeFetch()
    setUser(name)
    // 🔴 TODO B: 불러오기 끝 — setLoading(false)
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
