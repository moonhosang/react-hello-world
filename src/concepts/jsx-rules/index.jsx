// 개념 · JSX 문법 규칙 6가지   (배우는 것: JSX를 쓸 때 반드시 지켜야 할 6가지)
// '1.45 JSX의 정체'가 "JSX가 무엇으로 변환되나"였다면, 여기는 "JSX를 쓸 때 뭘 지켜야 하나"다.
// 입문자가 가장 많이 틀리는 여섯 자리를, 규칙을 명시하고 ❌/✅로 나란히 실증한다.

import { useState } from 'react'

// 🟢 라이브 데모 — 6가지 규칙을 '모두 지킨' 작은 컴포넌트.
// 버튼을 누르면 {표현식}이 실시간으로 바뀌는 걸 보여준다(규칙 4).
function JsxShowcase() {
  const [count, setCount] = useState(0)
  const mood = count % 2 === 0 ? '😀' : '🤔' // JS로 계산 → {mood}로 꽂는다
  return (
    // 규칙 1: 루트 하나 — 빈 태그 <>...</>(Fragment)로 감쌌다
    <>
      {/* 규칙 6: JSX 주석은 이렇게, 중괄호 안에 */}
      <p>
        지금 값: <b>{count}</b> {mood} {/* 규칙 4: {표현식} */}
      </p>
      {/* 규칙 5: style은 객체 — 바깥 {}는 JS, 안쪽 {}는 객체, 값은 카멜케이스 */}
      <p style={{ color: count > 2 ? 'var(--brand)' : 'var(--muted)', fontWeight: 700 }}>
        {count > 2 ? '3 이상!' : '3 미만'}
      </p>
      {/* 규칙 3: className(카멜케이스), 규칙 2: 스스로 닫는 태그는 /> */}
      <div className="button-row">
        <button className="chip on" onClick={() => setCount((c) => c + 1)}>+1</button>
        <button className="chip" onClick={() => setCount(0)}>리셋</button>
      </div>
      <hr />
    </>
  )
}

// 규칙 카드 — 제목 · 왜 · ❌ · ✅ 를 한 장으로
function RuleCard({ n, title, why, bad, good }) {
  return (
    <div className="card">
      <div className="file-label">🔴 규칙 {n} · {title}</div>
      <p className="section-desc" style={{ marginTop: 0 }}>{why}</p>
      <pre className="concept-flow">{`❌ ${bad}\n\n✅ ${good}`}</pre>
    </div>
  )
}

