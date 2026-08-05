// 🟨 JS 7강 · Promise · async / await   (배우는 것: '나중에 오는 값'을 다루는 법)
// 네트워크 요청처럼 결과가 지금 당장이 아니라 나중에 오는 코드를 읽고 쓴다.
// React 9-4(useEffect에서 데이터 불러오기)의 전제다.

import { useState } from 'react'

const mono = 'var(--font-mono)'

// 가짜 서버 — 0.9초 뒤에 이름을 돌려주는 Promise. 진짜 fetch도 모양은 같다.
const fakeFetchUser = () => new Promise((res) => setTimeout(() => res('김코딩'), 900))

// JS 1·2강 해부기와 같은 색칩 — 조각의 역할별 색
const ROLE = {
  term: { name: '코드', color: '#2563eb' },
  operator: { name: '키워드', color: '#dc2626' },
  value: { name: '출력', color: '#16a34a' },
  expression: { name: '기다림', color: '#7c3aed' },
}
const chipStyle = (role) => ({
  border: `1.5px solid ${ROLE[role]?.color ?? '#888'}`,
  color: ROLE[role]?.color ?? '#888',
  background: 'transparent',
  borderRadius: 8,
  padding: '3px 9px',
  fontFamily: mono,
  fontSize: 13,
  fontWeight: 600,
})
// 해부기 스텝 카드 + 범례 (J1·J2 해부기와 동일한 모양)
function StepCards({ steps, shown }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {steps.slice(0, shown).map((s, i) => (
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
  )
}
function Legend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
      {Object.values(ROLE).map((r) => (
        <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, display: 'inline-block' }} />
          {r.name}
        </span>
      ))}
    </div>
  )
}

// ⏱ 실행 순서 해부기 — 동기 코드가 먼저 다 돌고, await로 기다린 결과는 나중에 온다.
const ORDER_STEPS = [
  {
    title: "① console.log('A') 실행 — 동기, 지금 바로",
    note: '적힌 그대로 즉시 실행되고 A가 찍힌다.',
    parts: [{ label: "console.log('A')", role: 'term' }, { label: 'A', role: 'value' }],
    out: 'A',
  },
  {
    title: '② await fakeFetchUser() — 결과를 기다린다',
    note: '요청만 보내고 결과가 올 때까지 기다린다. 단, 멈추는 건 이 async 함수 안에서만이다 — 함수 밖의 다른 동기 코드는 먼저 돌 수 있다. (.then이라면 이 자리에서 "도착하면 실행해 달라"고 예약을 거는 셈이다.)',
    parts: [{ label: 'await', role: 'operator' }, { label: 'fakeFetchUser()', role: 'term' }, { label: '⏳ 기다리는 중…', role: 'expression' }],
    out: null,
  },
  {
    title: "③ (기다리는 동안) 함수 바깥의 console.log('B')",
    note: '함수 밖 다음 동기 코드가 먼저 실행된다 — 그래서 B가 김코딩보다 먼저 찍힌다.',
    parts: [{ label: "console.log('B')", role: 'term' }, { label: 'B', role: 'value' }],
    out: 'B',
  },
  {
    title: "④ 0.9초 뒤 값 도착 — user = '김코딩'",
    note: '동기 코드가 다 끝난 뒤 도착한 값이 user에 담기고, 그제서야 await 아래 줄이 실행된다.',
    parts: [{ label: "user = '김코딩'", role: 'term' }, { label: 'console.log(user)', role: 'term' }, { label: '김코딩', role: 'value' }],
    out: '김코딩',
    result: '✔ 최종 출력: A → B → 김코딩',
  },
]
function OrderTrace() {
  const [shown, setShown] = useState(0)
  const done = shown >= ORDER_STEPS.length
  const outputs = ORDER_STEPS.slice(0, shown).filter((s) => s.out).map((s) => s.out)
  return (
    <div>
      <pre className="err-code" style={{ margin: '0 0 10px' }}>{`async function main() {
  console.log('A')
  const user = await fakeFetchUser()   // 여기서 기다린다
  console.log(user)                    // '김코딩'
}
main()
console.log('B')                       // 함수 바깥의 다음 동기 코드`}</pre>
      {shown === 0
        ? <div className="demo-desc">▶ "다음 단계"를 눌러 실제 실행 순서를 한 장씩 확인해 보라.</div>
        : <StepCards steps={ORDER_STEPS} shown={shown} />}
      {shown > 0 && (
        <div style={{ marginTop: 10, fontFamily: mono, fontSize: 12.5 }}>
          <span style={{ color: 'var(--muted)' }}>출력: </span>
          <b style={{ color: 'var(--brand)' }}>{outputs.join('  →  ') || '(아직 없음)'}</b>
        </div>
      )}
      {done && (
        <div style={{ marginTop: 8, fontWeight: 700, color: 'var(--brand)' }}>
          ✔ 코드에 적힌 순서가 아니라 "동기 먼저(A, B), 도착한 값(김코딩)은 나중"이다.
        </div>
      )}
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(ORDER_STEPS.length, v + 1))}>
          {done ? '✅ 끝' : '▶ 다음 단계'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <Legend />
    </div>
  )
}

