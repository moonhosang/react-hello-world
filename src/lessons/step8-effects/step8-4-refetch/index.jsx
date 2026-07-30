// 9-4 · 값이 바뀌면 다시 불러오기 (+ 흔한 실수)
// 의존성 배열에 넣은 값(category)이 바뀌면 effect가 다시 실행된다.

import { useState, useEffect } from 'react'
import { fetchUsers, fetchUser } from '../../../lib/fakeApi.js'

export default function Step8_4() {
  const [category, setCategory] = useState('all')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0) // 같은 카테고리라도 강제로 다시 불러오기용

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchUsers(category).then((data) => {
      if (!alive) return
      setUsers(data)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [category, refreshKey]) // category나 refreshKey가 바뀌면 다시 불러온다

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-4</span>
        <h2>값이 바뀌면 다시 불러오기</h2>
        <p>의존성 배열에 넣은 값이 바뀌면 effect가 다시 실행된다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>의존성 배열에 넣은 값이 바뀌면 effect가 다시 실행돼 데이터를 자동으로 다시 불러온다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          <code>[category]</code>를 의존성으로 두면, 카테고리를 바꿀 때마다 자동으로 다시 불러온다.
        </p>
      </div>

      <h3 className="section-title">① 카테고리가 바뀌면 목록 다시 불러오기</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성 <code>[category]</code>가 바뀌면 목록을 자동으로 다시 가져온다</span>
      <div className="card">
        <div className="file-label">📄 step8-4-refetch/index.jsx</div>
        <div className="button-row">
          {['all', 'frontend', 'backend'].map((c) => (
            <button key={c} className={category === c ? 'chip on' : 'chip'} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
          <button className="chip" onClick={() => setRefreshKey((k) => k + 1)}>🔄 강제 새로고침</button>
        </div>
        {loading ? (
          <p className="demo-desc">⏳ 불러오는 중…</p>
        ) : (
          <ul className="plain-list">
            {users.map((u) => (
              <li key={u.id}>{u.name} · {u.role}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="try-it">
        <h4>🤔 왜 <code>all</code>을 다시 눌러도 안 불러올까?</h4>
        <ul>
          <li>effect는 "클릭"이 아니라 <b>의존성 값의 변화</b>에 반응한다. <code>all</code>인 상태에서 <code>all</code>을 또 누르면 <code>category</code>가 그대로라, 의존성 <code>[category]</code>가 안 바뀌어 effect가 다시 안 돈다. (게다가 같은 값으로 <code>setState</code>하면 리렌더조차 생략된다)</li>
          <li>같은 값이어도 강제로 다시 부르려면, <b>일부러 바뀌는 값</b>을 의존성에 넣는다 → <code>refreshKey</code>를 <code>+1</code> 하는 <b>🔄 강제 새로고침</b> 버튼. 의존성이 <code>[category, refreshKey]</code>라 매번 값이 달라져 다시 불러온다.</li>
        </ul>
      </div>

      <h3 className="section-title">② userId로 사용자 카드 불러오기</h3>
      <span className="learn-tag">📎 학습 포인트 · <code>userId</code>를 prop으로 받아 <code>[userId]</code>가 바뀔 때마다 그 사람을 다시 fetch한다</span>
      <p className="section-desc">
        버튼으로 <code>userId</code>를 바꾸면, <code>UserCard</code>의 effect가 다시 돌아 해당 사용자를 목업 API로 불러온다.
      </p>
      <div className="card">
        <div className="file-label">📄 step8-4-refetch/index.jsx · fetchUser(userId)</div>
        <div className="button-row">
          {[1, 2, 3].map((id) => (
            <button key={id} className={userId === id ? 'chip on' : 'chip'} onClick={() => setUserId(id)}>
              userId {id}
            </button>
          ))}
        </div>
        <UserCard userId={userId} />
      </div>

      <div className="try-it warn-box">
        <h4>❌ 흔한 실수</h4>
        <ul>
          <li>의존성에 <code>category</code>를 <b>빠뜨리면</b> 바꿔도 다시 안 불러온다.</li>
          <li>effect 안에서 매번 새 값을 만들어 그걸 의존성에 넣으면 <b>무한 루프</b>가 된다.</li>
        </ul>
      </div>
    </section>
  )
}

// userId를 prop으로 받아, 그 사람을 목업 API로 불러오는 카드.
// [userId]가 바뀌면 effect가 다시 실행돼 새 사람을 가져온다.
function UserCard({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchUser(userId).then((data) => {
      if (!alive) return // 불러오는 사이 userId가 또 바뀌면 옛 응답은 버린다
      setUser(data)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [userId]) // userId가 바뀔 때마다 다시 불러온다

  if (loading) return <p className="demo-desc">⏳ userId {userId} 불러오는 중…</p>
  return (
    <div className="tree-box leaf" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 28 }}>{user.emoji}</span>
      <div>
        <div><b>{user.name}</b> · {user.role}</div>
        <div className="demo-desc" style={{ margin: 0 }}>{user.bio}</div>
      </div>
    </div>
  )
}
