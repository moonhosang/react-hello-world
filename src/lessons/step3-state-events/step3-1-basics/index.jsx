// 3-1 · useState 기초 (카운터 · 좋아요)
// 화면에서 "변하는 값"은 state로 관리한다. useState로 상태를 만들고, 이벤트로 바꾼다.

import Counter from './Counter.jsx'
import LikeButton from './LikeButton.jsx'
import Practice from '../../../components/Practice.jsx'
import PracticeSwitch from './practice.jsx'
import SolutionSwitch from './solution.jsx'

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
    </section>
  )
}