// 🔴 라이브 데모 — 버튼을 누르면 진짜로 0.9초 기다렸다가 결과가 온다.
function FetchDemo() {
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [user, setUser] = useState(null)
  const [trace, setTrace] = useState([])

  async function load() {
    setStatus('loading')
    setUser(null)
    setTrace(['📤 요청 보냄', '⏳ (기다림 — 그동안 화면은 안 멈춘다. 이 문장도 계속 보인다)'])
    const name = await fakeFetchUser() // ← 여기서 '기다렸다가' 도착하면 다음 줄로
    setUser(name)
    setStatus('done')
    setTrace((t) => [...t, '📥 도착 → await 다음 줄 실행'])
  }

  return (
    <div>
      <div className="button-row">
        <button className="chip on" disabled={status === 'loading'} onClick={load}>
          {status === 'loading' ? '⏳ 불러오는 중…' : '불러오기'}
        </button>
        {status === 'done' && <span style={{ fontWeight: 700, color: 'var(--brand)' }}>✅ user = "{user}"</span>}
      </div>
      {trace.length > 0 && (
        <div className="tree-box" style={{ marginTop: 10 }}>
          {trace.map((t, i) => (
            <div key={i} style={{ fontSize: 12.5, marginBottom: 3 }}>{t}</div>
          ))}
          {status === 'loading' && <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>…</div>}
        </div>
      )}
      <p className="demo-desc" style={{ marginTop: 8 }}>
        누른 직후 "불러오는 중…"이 뜨고, 약 0.9초 뒤 결과가 온다. 기다리는 동안에도 버튼·화면이 전부 살아 있다 — 이게 비동기다.
      </p>
    </div>
  )
}

