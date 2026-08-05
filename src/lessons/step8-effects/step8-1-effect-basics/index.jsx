// 9-1 · useEffect 소개 + 의존성 배열 (기초)
// 렌더 이후에 할 일(부수 효과)을 useEffect에 적는다. 두 번째 인자(의존성 배열)가 '언제 실행할지'를 정한다.
// "왜 바뀌면 다시 도나(동기화)·어떻게 쓰나"는 다음 강의 9-2에서 판다. (과적 해소를 위해 분리)

import { useState, useEffect, Component } from 'react'
import SourceTrace from '../../../components/SourceTrace.jsx'
import TechTags from '../../../components/TechTags.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'

// 이 레슨 본문의 두 effect(①[] · ②[count])가 첫 렌더·클릭 때 어떤 순서로 도는지 짚는다.
const BASIC_CODE = `const [count, setCount] = useState(0)

useEffect(() => {
  setLog('실행됨')                  // ① 마운트 뒤 한 번
}, [])                             // [] = 처음 한 번만

useEffect(() => {
  document.title = '클릭 ' + count  // ② 탭 제목 동기화
}, [count])                        // [count] = count 바뀔 때마다`

const BASIC_STEPS = [
  {
    hl: [1],
    tag: '① 첫 렌더',
    t: '컴포넌트 함수가 실행돼 화면을 그린다',
    d: (<><code>count</code>가 0으로 시작한다. 함수가 <code>return</code>한 JSX가 화면에 그려진다. <b>effect는 아직 안 돈다</b>(렌더 뒤로 미뤄짐).</>),
    note: 'count = 0',
  },
  {
    hl: [3, 4, 5, 7, 8, 9],
    tag: '② effect 실행',
    t: '렌더가 끝난 뒤 두 effect가 위→아래로',
    d: (<>화면을 다 그린 뒤 effect가 <b>적힌 순서대로</b> 실행된다. ①은 <code>setLog</code> 한 번, ②는 탭 제목을 <b>"클릭 0회"</b>로 맞춘다.</>),
    note: '탭 제목 = 클릭 0회',
  },
  {
    hl: [1],
    tag: '③ ➕ 클릭',
    t: 'setCount(1) → 리렌더',
    d: (<>버튼을 누르면 <code>setCount</code>로 <code>count</code>가 <b>0 → 1</b>이 되고, 컴포넌트가 다시 실행된다(리렌더).</>),
    note: 'count = 1',
  },
  {
    hl: [5, 9],
    tag: '④ 의존성 비교',
    t: '리액트가 각 의존성을 이전 렌더와 비교한다',
    d: (<>①의 <code>[]</code>는 비교할 게 없다 → <b>건너뜀</b>. ②의 <code>[count]</code>는 <b>0 → 1</b>로 달라졌다 → <b>다시 실행 대상</b>.</>),
  },
  {
    hl: [7, 8],
    tag: '⑤ ②만 재실행',
    t: '탭 제목만 갱신, ①은 건너뛴다',
    d: (<>그래서 ②만 다시 돌아 탭 제목이 <b>"클릭 1회"</b>가 된다. ①은 처음 그대로. → <b>의존성 배열이 "무엇에 맞춰 다시 돌지"를 정한다.</b></>),
    note: '탭 제목 = 클릭 1회',
  },
]

// 렌더 중 에러를 잡아 화면에 보여 주는 작은 에러 바운더리. (아래 무한 루프 데모가 쓴다)
class RenderErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="tree-box leaf" style={{ borderColor: 'var(--red)' }}>
          💥 <b>React가 렌더를 멈추고 에러를 던졌다:</b>
          <div className="demo-desc" style={{ margin: '4px 0 0', color: 'var(--red)' }}>
            {String(this.state.error.message).split('\n')[0]}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ❌ 렌더 '중'에 setState를 부른다 → 매 렌더가 또 렌더를 부른다 → React가 "Too many re-renders"로 막는다.
function BadRenderComp() {
  const [n, setN] = useState(0)
  setN(n + 1) // ❌ 이 한 줄이 무한 재렌더를 만든다 (부수 효과를 렌더 중에 실행)
  return <p>{n}</p>
}

// 렌더 중 부수효과가 왜 금지인지 '라이브'로 보여 준다. (React가 스스로 막으므로 화면은 얼지 않는다)
function RenderSideEffectDemo() {
  const [run, setRun] = useState(false)
  const [key, setKey] = useState(0)
  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => { setRun(true); setKey((k) => k + 1) }}>💥 렌더 중 setState 실행</button>
        <button className="chip" onClick={() => setRun(false)}>🔄 멈춤 / 리셋</button>
      </div>
      {run && (
        <div style={{ marginTop: 10 }}>
          <RenderErrorBoundary key={key}>
            <BadRenderComp />
          </RenderErrorBoundary>
        </div>
      )}
      <p className="demo-desc" style={{ marginTop: 8 }}>
        실행하면 React가 <b>"Too many re-renders"</b>로 막는다 — 렌더가 <b>스스로를 끝없이 다시 부르기</b> 때문이다.
        그래서 이런 일은 렌더가 <b>끝난 뒤</b>인 useEffect로 미룬다.
      </p>
    </div>
  )
}

