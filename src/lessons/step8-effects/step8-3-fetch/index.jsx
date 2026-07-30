// 9-3 · 데이터 불러오기
// 마운트되면 데이터를 가져와 state에 넣는다. loading → data 두 상태로 관리한다.

import { useState, useEffect } from 'react'
import { fetchUsers } from '../../../lib/fakeApi.js'

export default function Step8_3() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // 불러오기 로직을 함수로 뺀다 → 마운트 시(useEffect)에도, 버튼 클릭 시에도 재사용한다.
  const load = () => {
    setLoading(true)
    fetchUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }

  // 마운트되면 자동으로 한 번 불러온다.
  useEffect(() => {
    load()
  }, [])

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-3</span>
        <h2>데이터 불러오기</h2>
        <p>마운트되면 데이터를 가져와 state에 넣는다. 로딩 상태도 함께 관리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>마운트되면 데이터를 가져와 loading → data 두 상태로 나눠 관리한다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          "화면이 뜨면 서버에서 목록을 가져온다"가 대표적인 부수 효과다.
          <b> loading → data</b> 두 상태로 관리한다. (여기선 네트워크 대신 가짜 API로 0.8초 지연을 흉내 낸다)
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 step8-3-fetch/index.jsx</div>
        <div className="button-row">
          <button className="chip on" onClick={load} disabled={loading}>
            {loading ? '⏳ 불러오는 중…' : '🔄 다시 불러오기'}
          </button>
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
        <h4>💡 알아두기</h4>
        <ul>
          <li>가져오기 전엔 <code>loading</code>을 true로, 받으면 데이터와 함께 false로.</li>
          <li>불러오기 로직을 <code>load()</code> 함수로 빼면, 마운트 시(<code>useEffect</code>)와 버튼 클릭에서 <b>같은 로직</b>을 재사용한다.</li>
          <li>불러오는 동안 버튼을 <code>disabled</code>로 막아 중복 요청을 방지한다.</li>
        </ul>
      </div>
    </section>
  )
}
