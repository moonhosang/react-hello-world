import { useState, useEffect } from 'react'
import { fetchUser } from '../../../lib/fakeApi.js'

// 🪝 useUserFetch(userId) — userId에 맞는 사용자를 불러오는 커스텀 훅.
//
// 핵심은 의존성 배열 [userId]다:
//   userId가 바뀌면 effect가 '다시' 실행돼 새 사용자를 불러온다.
//   → 그래야 화면의 userId와 보여 주는 데이터가 '같은 사람'으로 맞는다(동기화).
//   만약 []로 두면 처음 userId만 불러오고, userId가 바뀌어도 데이터는 그대로라 어긋난다(오래된 값 버그).
export function useUserFetch(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true // 늦게 온 응답이 최신 상태를 덮어쓰지 않게 막는 표시
    setLoading(true)
    fetchUser(userId).then((u) => {
      if (!alive) return
      setUser(u)
      setLoading(false)
    })
    // 정리: userId가 또 바뀌면 이전 요청의 결과는 버린다
    return () => {
      alive = false
    }
  }, [userId]) // 👈 userId가 바뀔 때마다 다시 불러온다

  return { user, loading }
}
