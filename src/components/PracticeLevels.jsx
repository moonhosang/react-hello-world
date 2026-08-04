import { useState } from 'react'

// 난이도 3단계(쉬움/중간/어려움) 실습 블록.
// 완성 데모를 본 뒤, 채워진 양을 줄여가며 스스로 완성하게 한다.
//
// props:
//   levels: [{ label, file, task, hints:[], node }]  // node = <PracticeXxxEasy /> 등
//   solution     : 정답 코드의 렌더 결과 (<SolutionXxx />)
//   solutionFile : 정답 파일 경로 (라벨용)
// 단계별 학습 포인트 — 난이도 자체가 무엇을 훈련시키는지. (level.point로 개별 덮어쓰기 가능)
const DEFAULT_POINTS = [
  '빈 곳 한두 군데만 채우며, 어디에 무엇이 들어가는지 눈에 익힌다.',
  '같은 수준을 값·상황만 바꿔 한 번 더 — 손에 익힌다.',
  '핵심 로직을 직접 써 보며 데이터의 흐름을 손에 익힌다.',
  '조금 더 넓은 범위를 스스로 이어 붙여 본다.',
  '빈 화면에서 설계부터 스스로 만들어 전체를 완성한다.',
]

export default function PracticeLevels({ levels, goal, solution, solutionFile }) {
  const [lv, setLv] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const level = levels[lv]
  const marks = ['🟢', '🟡', '🔴', '🟣', '⚫'] // 신호등처럼 난이도를 한눈에
  const point = level.point ?? DEFAULT_POINTS[lv]

  return (
    <div className="practice">
      <div className="practice-head">
        <span className="practice-badge">🎯 실습</span>
        <p className="practice-task" style={{ margin: 0 }}>{level.task}</p>
      </div>

      {goal && <span className="learn-tag">🎯 이 실습으로 · {goal}</span>}

      {/* 난이도 탭 — 오른쪽으로 갈수록 비운 양이 많아진다 */}
      <div className="plv-tabs">
        {levels.map((l, i) => (
          <button
            key={i}
            className={'plv-tab' + (i === lv ? ' on' : '')}
            onClick={() => {
              setLv(i)
              setShowSolution(false)
            }}
          >
            {marks[i]} {l.label}
          </button>
        ))}
      </div>

      {point && (
        <span className="learn-tag">{marks[lv]} {level.label ?? '단계'} · {point}</span>
      )}

      {level.hints?.length > 0 && (
        <ul className="practice-hints">
          {level.hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className={'practice-grid' + (showSolution ? ' with-solution' : '')}>
        <div className="practice-slot">
          <div className="slot-label">✍️ 내 코드 · {level.file}</div>
          {/* key로 단계가 바뀌면 실습 컴포넌트를 새로 마운트한다(상태 초기화) */}
          <div className="slot-body" key={lv}>{level.node}</div>
        </div>

        {showSolution && (
          <div className="practice-slot is-solution">
            <div className="slot-label">✅ 정답 · {solutionFile}</div>
            <div className="slot-body">{solution}</div>
          </div>
        )}
      </div>

      <button className="practice-toggle" onClick={() => setShowSolution((v) => !v)}>
        {showSolution ? '🙈 정답 숨기기' : '👀 정답 보기'}
      </button>
    </div>
  )
}
