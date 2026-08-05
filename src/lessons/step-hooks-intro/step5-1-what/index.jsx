// 5-1 · 훅(Hook)이란 & 규칙   (배우는 것: 훅의 정체 · 규칙 2가지)
// 앞의 3단계(3-1)에서 우리는 이미 useState를 써 봤다. 그 useState가 바로 '훅'이다.
// 이 레슨은 방금 쓴 useState를 anchor 삼아 "이런 게 훅이다"로 일반화한다 (구체 → 추상).
// 앞으로 배울 useEffect·useRef·useContext … 도 전부 여기서 배우는 규칙을 따른다.

import CustomHookDemo from './CustomHookDemo.jsx'
import InstanceDemo from './InstanceDemo.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 커스텀 훅 — 최상위에서 useToggle 호출 → 안에서 useState → 반환 → 사용. "훅 안에서 훅"의 흐름.
const TOGGLE_CODE = `// use로 시작하는 '내 함수' = 커스텀 훅
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)   // 훅 안에서 훅 호출 — 정상!
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

// 쓰는 쪽 — 커스텀 훅도 '최상위'에서 부른다
function Light() {
  const [on, toggle] = useToggle(true)    // 처음부터 켜짐(💡)
  return <button onClick={toggle}>{on ? '💡' : '🌑'}</button>
}`

const TOGGLE_STEPS = [
  {
    hl: [10],
    tag: '① 호출',
    t: 'Light가 최상위에서 useToggle을 부른다',
    d: (<><code>Light</code>가 렌더되며 <b>맨 바깥(최상위)</b>에서 <code>useToggle(true)</code>를 부른다. 커스텀 훅도 조건문·반복문 안이 아니라 최상위에서 부른다(규칙 1).</>),
  },
  {
    hl: [3],
    tag: '② 훅 안의 훅',
    t: 'useToggle 안에서 useState 실행',
    d: (<><code>useToggle</code> 안으로 들어가 <code>useState(true)</code>가 돈다 → <code>on = true</code>, <code>setOn</code> 확보. 이름이 <code>use</code>로 시작하니 <b>훅을 불러도 되는 곳</b>(규칙 2)이라 정상이다.</>),
    note: 'on = true',
  },
  {
    hl: [4, 5],
    tag: '③ 반환',
    t: '[on, toggle]을 돌려준다',
    d: (<><code>toggle</code> 함수를 만들고 <code>[on, toggle]</code>을 반환한다. <code>useState</code>가 <code>[값, set함수]</code>를 주듯, 커스텀 훅도 필요한 걸 배열/객체로 돌려준다.</>),
  },
  {
    hl: [10, 11],
    tag: '④ 사용',
    t: 'Light가 받아 💡을 그린다',
    d: (<><code>Light</code>는 <code>[on, toggle]</code>을 받아 버튼에 💡을 그린다. 클릭 → <code>toggle</code> → <code>setOn</code> → 리렌더 → 다시 ①부터.</>),
  },
  {
    tag: '⑤ 독립',
    t: '같은 훅을 여러 곳에서 써도 안 섞인다',
    d: (<>같은 <code>useToggle</code>을 조명·알림 두 곳에서 써도, <b>각 인스턴스가 자기 <code>on</code> 슬롯</b>을 따로 갖는다. 정의는 하나(설계도), 상태는 사용처마다 독립이다.</>),
  },
]

