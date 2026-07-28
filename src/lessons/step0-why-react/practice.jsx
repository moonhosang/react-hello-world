import { useState } from 'react'

// 🎯 실습 (step0) — 리액트 방식으로 카운터 완성하기
// 아래 카운터는 아직 안 움직인다. useState와 setCount로 '리액트 방식'을 완성해 보자.
// (0단계 핵심: 화면을 직접 안 건드리고, 상태만 바꾸면 자동으로 갱신된다.)

export default function PracticeCounter() {
  // TODO 1: useState로 count 상태를 만든다  →  const [count, setCount] = useState(0)
  const count = 0

  return (
    <div className="demo-card center">
      <div className="demo-emoji">{count}</div>
      {/* TODO 2: 클릭하면 setCount로 count를 1 늘린다 */}
      <button onClick={() => alert('아직 안 됨! setCount로 바꿔 보자')}>➕ 증가</button>
    </div>
  )
}
