// 9-1 · useEffect 소개 + 의존성 배열
// 렌더 이후에 할 일(부수 효과)을 useEffect에 적는다. 두 번째 인자(의존성 배열)가 '언제 실행할지'를 정한다.
// 이 레슨의 중심 질문: "왜 의존성이 바뀌면 다시 실행해야 하나?" → 답은 '동기화'다.

import { useState, useEffect, Component, Fragment } from 'react'
import CodeBlock from '../../../components/CodeBlock.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import { fetchUser } from '../../../lib/fakeApi.js'
import { useUserFetch } from './useUserFetch.js'
import hookRaw from './useUserFetch.js?raw'

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
  }, [userId]) // ✅ userId를 의존성에 넣었다 — Stale과 딱 이 한 줄만 다르다(정리는 9-2에서)
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

// 이 레슨 본문의 두 effect(①[] · ②[count])가 첫 렌더·클릭 때 어떤 순서로 도는지 짚는다.
const BASIC_CODE = `const [count, setCount] = useState(0)

useEffect(() => {
  setLog('실행됨')                  // ① 마운트 뒤 한 번
}, [])                             // [] = 처음 한 번만

useEffect(() => {
  document.title = '클릭 ' + count  // ② 탭 제목 동기화
}, [count])                        // [count] = count 바뀔 때마다`

const BASIC_STEPS = [
  {
    hl: [1],
    tag: '① 첫 렌더',
    t: '컴포넌트 함수가 실행돼 화면을 그린다',
    d: (<><code>count</code>가 0으로 시작한다. 함수가 <code>return</code>한 JSX가 화면에 그려진다. <b>effect는 아직 안 돈다</b>(렌더 뒤로 미뤄짐).</>),
    note: 'count = 0',
  },
  {
    hl: [3, 4, 5, 7, 8, 9],
    tag: '② effect 실행',
    t: '렌더가 끝난 뒤 두 effect가 위→아래로',
    d: (<>화면을 다 그린 뒤 effect가 <b>적힌 순서대로</b> 실행된다. ①은 <code>setLog</code> 한 번, ②는 탭 제목을 <b>"클릭 0회"</b>로 맞춘다.</>),
    note: '탭 제목 = 클릭 0회',
  },
  {
    hl: [1],
    tag: '③ ➕ 클릭',
    t: 'setCount(1) → 리렌더',
    d: (<>버튼을 누르면 <code>setCount</code>로 <code>count</code>가 <b>0 → 1</b>이 되고, 컴포넌트가 다시 실행된다(리렌더).</>),
    note: 'count = 1',
  },
  {
    hl: [5, 9],
    tag: '④ 의존성 비교',
    t: '리액트가 각 의존성을 이전 렌더와 비교한다',
    d: (<>①의 <code>[]</code>는 비교할 게 없다 → <b>건너뜀</b>. ②의 <code>[count]</code>는 <b>0 → 1</b>로 달라졌다 → <b>다시 실행 대상</b>.</>),
  },
  {
    hl: [7, 8],
    tag: '⑤ ②만 재실행',
    t: '탭 제목만 갱신, ①은 건너뛴다',
    d: (<>그래서 ②만 다시 돌아 탭 제목이 <b>"클릭 1회"</b>가 된다. ①은 처음 그대로. → <b>의존성 배열이 "무엇에 맞춰 다시 돌지"를 정한다.</b></>),
    note: '탭 제목 = 클릭 1회',
  },
]

// 렌더 중 에러를 잡아 화면에 보여 주는 작은 에러 바운더리. (아래 무한 루프 데모가 쓴다)
class RenderErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="tree-box leaf" style={{ borderColor: 'var(--red)' }}>
          💥 <b>React가 렌더를 멈추고 에러를 던졌다:</b>
          <div className="demo-desc" style={{ margin: '4px 0 0', color: 'var(--red)' }}>
            {String(this.state.error.message).split('\n')[0]}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ❌ 렌더 '중'에 setState를 부른다 → 매 렌더가 또 렌더를 부른다 → React가 "Too many re-renders"로 막는다.
function BadRenderComp() {
  const [n, setN] = useState(0)
  setN(n + 1) // ❌ 이 한 줄이 무한 재렌더를 만든다 (부수 효과를 렌더 중에 실행)
  return <p>{n}</p>
}

// 렌더 중 부수효과가 왜 금지인지 '라이브'로 보여 준다. (React가 스스로 막으므로 화면은 얼지 않는다)
function RenderSideEffectDemo() {
  const [run, setRun] = useState(false)
  const [key, setKey] = useState(0)
  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => { setRun(true); setKey((k) => k + 1) }}>💥 렌더 중 setState 실행</button>
        <button className="chip" onClick={() => setRun(false)}>🔄 멈춤 / 리셋</button>
      </div>
      {run && (
        <div style={{ marginTop: 10 }}>
          <RenderErrorBoundary key={key}>
            <BadRenderComp />
          </RenderErrorBoundary>
        </div>
      )}
      <p className="demo-desc" style={{ marginTop: 8 }}>
        실행하면 React가 <b>"Too many re-renders"</b>로 막는다 — 렌더가 <b>스스로를 끝없이 다시 부르기</b> 때문이다.
        그래서 이런 일은 렌더가 <b>끝난 뒤</b>인 useEffect로 미룬다.
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

