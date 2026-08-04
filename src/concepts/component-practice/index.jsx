// 📝 챕터 연습 · 컴포넌트와 JSX (config)
// 같은 결과(스티커 4개)를 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeVeryEasy from './practiceVeryEasy.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeApply from './practiceApply.jsx'
import PracticeHard from './practiceHard.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionStickers from './solution.jsx'
import SolutionAlt from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: '컴포넌트·JSX',
  header: '작은 컴포넌트(Sticker)를 JSX 규칙에 맞게 만들고, 같은 조각을 여러 번 재사용한다(캡슐화).',
  goal: '컴포넌트 만들기 + JSX 규칙 + 재사용을 한 번에 종합한다.',
  builds: '1단계 · 함수 vs 컴포넌트 · JSX 규칙 · 캡슐화',
  solution: <SolutionStickers />,
  solutionFile: 'concepts/component-practice/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 컴포넌트에서 한 곳만 채운다.',
      file: 'concepts/component-practice/practiceVeryEasy.jsx',
      task: '스티커에 이모지만 보이고 이름이 안 보인다. label을 보여주는 한 줄만 채우자.',
      hints: [
        '① 어디 — practiceVeryEasy.jsx의 Sticker 안, 이모지 <span> 다음의 🟢 TODO.',
        '② 어떻게 — <b>{label}</b>. JS 값은 {중괄호}로 꽂는다.',
        '③ 확인 — 정의 한 곳만 고쳤는데 4개(🍎🍌🍇🍓)에 이름이 전부 뜬다.',
      ],
      node: <PracticeVeryEasy />,
    },
    {
      label: '쉬움',
      point: 'return 전체를 규칙에 맞게 직접 쓴다.',
      file: 'concepts/component-practice/practiceEasy.jsx',
      task: '스티커 4개는 놓여 있다. Sticker의 return을 규칙에 맞게 완성해 4개가 그려지게 하자.',
      hints: [
        '① 먼저 체험 — 지금은 "여기를 완성"만 4번 보인다. Sticker가 자리표시자라서다.',
        '② JSX 규칙 — 하나의 루트(<div>)로 감싸고, class 대신 className, JS 값은 {중괄호}로: {emoji} {label}.',
        '③ 예: return <div className="demo-card" style={{ ... }}><span>{emoji}</span> <b>{label}</b></div>',
      ],
      node: <PracticeEasy />,
    },
    {
      label: '중간',
      point: '완성된 컴포넌트를 값만 바꿔 재사용한다.',
      file: 'concepts/component-practice/practiceMedium.jsx',
      task: 'Sticker는 완성돼 있다. 아래에서 4번 재사용하자 — 값(emoji·label)만 다르게.',
      hints: [
        '① 무엇·왜 — 정의는 하나, 사용은 여러 번. 같은 Sticker에 다른 props를 넘긴다.',
        '② 어디 — practiceMedium.jsx의 return 안 🟡 TODO. 지금은 1개뿐이다.',
        '③ 어떻게 — <Sticker emoji="🍎" label="사과" />처럼 4개를 나열한다.',
      ],
      node: <PracticeMedium />,
    },
    {
      label: '어려움',
      point: '정의와 재사용을 둘 다 직접 채운다.',
      file: 'concepts/component-practice/practiceApply.jsx',
      task: 'Sticker의 속(return)을 완성하고, 4번 재사용까지 직접 하자.',
      hints: [
        '① TODO A — Sticker의 return을 규칙에 맞게 완성한다(단일 루트·className·{emoji} {label}).',
        '② TODO B — 아래에서 Sticker를 4번, 다른 값으로 재사용한다.',
        '③ 값 예시 — 🍎 사과 · 🍌 바나나 · 🍇 포도 · 🍓 딸기.',
      ],
      node: <PracticeApply />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 컴포넌트부터 스스로 만든다.',
      file: 'concepts/component-practice/practiceHard.jsx',
      task: '껍데기만 있다. Sticker를 처음부터 정의하고, 4번 재사용해 스티커 4개를 띄우자.',
      hints: [
        '① 정의 — function Sticker({ emoji, label }) { return ( … ) }. JSX 규칙을 지킨다.',
        '② 재사용 — return 안에서 <Sticker … />를 4번, 다른 값으로.',
        '③ 확인 — 정의 하나로 스티커 4개가 그려진다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeHard />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'concepts/component-practice/practiceL6.jsx',
      task: '이번엔 "알림 배지 카드"다. 껍데기만 있다 — NotiBadge를 처음부터 정의하고 4번 재사용하자.',
      hints: [
        '① 정의 — function NotiBadge({ icon, count }) { return ( … ) }. JSX 규칙(단일 루트·className·{중괄호}).',
        '② 재사용 — <NotiBadge icon="🔔" count={3} />처럼 4번, 값만 다르게.',
        '③ 값 예시 — 🔔 3 · ✉️ 12 · ❤️ 7 · ⭐ 99.',
        '④ 확인 — 정의 하나로 배지 4개가 그려진다. Sticker와 같은 컴포넌트·props·재사용이다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionAlt />,
      solutionFile: 'concepts/component-practice/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
