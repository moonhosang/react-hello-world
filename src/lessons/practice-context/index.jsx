// 📝 챕터 연습 · Context(전역 상태) — 단계별 데이터(config)
// 같은 '테마 공유'를 스캐폴딩만 줄여가며 5단계로. 완성물은 모두 같다(solution.jsx).
// 사이드바에선 PracticeStep이 각 단계를 독립 항목으로 렌더한다.

import PracticeEasy from './practiceEasy.jsx'
import PracticeEasy2 from './practiceEasy2.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeMedium2 from './practiceMedium2.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionThemeContext from './solution.jsx'

const PRACTICE = {
  shortTitle: 'Context',
  header: 'createContext · Provider의 value · useContext를 직접 손으로 써서, prop drilling 없이 테마를 공유한다.',
  goal: 'createContext·Provider·useContext로 깊은 자식에 테마를 전달·변경한다.',
  builds: '8-1 · 8-2 · 8-3',
  solution: <SolutionThemeContext />,
  solutionFile: 'practice-context/solution.jsx',
  levels: [
    {
      label: '1 · 읽기',
      point: '완성된 Provider에서 값을 한 줄로 꺼낸다.',
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
      label: '2 · 흘려보내기',
      point: '이번엔 Provider가 값을 흘려보내게 채운다.',
      file: 'practice-context/practiceEasy2.jsx',
      task: 'ThemeBadge는 이미 useContext로 읽는다. Provider의 value를 dark로 채워 값을 흘려보내자.',
      hints: [
        '① 어디 — practiceEasy2.jsx의 <ThemeContext.Provider value="light">.',
        '② 어떻게 — value="light"를 value="dark"로 바꾼다.',
        '③ 확인 — 배지가 "🌙 다크"로 바뀐다. Provider가 흘려보낸 값이 자식까지 온 것이다.',
      ],
      node: <PracticeEasy2 />,
    },
    {
      label: '3 · 토글',
      point: 'value에 상태+setter를 넣어 깊은 버튼이 토글하게 한다.',
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
      label: '4 · Provider',
      point: 'Context·읽기는 됐고, Provider로 감싸 값을 흘려보낸다.',
      file: 'practice-context/practiceMedium2.jsx',
      task: 'Context 정의와 useContext 읽기는 다 돼 있다. 깊은 배지를 Provider로 감싸 값을 흘려보내자.',
      hints: [
        '① 무엇·왜 — Provider로 감싸야 그 안의 자식이 value를 받는다. 안 감싸면 기본값(light)만 읽힌다.',
        '② 어디 — practiceMedium2.jsx의 return 안 🟣 TODO.',
        '③ 어떻게 — <ThemeContext.Provider value={theme}><DeepBadge /></ThemeContext.Provider>.',
        '④ 확인 — theme이 dark라 이제 "🌙 다크"로 뜬다.',
      ],
      node: <PracticeMedium2 />,
    },
    {
      label: '5 · 처음부터',
      point: '빈 화면에서 createContext부터 전부 스스로.',
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
  ],
}
export default PRACTICE
