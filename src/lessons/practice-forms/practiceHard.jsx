import { useState } from 'react'

// 🔴 어려움 — 처음부터 방명록을 만든다.
// 할 일:
//   TODO A: form({ name, message })과 entries([]) state를 선언한다.
//   TODO B: 공통 handleChange를 만든다 ({ ...form, [e.target.name]: e.target.value }).
//   TODO C: handleSubmit — e.preventDefault() → 이름이 비면 막고(return) → 목록 추가 + 입력 비우기.
//   TODO D: 이름·메시지 input(name 속성 필수!) + 제출 버튼 + 목록을 그린다.

export default function PracticeHard() {
  // TODO A: 여기에 useState 두 개

  // TODO B: 여기에 handleChange

  // TODO C: 여기에 handleSubmit

  return (
    <form className="demo-card" style={{ padding: 12 }}>
      {/* TODO D: 입력 2개 + 제출 버튼 + 목록 */}
      여기에 방명록을 만들자
    </form>
  )
}
