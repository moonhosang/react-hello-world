// ============================================================
// 1단계 · 컴포넌트 그 자체   (배우는 것: 컴포넌트, JSX, 재사용, 조립)
// ============================================================
// 리액트에서 화면은 "컴포넌트"라는 함수들의 조립이다.
//   - 컴포넌트 = JSX를 return 하는 함수
//   - 만든 컴포넌트는 <이름 /> 형태로, HTML 태그처럼 사용
//   - 작은 컴포넌트를 모아 큰 컴포넌트를 만든다 (조립 / composition)
//
// 이 강의는 5개 컴포넌트로 이뤄진다:
//   단순 3개(Greeting, Clock, Announcement) + 복잡 1개(WeatherWidget) + 조립 1개(Dashboard)
// 전부 "JSX를 return하는 함수"라는 본질은 똑같고, 표현만 다르다.

import Greeting from './Greeting.jsx'
import Clock from './Clock.jsx'
import Announcement from './Announcement.jsx'
import WeatherWidget from './WeatherWidget.jsx'
import Dashboard from './Dashboard.jsx'
import Practice from '../../components/Practice.jsx'
import PracticeCard from './practice.jsx'
import SolutionCard from './solution.jsx'

export default function Stage1() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">1단계</span>
        <h2>컴포넌트 그 자체</h2>
        <p>함수 하나가 화면 조각이 된다. 작은 조각을 모아 큰 화면을 조립한다.</p>
      </header>

      {/* 이 단계에서 배우는 '딱 하나' — 나머지 예시는 전부 이것의 변형이다 */}
      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          여기서 배우는 건 딱 하나 — <b>“컴포넌트가 뭔지”</b>다. 컴포넌트는 그저 <b>JSX를 return하는 함수</b>다.
          아래 예시(단순 3 · 복잡 1 · 조립 1)는 새로운 개념이 아니라, <b>이 하나를 다르게 보여줄 뿐</b>이다.
        </p>
      </div>

      {/* HTML 대비 핵심 장점: 재사용 */}
      <div className="premise">
        <span className="premise-formula">재사용</span>
        <p>
          순수 HTML이라면 같은 마크업을 <b>복사-붙여넣기</b> 해야 한다. 컴포넌트는
          <b> 한 번 정의하고 여러 곳에서 재사용</b>한다 — 파일 하나만 고치면 쓰인 곳이 전부 바뀐다.
        </p>
      </div>

      <h3 className="section-title">① 단순한 컴포넌트 3개</h3>
      <span className="learn-tag">📎 학습 포인트 · 컴포넌트의 본질 = JSX를 return하는 함수</span>
      <p className="section-desc">생김새는 달라도, 셋 다 "JSX를 return하는 함수"라는 점은 똑같다.</p>
      <div className="card-grid">
        <div className="card">
          <div className="file-label">📄 Greeting.jsx</div>
          <Greeting />
        </div>
        <div className="card">
          <div className="file-label">📄 Clock.jsx</div>
          <Clock />
        </div>
        <div className="card">
          <div className="file-label">📄 Announcement.jsx</div>
          <Announcement />
        </div>
      </div>

      <h3 className="section-title">② 복잡한 컴포넌트 1개</h3>
      <span className="learn-tag">📎 학습 포인트 · 내부가 커져도 '함수 하나'라는 본질은 그대로다</span>
      <p className="section-desc">props도 state도 없지만, 내부 구조는 얼마든지 커질 수 있다.</p>
      <div className="card">
        <div className="file-label">📄 WeatherWidget.jsx</div>
        <WeatherWidget />
      </div>

      <h3 className="section-title">③ 조립 + 재사용 — 리액트 vs 순수 HTML</h3>
      <span className="learn-tag">📎 학습 포인트 · 컴포넌트를 조립·재사용하는 이점 (한 곳만 고치면 전부 바뀐다)</span>
      <p className="section-desc">
        똑같은 화면(공지 <b>3개</b> + 사용자 칩 <b>2개</b> + 시계 + 날씨)을 두 방식으로 만들었다.
        이제 <b>공지 문구를 바꿔야 한다면</b>, 어느 쪽이 편할까?
      </p>
      <div className="compare-grid">
        <div className="card compare-card react">
          <div className="file-label">📄 Dashboard.jsx</div>
          <span className="compare-tag">⚛️ 리액트 (재사용)</span>
          <Dashboard />
          <p className="compare-hint">
            공지가 3개지만 정의는 <code>Announcement.jsx</code> <b>하나</b>뿐이다.
            문구를 바꾸려면 그 <b>한 곳</b>만 고치면 3개가 전부 바뀐다.
          </p>
        </div>
        <div className="card compare-card old">
          <div className="file-label">📄 public/vanilla/step1-components/dashboard.html</div>
          <span className="compare-tag">😵 순수 HTML (복붙)</span>
          <iframe
            className="vanilla-frame dashboard-frame"
            src="/vanilla/step1-components/dashboard.html"
            title="순수 HTML 대시보드"
          />
          <p className="compare-hint">
            공지 문구가 <b>3곳에 복붙</b>돼 있다. 문구를 바꾸려면 <b>3곳 모두</b> 손으로 고쳐야 하고,
            하나라도 빠뜨리면 화면이 어긋난다.
          </p>
        </div>
      </div>

      <Practice
        task="이모지 + 제목 + 설명이 나오는 '나만의 카드' 컴포넌트를 완성하자."
        hints={[
          'practice.jsx 파일을 열어 return 안을 고친다.',
          '이모지는 <div>🚀</div>, 제목은 <h3>, 설명은 <p>로.',
          'props는 아직 안 쓴다 — 값은 직접 적는다.',
        ]}
        practiceFile="step1-components/practice.jsx"
        solutionFile="step1-components/solution.jsx"
        solution={<SolutionCard />}
      >
        <PracticeCard />
      </Practice>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>컴포넌트 이름은 <b>대문자</b>로 시작해야 한다. (<code>Greeting</code> ⭕ / <code>greeting</code> ❌)</li>
          <li><code>return</code>은 <b>하나의 덩어리</b>만 돌려줄 수 있다. 여러 개는 <code>&lt;div&gt;</code>나 <code>&lt;&gt;...&lt;/&gt;</code>로 감싼다.</li>
          <li>JSX 안에서 자바스크립트 값은 <b>중괄호 <code>{'{ }'}</code></b> 로 넣는다. (<code>Clock.jsx</code> 참고)</li>
        </ul>
      </div>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><code>MyName.jsx</code>를 새로 만들어 여러분 이름을 보여주고, <code>Dashboard.jsx</code>에 끼워 넣어 보자.</li>
          <li><code>WeatherWidget.jsx</code>의 <code>temp</code>를 20으로 바꾸면 <code>mood</code> 문구가 어떻게 달라지나?</li>
        </ol>
      </div>

      <div className="try-it reflect">
        <h4>🔎 확인해보기 — 재사용을 직접 체감하기</h4>
        <p>공지 문구를 아래처럼 바꿔 보자. 단, <b>리액트</b>와 <b>순수 HTML</b> 두 곳 모두에서.</p>
        <p className="reflect-before">
          "📢 오늘은 리액트 컴포넌트를 배우는 날이다." → "📢 나는 리액트 컴포넌트를 배운다."
        </p>
        <ol>
          <li>
            <b>리액트</b>: <code>Announcement.jsx</code> <b>한 곳</b>만 고친다.
            (<code>Dashboard.jsx</code>가 이 컴포넌트를 3번 재사용하므로 공지 3개가 <b>한 번에</b> 바뀐다)
          </li>
          <li>
            <b>순수 HTML</b>: <code>public/vanilla/step1-components/dashboard.html</code>에서
            복붙된 <b>3곳</b>을 모두 손으로 고친다.
          </li>
        </ol>
        <p className="reflect-q">
          💬 <code>Dashboard.jsx</code>와 <code>dashboard.html</code>, 두 곳에서 각각 <b>몇 군데</b>를 고쳤나?
          어떤 차이를 느꼈는가? — 이게 바로 <b>컴포넌트(재사용)</b>의 힘이다.
        </p>
      </div>
    </section>
  )
}
