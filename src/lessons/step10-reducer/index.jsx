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

export default function Step10Reducer() {
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
    </section>
  )
}
