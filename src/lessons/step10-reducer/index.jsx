// ============================================================
// 11단계 · useReducer   (배우는 것: 흩어진 상태 로직을 한 곳으로 모으기)
// ============================================================
// 상태를 바꾸는 방법이 하나면 useState로 충분하다.
// 하지만 증가/감소/리셋/추가/삭제처럼 "바꾸는 방법"이 여러 개고 서로 얽히면,
// 그 로직이 컴포넌트 곳곳에 흩어진다.
// useReducer는 그 모든 로직을 reducer 함수 "한 곳"에 모으고,
// 화면은 dispatch로 "무엇을 할지"(action)만 보낸다.

import CounterReducer from './CounterReducer.jsx'
import TodoReducer from './TodoReducer.jsx'
import SourceTrace from '../../components/SourceTrace.jsx'
import TechTags from '../../components/TechTags.jsx'

// dispatch(무엇) → reducer(어떻게) → 새 state → 리렌더.
const REDUCER_CODE = `function reducer(state, action) {
  switch (action.type) {
    case 'increment': return state + 1   // 새 state를 계산해 return
    case 'reset':     return 0
    default:          return state
  }
}
const [count, dispatch] = useReducer(reducer, 0)

<button onClick={() => dispatch({ type: 'increment' })}>+1</button>`

const REDUCER_STEPS = [
  {
    hl: [8],
    tag: '① 설정',
    t: 'useReducer(reducer, 0) → [count, dispatch]',
    d: (<><code>useReducer(reducer, 0)</code>가 <b>[현재값 count, dispatch]</b>를 준다. <code>count</code>는 0으로 시작, 바꿀 땐 <code>dispatch</code>로 action을 보낸다.</>),
    note: 'count = 0',
  },
  {
    hl: [10],
    tag: '② dispatch',
    t: '"무엇을 할지"(action)만 보낸다',
    d: (<>+1 클릭 → <code>dispatch({'{ type: "increment" }'})</code>. 화면은 <b>무엇을 할지</b>만 보낸다 — <b>어떻게</b> 바꿀지는 여기 안 적는다.</>),
  },
  {
    hl: [1, 2, 3],
    tag: '③ reducer 실행',
    t: 'reducer(현재 state, action)이 불린다',
    d: (<>리액트가 <code>reducer(0, {'{type:"increment"}'})</code>을 부른다. <code>switch</code>가 <code>action.type</code>에 걸려 <code>return state + 1</code> = <b>1</b>.</>),
    note: 'reducer(0, increment) → 1',
  },
  {
    hl: [3],
    tag: '④ 새 state',
    t: 'return한 값이 새 count가 된다',
    d: (<>reducer가 돌려준 <b>1</b>이 다음 <code>count</code>가 된다. 원본을 건드리지 않고 <b>새 값을 return</b>(순수 함수)해 리렌더가 예약된다.</>),
    note: 'count = 1',
  },
  {
    hl: [8],
    tag: '⑤ 리렌더',
    t: '화면 갱신 — 로직은 reducer 한 곳',
    d: (<><code>count = 1</code>로 다시 렌더돼 화면이 바뀐다. <b>dispatch(무엇) → reducer(어떻게) → 새 state</b> — 바꾸는 규칙이 여러 개여도 전부 <code>reducer</code> 한 곳에 모인다.</>),
  },
]

const compareState = `// useState — 바꾸는 방법마다 로직이 흩어진다
const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>+1</button>
<button onClick={() => setCount(count - 1)}>-1</button>
<button onClick={() => setCount(0)}>reset</button>
// 규칙이 늘수록 여기저기 계산이 퍼진다`

const compareReducer = `// useReducer — 로직이 reducer 한 곳에 모인다
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return state + 1
    case 'decrement': return state - 1
    case 'reset':     return 0
    default:          return state
  }
}
const [count, dispatch] = useReducer(reducer, 0)
// 화면은 dispatch({ type: '...' })만 보낸다`

