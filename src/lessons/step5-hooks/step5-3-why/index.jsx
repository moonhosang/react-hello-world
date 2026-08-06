// 5-3 · 왜 그런 규칙인가 — 호출 순서   (배우는 것: 리액트는 훅을 '부른 순서'로 기억한다)
// 5-1에서 배운 규칙이 왜 필요한지를 '호출 순서'로 설명한다.
// 조건부 호출이 순서를 밀어 값이 어긋나는 과정을 데모로 눈으로 확인한다.

import HookOrderDemo from './HookOrderDemo.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 리액트는 훅을 '부른 순서(슬롯)'로 값과 짝짓는다. 조건부 호출이 순서를 밀어 값이 어긋나는 과정.
const ORDER_CODE = `function Form() {
  const [name, setName] = useState('')      // 훅 0번 슬롯
  const [age,  setAge]  = useState(0)        // 훅 1번 슬롯
  const [ok,   setOk]   = useState(false)    // 훅 2번 슬롯
  // ...
}`

const ORDER_STEPS = [
  {
    hl: [2, 3, 4],
    tag: '① 첫 렌더',
    t: '부른 순서대로 슬롯에 저장한다',
    d: (<>리액트는 훅을 <b>이름으로 모른다.</b> <b>부른 순서</b>로 값을 짝짓는다 — 0번=name, 1번=age, 2번=ok.</>),
    note: '슬롯 [0]=name · [1]=age · [2]=ok',
  },
  {
    hl: [2, 3, 4],
    tag: '② 다시 렌더',
    t: '같은 순서라 정확히 다시 짝지어진다',
    d: (<>다음 렌더에도 <b>같은 순서</b>로 부르니 0→name, 1→age, 2→ok로 딱 맞는다. 그래서 값이 <b>유지</b>된다.</>),
    note: '슬롯 [0]=name · [1]=age · [2]=ok (그대로)',
  },
  {
    hl: [2],
    tag: '③ 조건부로 건너뛰면',
    t: 'if로 첫 훅을 건너뛰면 슬롯이 밀린다',
    d: (<>만약 <code>name</code> 훅을 <code>if</code>로 감싸 어떤 렌더에서 <b>건너뛰면</b>? 이제 <b>age가 0번</b>, ok가 1번으로 <b>한 칸씩 밀린다.</b></>),
    note: '슬롯 [0]=age · [1]=ok · [2]=∅ (밀림!)',
  },
  {
    hl: [3, 4],
    tag: '④ 어긋남',
    t: '리액트는 0번=name인 줄 아는데 age가 들어왔다',
    d: (<>리액트는 여전히 "0번 = name"으로 기억하는데 실제 0번엔 <code>age</code> 값이 들어왔다 → <b>값이 엉뚱하게 짝지어지고</b> <code>"change in the order of Hooks"</code> 에러가 난다.</>),
  },
  {
    tag: '⑤ 규칙',
    t: '그래서 늘 최상위에서 같은 순서로',
    d: (<>슬롯이 밀리지 않게 하려면 훅을 <b>조건문·반복문 없이 최상위에서, 언제나 같은 순서로</b> 부른다. 그게 규칙 1의 진짜 이유다.</>),
  },
]

