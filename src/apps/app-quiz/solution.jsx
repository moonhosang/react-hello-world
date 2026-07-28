import { useReducer } from 'react'

// ✅ 정답 예시 — 퀴즈 게임 (채점 + 다음 문항 + 결과 화면 + 다시 하기)
// useReducer로 진행 위치·점수·상태를 한 state 객체에 모으고,
// 화면은 dispatch로 "무엇을 할지"(ANSWER / RESET)만 보낸다.
// 핵심: reducer는 순수 함수 — 원본 state를 건드리지 않고 항상 새 state를 return 한다.

const QUESTIONS = [
  {
    q: 'React에서 화면을 다시 그리게 만드는 것은?',
    options: ['state 변경(set)', 'console.log', 'HTML 파일 저장', '주석 달기'],
    answer: 0,
  },
  {
    q: '컴포넌트에 값을 "위에서 아래로" 전달하는 것은?',
    options: ['props', 'ref', 'CSS', 'localStorage'],
    answer: 0,
  },
  {
    q: '리스트를 map으로 그릴 때 각 항목에 꼭 줘야 하는 것은?',
    options: ['style', 'key', 'id 속성만', 'onClick'],
    answer: 1,
  },
  {
    q: '바꾸는 방법이 여러 개고 서로 얽힌 상태를 한 곳에 모으는 훅은?',
    options: ['useEffect', 'useRef', 'useReducer', 'useMemo'],
    answer: 2,
  },
]

const TOTAL = QUESTIONS.length

const initialState = {
  status: 'playing', // 'playing' | 'finished'
  current: 0, // 현재 문항 index
  score: 0, // 맞힌 개수
}

function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER': {
      if (state.status !== 'playing') return state
      const q = QUESTIONS[state.current]
      const correct = action.choice === q.answer
      const nextScore = state.score + (correct ? 1 : 0)
      const nextIndex = state.current + 1
      if (nextIndex >= TOTAL) {
        // 마지막 문항 뒤 → 결과 화면으로 전환
        return { ...state, score: nextScore, status: 'finished' }
      }
      // 다음 문항으로
      return { ...state, score: nextScore, current: nextIndex }
    }
    case 'RESET':
      return initialState // 처음부터 다시
    default:
      return state
  }
}

export default function SolutionQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { status, current, score } = state

  // ── 결과 화면 ─────────────────────────────
  if (status === 'finished') {
    const percent = Math.round((score / TOTAL) * 100)
    return (
      <div className="demo-card" style={{ textAlign: 'center', padding: '8px 0' }}>
        {/* 성적별 이모지: 만점 🏆 / 60점 이상 🎉 / 그 외 💪 */}
        <div style={{ fontSize: 40, marginBottom: 8 }}>
          {percent === 100 ? '🏆' : percent >= 60 ? '🎉' : '💪'}
        </div>
        <div className="demo-desc" style={{ marginBottom: 6 }}>결과</div>
        {/* 점수: 맞힌 개수 / 전체 개수 */}
        <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
          {score} / {TOTAL}
        </div>
        {/* 풀어쓴 결과 문구 + 환산 점수 */}
        <p className="demo-desc" style={{ marginBottom: 16 }}>
          {TOTAL}문제 중 <b>{score}문제</b>를 맞혔다. ({percent}점)
        </p>
        {/* 다시 하기: RESET을 dispatch해 처음부터 */}
        <div className="button-row">
          <button onClick={() => dispatch({ type: 'RESET' })}>🔄 다시 하기</button>
        </div>
      </div>
    )
  }

  // ── 진행 화면 ─────────────────────────────
  const question = QUESTIONS[current]

  return (
    <div className="demo-card">
      {/* 상단: 진행 표시(몇 번째 / 전체) + 현재 점수 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <span className="badge">{current + 1} / {TOTAL}</span>
        <span className="demo-desc">점수 {score}</span>
      </div>

      {/* 문제 */}
      <h4 style={{ margin: '0 0 16px', fontSize: 17, lineHeight: 1.5 }}>
        Q{current + 1}. {question.q}
      </h4>

      {/* 보기 — 고르면 ANSWER를 dispatch(고른 index를 choice로 전달) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => dispatch({ type: 'ANSWER', choice: i })}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
