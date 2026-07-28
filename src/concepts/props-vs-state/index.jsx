// ============================================================
// 개념 · props vs state   (3~4단계 사이)
// ============================================================
// 지금까지 두 가지 데이터를 봤다: props(2단계)와 state(3단계).
// 둘 다 "컴포넌트가 화면에 쓰는 데이터"지만, 출처와 '누가 바꾸는가'가 다르다.

import LabeledCounter from './LabeledCounter.jsx'

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

      <div className="try-it">
        <h4>🧭 언제 뭘 쓸까? (판단 규칙)</h4>
        <ul>
          <li><b>밖에서 받아 오고</b> 컴포넌트가 <b>안 바꾸면</b> → <b>props</b></li>
          <li>컴포넌트가 <b>직접 바꾸며</b> 시간에 따라 변하면 → <b>state</b></li>
          <li>
            공통점: 둘 중 <b>무엇이 바뀌든 화면은 다시 그려진다.</b>
            (0단계의 <code>UI = f(State)</code> — 정확히는 <code>UI = f(props, state)</code>)
          </li>
        </ul>
      </div>
    </section>
  )
}
