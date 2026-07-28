import { useReducer } from 'react'

// 실전 앱 · 퀴즈 게임 · 어려움 (껍데기만)
// 문제 데이터(QUESTIONS)와 화면(JSX)만 준다. 나머지는 스스로 설계한다.
//   - initialState: 어떤 값들을 한 state에 모을지 직접 정한다(진행 위치·점수·상태 등).
//   - reducer: ANSWER(채점 + 다음 문항 + 마지막이면 결과 전환)와 RESET(처음부터)을 직접 채운다.
// 지금은 reducer가 아무 일도 안 해서 화면은 뜨지만 점수/진행이 바뀌지 않는다. 이걸 완성하는 게 목표다.
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

// 🔴 TODO(1): 이 state 모양을 스스로 설계한다.
//   - 진행 화면인지 결과 화면인지 구분할 status ('playing' | 'finished')
//   - 지금 몇 번째 문항인지 current
//   - 맞힌 개수 score
// 아래는 화면이 그냥 뜨게 하려고 넣은 최소값이다. 필요하면 바꿔도 된다.
const initialState = {
  status: 'playing',
  current: 0,
  score: 0,
}

// reducer: (현재 state, action) => 새 state. 순수 함수 — 원본을 건드리지 않고 새 값을 return 한다.
function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER': {
      if (state.status !== 'playing') return state
      // 🔴 TODO(2): 채점하고 다음 문항으로 넘긴다.
      //   - 정답 확인: const q = QUESTIONS[state.current]; const correct = action.choice === q.answer
      //   - 점수: const nextScore = state.score + (correct ? 1 : 0)
      //   - 다음: const nextIndex = state.current + 1
      //   - 마지막이면(nextIndex >= TOTAL): return { ...state, score: nextScore, status: 'finished' }
      //   - 아니면: return { ...state, score: nextScore, current: nextIndex }
      return state
    }
    case 'RESET': {
      // 🔴 TODO(3): 처음 상태로 되돌린다. (return initialState)
      return state
    }
    default:
      return state
  }
}

export default function PracticeQuizHard() {
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
  // current가 범위를 벗어나도 화면이 깨지지 않게 첫 문항으로 보정한다.
  const question = QUESTIONS[current] ?? QUESTIONS[0]

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
        <span className="badge">{(current ?? 0) + 1} / {TOTAL}</span>
        <span className="demo-desc">점수 {score ?? 0}</span>
      </div>

      {/* 문제 */}
      <h4 style={{ margin: '0 0 16px', fontSize: 17, lineHeight: 1.5 }}>
        Q{(current ?? 0) + 1}. {question.q}
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
