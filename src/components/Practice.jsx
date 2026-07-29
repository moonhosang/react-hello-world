import { useState } from 'react'

// 공용 실습 블록.
// - 학습자가 고치는 practice.jsx의 결과(children)를 '내 코드' 칸에 라이브로 보여준다.
// - '정답 보기'를 누르면 solution.jsx의 결과를 옆에 펼친다.
//
// props:
//   task         : 이번 실습에서 만들 것 (한 줄 설명)
//   hints        : 힌트 문자열 배열
//   practiceFile : 학습자가 고칠 파일 경로 (라벨 표시용)
//   solutionFile : 정답 파일 경로 (라벨 표시용)
//   children     : 학습자 코드의 렌더 결과 (<PracticeXxx />)
//   solution     : 정답 코드의 렌더 결과 (<SolutionXxx />)
export default function Practice({ task, goal, hints = [], practiceFile, solutionFile, children, solution }) {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div className="practice">
      <div className="practice-head">
        <span className="practice-badge">🎯 실습</span>
        <p className="practice-task">{task}</p>
      </div>

      {goal && <span className="learn-tag">🎯 이 실습으로 · {goal}</span>}

      {hints.length > 0 && (
        <ul className="practice-hints">
          {hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className={'practice-grid' + (showSolution ? ' with-solution' : '')}>
        <div className="practice-slot">
          <div className="slot-label">✍️ 내 코드 · {practiceFile}</div>
          <div className="slot-body">{children}</div>
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
