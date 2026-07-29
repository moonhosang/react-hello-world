// 개념 · 이벤트 전파 & 전개 props   (배우는 것: 클릭이 부모로 '번지는' 것 · props 한 번에 넘기기)
// 3단계에서 onClick을 배웠다. 여기서는 두 가지 실전 감각을 더한다:
//   (1) 이벤트 전파(버블링) — 자식 클릭이 부모 onClick까지 타고 올라간다. stopPropagation으로 막는다.
//   (2) 전개 props ({...obj}) — 여러 속성을 한 번에 넘긴다.

import { useState } from 'react'

// 🟢 라이브 — 바깥 상자(부모)와 안쪽 버튼(자식)에 각각 onClick.
// 버튼을 누르면 '버튼 → 상자' 순으로 로그가 쌓인다(버블링). 막기 스위치로 stopPropagation을 켠다.
function BubblingDemo() {
  const [log, setLog] = useState([])
  const [stop, setStop] = useState(false)
  // 실행 순서 그대로 보여준다 — 먼저 찍힌 게 위(버튼 → 상자). 순서를 가르치는 데모라 최신순으로 뒤집지 않는다.
  const add = (who) => setLog((l) => [...l, who].slice(-6))

  return (
    <div>
      <div className="button-row" style={{ marginBottom: 10 }}>
        <button className={'chip' + (stop ? ' on' : '')} onClick={() => setStop((s) => !s)}>
          {stop ? '🛑 stopPropagation 켬' : '⬜ stopPropagation 끔'}
        </button>
        <button className="chip" onClick={() => setLog([])}>로그 지우기</button>
      </div>

      {/* 부모 상자 — 여기에도 onClick이 있다 */}
      <div
        className="tree-box"
        style={{ cursor: 'pointer' }}
        onClick={() => add('📦 상자(부모) onClick')}
      >
        바깥 상자 (부모) — 빈 곳을 눌러도 반응한다
        <div style={{ marginTop: 8 }}>
          <button
            className="chip on"
            onClick={(e) => {
              if (stop) e.stopPropagation() // 👈 켜면 여기서 전파를 끊는다
              add('🔘 버튼(자식) onClick')
            }}
          >
            안쪽 버튼 누르기
          </button>
        </div>
      </div>

      <div className="tree-box leaf" style={{ marginTop: 10 }}>
        <b>이벤트 로그</b>
        {log.length === 0 ? (
          <div className="demo-desc">버튼을 눌러 보라. 찍힌 순서 그대로 위 → 아래(버튼 먼저, 상자 나중).</div>
        ) : (
          <ul className="section-list" style={{ margin: '6px 0 0' }}>
            {log.map((row, i) => <li key={i}>{row}</li>)}
          </ul>
        )}
      </div>
      <p className="demo-desc">
        스위치가 <b>꺼짐</b>이면 버튼을 눌러도 <b>버튼 → 상자</b> 둘 다 찍힌다(버블링). <b>켜면</b> 버튼만 찍힌다.
      </p>
    </div>
  )
}

// 🟢 전개 props — 부모가 모아 둔 속성 객체를 자식에 통째로 펼친다.
function Avatar({ name, emoji, color }) {
  return (
    <span className="chip" style={{ borderColor: color, color }}>
      {emoji} {name}
    </span>
  )
}
function SpreadDemo() {
  const user = { name: '지수', emoji: '🦊', color: 'var(--brand)' }
  return (
    <div className="button-row">
      {/* 아래 두 줄은 완전히 같다 */}
      <Avatar name={user.name} emoji={user.emoji} color={user.color} />
      <Avatar {...user} />
    </div>
  )
}

