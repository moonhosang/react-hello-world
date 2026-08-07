// 개념 · 컴포넌트를 쪼개는 이유 (재사용 vs 구조화)
// 입문자는 "컴포넌트 = 재사용 단위"로만 배워, 한 파일에 여러 컴포넌트가 있으면 헷갈린다.
// 쪼개는 목적은 둘 — 재사용, 그리고 (재사용 안 해도) 역할별로 나눠 읽기 좋게 하는 '구조화'.

import TechTags from '../../components/TechTags.jsx'

// 2️⃣ 구조화 라이브 — 각 조각은 '한 번만' 쓰인다. 재사용이 아니라 '역할별 분리'가 목적.
function MiniHeader() {
  return <div className="tree-box" style={{ fontWeight: 700 }}>🧑‍💻 김코딩님의 프로필</div>
}
function MiniBio() {
  return <div className="tree-box leaf">📝 React로 화면을 만든다. 커피와 단축키를 좋아한다.</div>
}
function MiniPosts() {
  return (
    <div className="tree-box leaf">
      📚 최근 글
      <ul className="plain-list" style={{ margin: '4px 0 0' }}>
        <li>useEffect 정리</li>
        <li>Context 계약</li>
      </ul>
    </div>
  )
}
// 부모는 역할 조각을 '배치'만 한다 — 한눈에 구조가 읽힌다.
function MiniProfilePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MiniHeader />
      <MiniBio />
      <MiniPosts />
    </div>
  )
}

