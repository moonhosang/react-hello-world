import { createContext, useContext, useState } from 'react'

// 🟣 중간+ — Context 정의도, useContext로 읽기도 다 돼 있다.
// 마지막 한 조각: 깊은 배지를 Provider로 감싸 값을 흘려보내자.
// 할 일: return에서 DeepBadge를 <ThemeContext.Provider value={theme}> … </ThemeContext.Provider> 로 감싼다.

const ThemeContext = createContext('light')

function DeepBadge() {
  const theme = useContext(ThemeContext) // 완성 — 꺼내 읽는다
  return <b>지금 테마: {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'}</b>
}

export default function PracticeMedium2() {
  const [theme] = useState('dark')

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO: 아래 DeepBadge를 Provider로 감싸고 value={theme}를 준다.
          지금은 Provider가 없어서 배지가 기본값(light)만 읽어 "라이트"로 뜬다. */}
      <DeepBadge />
    </div>
  )
}
