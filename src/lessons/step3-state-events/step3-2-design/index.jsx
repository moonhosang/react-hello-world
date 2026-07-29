// 3-2 · 상태 설계·함정 (여러 상태 vs 객체, 연속 setState)
// 상태를 어떻게 나눌지, 그리고 초보가 자주 빠지는 함정을 본다.

import MultiState from './MultiState.jsx'
import ObjectState from './ObjectState.jsx'
import ArrayMutationDemo from './ArrayMutationDemo.jsx'
import ObjectMutationDemo from './ObjectMutationDemo.jsx'
import TrapCounter, { SetStateStoreViz } from './TrapCounter.jsx'

export default function Step3_2() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">3-2</span>
        <h2>상태 설계 · 함정</h2>
        <p>상태를 여러 개로 둘지 객체로 묶을지, 그리고 연속 setState 함정을 익힌다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          상태는 어떻게 나누느냐가 설계의 핵심이고, set에 값을 넣느냐 함수를 넣느냐에 따라 결과가 달라진다.
        </p>
      </div>

      <h3 className="section-title">여러 개의 상태 vs 객체 하나</h3>
      <span className="learn-tag">📎 학습 포인트 · 독립적인 값은 각각 useState, 함께 움직이는 값은 객체 하나로 묶는다</span>
      <p className="section-desc">
        한 컴포넌트는 상태를 <b>여러 개</b> 가질 수 있다. 서로 관련 있는 값이면 <b>객체 하나</b>로 묶어도 된다.
      </p>
      <div className="two-col">
        <div className="card">
          <div className="file-label">📄 MultiState.jsx · 여러 상태 (독립적인 값)</div>
          <MultiState />
        </div>
        <div className="card">
          <div className="file-label">📄 ObjectState.jsx · 객체 하나 (관련 있는 값)</div>
          <ObjectState />
        </div>
      </div>
      <p className="section-desc">
        <b>독립적인 값</b>이면 각각 <code>useState</code>가 간단하고, <b>함께 움직이는 관련 값</b>이면 객체 하나로 묶는다.
      </p>

      <h3 className="section-title">⚠️ 상태의 규칙 — 불변성 (immutability)</h3>
      <span className="learn-tag">📎 학습 포인트 · 상태는 읽기 전용 · set으로만 바꾼다 · 배열·객체는 복사본으로 바꾼다</span>
      <p className="section-desc">📏 상태를 다루는 규칙은 셋뿐이다:</p>
      <ul className="section-list">
        <li><b>① 읽기 전용이다</b> — 상태 값을 <b>직접 바꾸지 않는다</b>. (<code>player.exp = 10</code> ❌, <code>todos.push(...)</code> ❌)</li>
        <li><b>② set 함수로만 바꾼다</b> — 반드시 <code>setPlayer(...)</code>처럼 set에 <b>새 값</b>을 넣어야 화면이 다시 그려진다.</li>
        <li><b>③ 배열·객체는 복사본으로</b> — 원본을 고치지 말고 <code>{'{ ...obj }'}</code>·<code>[...arr]</code>로 <b>새 것</b>을 만들어 넣는다. 안 그러면 <b>참조가 같아</b> 리액트가 못 알아챈다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 새 값으로 바꾸는 법</div>
        <pre className="concept-flow">{`// 객체 — 바뀐 필드만 덮어쓴 '새 객체'
setPlayer({ ...player, exp: 10 })   // ✅   player.exp = 10; setPlayer(player) ❌

// 배열 — 원본은 그대로 두고 '새 배열'
setTodos([...todos, 새항목])         // ✅   todos.push(새항목); setTodos(todos) ❌`}</pre>
      </div>

      <p className="section-desc">
        규칙 ③을 어기면 어떻게 되나? 아래 두 데모에서 <b>❌ 버튼</b>은 값이 실제로 바뀌는데도 <b>화면이 안 바뀐다</b> —
        리액트는 <b>'새 참조(새 배열·새 객체)'</b>일 때만 바뀜을 알아채기 때문이다. 배열·객체 똑같다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ArrayMutationDemo />
        <ObjectMutationDemo />
      </div>
      <p className="section-desc">
        "왜 새 값이어야 하나"의 뿌리(<b>참조 vs 값</b>)는 <b>5단계 리스트</b>에서 배열로 더 깊게, 폼 입력은 <b>6단계</b>에서 이어진다.
      </p>

      <h3 className="section-title">⚠️ 흔한 함정 — 연속 setState (값 vs 함수)</h3>
      <span className="learn-tag">📎 학습 포인트 · set에 값을 넣으면 스냅샷 고정이라 +1, 함수(c =&gt; c + 1)를 넣으면 직전 값 기준이라 +3</span>
      <p className="section-desc">
        <code>setCount(...)</code>의 괄호 안에 <b>값</b>을 넣느냐 <b>함수</b>를 넣느냐가 완전히 다르다.
        초보가 가장 헷갈리는 지점이다.
      </p>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th></th>
              <th>setCount(count + 1)</th>
              <th>setCount(c =&gt; c + 1)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>괄호 안</td><td><b>값</b> (숫자)</td><td><b>함수</b> (updater)</td></tr>
            <tr><td>뜻</td><td>"이 값으로 바꿔줘" (고정된 숫자)</td><td>"직전 값에 +1 해줘" (계산 방법)</td></tr>
            <tr><td>연속 3번</td><td>전부 같은 <code>count</code>를 봄 → <b>+1</b></td><td>각자 <b>직전 값</b>을 받음 → <b>+3</b></td></tr>
            <tr><td>언제 쓰나</td><td>대부분 (한 번만 바꿀 때)</td><td>이전 값 기준으로 여러 번 갱신할 때</td></tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        <b>왜?</b> 한 번의 이벤트가 처리되는 동안 <code>count</code>는 그 렌더의 <b>스냅샷</b>으로 <b>고정</b>돼 있다.
        그래서 <code>count + 1</code>은 매번 "고정된 그 값 + 1" = 같은 결과. 반대로 <code>c =&gt; c + 1</code>은
        리액트가 큐에 쌓아 <b>직전 결과를 <code>c</code>로 넘겨</b> 차례로 계산한다.
      </p>
      <TrapCounter />
      <SetStateStoreViz />
      <p className="section-desc">
        📚 더 읽기 ·{' '}
        <a className="doc-link" href="https://ko.react.dev/learn/state-as-a-snapshot" target="_blank" rel="noopener noreferrer">
          스냅샷으로서의 State ↗
        </a>{' '}
        ·{' '}
        <a className="doc-link" href="https://ko.react.dev/learn/queueing-a-series-of-state-updates" target="_blank" rel="noopener noreferrer">
          state 업데이트 큐 ↗
        </a>
      </p>
    </section>
  )
}
