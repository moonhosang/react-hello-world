import { useState } from 'react'

// 🎯 실습 (step3) — 켜짐/꺼짐 스위치를 useState로 완성하기
// 버튼을 누르면 💡(ON) / 🌑(OFF) 가 번갈아 바뀌게 만들어 보자.

export default function PracticeSwitch() {
  // TODO 1: on 상태를 만든다 (처음엔 false)
  const on = false

  return (
    <div className="demo-card center">
      <div className="demo-emoji">{on ? '💡' : '🌑'}</div>
      {/* TODO 2: 클릭하면 on을 반대로 뒤집는다 (토글) */}
      <button>{on ? '끄기' : '켜기'}</button>
    </div>
  )
}
