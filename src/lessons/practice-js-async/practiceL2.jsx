import { useState } from 'react'

const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// 🟡 쉬움 — 값 받는 부분이 비어 있다. await로 값을 받아 화면에 넣자.
// (예전 방식은 fakeFetch().then(name => setUser(name)) 였다. 여기선 await로.)
export default function PracticeL2() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    // 🟡 TODO: fakeFetch()의 결과를 await로 받아 name에 담고, setUser(name)으로 화면에 넣는다.
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
