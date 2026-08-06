// 🤝 개념 · Context 계약 — Provider와 소비자는 계약으로 묶인다
// 8-2(전역 상태)에서 Context가 편한 걸 봤다. 그런데 useContext를 쓰는 순간
// 그 컴포넌트는 "이 Provider 안에서만 산다 · value의 모양에 맞춘다"는 보이지 않는 계약에 묶인다.
// 이 계약의 정체와 장단점을 별도로 정리한다. (8-3에서 이 계약을 props로 풀어 보는 실습으로 이어진다.)

import { createContext, useContext, useState } from 'react'
import TechTags from '../../../components/TechTags.jsx'

const ThemeContext = createContext(null)

// 🤝 계약 소비자 — Provider 안이면 값 받음(초록·글로우), 밖이면 null → 계약 위반(빨강·흔들림)
function ContractPanel() {
  const ctx = useContext(ThemeContext) // Provider 밖이면 기본값 null이 온다
  if (!ctx) {
    return (
      <div className="contract-panel bad">
        <div className="cp-title">💥 Panel</div>
        <div className="cp-line">useContext(ThemeContext)</div>
        <div className="cp-line">→ <b>null</b> (값이 안 온다)</div>
        <div className="cp-verdict">❌ 계약 위반</div>
      </div>
    )
  }
  const { dark } = ctx
  return (
    <div className="contract-panel ok" style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#e2e8f0' : 'inherit' }}>
      <div className="cp-title">💡 Panel</div>
      <div className="cp-line">useContext(ThemeContext)</div>
      <div className="cp-line">→ <b>{`{ dark: ${String(dark)} }`}</b></div>
      <div className="cp-verdict">✅ 계약 연결 · 값 받는 중 ({dark ? '🌙 다크' : '☀️ 라이트'})</div>
    </div>
  )
}