export default function Step10Reducer({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">11단계</span>
        <h2>useReducer — 상태 로직 모으기</h2>
        <p>상태를 바꾸는 방법이 여러 개일 때, 그 로직을 reducer 한 곳에 모으고 화면은 "무엇을 할지"만 보낸다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          상태를 바꾸는 방법이 여러 개면, 그 로직을 <b>reducer 함수 한 곳</b>에 모으고
          화면은 <code>dispatch</code>로 <b>'무엇을 할지'(action)</b>만 보낸다. 계산은 reducer가 맡는다.
        </p>
      </div>

      <h3 className="section-title">① 카운터로 감 잡기</h3>
      <span className="learn-tag">📎 학습 포인트 · useReducer(reducer, 초깃값) → [state, dispatch]</span>
      <p className="section-desc">
        버튼은 <code>dispatch({'{'} type: 'increment' {'}'})</code>처럼 <b>action만</b> 보낸다.
        <code>+1 · -1 · 0으로</code> 어떻게 바꿀지는 아래 <code>reducer</code> 함수 한 곳이 결정한다.
      </p>
      <CounterReducer />

      <span className="learn-tag">📎 학습 포인트 · dispatch(무엇) → reducer(어떻게 바꿀지 계산) → 새 state → 리렌더</span>
      <SourceTrace file="useReducer — dispatch → reducer 흐름" code={REDUCER_CODE} steps={REDUCER_STEPS} />

      <h3 className="section-title">② useState vs useReducer</h3>
      <span className="learn-tag">📎 학습 포인트 · 바꾸는 방법이 많고 서로 얽힐 때 reducer가 더 낫다</span>
      <p className="section-desc">
        똑같은 카운터를 두 방식으로 썼다. <b>바꾸는 규칙이 하나면 useState</b>가 간단하다.
        하지만 규칙이 늘고 서로 얽히기 시작하면, <b>reducer 한 곳에 모으는 편</b>이 읽기 쉽고 고치기 쉽다.
      </p>
      <div className="compare-grid">
        <div className="card">
          <div className="file-label">😵 useState (로직이 흩어짐)</div>
          <pre className="err-code">{compareState}</pre>
        </div>
        <div className="card">
          <div className="file-label">🧭 useReducer (로직이 한 곳)</div>
          <pre className="err-code">{compareReducer}</pre>
        </div>
      </div>

      <h3 className="section-title">③ 리스트에 적용 — 할 일 목록</h3>
      <span className="learn-tag">📎 학습 포인트 · action.type으로 분기하면 add · toggle · delete가 한눈에 보인다</span>
      <p className="section-desc">
        할 일 <b>배열</b>을 reducer로 관리한다. 추가·완료토글·삭제 버튼이 전부 <code>dispatch</code> 한 줄이고,
        실제 배열 계산은 <code>todoReducer</code>의 <code>case</code>들이 나눠 맡는다.
      </p>
      <TodoReducer />

      <div className="try-it">
        <h4>💡 핵심</h4>
        <ul>
          <li><b>reducer는 순수 함수</b>다 — 원본 state를 건드리지 않고(<code>push</code>/직접 대입 ❌) 항상 <b>새 state를 return</b>한다.</li>
          <li><b>dispatch는 '무엇을 할지'만</b> 기술한다. <code>{'{'} type: 'add', text {'}'}</code>처럼 action을 보낼 뿐, 어떻게 바꿀지는 reducer가 정한다.</li>
          <li>배열·객체를 바꿀 땐 <code>[...todos, 새것]</code>, <code>map</code>, <code>filter</code>로 <b>새 값</b>을 만든다. (불변성)</li>
          <li>바꾸는 방법이 하나뿐이면 <b>useState</b>가 간단하다. 방법이 여러 개고 얽히면 <b>useReducer</b>로 모은다.</li>
        </ul>
      </div>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><code>CounterReducer.jsx</code>의 reducer에 <code>case 'incrementBy'</code>를 더해, <code>action.amount</code>만큼 증가하는 <b>+10 버튼</b>을 만들어 보자.</li>
          <li><code>TodoReducer.jsx</code>에 <code>case 'clearDone'</code>을 더해, <b>완료된 할 일을 한 번에 지우는</b> 버튼을 만들어 보자. (힌트: <code>filter</code>)</li>
        </ol>
      </div>

      {/* 🌍 실전에선 — 전용 상태관리 vs 의존성 없이 */}
      <h3 className="section-title">🌍 실전에선 — 전용 상태관리 라이브러리 vs 내장으로 버티기</h3>
      <span className="learn-tag">📎 학습 포인트 · reducer의 아이디어(state + action)는 실전 상태관리로 확장된다 · 하지만 라이브러리는 '외부 의존성'이다</span>
      <p className="section-desc">
        <code>useReducer</code>는 <b>한 컴포넌트</b>의 얽힌 상태를 모은다. 그런데 앱이 커져 <b>여러 화면이 같은 상태</b>를
        공유하기 시작하면(로그인·장바구니·테마 등) '전역 상태 관리'가 필요해진다. 여기서 갈림길이 있다.
      </p>
      <div className="two-col">
        <div className="card">
          <div className="file-label">📦 전용 라이브러리를 쓴다 (실전에서 흔함)</div>
          <ul className="section-list" style={{ margin: 0 }}>
            <li><b>Redux Toolkit</b> — 바로 이 <code>state + action + reducer</code> 아이디어를 앱 전역으로 확장한 표준.</li>
            <li><b>Zustand</b>·<b>Jotai</b> — 훨씬 가볍게 전역 상태를 두는 요즘 인기 라이브러리.</li>
            <li><b>MobX</b> — 관찰(observable) 방식. 접근이 다르지만 목적은 같다.</li>
          </ul>
          <p className="demo-desc" style={{ margin: '8px 0 0' }}>공통점 — 전부 여기서 배운 <b>"무엇을 할지(action)를 보내면 상태가 바뀐다"</b>의 확장이다.</p>
        </div>
        <div className="card">
          <div className="file-label">🧱 의존성 없이 내장으로 버틴다</div>
          <p className="section-desc" style={{ margin: 0 }}>
            라이브러리는 <b>외부 의존성</b>이다. 번들 크기·러닝커브·유지보수 부담이 따라온다. 그래서
            <b> 의존성을 극도로 아끼는 프로젝트</b>(무거운 의존성을 피하려는 오픈소스, 최소 번들 지향 앱 등)는
            리액트 <b>내장</b> <code>useReducer + Context</code> 조합만으로 전역 상태를 만든다 —
            <b> 8-2에서 본 그것</b>이 바로 그 방법이다. 새 의존성 없이 충분히 굴러간다.
          </p>
        </div>
      </div>

      {/* ⚠️ 외부 의존성이 골치아픈 이유 — 구체적으로 (MUI 예시) */}
      <h3 className="section-title">⚠️ 외부 의존성이 왜 골치아픈가 — 구체적으로</h3>
      <span className="learn-tag">📎 학습 포인트 · 라이브러리 하나가 딸린 의존성·버전·유지보수·번들·보안을 통째로 데려온다</span>
      <p className="section-desc">
        "그냥 <code>npm install</code> 한 줄인데 뭐가 문제야?" 싶다. 예를 들어 유명한 UI 라이브러리 <b>MUI</b>(Material UI, <code>mui.com</code>) 하나를 깔면,
        겉으론 버튼·다이얼로그가 예쁘게 나오지만 뒤에서 이런 일들이 따라온다:
      </p>
      <div className="card">
        <div className="file-label">📦 MUI 하나 = 딸려오는 것들 (전이 의존성)</div>
        <pre className="err-code">{`내 앱
└─ @mui/material          ← 내가 깐 것 (한 줄)
   ├─ @emotion/react       ← 스타일 엔진 (자동으로 딸려옴)
   ├─ @emotion/styled
   ├─ @mui/system · @mui/utils · @mui/base …
   └─ (그 각각이 또 자기 의존성을 딸고 온다)
// npm install 한 줄 → node_modules에 수십~수백 개 패키지가 생긴다`}</pre>
      </div>
      <ul className="section-list">
        <li><b>① 전이 의존성 (내가 안 고른 것들)</b> — MUI 하나 깔았을 뿐인데 emotion 등 <b>남의 패키지 수십 개</b>가 함께 들어온다. node_modules가 수백 MB가 되고, 내 앱이 실제로 뭘 실행하는지 다 알기 어려워진다.</li>
        <li><b>② 버전 충돌 (peer dependency)</b> — MUI는 "React 18 이상"을 요구하고 다른 라이브러리는 "React 17만" 요구하면 <b>둘을 같이 못 쓴다</b>. React 메이저 버전을 올리고 싶어도 MUI가 아직 지원 안 하면 <b>업그레이드가 발이 묶인다</b>.</li>
        <li><b>③ 유지보수·수명 (남의 손에 달림)</b> — 그 라이브러리가 업데이트를 멈추거나 방향을 바꾸면 내 앱도 <b>같이 낡는다</b>. 새 React에서 경고·에러가 떠도 <b>내가 직접 못 고친다</b>.</li>
        <li><b>④ 번들 크기 (사용자 다운로드)</b> — 버튼 하나 예쁘게 쓰려고 큰 라이브러리를 통째로 → 사용자가 받을 JS가 커져 <b>첫 화면이 느려진다</b>.</li>
        <li><b>⑤ 잠금(lock-in)</b> — 코드 곳곳이 그 라이브러리 방식에 물들면, 나중에 <b>다른 걸로 바꾸기</b>가 큰 공사가 된다.</li>
        <li><b>⑥ 공급망 보안</b> — 내가 직접 안 쓴 <b>깊은 의존성</b> 하나에 취약점·악성코드가 섞이면 그게 <b>내 앱까지</b> 딸려 들어온다. (2016년 <code>left-pad</code>라는 11줄짜리 작은 패키지가 사라져 수많은 프로젝트 빌드가 멈춘 일도 있다.)</li>
      </ul>
      <div className="concept">
        <p className="concept-lead">🧱 그래서 "의존성 최소화" 철학</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          어떤 오픈소스·팀은 이 골칫거리를 피하려고 <b>외부 의존성을 극도로 아낀다</b> — 꼭 필요한 것만 넣고, 아니면 <b>직접 작게 만들어</b> 쓴다.
          상태 관리도 마찬가지라, 새 라이브러리 대신 리액트 <b>내장 <code>useReducer + Context</code></b>로 버틴다. <b>"덜 깔수록 덜 깨진다."</b>
        </p>
      </div>
      <p className="section-desc">
        ⚖️ 물론 <b>반대편 이야기</b>도 있다 — 잘 만든 라이브러리는 <b>바퀴를 다시 발명하지 않게</b> 해 시간을 크게 아끼고, 나보다 더 많이 검증됐다.
        그래서 "무조건 안 쓴다"가 아니라, <b>이 골칫거리를 감수할 만큼 값어치가 있나</b>를 그때그때 따져 넣는 게 핵심이다.
      </p>

      <div className="try-it">
        <h4>🧭 그래서 언제 무엇을</h4>
        <ul>
          <li><b>작고 지역적</b> → <code>useState</code>.</li>
          <li><b>한 컴포넌트 안에서 로직이 얽힘</b> → <code>useReducer</code>(이 강의).</li>
          <li><b>앱 전역 공유</b> → 먼저 <code>useReducer + Context</code>로 시도(의존성 0). 규모·성능 요구가 커지면 그때 <b>Redux Toolkit·Zustand</b> 같은 전용 라이브러리를 도입한다.</li>
          <li>원칙 — <b>라이브러리는 "정말 필요할 때" 늦게 넣는다.</b> 미리 깔지 않는다.</li>
        </ul>
      </div>
      <TechTags
        items={[
          { label: '8-2 · 전역 상태 (Context+reducer)', to: 7.2 },
          { label: '8-1 · prop drilling → Context', to: 7.1 },
        ]}
        onGo={onGo}
      />
    </section>
  )
}
