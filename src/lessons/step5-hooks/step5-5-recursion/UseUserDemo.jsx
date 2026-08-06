import { useState } from 'react'
import { useUser } from './useUser.js'

// 🪪 커스텀 훅을 쓰는 컴포넌트.
// 세 가지를 '따로' 보여준다:
//   (A) 렌더 지문   — 리렌더될 때마다 바뀐다 (이 컴포넌트·훅 본문이 다시 실행됐다는 증거)
//   (B) 불러온 사용자 — '그냥 리렌더'로는 안 바뀐다 (useState 유지)
//   (C) 실제 fetch 횟수 — userId가 바뀔 때만 늘어난다 (useEffect가 fakeApi를 deps로 제어)
export default function UseUserDemo() {
  const [, setTick] = useState(0) // 관계없는 state — '리렌더만' 유발
  const [userId, setUserId] = useState(1)

  const { user, loading, fetchCount } = useUser(userId) // 👈 이 컴포넌트가 커스텀 훅을 쓴다
  const fingerprint = Math.random().toFixed(3) // 리렌더마다 새로 찍힘

  return (
    <div>
      {/* (A) 매 렌더 바뀜 */}
      <div className="tree-box">
        🔁 <b>다시 실행됨</b> · 렌더 지문 <b style={{ color: 'var(--brand)' }}>{fingerprint}</b>
        <div className="demo-desc" style={{ margin: '2px 0 0' }}>리렌더될 때마다 이 컴포넌트와 그 안의 useUser() 본문이 다시 실행된다.</div>
      </div>

      {/* (B) userId 바뀔 때만 바뀜 */}
      <div className="tree-box leaf" style={{ marginTop: 6 }}>
        👤 <b>불러온 사용자</b> · {loading ? '⏳ 불러오는 중…' : <b>{user.name} · {user.role}</b>}
        <div className="demo-desc" style={{ margin: '2px 0 0' }}>‘그냥 리렌더’로는 안 바뀐다 — useState가 값을 기억한다.</div>
      </div>

      {/* (C) 실제 fetchUser 호출 횟수 — 진짜 fetch가 끝날 때만 +1 */}
      <div className="tree-box leaf" style={{ marginTop: 6 }}>
        📡 <b>실제 fetch 횟수: {fetchCount}</b>
        <div className="demo-desc" style={{ margin: '2px 0 0' }}>‘그냥 리렌더’엔 그대로, ‘다른 사용자’에만 +1 — useEffect가 deps([userId])로 막아 준다.</div>
      </div>

      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" onClick={() => setTick((t) => t + 1)}>🔁 그냥 리렌더</button>
        <button className="chip" onClick={() => setUserId((id) => (id % 3) + 1)} disabled={loading}>
          {loading ? '⏳ 불러오는 중…' : '👤 다른 사용자 (userId 변경)'}
        </button>
      </div>

      <p className="demo-desc" style={{ marginTop: 10 }}>
        <b>🔁 그냥 리렌더</b> → 위 <b>지문만</b> 바뀐다(훅 본문은 다시 실행). 사용자·fetch 횟수는 <b>그대로</b>다.{' '}
        <b>👤 다른 사용자</b> → userId가 바뀌어 실제 <b>fetch +1</b>(불러오는 동안 버튼이 <b>⏳</b>로 잠긴다), 새 사용자로 바뀐다.
      </p>
    </div>
  )
}
