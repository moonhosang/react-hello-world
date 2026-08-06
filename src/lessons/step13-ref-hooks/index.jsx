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
import SourceTrace from '../../components/SourceTrace.jsx'

// useRef — .current는 리렌더를 안 일으키는 상자 + 진짜 DOM 손잡이.
const REF_CODE = `const inputRef = useRef(null)      // 리렌더를 안 일으키는 상자
const countRef = useRef(0)

<input ref={inputRef} />           // 실제 DOM이 .current에 담긴다

function focus() {
  inputRef.current.focus()         // DOM에 직접 명령
}
function tick() {
  countRef.current += 1            // 값만 바뀜 — 화면은 그대로
}`

const REF_STEPS = [
  {
    hl: [1, 2],
    tag: '① 상자',
    t: 'useRef는 { current } 상자를 준다',
    d: (<><code>useRef(초기값)</code>은 <code>{'{ current: 값 }'}</code> 상자를 돌려준다. 리렌더가 일어나도 <b>같은 상자가 그대로 유지</b>된다.</>),
    note: 'inputRef={current:null} · countRef={current:0}',
  },
  {
    hl: [4],
    tag: '② DOM 연결',
    t: 'ref를 붙이면 진짜 DOM이 담긴다',
    d: (<><code>&lt;input ref={'{inputRef}'} /&gt;</code>로 이 input의 <b>실제 DOM</b>이 마운트 때 <code>inputRef.current</code>에 담긴다.</>),
  },
  {
    hl: [7],
    tag: '③ 명령',
    t: 'current로 DOM에 직접 명령',
    d: (<>버튼에서 <code>inputRef.current.focus()</code> → DOM에 <b>직접 명령</b>해 커서가 들어간다(명령형 동작 — focus·scroll·재생 등).</>),
  },
  {
    hl: [10],
    tag: '④ 리렌더 없음',
    t: 'current를 바꿔도 화면은 그대로',
    d: (<><code>countRef.current += 1</code>은 <b>값만</b> 바꾼다. <code>state</code>와 달리 <b>리렌더를 일으키지 않아</b> 화면은 그대로다. 렌더 사이에 조용히 기억할 값(이전 값·타이머 id 등)에 쓴다.</>),
    note: 'countRef.current = 1 · 화면 변화 없음',
  },
  {
    tag: '⑤ state와 구분',
    t: '보여줄 값은 state, 기억만 할 값은 ref',
    d: (<>화면에 <b>보여야</b> 하는 값은 <code>state</code>, 화면과 무관하게 <b>기억만</b> 할 값·DOM 손잡이는 <code>ref</code>. <code>current</code>는 이벤트·effect 안에서 만지고 <b>렌더 도중엔 건드리지 않는다.</b></>),
  },
]

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

      <span className="learn-tag">📎 학습 포인트 · ref.current는 리렌더를 안 일으킨다 · DOM 손잡이로도 쓴다 (state와 반대)</span>
      <SourceTrace file="useRef — 상자 & DOM 손잡이" code={REF_CODE} steps={REF_STEPS} />

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
