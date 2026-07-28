import { useState, useEffect } from 'react'
import { fetchUser } from '../../../lib/fakeApi.js'

// ✅ 훅으로 — 그 불러오기 로직을 커스텀 훅 한 곳에 모은다.
// use로 시작하고 안에서 useState·useEffect를 쓴다 → 이것이 '커스텀 훅'이다.

const box = { padding: '8px 10px', margin: '6px 0', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 14 }

// 불러오기 로직은 이 '한 곳'에만 있다
function useFetchUser(id) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true // 경쟁상태 방지: 늦게 온 응답이 최신 상태를 덮어쓰지 않게 한다
    setLoading(true)
    fetchUser(id).then((u) => {
      if (alive) {
        setUser(u)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [id])
  return { user, loading }
}

function ProfileCard({ id }) {
  const { user, loading } = useFetchUser(id) // 한 줄로 재사용
  return (
    <div style={box}>
      🪪 ProfileCard · {loading ? '⏳ 불러오는 중…' : <b>👤 {user.name} · {user.role}</b>}
    </div>
  )
}

function CommentAuthor({ id }) {
  const { user, loading } = useFetchUser(id) // 한 줄로 재사용
  return (
    <div style={box}>
      💬 CommentAuthor · {loading ? '⏳ 불러오는 중…' : <b>👤 {user.name} · {user.role}</b>}
    </div>
  )
}

export default function ReuseWithHook() {
  return (
    <>
      <ProfileCard id={1} />
      <CommentAuthor id={2} />
    </>
  )
}
