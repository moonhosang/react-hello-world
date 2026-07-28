import { useState } from 'react'

// 한 컴포넌트가 '여러 개의 상태'를 가진다.
// 숫자와 모드는 서로 관련 없는(독립적인) 값이라 각각 state로 두는 게 간단하다.

export default function MultiState() {
  const [count, setCount] = useState(0)
  const [dark, setDark] = useState(false)

  return (
    <div>
      <p className="demo-desc">
        숫자: <b>{count}</b> · 모드: <b>{dark ? '🌙 다크' : '☀️ 라이트'}</b>
      </p>
      <div className="button-row">
        <button onClick={() => setCount(count + 1)}>➕ 숫자</button>
        <button onClick={() => setDark(!dark)}>🌗 모드</button>
      </div>
    </div>
  )
}
