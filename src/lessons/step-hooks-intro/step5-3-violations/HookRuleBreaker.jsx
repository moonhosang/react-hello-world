import { Component, useState, useEffect } from 'react'

// 훅 규칙을 실제로 어겨서, 리액트가 던지는 '진짜 에러'를 눈으로 보는 데모 모음.
// 위반은 앱을 죽이므로 에러 바운더리(렌더 중 에러)와 try/catch(핸들러 에러)로 잡아
// ErrorBox에 실제 에러 메시지·설명·스택을 표기한다.
// (🔴 4. 클래스 컴포넌트 안은 라이브로 재현이 불가능해 제외한다)

// ── 에러를 한국어로 간략히 풀어 준다 (메시지로 판별) ──
function explain(message = '') {
  if (
    message.includes('Rendered more hooks') ||
    message.includes('Rendered fewer hooks') ||
    message.includes('order of Hooks')
  ) {
    return '이전 렌더보다 훅을 더(또는 덜) 불렀다는 뜻이다. 훅을 조건·반복·early return·try 안에서 부르면 렌더마다 개수·순서가 달라져, 리액트가 값을 짝지을 순서를 잃는다.'
  }
  if (message.includes('Invalid hook call')) {
    return '컴포넌트(대문자)나 커스텀 훅(use…) "밖"에서 훅을 불렀다는 뜻이다. 이벤트 핸들러·일반 함수·effect 콜백은 렌더 중이 아니라, 리액트가 이 훅을 어디에 매달지 몰라 즉시 거부한다.'
  }
  return null
}

// ── 실제 에러를 눈에 띄게 보여주는 공용 박스 ──
function ErrorBox({ error }) {
  const hint = explain(error.message)
  return (
    <div
      style={{
        border: '1px solid var(--red)',
        background: 'color-mix(in oklab, var(--red) 10%, var(--panel))',
        borderRadius: 10,
        padding: '12px 14px',
        marginTop: 10,
      }}
    >
      <b style={{ color: 'var(--red)' }}>💥 리액트가 던진 실제 에러</b>
      <pre
        style={{
          margin: '8px 0 0',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 12.5,
          lineHeight: 1.55,
          color: 'var(--text)',
          fontFamily: '"Consolas", ui-monospace, monospace',
        }}
      >
        {error.name}: {error.message}
      </pre>
      {hint && (
        <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
          💡 <b>쉽게 말하면:</b> {hint}
        </p>
      )}
      {error.stack && (
        <>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', margin: '10px 0 4px', fontWeight: 700 }}>
            스택 트레이스 (스크롤)
          </div>
          <pre
            style={{
              margin: 0,
              maxHeight: 160,
              overflow: 'auto',
              whiteSpace: 'pre',
              fontSize: 11.5,
              lineHeight: 1.5,
              color: 'var(--muted)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 12px',
              fontFamily: '"Consolas", ui-monospace, monospace',
            }}
          >
            {error.stack}
          </pre>
        </>
      )}
    </div>
  )
}

// 렌더 중 에러를 잡는 에러 바운더리
class HookErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) return <ErrorBox error={this.state.error} />
    return this.props.children
  }
}

const OK = <div className="tree-box leaf">✅ 정상 렌더 중</div>

// ── 렌더 중 에러형 데모(공용): armed를 켜면 Comp가 훅 개수를 바꿔 에러를 낸다 ──
function BoundaryDemo({ title, code, note, Comp }) {
  const [armed, setArmed] = useState(false)
  const [key, setKey] = useState(0) // 바꾸면 바운더리 리셋
  return (
    <div className="card">
      <div className="file-label">{title}</div>
      <pre className="concept-flow">{code}</pre>
      <div className="button-row">
        <button className="chip on" onClick={() => setArmed(true)}>😈 위반 실행</button>
        <button className="chip" onClick={() => { setArmed(false); setKey((k) => k + 1) }}>🔄 리셋</button>
      </div>
      <HookErrorBoundary key={key}>
        <Comp armed={armed} />
      </HookErrorBoundary>
      {note && <p className="demo-desc">{note}</p>}
    </div>
  )
}

// ── 핸들러/일반함수 에러형 데모(공용): try/catch로 잡아 표시 ──
function CatchDemo({ title, code, note, run }) {
  const [error, setError] = useState(null)
  return (
    <div className="card">
      <div className="file-label">{title}</div>
      <pre className="concept-flow">{code}</pre>
      <div className="button-row">
        <button
          className="chip on"
          onClick={() => {
            try {
              run()
            } catch (e) {
              setError(e)
            }
          }}
        >
          😈 위반 실행
        </button>
        {error && <button className="chip" onClick={() => setError(null)}>🔄 리셋</button>}
      </div>
      {error ? <ErrorBox error={error} /> : note && <p className="demo-desc">{note}</p>}
    </div>
  )
}

// ===== 🔴 1. 조건문 안 =====
function CondComp({ armed }) {
  const [a] = useState(0)
  if (armed) {
    const [b] = useState(0) // ❌ 조건부 훅
  }
  const [c] = useState(0)
  return OK
}

