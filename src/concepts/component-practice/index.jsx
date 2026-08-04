// 📝 연습 · 컴포넌트와 JSX (챕터 02 종합)
// 캡슐화까지 배운 걸 합쳐, 작은 컴포넌트를 JSX 규칙에 맞게 만들고 여러 번 재사용한다.

import Practice from '../../components/Practice.jsx'
import PracticeStickers from './practice.jsx'
import SolutionStickers from './solution.jsx'

export default function ComponentPractice() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 연습</span>
        <h2>컴포넌트와 JSX — 종합 연습</h2>
        <p>컴포넌트를 만들고(1단계), JSX 규칙을 지켜, 같은 조각을 여러 번 재사용한다(캡슐화).</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>작은 컴포넌트 하나를 <b>JSX 규칙에 맞게</b> 만들고, <b>정의는 한 번·사용은 여러 번</b>으로 재사용한다.</p>
      </div>

      <Practice
        task="Sticker 컴포넌트를 완성하고, 4번 재사용해 서로 다른 스티커 4개를 화면에 띄우자."
        goal="컴포넌트 만들기 + JSX 규칙 + 재사용을 한 번에 종합한다."
        hints={[
          '① Sticker는 emoji와 label을 받아 작은 카드를 그린다. return은 반드시 하나의 루트로 감싼다(<div>…</div>).',
          '② JSX 규칙: class 대신 className, 모든 태그는 닫기(<span/> 또는 <span></span>), JS 값은 {중괄호}로 — {emoji} {label}.',
          '③ 재사용: <Sticker emoji="🍎" label="사과" /> 처럼 4번, 값만 다르게. 정의는 하나, 사용은 여러 번.',
        ]}
        practiceFile="concepts/component-practice/practice.jsx"
        solutionFile="concepts/component-practice/solution.jsx"
        solution={<SolutionStickers />}
      >
        <PracticeStickers />
      </Practice>
    </section>
  )
}
