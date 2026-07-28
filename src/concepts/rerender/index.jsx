// 개념 · 리렌더링 조건 (컴포넌트는 언제 다시 그려지나)
// 리렌더 = 컴포넌트 함수를 '다시 실행'해 새 화면을 계산하는 것.
// UI = f(props, state) 이므로, 입력(props·state)이 바뀌면 f를 다시 돌린다.

import { useState } from 'react'

// 자식: 렌더될 때마다 '지금 시각'을 새로 계산해 보여준다.
// → 시각이 바뀌면 = 이 컴포넌트가 다시 그려졌다는 증거.
function Child() {
  const [n, setN] = useState(0)
  const now = new Date()
  const time =
    now.toLocaleTimeString('ko-KR') + '.' + String(now.getMilliseconds()).padStart(3, '0')

  return (
    <div className="tree-box leaf">
      <div>자식 — 마지막으로 그려진 시각: <b>{time}</b></div>
      <button onClick={() => setN(n + 1)}>자식 state 바꾸기 ({n})</button>
    </div>
  )
}

export default function ReRender() {
  const [tick, setTick] = useState(0)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge concept-badge">🔁 개념</span>
        <h2>리렌더링 — 언제 다시 그려질까?</h2>
        <p>컴포넌트가 '다시 실행'되어 화면을 새로 계산하는 조건을 정리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>컴포넌트는 자기 state가 바뀌거나, 받은 props가 바뀌거나, 부모가 리렌더될 때 다시 그려진다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          리렌더(re-render) = 컴포넌트 함수를 <b>다시 실행</b>해 새 화면을 계산하는 것.
          <code> UI = f(props, state)</code> 이니, 입력이 바뀌면 <b>f를 다시 돌린다.</b>
        </p>
        <ul className="concept-terms">
          <li>① 자기 <b>state</b>가 바뀔 때 (<code>setState</code>)</li>
          <li>② 받은 <b>props</b>가 바뀔 때 (부모가 새 값을 넘김)</li>
          <li>③ <b>부모가 리렌더</b>되면 자식도 함께 (기본 동작)</li>
          <li className="muted-li">＋ 구독한 <b>Context</b> 값이 바뀔 때도 (7단계)</li>
        </ul>
      </div>

      <div className="card">
        <div className="file-label">📄 rerender/index.jsx</div>
        <button onClick={() => setTick(tick + 1)}>부모 state 바꾸기 ({tick}) — 부모+자식 리렌더</button>
        <Child />
        <p className="demo-desc">
          <b>부모 버튼</b>을 눌러 보자. 자식에게 <b>아무 값도 안 넘겼는데</b> 자식의 시각도 바뀐다 →
          부모가 다시 그려지면 자식도 다시 그려진다(③). <b>자식 버튼</b>은 자식만의 state라 자식만 갱신(①).
        </p>
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>리렌더가 잦아도 걱정하지 마라 — 리액트는 <b>가상 DOM</b>으로 실제로 바뀐 부분만 갱신한다.</li>
          <li>정말 느려질 때만 최적화(<code>memo</code> 등)를 <b>나중에</b> 고민한다. (조기 최적화 금물)</li>
        </ul>
      </div>

      <div className="try-it warn-box">
        <h4>❌ 오해</h4>
        <ul>
          <li>
            일반 변수(<code>let x = ...</code>)를 바꿔도 <b>리렌더되지 않는다.</b>
            화면과 연결된 <b>state/props</b>여야 다시 그려진다. (0단계 참고)
          </li>
        </ul>
      </div>
    </section>
  )
}
