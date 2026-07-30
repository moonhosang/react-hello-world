// 9-2 · 정리(cleanup) 함수
// effect에서 return하는 함수가 정리다. 컴포넌트가 사라지기 직전(또는 다음 effect 전)에 실행된다.

import { useState, useEffect } from 'react'

export default function Step8_2() {
  const [on, setOn] = useState(true)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-2</span>
        <h2>정리(cleanup) — 뒷정리하기</h2>
        <p>타이머·구독처럼 "걸어둔 것"은 effect가 return하는 함수에서 정리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>effect가 return하는 정리 함수로 걸어둔 타이머·구독을 뒷정리해 누수를 막는다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          effect에서 <b>return하는 함수</b>가 정리(cleanup)다. 컴포넌트가 사라지기 직전(또는 다음 effect 전)에 실행된다.
          타이머를 걸었으면 여기서 꺼야 새는 걸 막는다.
        </p>
      </div>

      <span className="learn-tag">📎 학습 포인트 · setInterval을 걸었으면 clearInterval로 반드시 꺼야 한다</span>
      <p className="section-desc">
        1단계의 <code>Clock.jsx</code>는 "처음 그려진 시각"에서 <b>멈춰 있었다</b>. 여기서 <code>useEffect + setInterval</code>로
        1초마다 다시 그려 <b>흐르는 시계</b>로 만든다. 대신 걸어둔 타이머는 <b>정리</b>해야 한다.
      </p>
      <div className="card">
        <div className="file-label">📄 step8-2-cleanup/index.jsx</div>
        <button onClick={() => setOn((v) => !v)}>{on ? '시계 끄기 (언마운트)' : '시계 켜기 (마운트)'}</button>
        {on && <Clock />}
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li><code>{`return () => clearInterval(id)`}</code> — 걸어둔 타이머를 끈다.</li>
          <li>정리를 안 하면 컴포넌트가 사라져도 타이머가 계속 돌아 메모리가 샌다. (끄기/켜기를 반복해도 시계가 하나만 돈다)</li>
          <li>1단계 <code>Clock.jsx</code>는 정지 시계, 여기 <code>Clock</code>은 매초 <code>set</code>으로 다시 그리는 흐르는 시계다.</li>
        </ul>
      </div>
    </section>
  )
}

// 흐르는 벽시계: 1초마다 현재 시각을 다시 읽어 화면을 갱신한다.
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id) // 정리! 안 하면 타이머가 쌓인다.
  }, [])
  return <p className="demo-desc">🕐 지금 시각: <b>{now.toLocaleTimeString('ko-KR')}</b></p>
}
