import { createContext, useContext } from 'react'

// 🟢 쉬움+ — 이번엔 반대로, Provider가 값을 '흘려보내게' 하자.
// 배지는 이미 useContext로 읽고 있다. 할 일: Provider의 value를 채운다.

const ThemeContext = createContext('light')

function ThemeBadge() {
  const theme = useContext(ThemeContext) // 완성 — Context에서 값을 꺼내 읽는다
  return <b>지금 테마: {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'}</b>
}

export default function PracticeEasy2() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO: value에 "dark"를 넣어 흘려보낸다 → value="dark" (지금은 light라 라이트로 뜬다) */}
      <ThemeContext.Provider value="light">
        <ThemeBadge />
      </ThemeContext.Provider>
    </div>
  )
}
