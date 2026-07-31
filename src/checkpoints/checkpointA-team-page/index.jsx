// ============================================================
// 체크포인트 A · 팀 소개 페이지  (1~2단계 종합: 컴포넌트 + props)
// ============================================================
// 여러 단계를 합쳐서 직접 만들어 보는 '누적 실습'이다.
// 배운 것: 컴포넌트를 만들고(1단계), props로 값을 넘겨(2단계) 재사용한다.

import Practice from '../../components/Practice.jsx'
import PracticeTeam from './practice.jsx'
import SolutionTeam from './solution.jsx'

export default function CheckpointA() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">✅ 체크포인트 A</span>
        <h2>팀 소개 페이지</h2>
        <p>1~2단계(컴포넌트 + props)를 합쳐, 팀원 3명을 소개하는 페이지를 직접 만든다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>하나의 Member 컴포넌트를 만들고 props로 서로 다른 값을 넘겨 3명을 재사용해 그린다.</p>
      </div>

      <Practice
        task="Member 컴포넌트(props: emoji·name·role)를 만들고, 팀원 3명을 서로 다른 값으로 보여주자."
        goal="컴포넌트 + props로 같은 조각을 다른 값으로 재사용하는 법을 종합한다."
        hints={[
          'Member는 props를 받아 카드를 그린다. (2단계 props 복습)',
          '<Member emoji="👩‍💻" name="김코딩" role="프론트엔드" /> 처럼 값을 넘긴다.',
          '같은 Member를 3번 재사용한다 — 정의는 하나, 사용은 여러 번.',
        ]}
        practiceFile="checkpointA-team-page/practice.jsx"
        solutionFile="checkpointA-team-page/solution.jsx"
        solution={<SolutionTeam />}
      >
        <PracticeTeam />
      </Practice>

      <div className="try-it" style={{ marginTop: 16 }}>
        <h4>🔜 다음 예고 — 곧 궁금해질 질문</h4>
        <p style={{ margin: 0 }}>
          지금은 값을 <b>props로 넘기기만</b> 했다(부모가 정해준 고정 값). 그런데 "버튼을 누르면 <b>바뀌는</b> 값"은 어떻게 다룰까?
          곧 <b>3단계</b>에서 <code>state</code>를 배우면, <b>무엇을 props로 · 무엇을 state로 · 그 state는 누가 소유할지</b>를
          판단하게 된다 → <b>🔀 개념 · props vs state</b>에서 정리한다.
        </p>
      </div>
    </section>
  )
}
