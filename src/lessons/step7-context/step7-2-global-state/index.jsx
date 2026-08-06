// 8-2 · 전역 상태 바꾸기
// Provider의 value에 '상태 + setter'를 함께 담으면, 깊은 자식이 전역 값을 읽고 '바꾸기'까지 한다.
// 이 Context + state 조합이 '전역 상태 관리'의 기본 형태다.

import { createContext, useContext, useState } from 'react'
import SourceTrace from '../../../components/SourceTrace.jsx'

const ThemeContext = createContext(null)

// value에 '상태 + setter'를 함께 담으면, 멀리 있는 자식이 읽고 바꾸기까지 한다.
const GLOBAL_CODE = `const [dark, setDark] = useState(false)

<ThemeContext.Provider value={{ dark, setDark }}>   // 상태 + setter 함께
  <Toolbar />   <Panel />
</ThemeContext.Provider>

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext) // 읽고 + 바꾸기
  return <button onClick={() => setDark(!dark)}>전환</button>
}
function Panel() {
  const { dark } = useContext(ThemeContext)          // 읽기만
  return <div>현재: {dark ? '다크' : '라이트'}</div>
}`

const GLOBAL_STEPS = [
  {
    hl: [1, 3],
    tag: '① 상태 + setter',
    t: 'value에 둘을 함께 담는다',
    d: (<>최상위에 <code>dark</code> 상태를 두고, Provider의 <code>value</code>에 <code>{'{ dark, setDark }'}</code>를 <b>함께</b> 담아 통로에 흘린다.</>),
    note: 'dark = false',
  },
  {
    hl: [8, 12],
    tag: '② 각자 꺼냄',
    t: '필요한 만큼만 useContext',
    d: (<><code>Toolbar</code>는 <code>{'{ dark, setDark }'}</code>(읽고+바꾸기), <code>Panel</code>은 <code>{'{ dark }'}</code>(읽기만)를 <code>useContext</code>로 꺼낸다.</>),
  },
  {
    hl: [9],
    tag: '③ 바꾸기',
    t: '멀리 있는 setter로 전역 상태 변경',
    d: (<><code>Toolbar</code>의 버튼 → <code>setDark(!dark)</code>. 자기 상태가 아닌데도, Context로 받은 <b>setter</b>로 전역 <code>dark</code>를 바꾼다.</>),
    note: 'dark = true',
  },
  {
    hl: [3, 12],
    tag: '④ 함께 반응',
    t: '구독한 곳이 전부 리렌더',
    d: (<><code>dark</code>가 바뀌면 <code>value</code>가 바뀌고, 그걸 구독한 <b>Toolbar·Panel이 함께</b> 리렌더된다 → 둘 다 새 테마를 반영. 멀리 떨어졌어도 같은 상태를 공유한다.</>),
  },
  {
    tag: '⑤ 전역 상태 기본형',
    t: 'Context + state = 전역 상태 관리',
    d: (<>이 <b>Context + state</b> 조합이 '전역 상태 관리'의 기본형이다. 한 곳에서 바꾸면 멀리 떨어진 곳도 함께 반응한다(Redux 같은 라이브러리도 이 아이디어의 확장).</>),
  },
]