export default function WhySplitComponents({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🧩 개념</span>
        <h2>컴포넌트를 쪼개는 이유 — 재사용만이 아니다</h2>
        <p>쪼개는 목적은 둘 — 재사용, 그리고 재사용 안 해도 역할별로 나눠 읽기 좋게 하는 '구조화'.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          컴포넌트로 쪼개는 목적은 <b>재사용</b>과 <b>구조화(역할 분리·가독성)</b> 둘이다.
          한 파일에 컴포넌트가 여러 개면 <b>보통 구조화</b> 목적이다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          입문자가 자주 막히는 지점 — <b>"한 파일에 컴포넌트가 여러 개네? 재사용도 안 하는데 왜 나눴지?"</b>
          컴포넌트 = 재사용 단위로만 배워서다. 쪼개는 이유는 <b>둘</b>이다.
        </p>
      </div>

      {/* 1️⃣ 재사용 */}
      <h3 className="section-title">1️⃣ 재사용 (reuse) — 같은 걸 여러 곳에서</h3>
      <span className="learn-tag">📎 학습 포인트 · 정의는 하나, 사용은 여러 번 — 같은 UI를 값만 바꿔 재사용한다</span>
      <div className="card">
        <div className="file-label">📄 재사용 — Button 하나를 세 곳에서</div>
        <pre className="err-code">{`function Button({ children }) {          // 정의는 '한 번'
  return <button className="btn">{children}</button>
}

// 사용은 '여러 번' — 값(children)만 바꿔서
<Button>저장</Button>
<Button>취소</Button>
<Button>삭제</Button>`}</pre>
      </div>
      <p className="section-desc">
        위 <code>MenuItem</code>·<code>Badge</code>(캡슐화 레슨)가 이 경우다 — <b>같은 조각을 여러 번.</b> "정의 하나, 사용 여러 번."
      </p>

      {/* 2️⃣ 구조화 */}
      <h3 className="section-title">2️⃣ 구조화 — 역할별로 나눠 읽기 좋게 (재사용 X)</h3>
      <span className="learn-tag">📎 학습 포인트 · 한 화면을 역할·섹션 단위로 쪼개 각 함수가 '한 가지만' 하게 — 재사용 안 해도 나눈다</span>
      <p className="section-desc">
        큰 화면 하나를 <b>한 덩어리</b>로 쓰면 뭐가 뭔지 안 보인다. 역할별로 쪼개면(각 조각은 <b>한 번만</b> 쓰여도)
        구조가 한눈에 읽힌다. <b>재사용이 목적이 아니다.</b>
      </p>
      <div className="compare-grid">
        <div className="card compare-card old">
          <span className="compare-tag">😵 한 덩어리 — 안 읽힌다</span>
          <pre className="err-code">{`function ProfilePage() {
  return (
    <div>
      {/* 헤더 40줄 */}
      {/* 소개 30줄 */}
      {/* 게시물 목록 50줄 */}
    </div>
  )
}`}</pre>
          <p className="compare-hint">한 함수가 너무 많은 걸 한다 → 읽고 고치기 어렵다.</p>
        </div>
        <div className="card compare-card react">
          <span className="compare-tag">🧩 역할별로 쪼갬 — 읽힌다</span>
          <pre className="err-code">{`function ProfilePage() {     // 배치만 — 구조가 보인다
  return (
    <div>
      <ProfileHeader />
      <ProfileBio />
      <ProfilePosts />
    </div>
  )
}
function ProfileHeader() { … }   // 한 번만 쓰임 — 그래도 나눔
function ProfileBio()    { … }   //   (재사용이 아니라 '가독성')
function ProfilePosts()  { … }`}</pre>
          <p className="compare-hint">각 함수가 '한 가지만' → 읽기·고치기 쉽다.</p>
        </div>
      </div>
      <div className="card">
        <div className="file-label">🔬 라이브 — 위 오른쪽 구조를 실제로 (세 조각은 각자 한 번만 쓰임)</div>
        <MiniProfilePage />
        <p className="demo-desc" style={{ marginTop: 8 }}>
          <code>MiniHeader</code>·<code>MiniBio</code>·<code>MiniPosts</code>는 <b>각자 딱 한 번</b> 쓰였다 — 재사용이 아니라 <b>역할별로 나눠 읽기 좋게</b> 한 것이다.
        </p>
      </div>
      <p className="section-desc">
        💡 <b>한 파일에 여러 컴포넌트</b>가 있으면 대개 이 경우다. 구조화 안에는 <b>캡슐화 · 상태 격리(그 자식만 리렌더) · <code>map</code> 반복 단위 · 협업</b> 같은 세부 목적이 다 들어간다.
      </p>

      {/* 어디서 쓰느냐 — 업무 vs 라이브러리 */}
      <h3 className="section-title">🏢 어디서 쓰느냐로도 갈린다 — 업무 화면 vs 라이브러리</h3>
      <span className="learn-tag">📎 학습 포인트 · 업무 화면은 구조화, 라이브러리는 재사용이 주 목적 — 단, 양 끝이고 그 사이 스펙트럼</span>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr><th></th><th>업무 화면 컴포넌트</th><th>라이브러리 컴포넌트</th></tr>
          </thead>
          <tbody>
            <tr><td>예</td><td><code>OrderSummary</code>·<code>CheckoutForm</code></td><td><code>Button</code>·<code>Modal</code>·<code>DatePicker</code></td></tr>
            <tr><td>쓰이는 횟수</td><td>보통 이 화면에서 <b>한 번</b></td><td>여러 앱·화면에서 <b>N번</b></td></tr>
            <tr><td>도메인</td><td>특정 도메인에 묶임</td><td>도메인 무지·범용(props로 설정)</td></tr>
            <tr><td>주 목적</td><td><b>구조화</b></td><td><b>재사용</b></td></tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        <b>업무 화면은 구조화, 라이브러리는 재사용</b>이 주 목적이다 — 다만 <b>양 끝</b>이고 그 사이 스펙트럼이다(앱 안 공용 <code>components/</code>는 재사용 쪽으로 기움).
        그리고 <b>널리 쓰이는 라이브러리 컴포넌트일수록 props 계약이 엄격·문서화</b>된다 — <b>🤝 Context 계약</b>에서 본 그 '계약'과 같은 맥락이다.
      </p>

      <div className="try-it">
        <h4>💡 한 줄</h4>
        <ul>
          <li>쪼개는 이유 = <b>재사용</b>(같은 걸 여러 곳) 또는 <b>구조화</b>(역할별로 나눠 읽기 좋게).</li>
          <li>한 파일에 여러 컴포넌트 → 대개 <b>구조화</b>. "왜 나눴지?"의 답은 보통 "읽기 좋으라고".</li>
        </ul>
      </div>

      <TechTags
        items={[
          { label: '🧩 캡슐화 (속 감추기)', to: 1.5 },
          { label: '🤝 Context 계약', to: 7.25 },
          { label: '5-1 · 인스턴스 독립', to: 3.81 },
        ]}
        onGo={onGo}
      />
    </section>
  )
}
