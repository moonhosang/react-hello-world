import { useState } from 'react'

// 🎯 실습 (step4) — controlled input 완성하기
// 입력창에 타이핑하면 아래에 '입력값'과 '글자 수'가 실시간으로 보이게 만들어 보자.

export default function PracticeInput() {
  const [text, setText] = useState('')

  return (
    <div className="demo-card">
      {/* TODO 1: value와 onChange를 연결해 controlled input으로 만든다 */}
      <input placeholder="여기에 입력" />
      {/* TODO 2: 입력한 값과 글자 수를 보여준다 */}
      <p className="demo-desc">여기에 입력값이 실시간으로 보이게 하자</p>
    </div>
  )
}
