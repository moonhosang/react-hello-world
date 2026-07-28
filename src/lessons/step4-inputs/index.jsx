// ============================================================
// 4단계 · 입력 다루기   (input을 그냥 두기 vs state에 묶기)
// ============================================================
// 0단계에서 "화면을 직접 조작 vs 상태로 관리"의 차이를 봤다.
// 입력(input)에서도 똑같은 갈림길이 있다.
//
//   • 그냥 두기(uncontrolled): value·onChange를 안 묶는다 → 값의 주인은 DOM, 리액트는 값을 모른다
//   • 상태에 묶기(controlled): value를 state에 묶어, 타이핑마다 state가 최신을 유지
//
// 리액트에서는 controlled 방식을 기본으로 쓴다. 데이터는 state → 화면 '한 방향'으로 흐른다(단방향).

import UncontrolledInput from './UncontrolledInput.jsx'
import ControlledInput from './ControlledInput.jsx'
import Practice from '../../components/Practice.jsx'
import PracticeInput from './practice.jsx'
import SolutionInput from './solution.jsx'

export default function Stage4() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">4단계</span>
        <h2>입력 다루기 — 그냥 두기 vs 상태에 묶기</h2>
        <p>input을 그냥 두면 리액트는 값을 모른다. state에 묶는 게(controlled) 리액트다운 방법이다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          input을 <b>그냥 두면</b> 리액트는 그 값을 <b>모른다</b>. 값을 <b>state에 묶어야</b>(controlled)
          리액트가 매 타이핑을 알고, 화면은 언제나 state를 따라간다.
        </p>
      </div>

      <p className="section-desc">
        왼쪽은 <code>&lt;input&gt;</code>을 <b>그냥 뒀다</b>. 타이핑은 되는데 "리액트가 아는 값"은 <b>———</b>에서 안 바뀐다.
        오른쪽은 값을 <b>state에 묶어서</b>, 아는 값이 타이핑마다 <b>실시간</b>으로 바뀐다. 왼쪽↔오른쪽 입력창에 직접 쳐 보라.
      </p>
      <div className="compare-grid">
        <UncontrolledInput />
        <ControlledInput />
      </div>

      <div className="try-it">
        <h4>🔍 핵심 차이</h4>
        <ul>
          <li><b>그냥 두기(uncontrolled)</b>: 값의 주인은 <b>DOM(input)</b>. 컴포넌트 안엔 그 값을 가리킬 변수가 없어 리액트는 <b>깜깜</b>이다.</li>
          <li><b>controlled</b>: 값의 주인은 <b>state</b>. 화면은 언제나 state를 따라감 (단일 진실의 원천).</li>
          <li>실시간 글자 수·검증·자동 변환이 필요하면 controlled가 압도적으로 편하다.</li>
        </ul>
      </div>

      {/* 단방향 데이터 흐름 — 이 레슨의 핵심 개념 */}
      <h3 className="section-title">🔁 단방향 데이터 흐름 (one-way data flow)</h3>
      <span className="learn-tag">📎 학습 포인트 · state → 화면은 자동, 화면 → state는 반드시 onChange(이벤트)를 거친다</span>
      <p className="section-desc">
        controlled input에서 데이터는 <b>한 방향</b>으로만 흐른다:
      </p>
      <div className="card">
        <div className="file-label">📄 두 방향을 나눠 보기</div>
        <pre className="err-code">{`① state → 화면  (자동)
   text ──value={text}──▶ <input>      // state가 화면을 만든다

② 화면 → state  (자동 아님! 이벤트를 거친다)
   타이핑 ──onChange(e)──▶ setText(e.target.value) ──▶ text`}</pre>
      </div>
      <p className="section-desc">
        핵심은 <b>②</b>다 — 사용자가 타이핑해도 state가 <b>저절로</b> 바뀌지 않는다. <code>onChange</code>라는 이벤트를 받아
        <b> 내가 직접 <code>setText</code></b>를 불러야 비로소 state가 바뀐다. (Vue의 <code>v-model</code> 같은 <b>양방향 바인딩이 아니다</b>.)
        그래서 값은 늘 <b>state → 화면</b> 한 방향으로 흐르고, 이 규칙 덕에 "지금 값이 왜 이건지"를 <b>state 한 곳</b>만 보면 안다.
      </p>
      <div className="concept">
        <p className="concept-lead">💡 참고 · 그래도 DOM 값을 직접 읽어야 한다면?</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          드물게 controlled 없이 DOM의 <code>value</code>를 직접 집어야 할 때가 있다. 그럴 땐 <code>useRef</code>라는 훅을 쓴다 —
          <b> 12단계 · Ref와 커스텀 훅</b>에서 배운다. 지금은 "<b>기본은 controlled</b>"만 확실히 익히면 된다.
        </p>
      </div>

      <Practice
        task="input을 controlled로 만들어, 입력값과 글자 수를 실시간으로 보여주자."
        hints={[
          'value={text} 와 onChange={(e) => setText(e.target.value)} 를 연결한다.',
          '{text.length}로 글자 수를 센다.',
          'state가 진실 — 화면은 state를 따라간다.',
        ]}
        practiceFile="step4-inputs/practice.jsx"
        solutionFile="step4-inputs/solution.jsx"
        solution={<SolutionInput />}
      >
        <PracticeInput />
      </Practice>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><code>ControlledInput.jsx</code>에서 값이 비어 있으면 <b>제출 버튼을 비활성화</b>해 보자. (힌트: <code>disabled={'{'}text.trim() === ''{'}'}</code>)</li>
          <li>입력값에 숫자만 남기도록 <code>onChange</code>에서 걸러 보자. (힌트: <code>e.target.value.replace(/\D/g, '')</code>)</li>
          <li><code>UncontrolledInput</code>의 "리액트가 아는 값"을 <b>실시간으로 바꾸려면</b> 무엇이 필요할까? (답: value·onChange로 state에 묶기 = controlled로 바꾸기)</li>
        </ol>
      </div>
    </section>
  )
}
