// 9-2 · useEffect가 왜·어떻게 동작하나
// 9-1(소개)에서 "무엇이고 []·[count] 기초"를 봤다. 여기선 그 다음 질문을 판다:
//   왜 의존성이 바뀌면 다시 실행해야 하나? → 답은 '동기화'.
//   어떻게 쓰나? → 선언형(의존성) vs 명령형, useEffect 없이 하면?, 실전 useUserFetch, 완성해보기.

import { useState, useEffect, Fragment } from 'react'
import CodeBlock from '../../../components/CodeBlock.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import TechTags from '../../../components/TechTags.jsx'
import { fetchUser } from '../../../lib/fakeApi.js'
import { useUserFetch } from '../step8-1-effect-basics/useUserFetch.js'
import hookRaw from '../step8-1-effect-basics/useUserFetch.js?raw'

// 버튼 라벨용 — fakeApi의 실제 사용자 이름과 일치시킨다. (userId → 표시 이름)
const USER_NAMES = { 1: '👩‍💻 김코딩', 2: '🧑‍🎨 이디자인', 3: '🧑‍🔬 박백엔드' }

// 화면에 사용자 한 줄을 그리는 공용 표시. (아래 stale vs synced 데모가 함께 쓴다)
function UserLine({ user }) {
  if (!user) return <span>⏳ 불러오는 중…</span>
  return <span>{user.emoji} <b>{user.name}</b> · {user.role}</span>
}

// ❌ 의존성 [] — 처음 userId로 '한 번만' 불러온다. userId가 바뀌어도 다시 안 부른다 → 화면이 옛날 사람 그대로(stale)
function StaleUserView({ userId }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, []) // ❌ 일부러 빈 배열 — 여기가 버그의 원인
  return <UserLine user={user} />
}

// ✅ 의존성 [userId] — userId가 바뀔 때마다 다시 불러와 화면과 맞춘다
function SyncedUserView({ userId }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId]) // ✅ userId를 의존성에 넣었다 — Stale과 딱 이 한 줄만 다르다(정리는 9-3에서)
  return <UserLine user={user} />
}

// ⚠️ 의존성 배열 자체를 '생략' — effect가 매 렌더마다 실행된다.
// setRuns가 또 렌더를 부르고, 그 렌더가 또 effect를 불러 약 0.8초마다 '끝없이' 다시 요청한다(무한 루프).
// (동기 setState였다면 프리징되지만, fetch가 약 0.8초 비동기라 화면이 얼지 않고 '도는 게' 눈에 보인다.)
function NoDepUserView({ userId }) {
  const [user, setUser] = useState(null)
  const [runs, setRuns] = useState(0)
  useEffect(() => {
    fetchUser(userId).then((u) => {
      setUser(u)
      setRuns((r) => r + 1)
    })
  }) // ❌ 의존성 배열이 없다 — 매 렌더마다 실행 → 무한 반복
  return (
    <div>
      <div style={{ color: 'var(--red)', fontWeight: 700 }}>🔁 무한 반복 중 · 요청 {runs}회</div>
      <div className="demo-desc" style={{ margin: '2px 0 0' }}>
        렌더 지문 <b>{Math.random().toFixed(3)}</b> (매번 바뀐다) · <UserLine user={user} />
      </div>
    </div>
  )
}

// 같은 userId를 두 방식에 동시에 준다. 버튼으로 바꿔 보면 왼쪽(❌)은 안 바뀌고 오른쪽(✅)만 바뀐다.
function StaleVsSyncedDemo() {
  const [userId, setUserId] = useState(1)
  return (
    <div>
      <div className="button-row">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className={'chip' + (id === userId ? ' on' : '')}
            onClick={() => setUserId(id)}
          >
            {USER_NAMES[id]}
          </button>
        ))}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>지금 고른 <code>userId</code>: <b>{userId}</b> — 둘 다 이 값을 받는다</p>
      <div className="compare-grid">
        <div className="card">
          <div className="file-label">❌ 의존성 [] — 다시 안 부른다</div>
          <StaleUserView userId={userId} />
          <p className="demo-desc" style={{ marginTop: 8 }}>userId를 바꿔도 <b>처음 사람 그대로</b> → 화면과 데이터가 어긋남</p>
        </div>
        <div className="card">
          <div className="file-label">✅ 의존성 [userId] — 다시 부른다</div>
          <SyncedUserView userId={userId} />
          <p className="demo-desc" style={{ marginTop: 8 }}>userId가 바뀌면 <b>그 사람으로 갱신</b> → 항상 맞음</p>
        </div>
      </div>
    </div>
  )
}