// ===== 🔴 1. 반복문 안 =====
function LoopComp({ armed }) {
  const n = armed ? 3 : 2
  for (let i = 0; i < n; i++) {
    const [x] = useState(i) // ❌ 반복문 안 훅 (개수가 변한다)
  }
  return OK
}

// ===== 🔴 2. 조건부 return 이후 =====
function EarlyReturnComp({ armed }) {
  const [a] = useState(0) // 훅 1: 항상 부른다
  if (!armed) return OK // 처음엔 여기서 빠져나간다 → 훅 1개
  const [b] = useState(0) // ❌ return 뒤의 훅 — armed면 부른다 → 훅 2개(개수가 달라짐)
  return OK
}

// ===== 🔴 6. try/catch 안 =====
function TryComp({ armed }) {
  try {
    if (armed) throw new Error('의도적 예외')
    const [a] = useState(0) // ❌ armed면 이 줄을 건너뛴다
  } catch {}
  const [b] = useState(0)
  return OK
}

// ===== 🔴 5. useEffect에 넘긴 함수 안 =====
function EffectComp() {
  useEffect(() => {
    useState(0) // ❌ effect 콜백은 렌더 중이 아니다
  }, [])
  return <div className="tree-box leaf">마운트됨 — effect 실행 중…</div>
}
function EffectDemo() {
  const [mounted, setMounted] = useState(false)
  const [key, setKey] = useState(0)
  return (
    <div className="card">
      <div className="file-label">📄 🔴 5. useEffect에 넘긴 함수 안 (실제로 에러 발생)</div>
      <pre className="concept-flow">{`useEffect(() => {
  const [x] = useState(0)   // ❌ effect 콜백 안에서 훅 호출
}, [])`}</pre>
      <div className="button-row">
        <button className="chip on" onClick={() => setMounted(true)}>😈 마운트해서 effect 실행</button>
        <button className="chip" onClick={() => { setMounted(false); setKey((k) => k + 1) }}>🔄 리셋</button>
      </div>
      <HookErrorBoundary key={key}>
        {mounted ? <EffectComp /> : <p className="demo-desc">아직 마운트되지 않았다.</p>}
      </HookErrorBoundary>
    </div>
  )
}

// 규칙2 데모용 일반 함수 (컴포넌트도 커스텀 훅도 아니다)
function getStatus() {
  return useState('online') // ❌ 일반 함수 안에서 훅 호출
}

export default function HookRuleBreaker() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <BoundaryDemo
        title="📄 🔴 1. 조건문 안 (실제로 에러 발생)"
        code={`if (armed) {
  const [b] = useState(0)   // ❌ 조건에 따라 부르거나 건너뛴다
}`}
        note='처음 훅 2개 → "위반 실행"하면 3개가 되며 순서가 어긋나 에러가 난다.'
        Comp={CondComp}
      />
      <BoundaryDemo
        title="📄 🔴 1. 반복문 안 (실제로 에러 발생)"
        code={`for (let i = 0; i < n; i++) {
  const [x] = useState(i)   // ❌ 반복 횟수(n)가 바뀌면 훅 개수도 바뀐다
}`}
        note="n이 2 → 3으로 늘며 훅 개수가 변해 에러가 난다."
        Comp={LoopComp}
      />
      <BoundaryDemo
        title="📄 🔴 2. 조건부 return 이후 (실제로 에러 발생)"
        code={`const [a] = useState(0)      // 훅 1개는 항상 부른다
if (!armed) return <Ok />    // 처음엔 여기서 빠져나간다 → 훅 1개
const [b] = useState(0)      // ❌ return 뒤의 훅 — 위반 실행하면 부른다 → 훅 2개`}
        note="위반 실행 시 훅이 1개 → 2개로 늘어(조건부 return 뒤의 훅이 추가돼) 에러가 난다."
        Comp={EarlyReturnComp}
      />
      <BoundaryDemo
        title="📄 🔴 6. try / catch 안 (실제로 에러 발생)"
        code={`try {
  if (armed) throw new Error()
  const [a] = useState(0)   // ❌ 예외가 나면 이 훅을 건너뛴다
} catch {}
const [b] = useState(0)`}
        note="try 안 훅은 예외가 나면 건너뛰어져 개수가 어긋난다 — 그래서 금지다."
        Comp={TryComp}
      />
      <CatchDemo
        title="📄 🔴 3. 이벤트 핸들러 안 (실제로 에러 발생)"
        code={`function handleClick() {
  const [d] = useState(0)   // ❌ 핸들러는 렌더 중이 아니다
}`}
        note="버튼을 누르면 핸들러 안에서 useState를 불러 'Invalid hook call'이 난다."
        run={() => {
          useState(0)
        }}
      />
      <CatchDemo
        title="📄 규칙 2 — 일반 함수 안에서 호출 (실제로 에러 발생)"
        code={`function getStatus() {        // ❌ 컴포넌트도 커스텀 훅도 아니다
  return useState('online')
}
// 이 함수를 렌더 밖(핸들러)에서 부르면 →`}
        note="컴포넌트/커스텀 훅이 아닌 일반 함수에서 훅을 부르면 'Invalid hook call'이 난다."
        run={() => {
          getStatus()
        }}
      />
      <EffectDemo />
    </div>
  )
}
