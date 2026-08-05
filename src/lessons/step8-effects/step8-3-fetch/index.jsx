// 9-4 · 데이터 불러오기
// 마운트되면 데이터를 가져와 state에 넣는다. loading → data 두 상태로 관리한다.

import { useState, useEffect } from 'react'
import { fetchUsers } from '../../../lib/fakeApi.js'
import SourceTrace from '../../../components/SourceTrace.jsx'
import TechTags from '../../../components/TechTags.jsx'

// 아래 라이브 데모와 '같은' 로직을 줄 단위로 보여 주고, 실행 순서를 한 단계씩 짚는다.
const FETCH_CODE = `const [users, setUsers] = useState([])          // 목록 (처음엔 빈 배열)
const [loading, setLoading] = useState(true)    // 불러오는 중?

const load = () => {
  setLoading(true)                   // "지금 불러온다" 표시
  fetchUsers().then((data) => {      // 요청 시작 → 약 0.8초 뒤 응답
    setUsers(data)                   // 받은 목록을 state에
    setLoading(false)                // 로딩 끝
  })
}

useEffect(() => {
  load()                             // 마운트되면 자동으로 한 번
}, [])                               // [] = 처음 딱 한 번만`

const FETCH_STEPS = [
  {
    hl: [1, 2],
    tag: '① 첫 렌더',
    t: '컴포넌트 함수가 처음 실행된다',
    d: (<>화면에 처음 붙을 때 컴포넌트 함수가 한 번 돈다. <code>useState</code>가 초기값을 만든다 — <code>users</code>는 <b>빈 배열</b>, <code>loading</code>은 <b>true</b>. 아직 데이터는 없다.</>),
    note: 'users = [] · loading = true',
  },
  {
    tag: '② 화면 그림',
    t: 'return의 JSX가 화면에 그려진다',
    d: (<><code>loading</code>이 <b>true</b>라, 목록 대신 <b>"⏳ 불러오는 중…"</b>이 먼저 보인다. 중요한 건 <b>effect는 아직 안 돌았다</b>는 것 — effect는 화면을 다 그린 <b>뒤</b>에 실행된다.</>),
    note: '화면: ⏳ 불러오는 중…',
  },
  {
    hl: [12, 13, 14],
    tag: '③ effect',
    t: '렌더가 끝난 뒤 useEffect가 실행된다',
    d: (<>화면을 그린 직후 리액트가 effect를 부른다. 의존성이 <code>[]</code>라 <b>마운트 직후 딱 한 번만</b> 돈다. 그 안에서 <code>load()</code>를 호출한다.</>),
  },
  {
    hl: [5],
    tag: '④ load 시작',
    t: 'setLoading(true) — 이미 true라 화면은 그대로',
    d: (<><code>load()</code> 첫 줄. 여기선 이미 <code>loading</code>이 true라 화면 변화는 없다. 하지만 <b>버튼으로 다시 부를 땐</b>(false→true) 이 줄이 스피너를 다시 켜는 역할을 한다.</>),
  },
  {
    hl: [6],
    tag: '⑤ 요청',
    t: 'fetchUsers()가 Promise를 즉시 돌려주고 넘어간다',
    d: (<><code>fetchUsers()</code>는 <b>결과를 기다리지 않는다.</b> "0.8초 뒤 값이 올 상자"(Promise)를 즉시 반환하고, <code>.then(콜백)</code>으로 "값이 오면 이걸 해"만 <b>예약</b>해 둔다. 함수는 여기서 끝나고, 브라우저는 <b>멈추지 않는다</b>(비동기).</>),
    note: '아직 화면: ⏳ 불러오는 중… (0.8초 대기)',
  },
  {
    tag: '⑥ 대기',
    t: '0.8초 동안 화면은 스피너 그대로',
    d: (<>응답을 기다리는 동안 코드는 멈춰 서서 기다리지 <b>않는다.</b> 스크롤·클릭 다 된다. 이게 <code>loading</code> 상태가 필요한 이유 — <b>"기다리는 시간"을 화면에 표현</b>하려고.</>),
  },
  {
    hl: [7, 8],
    tag: '⑦ 응답 도착',
    t: '약 0.8초 뒤 .then 콜백이 실행된다',
    d: (<>Promise가 데이터로 resolve되면 예약해 둔 콜백이 이제 돈다. <code>setUsers(data)</code>로 받은 목록을 담고, <code>setLoading(false)</code>로 로딩을 끈다. <b>두 state가 바뀌었으니 리렌더가 예약</b>된다.</>),
    note: 'users = [3명] · loading = false',
  },
  {
    hl: [1, 2],
    tag: '⑧ 리렌더',
    t: '바뀐 state로 컴포넌트 함수가 다시 실행된다',
    d: (<>이번엔 <code>useState</code>가 <b>기억해 둔 새 값</b>을 돌려준다 — <code>users</code>는 3명, <code>loading</code>은 false. (초기값 <code>[]</code>·<code>true</code>는 첫 렌더에만 쓰였다.)</>),
    note: 'users = [3명] · loading = false',
  },
  {
    tag: '⑨ 완료',
    t: '이번엔 목록이 화면에 그려진다',
    d: (<><code>loading</code>이 false라 <code>users.map(...)</code>으로 <b>3명의 목록</b>이 보인다. effect는 <code>[]</code> 그대로라 <b>다시 돌지 않는다</b>. 흐름 끝 — 버튼을 누르면 <code>load()</code>부터 다시 시작한다.</>),
    note: '화면: 김코딩 · 이디자인 · 박백엔드',
  },
]

export default function Step8_3({ onGo }) {
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
        <span className="badge effect-badge">9-4</span>
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
      <span className="learn-tag">📎 전제 · <code>fetch</code>·<code>.then</code>·<code>async/await</code>가 낯설면 JS 트랙 J7을 먼저 보라</span>
      <TechTags items={[{ label: '🟨 J7 · Promise·async/await', to: 'js-async' }]} onGo={onGo} />

      {/* 🔬 소스 + 동작 과정 — 아래 라이브 데모가 '어떤 순서로' 도는지 한 단계씩 */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 한 단계씩</h3>
      <span className="learn-tag">📎 학습 포인트 · 첫 렌더(빈 목록·loading) → effect → 요청 → 0.8초 뒤 응답 → 리렌더 → 목록. 이 순서가 핵심이다</span>
      <p className="section-desc">
        아래는 이 데모의 <b>실제 로직</b>이다. <b>다음 ▶</b>을 눌러 가며 <b>지금 어느 줄이 도는지</b>와 그때 state가 어떻게 바뀌는지 따라가 보라.
        특히 <b>⑤ 요청 → ⑦ 응답</b> 사이의 <b>0.8초 공백</b>을 눈여겨보라 — 그 시간을 <code>loading</code>이 메운다.
      </p>
      <SourceTrace file="step8-3-fetch/index.jsx (핵심 로직)" code={FETCH_CODE} steps={FETCH_STEPS} />

      <h3 className="section-title">▶ 직접 돌려 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · 위 트레이스의 ④~⑨가 버튼 한 번에 실제로 일어난다</span>
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