export default function StepHooks1() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">5-1</span>
        <h2>훅(Hook)이란 & 규칙</h2>
        <p>3단계(3-1)에서 쓴 useState가 바로 '훅'이다. 훅의 정체와, 훅을 부를 때 지켜야 할 규칙을 익힌다.</p>
      </header>

      {/* 이 단계의 '딱 하나' — 훅은 use로 시작하는 특별한 함수이고, 최상위에서만 부른다 */}
      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          훅은 <b>use로 시작하는 특별한 함수</b>이고, 반드시 <b>컴포넌트 최상위</b>에서만 부른다.
          조건문·반복문 안에서 부르지 않는다.
        </p>
      </div>

      {/* ── ① 훅이란 ───────────────────────────────────────── */}
      <h3 className="section-title">① 훅이란 — 우리가 이미 쓴 useState가 훅이다</h3>
      <span className="learn-tag">📎 학습 포인트 · use로 시작하는 함수들이 훅이고, 컴포넌트가 리액트 기능에 '고리를 거는' 통로다</span>
      <p className="section-desc">
        3단계(3-1)에서 <code>const [count, setCount] = useState(0)</code>을 썼다. 이 <code>useState</code>가
        바로 우리가 처음 쓴 <b>훅(Hook)</b>이다. 훅은 <b>use로 시작하는 함수</b>로, 그냥 함수였던
        컴포넌트가 <b>상태·효과 같은 리액트 기능에 "고리를 거는"</b> 통로다.
      </p>
      <p className="section-desc">
        📖 <b>한 줄 정의:</b> 훅은 <b>함수 컴포넌트가 리액트의 state·생명주기 기능에 "연결(hook into)"</b>하게
        해 주는 자바스크립트 함수다. 리액트 <b>16.8</b>에서 도입돼, state 관련 로직을 컴포넌트에서 떼어내는 역할을 한다.
      </p>
      <div className="concept">
        <p className="concept-lead">
          이름이 <code>use</code>로 시작하면 훅이라는 약속이다. 앞으로 이런 훅들을 하나씩 배운다:
        </p>
        <ul className="section-list">
          <li><code>useState</code> — 변하는 <b>값(상태)</b>을 기억한다 <b>(3단계에서 배움 ✅)</b></li>
          <li><code>useEffect</code> — 렌더 후 <b>바깥 세상과의 작업</b>(구독·타이머·요청 등)을 한다</li>
          <li><code>useRef</code> — 다시 그려도 유지되는 <b>상자</b>, DOM에 직접 접근할 때 쓴다</li>
          <li><code>useContext</code> — 멀리 있는 값을 <b>props 없이</b> 꺼내 쓴다</li>
        </ul>
        <p className="section-desc">
          전부 <code>use</code>로 시작하고, <b>지금부터 배우는 규칙</b>을 똑같이 따른다. 그러니 규칙을 한 번 익혀 두면
          새 훅을 만나도 쓰는 법이 같다.
        </p>
      </div>

      {/* ── ② 훅은 왜 나왔나 (도입 배경) ───────────────────── */}
      <h3 className="section-title">② 훅은 왜 나왔나? — 세 가지 문제를 풀려고</h3>
      <span className="learn-tag">📎 학습 포인트 · 훅은 '상태 로직 재사용 · 복잡한 컴포넌트 · 클래스 혼란' 세 문제를 풀려고 나왔다</span>
      <p className="section-desc">훅(리액트 16.8) 이전엔 이런 문제들이 있었다:</p>
      <ul className="section-list">
        <li>
          <b>상태 로직 재사용이 어렵다</b> — 컴포넌트 사이에 상태 로직을 공유하려면
          <b> render props·HOC(고차 컴포넌트)</b> 같은 패턴을 써야 했고, 그럴수록 래퍼가 겹겹이 쌓여 트리가 복잡해졌다.
          훅은 <b>트리 구조를 바꾸지 않고</b> 상태 로직만 떼어 재사용한다. (→ 나중에 배울 <b>커스텀 훅</b>)
        </li>
        <li>
          <b>복잡한 컴포넌트를 이해하기 어렵다</b> — 클래스의 <b>생명주기 메서드</b>엔 서로 관계없는 로직
          (데이터 요청 · 이벤트 구독 · 정리)이 한데 얽혔다. 훅은 생명주기가 아니라
          <b> "서로 관련된 코드끼리"</b> 작은 함수로 나눈다.
        </li>
        <li>
          <b>클래스와 <code>this</code>가 혼란스럽다</b> — 클래스 컴포넌트는 <code>this</code> 바인딩·생성자 등
          자바스크립트 클래스 지식을 요구해 헷갈렸다. 훅은 <b>클래스 없이 함수만으로</b> 같은 기능을 쓰게 한다.
        </li>
      </ul>

      {/* ── ③ 훅의 규칙 2가지 ─────────────────────────────── */}
      <h3 className="section-title">③ 훅의 규칙 2가지</h3>
      <span className="learn-tag">📎 학습 포인트 · ① 컴포넌트 최상위에서만 부른다 · ② 리액트 함수 안에서만 부른다</span>
      <p className="section-desc">📏 훅을 쓸 때 지켜야 할 규칙은 딱 둘이다:</p>
      <ul className="section-list">
        <li>
          <b>규칙 1 · 최상위에서만 부른다</b> — 훅은 컴포넌트(또는 커스텀 훅)의 <b>맨 바깥(최상위)</b>에서만 부른다.
          <b>조건문·반복문·중첩 함수·이벤트 핸들러 안</b>에서는 부르지 않는다.
        </li>
        <li>
          <b>규칙 2 · 리액트 함수 안에서만 부른다</b> — 훅은 <b>함수 컴포넌트</b>나 <b>커스텀 훅</b> 안에서만 부른다.
          일반 자바스크립트 함수 안에서는 부르지 않는다.
        </li>
      </ul>
      <p className="section-desc">
        아래 6가지 자리에서 규칙을 어기기 쉽다 — <b>1·2·6은 규칙 1</b>(최상위가 아니라 순서·개수가 흔들림),
        <b> 3·4·5는 규칙 2</b>(리액트 함수 밖이라 호출 자체가 거부됨)에 걸린다. 어느 쪽이든 여기선 훅을 부르지 않는다:
      </p>
      <div className="card">
        <div className="file-label">📄 훅을 부르면 안 되는 6가지 자리 — 전부 ❌</div>
        <pre className="concept-flow">{`function MyComponent({ user, users }) {
  // 🔴 1. 조건문·반복문 안
  if (user) { const [a, setA] = useState(0) }        // ❌
  for (const u of users) { const [b] = useState(0) } // ❌

  // 🔴 2. 조건부 return 이후 (early return 뒤)
  if (!user) return null
  const [c, setC] = useState(0)                      // ❌ user 없으면 이 줄까지 못 옴 → 순서 밀림

  // 🔴 3. 이벤트 핸들러 안
  function handleClick() {
    const [d, setD] = useState(0)                    // ❌
  }

  // 🔴 5. useEffect / useMemo / useReducer 에 넘긴 함수 안
  useEffect(() => {
    const [e, setE] = useState(0)                    // ❌
  }, [])

  // 🔴 6. try / catch / finally 안
  try { const [f, setF] = useState(0) } catch {}     // ❌
}

// 🔴 4. 클래스 컴포넌트 안 — 훅은 함수 컴포넌트 전용
class Box extends React.Component {
  render() { const [g] = useState(0); return null }  // ❌
}`}</pre>
      </div>
      <p className="section-desc">
        <b>1·2·6</b>은 "컴포넌트 최상위에서 매 렌더 같은 순서로"(규칙 1)를 깨서 리액트가 값을 짝지을 순서가 흔들리고,
        <b> 3·4·5</b>는 애초에 "리액트 함수(컴포넌트·커스텀 훅) 밖"(규칙 2)이라 호출 자체가 거부된다.
      </p>
      <div className="card">
        <div className="file-label">📄 규칙 1 — 조건문 안 호출 ❌ vs 최상위 호출 ✅</div>
        <pre className="concept-flow">{`// ❌ 조건문 안에서 훅 호출 — 렌더마다 호출 여부가 달라진다
if (isLoggedIn) {
  const [name, setName] = useState('')   // 규칙1 위반
}

// ✅ 최상위에서 항상 호출 — 조건 분기는 JSX에서 처리
const [name, setName] = useState('')
// ... return ( isLoggedIn ? <p>{name}</p> : null )`}</pre>
      </div>
      <div className="card">
        <div className="file-label">📄 규칙 2 — 리액트 함수 안 ✅ vs 일반 함수 안 ❌</div>
        <pre className="concept-flow">{`function FriendList() {               // ✅ 함수 컴포넌트 (대문자로 시작)
  const [status, setStatus] = useOnlineStatus()
}

function setOnlineStatus() {          // ❌ 컴포넌트도 커스텀 훅도 아니다!
  const [status, setStatus] = useOnlineStatus()
}

// 훅을 부를 수 있는 곳은 딱 둘 —
//   (1) 함수 컴포넌트  : 대문자로 시작 (FriendList)
//   (2) 커스텀 훅       : use로 시작 (useOnlineStatus)`}</pre>
      </div>

      {/* ── ④ 커스텀 훅 — 훅 안에서 훅을 부른다 ─────────────── */}
      <h3 className="section-title">④ 커스텀 훅 — 훅 안에서 훅을 부른다</h3>
      <span className="learn-tag">📎 학습 포인트 · use로 시작하는 '내 함수' 안에서 useState·useEffect를 부르면, 그게 바로 커스텀 훅이다</span>
      <p className="section-desc">
        처음엔 낯설다 — "훅(<code>useState</code>) 안에서 <b>또 훅을 부른다고?</b>" 그런데 이게 정상이고, 바로 그걸
        <b> 커스텀 훅</b>이라 부른다. <code>use</code>로 시작하는 <b>내 함수</b>를 만들고 그 안에서 리액트 훅을 부르면,
        여러 컴포넌트가 그 로직을 <b>한 줄로 재사용</b>한다.
      </p>
      <span className="learn-tag">📎 학습 포인트 · 최상위에서 커스텀 훅 호출 → 그 안에서 useState → 반환 → 사용</span>
      <SourceTrace file="useToggle — 커스텀 훅 흐름" code={TOGGLE_CODE} steps={TOGGLE_STEPS} />
      <div className="card">
        <div className="file-label">📄 CustomHookDemo.jsx · useToggle 라이브 (같은 훅, 두 곳에서 각자 독립)</div>
        <CustomHookDemo />
      </div>
      <ul className="section-list">
        <li><b>왜 되나</b> — 커스텀 훅은 <code>use</code>로 시작하니 "훅을 부를 수 있는 곳"(규칙 2)이다. 그 안의 훅도 <b>최상위</b>에서 부르면 규칙 1도 지켜진다.</li>
        <li><b>왜 좋나</b> — 상태 로직(state·effect)을 <b>한 곳</b>에 묶어 여러 컴포넌트가 재사용한다. (실제 활용은 <b>5-2·5-5</b>에서 본다.)</li>
      </ul>

      {/* ── ⑤ 정의는 '설계도', 인스턴스는 사용처마다 독립 ────── */}
      <h3 className="section-title">⑤ 정의는 '설계도', 인스턴스는 사용처마다 독립</h3>
      <span className="learn-tag">📎 학습 포인트 · 컴포넌트도 훅도 '정의=설계도'이고, 쓸 때마다 독립 인스턴스가 생겨 state가 안 섞인다</span>
      <p className="section-desc">
        ④에서 봤듯이, 함수를 <b>한 번 정의</b>해 두고 <b>여러 곳에서 쓴다</b>. 이때 정의는 <b>'설계도'</b>일 뿐이다.
        리액트는 그 설계도를 <b>쓰는 자리마다</b> <b>독립된 인스턴스</b>를 찍어낸다. 그래서
        같은 <code>&lt;Counter/&gt;</code>를 두 번 써도 <b>각자 자기 <code>count</code></b>를 가진다 —
        하나가 바뀌어도 다른 건 그대로다.
      </p>
      <div className="card">
        <div className="file-label">📄 InstanceDemo.jsx · 같은 컴포넌트, 상태는 각자</div>
        <InstanceDemo />
      </div>
      <p className="section-desc">
        이 규칙은 <b>커스텀 훅도 똑같다</b> — ④의 <code>useToggle</code>이 조명·알림에서 각자 켜지고 꺼진 것도 같은 이유다.
      </p>
      <p className="section-desc">
        📖 정리하면, <b>각 인스턴스가 자기 useState '슬롯'을 따로 갖는다</b>. 그래서 state가 서로 안 섞인다.
      </p>

      <p className="section-desc">
        다음 — 훅이 실제로 <b>뭘 해결</b>하나는 5-2, <b>왜</b> 규칙이 필요한지는 5-3, <b>어기면</b> 어떻게 되는지는 5-4에서 본다.
      </p>
    </section>
  )
}
