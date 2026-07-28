import { useState, useEffect } from 'react'
import { fetchUser } from '../../../lib/fakeApi.js'

// 🪝 커스텀 훅 — 사용자 정보를 불러오는 로직을 한 곳에 모은다.
// 이 훅을 부른 컴포넌트가 '리렌더될 때마다' 이 함수 본문도 함께 '다시 실행'된다.
// 다만 🎯 useState(user/loading)는 값을 '기억'하고, ⏱️ useEffect는 deps([userId])로 실행을 '제어'한다.
// 그래서 그냥 리렌더로는 다시 안 불러오고, userId가 바뀔 때만 실제로 fetchUser가 돈다.
export function useUser(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchCount, setFetchCount] = useState(0) // 📡 실제로 불러온 횟수 (fakeApi 호출이 끝날 때만 +1)

  useEffect(() => {
    let alive = true // 늦게 온 응답이 최신 상태를 덮지 않게 하는 경쟁상태 방지
    setLoading(true)
    fetchUser(userId).then((u) => {
      if (!alive) return
      setUser(u)
      setLoading(false)
      setFetchCount((c) => c + 1) // ← 진짜 fetch가 완료됐을 때만 센다
    })
    return () => {
      alive = false
    }
  }, [userId]) // 👈 userId가 바뀔 때만 fetchUser가 다시 돈다 (그냥 리렌더로는 안 돈다)

  return { user, loading, fetchCount }
}
