import { createContext, useContext, useState } from 'react'

// 🟡 중간 — 깊은 자식이 테마를 바꾸게 하자.
// 할 일: Provider의 value에 { theme, setTheme }를 연결한다(TODO). 그러면 깊은 버튼이 토글할 수 있다.

const ThemeContext = createContext(null)

// 중간 컴포넌트 — 아무것도 안 받고 그냥 자식을 감싼다 (그게 Context의 장점)
function Middle({ children }) {
  return <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>{children}</div>
}

function DeepButton() {
  const { theme, setTheme } = useContext(ThemeContext) // Provider의 value에서 꺼낸다
  return (
    <button className="chip on" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'} — 눌러서 토글
    </button>
  )
}

export default function PracticeMedium() {
  const [theme, setTheme] = useState('light')

  // TODO: 아래 value를 실제 상태와 연결한다 → const value = { theme, setTheme }
  const value = { theme: 'light', setTheme: () => {} } // ← 지금은 가짜라 토글이 안 먹는다

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <ThemeContext.Provider value={value}>
        <p style={{ marginTop: 0, fontSize: 13 }}>중간은 아무것도 안 받는다 ↓ 깊은 버튼이 직접 꺼내 쓴다</p>
        <Middle>
          <DeepButton />
        </Middle>
      </ThemeContext.Provider>
    </div>
  )
}
