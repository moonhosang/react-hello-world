// 📝 챕터 연습 · 컴포넌트와 JSX (챕터 02 종합)
// 같은 결과(스티커 4개)를 스캐폴딩만 줄여가며 5단계로 만든다. 완성물은 모두 같다(solution.jsx).

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeVeryEasy from './practiceVeryEasy.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeApply from './practiceApply.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionStickers from './solution.jsx'

export default function ComponentPractice() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>컴포넌트와 JSX — 종합 연습</h2>
        <p>컴포넌트를 만들고(1단계), JSX 규칙을 지켜, 같은 조각을 여러 번 재사용한다(캡슐화). 같은 결과를 5단계로.</p>
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
            label: '도전',
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
        ]}
      />
    </section>
  )
}
