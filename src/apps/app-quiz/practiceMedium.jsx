import { useReducer } from 'react'

// 실전 앱 · 퀴즈 게임 · 중간
// 상태 모양·초기값·결과 화면·진행 화면·RESET은 이미 준비돼 있다.
// reducer의 ANSWER 처리 "전체"를 스스로 채운다: 채점(정답이면 +1) → 다음 문항 → 마지막이면 결과 화면.
// (타이머는 없다.)

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

// reducer: (현재 state, action) => 새 state. 순수 함수 — 원본을 건드리지 않고 새 값을 return 한다.
function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER': {
      if (state.status !== 'playing') return state

      // 🟡 TODO: ANSWER 처리 전체를 채운다.
      //   1) 정답 확인:
      //        const q = QUESTIONS[state.current]
      //        const correct = action.choice === q.answer
      //   2) 점수 정하기(맞히면 +1):
      //        const nextScore = state.score + (correct ? 1 : 0)
      //   3) 다음 문항 index:
      //        const nextIndex = state.current + 1
      //   4) 마지막이었다면(nextIndex >= TOTAL) 결과 화면으로:
      //        return { ...state, score: nextScore, status: 'finished' }
      //   5) 아니면 다음 문항으로:
      //        return { ...state, score: nextScore, current: nextIndex }
      //   ※ 원본 state를 건드리지 말고 항상 { ...state, ... }로 새 값을 return 한다.
      return state // ← 아직 아무 일도 안 한다. 위 🟡 TODO를 채우자.
    }
    case 'RESET':
      return initialState // 처음부터 다시
    default:
      return state
  }
}

export default function PracticeQuizMedium() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { status, current, score } = state

  // ── 결과 화면 ─────────────────────────────
  if (status === 'finished') {
    const percent = Math.round((score / TOTAL) * 100)
    return (
      <div className="demo-card" style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>
          {percent === 100 ? '🏆' : percent >= 60 ? '🎉' : '💪'}
        </div>
        <div className="demo-desc" style={{ marginBottom: 6 }}>결과</div>
        <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
          {score} / {TOTAL}
        </div>
        <p className="demo-desc" style={{ marginBottom: 16 }}>
          {TOTAL}문제 중 <b>{score}문제</b>를 맞혔다. ({percent}점)
        </p>
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
      {/* 상단: 진행 표시 + 점수 */}
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

      {/* 보기 — 고르면 ANSWER를 보낸다 (채점·다음은 reducer가 맡는다) */}
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
