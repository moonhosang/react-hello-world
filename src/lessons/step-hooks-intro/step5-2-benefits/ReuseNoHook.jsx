import { useState, useEffect } from 'react'
import { fetchUser } from '../../../lib/fakeApi.js'

// ❌ 훅 없이 — 같은 '불러오기 로직'을 컴포넌트마다 각각 복붙한다.
// ⏳ 로딩(0.8초) → 👤 이름·역할 순으로 표시된다.

const box = { padding: '8px 10px', margin: '6px 0', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 14 }

function ProfileCard({ id }) {
  // 🔴 사용자 불러오기 로직 (복붙 1)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true // 늦게 온 응답을 무시하는 경쟁상태 방지 플래그
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
  return (
    <div style={box}>
      🪪 ProfileCard · {loading ? '⏳ 불러오는 중…' : <b>👤 {user.name} · {user.role}</b>}
    </div>
  )
}

function CommentAuthor({ id }) {
  // 🔴 위 ProfileCard와 똑같은 로직을 또 복붙한다 (복붙 2)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
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
  return (
    <div style={box}>
      💬 CommentAuthor · {loading ? '⏳ 불러오는 중…' : <b>👤 {user.name} · {user.role}</b>}
    </div>
  )
}

export default function ReuseNoHook() {
  return (
    <>
      <ProfileCard id={1} />
      <CommentAuthor id={2} />
    </>
  )
}
