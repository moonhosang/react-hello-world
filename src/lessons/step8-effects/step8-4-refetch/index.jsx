// 9-5 · 값이 바뀌면 다시 불러오기 (+ 흔한 실수)
// 의존성 배열에 넣은 값(category)이 바뀌면 effect가 다시 실행된다.

import { useState, useEffect } from 'react'
import { fetchUsers, fetchUser } from '../../../lib/fakeApi.js'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 아래 목록 데모와 '같은' effect. 값이 바뀌면 정리 → 재실행되는 순서와, alive로 옛 응답을 버리는 이유를 짚는다.
const REFETCH_CODE = `useEffect(() => {
  let alive = true                     // 이 요청이 아직 유효한가
  setLoading(true)
  fetchUsers(category).then((data) => {
    if (!alive) return                 // 그새 또 바뀌었으면 버린다
    setUsers(data)
    setLoading(false)
  })
  return () => { alive = false }       // 정리: 이전 요청을 '무효'로
}, [category, refreshKey])             // 이 값이 바뀌면 다시 실행`

const REFETCH_STEPS = [
  {
    hl: [1, 10],
    tag: '① 첫 실행',
    t: '마운트 때 effect가 한 번 돈다',
    d: (<>의존성은 <code>[category, refreshKey]</code>. 처음엔 <code>category = 'all'</code>로 시작한다. 렌더가 끝난 뒤 effect가 실행된다.</>),
    note: "category = 'all'",
  },
  {
    hl: [2, 3, 4],
    tag: '② 요청',
    t: 'alive=true로 표시하고 요청을 건다',
    d: (<><code>alive</code>를 <b>true</b>로 두고, <code>setLoading(true)</code> 뒤 <code>fetchUsers('all')</code>로 요청 시작. 응답은 약 0.8초 뒤에 온다.</>),
  },
  {
    hl: [5, 6, 7],
    tag: '③ 응답',
    t: 'alive가 참이라 결과를 반영한다',
    d: (<>응답이 오면 <code>if (!alive) return</code>을 통과(아직 유효) → <code>setUsers</code>·<code>setLoading(false)</code>로 목록을 그린다.</>),
    note: "화면: all 목록 (3명)",
  },
  {
    hl: [10],
    tag: '④ 값 변경',
    t: 'frontend 클릭 → 의존성이 달라진다',
    d: (<><code>setCategory('frontend')</code>로 <code>category</code>가 <b>'all' → 'frontend'</b>. 리액트가 의존성을 이전과 <b>비교</b>해 "달라졌다"를 알아채고, effect를 <b>다시 실행</b>할 준비를 한다.</>),
    note: "category = 'frontend'",
  },
  {
    hl: [9],
    tag: '⑤ 정리 먼저',
    t: '다시 실행 전에 이전 정리 함수가 먼저 돈다',
    d: (<>새 effect를 돌리기 <b>직전</b>, 리액트는 <b>이전</b> effect의 정리 함수를 부른다 → 이전 요청의 <code>alive = false</code>. 이제 이전 요청이 늦게 도착해도 <b>3번째 줄에서 버려진다</b>.</>),
    note: "이전 요청 alive = false (무효)",
  },
  {
    hl: [2, 3, 4],
    tag: '⑥ 새 요청',
    t: '새 effect가 새 요청을 건다',
    d: (<>새로 도는 effect는 <b>새</b> <code>alive = true</code>로 시작해 <code>fetchUsers('frontend')</code>를 부른다. 이렇게 "값이 바뀌면 자동으로 다시 불러오기"가 된다.</>),
  },
  {
    hl: [5, 9],
    tag: '⑦ 왜 alive?',
    t: '경합(race) — 옛 응답이 새 응답을 덮어쓰지 않게',
    d: (<>요청이 겹치면 <b>응답 순서가 뒤바뀔 수</b> 있다(옛 요청이 더 늦게 도착). <code>alive</code> 플래그로 <b>"지금 화면에 맞는 응답만"</b> 반영하고, 무효가 된 옛 응답은 <code>if (!alive) return</code>으로 <b>조용히 버린다</b>.</>),
  },
  {
    hl: [10],
    tag: '⑧ 같은 값',
    t: "'all'을 또 눌러도 다시 안 부른다",
    d: (<>이미 <code>'all'</code>인데 <code>'all'</code>을 또 누르면 <code>category</code>가 <b>그대로</b> → 의존성이 안 바뀌어 effect가 <b>다시 안 돈다</b>(같은 값 <code>setState</code>라 리렌더도 생략). 그래서 강제로 부르려면 <code>refreshKey</code>를 <b>+1</b>해 <b>일부러 바뀌는 값</b>을 의존성에 넣는다.</>),
  },
]

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
        <span className="badge effect-badge">9-5</span>
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

      {/* 🔬 소스 + 동작 과정 — 값 변경 → 정리 → 재실행, 그리고 alive */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 값이 바뀌면 정리하고 다시 부른다</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성이 바뀌면 ⑤ 이전 정리 → ⑥ 새 실행 순서로 돈다 · alive로 옛 응답을 버린다</span>
      <p className="section-desc">
        아래는 목록 데모의 <b>실제 effect</b>다. <b>다음 ▶</b>으로 넘기며 <b>④ 값 변경 → ⑤ 정리 → ⑥ 새 요청</b> 순서를 보라.
        특히 <b>왜 <code>alive</code> 플래그가 필요한지</b>(⑦)와 <b>같은 값은 왜 다시 안 부르는지</b>(⑧)가 이 레슨의 핵심이다.
      </p>
      <SourceTrace file="step8-4-refetch/index.jsx (핵심 effect)" code={REFETCH_CODE} steps={REFETCH_STEPS} />

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

      {/* 🧭 alive 플래그 자세히 — 입문자용 (경합/race) */}
      <h3 className="section-title">🧭 자세히 · <code>alive</code> 플래그는 무엇을·왜 막나 (경합)</h3>
      <span className="learn-tag">📎 학습 포인트 · 요청이 겹치면 '늦게 도착한 옛 응답'이 새 화면을 덮을 수 있다 → alive로 옛 응답을 버린다</span>
      <p className="section-desc">
        <code>let alive = true // 이 요청이 아직 유효한가</code> — 이 한 줄이 입문자에겐 낯설다. <code>alive</code>는
        <b> "이 요청이 아직 화면에 맞는가"를 표시하는 깃발</b>(true/false)이다. 왜 필요한지는 <b>구체적인 상황</b>으로 보면 단번에 이해된다.
      </p>

      <div className="card">
        <div className="file-label">😱 alive가 없다면 — 이런 버그가 난다</div>
        <p className="section-desc" style={{ margin: '0 0 8px' }}>
          네트워크는 <b>요청마다 도착 시간이 다르다</b>. 그래서 빨리 누르면 <b>응답 순서가 뒤바뀔 수</b> 있다:
        </p>
        <ol className="chain-rounds" style={{ counterReset: 'none' }}>
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">1</span><span><b>userId 1</b> 클릭 → 1번 요청 출발</span><span className="chain-round-note">하필 느림 · 2초 걸림</span></div>
          </li>
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">2</span><span>0.1초 뒤 마음 바뀜 → <b>userId 3</b> 클릭 → 3번 요청 출발</span><span className="chain-round-note">빠름 · 0.5초</span></div>
          </li>
          <li className="chain-round active">
            <div className="chain-round-head"><span className="chain-round-no">3</span><span>0.5초: <b>3번 응답 도착</b> → 화면에 <b>3번 사람</b> ✅</span><span className="chain-round-note">버튼도 3 · 맞음</span></div>
          </li>
          <li className="chain-round" style={{ borderColor: 'var(--red)' }}>
            <div className="chain-round-head"><span className="chain-round-no" style={{ background: 'var(--red)' }}>4</span><span>2초: <b>1번 응답이 뒤늦게</b> 도착 → <code>setUser(1번)</code></span><span className="chain-round-note" style={{ color: 'var(--red)' }}>화면이 1번으로 되돌아감 ❌</span></div>
          </li>
        </ol>
        <p className="demo-desc" style={{ margin: '8px 0 0' }}>
          결과: 버튼은 <b>3</b>인데 화면은 <b>1</b>. <b>늦게 온 옛 응답</b>이 새 화면을 덮어썼다 — 이게 <b>경합(race condition)</b>이다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">🛡️ alive가 하는 일 — 옛 응답을 버린다</div>
        <pre className="err-code">{`useEffect(() => {
  let alive = true                    // ← 이 '실행'만의 깃발 (effect가 돌 때마다 새로 생김)
  fetchUser(userId).then((data) => {
    if (!alive) return                // ← 내가 이미 '옛것'이면 응답을 버린다
    setUser(data)                     // 유효할 때만 화면에 반영
  })
  return () => { alive = false }      // ← 정리: userId가 또 바뀌면 이 실행을 '옛것'으로
}, [userId])`}</pre>
        <ul className="section-list">
          <li><b>alive는 실행마다 따로 있다</b> — effect가 다시 돌 때마다 <code>let alive = true</code>가 <b>새로</b> 만들어진다. (각 실행이 자기 <code>alive</code>를 기억한다 = <b>클로저</b>, → JS 3 · 함수는 값이다)</li>
          <li><b>정리가 먼저 돈다</b> — userId가 1→3으로 바뀌면, 리액트는 새 effect(3번)를 돌리기 <b>전에 이전 effect(1번)의 정리</b>를 부른다 → 1번의 <code>alive</code>가 <b>false</b>가 된다.</li>
          <li><b>그래서 1번 응답이 늦게 와도</b> <code>if (!alive) return</code>에 걸려 <b>조용히 버려진다</b> → 화면은 3번 그대로. 버그가 사라진다.</li>
        </ul>
      </div>

      <p className="section-desc">
        📖 한 줄로: <b><code>alive</code> = "이 응답이 아직 화면에 맞는가"를 표시하는 깃발</b>. 빠르게 전환할 때만 드물게 터지는 버그라 눈엔 잘 안 보이지만,
        데이터를 불러오는 effect에선 <b>이 정리 패턴을 습관처럼</b> 붙이는 게 안전하다. (위 🔬 트레이스 ⑤ 정리 → ⑥ 새 요청 → ⑦ alive와 함께 보면 완전히 맞물린다.)
      </p>

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
