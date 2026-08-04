// 📝 챕터 연습 · 컴포넌트와 JSX (챕터 02 종합)
// 컴포넌트를 만들고, JSX 규칙을 지켜, 같은 조각을 여러 번 재사용한다(캡슐화). 난이도 3단계.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionStickers from './solution.jsx'

export default function ComponentPractice() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>컴포넌트와 JSX — 종합 연습</h2>
        <p>컴포넌트를 만들고(1단계), JSX 규칙을 지켜, 같은 조각을 여러 번 재사용한다(캡슐화). 쉬움 → 어려움 순으로.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>작은 컴포넌트 하나를 <b>JSX 규칙에 맞게</b> 만들고, <b>정의는 한 번·사용은 여러 번</b>으로 재사용한다.</p>
      </div>

      <PracticeLevels
        goal="컴포넌트 만들기 + JSX 규칙 + 재사용을 한 번에 종합한다."
        solutionFile="concepts/component-practice/solution.jsx"
        solution={<SolutionStickers />}
        levels={[
          {
            label: '쉬움',
            file: 'concepts/component-practice/practiceEasy.jsx',
            task: '아래 스티커 4개는 이미 놓여 있다. Sticker 정의 한 곳을 규칙에 맞게 채워, 4개가 전부 그려지게 하자.',
            hints: [
              '① 먼저 체험 — 지금은 "여기를 완성"만 4번 보인다. Sticker 정의가 자리표시자라서다.',
              '② JSX 규칙 — 하나의 루트(<div>)로 감싸고, class 대신 className, JS 값은 {중괄호}로: {emoji} {label}.',
              '③ 예: return <div className="demo-card" style={{ ... }}><span>{emoji}</span> <b>{label}</b></div>',
              '④ 확인 — 정의 한 곳만 고쳤는데 4개(🍎🍌🍇🍓)가 전부 제대로 그려진다. 이게 재사용이다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'concepts/component-practice/practiceMedium.jsx',
            task: 'Sticker는 완성돼 있다. 아래에서 Sticker를 4번 재사용하자 — 값(emoji·label)만 다르게.',
            hints: [
              '① 무엇·왜 — 정의는 하나, 사용은 여러 번. 같은 Sticker에 다른 props를 넘겨 재사용한다.',
              '② 어디 — practiceMedium.jsx의 return 안 🟡 TODO. 지금은 1개만 있다.',
              '③ 어떻게 — <Sticker emoji="🍎" label="사과" />처럼 4개, 서로 다른 값으로 나열한다.',
              '④ 확인 — 서로 다른 스티커 4개가 나란히 뜬다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'concepts/component-practice/practiceHard.jsx',
            task: '껍데기만 있다. Sticker 컴포넌트를 처음부터 정의하고, 4번 재사용해 스티커 4개를 띄우자.',
            hints: [
              '① 정의(TODO A) — function Sticker({ emoji, label }) { return ( … ) }. JSX 규칙(단일 루트·className·태그 닫기·중괄호)을 지킨다.',
              '② 재사용(TODO B) — return 안에서 <Sticker … />를 4번, 다른 값으로.',
              '③ 값 예시 — 🍎 사과 · 🍌 바나나 · 🍇 포도 · 🍓 딸기.',
              '④ 확인 — 정의 하나로 스티커 4개가 그려진다. 👀 정답 보기로 비교해 보라.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
