import Practice from './Practice.jsx'

// 종합연습의 '한 단계'를 독립 페이지로 렌더한다. (탭 대신 단계별 사이드바 항목)
// p = 연습 config, lv = 그 단계 데이터, no = 표시 번호('1'…'4','5-1','5-2').
// 5-2는 '처음부터(다른 예시)'라 자기 solution을 가질 수 있다 → lv.solution/solutionFile 우선.
export default function PracticeStep({ p, lv, no }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 종합연습 {no}</span>
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
        solutionFile={lv.solutionFile ?? p.solutionFile}
        solution={lv.solution ?? p.solution}
      >
        {lv.node}
      </Practice>

      <p className="section-desc" style={{ marginTop: 12 }}>
        📚 같은 유형을 <b>채워주는 양만 줄여가며</b> 단계로 나눴다. 사이드바에서 <b>종합연습 1 → 5-2</b>를 순서대로 풀어 보라.
        (<b>5-1·5-2</b>는 둘 다 '처음부터' — 다른 예시로 한 번 더.)
      </p>
    </section>
  )
}