export default function JsAsync() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 7</span>
        <h2>Promise · async / await — 나중에 오는 값 다루기</h2>
        <p>네트워크 요청의 결과는 지금 당장이 아니라 나중에 온다. 그동안 코드는 안 멈추고 진행한다 — 이걸 다루는 문법이 Promise와 async/await다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>비동기</b> = 결과가 <b>나중에</b> 온다. <b>Promise</b> = "나중에 값이 올 상자". 도착하면 <code>.then(값 =&gt; ...)</code>이 실행된다.
          <b> async/await</b> = <code>.then</code> 사슬 대신 <code>const user = await fetchUser()</code>로 <b>기다렸다가</b> 다음 줄로 간다.
        </p>
      </div>

      {/* ① 비동기란 */}
      <h3 className="section-title">① 비동기 — 결과가 '나중에' 온다</h3>
      <span className="learn-tag">📎 학습 포인트 · 서버 응답을 기다리는 동안 코드(와 화면)는 멈추지 않는다</span>
      <p className="section-desc">
        서버에서 데이터를 받아오는 데는 시간이 걸린다(0.1초든 3초든). 그 시간 동안 자바스크립트는 <b>멈춰서 기다리지 않고</b> 다음 코드를 계속 실행한다.
        멈추면 그동안 버튼도 안 눌리고 화면이 얼어 버리기 때문이다.
      </p>
      <div className="card">
        <div className="file-label">📄 그래서 이런 코드는 뜻대로 안 된다</div>
        <pre className="err-code">{`const user = fakeFetchUser()   // ❌ user에 '김코딩'이 담기지 않는다
console.log(user)              // Promise { <pending> }  ← 아직 안 온 '상자'만 있다

// 요청을 보내는 순간 값이 생기는 게 아니다.
// 값은 나중에 도착한다 → 그때 실행할 코드를 '예약'해야 한다.`}</pre>
      </div>

      {/* ② Promise */}
      <h3 className="section-title">② Promise — "나중에 값이 올 상자"</h3>
      <span className="learn-tag">📎 학습 포인트 · 상자에 .then(함수)로 "도착하면 이걸 실행해 달라"고 예약한다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>
        🔤 <b>Promise</b>는 말 그대로 "<b>약속</b>" — "나중에 값을 주겠다"는 약속이다(지키면 resolve로 값을, 어기면 reject로 에러를 준다).
        <code> then</code>은 "<b>그다음</b>" — 도착하면 그다음 이걸 하라.
      </p>
      <div className="card">
        <div className="file-label">📄 .then 으로 예약하기</div>
        <pre className="err-code">{`fakeFetchUser().then(user => {   // 도착하면 user에 '김코딩'이 담겨 실행된다
  console.log(user)              // '김코딩'
})

// 여러 단계면 사슬이 된다 — 금방 읽기 힘들어진다 (.then 지옥)
fetchUser().then(user => fetchPosts(user).then(posts => { ... }))`}</pre>
      </div>
      <ul className="section-list">
        <li><code>fakeFetchUser()</code>가 돌려주는 건 값이 아니라 <b>Promise(상자)</b>다.</li>
        <li><code>.then(함수)</code> = "값이 도착하면 이 함수를 실행해 달라"는 <b>예약</b>. 도착한 값이 그 함수의 인수로 들어온다.</li>
        <li>단계가 겹치면 <code>.then</code> 안에 <code>.then</code>이 중첩된다 → 그래서 다음의 async/await가 나왔다.</li>
      </ul>

      {/* ③ async / await */}
      <h3 className="section-title">③ async / await — 기다렸다가 다음 줄로</h3>
      <span className="learn-tag">📎 학습 포인트 · await = 상자가 열릴 때까지 이 함수 안에서만 기다린다. 함수 앞에 async 필수</span>
      <p className="section-desc" style={{ marginTop: 0 }}>🔤 <b>async</b>는 <b>a</b>(아님)+<b>sync</b>(동시) = asynchronous(<b>비동기</b>), <b>await</b>는 "<b>기다리다</b>"(wait). 그래서 async 함수 안에서 await로 "기다렸다가" 값을 받는다.</p>
      <div className="card">
        <div className="file-label">📄 같은 일을 위에서 아래로 읽히게</div>
        <pre className="err-code">{`async function load() {              // ① await를 쓰려면 함수에 async를 붙인다
  const user = await fakeFetchUser() // ② 도착할 때까지 '기다렸다가' user에 담는다
  console.log(user)                  // ③ 그다음에 이 줄 — 위→아래로 읽으면 된다
}`}</pre>
      </div>
      <ul className="section-list">
        <li><code>await 상자</code> = 상자가 열리길 기다렸다가 <b>안의 값</b>을 꺼낸다. ①의 <code>Promise {'{ <pending> }'}</code> 문제가 사라진다.</li>
        <li><code>await</code>는 <b><code>async</code> 함수 안에서만</b> 쓸 수 있다 — 함수 선언 앞에 <code>async</code>를 붙이는 걸 잊으면 문법 에러다.</li>
        <li>기다리는 건 <b>이 함수 안에서만</b>이다. 함수 바깥의 다른 코드와 화면은 그동안 정상 동작한다.</li>
      </ul>

      {/* ④ 실행 순서 */}
      <h3 className="section-title">④ 실행 순서 감각 — 동기 먼저, 도착한 값은 나중</h3>
      <span className="learn-tag">📎 학습 포인트 · 코드에 적힌 순서 ≠ 실행 순서. 지금 할 수 있는 일부터 다 하고, 도착분은 그 뒤에</span>
      <div className="card">
        <div className="file-label">🔬 "▶ 다음 단계"로 한 장씩 실행해 보라 — 출력이 A → B → 김코딩 순서다</div>
        <OrderTrace />
      </div>

      {/* ⑤ 라이브 데모 */}
      <h3 className="section-title">⑤ 라이브 — 불러오기 버튼</h3>
      <span className="learn-tag">📎 학습 포인트 · 로딩 표시 → 기다림 → 도착. React 데이터 불러오기 화면의 뼈대다</span>
      <div className="card">
        <div className="file-label">🔴 눌러 보라 — 위 ③의 load()가 실제로 도는 것이다</div>
        <FetchDemo />
      </div>

      <div className="card">
        <div className="file-label">🔗 React로 이어지는 길 — useEffect에서 데이터 불러오기</div>
        <p className="section-desc" style={{ margin: 0 }}>
          React에선 이 패턴을 <b>9-4 · useEffect에서 데이터 불러오기</b>로 다시 만난다 — "화면이 뜨면 요청 보내고, 도착하면
          <code> setState</code>로 화면 갱신". 참고로 effect 콜백에 <b><code>async</code>를 직접 붙이지 않는</b> 규칙이 있는데,
          왜 그런지와 올바른 모양은 거기서 배운다. 오늘 배운 상자·await 감각이 그대로 전제다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          비동기 결과는 <b>나중에</b> 온다. Promise는 <b>나중에 값이 올 상자</b>, <code>.then</code>은 도착 시 실행 <b>예약</b>,
          <code> await</code>는 <b>기다렸다가 값 꺼내기</b>(단, <code>async</code> 함수 안에서만). 실행 순서는 <b>동기 먼저, 도착분은 나중</b>이다.
        </p>
      </div>
    </section>
  )
}
