import { useState } from 'react'

// 가짜 서버 — 0.8초 뒤에 이름을 돌려주는 Promise. 진짜 fetch도 모양은 같다.
const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// ✅ 정답 — 버튼을 누르면 async/await로 값을 '기다렸다가' 화면에 표시한다.
export default function SolutionAsyncLoader() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const name = await fakeFetch() // 값이 올 때까지 기다린다
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
