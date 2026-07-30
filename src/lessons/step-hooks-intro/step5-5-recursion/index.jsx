// 5-5 · 리액트가 부른다 — 리렌더의 감각   (배우는 것: 컴포넌트를 누가·언제 부르나)
// 초보의 진짜 혼란을 푼다.
//   ① 나는 <Hello/>라고 '적기만' 했는데, Hello() 함수는 대체 누가 부르나? → 리액트가 부른다(제어의 역전).
//   ② 게다가 한 번이 아니라, state가 바뀔 때마다 '다시' 부른다(리렌더) → 마치 스스로를 다시 부르는 듯한 감각.
//   ③ 그 '언제'가 곧 생명주기다(마운트 → 업데이트 → 언마운트) — 타이밍은 리액트가 정한다.

import SelfRenderFeel from './SelfRenderFeel.jsx'
import UseUserDemo from './UseUserDemo.jsx'
import useUserRaw from './useUser.js?raw'
import LifecycleLogger from './LifecycleLogger.jsx'
import CodeBlock from '../../../components/CodeBlock.jsx'

export default function StepHooksRecursion() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">5-5</span>
        <h2>리액트가 부른다 — 리렌더의 감각</h2>
        <p>컴포넌트는 네가 아니라 리액트가 부른다. 그것도 한 번이 아니라, 바뀔 때마다 몇 번이고 다시 부른다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          컴포넌트는 <b>네가 부르는 게 아니라 리액트가 부른다</b>(제어의 역전). 게다가 <b>state가 바뀔 때마다
          다시 부른다(리렌더)</b> — 그래서 마치 <b>컴포넌트가 스스로를 다시 부르는 것처럼</b> 느껴진다.
        </p>
      </div>

      {/* ── ① 컴포넌트는 누가 부르나? ───────────────────────── */}
      <h3 className="section-title">① 컴포넌트는 누가 부르나? — 제어의 역전</h3>
      <span className="learn-tag">📎 학습 포인트 · &lt;Hello/&gt;는 'Hello()를 내가 부르는 코드'가 아니라 '리액트에게 그려 달라는 요청'이다</span>
      <p className="section-desc">
        생각해 보면 이상하다. 우리는 컴포넌트를 <code>&lt;Hello /&gt;</code>라고 <b>적기만</b> 했지, 한 번도
        <code>Hello()</code>라고 <b>직접 부른</b> 적이 없다. 그런데도 <code>Hello</code> 함수는 실행된다. <b>누가 불렀나?</b>
      </p>
      <p className="section-desc">
        <b>리액트 엔진</b>이 불렀다. <code>&lt;Hello /&gt;</code>는 "Hello를 지금 실행하라"는 명령이 아니라,
        "이 자리에 Hello를 <b>그려 달라</b>"는 <b>요청(설명서)</b>이다. 이렇게 <b>부르는 주체가 내가 아니라
        프레임워크</b>로 넘어간 걸 <b>제어의 역전(Inversion of Control)</b>이라 한다.
      </p>
      <p className="section-desc">
        오해하기 쉬운데, 리액트가 <b>아무 때나</b> 부르는 건 아니다. <b>부를 계기는 네 코드가 만든다</b> —
        첫 호출(마운트)은 <b>부모가 <code>&lt;Hello/&gt;</code>를 그릴 때</b>, 다시 호출(리렌더)은 <b>네가 state를 바꿀 때</b>.
        리액트는 그 요청을 받아 <b>실제로 함수를 실행</b>하고, 여러 번 바꿔도 <b>한 번으로 묶거나(배칭)</b> 값이 같으면
        <b> 건너뛰는(스킵)</b> 조정을 맡는다. 즉 <b>계기는 너, 실행·조정은 리액트</b>다.
      </p>
      <div className="card">
        <div className="file-label">📄 내가 부르는 일반 함수 ↔ 리액트가 부르는 컴포넌트</div>
        <pre className="concept-flow">{`// ── 일반 함수 : 내가 직접 부른다 ──
function add(a, b) { return a + b }
const sum = add(2, 3)     // ← 내가 add를 '호출'한다. 실행 시점도 내가 정한다.

// ── 컴포넌트 : 리액트가 부른다 ──
function Hello() { return <p>안녕</p> }
<Hello />                 // ← 나는 '적기만' 한다. Hello()를 부르는 건 리액트.
                          //    (계기는 내 코드: 부모가 그릴 때 / state 바뀔 때 — 실행은 리액트)`}</pre>
      </div>

      {/* ── ② 리렌더 — 스스로를 다시 부르는 듯한 감각 ─────────── */}
      <h3 className="section-title">② 리렌더 — 스스로를 다시 부르는 듯한 감각</h3>
      <span className="learn-tag">📎 학습 포인트 · state가 바뀌면 리액트가 이 함수를 처음부터 다시 실행한다 = 리렌더</span>
      <p className="section-desc">
        리액트가 부르는 건 <b>한 번이 아니다.</b> <b>state가 바뀔 때마다 이 컴포넌트 함수를 처음부터 다시 부른다(리렌더).</b>
        아래에서 <b>렌더 지문</b>(<code>Math.random</code>)을 직접 보라 — 다시 그려질 때마다 지문이 바뀐다.
      </p>
      <div className="card">
        <div className="file-label">📄 SelfRenderFeel.jsx · 리렌더 지문 (Math.random)</div>
        <SelfRenderFeel />
      </div>
      <div className="concept">
        <p className="concept-lead">🔎 무엇이 이 데모를 '다시 그리게' 했나?</p>
        <ul className="section-list">
          <li><b>🔁 리렌더 버튼</b> — 누르면 <code>setCount(c =&gt; c + 1)</code>을 부른다. <b>state(count)가 바뀌니</b> 리액트가 다시 그린다.</li>
          <li><b>▶ 자동 반복</b> — <code>useEffect</code> 안 <code>setInterval</code>이 0.7초마다 <code>setCount</code>를 부른다. 역시 <b>state가 바뀌어</b> 다시 그려진다.</li>
          <li><b>Math.random 지문</b>은 리렌더를 <b>일으키는 게 아니다.</b> 다시 그려질 때 함께 실행돼 <b>결과를 보여줄 뿐</b>이다.</li>
        </ul>
        <p className="section-desc" style={{ margin: 0 }}>
          즉 리렌더의 <b>계기는 언제나 "state(또는 props) 변경"</b>이다. 여기선 <code>setCount</code>가 그 계기다.
        </p>
      </div>
      <p className="section-desc">
        지문이 매번 바뀜 = <b>리액트가 이 컴포넌트 함수를 처음부터 다시 실행</b>한 것이다. 그래서 리렌더는 마치
        <b> 컴포넌트가 스스로를 계속 다시 부르는 것처럼</b> 보인다. 이게 리렌더의 감각이다.
      </p>
      <p className="section-desc" style={{ marginTop: 0 }}>
        ※ 이건 <b>같은 컴포넌트를 '다시 실행'</b>하는 것이지, 함수가 자기를 부르는 '재귀'(호출 스택이 쌓이는)와는 다르다.
      </p>
      <p className="section-desc" style={{ marginTop: 0 }}>
        🔗 이 "스스로를 다시 부르는 감각"이 <b>멈추지 않으면</b> 어떻게 되는지는 <b>9-1 · useEffect</b>의 완성해보기에서
        <b> 실제 무한 루프</b>로 볼 수 있다 — effect가 <code>setState</code>→리렌더→effect→… 로 끝없이 이어지고,
        <b> 의존성 배열</b>이 그 연쇄의 브레이크가 된다.
      </p>

      {/* ── ③ 리렌더되면 훅도 다시 실행된다 ────────────────── */}
      <h3 className="section-title">③ 리렌더되면, 그 안의 훅도 다시 실행된다</h3>
      <span className="learn-tag">📎 학습 포인트 · 훅은 컴포넌트에 귀속된다 → 리렌더로 함수가 다시 실행되면 그 안의 훅(커스텀 훅 포함) 본문도 다시 실행된다</span>
      <p className="section-desc">
        컴포넌트 함수가 다시 실행되면, 그 <b>안에서 부른 훅</b>도 당연히 다시 실행된다 — 훅은 컴포넌트에 <b>귀속</b>되기 때문이다.
        직접 만든 <b>커스텀 훅</b>도 마찬가지다. 아래는 사용자 정보를 불러오는 <code>useUser(userId)</code> 훅을 쓴다.
      </p>
      <div className="card">
        <div className="file-label">📄 useUser.js (커스텀 훅) · UseUserDemo.jsx</div>
        <UseUserDemo />
      </div>

      <div className="concept">
        <p className="concept-lead">🔬 <code>useUser</code> 안에는 뭐가 들었나? — 커스텀 훅의 구성요소</p>
        <ul className="section-list">
          <li><code>useState(null)</code> → <b>user</b> — 불러온 사용자를 기억한다.</li>
          <li><code>useState(true)</code> → <b>loading</b> — 지금 불러오는 중인지.</li>
          <li><code>useState(0)</code> → <b>fetchCount</b> — 실제로 몇 번 불러왔는지.</li>
          <li><code>useEffect(…, [userId])</code> — <b>userId가 바뀌면</b> <code>fetchUser</code>를 부르고, 정리 함수(<code>alive</code>)로 경쟁상태를 막고, 끝나면 위 state들을 채운다.</li>
          <li><code>return {'{ user, loading, fetchCount }'}</code> — 쓰는 컴포넌트에 <b>필요한 값만</b> 넘긴다.</li>
        </ul>
        <p className="section-desc" style={{ margin: 0 }}>
          즉 커스텀 훅은 <b>state(useState) + 효과(useEffect) + 반환값</b>의 조합이다. 상태 로직을 이 안에 <b>캡슐화</b>해 두고, 쓰는 쪽은 한 줄로 꺼내 쓴다.
        </p>
      </div>
      <p className="section-desc">아래는 실제 소스다(<code>?raw</code>). 위 구성요소가 코드 어디에 있는지 짚어 보자.</p>
      <CodeBlock file="useUser.js" code={useUserRaw} />
      <p className="section-desc">
        핵심 — 리렌더로 <code>useUser()</code> 본문은 <b>매번 다시 실행</b>되지만, 그렇다고 매번 다시 불러오지 않는다:
        <code> useState</code>는 값을 <b>기억</b>하고, <code>useEffect</code>는 <b>deps로 실행 시점을 제어</b>한다.
        이래서 훅이 <b>계속 다시 실행돼도</b> 앱이 낭비 없이 돈다. (fetch·deps의 자세한 이야기는 <b>9단계</b>)
      </p>

      {/* ── ④ 생명주기 ─────────────────────────────────────── */}
      <h3 className="section-title">④ 생명주기 — 리액트가 정하는 '언제'</h3>
      <span className="learn-tag">📎 학습 포인트 · 컴포넌트는 마운트 → 업데이트(리렌더) → 언마운트를 거치고, 그 타이밍은 리액트가 정한다</span>
      <p className="section-desc">
        "누가 부르나"(①)의 짝은 <b>"언제 부르나"</b>다. 리액트는 컴포넌트를 세 시점에 다룬다:
      </p>
      <ul className="section-list">
        <li><b>마운트</b> — 처음 화면에 등장한다(컴포넌트 첫 호출).</li>
        <li><b>업데이트(리렌더)</b> — state·props가 바뀌면 리액트가 다시 부른다. (②에서 본 그것)</li>
        <li><b>언마운트</b> — 화면에서 사라진다(정리).</li>
      </ul>
      <p className="section-desc">
        아래에서 세 시점이 언제 도는지 버튼으로 직접 관찰해 보자.
      </p>
      <div className="card">
        <div className="file-label">📄 LifecycleLogger.jsx</div>
        <LifecycleLogger />
      </div>
      <p className="section-desc">
        이 세 시점을 다루는 실제 도구가 <code>useEffect</code>다 (마운트=<code>[]</code>, 업데이트=deps,
        언마운트=cleanup). 이 타이밍을 리액트가 쥐고 있다는 것도 <b>제어의 역전</b>이다 — 자세히는 <b>9단계(9-1)</b>에서 배운다.
      </p>

      {/* ── 정리 ───────────────────────────────────────────── */}
      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li>컴포넌트는 <b>내가 부르지 않는다</b>. <code>&lt;Hello/&gt;</code>는 요청이고, 부르는 건 <b>리액트</b>다(제어의 역전).</li>
          <li>리액트는 <b>state가 바뀔 때마다 컴포넌트 함수를 다시 실행한다(리렌더)</b>. 마치 스스로를 다시 부르는 것처럼 느껴진다.</li>
          <li>리렌더되면 <b>그 안에서 부른 훅(커스텀 훅 포함)도 다시 실행된다</b> — 단 <code>useState</code>는 값 유지, <code>useEffect</code>는 deps로 제어.</li>
          <li>그 '언제'가 <b>생명주기</b>다 — <b>마운트 → 업데이트 → 언마운트</b>. 타이밍은 리액트가 정한다(도구 <code>useEffect</code>는 9단계).</li>
        </ul>
      </div>
    </section>
  )
}
