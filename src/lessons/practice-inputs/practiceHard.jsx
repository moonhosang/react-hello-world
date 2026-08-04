import { useState } from 'react'

// ⚫ 어려움 — 처음부터 전부 만든다.
// 할 일:
//   TODO A: text state를 만든다 (useState).
//   TODO B: input을 value·onChange로 state에 묶는다 (controlled).
//   TODO C: 글자 수({text.length}자)를 보여준다.
//   TODO D: '초기화' 버튼을 만들어, 누르면 text를 ''로 되돌린다.

export default function PracticeHard() {
  // TODO A: 여기에 useState

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO B~D: value·onChange로 묶은 input + 글자 수 + '초기화' 버튼 */}
      여기에 입력창·글자 수·초기화 버튼을 만들자
    </div>
  )
}
