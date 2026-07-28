// 7-2 · 전역 상태 바꾸기
// Provider의 value에 '상태 + setter'를 함께 담으면, 깊은 자식이 전역 값을 읽고 '바꾸기'까지 한다.
// 이 Context + state 조합이 '전역 상태 관리'의 기본 형태다.

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

export default function Step7_2() {
  const [dark, setDark] = useState(false)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">7-2</span>
        <h2>전역 상태 바꾸기</h2>
        <p>Provider의 value에 상태와 setter를 함께 담아, 어디서든 읽고 바꾼다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>Provider의 value에 상태와 setter를 함께 담으면, 멀리 떨어진 컴포넌트끼리 전역 상태를 공유하고 바꾼다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          value에 <code>{`{ dark, setDark }`}</code>를 담으면, 멀리 떨어진 두 컴포넌트가
          <b> 같은 전역 상태</b>를 공유한다. 한 곳에서 바꾸면 다른 곳도 함께 반응한다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 step7-2-global-state/index.jsx</div>
        <ThemeContext.Provider value={{ dark, setDark }}>
          <Toolbar />
          <Panel />
        </ThemeContext.Provider>
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>value에 <code>{`{ dark, setDark }`}</code>를 담아 <b>어디서든</b> 읽고 바꾼다.</li>
          <li>이 Context + state가 '전역 상태 관리'의 기본형이다. (Redux 같은 라이브러리도 이 아이디어의 확장)</li>
        </ul>
      </div>
    </section>
  )
}

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext)
  return (
    <div className="tree-box">
      <button onClick={() => setDark(!dark)}>{dark ? '🌙 다크' : '☀️ 라이트'} — 전환</button>
    </div>
  )
}
function Panel() {
  const { dark } = useContext(ThemeContext)
  return (
    <div className={'tree-box leaf theme-box' + (dark ? ' dark' : '')}>
      현재 테마: <b>{dark ? '다크 🌙' : '라이트 ☀️'}</b>
    </div>
  )
}
