// 9-3 · 정리(cleanup) 함수
// effect에서 return하는 함수가 정리다. 컴포넌트가 사라지기 직전(또는 다음 effect 전)에 실행된다.

import { useState, useEffect } from 'react'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 아래 흐르는 시계와 '같은' 로직. 걸기(setInterval) → 매초 갱신 → 정리(clearInterval)를 짚는다.
const CLOCK_CODE = `function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => {   // 1초마다 반복 예약
      setNow(new Date())             // 현재 시각으로 갱신 → 리렌더
    }, 1000)
    return () => clearInterval(id)   // 정리: 걸어둔 타이머를 끈다
  }, [])                             // [] = 마운트 때 한 번만 건다

  return <p>🕐 {now.toLocaleTimeString()}</p>
}`

const CLOCK_STEPS = [
  {
    hl: [1, 2, 11],
    tag: '① 마운트',
    t: '시계 켜기 → Clock이 화면에 붙는다',
    d: (<><code>useState</code>로 <code>now</code>가 현재 시각이 된다. 일단 그 시각이 화면에 <b>한 번</b> 그려진다 — 아직은 <b>멈춰 있는 시계</b>다.</>),
    note: 'now = (켠 순간의 시각)',
  },
  {
    hl: [4, 5, 7, 9],
    tag: '② effect',
    t: '렌더 뒤 effect가 setInterval을 건다',
    d: (<>화면을 그린 뒤 effect가 실행된다(<code>[]</code>라 이번 한 번만). <code>setInterval</code>로 <b>"1초마다 setNow 하라"</b>를 예약하고, 돌려받은 타이머 <code>id</code>를 기억해 둔다.</>),
    note: 'id = (타이머 번호) 1개 돌기 시작',
  },
  {
    hl: [5, 6],
    tag: '③ 매초',
    t: '1초마다 setNow → 리렌더 → 시각 갱신',
    d: (<>1초마다 예약한 콜백이 돌아 <code>setNow(new Date())</code> → state가 바뀌어 <b>리렌더</b> → 새 시각이 화면에. 이게 반복돼 <b>흐르는 시계</b>가 된다. effect는 <code>[]</code>라 <b>다시 걸지 않는다</b>(타이머는 계속 하나).</>),
    note: '매초 리렌더 · 타이머는 여전히 1개',
  },
  {
    hl: [8],
    tag: '④ 언마운트',
    t: '시계 끄기 → 사라지기 직전 정리 함수 실행',
    d: (<><b>시계 끄기</b>를 누르면 Clock이 화면에서 빠진다(언마운트). 리액트는 사라지기 <b>직전</b>에 effect가 <code>return</code>한 <b>정리 함수</b>를 부른다 → <code>clearInterval(id)</code>로 타이머를 끈다.</>),
    note: '타이머 0개 (깨끗이 정리됨)',
  },
  {
    hl: [8],
    tag: '⑤ 정리 안 하면?',
    t: '정리를 빼면 타이머가 쌓여 샌다',
    d: (<>만약 <code>return () =&gt; clearInterval(id)</code>가 <b>없다면</b>, Clock이 사라져도 <code>setInterval</code>은 계속 돌며 없는 컴포넌트에 <code>setNow</code>를 시도한다(누수). 켜고·끄기를 반복하면 <b>타이머가 겹겹이 쌓인다</b>. 정리가 있어 늘 <b>하나만</b> 돈다.</>),
  },
]

export default function Step8_2() {
  const [on, setOn] = useState(true)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-3</span>
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
      {/* 🔬 소스 + 동작 과정 — 걸기 → 매초 → 정리의 순서 */}
      <h3 className="section-title">🔬 코드가 도는 순서 — 걸고 · 돌고 · 끄고</h3>
      <span className="learn-tag">📎 학습 포인트 · effect가 setInterval을 걸고(②), 매초 갱신하고(③), 언마운트 때 정리 함수가 끈다(④)</span>
      <p className="section-desc">
        아래는 흐르는 시계의 <b>실제 로직</b>이다. <b>다음 ▶</b>으로 넘기며 <b>정리 함수(8번 줄)가 언제 불리는지</b>에 집중하라 —
        핵심은 <b>"거는 곳과 끄는 곳이 한 쌍"</b>이라는 점이다.
      </p>
      <SourceTrace file="step8-2-cleanup/index.jsx · Clock" code={CLOCK_CODE} steps={CLOCK_STEPS} />

      <h3 className="section-title">▶ 직접 켜고 꺼 보기</h3>
      <span className="learn-tag">📎 학습 포인트 · 켜고·끄기를 반복해도 시계가 하나만 돈다 = 정리가 잘 되고 있다는 증거</span>
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
