// 개념 · 컴포넌트를 왜 나눌까 (재사용 vs 정리)
// 입문자는 "컴포넌트 = 재사용"으로만 배워, 한 파일에 여러 컴포넌트가 있으면 헷갈린다.
// 챕터 1이라 아직 state·map·Context를 모른다 → 어려운 말 없이, 쓰는 용어는 바로 옆에서 풀어 준다.

import TechTags from '../../components/TechTags.jsx'

// 정리(구조화) 라이브 — 각 조각은 '한 번만' 쓰인다. 재사용이 아니라 '역할별로 나눠 보기 좋게'가 목적.
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
        <li>오늘 배운 것</li>
        <li>내일 할 것</li>
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
        <h2>컴포넌트를 왜 나눌까? — 재사용 vs 정리</h2>
        <p>나누는 이유는 둘이다. ① 똑같은 걸 여러 번 쓰려고(재사용), ② 큰 걸 역할별로 나눠 보기 좋게 하려고(정리).</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          컴포넌트를 나누는 이유는 두 가지다 — <b>재사용</b>(같은 걸 여러 곳에)과 <b>정리</b>(역할별로 나눠 보기 좋게).
          한 파일에 컴포넌트가 여러 개면 보통 <b>정리</b> 목적이다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          입문자가 자주 막힌다 — <b>"한 파일에 컴포넌트가 여러 개네? 재사용도 안 하는데 왜 나눴지?"</b>
          컴포넌트를 <b>'재사용하는 것'</b>으로만 배워서다. 그런데 나누는 이유는 사실 <b>둘</b>이다.
        </p>
      </div>

      {/* 1️⃣ 재사용 */}
      <h3 className="section-title">1️⃣ 재사용 — 똑같은 걸 여러 군데서</h3>
      <span className="learn-tag">📎 학습 포인트 · 한 번 만들어 두고(정의) 여러 번 갖다 쓴다 — 값만 바꿔서</span>
      <div className="card">
        <div className="file-label">📄 재사용 — 버튼 하나를 세 곳에서</div>
        <pre className="err-code">{`function Button({ children }) {          // 버튼을 '한 번' 만든다
  return <button className="btn">{children}</button>
}

// 여러 번 갖다 쓴다 — 글자만 바꿔서
<Button>저장</Button>
<Button>취소</Button>
<Button>삭제</Button>`}</pre>
      </div>
      <p className="section-desc">
        앞 <b>캡슐화</b> 레슨의 <code>MenuItem</code>·<code>Badge</code>가 이 경우다 — <b>똑같은 조각을 여러 번.</b>
        한 번 만들어 두고 계속 갖다 쓴다. 이게 흔히 아는 "컴포넌트 = 재사용"이다.
      </p>

      {/* 2️⃣ 정리 */}
      <h3 className="section-title">2️⃣ 정리 — 역할별로 나눠 보기 좋게 (재사용 아님)</h3>
      <span className="learn-tag">📎 학습 포인트 · 재사용 안 해도, 큰 걸 역할별로 나누면 읽기·고치기 쉬워진다</span>
      <p className="section-desc">
        큰 화면 하나를 <b>한 함수에 통째로</b> 다 넣으면, 나중에 열어봤을 때 뭐가 뭔지 잘 안 보인다 —
        서랍 하나에 옷·양말·책을 다 쑤셔넣은 것과 같다. 그래서 <b>역할별로 나눈다</b>: 헤더 조각, 소개 조각, 글목록 조각.
        딱 봐도 구조가 보인다. 이렇게 <b>나눠서 정리하는 것</b>이 목적일 때가 아주 많다. 이때 조각들은 <b>딱 한 번씩만</b> 쓴다 — <b>재사용이 아니다.</b>
      </p>
      <div className="compare-grid">
        <div className="card compare-card old">
          <span className="compare-tag">😵 한 덩어리 — 안 읽힌다</span>
          <pre className="err-code">{`function ProfilePage() {
  return (
    <div>
      {/* 헤더 */}
      <div style={{ display: 'flex', gap: 12, padding: 16 }}>
        <img src={avatar} style={{ width: 56, borderRadius: 99 }} />
        <div>
          <h2 style={{ margin: 0 }}>김코딩</h2>
          <p style={{ margin: 0, color: '#888' }}>프론트엔드</p>
        </div>
        <button style={{ marginLeft: 'auto' }}>팔로우</button>
      </div>

      {/* 소개 */}
      <div style={{ padding: 16 }}>
        <h3>소개</h3>
        <p>React로 화면을 만든다. 커피와 단축키를 좋아한다.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="tag">React</span>
          <span className="tag">JS</span>
        </div>
      </div>

      {/* 글 목록 */}
      <div style={{ padding: 16 }}>
        <h3>최근 글</h3>
        <ul>
          <li>오늘 배운 것</li>
          <li>내일 할 것</li>
          <li>다음 주 목표</li>
        </ul>
      </div>
    </div>
  )
}`}</pre>
          <p className="compare-hint">한 함수에 헤더·소개·글목록이 다 들어 있다 → 스크롤해야 다 보이고, 뭐가 뭔지 한눈에 안 잡힌다.</p>
        </div>
        <div className="card compare-card react">
          <span className="compare-tag">🧩 역할별로 나눔 — 읽힌다</span>
          <pre className="err-code">{`function ProfilePage() {     // 위(부모)는 '배치'만 → 구조가 한눈에
  return (
    <div>
      {/* 헤더 */}
      <ProfileHeader />
      {/* 소개 */}
      <ProfileBio />
      {/* 글 목록 */}
      <ProfilePosts />
    </div>
  )
}

// 옮겨온 내용은 각자 자기 함수로 (한 번만 쓰여도 나눔 — 재사용이 아니라 '보기 좋게')
function ProfileHeader() {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 16 }}>
      <img src={avatar} style={{ width: 56, borderRadius: 99 }} />
      <div>
        <h2 style={{ margin: 0 }}>김코딩</h2>
        <p style={{ margin: 0, color: '#888' }}>프론트엔드</p>
      </div>
      <button style={{ marginLeft: 'auto' }}>팔로우</button>
    </div>
  )
}

function ProfileBio() {
  return (
    <div style={{ padding: 16 }}>
      <h3>소개</h3>
      <p>React로 화면을 만든다. 커피와 단축키를 좋아한다.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <span className="tag">React</span>
        <span className="tag">JS</span>
      </div>
    </div>
  )
}

function ProfilePosts() {
  return (
    <div style={{ padding: 16 }}>
      <h3>최근 글</h3>
      <ul>
        <li>오늘 배운 것</li>
        <li>내일 할 것</li>
        <li>다음 주 목표</li>
      </ul>
    </div>
  )
}`}</pre>
          <p className="compare-hint">부모(맨 위)는 '목차'처럼 구조만 보인다 → 필요한 조각만 아래에서 열어 본다.</p>
        </div>
      </div>
      <div className="card">
        <div className="file-label">🔬 라이브 — 위 오른쪽 구조를 실제로 (세 조각은 각자 한 번만 쓰임)</div>
        <MiniProfilePage />
        <p className="demo-desc" style={{ marginTop: 8 }}>
          <code>MiniHeader</code>·<code>MiniBio</code>·<code>MiniPosts</code>는 <b>각자 딱 한 번</b> 쓰였다 — 재사용하려고가 아니라 <b>역할별로 나눠 보기 좋게</b> 한 것이다.
        </p>
      </div>
      <p className="section-desc">
        💡 그래서 <b>한 파일에 컴포넌트가 여러 개</b>면 대개 이 경우다 — "왜 나눴지?"의 답은 보통 <b>"읽기 좋으라고"</b>.
        나눠 두면 다른 좋은 점도 딸려온다(한 조각만 고치면 되고, 여럿이 나눠 만들기 쉽다). 그건 뒤에서 하나씩 배운다.
      </p>

      {/* 어디서 나오나 — 우리 앱 vs 라이브러리 */}
      <h3 className="section-title">🏢 어디서 나오나 — 우리 앱 화면 vs '부품 모음'</h3>
      <span className="learn-tag">📎 학습 포인트 · 우리 화면은 '정리' 목적이 많고, 남이 만든 부품(라이브러리)은 '재사용' 목적이 많다</span>
      <p className="section-desc">
        먼저 <b>라이브러리(library)</b>란 — <b>남이 미리 만들어 놓아 여러 앱이 갖다 쓰는 '부품 모음'</b>이다.
        (예: 버튼·달력·팝업 창 같은 걸 모아 둔 것. 우리가 배우는 <b>React</b>도 그런 라이브러리다.)
      </p>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr><th></th><th>우리 앱 화면</th><th>부품 모음(라이브러리)</th></tr>
          </thead>
          <tbody>
            <tr><td>예</td><td>주문 요약 화면·회원가입 화면</td><td>버튼·달력·팝업 창</td></tr>
            <tr><td>몇 번 쓰나</td><td>보통 이 화면에서 <b>한 번</b></td><td>여러 앱에서 <b>아주 많이</b></td></tr>
            <tr><td>주로 왜 나누나</td><td><b>정리</b>(보기 좋게)</td><td><b>재사용</b>(여러 곳에)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        물론 <b>칼같이 둘로 갈리진 않는다</b> — 그 사이 어딘가일 때가 많다. (우리 앱 안에서도 버튼처럼 여러 곳에 쓰는 조각은 '재사용' 쪽이다.)
        그리고 <b>여러 앱이 갖다 쓰는 부품일수록, "어떻게 갖다 쓰는지"(어떤 값을 넘겨야 하는지) 사용법을 더 꼼꼼히 적어 둔다.</b>
        이 <b>'사용법 약속'</b>은 훨씬 뒤 <b>8단계 · Context 계약</b>에서 '계약'이라는 이름으로 다시 만난다.
      </p>

      <div className="try-it">
        <h4>💡 한 줄 정리</h4>
        <ul>
          <li>나누는 이유 = <b>재사용</b>(같은 걸 여러 곳) 또는 <b>정리</b>(역할별로 나눠 보기 좋게).</li>
          <li>한 파일에 컴포넌트가 여러 개 → 대개 <b>정리</b>. "왜 나눴지?"의 답은 보통 "읽기 좋으라고".</li>
        </ul>
      </div>

      <TechTags items={[{ label: '🧩 앞: 캡슐화 (속 감추기)', to: 1.5 }]} onGo={onGo} />
    </section>
  )
}
