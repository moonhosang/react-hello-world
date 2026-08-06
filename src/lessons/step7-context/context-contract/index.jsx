// 🤝 개념 · Context 계약 — Provider와 소비자는 계약으로 묶인다
// 8-2(전역 상태)에서 Context가 편한 걸 봤다. 그런데 useContext를 쓰는 순간
// 그 컴포넌트는 "이 Provider 안에서만 산다 · value의 모양에 맞춘다"는 보이지 않는 계약에 묶인다.
// 이 계약의 정체와 장단점을 별도로 정리한다. (8-3에서 이 계약을 props로 풀어 보는 실습으로 이어진다.)

import { createContext, useContext, useState } from 'react'
import TechTags from '../../../components/TechTags.jsx'

const ThemeContext = createContext(null)

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

export default function ContextContract({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🤝 개념</span>
        <h2>Context 계약 — Provider와 묶인다</h2>
        <p>useContext를 쓰면 '이 Provider 안에서만 산다 · value의 모양에 맞춘다'는 보이지 않는 계약에 묶인다. 그 장단점을 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <code>useContext(X)</code>를 쓰는 컴포넌트는 <b>X.Provider와 계약</b>을 맺는다 — 편하지만 <b>결합</b>된다.
          이 계약이 언제 이득이고 언제 짐인지 가른다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          8-2에서 Context가 <b>얼마나 편한지</b> 봤다(드릴링 없이 어디서든 꺼냄). 그런데 그 편함엔 <b>대가</b>가 있다 —
          <code> useContext(X)</code>를 쓰는 순간 그 컴포넌트는 <b>① 그 <code>Provider</code> 안</b>(하위 트리)에 있어야 하고,
          <b>② value의 '모양'</b>(<code>{'{ dark, setDark }'}</code>)에 맞춰진다. props와 달리 <b>연결선이 안 보이는</b> 계약이다.
        </p>
      </div>

      <h3 className="section-title">🔬 계약을 눈으로 — 울타리 안이면 O, 밖이면 위반</h3>
      <span className="learn-tag">📎 학습 포인트 · 소비자를 Provider 울타리 밖으로 꺼내면 useContext가 null을 받아 계약이 깨진다</span>
      <div className="card">
        <div className="file-label">🔬 라이브 — Provider 울타리 안(초록) / 밖(빨강)</div>
        <ContractDemo />
      </div>

      <h3 className="section-title">⚖️ 계약의 장단점 — 균형</h3>
      <span className="learn-tag">📎 학습 포인트 · 넓게·자주 쓰는 값이면 계약의 이득 &gt; 결합 · 좁게 쓰면 props가 더 명확</span>
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
        <h4>💡 한 줄</h4>
        <ul>
          <li><code>useContext</code> = Provider와 맺는 <b>보이지 않는 계약</b>(위치 + 모양).</li>
          <li>편함(드릴링 제거)과 결합(Provider에 묶임)을 <b>맞바꾸는</b> 것 — 값의 범위로 판단한다.</li>
        </ul>
      </div>

      <TechTags
        items={[
          { label: '8-2 · 전역 상태', to: 7.2 },
          { label: '8-3 · 멀티스텝 폼 (계약 풀기 실습)', to: 7.3 },
        ]}
        onGo={onGo}
      />
    </section>
  )
}
