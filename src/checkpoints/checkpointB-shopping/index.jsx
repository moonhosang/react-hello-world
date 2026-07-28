// ============================================================
// 체크포인트 B · 장보기 리스트  (3~5단계 종합)
// ============================================================
// 상태(3단계) + 입력(4단계) + 리스트(5단계)를 한 번에 쓰는 누적 실습이다.

import Practice from '../../components/Practice.jsx'
import PracticeShopping from './practice.jsx'
import SolutionShopping from './solution.jsx'

export default function CheckpointB() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">✅ 체크포인트 B</span>
        <h2>장보기 리스트</h2>
        <p>3~5단계(상태 · 입력 · 리스트)를 합쳐, 추가/목록/삭제가 되는 장보기 리스트를 직접 만든다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>state·controlled input·리스트 렌더를 한 번에 엮어 추가/목록/삭제가 되는 리스트를 완성한다.</p>
      </div>

      <Practice
        task="입력창으로 항목을 추가하고, 목록으로 보여주고, ✕로 삭제되는 장보기 리스트를 완성하자."
        hints={[
          'input은 controlled로: value={text}, onChange로 setText. (4단계)',
          "추가: setItems([...items, { id: nextId++, name }]) — 새 배열을 만든다. (5단계)",
          '목록: items.map((it) => <li key={it.id}>...</li>). (5단계)',
          '삭제: setItems(items.filter((x) => x.id !== it.id)). (5단계)',
        ]}
        practiceFile="checkpointB-shopping/practice.jsx"
        solutionFile="checkpointB-shopping/solution.jsx"
        solution={<SolutionShopping />}
      >
        <PracticeShopping />
      </Practice>
    </section>
  )
}
