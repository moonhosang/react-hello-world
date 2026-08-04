import Practice from './Practice.jsx'

// 종합연습의 '한 단계'를 독립 페이지로 렌더한다.
// 챕터 연습을 탭(PracticeLevels) 대신 단계별 사이드바 항목으로 쪼개, 각 단계가
// 자기 진도/연습/복습 체크를 갖게 하려는 것. p = 연습 config, lv = 그 단계 데이터.
export default function PracticeStep({ p, lv, no, total }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 종합연습 {no}/{total}</span>
        <h2>{p.shortTitle} — {lv.label}</h2>
        <p>{p.header}</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 이 단계</span>
        <p>{lv.point || p.goal}</p>
      </div>

      <Practice
        task={lv.task}
        hints={lv.hints}
        practiceFile={lv.file}
        solutionFile={p.solutionFile}
        solution={p.solution}
      >
        {lv.node}
      </Practice>

      <p className="section-desc" style={{ marginTop: 12 }}>
        📚 같은 결과를 <b>채워주는 양만 줄여가며</b> {total}단계로 만든다. 사이드바에서 <b>종합연습 1~{total}</b>을 순서대로 풀어 보라.
      </p>
    </section>
  )
}
