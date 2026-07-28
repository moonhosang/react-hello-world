import { useState, useEffect } from 'react'

// 🎯 실습 (step8-5) — 새로고침해도 남는 카운터 만들기
// 숫자를 올린 뒤 페이지를 새로고침해도 그 값이 그대로 남게 만들어 보자.
// (읽기 = lazy init, 저장 = useEffect)

// 이 실습 전용 저장 키. 다른 데모와 겹치지 않게 고유하게 둔다.
const KEY = 'lesson8-5:practice-count'

export default function PracticeStore() {
  // 🟢 TODO 1: 초기값을 localStorage에서 읽어온다 (lazy init).
  //   - useState에 '함수'를 넘겨 첫 렌더에 한 번만 읽게 한다.
  //   - localStorage.getItem(KEY) 이 null이면 0으로 시작한다.
  //   - 있으면 JSON.parse로 숫자로 되돌린다. (try/catch로 감싸 실패 시 0)
  const [count, setCount] = useState(0)

  // 🟢 TODO 2: count가 바뀔 때마다 localStorage에 저장한다.
  //   - useEffect 안에서 localStorage.setItem(KEY, JSON.stringify(count))
  //   - 의존성 배열에 [count]를 넣는다.

  return (
    <div className="demo-card center">
      <div className="demo-emoji">{count}</div>
      <div className="button-row">
        <button onClick={() => setCount(count + 1)}>➕ 올리기</button>
        <button
          onClick={() => {
            localStorage.removeItem(KEY)
            setCount(0)
          }}
        >
          🗑️ 지우기
        </button>
      </div>
      <p className="demo-desc">숫자를 올리고 새로고침 → 값이 남아 있으면 성공!</p>
    </div>
  )
}