export default function StepHooks2() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">5-3</span>
        <h2>왜 그런 규칙인가 — 호출 순서</h2>
        <p>리액트는 훅을 이름이 아니라 '부른 순서'로 기억한다. 그래서 훅은 늘 같은 순서로 불러야 한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          리액트는 훅을 <b>부른 순서(0번, 1번 …)</b>로 값과 짝짓는다. 조건부 호출은 그 순서를 밀어
          값을 어긋나게 하고, 결국 에러로 이어진다.
        </p>
      </div>

      {/* ── ① 왜 그런 규칙인가 ─────────────────────────────── */}
      <h3 className="section-title">① 왜 그런 규칙인가 — 리액트는 '호출 순서'로 기억한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 리액트는 훅을 '부른 순서'로 구분한다 · 조건부 호출은 순서를 어긋나게 한다</span>
      <p className="section-desc">
        리액트는 각 훅이 어떤 값인지 <b>이름</b>으로 알지 못한다. 대신 <b>부른 순서(0번, 1번 …)</b>로 값을 짝지어 기억한다.
        그래서 렌더마다 순서가 같아야 한다. 조건문 안에서 부르면 어떤 렌더에선 부르고 어떤 렌더에선 건너뛰어
        <b> 순서가 밀리고</b>, 그러면 값이 엉뚱하게 어긋난다.
      </p>
      <p className="section-desc">
        아래 데모에서 버튼을 눌러 훅 하나를 <b>조건부로 건너뛰면</b> 어떻게 순서가 밀려 값이 어긋나는지 직접 볼 수 있다.
        (데모 코드는 <code>HookOrderDemo.jsx</code>에 있다.)
      </p>
      <span className="learn-tag">📎 학습 포인트 · 훅은 이름이 아니라 '부른 순서(슬롯)'로 기억된다 — 건너뛰면 슬롯이 밀린다</span>
      <SourceTrace file="Form — 훅 호출 순서(슬롯)" code={ORDER_CODE} steps={ORDER_STEPS} />
      <HookOrderDemo />
      <p className="section-desc">
        그래서 규칙은 결국 하나로 모인다 — <b>훅은 언제나 같은 순서로, 최상위에서 부른다.</b> 그러면 리액트가 값을 헷갈리지 않는다.
      </p>

      {/* ── ② 규칙을 어기면? ──────────────────────────────── */}
      <h3 className="section-title">② 규칙을 어기면? — 각각 어떻게 되는가</h3>
      <span className="learn-tag">📎 학습 포인트 · 규칙1 위반 = 순서가 꼬여 값이 어긋나거나 크래시 · 규칙2 위반 = "Invalid hook call" 즉시 에러</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="card">
          <div className="file-label">❌ 규칙 1 위반 — 조건부 호출</div>
          <pre className="concept-flow">{`function Profile({ isLoggedIn }) {
  if (isLoggedIn) {
    const [name, setName] = useState('')  // 조건에 따라 부르거나 건너뛴다
  }
  const [age, setAge] = useState(0)
}`}</pre>
          <p className="demo-desc">
            <b>어떻게 되나:</b> 로그인 여부가 바뀌면 훅 <b>개수·순서가 달라진다</b> → 리액트가 이전 렌더의 값과
            <b> 엉뚱하게 짝짓는다</b>(예: <code>age</code>가 <code>name</code> 자리로). 개발 모드에선 콘솔에
            <code> "Rendered fewer hooks than expected"</code> / <code>"change in the order of Hooks"</code> 에러가 뜨며 <b>화면이 깨진다.</b>
          </p>
        </div>
        <div className="card">
          <div className="file-label">❌ 규칙 2 위반 — 리액트 함수 밖 호출</div>
          <pre className="concept-flow">{`function formatName(user) {   // 그냥 일반 함수 (컴포넌트 아님)
  const [name, setName] = useState('')  // 여기서 훅 호출
  return name
}`}</pre>
          <p className="demo-desc">
            <b>어떻게 되나:</b> 부르는 <b>즉시 에러</b> —
            <code> "Invalid hook call. Hooks can only be called inside the body of a function component."</code>
            리액트가 이 상태를 <b>어느 컴포넌트에 매달지 알 수 없어</b> 화면이 아예 뜨지 않는다.
          </p>
        </div>
      </div>
      <p className="section-desc">
        둘 다 결론은 같다 — 훅은 <b>리액트 함수(컴포넌트·커스텀 훅)의 최상위에서, 언제나 같은 순서로</b> 불러야
        리액트가 값을 제대로 짝지을 수 있다.
      </p>
    </section>
  )
}
