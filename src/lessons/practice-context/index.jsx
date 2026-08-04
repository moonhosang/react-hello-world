// 📝 챕터 연습 · Context(전역 상태)
// 챕터 09(Context)를 종합하는 핸즈온 연습 — 난이도 3단계로 직접 만들어 본다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionThemeContext from './solution.jsx'

export default function PracticeContext() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>Context(전역 상태) — 종합 연습</h2>
        <p>createContext · Provider의 value · useContext를 직접 손으로 써서, prop drilling 없이 테마를 공유한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>Provider로 <b>값을 흘려보내고</b>, 필요한 자식이 <b>useContext로 직접 꺼낸다</b> — 중간 컴포넌트는 props를 안 받는다.</p>
      </div>

      <PracticeLevels
        goal="createContext·Provider·useContext로 깊은 자식에 테마를 전달·변경한다."
        solutionFile="practice-context/solution.jsx"
        solution={<SolutionThemeContext />}
        levels={[
          {
            label: '쉬움',
            file: 'practice-context/practiceEasy.jsx',
            task: 'Provider는 이미 dark를 흘려보낸다. ThemeBadge가 그 값을 꺼내 보여주게, TODO 한 줄을 채우자.',
            hints: [
              '① 먼저 체험 — 지금은 Provider가 dark인데도 "☀️ 라이트"라 뜬다. 값을 안 꺼내서 그렇다.',
              '② 어디 — practiceEasy.jsx의 ThemeBadge 안 🟢 TODO(const theme = ...).',
              '③ 어떻게 — const theme = useContext(ThemeContext). 하드코딩한 "light"를 이 줄로 바꾼다.',
              '④ 확인 — 이제 "🌙 다크"로 바뀐다. Provider 값이 자식까지 흘러온 것이다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'practice-context/practiceMedium.jsx',
            task: '깊은 버튼이 테마를 토글하게 하자. Provider의 value를 진짜 상태와 연결한다.',
            hints: [
              '① 무엇·왜 — value에 상태와 setter를 함께 넣어야, 깊은 자식이 값을 읽고 바꿀 수 있다.',
              '② 어디 — practiceMedium.jsx의 value(🟡 TODO). 지금은 가짜(setTheme이 빈 함수)라 토글이 안 먹는다.',
              '③ 어떻게 — const value = { theme, setTheme }. 위에서 만든 useState의 theme·setTheme을 그대로 넘긴다.',
              '④ 확인 — 버튼을 누르면 🌙 ↔ ☀️ 로 토글된다. 중간(Middle)은 아무것도 안 받았다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'practice-context/practiceHard.jsx',
            task: '껍데기만 있다. createContext부터 Provider·useContext까지 처음부터 이어 붙여, 깊은 자식에 테마를 전달하자.',
            hints: [
              '① Context — import에 createContext, useContext를 더하고, const ThemeContext = createContext("light").',
              '② Provider — return에서 <ThemeContext.Provider value={theme}> 로 DeepBadge를 감싼다.',
              '③ 읽기 — DeepBadge 안에서 const theme = useContext(ThemeContext)로 꺼내, 하드코딩을 지운다.',
              '④ 확인 — theme이 "dark"라, prop 한 번 안 넘겼는데 깊은 뱃지에 "🌙 다크"가 뜬다.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
