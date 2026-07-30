// ============================================================
// 13단계 · useRef와 커스텀 훅   (배우는 것: ref로 값/DOM 다루기, 로직 재사용)
// ============================================================
// state는 '화면에 보이는 값'을 다룬다. 하지만 화면과 무관한 값이나,
// 진짜 DOM을 직접 만져야 할 때가 있다 — 그게 useRef의 자리다.
// 그리고 반복되는 훅 로직은 'use…' 함수로 묶어 여러 곳에서 재사용한다 — 그게 커스텀 훅이다.

import FocusInput from './FocusInput.jsx'
import RefVsState from './RefVsState.jsx'
import ToggleBox from './ToggleBox.jsx'
import WindowWidthBadge from './WindowWidthBadge.jsx'

export default function Step12RefHooks() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">13단계</span>
        <h2>useRef와 커스텀 훅</h2>
        <p>화면과 무관한 값·DOM은 ref로 다루고, 반복되는 로직은 나만의 훅으로 묶어 재사용한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>useRef</b>는 리렌더를 일으키지 않는 '보관함'이자 DOM을 직접 만지는 손잡이이고,
          <b> 커스텀 훅</b>은 <code>use</code>로 시작하는 그냥 함수로 훅 로직을 재사용하는 방법이다.
        </p>
      </div>

      <h3 className="section-title">① useRef로 'DOM 직접 조작'</h3>
      <span className="learn-tag">📎 학습 포인트 · ref = 진짜 DOM으로 가는 손잡이 (focus 같은 명령형 동작)</span>
      <p className="section-desc">
        <code>const inputRef = useRef(null)</code> 로 상자를 만들고 <code>&lt;input ref={'{inputRef}'} /&gt;</code> 로
        실제 DOM을 담는다. 이벤트에서 <code>inputRef.current.focus()</code> 로 DOM에 직접 명령한다.
      </p>
      <FocusInput />

      <h3 className="section-title">② useRef로 '리렌더 없는 값 보관'</h3>
      <span className="learn-tag">📎 학습 포인트 · ref.current는 바뀌어도 리렌더가 안 일어난다 (state와 반대)</span>
      <p className="section-desc">
        화면에 보여줄 값은 <b>state</b>, 화면과 상관없이 그냥 기억만 할 값은 <b>ref</b>다.
        state를 바꾸면 화면이 다시 그려지지만, ref.current를 바꾸면 값만 바뀌고 화면은 그대로다.
      </p>
      <RefVsState />

      <h3 className="section-title">③ 커스텀 훅으로 로직 재사용</h3>
      <span className="learn-tag">📎 학습 포인트 · 커스텀 훅 = use로 시작하는 함수, 안에서 다른 훅을 쓴다</span>
      <p className="section-desc">
        같은 <code>useToggle</code> 훅을 두 곳에서 쓴다. 훅을 공유해도 <b>상태는 공유되지 않는다</b> —
        호출한 컴포넌트마다 각자 독립된 상태를 가진다. 왼쪽을 켜도 오른쪽은 그대로인 걸 확인하자.
        (데모 코드는 <code>ToggleBox.jsx</code>, 훅은 <code>useToggle.js</code>에 있다.)
      </p>
      <div className="card-grid">
        <ToggleBox label="조명" onEmoji="💡" offEmoji="🌑" />
        <ToggleBox label="알림" onEmoji="🔔" offEmoji="🔕" />
      </div>

      <p className="section-desc" style={{ marginTop: 20 }}>
        커스텀 훅 안에서는 useState뿐 아니라 useEffect 같은 훅도 쓸 수 있다.
        <code>useWindowWidth</code>는 창 크기 구독 로직을 훅 안에 숨기고, 쓰는 쪽엔 값 하나만 준다.
      </p>
      <WindowWidthBadge />

      <div className="try-it">
        <h4>💡 핵심</h4>
        <ul>
          <li><code>ref.current</code>는 <b>이벤트나 effect 안</b>에서 읽고 쓴다. 렌더 도중에 만지지 않는다.</li>
          <li>ref 값이 바뀌어도 <b>화면은 다시 그려지지 않는다</b>. 화면에 보여야 하는 값이면 state를 써라.</li>
          <li>커스텀 훅 이름은 반드시 <b><code>use</code>로 시작</b>한다. (그래야 리액트가 훅 규칙을 검사한다)</li>
          <li>훅을 공유해도 <b>상태는 공유되지 않는다</b> — 훅을 호출한 컴포넌트마다 상태는 독립이다.</li>
        </ul>
      </div>
    </section>
  )
}
