// 개념 · JSX의 정체 (변환 과정)
// JSX는 HTML이 아니라 '자바스크립트 확장 문법'이다.
// 브라우저는 JSX를 모른다 → 빌드 도구(Vite)가 미리 '함수 호출'로 바꿔준다.
// 그 함수의 결과는 그냥 자바스크립트 '객체'(React element)다. 그래서 변수에 담을 수 있다.

import Badge from '../../components/Badge.jsx'
import TransformAnimation from './TransformAnimation.jsx'

export default function JsxUnderTheHood() {
  // JSX는 사실 객체다. 실제로 뜯어보자.
  const badgeEl = <Badge value="hihi" />
  const divEl = <div className="x" />

  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">📝 개념</span>
        <h2>JSX의 정체 — 무엇으로 변환될까?</h2>
        <p>JSX는 HTML이 아니다. 빌드 도구가 자바스크립트 함수 호출로 바꾼다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>JSX는 HTML이 아니라 함수 호출로 변환되고, 그 결과는 그냥 자바스크립트 객체(React element)다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          JSX(<code>&lt;Badge /&gt;</code>)는 HTML처럼 보이지만 <b>자바스크립트</b>다. 브라우저는 이걸 모르니,
          빌드 도구(<b>Vite</b>)가 <b>함수 호출</b>로 바꾸고, 그 결과는 그냥 <b>객체</b>가 된다.
        </p>
      </div>

      <h3 className="section-title">변환 4단계</h3>
      <span className="learn-tag">📎 학습 포인트 · JSX → 함수 호출 → 객체 → 화면, 이 순서로 바뀐다</span>
      <p className="section-desc">(애니메이션 데모 코드는 <code>TransformAnimation.jsx</code>에 있다.)</p>
      <TransformAnimation />

      <h3 className="section-title">눈으로 보기 — JSX는 정말 '객체'다</h3>
      <span className="learn-tag">📎 학습 포인트 · 대문자 태그의 type은 함수, 소문자 태그의 type은 문자열이다</span>
      <p className="section-desc">
        아래 값은 <b>지금 실제로</b> JSX를 만들어 그 속을 꺼낸 것이다. (직접 계산된 값)
      </p>
      <div className="card">
        <div className="file-label">📄 jsx-under-the-hood/index.jsx</div>
        <pre className="concept-flow">{`const badgeEl = <Badge value="hihi" />
const divEl   = <div className="x" />

typeof badgeEl       →  "${typeof badgeEl}"
badgeEl.type.name    →  "${badgeEl.type.name}"     // Badge 함수를 가리킴
badgeEl.props.value  →  "${badgeEl.props.value}"
divEl.type           →  "${divEl.type}"       // 소문자는 그냥 문자열 "div"!`}</pre>
      </div>
      <p className="section-desc">
        <code>&lt;Badge /&gt;</code>는 객체이고, <code>type</code>이 <b>Badge 함수</b>를 가리킨다. 반면 <code>&lt;div /&gt;</code>는
        <code> type</code>이 문자열 <code>"div"</code>다 → 그래서 <b>대문자 규칙</b>이 필요했다. (소문자=HTML 태그 문자열)
      </p>

      <div className="try-it">
        <h4>💡 이걸 알면 규칙들이 이해된다</h4>
        <ul>
          <li><b>JSX를 변수에 담을 수 있다</b> — 그냥 객체니까. (<code>const hello = &lt;Badge /&gt;</code>)</li>
          <li><code>className</code> — JSX는 함수 인자(객체)라서 <code>class</code>(JS 예약어) 대신 <code>className</code> 키를 쓴다.</li>
          <li><code>{'{중괄호}'}</code> — JSX 안은 진짜 JS라서, 중괄호로 자바스크립트 값을 꽂는다.</li>
          <li><b>대문자</b> — <code>type</code>이 컴포넌트(함수)를 가리키려면 대문자 변수여야 한다.</li>
        </ul>
      </div>

      <div className="try-it">
        <h4>📌 참고</h4>
        <ul>
          <li>요즘(React 17+)은 <code>React.createElement</code> 대신 <b>자동 변환</b>을 써서 <code>import React</code>가 필요 없다 — 원리는 같다.</li>
          <li><b>도구가 나뉘는 지점:</b> ①→② 변환은 <b>빌드 타임</b>에 <code>Babel/esbuild</code>가, ②→④ 실행·렌더링은 <b>런타임</b>에 <code>React / ReactDOM</code>이 맡는다.</li>
        </ul>
      </div>
    </section>
  )
}
