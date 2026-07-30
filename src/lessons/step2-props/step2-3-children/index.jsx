// 2-3 · children (컴포넌트 합성)   (배우는 것: 태그 '사이'에 넣은 내용을 props.children으로 받기)
// 지금까지 props는 <Card title="..." /> 처럼 '속성'으로 넘겼다.
// 그런데 <Card>여기 내용</Card> 처럼 여는 태그와 닫는 태그 '사이'에 넣은 것은
// 자동으로 props.children 으로 전달된다. 이걸로 '껍데기(래퍼) 컴포넌트'를 만든다.

import { useState } from 'react'

// 🟢 껍데기 컴포넌트 — 안에 무엇이 들어올지 모른 채, 감싸는 '틀'만 제공한다.
function Card({ title, children }) {
  return (
    <div className="tree-box">
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      {children /* 👈 태그 사이에 넣은 내용이 여기에 꽂힌다 */}
    </div>
  )
}

// 🟢 접을 수 있는 껍데기 — children은 그대로 두고, '보이기/숨기기'만 틀이 담당한다.
function Collapsible({ label, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="tree-box leaf">
      <button className="chip on" onClick={() => setOpen((o) => !o)}>
        {open ? '▾' : '▸'} {label}
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  )
}

function ChildrenDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* 같은 Card 틀에, 매번 다른 내용을 '사이'에 넣는다 */}
      <Card title="📢 공지">
        <p style={{ margin: 0 }}>오늘은 리액트 합성을 배운다.</p>
      </Card>

      <Card title="🧮 미니 위젯">
        <div className="button-row">
          <button className="chip">버튼도</button>
          <button className="chip">여러 개도</button>
        </div>
      </Card>

      {/* 껍데기끼리 겹쳐 쓸 수도 있다 (Card 안에 Collapsible) */}
      <Card title="🗂️ 접히는 카드">
        <Collapsible label="세부 내용 열기/닫기">
          <p style={{ margin: 0 }}>이 문단은 Collapsible의 children이고, Collapsible은 Card의 children이다.</p>
        </Collapsible>
      </Card>
    </div>
  )
}

export default function Step2_3() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">2-3</span>
        <h2>children — 컴포넌트 합성</h2>
        <p>태그 '사이'에 넣은 내용은 props.children으로 전달된다. 이걸로 안을 모르는 '껍데기' 컴포넌트를 만든다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <code>{'<Card>내용</Card>'}</code>에서 <b>'내용'은 <code>props.children</code></b>으로 들어온다.
          컴포넌트는 <b>안에 뭐가 올지 몰라도</b> 감싸는 틀만 제공하면 된다 — 이것이 <b>합성(composition)</b>이다.
        </p>
      </div>

      {/* ① children이란 */}
      <h3 className="section-title">① 태그 '사이'는 children으로 온다</h3>
      <span className="learn-tag">📎 학습 포인트 · 속성으로 못 넘기던 'JSX 덩어리'를 여는/닫는 태그 사이에 넣으면 children이 된다</span>
      <p className="section-desc">
        <code>title="..."</code> 같은 <b>속성</b>은 값 하나를 넘길 때 좋다. 그런데 <b>문단·버튼·다른 컴포넌트가 통째로</b>
        들어가야 한다면? 여는 태그와 닫는 태그 <b>사이</b>에 그냥 쓰면 된다. 그게 <code>children</code>이다.
      </p>
      <div className="card">
        <div className="file-label">📄 Card — children을 받아 그 자리에 꽂는다</div>
        <pre className="concept-flow">{`function Card({ title, children }) {
  return (
    <div className="box">
      <h4>{title}</h4>
      {children}          {/* 👈 태그 사이 내용이 여기로 */}
    </div>
  )
}

// 쓰는 쪽 — 사이에 무엇을 넣든 그대로 Card 안에 들어간다
<Card title="공지">
  <p>오늘은 합성을 배운다.</p>   {/* 이 <p>가 children */}
</Card>`}</pre>
      </div>

      {/* ② 라이브 */}
      <h3 className="section-title">② 같은 틀, 다른 내용 (라이브)</h3>
      <span className="learn-tag">📎 학습 포인트 · Card 하나로 공지·위젯·중첩까지 — 틀은 재사용, 내용만 갈아끼운다</span>
      <div className="card">
        <div className="file-label">📄 ChildrenDemo — 껍데기 컴포넌트 재사용</div>
        <ChildrenDemo />
      </div>
      <p className="section-desc">
        <b>Card</b>는 자기 안에 <b>무엇이 올지 전혀 모른다</b>. 문단이든 버튼이든 또 다른 컴포넌트든, 넘겨준 걸
        <code> children</code> 자리에 그릴 뿐이다. 그래서 <b>틀은 한 번 만들고 내용만 바꿔</b> 무한히 재사용한다.
      </p>

      {/* ③ 왜 좋은가 */}
      <h3 className="section-title">③ 왜 합성인가 — prop drilling과 다르다</h3>
      <span className="learn-tag">📎 학습 포인트 · 데이터를 아래로 '전달'하는 대신, 내용을 '끼워 넣어' 껍데기와 알맹이를 분리한다</span>
      <ul className="section-list">
        <li>
          <b>레이아웃과 내용을 분리</b> — <code>Modal</code>·<code>Card</code>·<code>Layout</code> 같은 껍데기는
          "감싸는 법"만 알고, "무엇을 감싸는지"는 쓰는 쪽이 정한다.
        </li>
        <li>
          <b>중첩이 자유롭다</b> — 껍데기 안에 껍데기를 넣을 수 있다(위 데모의 Card 안 Collapsible).
        </li>
        <li>
          <b>props 지옥을 줄인다</b> — 중간 컴포넌트에 데이터를 줄줄이 넘기는 대신(→ 8-1 · prop drilling과 Context),
          필요한 JSX를 <b>바로 그 자리에 끼워</b> 넣는다.
        </li>
      </ul>
      <div className="concept">
        <p className="concept-lead">📖 정리</p>
        <ul className="section-list">
          <li><code>{'<A>내용</A>'}</code> → 내용은 <code>A</code> 안에서 <b><code>props.children</code></b>.</li>
          <li>여러 개 넣어도 된다 — children은 하나일 수도, 배열일 수도 있다.</li>
          <li>껍데기(틀)와 알맹이(내용)를 나누는 이 방식이 리액트의 <b>합성</b>이다.</li>
        </ul>
      </div>
    </section>
  )
}
