// 5-2 · 훅이 푸는 문제 — 훅 없이 vs 훅으로   (배우는 것: 훅의 두 가지 효과를 직접 체험)
// 5-1의 '도입 배경'에서 말한 문제들을, 이번엔 '훅 없이 하던 방식 ↔ 훅으로 하는 방식'을
// 나란히 놓고 효과를 직접 체험한다. (① 상태 로직 재사용 · ② 관련 코드끼리 묶기)

import ReuseLogicDemo from './ReuseLogicDemo.jsx'
import GroupCodeDemo from './GroupCodeDemo.jsx'

export default function StepHooksBenefits() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">5-2</span>
        <h2>훅이 푸는 문제 — 훅 없이 vs 훅으로</h2>
        <p>
          5-1에서 말한 문제들을, 이번엔 <b>훅 없이 하던 방식 ↔ 훅으로 하는 방식</b>을 나란히 놓고
          효과를 직접 체험한다.
        </p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          훅은 코드를 <b>'트리·생명주기'가 아니라 '로직 단위'</b>로 나눈다. ① 흩어진 <b>상태 로직을 커스텀 훅</b>으로
          모아 재사용하고, ② 흩어진 <b>관련 코드를 useEffect</b> 하나에 묶는다.
        </p>
      </div>

      {/* ── 섹션 ① 상태 로직 재사용 ─────────────────────────── */}
      <h3 className="section-title">① 상태 로직 재사용 — 사용자 불러오기(useFetchUser) · 복붙 ❌ vs 커스텀 훅 ✅</h3>
      <span className="learn-tag">📎 학습 포인트 · 같은 불러오기 로직은 컴포넌트마다 복붙하지 말고, 커스텀 훅 한 곳에 모아 재사용한다</span>
      <p className="section-desc">
        여러 컴포넌트가 <b>같은 상태 로직</b>을 필요로 할 때가 많다. 예를 들어 id로 '사용자 정보를 불러오는' 로직
        (<code>useState(user, loading)</code> + <code>useEffect</code>에서 fetch·정리)이 그렇다. 훅 없이는
        <code>ProfileCard</code>·<code>CommentAuthor</code>가 이 로직을 <b>각각 복붙</b>해야 했다.
        훅으로는 <b>커스텀 훅 <code>useFetchUser(id)</code> 한 곳</b>에 모으고 <b>각각 한 줄</b>로 재사용한다.
      </p>
      <p className="section-desc">
        아래 두 방식은 <b>화면 동작이 완전히 같다.</b> 서로 다른 사용자를 라이브로 불러와
        (⏳ 로딩 0.8초 → 👤 이름·역할) 보여 준다. 다른 건 <b>코드의 구조</b>뿐이다.
        아래 <b>코드 상자는 실제 파일(<code>ReuseNoHook.jsx</code>·<code>ReuseWithHook.jsx</code>) 내용 그대로</b>다.
      </p>
      <ReuseLogicDemo />
      <p className="section-desc">
        같은 불러오기 로직이지만, 훅으로 하면 <b>로직이 한 곳</b>에 있어 고칠 때도 한 곳만 고치면 된다. 게다가
        커스텀 훅은 <b>트리 구조를 바꾸지 않는다</b> — 예전 <b>HOC·render props</b> 패턴처럼 래퍼 컴포넌트를
        겹겹이 끼울 필요가 없다.
      </p>

      {/* ── 섹션 ② 관련 코드끼리 묶기 ───────────────────────── */}
      <h3 className="section-title">② 관련 코드 묶기 — 카운트다운(useCountdown) · 생명주기로 흩어짐 ❌ vs 한 곳 ✅</h3>
      <span className="learn-tag">📎 학습 포인트 · 클래스는 생명주기 '시점'으로 흩어지고, 훅은 '서로 관련된 코드끼리' 한 함수에 모인다</span>
      <p className="section-desc">
        카운트다운 타이머를 만들면 <b>시작(setInterval)</b>과 <b>정리(clearInterval)</b>는 짝이다. 그런데
        클래스에서는 시작을 <code>componentDidMount</code>, 정리를 <code>componentWillUnmount</code>에 적어
        <b> 서로 다른 메서드로 흩어졌다.</b> 훅으로는 커스텀 훅 <code>useCountdown</code> 하나에
        <b> 시작 + 정리(return)</b>가 <b>같이</b> 있다.
      </p>
      <p className="section-desc">
        아래 오른쪽 데모에서 <b>언마운트 토글</b>을 눌러 보면, 시작 바로 옆에 적어 둔 <b>정리</b>가
        실제로 도는 걸 로그로 확인할 수 있다. 아래 <b>코드 상자는 실제 파일(<code>CountdownClass.jsx</code>·<code>CountdownHook.jsx</code>) 내용 그대로</b>다.
      </p>
      <GroupCodeDemo />
      <p className="section-desc">
        클래스는 코드를 <b>'생명주기 시점'</b> 기준으로 갈라 놓아, 관련 있는 로직이 멀리 떨어졌다.
        훅은 반대로 <b>'서로 관련된 코드끼리'(시작+정리)</b>를 한 함수에 모으고, 게다가 <b>재사용</b>도 된다.
        그래서 읽기도, 옮기기도 쉽다.
      </p>

      {/* ── 정리 ───────────────────────────────────────────── */}
      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li><b>상태 로직 재사용 = 커스텀 훅</b> — 흩어진 불러오기 로직을 <code>useFetchUser</code> 한 곳에 모아 재사용한다. 트리 구조는 그대로.</li>
          <li><b>관련 코드 묶기 = useEffect</b> — <code>useCountdown</code>처럼 시작과 정리를 한 함수에 모은다. 생명주기로 흩어지지 않는다.</li>
          <li>공통점 — 둘 다 코드를 <b>'트리·생명주기'가 아니라 '로직 단위'</b>로 나눈다.</li>
          <li>
            더 자세히는 뒤에서 배운다 — <code>useEffect</code>는 <b>9단계</b>, <b>커스텀 훅</b>은 <b>13단계</b>.
            여기서는 '훅이 무엇을 풀어 주는지'만 체험하면 된다.
          </li>
        </ul>
      </div>
    </section>
  )
}
