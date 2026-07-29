// ============================================================
// 0단계 · 왜 리액트일까?   (반응형 vs 명령형)
// ============================================================
// 리액트를 배우기 전에 딱 하나만 이해하면 된다: "생각하는 방식"이 다르다.
//
//   • 옛날 방식(jQuery/순수 DOM) = 명령형
//       "값이 바뀌면 → 내가 직접 화면의 그 부분을 찾아서 고친다"
//   • 리액트 = 선언형 / 반응형(reactive)
//       "상태를 바꾸면 → 화면은 리액트가 알아서 다시 그린다"
//
// 아래 두 카운터는 겉보기엔 똑같이 동작하지만, 코드를 만드는 방식이 완전히 다르다.
// 왼쪽은 순수 HTML(public/vanilla/step0-why-react/counter.html), 오른쪽은 리액트(ReactWayCounter.jsx)다.
// 두 파일을 열어 비교해 보자.

import OldWayCounter from './OldWayCounter.jsx'
import ReactWayCounter from './ReactWayCounter.jsx'
import Practice from '../../components/Practice.jsx'
import PracticeCounter from './practice.jsx'
import SolutionCounter from './solution.jsx'

export default function Stage0() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">0단계</span>
        <h2>왜 리액트일까? — 반응형 vs 명령형</h2>
        <p>같은 카운터를 "옛날 방식"과 "리액트 방식"으로 만들어 차이를 느껴 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          화면을 직접 고치는 명령형 대신, 상태만 바꾸면 화면이 따라오는 리액트의 반응형 사고방식을 이해한다.
        </p>
      </div>

      {/* 대전제: 이 강의(그리고 리액트 전체)를 관통하는 한 문장 */}
      <div className="premise">
        <span className="premise-formula">UI = f(State)</span>
        <p>
          화면(UI)은 <b>상태(State)의 결과물</b>이다. 화면을 바꾸고 싶으면
          <b> 화면이 아니라 상태를</b> 바꾼다 — 나머지는 리액트가 알아서 한다.
        </p>
      </div>

      <div className="compare-grid">
        <OldWayCounter />
        <ReactWayCounter />
      </div>

      <div className="try-it">
        <h4>🔍 핵심 차이</h4>
        <ul>
          <li><b>명령형</b>: 무엇을 <b>어떻게</b> 바꿀지 단계별로 지시 → 화면 갱신을 내가 책임짐</li>
          <li><b>반응형</b>: 화면이 <b>어떻게 생겼는지</b>만 선언 → 상태가 바뀌면 갱신은 리액트가 담당</li>
          <li>화면이 복잡해질수록 "직접 조작"은 실수가 폭발한다. 그래서 리액트를 쓴다.</li>
        </ul>
      </div>

      <Practice
        task="움직이지 않는 카운터를 '리액트 방식'(useState + setCount)으로 완성하자."
        goal="화면을 직접 고치는 대신 state를 바꾸면 화면이 따라오는 '반응형' 사고를 첫 손으로 익힌다."
        hints={[
          'const [count, setCount] = useState(0) 로 상태를 만든다.',
          'onClick에서 setCount(count + 1)로 바꾼다.',
          '화면(<div>{count}</div>)은 직접 안 건드려도 자동으로 갱신된다.',
        ]}
        practiceFile="step0-why-react/practice.jsx"
        solutionFile="step0-why-react/solution.jsx"
        solution={<SolutionCounter />}
      >
        <PracticeCounter />
      </Practice>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li>두 카운터에 <b>감소 버튼</b>을 각각 추가해 보자. 어느 쪽이 더 손이 많이 가나?</li>
          <li><code>public/vanilla/step0-why-react/counter.html</code>에서 <code>valueEl.textContent = count</code> 줄을 지우면? (값은 바뀌지만 화면은 그대로 — 내가 갱신을 안 했으니까)</li>
          <li><code>ReactWayCounter.jsx</code>에서 <code>setCount</code>를 지우고 <code>count = count + 1</code>로 바꾸면? (화면이 안 바뀐다 — 다음 단계에서 이유를 배운다)</li>
        </ol>
      </div>
    </section>
  )
}
