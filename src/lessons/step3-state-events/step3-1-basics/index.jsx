// 3-1 · useState 기초 (카운터 · 좋아요)
// 화면에서 "변하는 값"은 state로 관리한다. useState로 상태를 만들고, 이벤트로 바꾼다.

import Counter from './Counter.jsx'
import LikeButton from './LikeButton.jsx'
import Practice from '../../../components/Practice.jsx'
import PracticeSwitch from './practice.jsx'
import SolutionSwitch from './solution.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 아래 Counter와 '같은' 로직. 클릭 → set → 리렌더로 화면이 바뀌는 순서를 짚는다.
const COUNTER_CODE = `function Counter() {
  const [count, setCount] = useState(0)   // [현재값, 바꾸는 함수]

  return (
    <div>
      <div>{count}</div>                   // 현재 count를 화면에
      <button onClick={() => setCount(count + 1)}>➕</button>
    </div>
  )
}`

const COUNTER_STEPS = [
  {
    hl: [1, 2],
    tag: '① 첫 렌더',
    t: 'Counter 함수가 실행된다',
    d: (<>화면에 처음 붙을 때 함수가 한 번 돈다. <code>useState(0)</code>이 <b>[현재값 0, 바꾸는 함수 setCount]</b>를 돌려준다.</>),
    note: 'count = 0',
  },
  {
    hl: [6],
    tag: '② 화면',
    t: 'return의 JSX가 그려진다',
    d: (<><code>{'{count}'}</code> 자리에 지금 값 <b>0</b>이 찍힌다. 화면에 숫자 0이 보인다.</>),
    note: '화면: 0',
  },
  {
    hl: [7],
    tag: '③ ➕ 클릭',
    t: 'onClick 안의 setCount(count + 1) 실행',
    d: (<>버튼을 누르면 <code>() =&gt; setCount(count + 1)</code>이 실행된다. 지금 <code>count</code>가 0이라 <code>setCount(1)</code>을 부르는 셈이다.</>),
  },
  {
    hl: [2],
    tag: '④ 리렌더 예약',
    t: 'set은 값을 즉시 바꾸지 않고 다시 그리기를 예약한다',
    d: (<><code>setCount(1)</code>은 <code>count</code>를 그 자리에서 바꾸는 게 <b>아니다</b>. "다음 <code>count</code>는 1"이라 기록하고 Counter를 <b>다시 실행</b>하도록 예약한다. (직접 <code>count = 1</code>은 화면을 못 바꾼다 — 이 길뿐이다.)</>),
  },
  {
    hl: [1, 2],
    tag: '⑤ 리렌더',
    t: 'Counter가 다시 실행된다',
    d: (<>예약대로 함수가 다시 돈다. 이번엔 <code>useState</code>가 <b>기억해 둔 1</b>을 돌려준다(초기값 0은 첫 렌더에만 쓰였다).</>),
    note: 'count = 1',
  },
  {
    hl: [6],
    tag: '⑥ 화면 갱신',
    t: '{count}가 1로 다시 그려진다',
    d: (<>화면의 숫자가 <b>1</b>로 바뀐다. → <b>"변하는 값은 useState, 바꾸는 건 set 함수"</b>가 이 6단계의 전부다. 다시 누르면 ③부터 반복.</>),
    note: '화면: 1',
  },
]