// 🟢 실전 예시 — 커스텀 훅 useUserFetch를 쓰는 컴포넌트.
// 사용자 버튼을 누르면 userId가 바뀌고, 의존성 [userId] 덕분에 effect가 다시 돌아 새 사람을 불러온다.
function UserFetchDemo() {
  const [userId, setUserId] = useState(1)
  const { user, loading } = useUserFetch(userId) // 👈 이 컴포넌트가 커스텀 훅을 쓴다

  return (
    <div>
      {/* 세 가지 '다른 경로'로 userId를 바꾼다 — 어느 것에도 fetch를 붙이지 않았는데 전부 자동으로 다시 불러온다 */}
      <div className="button-row">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className={'chip' + (id === userId ? ' on' : '')}
            onClick={() => setUserId(id)}
          >
            {USER_NAMES[id]}
          </button>
        ))}
        <button className="chip" onClick={() => setUserId((v) => (v % 3) + 1)}>다음 ▶</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {loading ? (
          <span>⏳ 불러오는 중… (userId {userId})</span>
        ) : (
          <span>
            {user.emoji} <b>{user.name}</b> · {user.role}
            <div className="demo-desc" style={{ margin: '2px 0 0' }}>{user.bio}</div>
          </span>
        )}
      </div>
      <p className="demo-desc">
        버튼을 누르면 <code>userId</code>가 바뀐다 → 의존성 <code>[userId]</code>라서 effect가 <b>다시 실행</b> →
        새 사용자를 불러와 화면과 <b>맞춘다</b>.
      </p>
    </div>
  )
}

// 🎯 완성해보기 — 의존성 배열을 골라 stale 버그를 직접 없앤다.
function FixDepsQuiz() {
  const [choice, setChoice] = useState(null) // 'empty' | 'dep' | 'none'
  const [userId, setUserId] = useState(1)
  const options = [
    { key: 'empty', label: '[]' },
    { key: 'dep', label: '[userId]' },
    { key: 'none', label: '생략 (배열 없음)' },
  ]
  const verdict = {
    empty: '❌ 아직 버그다. []는 처음 한 번만 부른다 → 사용자를 바꿔도 화면이 안 바뀐다. 다시 골라 보라.',
    dep: '✅ 정답! [userId] — userId가 바뀔 때마다 다시 불러와 화면과 항상 맞는다.',
    none: '⚠️ 배열을 생략하면 매 렌더마다 실행된다 → 아래처럼 가짜 API 응답(약 0.8초)마다 끝없이 다시 요청한다(무한 루프). 아래 라이브 데모엔 도는 걸 눈으로 보라고 "요청 N회" 카운터를 덧붙였다 — 그 카운터는 이 3줄엔 없다. userId만 넣는 게 맞다.',
  }
  return (
    <div>
      <p className="demo-desc">아래 effect의 <b>의존성 배열</b>을 골라 stale 버그를 고쳐 보라:</p>
      <div className="file-label">📄 예시 · UserView.jsx</div>
      <pre className="err-code">{`useEffect(() => {
  fetchUser(userId).then(setUser)
}, ???)   // 👈 여기에 무엇을 넣어야 할까?`}</pre>
      <div className="button-row">
        {options.map((o) => (
          <button key={o.key} className={'chip' + (choice === o.key ? ' on' : '')} onClick={() => setChoice(o.key)}>
            {o.label}
          </button>
        ))}
      </div>
      {choice && (
        <div style={{ marginTop: 10 }}>
          <div className="button-row">
            {[1, 2, 3].map((id) => (
              <button key={id} className={'chip' + (id === userId ? ' on' : '')} onClick={() => setUserId(id)}>
                {USER_NAMES[id]}
              </button>
            ))}
          </div>
          <div className="tree-box" style={{ marginTop: 10 }}>
            {choice === 'dep' && <SyncedUserView userId={userId} />}
            {choice === 'empty' && <StaleUserView userId={userId} />}
            {choice === 'none' && <NoDepUserView userId={userId} />}
          </div>
          <p className="demo-desc" style={{ marginTop: 8, fontWeight: 600 }}>{verdict[choice]}</p>
        </div>
      )}
    </div>
  )
}