// 🤝 같은 <Panel />을 Provider 안·밖에 나란히 — 즉시 대비로 계약을 눈에 박는다.
function ContractDemo() {
  const [dark, setDark] = useState(false)
  return (
    <div>
      <div className="button-row" style={{ justifyContent: 'center' }}>
        <button className="chip on" onClick={() => setDark((d) => !d)}>{dark ? '🌙 다크' : '☀️ 라이트'} — 테마 토글</button>
      </div>
      <p className="demo-desc" style={{ textAlign: 'center', margin: '10px 0' }}>
        <b>같은 <code>&lt;Panel /&gt;</code></b>을 두 자리에 놓았다 — 토글하면 <b>안쪽(계약 O)만</b> 색이 바뀐다(살아서 값 받는 중).
      </p>
      <div className="compare-grid">
        {/* 왼쪽: Provider 안 */}
        <div style={{ textAlign: 'center' }}>
          <span className="contract-col-head ok">🔌 Provider 안 — 계약 O</span>
          <div style={{ border: '2px dashed var(--green)', borderRadius: 14, padding: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', marginBottom: 8 }}>&lt;ThemeContext.Provider&gt;</div>
            <ThemeContext.Provider value={{ dark, setDark }}>
              <ContractPanel />
            </ThemeContext.Provider>
          </div>
        </div>
        {/* 오른쪽: Provider 밖 */}
        <div style={{ textAlign: 'center' }}>
          <span className="contract-col-head bad">🚫 Provider 밖 — 계약 X</span>
          <div style={{ border: '2px dashed var(--red)', borderRadius: 14, padding: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', marginBottom: 8 }}>(Provider 없음)</div>
            <ContractPanel />
          </div>
        </div>
      </div>
      <p className="demo-desc" style={{ marginTop: 12, textAlign: 'center' }}>
        같은 컴포넌트인데 <b>Provider 안이면 값을 받고(초록), 밖이면 못 받는다(빨강)</b>. <code>useContext</code>는 <b>그 Provider와 맺은 계약</b>이라, 계약 상대 밖에선 무효다.
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

      <h3 className="section-title">🔬 계약을 눈으로 — 같은 Panel, 안이면 O·밖이면 위반</h3>
      <span className="learn-tag">📎 학습 포인트 · 같은 &lt;Panel /&gt;을 Provider 안·밖에 나란히 두면, 안은 값 받고(초록) 밖은 null(빨강·계약 위반)</span>
      <div className="card">
        <div className="file-label">🔬 라이브 — 같은 컴포넌트, 두 자리 (테마 토글하면 안쪽만 반응)</div>
        <pre className="err-code">{`// 소비자 — Provider 안이면 값(ctx)을 받고, 밖이면 null
function Panel() {
  const ctx = useContext(ThemeContext)
  if (!ctx) return <span>❌ 계약 위반 · null</span>   // 밖: 값이 없다
  return   <span>✅ dark: {String(ctx.dark)}</span>   // 안: 값을 받는다
}

// 🔌 Provider 안 — 계약 O (아래 왼쪽 → 초록)
<ThemeContext.Provider value={{ dark, setDark }}>
  <Panel />        // ctx를 받는다
</ThemeContext.Provider>

// 🚫 Provider 밖 — 계약 X (아래 오른쪽 → 빨강)
<Panel />          // Provider가 없다 → ctx = null`}</pre>
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
            <li><b>엄격한 일관성 강제</b> — 모두 <b>같은 통로(계약)</b>로 접근하니 사용법이 통일된다. <code>useForm()</code>·<code>useAuth()</code> 훅으로 감싸면 "Provider 밖에서 쓰면 즉시 에러"로 계약을 <b>강제</b>해, 제각각 쓰다 나는 조용한 버그를 원천 차단한다.</li>
          </ul>
        </div>
        <div className="card">
          <div className="file-label">👎 계약의 단점</div>
          <ul className="section-list" style={{ margin: 0 }}>
            <li><b>결합</b> — 소비자는 <code>Provider</code> 밖에선 못 산다. 그 컴포넌트만 떼어 <b>다른 곳에 재사용</b>하기 어렵다.</li>
            <li><b>보이지 않는 의존성</b> — props와 달리 시그니처(<code>function Panel()</code>)만 봐선 <b>무엇을 필요로 하는지</b> 안 드러난다.</li>
            <li><b>암묵적 계약</b> — Provider가 value <b>모양</b>을 바꾸면 멀리 있는 소비자가 <b>전부</b> 조용히 깨진다.</li>
            <li><b>테스트·리렌더</b> — 테스트할 때 <code>Provider</code>로 감싸야 하고, value가 바뀌면 구독자 전부 리렌더된다.</li>
            <li><b>허술한 계약이면 위험</b> — value 모양이 느슨하거나(문서·타입 없음) 안전장치가 없으면(<code>createContext(null)</code>을 그냥 쓰면 <code>null</code>이 새어 나가 런타임에 터짐), 소비자가 <b>무엇을 받는지 불명확</b>하다. 계약의 <b>'품질'이 나쁘면</b> 편함이 오히려 함정이 된다 — 그래서 <code>useForm</code> 같은 훅 + 기본값 검사로 계약을 <b>단단히</b> 만든다.</li>
          </ul>
        </div>
      </div>
      <p className="section-desc">
        📖 균형점 — <b>넓게·자주 쓰는 값</b>이면 계약의 이득(공유·드릴링 제거) &gt; 결합이라 <b>Context</b>가 맞다.
        <b> 좁게 한두 곳만</b> 쓰는 값이면 그냥 <b>props</b>가 더 명확하고 재사용도 쉽다. "이 계약이 값어치가 있나"를 그때그때 따진다.
      </p>

      <div className="concept">
        <p className="concept-lead">📚 참고 — '계약'은 소프트웨어 공학 용어다</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          여기서 말한 '계약'은 비유가 아니라 실제 개념이다 — <b>계약에 의한 설계(Design by Contract)</b>:
          모듈끼리 <b>지켜야 할 약속</b>(무엇을 주고받고, 어떤 전제를 지켜야 하는지)을 명시해 두는 설계 방식이다.
          Context의 Provider↔소비자 관계가 딱 이 형태다 — Provider는 "이 모양의 값을 준다", 소비자는 "그 안에서만 쓴다".
        </p>
        <p className="section-desc" style={{ margin: '6px 0 0' }}>
          <a className="doc-link" href="https://ko.wikipedia.org/wiki/계약에_의한_설계" target="_blank" rel="noopener noreferrer">
            위키백과 · 계약에 의한 설계 (Design by Contract) ↗
          </a>
        </p>
      </div>

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
