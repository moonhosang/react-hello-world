// 🟨 JS 1강 · 표현식 해부   (배우는 것: 코드 한 줄을 문·식·항·인자로 쪼개 읽는 법)
// 모든 코드 읽기·디버깅의 뿌리. 큰 식을 작은 조각으로 나눠 "어디서 값이 정해지나"를 본다.
// React 1.46(JSX 규칙)·4.5(조건부 렌더링)의 바탕이기도 하다.

import { useState } from 'react'

// 조각의 '역할'별 색 — 해부기와 범례가 공유한다.
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '항(term)', color: '#2563eb' },
  factor: { name: '인자(factor)', color: '#0891b2' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
}
const chipStyle = (role) => ({
  border: `1.5px solid ${ROLE[role]?.color ?? '#888'}`,
  color: ROLE[role]?.color ?? '#888',
  background: 'transparent',
  borderRadius: 8,
  padding: '3px 9px',
  fontFamily: '"Consolas", ui-monospace, monospace',
  fontSize: 13,
  fontWeight: 600,
})

// 엄선된 예시 + 손으로 짠 분해 단계 (임의 입력 파싱은 불안정하니 고정 예시로)
const EXAMPLES = [
  {
    line: 'price * qty + tax',
    vars: { price: 100, qty: 3, tax: 50 },
    steps: [
      { title: '① 전체는 하나의 식(expression)', parts: [{ label: 'price * qty + tax', role: 'expression' }] },
      { title: '② 덧셈(+) 기준으로 두 항(term)으로 가른다', note: '+는 *보다 우선순위가 낮다 → 가장 느슨한 +로 바깥을 먼저 가른다', parts: [{ label: 'price * qty', role: 'term' }, { label: '+', role: 'operator' }, { label: 'tax', role: 'term' }] },
      { title: '③ 왼쪽 항을 인자(factor)로 쪼갠다', note: '*는 우선순위가 높다 → 항 안쪽을 인자로 쪼갠다. tax는 곱셈이 없어 더 쪼갤 게 없으니 그대로 항(term)이다', parts: [{ label: 'price', role: 'factor' }, { label: '*', role: 'operator' }, { label: 'qty', role: 'factor' }, { label: '+', role: 'operator' }, { label: 'tax', role: 'term' }] },
      { title: '④ 변수를 값으로 치환한다', parts: [{ label: '100', role: 'value' }, { label: '*', role: 'operator' }, { label: '3', role: 'value' }, { label: '+', role: 'operator' }, { label: '50', role: 'value' }] },
      { title: '⑤ 우선순위대로 계산 (× 먼저, + 나중)', parts: [{ label: '300', role: 'value' }, { label: '+', role: 'operator' }, { label: '50', role: 'value' }], result: '= 350' },
    ],
  },
  {
    line: 'age >= 18 && hasTicket',
    vars: { age: 20, hasTicket: true },
    steps: [
      { title: '① 전체는 하나의 식 (불리언이 되는 식)', parts: [{ label: 'age >= 18 && hasTicket', role: 'expression' }] },
      { title: '② && 기준으로 두 항으로 가른다', note: '&&는 >=보다 우선순위가 낮다 → 가장 느슨한 &&로 바깥을 먼저 가른다', parts: [{ label: 'age >= 18', role: 'term' }, { label: '&&', role: 'operator' }, { label: 'hasTicket', role: 'term' }] },
      { title: '③ 왼쪽 항을 인자(factor)로 쪼갠다', note: '>=는 &&보다 우선순위가 높다 → 왼쪽 항 안쪽을 인자로 쪼갠다. hasTicket은 더 쪼갤 게 없으니 그대로 항(term)이다', parts: [{ label: 'age', role: 'factor' }, { label: '>=', role: 'operator' }, { label: '18', role: 'factor' }, { label: '&&', role: 'operator' }, { label: 'hasTicket', role: 'term' }] },
      { title: '④ 값으로 치환한다', parts: [{ label: '20', role: 'value' }, { label: '>=', role: 'operator' }, { label: '18', role: 'value' }, { label: '&&', role: 'operator' }, { label: 'true', role: 'value' }] },
      { title: '⑤ 비교 먼저, 그다음 &&', note: '왼쪽이 false면 오른쪽은 아예 평가하지 않는다(단축 평가) — React의 cond && <JSX/>가 이 성질을 쓴다', parts: [{ label: 'true', role: 'value' }, { label: '&&', role: 'operator' }, { label: 'true', role: 'value' }], result: '= true' },
    ],
  },
]

