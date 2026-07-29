// 개념 · 캡슐화 (겉은 컴포넌트, 속은 감춰진다)
// 리액트 컴포넌트만으로 구성한 하나의 메뉴로, '조립'과 '숨김'의 의미를 본다.

import AppMenu from './AppMenu.jsx'
import UserCardDemo from './UserCard.jsx'

export default function Encapsulation() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🧩 개념</span>
        <h2>캡슐화 — 겉은 컴포넌트, 속은 감춰진다</h2>
        <p>리액트 컴포넌트만으로 구성한 메뉴로, '조립'과 '숨김'의 의미를 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>컴포넌트는 내부 구현을 감추고 <code>&lt;이름 /&gt;</code>이라는 일관된 사용법만 드러낸다 — 이것이 캡슐화다.</p>
      </div>

      {/* 🧩 상태·동작·이벤트까지 감춘다 — UserCard */}
      <h3 className="section-title">🧩 속엔 구조뿐 아니라 '상태·동작·이벤트'까지 — UserCard</h3>
      <span className="learn-tag">📎 학습 포인트 · 카드가 내부 상태·구조를 감추고, 콜백 prop으로 "무슨 일이 생겼는지"만 값으로 알려 준다</span>
      <p className="section-desc">
        "그냥 CSS로 하면 되잖아"가 안 통하는 지점이 여기다. 아래 <code>UserCard</code>는 <b>겉으로는 <code>&lt;UserCard user=… /&gt;</code> 한 줄</b>이지만,
        속에 <b>아바타·이름·역할·상태·설명 + 내부 팔로우 상태(<code>useState</code>)</b>를 감추고 있다. 부모는 그 속을 <b>모른다</b> —
        대신 <b>콜백 prop</b>(<code>onUserNameClick</code>·<code>onActionClick</code>)으로 이벤트만 값으로 받는다.
      </p>
      <div className="card">
        <div className="file-label">📄 UserCard.jsx · 같은 카드를 Flex로 3개 (각자 독립)</div>
        <UserCardDemo />
      </div>
      <div className="card">
        <div className="file-label">📄 겉(부모) vs 속(카드) — 콜백으로 이벤트 제공</div>
        <pre className="err-code">{`// 겉(부모): 카드 속은 모른 채, 함수만 넘겨 둔다
<UserCard user={u}
  onUserNameClick={(id, name) => log(\`\${name}(\${id}) 클릭\`)}
  onActionClick={(action) => log(\`\${u.name} — \${action}\`)}
/>

// 속(카드 내부): 자기 버튼이 눌리면 그 함수를 '데이터와 함께' 부른다
<button onClick={() => onUserNameClick(user.id, user.name)}>{user.name}</button>
<p onClick={() => onActionClick('description')}>{user.desc}</p>   // 설명 클릭
<button onClick={() => { setFollowing(f=>!f); onActionClick('follow') }}>팔로우</button>`}</pre>
      </div>
      <ul className="section-list">
        <li><b>CSS로는 불가</b> — 스타일은 CSS로 재사용해도, <b>내부 상태(팔로우) · 이벤트 제공(콜백)</b>은 CSS가 못 한다. 이게 "컴포넌트여야 하는" 이유다.</li>
        <li><b>이벤트 제공자</b> — <code>&lt;button onClick={'{(e)=>…}'}&gt;</code>가 e를 넘기듯, UserCard도 <code>onActionClick(action)</code>으로 값을 넘긴다 (→ JS <b>J3 · 함수는 값이다</b>).</li>
        <li><b>인스턴스 독립</b> — 한 카드를 팔로우해도 나머지는 그대로. 정의는 하나(설계도), 쓸 때마다 <b>독립 인스턴스</b> (→ <b>5-1</b>).</li>
      </ul>

      <div className="concept">
        <p className="concept-lead">
          아래 메뉴에는 같은 <code>MenuItem</code>이 <b>20개</b> 쓰인다. 전부 <code>&lt;컴포넌트 /&gt;</code>의 조합으로 보이지만,
          각 조각의 <b>속</b>은 다르다 — <code>MenuItem</code>은 아이콘·라벨·<b>Badge</b>를 합친 <b>조립 컴포넌트</b>,
          구분선은 그냥 <b>HTML(&lt;hr&gt;)</b>이다. <code>MenuItem</code> 자신도 더 작은 조각(<code>Badge</code>)으로 조립돼 있다 —
          <b>조각의 조각.</b> 쓰는 쪽은 그 속을 <b>몰라도</b> 된다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 AppMenu.jsx · MenuItem.jsx · Badge.jsx</div>
        <AppMenu />
      </div>
      <p className="section-desc">
        할 일(초록)·뉴스(파랑) 뱃지는 <code>color</code> prop을 넘긴 것이고, 나머지(알림·메시지)는
        <b> 기본색(빨강)</b>이다. 같은 <code>Badge</code>인데 값만 바꿔 다르게 쓴다.
      </p>

      <div className="try-it">
        <h4>💡 초보에게 주는 의미</h4>
        <ul>
          <li>복잡하든 단순하든 똑같이 <code>&lt;이름 /&gt;</code>으로 쓴다 — <b>일관된 사용법.</b></li>
          <li>내부 구현(조립이든 HTML이든)은 <b>감춰진다</b> — <b>캡슐화.</b> 쓰는 쪽은 몰라도 된다.</li>
          <li><code>MenuItem</code> 속을 나중에 바꿔도 <b>쓰는 코드는 그대로</b> — 복잡한 UI를 단순한 조각의 조합으로 다룬다.</li>
        </ul>
      </div>

      <div className="try-it reflect">
        <h4>🔎 확인해보기 — 한 컴포넌트를 고치면, 그걸 쓰는 전부가 바뀐다</h4>
        <p>정의는 각각 <b>한 파일</b>인데, 고치면 그걸 쓰는 곳이 <b>전부</b> 바뀐다. 직접 해보자.</p>
        <ol>
          <li>
            <b>① MenuItem 배경</b>: <code>MenuItem.jsx</code>의 <code>&lt;div className="menu-item"&gt;</code>에{' '}
            <code>style=&#123;&#123; background: '#fff7ed' &#125;&#125;</code>를 추가 → <b>20개 항목</b>이 전부 바뀐다.
          </li>
          <li>
            <b>② Badge 기본색</b>: <code>Badge.jsx</code>의 기본값 <code>color = 'var(--red)'</code>를
            <code> '#7c3aed'</code>로 바꾸면 → <b>기본색을 쓰는 뱃지(알림·메시지)</b>가 전부 보라로 바뀐다.
            (할 일·뉴스는 각자 <code>color</code>를 넘겨서 그대로다)
          </li>
        </ol>
        <p className="reflect-q">
          💬 기본값 <b>한 곳</b>을 고치니 기본색 뱃지가 전부 바뀐다. 반대로 <b>특정 뱃지만</b> 바꾸려면 <code>color</code>를
          넘긴다 — <b>재사용 + 커스터마이즈</b>를 동시에. 이게 props의 힘이다.
        </p>
      </div>

      <h3 className="section-title">🤔 "순수 HTML도 CSS로 재사용되잖아?" — 이런 반박은?</h3>
      <span className="learn-tag">📎 학습 포인트 · CSS는 스타일만, 컴포넌트는 구조·데이터·동작까지 재사용한다</span>
      <p className="section-desc">
        절반은 맞다. <b>CSS는 '스타일(외형)'을 재사용</b>한다. (리액트에서도 스타일은 여전히 CSS로 재사용한다!)
        하지만 재사용의 <b>층위</b>가 다르다.
      </p>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th>무엇을 재사용?</th>
              <th>순수 HTML + CSS</th>
              <th>리액트 컴포넌트</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>스타일(외형)</td><td>✅ class로</td><td>✅ (여전히 class로)</td></tr>
            <tr><td>구조(마크업)</td><td>❌ 매번 복붙</td><td>✅ <code>&lt;MenuItem /&gt;</code> 한 줄</td></tr>
            <tr><td>인스턴스별 데이터</td><td>❌ 손으로 각각</td><td>✅ props로 주입</td></tr>
            <tr><td>동작/상태</td><td>❌ JS 따로 복붙</td><td>✅ 컴포넌트에 내장</td></tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        한 줄로: <b>CSS는 껍데기(스타일)를, 컴포넌트는 알맹이(구조·데이터·동작)까지 공유한다.</b>
        컴포넌트는 CSS를 <b>대체하는 게 아니라</b>, CSS가 <b>못 하는</b> 재사용을 더한다.
      </p>

      <h3 className="section-title">결정타 — "20개 항목 전부에 화살표 › 추가해줘"</h3>
      <span className="learn-tag">📎 학습 포인트 · 구조를 바꾸는 요청은 컴포넌트 한 곳만 고치면 전부 반영된다</span>
      <p className="section-desc">
        스타일이 아니라 <b>구조(요소)</b>를 바꾸는 요청이다. 여기서 둘이 확 갈린다.
      </p>
      <div className="compare-grid">
        <div className="card compare-card old">
          <span className="compare-tag">😵 순수 HTML — 20곳 복붙 수정</span>
          <pre className="err-code">{`<div class="menu-item">🏠 홈 <span>›</span></div>
<div class="menu-item">🔔 알림 <span>›</span></div>
<div class="menu-item">✉️ 메시지 <span>›</span></div>
... (17개 더 — 전부 손으로 › 추가)`}</pre>
          <p className="compare-hint">CSS는 '요소(구조)'를 못 만든다 → 20곳을 다 고쳐야 한다.</p>
        </div>
        <div className="card compare-card react">
          <span className="compare-tag">⚛️ 컴포넌트 — 1곳만 수정</span>
          <pre className="err-code">{`function MenuItem({ icon, label }) {
  return (
    <div className="menu-item">
      {icon} {label} <span>›</span>   // ← 여기 한 줄
    </div>
  )
}`}</pre>
          <p className="compare-hint">MenuItem 한 곳에 › 추가 → 20개 전부 반영.</p>
        </div>
      </div>
      <p className="section-desc">
        색(스타일)은 CSS로도 한 번에 바꿨지만, <b>화살표(구조)·항목별 라벨(데이터)·클릭(동작)</b>은 CSS가 못 한다.
        그래서 <b>컴포넌트</b>다.
      </p>
    </section>
  )
}
