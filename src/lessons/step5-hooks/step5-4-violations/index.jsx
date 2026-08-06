// 5-4 · 훅 위반 예시 — 직접 터뜨려 보기   (배우는 것: 규칙을 어기면 나는 진짜 에러)
// 5-1·5-3에서 배운 규칙을 실제로 어겨, 리액트가 던지는 진짜 에러 메시지를 눈으로 확인한다.
// 마지막으로 조건문 안 훅을 최상위로 옮기는 실습으로 규칙을 손에 익힌다.

import HookRuleBreaker from './HookRuleBreaker.jsx'
import Practice from '../../../components/Practice.jsx'
import PracticeHookRule from './practice.jsx'
import SolutionHookRule from './solution.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'

export default function StepHooks3() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">5-4</span>
        <h2>훅 위반 예시 — 직접 터뜨려 보기</h2>
        <p>규칙을 실제로 어기면 리액트가 어떤 에러를 던지는지 직접 확인하고, 조건부 호출을 고치는 실습을 한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          규칙을 실제로 어겨 리액트가 던지는 <b>진짜 에러</b>를 눈으로 확인하고,
          조건문 안 훅을 <b>최상위</b>로 옮겨 고치는 법을 익힌다.
        </p>
      </div>

      {/* ── ① 훅 위반 예시 (라이브) ────────────────────────── */}
      <h3 className="section-title">① 훅 위반 예시 — 직접 터뜨려 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · 규칙을 실제로 어기면 리액트가 던지는 진짜 에러를 눈으로 확인한다</span>
      <p className="section-desc">
        말로만 보면 와닿지 않으니 <b>직접 터뜨려 보자.</b> 각 카드의 <b>😈 위반 실행</b>을 누르면 그 케이스로 규칙을
        실제로 어겨, 리액트가 던지는 <b>진짜 에러 메시지·설명·스택</b>이 뜬다. (에러 바운더리·try/catch로 잡아 앱은 죽지 않는다.
        🔴 4번 클래스 컴포넌트는 라이브 재현이 불가능해 제외했다.)
      </p>
      <p className="section-desc" style={{ marginTop: 0 }}>
        아래 데모(위반 코드·에러 바운더리·ErrorBox)는 전부 <code>HookRuleBreaker.jsx</code>에 있다.
      </p>
      <HookRuleBreaker />

      {/* ── 실습 ───────────────────────────────────────────── */}
      <Practice
        task="조건문(if) 안에서 부른 useState를 컴포넌트 '최상위'로 옮겨 규칙을 지키게 고치자."
        goal="훅은 최상위에서만 부른다는 규칙을, 어긴 코드를 직접 고치며 몸에 익힌다."
        hints={[
          '무엇·왜: 훅은 조건문 안에서 부르면 안 된다(규칙1). 렌더마다 호출 순서가 달라져 값이 어긋나기 때문이다.',
          '어디: practice.jsx의 TODO 1 — count 상태를 컴포넌트 최상위(조건문 밖)에서 만든다.',
          '어떻게: const [count, setCount] = useState(0) 로 바꾸고, TODO 2의 버튼에 onClick={() => setCount(count + 1)} 을 단다.',
          '확인: 로그인 상태에서 "출석 체크"를 누르면 횟수가 늘고, 로그아웃/로그인을 오가도 에러 없이 동작하면 성공이다.',
        ]}
        practiceFile="step5-hooks/step5-4-violations/practice.jsx"
        solutionFile="step5-hooks/step5-4-violations/solution.jsx"
        solution={<SolutionHookRule />}
      >
        <PracticeHookRule />
      </Practice>

      {/* ── 정리 ───────────────────────────────────────────── */}
      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li>훅은 <b>use로 시작하는 함수</b>다. <code>useState</code>가 우리가 처음 쓴 훅이다.</li>
          <li>훅은 <b>컴포넌트(또는 커스텀 훅)의 최상위</b>에서, <b>언제나 같은 순서로</b> 부른다.</li>
          <li>
            앞으로 배울 <code>useEffect</code> · <code>useReducer</code> · <code>useRef</code> ·{' '}
            <code>useContext</code> 도 <b>전부 이 규칙</b>을 그대로 따른다. 규칙은 한 번만 익히면 된다.
          </li>
        </ul>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — 훅을 부를 수 있는 위치</h3>
      <span className="learn-tag">📎 학습 포인트 · 훅은 언제나 컴포넌트 '최상위'에서만 부른다 — 위치를 다섯 번 판별한다</span>
      <QuickQuiz
        intro="'이 자리에서 useState를 불러도 되나?'를 상황만 바꿔 다섯 번 판별한다. 규칙은 하나 — 최상위에서만 부른다."
        questions={[
          {
            q: '아래 위치에서 useState를 불러도 되나?',
            code: `function Comp() {
  const [x, setX] = useState(0)  // 여기
  return <p>{x}</p>
}`,
            options: ['가능하다', '안 된다'],
            answer: 0,
            explain: '컴포넌트 함수 최상위다 — 훅을 부르는 정확한 자리다.',
          },
          {
            q: '다음 중 useState를 불러도 되는 위치는?',
            options: ['컴포넌트 함수 최상위', 'if 블록 안', 'for 반복문 안'],
            answer: 0,
            explain: '훅은 최상위에서만 부른다. if·for 안에서 부르면 렌더마다 호출 순서·개수가 달라져 값이 어긋난다.',
          },
          {
            q: '아래 위치에서 useState를 불러도 되나?',
            code: `function Comp() {
  for (let i = 0; i < 3; i++) {
    const [x] = useState(0)  // 여기
  }
}`,
            options: ['안 된다', '가능하다'],
            answer: 0,
            explain: '반복문 안은 최상위가 아니다. 도는 횟수에 따라 훅 호출 수가 달라져 규칙 위반이다.',
          },
          {
            q: '이벤트 핸들러(onClick으로 부르는 함수) 안에서 useState를 부르면?',
            options: ['안 된다 — 핸들러는 최상위가 아니다', '된다 — 함수 안이니까', '버튼이 눌릴 때만 된다'],
            answer: 0,
            explain: '핸들러는 컴포넌트 최상위가 아니라 클릭 때 실행되는 함수라 훅을 못 부른다. state는 최상위에서 만들고, 핸들러에선 setX만 부른다.',
          },
          {
            q: '아래 위치에서 useState를 불러도 되나?',
            code: `function Comp() {
  if (!user) return null
  const [x] = useState(0)  // 여기
}`,
            options: ['안 된다', '가능하다'],
            answer: 0,
            explain: 'user가 없으면 return으로 빠져 useState를 건너뛴다 → 렌더마다 호출 개수가 달라진다. 훅을 return보다 위로 올린다.',
          },
        ]}
      />
    </section>
  )
}