// 🪜 userId가 바뀌는 순서(undefined → aaa → bbb)를 행으로 놓고, 값이 바뀔 때마다 chain이 한 바퀴 도는 걸 보여준다.
function ChainStepTrace() {
  const [shown, setShown] = useState(1) // 몇 번째 userId까지 드러났나 (1~3)
  const rounds = [
    { uid: 'undefined', note: '처음 — 아직 아무도 안 불러옴' },
    { uid: '"aaa"', note: 'userId가 바뀜 → 다시 동기화' },
    { uid: '"bbb"', note: '또 바뀜 → 또 동기화' },
  ]
  // 각 단계에 '실제 코드'를 붙인다. effect의 fetchUser에는 그 라운드의 userId 값이 concrete하게 들어간다.
  // 처음(userId 없음)엔 부를 대상이 없어 chain이 돌지 않는다 — note("아직 아무도 안 불러옴")와 맞춘다.
  const chainOf = (uid) =>
    uid === 'undefined'
      ? [{ ico: '⛔', label: 'fetch 안 함', code: 'userId 없음 → 부를 대상이 없다' }]
      : [
          { ico: '⚙️', label: 'effect 실행', code: `fetchUser(${uid})` },
          { ico: '📥', label: 'setState', code: 'setUser(응답)' },
          { ico: '🔁', label: '리렌더', code: 'return <UserView/>' },
        ]
  return (
    <div>
      <ol className="chain-rounds">
        {rounds.slice(0, shown).map((r, i) => (
          <li key={i} className={'chain-round' + (i === shown - 1 ? ' active' : '')}>
            <div className="chain-round-head">
              <span className="chain-round-no">{i + 1}</span>
              <span>userId = <b>{r.uid}</b></span>
              <span className="chain-round-note">{r.note}</span>
            </div>
            <div className="chain-round-flow">
              {chainOf(r.uid).map((c, j, arr) => (
                <Fragment key={j}>
                  <span className="chain-chip">
                    <span className="chain-chip-label">{c.ico} {c.label}</span>
                    <code className="chain-chip-code">{c.code}</code>
                  </span>
                  {j < arr.length - 1 && <span className="chain-flow-arrow">→</span>}
                </Fragment>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="button-row">
        <button className="chip on" disabled={shown >= 3} onClick={() => setShown((s) => Math.min(3, s + 1))}>
          {shown >= 3 ? '✅ userId가 바뀔 때마다 한 바퀴씩' : '▶ userId 바꾸기 (다음)'}
        </button>
        <button className="chip" onClick={() => setShown(1)}>↺ 처음으로</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        <b>userId가 바뀔 때마다</b> 한 바퀴(effect→setState→리렌더)가 <b>한 번씩</b> 돈다 = 동기화.{' '}
        🛑 그런데 <code>[userId]</code>를 <b>생략</b>하면 userId가 <b>안 바뀌어도</b> 매 렌더마다 돌아 <b>무한 반복</b>이 된다(위 데모).
      </p>
    </div>
  )
}

export default function Step8_1b({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-2</span>
        <h2>왜·어떻게 동작하나</h2>
        <p>왜 의존성이 바뀌면 다시 실행하나(동기화)와, 실제로 어떻게 쓰는지(선언형·실전·완성해보기)를 판다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>effect는 바깥 세상을 '지금의 props·state'에 맞추는 동기화다. 값이 바뀌면 리액트가 비교해 자동으로 다시 맞춘다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          🔗 <b>9-1에서 이어짐</b> — 9-1에서 useEffect가 <b>무엇이고</b> <code>[]</code>·<code>[count]</code> 기초를 봤다.
          여기선 그 다음 질문 둘을 판다: <b>왜</b> 의존성이 바뀌면 다시 도나(→ 동기화), 그리고 <b>어떻게</b> 쓰나(선언형·실전).
        </p>
      </div>

      {/* ① 왜 다시 실행하나 — 동기화 */}
      <h3 className="section-title">① 🧭 왜 '바뀌면 다시' 실행하나 — 지금의 props·state에 딱 맞추기</h3>
      <span className="learn-tag">📎 학습 포인트 · effect는 바깥 세상을 '이 컴포넌트가 지금 가진 props·state'에 정확히 대응시킨다 — 그 값이 바뀌면 다시 맞춘다</span>
      <p className="section-desc">
        useEffect가 하는 일은 대개 <b>리액트 바깥</b>(탭 제목·서버 데이터)을 <b>이 컴포넌트가 지금 가진 <code>props</code>·<code>state</code>에
        정확히 대응</b>시키는 것이다. 즉 <b>"지금 <code>userId</code>가 2라면, 화면 데이터도 <b>2번 사람</b>"</b>처럼,
        바깥이 <b>현재 입력과 한 치도 어긋나지 않게</b> 맞춘다. 9-1의 <b>탭 제목</b>을 <code>count</code>에 맞춘 것도 같은 원리다.
      </p>
      <p className="section-desc">
        그런데 <code>props</code>·<code>state</code>는 언제든 바뀐다(부모가 새 prop을 주거나, <code>setState</code>로). 값이 바뀌는 순간
        앞서 맞춰 둔 바깥 상태는 <b>'옛 입력'에 맞춰진 것</b>이 되어 현재와 어긋난다. 그래서 <b>effect가 읽는 그 props·state</b>를
        <b> 의존성 배열</b>에 적어, 바뀔 때마다 <b>새 값에 다시 맞춘다</b>.
      </p>
      <p className="section-desc">
        👉 그래서 의존성 배열엔 특별한 게 아니라 <b>"effect 안에서 읽는 props·state"</b>를 적는다 —
        <code> userId</code>를 읽으면 <code>[userId]</code>, <code>count</code>를 읽으면 <code>[count]</code>.
      </p>
      <p className="section-desc">
        말보다 눈으로 보자. 아래 <b>두 컴포넌트는 똑같은 <code>userId</code>를 받는다</b>. 다른 건 <b>의존성 배열 딱 한 줄</b>뿐인데,
        결과가 갈린다. <b>사용자 2·3을 눌러</b> 보라.
      </p>
      <div className="card">
        <div className="file-label">📄 라이브 — 같은 userId, 의존성만 다르다 (stale 버그 실증)</div>
        <StaleVsSyncedDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 차이는 이 한 줄뿐이다</div>
        <pre className="err-code">{`// ❌ [] — 처음 userId로 '한 번만' 불러온다. userId가 바뀌어도 그대로 → 어긋남!
useEffect(() => { fetchUser(userId).then(setUser) }, [])

// ✅ [userId] — userId가 바뀔 때마다 '다시' 불러와 화면과 맞춘다
useEffect(() => { fetchUser(userId).then(setUser) }, [userId])`}</pre>
      </div>
      <p className="section-desc">
        📖 한 줄로: <b>의존성 배열 = "이 effect가 무엇에 맞춰져 있는지" 목록</b>. 그중 하나라도 바뀌면 다시 맞춘다.
      </p>

      {/* ② '값이 바뀐다'는 뜻 → 유용성으로 연결 */}
      <h3 className="section-title">② "의존성 값이 바뀐다"는 무슨 뜻인가 → 그래서 유용하다</h3>
      <span className="learn-tag">📎 학습 포인트 · 리액트가 매 렌더마다 이전 값과 비교(Object.is)해 '달라졌으면' 다시 실행한다</span>
      <p className="section-desc">
        먼저 <b>"바뀐다"의 정확한 뜻</b>부터. 리액트는 컴포넌트를 <b>다시 그릴 때마다</b> 의존성 배열의 값을
        <b> 직전 렌더의 값과 하나씩 비교</b>한다:
      </p>
      <ul className="section-list">
        <li>이전 값과 <b>다르면</b> → "기준이 달라졌네" → effect를 <b>다시 실행</b>.</li>
        <li>이전 값과 <b>같으면</b> → <b>건너뛴다</b>(다시 안 함).</li>
        <li>즉 "값이 바뀐다" = <b>렌더와 렌더 사이에 그 값이 달라졌다</b>. <code>userId</code>가 1→2가 된 걸 리액트가 <b>비교로</b> 알아챈다.</li>
      </ul>
      <p className="section-desc">
        <b>바로 여기서 유용성이 나온다.</b> 리액트가 <b>알아서 비교</b>해 주니, <code>userId</code>를 <b>어떤 방법으로 바꾸든</b>
        (버튼·"다음"·URL·검색·알림) 리액트가 "달라졌다"를 감지해 <b>자동으로 다시 맞춘다</b>.
        너는 <b>"언제 다시 부를지"를 한 군데도 챙길 필요가 없다.</b>
      </p>
      <div className="card">
        <div className="file-label">🧭 명령형(수동) ❌ vs 선언형(의존성) ✅</div>
        <pre className="err-code">{`// ❌ 명령형 — userId를 바꾸는 '모든 곳'에서 fetch를 직접 불러야 한다
function onClickUser(id) { setUserId(id); fetchUser(id).then(setUser) }
function onNext(id)      { setUserId(id); fetchUser(id).then(setUser) }
function onSearch(id)    { setUserId(id); /* fetch 깜빡! */ }   // ← 한 곳 빠뜨리면 오래된 데이터 버그

// ✅ 선언형 — "이 데이터는 userId에 달렸다"만 한 번 선언
useEffect(() => { fetchUser(userId).then(setUser) }, [userId])
function onClickUser(id) { setUserId(id) }   // fetch 신경 안 씀
function onNext(id)      { setUserId(id) }   // 자동으로 다시 맞춰짐
function onSearch(id)    { setUserId(id) }   // 자동`}</pre>
      </div>
      <p className="section-desc">
        이게 리액트의 사고방식이다 — <b>"무엇에 의존하는지"만 말하면, "언제 실행할지"는 리액트가 정한다.</b>
        호출 시점을 관리하는 짐을 <b>리액트가 대신 진다</b> — 그것이 의존성 배열의 유용성이다.
      </p>

      {/* ③ useEffect 없이 하려면? — 이벤트 핸들러 vs Effect */}
      <h3 className="section-title">③ 그럼 useEffect '없이' 하려면? — 두 가지 시도</h3>
      <span className="learn-tag">📎 학습 포인트 · 렌더 중 직접 호출은 ❌(순수 위반·무한 루프) · 이벤트 핸들러는 '경로마다' 붙여야 한다</span>
      <p className="section-desc">
        좋은 질문이다. "userId가 바뀌면 뭘 하고 싶은데, useEffect 없이 하면?" 두 가지 방법이 떠오르는데, 둘 다 한계가 있다.
      </p>
      <div className="card">
        <div className="file-label">❌ 시도 1 — 렌더 '중'에 직접 부른다 (하면 안 된다)</div>
        <pre className="err-code">{`function UserView({ userId }) {
  const [user, setUser] = useState(null)
  fetchUser(userId).then(setUser)   // ❌ 렌더 도중 부수 효과 + setState
  return <p>{user?.name}</p>
}
// 문제: 9-1 ②-2에서 봤듯 렌더 도중 요청·setState는 무한 루프다 (렌더는 순수해야 한다).`}</pre>
      </div>
      <div className="card">
        <div className="file-label">⚠️ 시도 2 — userId를 바꾸는 '이벤트 핸들러'에서 부른다</div>
        <pre className="err-code">{`function onClickUser(id) { setUserId(id); fetchUser(id).then(setUser) }
function onNext(id)      { setUserId(id); fetchUser(id).then(setUser) }
// 동작은 한다. 하지만 userId를 바꾸는 '모든 경로'에 똑같이 붙여야 하고,
// URL 복원·검색·알림처럼 경로가 늘면 한 곳만 빠뜨려도 화면이 어긋난다.`}</pre>
      </div>
      <p className="section-desc">
        그래서 리액트는 이렇게 나눈다 — <b>"이 일이 무엇 때문에 일어나야 하나?"</b>를 기준으로:
      </p>
      <ul className="section-list">
        <li>
          <b>특정 이벤트 때문</b>이면(버튼 클릭으로 <b>구매 요청</b>, 폼 <b>제출</b>) → <b>이벤트 핸들러</b>가 맞다.
          이런 건 <b>useEffect가 필요 없다.</b>
        </li>
        <li>
          <b>값이 결과적으로 달라졌기 때문</b>이면(userId가 2가 됨 → 2번 데이터로 <b>맞춤</b>), 게다가 그 값이
          <b> 여러 경로</b>로 바뀔 수 있으면 → <b>useEffect + 의존성</b>이 맞다. "어떻게 바뀌었든" 한 곳에서 맞춘다.
        </li>
      </ul>
      <p className="section-desc">
        👉 <code>useUserFetch</code>가 딱 두 번째 경우다 — 그래서 아래처럼 <b>effect 하나</b>로 끝난다.
      </p>

      {/* ④ 실전 예시 — useUserFetch */}
      <h3 className="section-title">④ 실전 예시 — useUserFetch(userId)</h3>
      <span className="learn-tag">📎 학습 포인트 · userId가 바뀌면 effect가 다시 돌아 그 사용자를 불러온다 (의존성 = 다시 부르는 계기)</span>
      <p className="section-desc">
        "값이 바뀌면 다시 부른다"가 실제로 쓰이는 가장 흔한 곳이 <b>데이터 불러오기</b>다.
        <code> userId</code>를 받아 그 사람의 정보를 불러오는 로직을 <b>커스텀 훅</b> <code>useUserFetch</code>로 묶었다.
        버튼으로 <code>userId</code>를 바꿔 보라 — effect가 다시 돌아 새 사람을 불러온다.
      </p>
      <div className="card">
        <div className="file-label">📄 UserFetchDemo — 버튼으로 userId를 바꾸면 자동으로 다시 불러온다</div>
        <UserFetchDemo />
      </div>
      <CodeBlock file="useUserFetch.js (실제 소스)" code={hookRaw} />
      <p className="section-desc">
        여기선 "왜 의존성이 필요한가"만 짚었다. <b>불러오는 동안의 로딩 처리</b>는 <b>9-4</b>,
        <b> 같은 버튼을 또 눌러도 안 불러오는 이유</b>는 <b>9-5</b>에서 더 깊게 다룬다.
      </p>

      {/* ⑤ 완성해보기 — 의존성 골라 버그 없애기 */}
      <h3 className="section-title">⑤ 🎯 완성해보기 — 의존성 배열로 버그 없애기</h3>
      <span className="learn-tag">📎 학습 포인트 · effect가 읽는 값(userId)을 의존성에 넣어야 stale 버그가 사라진다</span>
      <p className="section-desc">
        직접 골라 보자. 아래 effect의 의존성 자리에 <b>무엇을 넣어야</b> "사용자를 바꾸면 화면도 바뀌는" 상태가 될까?
        고른 뒤 <b>사용자 버튼</b>을 눌러 결과를 확인하라.
      </p>
      <div className="card">
        <div className="file-label">📄 무엇을 넣어야 할까? — 골라서 바로 확인</div>
        <FixDepsQuiz />
      </div>

      {/* 연쇄 반응을 반드시 인지시키기 */}
      <span className="learn-tag">⚡ 잠깐 · 반드시 인지 — setState → 리렌더 → effect 재실행 → setState … 이 '연쇄 반응'을 의존성 배열이 멈춘다</span>

      {/* 5-5 리렌더 감각과 잇기 — 반복 리렌더링 개념 재주지 */}
      <div className="concept">
        <p className="concept-lead">🔁 반복 리렌더링과 잇기 — effect는 그 반복 위에 얹혀 돈다</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          다시 떠올리자 — <b>3-6 · 리렌더링</b>에서 <code>state</code>가 바뀌면 컴포넌트가 <b>다시 실행</b>된다고 했고,
          <b> 5-5 · 리액트가 부른다</b>에서 그게 <b>"스스로를 다시 부르는 듯한 반복"</b>이라 했다. useEffect는 이 반복의
          <b> 매 렌더 끝</b>에 얹혀 돈다: <b>값이 바뀔 때마다 한 바퀴</b>(effect→setState→리렌더)가 돌고,
          의존성이 <b>같아지면 그 자리에서 멈춘다</b>. <b>▶ 버튼</b>으로 userId를 바꿔, 바뀔 때마다 한 바퀴가 도는 걸 보라:
        </p>
        <TechTags
          items={[
            { label: '🔁 리렌더링', to: 3.6 },
            { label: '5-5 · 리액트가 부른다', to: 3.84 },
          ]}
          onGo={onGo}
        />
        <ChainStepTrace />
        <ul className="section-list">
          <li>
            <b>진짜 재귀 함수가 아니다</b> — 5-5에서 짚었듯 "<b>리렌더가 리렌더를 부르는 연쇄</b>"다.
            setState가 다음 렌더를 예약하고, 그 렌더가 다시 effect를 부른다.
          </li>
          <li>
            <b>의존성 배열은 이 연쇄의 '브레이크'다</b> — 값이 같으면 effect를 <b>건너뛰어</b> 연쇄를 멈춘다.
            <code> [userId]</code>는 "userId가 <b>실제로 달라졌을 때만</b>" 다시 돌게 해, 연쇄가 무한히 이어지지 않게 한다.
          </li>
          <li>
            <b>정상 앱에서도</b> 이 연쇄(setState→리렌더)는 늘 일어난다 — 다만 <b>값이 안정되면 멈출 뿐</b>이다.
            의존성이 그 <b>멈춤 지점</b>을 정해 준다.
          </li>
        </ul>
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>effect는 화면을 그린 <b>뒤</b> 실행된다 (화면 그리기를 막지 않는다).</li>
          <li>의존성 배열에 적은 값이 바뀌면 다시 실행된다. 필요한 값을 빠뜨리면 <b>오래된 값(stale) 버그</b>가 난다.</li>
          <li>"언제 다시 부르지?"가 헷갈리면 <b>"이 효과는 무엇에 맞춰져 있나?"</b>를 물어라. 그게 곧 의존성이다.</li>
        </ul>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — 동기화·stale, 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · 필요한 값을 빠뜨리면 stale · 생략하면 무한 — 세 번 확인한다</span>
      <QuickQuiz
        intro="의존성이 '무엇에 맞춰져 있는지'를 정한다는 규칙을 상황만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: 'effect에서 fetchUser로 받은 값을 setUser로 넣는데, 의존성 배열을 생략했다. 무슨 일이 나나?',
            code: `useEffect(() => {
  fetchUser(userId).then(setUser);
}); // 배열 없음`,
            options: ['처음 한 번만 불러온다', '매 렌더마다 실행 → 계속 다시 요청(무한 반복)', '에러가 나서 멈춘다'],
            answer: 1,
            explain: '배열을 생략하면 매 렌더마다 실행된다. setUser가 또 렌더를 부르고 그 렌더가 또 effect를 불러 끝없이 반복한다. [userId]를 넣어야 한다.',
          },
          {
            q: 'userId를 바꿨는데 화면이 옛날 사람 그대로다(stale). effect의 의존성 배열이 무엇일 때 이런가?',
            options: ['[]', '[userId]', '생략'],
            codeOptions: true,
            answer: 0,
            explain: '[]는 처음 한 번만 부르고 userId가 바뀌어도 다시 안 부른다 → 화면이 안 맞는다(stale). [userId]로 바꿔야 userId가 바뀔 때마다 다시 불러 맞춘다.',
          },
          {
            q: '위 stale 버그를 고치려면 의존성 배열을 무엇으로 두어야 하나?',
            options: ['[userId]', '[]', '생략(배열 없음)'],
            codeOptions: true,
            answer: 0,
            explain: "화면이 userId에 '맞춰져' 있어야 하니 [userId]를 넣는다. 그러면 userId가 바뀔 때마다 effect가 다시 돌아 새 사람을 불러온다.",
          },
        ]}
      />
    </section>
  )
}
