// 8-2 · 전역 상태 바꾸기
// Provider의 value에 '상태 + setter'를 함께 담으면, 깊은 자식이 전역 값을 읽고 '바꾸기'까지 한다.
// 이 Context + state 조합이 '전역 상태 관리'의 기본 형태다.

import { createContext, useContext, useState } from 'react'
import SourceTrace from '../../../components/SourceTrace.jsx'

const ThemeContext = createContext(null)

// value에 '상태 + setter'를 함께 담으면, 멀리 있는 자식이 읽고 바꾸기까지 한다.
const GLOBAL_CODE = `const [dark, setDark] = useState(false)

<ThemeContext.Provider value={{ dark, setDark }}>   // 상태 + setter 함께
  <Toolbar />   <Panel />
</ThemeContext.Provider>

function Toolbar() {
  const { dark, setDark } = useContext(ThemeContext) // 읽고 + 바꾸기
  return <button onClick={() => setDark(!dark)}>전환</button>
}
function Panel() {
  const { dark } = useContext(ThemeContext)          // 읽기만
  return <div>현재: {dark ? '다크' : '라이트'}</div>
}`

const GLOBAL_STEPS = [
  {
    hl: [1, 3],
    tag: '① 상태 + setter',
    t: 'value에 둘을 함께 담는다',
    d: (<>최상위에 <code>dark</code> 상태를 두고, Provider의 <code>value</code>에 <code>{'{ dark, setDark }'}</code>를 <b>함께</b> 담아 통로에 흘린다.</>),
    note: 'dark = false',
  },
  {
    hl: [8, 12],
    tag: '② 각자 꺼냄',
    t: '필요한 만큼만 useContext',
    d: (<><code>Toolbar</code>는 <code>{'{ dark, setDark }'}</code>(읽고+바꾸기), <code>Panel</code>은 <code>{'{ dark }'}</code>(읽기만)를 <code>useContext</code>로 꺼낸다.</>),
  },
  {
    hl: [9],
    tag: '③ 바꾸기',
    t: '멀리 있는 setter로 전역 상태 변경',
    d: (<><code>Toolbar</code>의 버튼 → <code>setDark(!dark)</code>. 자기 상태가 아닌데도, Context로 받은 <b>setter</b>로 전역 <code>dark</code>를 바꾼다.</>),
    note: 'dark = true',
  },
  {
    hl: [3, 12],
    tag: '④ 함께 반응',
    t: '구독한 곳이 전부 리렌더',
    d: (<><code>dark</code>가 바뀌면 <code>value</code>가 바뀌고, 그걸 구독한 <b>Toolbar·Panel이 함께</b> 리렌더된다 → 둘 다 새 테마를 반영. 멀리 떨어졌어도 같은 상태를 공유한다.</>),
  },
  {
    tag: '⑤ 전역 상태 기본형',
    t: 'Context + state = 전역 상태 관리',
    d: (<>이 <b>Context + state</b> 조합이 '전역 상태 관리'의 기본형이다. 한 곳에서 바꾸면 멀리 떨어진 곳도 함께 반응한다(Redux 같은 라이브러리도 이 아이디어의 확장).</>),
  },
]

export default function Step7_2() {
  const [dark, setDark] = useState(false)

  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">8-2</span>
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

      <span className="learn-tag">📎 학습 포인트 · value에 상태+setter를 담으면 멀리 있는 자식이 읽고 바꾸기까지 한다</span>
      <SourceTrace file="전역 상태 — Context + setter" code={GLOBAL_CODE} steps={GLOBAL_STEPS} />

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
