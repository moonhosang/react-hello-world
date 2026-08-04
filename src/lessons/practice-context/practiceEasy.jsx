import { createContext, useContext } from 'react'

// 🟢 쉬움 — 이미 만들어 둔 ThemeContext에서 값을 꺼내 표시하자.
// 할 일: ThemeBadge 안 TODO 한 줄 — useContext로 지금 테마를 읽는다.

const ThemeContext = createContext('light')

function ThemeBadge() {
  // TODO: ThemeContext에서 지금 테마를 꺼낸다.
  //   힌트: const theme = useContext(ThemeContext)
  const theme = 'light' // ← 이 줄을 위 useContext로 바꾼다 (지금은 Provider 값을 무시한다)

  return <b>지금 테마: {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'}</b>
}

export default function PracticeEasy() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* Provider가 'dark'를 흘려보낸다. ThemeBadge가 그걸 꺼내 보여줘야 한다 */}
      <ThemeContext.Provider value="dark">
        <ThemeBadge />
      </ThemeContext.Provider>
    </div>
  )
}