export default function EventPropagation() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">개념</span>
        <h2>이벤트 전파 & 전개 props</h2>
        <p>클릭은 자식에서 부모로 '번진다'(버블링). 그리고 여러 속성은 {'{...객체}'}로 한 번에 넘긴다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          자식의 클릭은 <b>부모 onClick까지 타고 올라간다</b>(버블링). 원치 않으면
          <code> e.stopPropagation()</code>으로 막는다. 그리고 <code>{'<C {...obj} />'}</code>는 <b>객체의 키를 속성으로 펼친다.</b>
        </p>
      </div>

      {/* ① 이벤트 전파 */}
      <h3 className="section-title">① 이벤트 전파(버블링) — 클릭이 위로 번진다</h3>
      <span className="learn-tag">📎 학습 포인트 · 자식 클릭 → 부모 onClick 순으로 실행된다. stopPropagation으로 끊는다</span>
      <p className="section-desc">
        어떤 요소를 클릭하면, 그 이벤트는 <b>자식에서 부모로</b> 순서대로 올라가며 만나는 <code>onClick</code>을 모두 실행한다.
        이걸 <b>버블링(bubbling)</b>이라 한다. 대개는 편리하지만, "버튼만 반응하고 바깥 상자는 반응하지 않게" 하려면
        자식에서 <code>e.stopPropagation()</code>으로 전파를 끊는다.
      </p>
      <div className="card">
        <div className="file-label">📄 BubblingDemo — 스위치로 stopPropagation을 켜고 눌러 보라</div>
        <BubblingDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 전파 막기 · 기본 동작 막기</div>
        <pre className="concept-flow">{`<div onClick={handleBox}>            {/* 부모 */}
  <button onClick={(e) => {
    e.stopPropagation()  // 👈 부모로 안 번지게 (전파 중단)
    handleButton()
  }}>버튼</button>
</div>

// 비슷하지만 다른 것:
// e.stopPropagation() → '부모로 번지는 것'을 막는다
// e.preventDefault()  → '브라우저 기본 동작'(폼 새로고침·링크 이동)을 막는다`}</pre>
      </div>

      {/* ② 전개 props */}
      <h3 className="section-title">② 전개 props — {'{...객체}'}로 한 번에 넘기기</h3>
      <span className="learn-tag">📎 학습 포인트 · 객체의 키들을 그대로 속성으로 펼친다. 반복되는 props 나열을 줄인다</span>
      <p className="section-desc">
        넘길 속성이 많고 이미 <b>객체로 모여 있다면</b>, 하나씩 쓰지 말고 <code>{'{...객체}'}</code>로 펼친다.
        <code> {'<Avatar {...user} />'}</code>는 <code>{'<Avatar name={user.name} emoji={user.emoji} ... />'}</code>와 <b>똑같다.</b>
      </p>
      <div className="card">
        <div className="file-label">📄 SpreadDemo — 아래 두 뱃지는 완전히 같은 코드다</div>
        <SpreadDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 전개 props 코드</div>
        <pre className="concept-flow">{`const user = { name: '지수', emoji: '🦊', color: '...' }

// 길게
<Avatar name={user.name} emoji={user.emoji} color={user.color} />

// 짧게 — 완전히 동일
<Avatar {...user} />

// 일부만 덮어쓰기도 된다 (뒤에 쓴 것이 이긴다)
<Avatar {...user} emoji="🐻" />   // name·color는 user, emoji만 🐻`}</pre>
      </div>
      <p className="section-desc">
        ⚠️ 편하지만 <b>남용은 조심</b> — 무엇이 넘어가는지 코드에서 한눈에 안 보인다. 정말 "그대로 전달"할 때만 쓴다.
      </p>

      <div className="concept">
        <p className="concept-lead">📖 정리</p>
        <ul className="section-list">
          <li><b>버블링</b> — 클릭은 자식 → 부모로 번진다. 막으려면 <code>e.stopPropagation()</code>.</li>
          <li><code>stopPropagation</code>(전파 막기) ≠ <code>preventDefault</code>(기본 동작 막기).</li>
          <li><b>전개 props</b> <code>{'{...obj}'}</code> — 객체 키를 속성으로 펼친다. 뒤에 쓴 값이 이긴다.</li>
        </ul>
      </div>
    </section>
  )
}
