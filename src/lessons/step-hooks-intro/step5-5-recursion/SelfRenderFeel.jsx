import { useState, useEffect } from 'react'

// 🎭 "리렌더가 마치 컴포넌트가 스스로를 다시 부르는 것처럼 느껴지는" 감각을 보여주는 데모다.
// 🔑 state가 바뀌면 → 리액트가 이 함수를 처음부터 '다시 실행'한다 → 🎲 Math.random 지문이 매번 바뀐다.
// ⚠️ 단, 실제 재귀처럼 호출 스택이 쌓이는 게 아니라 '같은 인스턴스'를 다시 실행하는 것이다.
export default function SelfRenderFeel() {
  // 🎯 이 state(count)가 바뀌는 것이 '리렌더의 계기'다
  const [count, setCount] = useState(0)
  const [auto, setAuto] = useState(false)

  // ⏱️ 자동을 켜면 매초 스스로 setCount를 불러 '계속 다시 부르는 듯' 반복 렌더된다
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setCount((c) => c + 1), 700) // 🔁 매초 리렌더 유발
    return () => clearInterval(id) // 🧹 끄면(언마운트/의존성 변경) 정리
  }, [auto])

  // 🎲 이 줄은 '렌더될 때마다' 새로 실행된다 → 지문이 매 렌더 바뀐다 (리렌더를 '보여줄' 뿐, 일으키진 않는다)
  const fingerprint = Math.random().toFixed(3)

  return (
    <div>
      <div className="tree-box leaf" style={{ fontSize: 15 }}>
        🔁 렌더 지문: <b style={{ color: 'var(--brand)' }}>{fingerprint}</b>
        <span style={{ color: 'var(--muted)' }}> · 다시 그려진 횟수 {count}</span>
      </div>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={() => setCount((c) => c + 1)}>🔁 리렌더 (count +1)</button>
        <button className="chip" onClick={() => setAuto((a) => !a)}>{auto ? '⏸ 자동 멈춤' : '▶ 자동 반복'}</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        버튼을 누르거나 자동을 켜면 <b>지문이 매번 바뀐다.</b> state가 바뀔 때마다 리액트가 이 컴포넌트 함수를
        <b> 처음부터 다시 실행</b>하기 때문이다 — 마치 컴포넌트가 <b>스스로를 다시 부르는 것처럼</b> 느껴진다.
      </p>
    </div>
  )
}