function ExprDissector() {
  const [ex, setEx] = useState(0)
  const [step, setStep] = useState(0)
  const example = EXAMPLES[ex]
  const maxStep = example.steps.length - 1

  return (
    <div>
      <div className="button-row">
        {EXAMPLES.map((e, i) => (
          <button key={i} className={'chip' + (i === ex ? ' on' : '')} onClick={() => { setEx(i); setStep(0) }}>
            {e.line}
          </button>
        ))}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        변수: {Object.entries(example.vars).map(([k, v]) => `${k}=${v}`).join(' · ')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {example.steps.slice(0, step + 1).map((s, i) => (
          <div className="card" key={i} style={{ padding: '10px 12px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: s.note ? 3 : 8 }}>{s.title}</div>
            {s.note && <div className="demo-desc" style={{ margin: '0 0 8px' }}>🔑 {s.note}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              {s.parts.map((p, j) => <span key={j} style={chipStyle(p.role)}>{p.label}</span>)}
              {s.result && <b style={{ marginLeft: 8, fontSize: 15 }}>{s.result}</b>}
            </div>
          </div>
        ))}
      </div>

      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={step >= maxStep} onClick={() => setStep((s) => Math.min(maxStep, s + 1))}>
          {step >= maxStep ? '✅ 끝까지 쪼갬' : '▶ 다음 단계로 쪼개기'}
        </button>
        <button className="chip" onClick={() => setStep(0)}>↺ 처음</button>
      </div>

      {/* 색 범례 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        {Object.values(ROLE).map((r) => (
          <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, display: 'inline-block' }} />
            {r.name}
          </span>
        ))}
      </div>
    </div>
  )
}

// 실제 React 코드 — setCount 세 줄을 LetTrace와 '동일하게' 한 단계씩 해부한다. (React 3-2 상태 스냅샷)
// 핵심 대비: let엔 ③ '대입'이 있고, setCount엔 ③ '전달(대입 아님)'이라 변수에 안 쌓인다.
const SNAP = {
  wrong: {
    code: 'setCount(count + 1)',
    v: 'count',
    reads: [0, 0, 0], // 매 줄 읽는 count — 스냅샷이라 계속 0
    result: 'count = 1   (+1 만 오른다)',
    note: 'count(스냅샷)가 이 렌더 동안 계속 0이고, ③은 count에 대입이 아니라 setCount에 값을 전달할 뿐이라 안 쌓인다.',
  },
  right: {
    code: 'setCount(c => c + 1)',
    v: 'c',
    reads: [0, 1, 2], // 함수형: c가 직전 예약값을 받는다
    result: 'count = 3   (+3)',
    note: '함수형은 c가 직전 예약값을 받는다 → 0→1→2→3로 쌓인다.',
  },
}
function SnapshotTrace() {
  const [mode, setMode] = useState('wrong')
  const [shown, setShown] = useState(0)
  const t = SNAP[mode]
  const mono = 'var(--font-mono)'
  // 각 줄을 헤더 + ①식→인자 + ②값 + ③전달 로 평탄화
  const seq = []
  t.reads.forEach((read, i) => {
    seq.push({ kind: 'head', n: i + 1 })
    seq.push({ kind: 'factor' })
    seq.push({ kind: 'value', read, next: read + 1, first: i === 0 })
    seq.push({ kind: 'pass', next: read + 1 })
  })
  const done = shown >= seq.length
  const Label = ({ children }) => (
    <span style={{ fontSize: 12, color: 'var(--muted)', width: LABEL_W, flex: 'none' }}>{children}</span>
  )
  const rowStyle = { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 5 }
  const reset = (m) => { setMode(m); setShown(0) }

  return (
    <div>
      <div className="button-row">
        <button className={'chip' + (mode === 'wrong' ? ' on' : '')} onClick={() => reset('wrong')}>❌ 스냅샷</button>
        <button className={'chip' + (mode === 'right' ? ' on' : '')} onClick={() => reset('right')}>✅ 함수형</button>
      </div>
      <div style={{ fontFamily: mono, fontSize: 12.5, margin: '8px 0' }}>
        <b>{t.code}</b>  를 세 번
      </div>
      <div className="tree-box">
        {shown === 0 && <div style={{ color: 'var(--muted)', fontSize: 12.5 }}>▶ 버튼을 눌러 한 단계씩 실행해 보라.</div>}
        {seq.slice(0, shown).map((s, idx) => {
          if (s.kind === 'head') {
            return <div key={idx} style={{ fontFamily: mono, fontWeight: 700, marginTop: idx ? 12 : 0, marginBottom: 4 }}>{s.n}. {t.code}</div>
          }
          if (s.kind === 'factor') {
            return (
              <div key={idx} style={rowStyle}>
                <Label>① 식 → 항</Label>
                <span style={chipStyle('term')}>{t.v}</span>
                <span style={chipStyle('operator')}>+</span>
                <span style={chipStyle('term')}>1</span>
              </div>
            )
          }
          if (s.kind === 'value') {
            const crux = mode === 'wrong' && !s.first // 2·3번째 줄 = 착각하는 지점
            const anno = mode === 'wrong'
              ? (s.first ? '이 렌더의 스냅샷 0' : '앞에서 setCount(1)을 했으니 1일 것 같지만, 아직 리렌더 전이라 count는 여전히 0 ❗')
              : (s.first ? '현재 값' : '직전 예약값')
            return (
              <div key={idx} style={{ ...rowStyle, ...(crux ? { background: 'rgba(220,38,38,0.10)', borderRadius: 6, padding: '5px 6px' } : {}) }}>
                <Label>② 값으로</Label>
                <span style={chipStyle('value')}>{s.read}</span>
                <span style={chipStyle('operator')}>+</span>
                <span style={chipStyle('value')}>1</span>
                <span style={{ color: 'var(--muted)' }}>=</span>
                <span style={chipStyle('value')}>{s.next}</span>
                <span style={{ color: crux ? '#dc2626' : 'var(--muted)', fontWeight: crux ? 700 : 400, fontSize: 12 }}>
                  ({t.v} = {s.read} — {anno})
                </span>
              </div>
            )
          }
          // ③ 전달 (대입이 아니다!)
          return (
            <div key={idx} style={mode === 'wrong' ? { ...rowStyle, background: 'rgba(220,38,38,0.10)', borderRadius: 6, padding: '5px 6px' } : rowStyle}>
              <Label>③ 전달</Label>
              <b style={{ color: 'var(--brand)', fontFamily: mono }}>setCount({s.next})</b>
              <span style={{ color: mode === 'wrong' ? '#dc2626' : 'var(--muted)', fontWeight: mode === 'wrong' ? 700 : 400, fontSize: 12.5 }}>
                {mode === 'wrong'
                  ? '❗ 여기가 핵심 — 다음 렌더 값을 예약할 뿐, count = 1 처럼 대입하는 게 아니다. 그래서 이 렌더의 count는 0 그대로.'
                  : `예약 — 다음 c = ${s.next}`}
              </span>
            </div>
          )
        })}
        {done && <div style={{ marginTop: 10, fontWeight: 700, color: 'var(--brand)' }}>✔ {t.result}</div>}
      </div>
      {(() => {
        const passes = seq.slice(0, shown).filter((s) => s.kind === 'pass')
        const store = passes.length ? passes[passes.length - 1].next : 0
        const box = { flex: '1 1 160px', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }
        return (
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <div style={box}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>📸 이 렌더의 count <b>(스냅샷)</b></div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{mode === 'wrong' ? '0' : '—'}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{mode === 'wrong' ? '렌더 내내 0으로 고정' : '함수형은 스냅샷 안 씀'}</div>
            </div>
            <div style={box}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>🗄️ <b>React 내부 저장소</b></div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand)' }}>count = {store}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{done ? `→ 다음 렌더의 count = ${store}` : '예약을 처리하며 갱신 중…'}</div>
            </div>
          </div>
        )
      })()}
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(seq.length, v + 1))}>
          {done ? '✅ 끝' : '▶ 다음 단계'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>{t.note}</p>
    </div>
  )
}

// let 변수 — '식 → 인자 → 값 → 대입'을 한 단계씩(클릭마다 한 줄) 보여준다. 초보용 미세 단계.
const LABEL_W = 66
function LetTrace() {
  const [shown, setShown] = useState(0) // 몇 개의 미세 단계가 드러났나
  // 각 대입(c=c+1)을 헤더 + 3단계로 평탄화
  const seq = []
  ;[0, 1, 2].forEach((prev, i) => {
    seq.push({ kind: 'head', n: i + 1 })
    seq.push({ kind: 'factor' })
    seq.push({ kind: 'value', prev, next: prev + 1 })
    seq.push({ kind: 'assign', next: prev + 1 })
  })
  const done = shown >= seq.length
  const mono = 'var(--font-mono)'
  const Label = ({ children }) => (
    <span style={{ fontSize: 12, color: 'var(--muted)', width: LABEL_W, flex: 'none' }}>{children}</span>
  )
  const rowStyle = { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 5 }

  return (
    <div>
      <div style={{ fontFamily: mono, fontSize: 12.5, marginBottom: 8 }}>
        <b>let c = 0</b>   (변수 — 대입으로 바꿀 수 있다)
      </div>
      <div className="tree-box">
        {shown === 0 && <div style={{ color: 'var(--muted)', fontSize: 12.5 }}>▶ 버튼을 눌러 한 단계씩 실행해 보라.</div>}
        {seq.slice(0, shown).map((s, idx) => {
          if (s.kind === 'head') {
            return <div key={idx} style={{ fontFamily: mono, fontWeight: 700, marginTop: idx ? 12 : 0, marginBottom: 4 }}>{s.n}. c = c + 1</div>
          }
          if (s.kind === 'factor') {
            return (
              <div key={idx} style={rowStyle}>
                <Label>① 식 → 항</Label>
                <span style={chipStyle('term')}>c</span>
                <span style={chipStyle('operator')}>+</span>
                <span style={chipStyle('term')}>1</span>
              </div>
            )
          }
          if (s.kind === 'value') {
            return (
              <div key={idx} style={rowStyle}>
                <Label>② 값으로</Label>
                <span style={chipStyle('value')}>{s.prev}</span>
                <span style={chipStyle('operator')}>+</span>
                <span style={chipStyle('value')}>1</span>
                <span style={{ color: 'var(--muted)' }}>=</span>
                <span style={chipStyle('value')}>{s.next}</span>
              </div>
            )
          }
          return (
            <div key={idx} style={rowStyle}>
              <Label>③ 대입(=)</Label>
              <b style={{ color: 'var(--brand)', fontFamily: mono }}>c = {s.next}</b>
              <span style={{ color: 'var(--muted)' }}>다시 저장 ✅ (c는 이제 {s.next})</span>
            </div>
          )
        })}
        {done && <div style={{ marginTop: 10, fontWeight: 700, color: 'var(--brand)' }}>✔ c = 3   (매 줄 ③에서 다시 저장해서 누적)</div>}
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(seq.length, v + 1))}>
          {done ? '✅ 끝' : '▶ 다음 단계'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        ①에서 식 <code>c + 1</code>을 항으로 쪼개 평가하고, ③ <b>대입(=)</b>으로 <b>다시 저장</b>하니 다음 줄의 <code>c</code>가 커진다.
        반대로 <code>setCount(count + 1)</code>엔 ③ <b>대입이 없다</b> → 그래서 안 쌓인다(다음 ⑥).
      </p>
    </div>
  )
}

// 실제 React 줄을 토큰마다 용어로 라벨링한다.
function TermAnatomy() {
  const mono = 'var(--font-mono)'
  const tokens = [
    { code: 'setCount', terms: ['식별자 (함수 이름)'], color: '#ca8a04' },
    { code: '(', terms: ['호출 괄호 — 인수를 넘긴다는 표시'], color: '#64748b' },
    { code: 'count', terms: ['식별자 (변수)', '항(term)', '피연산자'], color: '#ca8a04' },
    { code: '+', terms: ['연산자'], color: '#dc2626' },
    { code: '1', terms: ['리터럴 (숫자)', '항(term)', '피연산자'], color: '#db2777' },
    { code: ')', terms: [], color: '#64748b' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: mono, fontSize: 17, marginBottom: 14 }}>
        {tokens.map((t, i) => <span key={i} style={{ color: t.color, fontWeight: 700 }}>{t.code}</span>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tokens.filter((t) => t.terms.length).map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontFamily: mono, fontWeight: 700, color: t.color, minWidth: 78, flex: 'none' }}>{t.code}</span>
            <span style={{ fontSize: 13 }}>{t.terms.join(' · ')}</span>
          </div>
        ))}
      </div>
      <div className="demo-desc" style={{ marginTop: 10 }}>
        <b>count + 1</b> 전체는 <b>식(표현식)</b> — 두 항의 합이고, <code>setCount</code>에 넘기는 <b>인수(argument)</b>다.{' '}
        <b>setCount(count + 1)</b> 전체는 <b>함수 호출식</b>이며, 한 줄로 쓰면 <b>문(statement)</b>이 된다.
        <br />※ 여기 색은 <b>토큰 종류</b>(식별자·연산자·리터럴)별 표시로, ②의 역할 색(식·항·인자)과는 별개다.
      </div>
    </div>
  )
}

export default function JsExprAnatomy() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 1</span>
        <h2>표현식 해부 — 코드 한 줄을 쪼개 읽기</h2>
        <p>큰 식을 문·식·항·인자로 나눠 "어디서 값이 정해지나"를 본다. 모든 코드 읽기와 디버깅의 뿌리다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>문(statement)</b>은 '동작', <b>식(expression)</b>은 '값이 되는 것'. 식을 계산해 값으로 만드는 것을
          <b> 평가(evaluate)</b>라 한다. 큰 식은 <b>항(term) → 인자(factor)</b>로 쪼개지고, <b>연산자 우선순위</b>대로 값이 정해진다.
        </p>
      </div>

      {/* ① 문 vs 식 */}
      <h3 className="section-title">① 문(statement) vs 식(expression)</h3>
      <span className="learn-tag">📎 학습 포인트 · 문은 '동작', 식은 '값이 되는 것' — 이 구분이 JSX <code>{'{ }'}</code> 규칙의 뿌리다</span>
      <div className="card">
        <div className="file-label">📄 한 줄을 뜯어보면</div>
        <pre className="err-code">{`const total = price * qty + tax
└─ 문(statement): "값을 계산해 total에 담아라"는 한 '동작'
        └─ '=' 오른쪽 price * qty + tax 가 식(expression)
           → 계산되어 '하나의 값'이 된다`}</pre>
      </div>
      <ul className="section-list">
        <li><b>식(expression)</b> — 계산하면 <b>값 하나</b>가 된다. <code>price * qty</code>, <code>age {'>='} 18</code>, <code>"hi"</code> 전부 식.</li>
        <li><b>문(statement)</b> — <b>동작</b>을 지시한다. <code>const x = ...</code>, <code>if (...) {'{...}'}</code>, <code>for (...)</code> 는 문. <b>값이 되지 않는다.</b></li>
        <li>그래서 JSX 중괄호 <code>{'{ }'}</code> 안엔 <b>식만</b> 넣을 수 있고 <code>if</code> 문은 못 넣는다 (→ React <b>1.46 · JSX 규칙</b>).</li>
      </ul>

      {/* ② 라이브 해부기 */}
      <h3 className="section-title">② 라이브 해부기 — 한 겹씩 쪼개기</h3>
      <span className="learn-tag">📎 학습 포인트 · 식 → 항(+·- 기준) → 인자(*·/ 기준) → 값. 우선순위가 곧 쪼개는 순서다</span>
      <div className="card">
        <div className="file-label">📄 예시를 골라 "다음 단계로 쪼개기"를 눌러 보라</div>
        <ExprDissector />
      </div>
      <div className="card">
        <div className="file-label">🔑 참고 · 연산자 우선순위 = 쪼개는 순서</div>
        <pre className="err-code">{`느슨함(낮음) ───────────────────────▶ 강함(높음)
  ||  →  &&  →  비교(>= ==)  →  + -  →  * /

쪼갤 땐: 낮은(느슨한) 연산자부터 '바깥에서' 가른다
계산은: 반대로 높은(강한) 연산자부터 '안쪽에서' 한다`}</pre>
      </div>

      {/* ③ 용어 */}
      <h3 className="section-title">③ 용어 정리</h3>
      <span className="learn-tag">📎 학습 포인트 · 이 말들을 알아야 문서·에러 메시지를 읽는다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>(문·식은 <b>①</b>에서 봤다. 여기선 식을 쪼갤 때 쓰는 나머지 용어를 모은다.)</p>
      <ul className="section-list">
        <li><b>항(term)</b> — <code>+</code>·<code>-</code> 로 이어지는 덩어리. (<code>price*qty</code> 와 <code>tax</code> 가 각각 항)</li>
        <li><b>인자(factor)</b> — <code>*</code>·<code>/</code> 로 이어지는 더 작은 조각. (<code>price</code>, <code>qty</code>)</li>
        <li>💡 항·인자는 <b>상대적</b>이다 — 더 <b>느슨한</b> 연산자로 가른 덩어리가 항, 그 안을 더 <b>강한</b> 연산자로 가른 조각이 인자다. 그래서 <code>c + 1</code>의 <code>c</code>·<code>1</code>은 <b>항</b>이다.</li>
        <li><b>피연산자(operand)</b> — 연산자가 다루는 값. <b>연산자(operator)</b> — <code>+ - * / {'>='} &&</code> 같은 기호.</li>
        <li><b>식별자(identifier)</b> — 이름(<code>price</code>). <b>리터럴(literal)</b> — 코드에 박힌 값(<code>18</code>, <code>"hi"</code>, <code>true</code>).</li>
        <li><b>함수 호출</b>(<code>setCount(1)</code>)도 <b>식</b>이다 — 계산되어 값이 된다.</li>
      </ul>
      <div className="card">
        <div className="file-label">⚠️ 헷갈리기 쉬운 이름 — 인자(factor) ≠ 인수(argument)</div>
        <p className="section-desc" style={{ margin: 0 }}>
          함수에 <b>넘기는 값</b>은 <b>인수(argument)</b>다 — 흔히 '인자'라고도 불러서, 이 강의의
          <b> 인자(factor, 곱셈 조각)</b>와 <b>전혀 다른 말</b>이니 주의한다. (예: <code>setCount(count + 1)</code>에서
          <code> count + 1</code>은 setCount의 <b>인수</b>다.)
        </p>
      </div>

      {/* ④ 왜 */}
      <h3 className="section-title">④ 왜 배우나 — 디버깅·정밀 읽기</h3>
      <span className="learn-tag">📎 학습 포인트 · 값이 이상하면, 식을 조각내 각 조각의 값을 짚어 범인을 찾는다</span>
      <p className="section-desc">
        학문이 아니라 <b>실전 기술</b>이다. 결과가 이상할 때 큰 식을 통째로 노려보지 말고, 위 해부기처럼
        <b> 조각으로 쪼개 각 조각의 값</b>을 확인하면 어디서 틀어졌는지 바로 보인다.
      </p>
      <div className="card">
        <div className="file-label">📄 흔한 함정 — 우선순위</div>
        <pre className="err-code">{`1 + 2 * 3     // 9라고 생각하기 쉽지만 → 7
// 쪼개 보면: 2 * 3 (곱셈 조각끼리 먼저) = 6,  그다음 1 + 6 = 7
// * 가 + 보다 우선순위가 높다 — 해부하면 착각이 사라진다

// 👉 헷갈리면 괄호로 순서를 강제하라
(1 + 2) * 3   // = 9   괄호 안을 먼저
1 + (2 * 3)   // = 7   (원래와 같지만 '읽는 사람'에게 순서를 알려 준다)`}</pre>
      </div>

      {/* ⑤ 값 만들기 vs 변수 바꾸기 — 왜 누적이 안 되나 */}
      <h3 className="section-title">⑤ 왜 누적이 안 되나 — 값 만들기 vs 변수 바꾸기</h3>
      <span className="learn-tag">📎 학습 포인트 · 표현식은 '값'을 만들 뿐이다. 변수는 오직 대입(=)으로만 바뀐다</span>
      <p className="section-desc">
        많이 헷갈리는 지점이다. (아래는 <code>count</code>가 <b>0</b>일 때다.) <code>count + 1</code>은 <b>값 하나(1)를 만들 뿐</b>,
        변수 <code>count</code>를 <b>바꾸지 않는다</b>. 변수를 바꾸는 건 오직 <b>대입 <code>=</code></b>이다 (읽고 → 계산 → <b>다시 저장</b>).
      </p>
      <p className="section-desc" style={{ marginTop: -4 }}>
        ⚠️ <code>=</code>는 '같다'가 아니라 <b>대입</b>이다. 같은지 <b>비교</b>하려면 <code>===</code>를 쓴다.
      </p>
      <div className="card">
        <div className="file-label">📄 세 가지를 구분하자</div>
        <pre className="err-code">{`count + 1            // ① 표현식만: 값 1을 만들지만 아무 데도 저장 안 함 → count 그대로
count = count + 1    // ② 대입: 계산한 값을 count에 '다시 저장' → count 바뀜 (누적)
setCount(count + 1)  // ③ 인수로 전달: 값 1을 함수에 넘길 뿐 → count 그대로`}</pre>
      </div>
      <p className="section-desc">
        그래서 <b>누적하려면</b> ② 대입이 필요하다. <code>let</code> 변수라면 대입으로 실제 누적된다:
      </p>
      <div className="card">
        <div className="file-label">📄 let 변수 — 대입이라 누적된다</div>
        <LetTrace />
      </div>
      <ul className="section-list">
        <li>①·③은 <code>count</code>를 <b>안 바꾼다</b> → 그래서 <code>setCount(count + 1)</code>을 세 번 해도 매번 <code>0 + 1</code>.</li>
        <li>②처럼 <b>다시 저장</b>해야 누적된다. 그런데 React의 <code>count</code>는 <code>const</code>(다시 대입 금지 선언)라 <b>대입을 못 한다</b> — 하면 <code>TypeError: Assignment to constant variable</code> 에러가 난다.</li>
        <li>그럼 React에선 어떻게 누적하나? → <code>setCount(c =&gt; c + 1)</code>로 "직전 값에서 +1"을 넘긴다. 바로 다음 ⑥이다.</li>
      </ul>

      {/* ⑥ 실전 React 코드 — setCount 줄 해부 */}
      <h3 className="section-title">⑥ 실전 — React에서 자주 보는 줄 해부</h3>
      <span className="learn-tag">📎 학습 포인트 · setCount(count + 1)의 count+1을 '한 줄씩' 평가하면, 왜 +3이 아니라 +1인지 보인다</span>
      <p className="section-desc">
        추상적인 <code>price*qty</code> 말고, <b>실제 리액트에서 마주치는 줄</b>로 해부해 보자. 카운터를 세 번 올리려
        <code> setCount(count + 1)</code>을 세 번 썼는데 <b>+1만</b> 오르는 유명한 함정이다. 각 줄의 <code>count + 1</code>을
        <b> 순서대로 평가</b>하면 이유가 드러난다 — <code>count</code>(스냅샷)가 이 렌더 동안 계속 <b>0</b>이다.
      </p>
      <div className="card">
        <div className="file-label">📄 TrapCounter.jsx — 이 세 줄이 문제다</div>
        <pre className="err-code">{`function handleClick() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(count + 1)   // +3이길 기대하지만 실제론 +1
}`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 한 줄씩 실행해 보라</div>
        <SnapshotTrace />
      </div>
      <p className="section-desc">
        이게 바로 "식을 조각내 값을 확인" 하는 디버깅이다. 같은 함정을 라이브 카운터로 만지는 건
        <b> React · 3-2 상태 설계·함정</b>(스냅샷)에서 이어 본다.
      </p>

      {/* ⑦ 이 줄을 용어로 낱낱이 라벨링 */}
      <h3 className="section-title">⑦ 이 줄을 용어로 낱낱이 — setCount(count + 1)</h3>
      <span className="learn-tag">📎 학습 포인트 · ③에서 배운 용어를 실제 줄에 대입하면, 토큰마다 정체가 보인다</span>
      <div className="card">
        <div className="file-label">📄 토큰마다 무슨 용어인가</div>
        <TermAnatomy />
      </div>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          코드 한 줄 = <b>문</b>. 그 안의 <b>식</b>은 <b>항 → 인자</b>로 쪼개지고, <b>우선순위</b>가 쪼개는 순서이자 계산 순서다.
          막히면 <b>쪼개서 값을 확인</b>하라.
        </p>
      </div>
    </section>
  )
}