export default function Step7_2() {
  const [dark, setDark] = useState(false)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">8-2</span>
        <h2>전역 상태 바꾸기</h2>
        <p>Provider의 value에 상태와 setter를 함께 담아, 어디서든 읽고 바꾼다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>Provider의 value에 상태와 setter를 함께 담으면, 멀리 떨어진 컴포넌트끼리 전역 상태를 공유하고 바꾼다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          value에 <code>{`{ dark, setDark }`}</code>를 담으면, 멀리 떨어진 두 컴포넌트가
          <b> 같은 전역 상태</b>를 공유한다. 한 곳에서 바꾸면 다른 곳도 함께 반응한다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 step7-2-global-state/index.jsx</div>
        <ThemeContext.Provider value={{ dark, setDark }}>
          <Toolbar />
          <Panel />
        </ThemeContext.Provider>
      </div>

      <span className="learn-tag">📎 학습 포인트 · value에 상태+setter를 담으면 멀리 있는 자식이 읽고 바꾸기까지 한다</span>
      <SourceTrace file="전역 상태 — Context + setter" code={GLOBAL_CODE} steps={GLOBAL_STEPS} />

      {/* 🤝 계약으로 묶인다 — 시각 + 균형 */}
      <h3 className="section-title">🤝 Context = 계약으로 묶인다 (눈으로)</h3>
      <span className="learn-tag">📎 학습 포인트 · useContext를 쓰면 '이 Provider 안에서만 산다'는 보이지 않는 계약에 묶인다 — 편하지만 결합된다</span>
      <p className="section-desc">
        <code>useContext(X)</code>를 쓰는 컴포넌트는 <b>X.Provider와 계약</b>을 맺는다 — <b>①</b> 그 Provider <b>안</b>(하위 트리)에 있어야 하고,
        <b>②</b> value의 <b>'모양'</b>(<code>{'{ dark, setDark }'}</code>)에 맞춰져 있다. props와 달리 <b>연결선이 안 보인다</b>는 게 특징이자 함정이다.
        아래에서 <b>소비자를 울타리 밖으로 꺼내</b> 계약이 깨지는 걸 눈으로 보라.
      </p>
      <div className="card">
        <div className="file-label">🔬 라이브 — Provider 울타리 안이면 계약 O(초록), 밖이면 위반(빨강)</div>
        <ContractDemo />
      </div>

      <p className="section-desc">
        ⚖️ 계약엔 <b>장점도 단점도</b> 있다 — 어느 쪽이 큰지 값마다 따진다:
      </p>
      <div className="two-col">
        <div className="card">
          <div className="file-label">👍 계약의 장점</div>
          <ul className="section-list" style={{ margin: 0 }}>
            <li><b>드릴링 없음</b> — 중간 컴포넌트를 안 거치고 트리 어디서든 바로 꺼낸다.</li>
            <li><b>자동 공유</b> — 멀리 떨어진 소비자들이 같은 상태를 함께 쓰고, 한 곳에서 바꾸면 다 반응한다.</li>
            <li><b>넓게 쓰는 값에 최적</b> — 테마·로그인·언어처럼 앱 곳곳이 쓰는 값에 특히 이득.</li>
          </ul>
        </div>
        <div className="card">
          <div className="file-label">👎 계약의 단점</div>
          <ul className="section-list" style={{ margin: 0 }}>
            <li><b>결합</b> — 소비자는 <code>Provider</code> 밖에선 못 산다. 그 컴포넌트만 떼어 <b>다른 곳에 재사용</b>하기 어렵다.</li>
            <li><b>보이지 않는 의존성</b> — props와 달리 시그니처(<code>function Panel()</code>)만 봐선 <b>무엇을 필요로 하는지</b> 안 드러난다.</li>
            <li><b>암묵적 계약</b> — Provider가 value <b>모양</b>을 바꾸면 멀리 있는 소비자가 <b>전부</b> 조용히 깨진다.</li>
            <li><b>테스트·리렌더</b> — 테스트할 때 <code>Provider</code>로 감싸야 하고, value가 바뀌면 구독자 전부 리렌더된다.</li>
          </ul>
        </div>
      </div>
      <p className="section-desc">
        📖 균형점 — <b>넓게·자주 쓰는 값</b>이면 계약의 이득(공유·드릴링 제거) &gt; 결합이라 <b>Context</b>가 맞다.
        <b> 좁게 한두 곳만</b> 쓰는 값이면 그냥 <b>props</b>가 더 명확하고 재사용도 쉽다. "이 계약이 값어치가 있나"를 그때그때 따진다.
      </p>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>value에 <code>{`{ dark, setDark }`}</code>를 담아 <b>어디서든</b> 읽고 바꾼다.</li>
          <li>이 Context + state가 '전역 상태 관리'의 기본형이다. (Redux 같은 라이브러리도 이 아이디어의 확장)</li>
        </ul>
      </div>
    </section>
  )
}

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext)
  return (
    <div className="tree-box">
      <button onClick={() => setDark(!dark)}>{dark ? '🌙 다크' : '☀️ 라이트'} — 전환</button>
    </div>
  )
}
function Panel() {
  const { dark } = useContext(ThemeContext)
  return (
    <div className={'tree-box leaf theme-box' + (dark ? ' dark' : '')}>
      현재 테마: <b>{dark ? '다크 🌙' : '라이트 ☀️'}</b>
    </div>
  )
}