export default function Step3_1() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">3-1</span>
        <h2>useState 기초 — 카운터 & 좋아요</h2>
        <p>useState로 변하는 값을 관리하고, 버튼 클릭 이벤트를 처리해 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          화면에서 변하는 값은 useState로 만들고, 반드시 set 함수로 바꿔야 화면이 다시 그려진다.
        </p>
      </div>

      <h3 className="section-title">① 먼저 — 상태(State)란?</h3>
      <span className="learn-tag">📎 학습 포인트 · 상태는 컴포넌트가 '기억'하는 값이고, 바뀌면 화면이 다시 그려진다</span>
      <p className="section-desc">
        화면에서 <b>변하는 값</b>(카운트·좋아요 수 등)은 상태로 둔다.
        <code> const [count, setCount] = useState(0)</code> — <b>[현재값, 바꾸는 함수]</b>이다.
      </p>
      <div className="concept">
        <p className="concept-lead">
          왜 그냥 <code>let count = 0</code>이 아니라 <code>useState</code>일까? 일반 변수는 바꿔도
          리액트가 모르고 <b>화면이 안 바뀐다.</b> 게다가 다시 그릴 때마다 <b>0으로 초기화</b>된다.
          <code> useState</code>는 값을 <b>기억</b>하고, <b>set 함수</b>로 바꾸면 그때 <b>다시 그린다.</b> (직접 대입 ❌)
        </p>
      </div>

      <h3 className="section-title">② 이벤트로 상태 바꾸기</h3>
      <span className="learn-tag">📎 학습 포인트 · onClick 같은 이벤트 안에서 set 함수를 불러 상태를 바꾼다</span>
      <p className="section-desc">
        상태는 <b>이벤트</b>(클릭·입력 등)에 반응해 바뀐다. 버튼의 <code>onClick</code>에서
        <code> setCount(count + 1)</code>처럼 set을 부르면, 리액트가 새 값으로 화면을 다시 그린다.
      </p>

      {/* 🔬 소스 + 동작 과정 — 클릭이 화면을 바꾸는 6단계 */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 클릭이 화면을 바꾸기까지</h3>
      <span className="learn-tag">📎 학습 포인트 · 클릭 → set → 리렌더 → 화면 갱신. set은 값을 즉시 바꾸는 게 아니라 '다시 그리기'를 예약한다</span>
      <p className="section-desc">
        아래는 <code>Counter</code>의 <b>실제 로직</b>이다. <b>다음 ▶</b>으로 넘기며 <b>지금 어느 줄이 도는지</b>와 그때 <code>count</code>가 어떻게 바뀌는지 따라가 보라.
        핵심은 <b>④ — set이 값을 바로 바꾸는 게 아니라 리렌더를 예약</b>한다는 점이다.
      </p>
      <SourceTrace file="Counter.jsx (핵심 로직)" code={COUNTER_CODE} steps={COUNTER_STEPS} />

      <Counter />
      <LikeButton />

      <Practice
        task="불이 켜지고 꺼지는 스위치를 useState로 완성하자."
        goal="useState로 변하는 값을 기억하고, 이벤트로 그 값을 바꾸는 기본을 익힌다."
        hints={[
          'const [on, setOn] = useState(false)',
          'onClick에서 setOn(!on)으로 뒤집는다.',
          '{on ? "💡" : "🌑"} 처럼 상태에 따라 다른 걸 보여준다.',
        ]}
        practiceFile="step3-state-events/step3-1-basics/practice.jsx"
        solutionFile="step3-state-events/step3-1-basics/solution.jsx"
        solution={<SolutionSwitch />}
      >
        <PracticeSwitch />
      </Practice>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><code>Counter.jsx</code>에 <b>+10</b>씩 증가하는 버튼을 추가해 보자.</li>
          <li>count가 <b>음수가 되지 않도록</b> 감소 버튼을 고쳐 보자. (힌트: <code>Math.max(0, count - 1)</code>)</li>
          <li><code>LikeButton.jsx</code>에 좋아요를 누른 <b>횟수</b>를 세는 상태를 추가해 보자.</li>
        </ol>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — useState 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · [값, set함수] · set으로만 화면이 바뀐다 — 다섯 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(변하는 값은 useState, 바꾸는 건 set 함수)을 상황만 바꿔 다섯 번 확인한다."
        questions={[
          {
            q: 'const [count, setCount] = useState(0) 에서 count와 setCount는 각각 무엇인가?',
            options: ['count = 현재 값, setCount = 바꾸는 함수', 'count = 바꾸는 함수, setCount = 현재 값', '둘 다 현재 값이다'],
            answer: 0,
            explain: 'useState는 [현재 값, 그 값을 바꾸는 set 함수]를 순서대로 돌려준다. 앞이 값, 뒤가 함수다.',
          },
          {
            q: '화면에 보이는 카운트를 일반 변수로 두고 아래처럼 바꾸면 화면은?',
            code: `let count = 0
count = count + 1   // 화면은?`,
            options: ['값도 늘고 화면도 1로 바뀐다', '값은 늘어도 화면이 안 바뀐다', '에러가 난다'],
            answer: 1,
            explain: '일반 변수를 바꿔도 리액트는 모른다 → 다시 그리지 않아 화면이 그대로다. 게다가 다시 그릴 땐 0으로 초기화된다. 그래서 useState가 필요하다.',
          },
          {
            q: '버튼을 누를 때 화면의 count가 실제로 바뀌게 하려면?',
            options: ['setCount(count + 1)', 'count = count + 1', 'count++'],
            codeOptions: true,
            answer: 0,
            explain: 'set 함수(setCount)로 바꿔야 리액트가 새 값으로 화면을 다시 그린다. 직접 대입(count = ...)은 화면을 안 바꾼다.',
          },
          {
            q: 'const [on, setOn] = useState(false) 에서 false는 무슨 의미인가?',
            options: ['on의 초기값(처음 값)', 'on을 절대 못 바꾼다는 뜻', 'set 함수의 이름'],
            answer: 0,
            explain: 'useState(초기값)의 인자는 그 상태의 첫 값이다. 여기선 on이 false로 시작하고, 이후 setOn으로 바꾼다.',
          },
          {
            q: '스위치의 on을 뒤집어(켜고 끄기) 화면을 바꾸려면 onClick에 무엇을 줘야 하나?',
            options: ['onClick={() => setOn(!on)}', 'onClick={() => on = !on}', 'onClick={setOn}'],
            codeOptions: true,
            answer: 0,
            explain: 'setOn(!on)으로 현재 값을 뒤집어 set 한다. on = !on은 직접 대입이라 화면이 안 바뀌고, setOn만 넘기면 무엇으로 바꿀지 안 정해진다.',
          },
        ]}
      />
    </section>
  )
}
