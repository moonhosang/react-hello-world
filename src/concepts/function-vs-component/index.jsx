// 개념 · 함수 vs 리액트 컴포넌트
// 리액트 컴포넌트는 '자바스크립트 함수'다. 하지만 몇 가지 규칙이 있는 특별한 함수다.

import Say from './Say.jsx'
// 표시용(?raw) — 아래 <pre>는 Say.jsx의 '실제 소스'다(손복사 아님 → 화면=동작 코드 일치).
import sayCode from './Say.jsx?raw'

// 일반 함수: 값을 돌려준다
function add(a, b) {
  return a + b
}

// 리액트 컴포넌트: 화면(JSX)을 돌려준다. 이름은 대문자, <Hello />로 쓴다.
function Hello({ name }) {
  return <p className="hello-name">안녕하세요, <b>{name}</b>님! 👋</p>
}

export default function FunctionVsComponent() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🔍 개념</span>
        <h2>함수 vs 리액트 컴포넌트</h2>
        <p>컴포넌트는 결국 함수다. 그런데 '어떤' 함수인지 정확히 짚어 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>컴포넌트는 화면(JSX)을 돌려주고 리액트가 <code>&lt;이름 /&gt;</code>으로 부르는, 이름이 대문자인 특별한 함수다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          리액트 컴포넌트는 <b>자바스크립트 함수</b>다. 다만 몇 가지 규칙이 있는 <b>특별한 함수</b>일 뿐이다 —
          이름은 대문자, <b>JSX(화면)를 돌려주고</b>, <code>&lt;이름 /&gt;</code>으로 <b>리액트가 부른다.</b>
        </p>
      </div>

      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th></th>
              <th>일반 함수</th>
              <th>리액트 컴포넌트</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>이름</td><td>소문자 (<code>add</code>)</td><td>대문자 (<code>Hello</code>)</td></tr>
            <tr><td>돌려주는 것</td><td>아무 값 (숫자·문자 …)</td><td>JSX (화면)</td></tr>
            <tr><td>부르는 법</td><td>내가 직접 <code>add(2, 3)</code></td><td><code>&lt;Hello /&gt;</code> 로 리액트가 부름</td></tr>
            <tr><td>훅(useState 등)</td><td>못 쓴다</td><td>쓸 수 있다</td></tr>
            <tr><td>다시 실행</td><td>내가 부를 때만</td><td>상태 바뀌면 리액트가 다시 부름 (리렌더)</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="section-title">눈으로 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · 일반 함수는 값을, 컴포넌트는 화면(JSX)을 돌려준다</span>
      <div className="card-grid">
        <div className="card">
          <div className="file-label">🔧 일반 함수 · add(2, 3)</div>
          <p className="demo-desc">값을 돌려준다 → <b>{add(2, 3)}</b></p>
        </div>
        <div className="card">
          <div className="file-label">⚛️ 컴포넌트 · &lt;Hello name="김코딩" /&gt;</div>
          <Hello name="김코딩" />
          <p className="demo-desc">화면(JSX)을 돌려준다 ↑</p>
        </div>
      </div>

      <h3 className="section-title">🧬 컴포넌트 그 자체 — JSX는 '값'이다</h3>
      <span className="learn-tag">📎 학습 포인트 · JSX는 값(객체)이라 변수에 담고 return할 수 있다</span>
      <p className="section-desc">
        <code>&lt;Badge /&gt;</code> 같은 JSX는 화면이 아니라 <b>값(객체)</b>이다. 그래서 <b>변수에 담고, return</b>할 수 있다.
        컴포넌트란 결국 <b>이 값(JSX)을 돌려주는 함수</b>다.
      </p>
      <div className="card">
        <div className="file-label">📄 Say.jsx (실제 소스)</div>
        <pre className="concept-flow">{sayCode}</pre>
      </div>
      <div className="card">
        <div className="file-label">⚛️ &lt;Say /&gt; 렌더 결과</div>
        <Say />
      </div>
      <p className="section-desc">
        💡 <code>&lt;Badge /&gt;</code>는 사실 <code>React.createElement(Badge, ...)</code>의 축약 — "무엇을 그릴지 적은
        <b> 설명서(객체)</b>". 리액트가 그 설명서를 받아 실제 화면으로 바꾼다.
      </p>

      <h3 className="section-title">⚠️ 소문자로 쓰면? — &lt;say /&gt; vs &lt;Say /&gt;</h3>
      <span className="learn-tag">📎 학습 포인트 · 소문자 태그는 HTML로 취급돼 내 함수가 호출되지 않는다</span>
      <p className="section-desc">
        리액트는 <b>소문자 태그를 HTML 태그로</b> 본다. 그래서 <code>&lt;say /&gt;</code>는 함수를 부르지 않고
        빈 <code>&lt;say&gt;</code> 요소만 만든다 — 에러도 없이 <b>조용히 안 나온다.</b>
      </p>
      <div className="compare-grid">
        <div className="card compare-card old">
          <div className="file-label">❌ &lt;say /&gt; (소문자)</div>
          <div className="say-slot">
            <say />
          </div>
          <p className="compare-hint">빈 <code>&lt;say&gt;</code> 요소만 생김 — 아무것도 안 보인다.</p>
        </div>
        <div className="card compare-card react">
          <div className="file-label">✅ &lt;Say /&gt; (대문자)</div>
          <div className="say-slot">
            <Say />
          </div>
          <p className="compare-hint">컴포넌트로 인식 → Badge가 그려진다.</p>
        </div>
      </div>

      <div className="try-it warn-box">
        <h4>⚠️ 그럼 내 컴포넌트를 '소문자'로 만들면? (예: div)</h4>
        <p>정의를 소문자로 해도 소용없다. 리액트는 <b>이름의 첫 글자</b>만 보고 판단한다.</p>
        <pre className="err-code">{`function say() { return <Badge value="hihi" /> }   // 소문자로 정의해도
<say />   // → 리액트는 이 함수를 '무시'하고 빈 <say> 요소를 만든다

function div() { return <Badge value="hihi" /> }   // HTML 태그와 이름이 겹치면
<div />   // → 진짜 HTML <div>가 그려진다. 내 함수는 완전히 무시된다`}</pre>
        <ul>
          <li>소문자 태그 = 리액트가 <b>HTML 태그로 취급</b> → 내가 만든 함수는 <b>호출되지 않는다.</b></li>
          <li><code>div</code>·<code>span</code>처럼 진짜 HTML 이름과 겹치면, 내 함수 대신 <b>그 HTML 요소</b>가 그려진다.</li>
          <li>그래서 컴포넌트는 <b>반드시 대문자</b>로 시작한다. (JSX가 <code>type</code>에 문자열이 아니라 <b>함수 참조</b>를 넣게 하려고 — 📝 JSX의 정체 참고)</li>
        </ul>
      </div>

      <div className="try-it warn-box">
        <h4>⚠️ 또 하나 — 직접 호출 금지</h4>
        <ul>
          <li>컴포넌트를 <code>Hello()</code>처럼 <b>직접 부르지 말고</b> <code>&lt;Hello /&gt;</code>로 쓴다.</li>
          <li>그래야 리액트가 이걸 <b>컴포넌트로 인식</b>해 상태·리렌더·key를 관리한다.</li>
        </ul>
      </div>

      <div className="try-it">
        <h4>💡 한 줄 정리</h4>
        <ul>
          <li><b>컴포넌트 = 화면(JSX)을 돌려주는, 리액트가 <code>&lt;이름 /&gt;</code>으로 부르는 함수.</b></li>
        </ul>
      </div>
    </section>
  )
}
