import { useReducer, useEffect } from 'react'
import StartScreen from './StartScreen.jsx'
import QuestionScreen from './QuestionScreen.jsx'
import ResultScreen from './ResultScreen.jsx'

// ============================================================
// 퀴즈 게임 — useReducer + 타이머 + 화면 전환(오케스트레이션)
// ============================================================
// 진행 위치·점수·상태·남은 시간처럼 "서로 얽힌 상태"를 useReducer 한 곳에 모은다.
// 이 파일은 상태(reducer)와 화면 전환만 맡고, 실제 화면 조각은
// StartScreen / QuestionScreen / ResultScreen 세 컴포넌트로 나눠 그린다.
// 각 화면은 필요한 값과 콜백(onStart / onAnswer / onReset)을 props로 받는다.
// 화면은 dispatch로 "무엇을 할지"(ANSWER / TICK / RESET)만 보내고,
// 실제 계산(채점·다음 문항·시간 감소)은 전부 reducer가 맡는다.

// 문제 데이터: 각 문항은 보기(options)와 정답 인덱스(answer)를 가진다.
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
    q: 'setInterval처럼 "걸어둔 것"은 effect의 무엇으로 정리하나?',
    options: ['return하는 정리(cleanup) 함수', 'try/catch', '새 state', 'props'],
    answer: 0,
  },
  {
    q: '바꾸는 방법이 여러 개고 서로 얽힌 상태를 한 곳에 모으는 훅은?',
    options: ['useEffect', 'useRef', 'useReducer', 'useMemo'],
    answer: 2,
  },
]

const TIME_PER_Q = 10 // 문항당 제한 시간(초)
const TOTAL = QUESTIONS.length

// 새 게임 한 판의 처음 상태(문제부터 시작).
const freshGame = {
  status: 'playing',
  current: 0, // 현재 문항 index
  score: 0, // 맞힌 개수
  timeLeft: TIME_PER_Q, // 남은 시간(초)
}

// 맨 처음엔 시작 화면(idle) — 시작 버튼을 눌러야 문제가 나온다.
const initialState = { ...freshGame, status: 'idle' } // 'idle' | 'playing' | 'finished'

// 채점 결과를 반영해 다음 문항으로 넘기거나, 마지막이면 결과 화면으로 전환한다.
function advance(state, gotCorrect) {
  const nextScore = state.score + (gotCorrect ? 1 : 0)
  const nextIndex = state.current + 1
  if (nextIndex >= TOTAL) {
    // 마지막 문항 뒤 → 결과 화면
    return { ...state, score: nextScore, status: 'finished', timeLeft: 0 }
  }
  // 다음 문항으로. 타이머는 다시 가득 채운다.
  return { ...state, score: nextScore, current: nextIndex, timeLeft: TIME_PER_Q }
}

// reducer: (현재 state, action) => 새 state. 순수 함수 — 원본을 건드리지 않고 새 값을 return 한다.
function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER': {
      if (state.status !== 'playing') return state
      const q = QUESTIONS[state.current]
      const correct = action.choice === q.answer
      return advance(state, correct) // 채점 후 다음 문항
    }
    case 'TICK': {
      if (state.status !== 'playing') return state
      if (state.timeLeft <= 1) {
        return advance(state, false) // 시간 초과 → 오답 처리 후 다음
      }
      return { ...state, timeLeft: state.timeLeft - 1 } // 1초 감소
    }
    case 'START': // 시작 화면 → 첫 문항
      return freshGame
    case 'RESET': // 결과 화면 → 다시 첫 문항부터
      return freshGame
    default:
      return state
  }
}

export default function QuizGame() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { status, current, score, timeLeft } = state

  // 타이머: playing일 때만 1초마다 TICK을 보낸다.
  // 문항(current)이 바뀌면 effect가 다시 걸려 타이머가 리셋되고,
  // finished가 되거나 언마운트되면 clearInterval로 정리한다.
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => clearInterval(id) // 정리! 안 하면 타이머가 쌓인다.
  }, [status, current])

  // ── 화면 전환 ─────────────────────────────
  // status에 따라 어떤 화면을 그릴지 고르고, 각 화면엔 필요한 값과
  // 콜백만 props로 내려준다. 콜백 안에서 dispatch로 reducer에 알린다.

  // 시작 화면
  if (status === 'idle') {
    return (
      <StartScreen
        total={TOTAL}
        timePerQ={TIME_PER_Q}
        onStart={() => dispatch({ type: 'START' })}
      />
    )
  }

  // 결과 화면
  if (status === 'finished') {
    return (
      <ResultScreen
        score={score}
        total={TOTAL}
        onReset={() => dispatch({ type: 'RESET' })}
      />
    )
  }

  // 진행(문제) 화면
  return (
    <QuestionScreen
      question={QUESTIONS[current]}
      current={current}
      total={TOTAL}
      score={score}
      timeLeft={timeLeft}
      timePerQ={TIME_PER_Q}
      onAnswer={(choice) => dispatch({ type: 'ANSWER', choice })}
    />
  )
}