export default function Step8_1() {
  const [log, setLog] = useState('아직 실행 전')
  const [count, setCount] = useState(0)

  // ① 마운트 직후 한 번만 (의존성 [])
  useEffect(() => {
    setLog('✅ 렌더가 끝난 뒤 실행됐다!')
  }, [])

  // ② count가 바뀔 때마다 (의존성 [count])
  useEffect(() => {
    document.title = `클릭 ${count}회`
  }, [count])

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-1</span>
        <h2>useEffect 소개 + 의존성 배열</h2>
        <p>렌더 이후에 할 일(부수 효과)을 적고, 의존성 배열로 '언제 실행할지'를 정한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>렌더가 끝난 뒤 실행할 부수 효과를 useEffect에 적고, 의존성 배열로 그 실행 시점을 정한다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          컴포넌트는 화면을 그리는 함수다. 화면 그리기 <b>외의</b> 일(문서 제목·타이머·데이터 요청)은
          <code> useEffect(() =&gt; {'{...}'}, [의존성])</code>에 적으면 <b>렌더가 끝난 뒤</b> 실행된다.
        </p>
        <ul className="concept-terms">
          <li><code>[]</code> — 처음 <b>한 번만</b></li>
          <li><code>[count]</code> — <b>count가 바뀔 때마다</b></li>
          <li>생략 — <b>매 렌더마다</b> (거의 안 씀)</li>
        </ul>
      </div>

      {/* ① 마운트 한 번 */}
      <h3 className="section-title">① 마운트 직후 한 번 — 의존성 []</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성 <code>[]</code> = 마운트 직후 딱 한 번만 실행</span>
      <div className="card">
        <div className="file-label">📄 step8-1-effect-basics/index.jsx</div>
        <p className="demo-desc">① 마운트 시 한 번 <code>[]</code> → {log}</p>
      </div>

      {/* ② count 바뀔 때 */}
      <h3 className="section-title">② 값이 바뀔 때마다 — 의존성 [count]</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성 <code>[count]</code> = count가 바뀔 때마다 다시 실행</span>
      <div className="card center">
        <div className="demo-emoji">{count}</div>
        <button onClick={() => setCount(count + 1)}>➕ 클릭</button>
        <p className="demo-desc">② <code>[count]</code> → 브라우저 <b>탭 제목</b>이 "클릭 {count}회"로 바뀐다.</p>
      </div>

      {/* 🔬 위 ①·②가 도는 순서 */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 위 ①·②를 한 단계씩</h3>
      <span className="learn-tag">📎 학습 포인트 · effect는 렌더 뒤 실행 · 클릭하면 리액트가 의존성을 비교해 바뀐 effect만 다시 돌린다</span>
      <p className="section-desc">
        위 두 데모(①·②)가 <b>같은 화면에서 어떤 순서로</b> 도는지 짚어 보자. <b>다음 ▶</b>으로 넘기며,
        <b> 클릭했을 때 ①은 건너뛰고 ②만 다시 도는</b> 이유(④·⑤)를 확인하라.
      </p>
      <SourceTrace file="step8-1-effect-basics/index.jsx (본문 요약)" code={BASIC_CODE} steps={BASIC_STEPS} />

      {/* ②-2 렌더는 순수해야 한다 — 부수효과 금지 (라이브 무한 루프) */}
      <h3 className="section-title">②-2 🚫 렌더 '중'엔 부수효과 금지 — 렌더는 순수해야 한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 렌더 도중 요청·setState는 무한 루프를 부른다 → '렌더가 끝난 뒤'인 useEffect로 미룬다</span>
      <p className="section-desc">
        useEffect가 <b>왜 필요한지</b> 근본 이유가 여기 있다. <b>컴포넌트 본문(렌더)은 순수</b>해야 한다(→ <b>개념 · 함수 vs 컴포넌트</b>) —
        같은 props·state면 같은 화면을 <b>계산만</b> 하고 바깥을 건드리지 않는다. 그런데 렌더 도중 <code>setState</code>를 하면?
      </p>
      <div className="card">
        <div className="file-label">❌ 렌더 중 setState — 무한 재렌더 (직접 실행해 보라)</div>
        <pre className="err-code">{`function BadRenderComp() {
  const [n, setN] = useState(0)
  setN(n + 1)   // ❌ 렌더 중 setState → 렌더가 또 렌더를 부른다 → 무한 루프
  return <p>{n}</p>
}`}</pre>
        <RenderSideEffectDemo />
      </div>
      <p className="section-desc">
        데이터 요청도 똑같다 — 렌더 중 <code>fetchUser().then(setUser)</code>는 <b>매 렌더 실행</b>되고 <code>setUser</code>가
        또 렌더를 불러 <b>끝없이 반복</b>된다. 그래서 이런 <b>부수효과는 렌더가 끝난 뒤로 미뤄야</b> 하고, 그 자리가 바로 <b>useEffect</b>다.
      </p>

      {/* ③ 왜 다시 실행하나 — 동기화 */}
      <h3 className="section-title">③ 🧭 왜 '바뀌면 다시' 실행하나 — 지금의 props·state에 딱 맞추기</h3>
      <span className="learn-tag">📎 학습 포인트 · effect는 바깥 세상을 '이 컴포넌트가 지금 가진 props·state'에 정확히 대응시킨다 — 그 값이 바뀌면 다시 맞춘다</span>
      <p className="section-desc">
        useEffect가 하는 일은 대개 <b>리액트 바깥</b>(탭 제목·서버 데이터)을 <b>이 컴포넌트가 지금 가진 <code>props</code>·<code>state</code>에
        정확히 대응</b>시키는 것이다. 즉 <b>"지금 <code>userId</code>가 2라면, 화면 데이터도 <b>2번 사람</b>"</b>처럼,
        바깥이 <b>현재 입력과 한 치도 어긋나지 않게</b> 맞춘다. 위 ②에서 <b>탭 제목</b>을 지금의 <code>count</code>에 맞춘 것도 같다.
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

      {/* ③-2 '값이 바뀐다'는 뜻 → 유용성으로 연결 */}
      <h3 className="section-title">③-2 "의존성 값이 바뀐다"는 무슨 뜻인가 → 그래서 유용하다</h3>
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

      {/* ③-3 useEffect 없이 하려면? — 이벤트 핸들러 vs Effect */}
      <h3 className="section-title">③-3 그럼 useEffect '없이' 하려면? — 두 가지 시도</h3>
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
// 문제: ②-2에서 봤듯 렌더 도중 요청·setState는 무한 루프다 (렌더는 순수해야 한다).`}</pre>
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
        여기선 "왜 의존성이 필요한가"만 짚었다. <b>불러오는 동안의 로딩 처리</b>는 <b>9-3</b>,
        <b> 같은 버튼을 또 눌러도 안 불러오는 이유</b>는 <b>9-4</b>에서 더 깊게 다룬다.
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

      {/* 5-5 리렌더 감각과 잇기 */}
      <div className="concept">
        <p className="concept-lead">🔗 5-5와 잇기 — '스스로를 다시 부르는 감각'의 실물</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          <b>5-5 · 리액트가 부른다</b>에서 "리렌더는 마치 <b>컴포넌트가 스스로를 다시 부르는 듯한 감각</b>"이라 했다.
          그 흐름을 <b>userId가 바뀌는 순서</b>로 따라가 보자 — <b>값이 바뀔 때마다 한 바퀴</b>(effect→setState→리렌더)가 돈다.
          <b> ▶ 버튼</b>으로 userId를 바꿔 보라:
        </p>
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

      <h3 className="section-title">🧩 확인 드릴 — 의존성 배열, 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · [] = 한 번 · [값] = 그 값 바뀔 때 · 생략 = 매 렌더(무한) — 일곱 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(effect는 렌더 뒤 실행 · 의존성이 실행 시점을 정한다)을 상황만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: 'useEffect의 의존성 배열이 [] 이면 effect는 언제 실행되나?',
            options: ['처음 마운트된 뒤 딱 한 번', '매 렌더마다', '전혀 실행되지 않는다'],
            answer: 0,
            explain: "[]는 '바뀔 의존성이 없다'는 뜻이라 마운트 직후 한 번만 실행된다. 매 렌더마다 돌게 하려면 배열을 생략한다(거의 안 씀).",
          },
          {
            q: '아래 effect는 언제 다시 실행되나?',
            code: `useEffect(() => {
  document.title = '클릭 ' + count + '회';
}, [count]);`,
            options: ['count가 바뀔 때마다', '처음 한 번만', '아무 state나 바뀌면 매번'],
            answer: 0,
            explain: '의존성에 적은 count가 바뀔 때마다 다시 실행된다. 다른 state가 바뀌어도 count가 그대로면 이 effect는 건너뛴다.',
          },
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
          {
            q: 'useEffect에 적은 일은 언제 실행되나?',
            options: ['화면을 다 그린(렌더한) 뒤', '화면을 그리기 전에 먼저', '클릭할 때만'],
            answer: 0,
            explain: "effect는 렌더가 끝난 뒤 실행된다. 그래서 화면 그리기를 막지 않는다. 렌더 '도중'에 하면 안 되는 일(요청·타이머)을 여기로 미루는 것이다.",
          },
          {
            q: '컴포넌트 함수 본문(렌더 도중)에서 바로 setCount(count + 1)을 부르면?',
            options: ['렌더가 또 렌더를 불러 무한 반복 → 리액트가 막는다', '한 번만 잘 실행된다', '아무 일도 안 일어난다'],
            answer: 0,
            explain: "렌더 도중 setState는 또 렌더를 부르고, 그게 또 setState를 불러 무한이 된다(리액트가 'Too many re-renders'로 막는다). 그래서 이런 일은 렌더가 끝난 뒤인 useEffect로 미룬다.",
          },
        ]}
      />
    </section>
  )
}
