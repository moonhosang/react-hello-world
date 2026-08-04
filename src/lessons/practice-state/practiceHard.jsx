import { useState } from 'react'

// 🔴 어려움 — 처음부터 만든다.
// 할 일:
//   TODO A: liked(boolean)와 count(number) state를 선언한다.
//   TODO B: 버튼을 누르면 liked를 토글하고, 켜질 때 count +1 / 꺼질 때 -1.
//   TODO C: 하트(❤️ 또는 🤍)와 count를 화면에 그리고, 버튼에 onClick을 연결한다.

export default function PracticeHard() {
  // TODO A: 여기에 useState 두 개

  // TODO B: 여기에 토글 핸들러

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO C: 하트 + count 표시, 버튼 */}
      여기에 좋아요 카드를 만들자
    </div>
  )
}