export default function Step8_1({ onGo }) {
  const [log, setLog] = useState('아직 실행 전')
  const [count, setCount] = useState(0)

  // ① 마운트 직후 한 번만 (의존성 [])
  useEffect(() => {
    setLog('✅ 렌더가 끝난 뒤 실행됐다!')
  }, [])

  // ② count가 바뀔 때마다 (의존성 [count])
  useEffect(() => {
    document.title = `클릭 ${count}회`
  }, [count])

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-1</span>
        <h2>useEffect 소개 + 의존성 배열</h2>
        <p>렌더 이후에 할 일(부수 효과)을 적고, 의존성 배열로 '언제 실행할지'를 정한다. (왜·어떻게는 9-2에서)</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>렌더가 끝난 뒤 실행할 부수 효과를 useEffect에 적고, 의존성 배열로 그 실행 시점을 정한다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          컴포넌트는 화면을 그리는 함수다. 화면 그리기 <b>외의</b> 일(문서 제목·타이머·데이터 요청)은
          <code> useEffect(() =&gt; {'{...}'}, [의존성])</code>에 적으면 <b>렌더가 끝난 뒤</b> 실행된다.
        </p>
        <ul className="concept-terms">
          <li><code>[]</code> — 처음 <b>한 번만</b></li>
          <li><code>[count]</code> — <b>count가 바뀔 때마다</b></li>
          <li>생략 — <b>매 렌더마다</b> (거의 안 씀)</li>
        </ul>
      </div>

      {/* 🔁 반복 리렌더링 개념 다시 주지 + 참조 */}
      <div className="concept">
        <p className="concept-lead">🔁 먼저 떠올리기 — effect는 '리렌더 사이클' 위에 얹힌다</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          <b>3-6 · 리렌더링</b>에서 봤듯, <code>state</code>·<code>props</code>가 바뀌면 컴포넌트 함수가 <b>다시 실행</b>(리렌더)돼
          화면을 새로 그린다. 그리고 <b>5-5 · 리액트가 부른다</b>에서는 그게 <b>"스스로를 다시 부르는 듯한 반복"</b>임을 봤다.
          <b> useEffect는 바로 이 리렌더가 끝날 때마다</b> 리액트가 불러 주는 자리다 — 그래서 "렌더 뒤 실행"이고,
          의존성이 같으면 <b>그 반복 중에도 effect는 건너뛴다</b>. 이 관계를 계속 떠올리며 보자.
        </p>
        <TechTags
          items={[
            { label: '🔁 리렌더링', to: 3.6 },
            { label: '5-5 · 리액트가 부른다', to: 3.84 },
          ]}
          onGo={onGo}
        />
      </div>

      {/* ① 마운트 한 번 */}
      <h3 className="section-title">① 마운트 직후 한 번 — 의존성 []</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성 <code>[]</code> = 마운트 직후 딱 한 번만 실행</span>
      <div className="card">
        <div className="file-label">📄 step8-1-effect-basics/index.jsx</div>
        <p className="demo-desc">① 마운트 시 한 번 <code>[]</code> → {log}</p>
      </div>

      {/* ② count 바뀔 때 */}
      <h3 className="section-title">② 값이 바뀔 때마다 — 의존성 [count]</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성 <code>[count]</code> = count가 바뀔 때마다 다시 실행</span>
      <div className="card center">
        <div className="demo-emoji">{count}</div>
        <button onClick={() => setCount(count + 1)}>➕ 클릭</button>
        <p className="demo-desc">② <code>[count]</code> → 브라우저 <b>탭 제목</b>이 "클릭 {count}회"로 바뀐다.</p>
      </div>

      {/* 🔬 위 ①·②가 도는 순서 */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 위 ①·②를 한 단계씩</h3>
      <span className="learn-tag">📎 학습 포인트 · effect는 렌더 뒤 실행 · 클릭하면 리액트가 의존성을 비교해 바뀐 effect만 다시 돌린다</span>
      <p className="section-desc">
        위 두 데모(①·②)가 <b>같은 화면에서 어떤 순서로</b> 도는지 짚어 보자. <b>다음 ▶</b>으로 넘기며,
        <b> 클릭했을 때 ①은 건너뛰고 ②만 다시 도는</b> 이유(④·⑤)를 확인하라.
      </p>
      <SourceTrace file="step8-1-effect-basics/index.jsx (본문 요약)" code={BASIC_CODE} steps={BASIC_STEPS} />

      {/* ②-2 렌더는 순수해야 한다 — 부수효과 금지 (라이브 무한 루프) */}
      <h3 className="section-title">②-2 🚫 렌더 '중'엔 부수효과 금지 — 렌더는 순수해야 한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 렌더 도중 요청·setState는 무한 루프를 부른다 → '렌더가 끝난 뒤'인 useEffect로 미룬다</span>
      <p className="section-desc">
        useEffect가 <b>왜 필요한지</b> 근본 이유가 여기 있다. <b>컴포넌트 본문(렌더)은 순수</b>해야 한다(→ <b>개념 · 함수 vs 컴포넌트</b>) —
        같은 props·state면 같은 화면을 <b>계산만</b> 하고 바깥을 건드리지 않는다. 그런데 렌더 도중 <code>setState</code>를 하면?
      </p>
      <div className="card">
        <div className="file-label">❌ 렌더 중 setState — 무한 재렌더 (직접 실행해 보라)</div>
        <pre className="err-code">{`function BadRenderComp() {
  const [n, setN] = useState(0)
  setN(n + 1)   // ❌ 렌더 중 setState → 렌더가 또 렌더를 부른다 → 무한 루프
  return <p>{n}</p>
}`}</pre>
        <RenderSideEffectDemo />
      </div>
      <p className="section-desc">
        이게 바로 <b>반복 리렌더링</b>의 위험한 극단이다 — <code>setState</code>가 리렌더를 부르고, 그 리렌더가 또
        <code> setState</code>를 불러 <b>끝없이</b> 돈다(<b>3-6·5-5</b>에서 본 그 연쇄). 데이터 요청도 똑같다:
        렌더 중 <code>fetchUser().then(setUser)</code>는 매 렌더 실행되고 <code>setUser</code>가 또 렌더를 부른다.
        그래서 이런 <b>부수효과는 렌더가 끝난 뒤로 미뤄야</b> 하고, 그 자리가 <b>useEffect</b>다.
        <b> "그럼 왜 의존성이 바뀌면 다시 도나"</b>는 다음 강의에서 판다.
      </p>

      {/* 다음 강의로 잇기 */}
      <div className="concept">
        <p className="concept-lead">➡️ 다음 — 9-2 · 왜·어떻게 동작하나</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          여기까진 <b>"useEffect가 무엇이고, 의존성 <code>[]</code>·<code>[count]</code>가 실행 시점을 어떻게 정하나"</b>였다.
          다음 <b>9-2</b>에서 <b>왜 값이 바뀌면 다시 실행하나(=동기화)</b>와 <b>실전(stale 버그·useUserFetch·완성해보기)</b>을 판다.
        </p>
        <TechTags items={[{ label: '➡️ 9-2 · 왜·어떻게 동작하나', to: 8.15 }]} onGo={onGo} />
      </div>

      <h3 className="section-title">🧩 확인 드릴 — 의존성 배열 기초</h3>
      <span className="learn-tag">📎 학습 포인트 · [] = 한 번 · [값] = 그 값 바뀔 때 · effect는 렌더 뒤 실행 — 네 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(effect는 렌더 뒤 실행 · 의존성이 실행 시점을 정한다)을 상황만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: 'useEffect의 의존성 배열이 [] 이면 effect는 언제 실행되나?',
            options: ['처음 마운트된 뒤 딱 한 번', '매 렌더마다', '전혀 실행되지 않는다'],
            answer: 0,
            explain: "[]는 '바뀔 의존성이 없다'는 뜻이라 마운트 직후 한 번만 실행된다. 매 렌더마다 돌게 하려면 배열을 생략한다(거의 안 씀).",
          },
          {
            q: '아래 effect는 언제 다시 실행되나?',
            code: `useEffect(() => {
  document.title = '클릭 ' + count + '회';
}, [count]);`,
            options: ['count가 바뀔 때마다', '처음 한 번만', '아무 state나 바뀌면 매번'],
            answer: 0,
            explain: '의존성에 적은 count가 바뀔 때마다 다시 실행된다. 다른 state가 바뀌어도 count가 그대로면 이 effect는 건너뛴다.',
          },
          {
            q: 'useEffect에 적은 일은 언제 실행되나?',
            options: ['화면을 다 그린(렌더한) 뒤', '화면을 그리기 전에 먼저', '클릭할 때만'],
            answer: 0,
            explain: "effect는 렌더가 끝난 뒤 실행된다. 그래서 화면 그리기를 막지 않는다. 렌더 '도중'에 하면 안 되는 일(요청·타이머)을 여기로 미루는 것이다.",
          },
          {
            q: '컴포넌트 함수 본문(렌더 도중)에서 바로 setCount(count + 1)을 부르면?',
            options: ['렌더가 또 렌더를 불러 무한 반복 → 리액트가 막는다', '한 번만 잘 실행된다', '아무 일도 안 일어난다'],
            answer: 0,
            explain: "렌더 도중 setState는 또 렌더를 부르고, 그게 또 setState를 불러 무한이 된다(리액트가 'Too many re-renders'로 막는다). 그래서 이런 일은 렌더가 끝난 뒤인 useEffect로 미룬다.",
          },
        ]}
      />
    </section>
  )
}
