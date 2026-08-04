import { createContext, useContext, useState } from 'react'

// ✅ 정답 — createContext + Provider(value에 상태+setter) + useContext.
// 중간(Middle)은 아무것도 안 받고, 깊은 자식이 직접 꺼내 쓴다. prop drilling 없음.

const ThemeContext = createContext(null)

function Middle({ children }) {
  return <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>{children}</div>
}

function DeepButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button className="chip on" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'} — 눌러서 토글
    </button>
  )
}

export default function SolutionThemeContext() {
  const [theme, setTheme] = useState('light')
  return (
    <div
      className="demo-card"
      style={{ padding: 12, background: theme === 'dark' ? '#1f2937' : undefined, color: theme === 'dark' ? '#f9fafb' : undefined }}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <p style={{ marginTop: 0, fontSize: 13 }}>중간은 아무것도 안 받는다 ↓ 깊은 버튼이 직접 꺼내 쓴다</p>
        <Middle>
          <DeepButton />
        </Middle>
      </ThemeContext.Provider>
    </div>
  )
}
