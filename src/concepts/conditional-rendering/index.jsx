// 개념 · 조건부 렌더링 3패턴 + 함정   (배우는 것: 화면을 '조건에 따라' 다르게 그리는 법)
// 리액트엔 "조건부 렌더링"이라는 특별 문법이 없다 — 그냥 자바스크립트(삼항·&&·if)로 '무엇을 반환할지'를 고른다.
// 여기서는 세 가지 패턴을 한곳에 모으고, 입문자가 반드시 밟는 && 0 함정을 라이브로 실증한다.

import { useState } from 'react'

// 🟢 라이브 데모 — 같은 상태를 세 패턴으로 각각 그려 본다.
function PatternDemo() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => setLoggedIn((v) => !v)}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <button className="chip" onClick={() => setCount((c) => c + 1)}>알림 +1</button>
        <button className="chip" onClick={() => setCount(0)}>알림 0</button>
      </div>

      <ul className="section-list" style={{ marginTop: 10 }}>
        {/* 패턴 1 · 삼항 — A 아니면 B, 둘 중 하나 */}
        <li>
          <b>삼항</b> → {isLoggedIn ? <span>👋 환영합니다!</span> : <span>🔒 로그인이 필요합니다.</span>}
        </li>
        {/* 패턴 2 · && — '있을 때만' 보여주기 (조건이 참이면 오른쪽을 그림) */}
        <li>
          <b>&& (있을 때만)</b> → {isLoggedIn && <span>🟢 접속 중</span>}
          {!isLoggedIn && <span style={{ color: 'var(--muted)' }}>(로그인하면 표시)</span>}
        </li>
        {/* 패턴 3 · 미리 변수에 담기 — 복잡하면 위에서 계산해 꽂는다 */}
        <li>
          <b>변수에 담기</b> → {count > 0 ? <b>🔔 알림 {count}개</b> : <span style={{ color: 'var(--muted)' }}>알림 없음</span>}
        </li>
      </ul>
    </div>
  )
}