export default function JsxRules() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">JSX</span>
        <h2>JSX 문법 규칙 6가지</h2>
        <p>JSX는 HTML과 닮았지만 HTML이 아니다. 결국 자바스크립트라서, 지켜야 할 규칙이 여섯 개 있다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>① 루트 하나 · ② 모든 태그 닫기 · ③ className(카멜케이스) · ④ {'{표현식}'} · ⑤ style은 객체 · ⑥ {'{/*주석*/}'}</b> —
          이 여섯을 어기면 대부분 <b>화면이 안 뜨거나 빨간 에러</b>가 난다.
        </p>
      </div>

      <p className="section-desc">
        왜 규칙이 있나? JSX는 브라우저가 바로 읽는 게 아니라 <b>자바스크립트 함수 호출</b>(<code>React.createElement</code>)로
        <b> 변환</b>된다(→ <b>1.45 JSX의 정체</b>). 그 변환기가 알아들을 수 있게 쓰려면 아래 규칙을 지켜야 한다.
      </p>

      {/* 라이브: 규칙을 모두 지킨 예시 */}
      <h3 className="section-title">🟢 먼저 — 규칙을 다 지킨 JSX (라이브)</h3>
      <span className="learn-tag">📎 학습 포인트 · Fragment로 감싸고, {'{표현식}'}으로 값을 꽂고, style은 객체로 준다</span>
      <div className="card">
        <div className="file-label">📄 JsxShowcase — 여섯 규칙을 전부 지킨 컴포넌트</div>
        <JsxShowcase />
        <p className="demo-desc">
          +1을 누르면 <code>{'{count}'}</code>·<code>{'{mood}'}</code>가 실시간으로 바뀐다. 이게 규칙 4({'{표현식}'})다.
        </p>
      </div>

      {/* 6가지 규칙 */}
      <h3 className="section-title">🔴 여섯 규칙 — 어기면 이렇게 된다</h3>

      <RuleCard
        n="1"
        title="하나의 루트로 반환하기"
        why="컴포넌트는 요소를 '하나'만 반환할 수 있다. 형제가 여럿이면 하나로 감싼다. 굳이 div를 더 만들기 싫으면 빈 태그 <>...</>(Fragment)를 쓴다."
        bad={`return (
  <h1>제목</h1>
  <p>본문</p>       // ← 형제 둘, 감싸지 않음 → 에러
)`}
        good={`return (
  <>                 {/* Fragment: DOM에 흔적 없이 감싸기 */}
    <h1>제목</h1>
    <p>본문</p>
  </>
)`}
      />

      <RuleCard
        n="2"
        title="모든 태그 닫기"
        why="HTML에선 봐주던 <img>·<br>·<input>도 JSX에선 반드시 닫는다. 자식이 없으면 스스로 닫는 태그 />로 끝낸다."
        bad={`<img src="a.png">     // ← 안 닫음
<br>
<input type="text">`}
        good={`<img src="a.png" />   {/* 스스로 닫기 */}
<br />
<input type="text" />`}
      />

      <RuleCard
        n="3"
        title="속성은 카멜케이스 · class는 className"
        why="속성 대부분은 JS 객체의 키가 되므로 camelCase로 쓴다. 특히 class는 JS 예약어라 className, for는 htmlFor로 바꾼다."
        bad={`<div class="box" onclick={fn}>
<label for="id">
<div tabindex="0">`}
        good={`<div className="box" onClick={fn}>
<label htmlFor="id">
<div tabIndex="0">`}
      />

      <RuleCard
        n="4"
        title="표현식은 중괄호 {} 안에서"
        why="JSX 안에서 JS 값을 쓰려면 중괄호로 감싼다. 중괄호 안에는 '값이 되는 식'만 온다 — if 문·for 문 같은 '문장'은 못 넣는다(삼항·&&·map으로 대체)."
        bad={`<p>안녕, name 님</p>      // ← 그냥 글자 'name'
<p>{ if (a) 1 else 2 }</p> // ← if는 '문장' → 안 됨`}
        good={`<p>안녕, {name} 님</p>     {/* 값 꽂기 */}
<p>{a ? 1 : 2}</p>         {/* 삼항은 '식' → 됨 */}`}
      />

      <RuleCard
        n="5"
        title="인라인 스타일은 객체로"
        why="style에는 문자열이 아니라 객체를 준다. 그래서 style={{...}} 처럼 중괄호가 두 겹이다(바깥=JSX 표현식, 안=객체). CSS 속성명도 카멜케이스, 값은 보통 문자열."
        bad={`<div style="color: red; font-size: 14px">
<div style={{ font-size: 14 }}>   // ← 하이픈 키`}
        good={`<div style={{ color: 'red', fontSize: 14 }}>
{/* 바깥 {} = 표현식, 안 {} = 객체, fontSize 카멜케이스 */}`}
      />

      <RuleCard
        n="6"
        title="주석은 {/* ... */}"
        why="JSX(요소를 반환하는 자리) 안에서는 //나 <!-- -->가 아니라 중괄호+블록주석을 쓴다. 태그 바깥, 일반 JS 자리에서는 //를 그대로 써도 된다."
        bad={`<div>
  // 이 줄이 화면에 글자로 나온다
  <!-- HTML 주석도 안 됨 -->
</div>`}
        good={`<div>
  {/* JSX 주석은 이렇게 */}
  <span>내용</span>
</div>`}
      />

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <ul className="section-list">
          <li>JSX는 <b>HTML처럼 생겼지만 자바스크립트</b>다 — 그래서 <code>class</code>가 아니라 <code>className</code>.</li>
          <li>값을 꽂을 땐 <b>{'{}'}</b>, 스타일은 <b>객체</b>, 감쌀 땐 <b>{'<>…</>'}</b>.</li>
          <li>대부분의 위반은 <b>빌드가 실패</b>하거나 <b>빨간 에러</b>로 바로 알려 준다 — 겁먹지 말고 메시지를 읽으면 된다(→ 14장 에러 읽는 법).</li>
        </ul>
      </div>
    </section>
  )
}
