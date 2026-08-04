import { useState, useEffect } from 'react'

// 🔴 어려움 — 처음부터 만든다.
// 할 일:
//   TODO A: running(불리언)과 sec(숫자) state를 선언한다.
//   TODO B: useEffect로, running이 true일 때만 1초마다 sec를 늘리는 타이머를 걸고,
//           return으로 clearInterval 정리한다. 의존성은 [running].
//   TODO C: 시작/멈춤 버튼과 sec를 화면에 그린다.

export default function PracticeHard() {
  // TODO A: 여기에 useState 두 개

  // TODO B: 여기에 useEffect(타이머 시작 + 정리)

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO C: ⏱️ sec 표시 + 시작/멈춤 버튼 */}
      여기에 타이머를 만들자
    </div>
  )
}
