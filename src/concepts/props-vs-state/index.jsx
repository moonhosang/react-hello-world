// ============================================================
// 개념 · props vs state   (3~4단계 사이)
// ============================================================
// 지금까지 두 가지 데이터를 봤다: props(2단계)와 state(3단계).
// 둘 다 "컴포넌트가 화면에 쓰는 데이터"지만, 출처와 '누가 바꾸는가'가 다르다.

import LabeledCounter from './LabeledCounter.jsx'
import OwnershipDemo from './OwnershipDemo.jsx'

export default function PropsVsState() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🔀 개념</span>
        <h2>props vs state — 뭐가 다를까?</h2>
        <p>2단계 props와 3단계 state. 헷갈리기 쉬운 둘의 차이를 정리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>props는 밖(부모)에서 와서 읽기만 하고, state는 안(자기 자신)에서 가지며 스스로 바꾼다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          둘 다 <b>컴포넌트가 화면에 쓰는 데이터</b>다. 차이는 딱 두 가지 — <b>어디서 오는가</b>,{' '}
          <b>누가 바꾸는가</b>.
        </p>
        <ul className="concept-terms">
          <li><b>props</b> — <b>밖(부모)</b>에서 온다. 자식은 <b>읽기만</b> 한다.</li>
          <li><b>state</b> — <b>안(자기 자신)</b>에서 가진다. <b>스스로 바꾼다</b> (setState).</li>
        </ul>
      </div>

      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th></th>
              <th>props</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>어디서 오나</td><td>부모가 준다 (밖에서)</td><td>컴포넌트가 가진다 (안에서)</td></tr>
            <tr><td>값 변경</td><td>읽기 전용 · 불변</td><td>가변 · set 함수로 바꿈 (비동기로 갱신될 수 있음)</td></tr>
            <tr><td>누가 바꾸나</td><td>자식은 못 바꾼다</td><td>자기가 바꾼다 (setState)</td></tr>
            <tr><td>밖에서 접근</td><td>자식이 받아서 접근</td><td>비공개 — 밖에서는 접근 불가</td></tr>
            <tr><td>주 용도</td><td>컴포넌트 간 통신 · 재사용</td><td>동적 변화를 화면에 반영</td></tr>
            <tr><td>비유</td><td>함수의 <b>인자</b></td><td>함수 안의 <b>기억되는 변수</b></td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="section-title">각각의 특징</h3>
      <span className="learn-tag">📎 학습 포인트 · props는 읽기 전용·한 방향, state는 set 함수로만 바꾼다</span>
      <div className="two-col">
        <div className="card">
          <h4 className="feat-title">📥 props의 특징</h4>
          <ul className="feat-list">
            <li><b>🔒 읽기 전용(read-only)</b> — 자식은 받은 props를 <b>바꾸지 못한다.</b> <code>props.name = '...'</code> ❌</li>
            <li><b>⬇️ 한 방향</b> — 부모 → 자식으로만 흐른다.</li>
            <li><b>🔁 부모가 바꾸면</b> 자식도 다시 렌더된다.</li>
            <li><b>📦 무엇이든</b> — 문자열·숫자·불리언·배열·객체·함수·JSX 다 넘길 수 있다.</li>
          </ul>
        </div>
        <div className="card">
          <h4 className="feat-title">🧠 state의 특징</h4>
          <ul className="feat-list">
            <li><b>✋ 소유</b> — 그 컴포넌트가 가진 <b>자기 데이터</b>다.</li>
            <li><b>🔧 set 함수로만</b> — <code>setCount(...)</code> ⭕ / <code>count = ...</code> ❌</li>
            <li><b>🔁 바뀌면</b> 그 컴포넌트가 다시 렌더된다.</li>
            <li><b>💾 유지</b> — 다시 렌더돼도 값은 기억된다.</li>
          </ul>
        </div>
      </div>

      <div className="try-it warn-box">
        <h4>❌ 흔한 실수</h4>
        <ul>
          <li><b>props를 직접 바꾸려 함</b> → 안 된다. 바뀌어야 하는 값이면 <b>state</b>로 둔다.</li>
          <li><b>state를 <code>=</code>로 직접 바꿈</b> → 화면이 안 바뀐다. 반드시 <b>set 함수</b>로 바꾼다.</li>
        </ul>
      </div>

      <h3 className="section-title">한 컴포넌트에 둘 다 — 눈으로 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · 같은 컴포넌트라도 props는 부모가 고정, state는 각자 따로 센다</span>
      <p className="section-desc">
        아래 <code>LabeledCounter</code>는 <b>label</b>을 props로 받고, <b>count</b>를 state로 가진다.
        label은 부모가 정해줘서 못 바꾸고(읽기 전용), count는 버튼으로 직접 바꾼다.
      </p>
      <div className="card-grid">
        <div className="card">
          <div className="file-label">📄 LabeledCounter.jsx · label="🍎 사과"</div>
          <LabeledCounter label="🍎 사과" />
        </div>
        <div className="card">
          <div className="file-label">📄 LabeledCounter.jsx · label="🍌 바나나"</div>
          <LabeledCounter label="🍌 바나나" />
        </div>
      </div>
      <p className="section-desc">
        두 카드는 <b>같은 컴포넌트</b>다. <b>label(props)</b>은 부모가 준 대로 고정,
        <b> count(state)</b>는 각 카드가 <b>따로</b> 센다.
      </p>

      {/* α) state를 가진다는 것의 '의미와 함의' — 왜 이해가 필요한가 */}
      <h3 className="section-title">🧠 "컴포넌트가 state를 가진다"는 건 무슨 뜻일까 — 의미와 함의</h3>
      <span className="learn-tag">📎 학습 포인트 · state를 갖는 순간, 컴포넌트는 자기 데이터를 '소유'하고 스스로 바꾸는 살아있는 조각이 된다</span>
      <p className="section-desc">
        props만 받던 컴포넌트는 <b>부모가 준 값을 그리기만</b> 하는 '고정된 그림'이었다. 그런데 <code>useState</code>로
        state를 갖는 순간, 그 컴포넌트는 <b>자기 데이터를 소유하고, 스스로 바꾸며, 시간에 따라 변하는</b> 조각이 된다.
        여기엔 네 가지가 따라온다:
      </p>
      <ul className="section-list">
        <li><b>① 기억(memory)</b> — 다시 그려져도 값을 잃지 않고 <b>유지</b>된다. 그래서 카운터가 숫자를 '기억'한다. (렌더와 렌더 사이에 살아남는다)</li>
        <li><b>② 소유·책임(ownership)</b> — 그 데이터의 <b>주인이 그 컴포넌트</b>다. 밖(부모)에서 <b>직접 못 바꾼다</b>(비공개). 밖에서 바꾸게 하려면, <b>주인이 스스로 '바꾸는 통로'(콜백)를 만들어 내줘야</b> 한다 — 주인이 그 기능을 열어 주지 않으면 <b>아무도 못 바꾼다</b>.</li>
        <li><b>③ 독립(instance)</b> — 같은 컴포넌트를 여러 번 써도 state는 <b>각자 따로</b>다. (위 🍎·🍌 카운터가 서로 다른 숫자 — 🧩 캡슐화의 '인스턴스 독립'과 같은 이야기)</li>
        <li><b>④ 변화 → 리렌더</b> — state가 바뀌면 그 컴포넌트(와 자식)가 <b>다시 그려진다</b>. 그래서 화면이 클릭·입력에 <b>반응</b>한다. (0단계 <code>UI = f(state)</code>)</li>
      </ul>
      <div className="concept">
        <p className="concept-lead" style={{ margin: 0 }}>
          📌 <b>왜 state를 주나(의도)</b>: 고정 값(props)만으론 못 담는 <b>'변하는 것'</b>(클릭 수·입력값·열림/닫힘)을 담기 위해서다.
          대신 <b>소유하면 책임도 진다</b> — <b>이 데이터를 누가 바꾸고, 누가 봐야 하는지</b>를 정해야 한다. 그게 바로 다음 질문이다.
        </p>
      </div>

      {/* β) 누가 소유하나 — 지역 vs 끌어올리기 (언제 어느 걸) */}
      <h3 className="section-title">🏠 그럼 이 state는 '누가' 가질까 — 소유와 끌어올리기</h3>
      <span className="learn-tag">📎 학습 포인트 · 한 컴포넌트만 쓰면 지역 state, 여러 형제가 맞춰야 하면 공통 부모로 끌어올린다</span>
      <p className="section-desc">
        state를 가진다는 건 <b>그 데이터의 주인이 된다</b>는 뜻이다. 그럼 <b>누가 주인이어야 할까?</b>
        답은 <b>"누가 그 데이터를 쓰는가"</b>로 갈린다:
      </p>
      <ul className="section-list">
        <li><b>한 컴포넌트만</b> 쓰는 값 → 그 컴포넌트가 <b>지역(local) state</b>로 가진다. (예: 카드 하나의 '펼침/접힘')</li>
        <li><b>여러 형제가 같이 보거나 맞춰야</b> 하는 값 → 공통 <b>부모</b>가 state를 갖고, 자식엔 <b>props로 내리고</b> 클릭은 <b>콜백으로 받는다</b>. 이것을 <b>상태 끌어올리기(lifting state up)</b>라 한다.</li>
      </ul>
      <p className="section-desc">
        아래에서 <b>같은 탭 UI</b>를 두 방식으로 만들어 비교한다 — 목표는 <b>"한 번에 하나만 선택"</b>이다. 모드를 바꿔 보라.
      </p>
      <div className="card">
        <div className="file-label">📄 OwnershipDemo.jsx — ❌ 자식 소유 vs ✅ 부모 소유(끌어올리기)</div>
        <OwnershipDemo />
      </div>
      <div className="two-col">
        <div className="card">
          <h4 className="feat-title">❌ 자식이 각자 소유</h4>
          <pre className="err-code" style={{ margin: 0 }}>{`function Tab({ label }) {
  // 각 탭이 자기 active를 따로 가짐
  const [active, setActive] = useState(false)
  return <button className={active ? 'on' : ''}
    onClick={() => setActive(a => !a)}>{label}</button>
}`}</pre>
          <p className="compare-hint">진실이 여러 벌 → 형제끼리 몰라 여러 개가 켜지고, 부모도 선택을 모른다.</p>
        </div>
        <div className="card">
          <h4 className="feat-title">✅ 부모가 소유 (끌어올리기)</h4>
          <pre className="err-code" style={{ margin: 0 }}>{`// 부모: '진실'은 여기 하나뿐
const [selectedId, setSelectedId] = useState(0)

<Tab active={selectedId === id}           // props로 내림
     onSelect={() => setSelectedId(id)} /> // 콜백으로 받음`}</pre>
          <p className="compare-hint">진실(selectedId)이 한 곳 → 항상 하나만, 부모도 지금 선택을 안다.</p>
        </div>
      </div>
      <p className="section-desc">
        핵심은 <b>'하나의 진실(single source of truth)'</b>을 <b>한 곳에만</b> 두는 것이다. 여럿이 공유해야 하면 그 '한 곳'은 <b>공통 부모</b>다.
        자식이 각자 복제하면 <b>서로 어긋난다</b>(위 ❌). — 콜백으로 신호 보내기는 <b>2-2</b>·<b>J3</b>에서 봤고,
        실전 끌어올리기는 <b>6단계 리스트</b>, 멀리 있는 자식까지 내려보내는 건 <b>8단계 Context</b>에서 이어진다.
      </p>

      {/* 정리 — 두 단계 판단 */}
      <div className="try-it">
        <h4>🧭 정리 — 두 단계로 판단한다</h4>
        <ul>
          <li><b>판단 ① 이 데이터, props냐 state냐?</b> — 밖에서 받아 오고 <b>안 바꾸면 props</b>, 스스로 <b>바꾸며 변하면 state</b>.</li>
          <li><b>판단 ② state라면, 누가 소유하나?</b> — <b>한 컴포넌트만</b> 쓰면 그 컴포넌트(지역), <b>여러 형제가 맞춰야</b> 하면 공통 <b>부모</b>(끌어올리기).</li>
          <li>공통점: props든 state든 <b>무엇이 바뀌든 화면은 다시 그려진다.</b> (0단계 <code>UI = f(State)</code> — 정확히는 <code>UI = f(props, state)</code>)</li>
        </ul>
      </div>
    </section>
  )
}
