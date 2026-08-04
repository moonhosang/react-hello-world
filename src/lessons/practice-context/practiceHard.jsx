import { useState } from 'react'
// 필요하면 위 import에 createContext, useContext를 더한다.

// 🔴 어려움 — 처음부터. prop drilling 없이 테마를 공유한다.
// 할 일:
//   TODO A: ThemeContext = createContext('light') 를 만든다. (import도 채운다)
//   TODO B: 아래 return에서 DeepBadge를 ThemeContext.Provider로 감싸고 value={theme}.
//   TODO C: DeepBadge 안에서 useContext로 theme을 꺼내 표시한다.

// TODO A: 여기에 const ThemeContext = createContext('light')

function DeepBadge() {
  // TODO C: const theme = useContext(ThemeContext)
  const theme = 'light' // ← 이 줄을 useContext로 바꾼다

  return <b>지금 테마: {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'}</b>
}

export default function PracticeHard() {
  const [theme] = useState('dark')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO B: <ThemeContext.Provider value={theme}> 로 DeepBadge를 감싼다 */}
      <DeepBadge />
    </div>
  )
}
