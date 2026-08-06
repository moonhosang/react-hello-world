import { useState, useEffect } from 'react'

// 이 실습 전용 저장 키. 다른 데모와 겹치지 않게 고유하게 둔다.
const KEY = 'lesson8-5:solution-count'

export default function SolutionStore() {
  // ① 읽기(lazy init): 함수를 넘겨 첫 렌더에 한 번만 localStorage를 읽는다.
  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved == null ? 0 : JSON.parse(saved)
    } catch {
      return 0
    }
  })

  // ② 저장(useEffect): count가 바뀔 때마다 localStorage에 저장한다.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(count))
    } catch {
      // 저장 실패는 무시한다.
    }
  }, [count])

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
