// 🟨 JS 8강 · 패키지와 의존성 — npm 생태계 (도구·기초)
// npm install 한 줄이 데려오는 것들과, 외부 의존성이 왜 골치아픈지.
// (원래 11단계 useReducer의 '실전' 아래 인라인이던 걸 도구 레슨으로 분리했다.)

import TechTags from '../../../components/TechTags.jsx'

export default function JsDeps({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 8</span>
        <h2>패키지와 의존성 — npm 생태계</h2>
        <p><code>npm install</code> 한 줄이 데려오는 것들과, 외부 의존성이 왜 골치아픈지 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          라이브러리(패키지) 하나를 깔면 <b>딸린 의존성·버전·유지보수·번들·보안</b>이 통째로 따라온다.
          그래서 "필요할 때만, 값어치를 따져" 넣는다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          남이 만든 코드(<b>패키지=라이브러리</b>)를 <code>npm</code>으로 받아 쓰는 건 엄청 편하다 — <code>react</code>·<code>vite</code>도 패키지다.
          하지만 그건 <b>남의 코드에 기대는</b> 것이라 <b>대가</b>가 따른다. 그 대가가 무엇인지 알아야 "이 라이브러리를 넣을까?"를 제대로 판단한다.
        </p>
      </div>

      {/* ⚠️ 외부 의존성이 골치아픈 이유 — 구체적으로 (MUI 예시) */}
      <h3 className="section-title">⚠️ 외부 의존성이 왜 골치아픈가 — 구체적으로</h3>
      <span className="learn-tag">📎 학습 포인트 · 라이브러리 하나가 딸린 의존성·버전·유지보수·번들·보안을 통째로 데려온다</span>
      <p className="section-desc">
        "그냥 <code>npm install</code> 한 줄인데 뭐가 문제야?" 싶다. 예를 들어 유명한 UI 라이브러리 <b>MUI</b>(Material UI, <code>mui.com</code>) 하나를 깔면,
        겉으론 버튼·다이얼로그가 예쁘게 나오지만 뒤에서 이런 일들이 따라온다:
      </p>
      <div className="card">
        <div className="file-label">📦 MUI 하나 = 딸려오는 것들 (전이 의존성)</div>
        <pre className="err-code">{`내 앱
└─ @mui/material          ← 내가 깐 것 (한 줄)
   ├─ @emotion/react       ← 스타일 엔진 (자동으로 딸려옴)
   ├─ @emotion/styled
   ├─ @mui/system · @mui/utils · @mui/base …
   └─ (그 각각이 또 자기 의존성을 딸고 온다)
// npm install 한 줄 → node_modules에 수십~수백 개 패키지가 생긴다`}</pre>
      </div>
      <ul className="section-list">
        <li><b>① 전이 의존성 (내가 안 고른 것들)</b> — MUI 하나 깔았을 뿐인데 emotion 등 <b>남의 패키지 수십 개</b>가 함께 들어온다. node_modules가 수백 MB가 되고, 내 앱이 실제로 뭘 실행하는지 다 알기 어려워진다.</li>
        <li><b>② 버전 충돌 (peer dependency)</b> — MUI는 "React 18 이상"을 요구하고 다른 라이브러리는 "React 17만" 요구하면 <b>둘을 같이 못 쓴다</b>. React 메이저 버전을 올리고 싶어도 MUI가 아직 지원 안 하면 <b>업그레이드가 발이 묶인다</b>.</li>
        <li><b>③ 유지보수·수명 (남의 손에 달림)</b> — 그 라이브러리가 업데이트를 멈추거나 방향을 바꾸면 내 앱도 <b>같이 낡는다</b>. 새 React에서 경고·에러가 떠도 <b>내가 직접 못 고친다</b>.</li>
        <li><b>④ 번들 크기 (사용자 다운로드)</b> — 버튼 하나 예쁘게 쓰려고 큰 라이브러리를 통째로 → 사용자가 받을 JS가 커져 <b>첫 화면이 느려진다</b>.</li>
        <li><b>⑤ 잠금(lock-in)</b> — 코드 곳곳이 그 라이브러리 방식에 물들면, 나중에 <b>다른 걸로 바꾸기</b>가 큰 공사가 된다.</li>
        <li><b>⑥ 공급망 보안</b> — 내가 직접 안 쓴 <b>깊은 의존성</b> 하나에 취약점·악성코드가 섞이면 그게 <b>내 앱까지</b> 딸려 들어온다. (2016년 <code>left-pad</code>라는 11줄짜리 작은 패키지가 사라져 수많은 프로젝트 빌드가 멈춘 일도 있다.)</li>
      </ul>

      {/* 🔀 같은 패키지 다른 버전 — 버전 충돌 구체 예 */}
      <div className="card">
        <div className="file-label">🔀 아주 흔한 충돌 — 나와 라이브러리가 '같은 패키지의 다른 버전'을 원할 때</div>
        <pre className="err-code">{`내가 원함:   lodash@1.1   (내 코드가 이 버전 API에 맞춰 짜여 있음)
MUI가 원함:  lodash@3.1   (MUI 내부에서 이 버전을 씀)

// 둘의 API가 달라서 하나로 못 맞추면?
// ① 운 좋으면 — npm이 둘 다 설치한다
//    node_modules 안에 lodash 1.1과 3.1이 '동시에' 존재
//    → 번들에 같은 라이브러리가 두 벌 → 용량 2배
// ② 운 나쁘면 — 앱에 '딱 하나'만 있어야 하는 패키지(React 등)면
//    → 충돌로 안 돌거나 "두 개의 React" 같은 괴상한 에러`}</pre>
      </div>
      <p className="demo-desc" style={{ margin: '6px 0 0' }}>
        ※ 위 <code>lodash</code>·버전 번호는 <b>원리를 보여주려 지어낸 가상의 예</b>다 — MUI가 실제로 그 패키지·버전을 쓴다는 뜻이 아니다.
        중요한 건 <b>"같은 패키지의 다른 버전이 충돌한다"</b>는 구조뿐이다.
      </p>
      <p className="section-desc">
        내가 <code>lodash@1.1</code>을 쓰고 싶은데 MUI가 내부에서 <code>lodash@3.1</code>을 요구하는 상황이다(가상).
        npm이 버전별로 따로 담아 주기도 하지만(→ 같은 코드가 <b>두 벌</b> 들어가 번들이 커진다), React처럼
        <b> 앱에 딱 하나만 존재해야</b> 하는 패키지라면 <b>충돌로 터진다</b>. 문제는 이 버전을 <b>내가 고른 게 아니라</b>는 것 —
        <b> 남(MUI)의 내부 사정</b> 때문에 내 버전 선택이 묶인다. 라이브러리를 많이 깔수록 이런 <b>버전 줄다리기</b>가 곳곳에서 생긴다.
      </p>

      <div className="concept">
        <p className="concept-lead">🧱 그래서 "의존성 최소화" 철학</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          어떤 오픈소스·팀은 이 골칫거리를 피하려고 <b>외부 의존성을 극도로 아낀다</b> — 꼭 필요한 것만 넣고, 아니면 <b>직접 작게 만들어</b> 쓴다.
          상태 관리도 마찬가지라, 새 라이브러리 대신 리액트 <b>내장 <code>useReducer + Context</code></b>로 버틴다. <b>"덜 깔수록 덜 깨진다."</b>
        </p>
      </div>
      <p className="section-desc">
        ⚖️ 물론 <b>반대편 이야기</b>도 있다 — 잘 만든 라이브러리는 <b>바퀴를 다시 발명하지 않게</b> 해 시간을 크게 아끼고, 나보다 더 많이 검증됐다.
        그래서 "무조건 안 쓴다"가 아니라, <b>이 골칫거리를 감수할 만큼 값어치가 있나</b>를 그때그때 따져 넣는 게 핵심이다.
      </p>

      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li>패키지 하나 = <b>딸린 의존성·버전·번들·보안</b>을 통째로 들이는 일이다.</li>
          <li>그래서 <b>"정말 필요할 때, 값어치를 따져"</b> 넣는다. 미리 깔지 않는다.</li>
          <li>⚛️ React에서 이 판단이 가장 자주 나오는 곳이 <b>상태관리 라이브러리</b>(Redux Toolkit·Zustand) 도입 여부다 — 내장 <code>useReducer + Context</code>로 버틸 수 있으면 그게 제일 가볍다.</li>
        </ul>
      </div>
      <TechTags
        items={[
          { label: '⚛️ 11단계 · useReducer', to: 11 },
          { label: '⚛️ 8-2 · 전역 상태 (Context+reducer)', to: 7.2 },
        ]}
        onGo={onGo}
      />
    </section>
  )
}