// 🤝 계약 시각화용 소비자 — useContext가 값을 받으면 초록(계약 O), null이면 빨강(계약 위반)
function ThemeChip({ label }) {
  const ctx = useContext(ThemeContext) // Provider 밖이면 기본값 null이 온다
  const ok = ctx != null
  return (
    <span
      className="tree-box leaf"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px',
        borderColor: ok ? 'var(--green)' : 'var(--red)',
        color: ok ? 'inherit' : 'var(--red)',
      }}
    >
      {ok ? '✅' : '❌'} <b>{label}</b>
      <code style={{ fontSize: 11 }}>
        {ok ? `useContext → { dark: ${String(ctx.dark)} }` : 'useContext → null · 계약 위반!'}
      </code>
    </span>
  )
}

// 🤝 Provider '울타리' 안/밖으로 소비자를 옮겨, 계약에 묶임을 눈으로 본다.
function ContractDemo() {
  const [dark, setDark] = useState(false)
  const [panelOut, setPanelOut] = useState(false) // Panel을 울타리 밖으로 뺄까?
  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => setDark((d) => !d)}>{dark ? '🌙 다크' : '☀️ 라이트'} 토글</button>
        <button className="chip" onClick={() => setPanelOut((o) => !o)}>
          {panelOut ? '↩️ Panel을 Provider 안으로' : '📤 Panel을 Provider 밖으로'}
        </button>
      </div>

      {/* 울타리 = Provider. 이 안에 있어야 계약이 유효하다. */}
      <div style={{ marginTop: 12, border: '2px dashed var(--brand)', borderRadius: 12, padding: '10px 12px', background: 'var(--brand-soft)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand)', marginBottom: 8 }}>
          &lt;ThemeContext.Provider value=&#123;&#123; dark, setDark &#125;&#125;&gt; <b>← 계약 안(울타리)</b>
        </div>
        <ThemeContext.Provider value={{ dark, setDark }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ThemeChip label="Toolbar" />
            {!panelOut && <ThemeChip label="Panel" />}
          </div>
        </ThemeContext.Provider>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand)', marginTop: 8 }}>&lt;/ThemeContext.Provider&gt;</div>
      </div>

      {/* 밖 — 계약 상대(Provider)가 없다 */}
      {panelOut && (
        <div style={{ marginTop: 10, border: '2px dashed var(--red)', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 12, color: 'var(--red)', marginBottom: 8 }}>🚧 Provider <b>밖</b> — 계약 상대가 없다</div>
          <ThemeChip label="Panel" />
        </div>
      )}

      <p className="demo-desc" style={{ marginTop: 10 }}>
        <b>Panel을 Provider 밖으로</b> 꺼내 보라 — 같은 컴포넌트인데 <code>useContext</code>가 <b>null</b>을 받아 <b>계약 위반</b>(빨강)이 된다.
        <code> useContext</code>를 쓰는 순간 그 컴포넌트는 <b>"이 Provider 안에서만 산다"</b>는 계약에 묶인다.
      </p>
    </div>
  )
}