// 🔴 라이브 함정 데모 — {count && ...}가 count===0일 때 화면에 '0'을 찍는다.
function ZeroTrapDemo() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div className="button-row">
        <button className="chip" onClick={() => setCount((c) => c + 1)}>+1</button>
        <button className="chip on" onClick={() => setCount(0)}>0으로</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        <div>
          ❌ <code>{'{count && <b>🔔 {count}</b>}'}</code> →{' '}
          {/* count가 0이면 && 는 '0' 자체를 반환하고, 리액트는 숫자 0을 화면에 그린다! */}
          <span style={{ color: 'crimson' }}>{count && <b>🔔 {count}</b>}</span>
          <div className="demo-desc" style={{ margin: '2px 0 0' }}>
            👆 <b>0으로</b>를 눌러 보라. 아무것도 안 나와야 할 자리에 <b>숫자 0</b>이 그려진다.
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          ✅ <code>{'{count > 0 && <b>🔔 {count}</b>}'}</code> →{' '}
          <span style={{ color: 'var(--brand)' }}>{count > 0 && <b>🔔 {count}</b>}</span>
          <div className="demo-desc" style={{ margin: '2px 0 0' }}>
            조건을 <b>불리언</b>(<code>count &gt; 0</code>)으로 만들면 0일 때 깔끔히 사라진다.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConditionalRendering() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">개념</span>
        <h2>조건부 렌더링 3패턴 + 함정</h2>
        <p>화면을 조건에 따라 다르게 그리는 법. 리액트엔 특별 문법이 없다 — 그냥 자바스크립트로 '무엇을 반환할지' 고른다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>삼항(A ? B : C)</b>은 <b>둘 중 하나</b>, <b>&&</b>는 <b>있을 때만</b>. 그리고
          <b> {'{숫자 && ...}'}는 0을 화면에 찍는 함정</b>이 있으니 조건은 <b>불리언</b>으로 만든다.
        </p>
      </div>

      {/* ① 세 패턴 */}
      <h3 className="section-title">① 세 가지 패턴 (라이브)</h3>
      <span className="learn-tag">📎 학습 포인트 · 삼항 = 둘 중 하나, && = 있을 때만, 복잡하면 변수에 담아 꽂는다</span>
      <div className="card">
        <div className="file-label">📄 PatternDemo — 같은 상태를 세 패턴으로</div>
        <PatternDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 세 패턴 코드</div>
        <pre className="concept-flow">{`// 1) 삼항 — 둘 중 하나 (있거나 / 없거나 둘 다 그릴 때)
{isLoggedIn ? <Welcome /> : <LoginForm />}

// 2) && — '있을 때만' (참이면 오른쪽을 그리고, 거짓이면 아무것도 안 그림)
{isLoggedIn && <span>🟢 접속 중</span>}

// 3) 미리 변수에 담기 — 조건이 복잡하면 위에서 계산해 꽂는다
let badge = null
if (count > 0) badge = <b>🔔 {count}</b>
return <div>{badge}</div>`}</pre>
      </div>
      <ul className="section-list">
        <li><b>삼항</b> <code>조건 ? A : B</code> — 참이면 A, 거짓이면 B. <b>둘 다 그릴 게 있을 때.</b></li>
        <li><b>&&</b> <code>조건 && A</code> — 참이면 A, 거짓이면 <b>아무것도 안 그림</b>(false·null은 화면에 안 나온다). <b>없을 땐 안 보여도 될 때.</b></li>
        <li><b>변수에 담기</b> — <code>if</code>는 JSX <b>중괄호 안엔 못 넣지만</b>(규칙 4), 위에서 변수에 담아 꽂으면 된다.</li>
      </ul>

      {/* ② && 0 함정 */}
      <h3 className="section-title">② ⚠️ 함정 — {'{숫자 && ...}'}는 0을 화면에 찍는다</h3>
      <span className="learn-tag">📎 학습 포인트 · &&의 왼쪽이 0이면 '0'이 그대로 그려진다 — 조건은 반드시 불리언으로</span>
      <p className="section-desc">
        <code>&&</code>는 왼쪽이 <b>거짓 같은 값(falsy)</b>이면 <b>왼쪽 값 자체를 반환</b>한다. 그런데
        <code> 0</code>은 falsy이면서 <b>리액트가 화면에 그리는 값</b>이다(<code>false</code>·<code>null</code>·<code>undefined</code>는 안 그림).
        그래서 <code>{'{items.length && <List/>}'}</code>에서 목록이 비면 화면에 <b>0</b>이 덩그러니 남는다.
      </p>
      <div className="card">
        <div className="file-label">📄 ZeroTrapDemo — '0으로'를 눌러 직접 확인하라</div>
        <ZeroTrapDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 고치는 3가지 방법</div>
        <pre className="concept-flow">{`// ❌ 0이 그대로 그려진다
{count && <Badge n={count} />}
{items.length && <List items={items} />}

// ✅ 1) 불리언으로 만든다 (가장 흔함)
{count > 0 && <Badge n={count} />}
{items.length > 0 && <List items={items} />}

// ✅ 2) 삼항으로 없을 때를 명시
{count ? <Badge n={count} /> : null}

// ✅ 3) !! 로 불리언 변환
{!!count && <Badge n={count} />}`}</pre>
      </div>
      <p className="section-desc">
        규칙으로 외우자 — <b>&& 왼쪽엔 항상 불리언을 둔다.</b> 숫자·문자열 길이를 그대로 쓰지 않는다.
      </p>

      <div className="concept">
        <p className="concept-lead">📖 정리</p>
        <ul className="section-list">
          <li>조건부 렌더링 = <b>그냥 JS로 무엇을 반환할지 고르는 것.</b> 새 문법이 아니다.</li>
          <li><b>둘 중 하나 → 삼항</b>, <b>있을 때만 → &&</b>, <b>복잡하면 → 변수에 담기.</b></li>
          <li><b>&& 왼쪽은 불리언</b>으로. 숫자 0 함정을 피한다.</li>
        </ul>
      </div>
    </section>
  )
}
