// ============================================================
// 실전 앱 · Lv4 · 퀴즈 게임 (useReducer + 타이머 + 화면 전환)
// ============================================================
// 진행 위치·점수·상태·남은 시간처럼 서로 얽힌 상태를 useReducer 한 곳에 모으고,
// 문항마다 도는 카운트다운 타이머는 useEffect에서 걸고 정리(clearInterval)한다.
// 마지막 문항 뒤에는 status를 'finished'로 바꿔 결과 화면으로 전환한다.

import QuizGame from './QuizGame.jsx'
import TechTags from '../../components/TechTags.jsx'
import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeQuizEasy from './practiceEasy.jsx'
import PracticeQuizMedium from './practiceMedium.jsx'
import PracticeQuizHard from './practiceHard.jsx'
import SolutionQuiz from './solution.jsx'

export default function QuizApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">실전 앱 · Lv4</span>
        <h2>퀴즈 게임</h2>
        <p>문항마다 10초 카운트다운 안에 보기를 고른다. 시간이 다 되면 자동으로 다음 문항으로 넘어가고, 마지막 뒤엔 점수 화면이 뜬다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          진행 위치·점수·상태·남은 시간처럼 <b>서로 얽힌 상태는 useReducer 한 곳에 모으고</b>,
          화면은 <code>dispatch</code>로 무엇을 할지(<code>ANSWER · TICK · RESET</code>)만 보낸다.
          문항마다 도는 <b>카운트다운 타이머는 effect에서 걸고, 문항이 바뀌거나 끝나면 정리(clearInterval)</b>한다.
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'useReducer', to: 10 },
          { label: 'useEffect(타이머)', to: 8.2 },
          { label: '화면 전환', to: null },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 채점·타이머·화면 전환이 실제로 동작한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 매초 dispatch(TICK)로 시간을 줄이고, 0이 되면 reducer가 자동으로 다음 문항으로 넘긴다</span>
      <p className="section-desc">화면은 <code>dispatch</code>로 할 일만 보내고, 실제 처리는 <code>reducer</code>가 맡는다. 정리하면:</p>
      <ul className="section-list">
        <li><b>보기를 고르면</b> — <code>ANSWER</code>로 채점하고 다음 문항으로 넘어간다.</li>
        <li><b>가만히 두면</b> — 매초 <code>TICK</code>이 남은 시간을 줄인다.</li>
        <li><b>시간이 0이 되면</b> — 오답 처리 후 자동으로 다음 문항이 뜬다.</li>
        <li><b>마지막 문항 뒤엔</b> — 결과 화면이 뜨고, <code>RESET</code>으로 처음부터 다시 한다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 QuizGame.jsx</div>
        <QuizGame />
      </div>

      <PracticeLevels
        solutionFile="app-quiz/solution.jsx"
        solution={<SolutionQuiz />}
        levels={[
          {
            label: '쉬움',
            file: 'app-quiz/practiceEasy.jsx',
            task: 'ANSWER는 거의 다 돼 있다. 딱 한 줄 — "맞히면 점수 +1" — 만 채워 정답일 때 점수가 오르게 하자. (다음 문항·결과 화면은 이미 동작한다)',
            hints: [
              '① 먼저 체험 — 퀴즈를 풀어보라. 정답을 골라도 점수가 0에서 안 오른다. 이게 우리가 고칠 문제다.',
              '② 무엇을 고치나 — 보기를 고르면 화면이 dispatch로 ANSWER를 보내고, reducer(할 일을 처리하는 함수)의 ANSWER 자리가 채점·다음 문항을 맡는다. 지금은 여기서 점수만 안 오른다.',
              '③ 어디 — practiceEasy.jsx의 reducer 안 ANSWER 자리에 🟢 TODO가 있다. 정답 여부 correct는 이미 구해져 있다.',
              '④ 어떻게 — nextScore = state.score + 0 으로 돼 있어 맞혀도 안 오른다. 그 0을 (correct ? 1 : 0)으로 바꾸면 맞혔을 때만 +1 된다.',
              '⑤ 확인 — 다시 풀어 정답을 고르면 상단 점수가 1씩 오른다.',
            ],
            node: <PracticeQuizEasy />,
          },
          {
            label: '중간',
            file: 'app-quiz/practiceMedium.jsx',
            task: 'reducer의 ANSWER 처리 전체를 채우자. 채점(정답이면 점수 +1) → 다음 문항으로 넘기고, 마지막 문항 뒤엔 결과 화면으로 전환한다.',
            hints: [
              '① 무엇·왜 — reducer는 "보기를 고르면(dispatch로 ANSWER) 무엇을 바꿀지 정하는 함수"다. 지금 ANSWER가 그냥 state를 돌려줘서, 무엇을 골라도 점수·문항이 그대로다.',
              '② 어디 — practiceMedium.jsx의 reducer 안 ANSWER 자리에 🟡 TODO가 있다. 지금은 return state 한 줄뿐이다. 여기를 순서대로 채운다.',
              '③ 채점 — 정답을 확인한다: const q = QUESTIONS[state.current]; const correct = action.choice === q.answer. 점수는 const nextScore = state.score + (correct ? 1 : 0), 다음 문항은 const nextIndex = state.current + 1.',
              '④ 다음이냐 끝이냐 — 마지막이면(nextIndex >= TOTAL) return { ...state, score: nextScore, status: "finished" }, 아니면 return { ...state, score: nextScore, current: nextIndex }. 원본을 건드리지 말고 항상 { ...state, ... }로 새 값을 돌려준다.',
              '⑤ 확인 — 풀면 점수가 오르고, 마지막 문항 뒤 결과 화면으로 넘어간다.',
            ],
            node: <PracticeQuizMedium />,
          },
          {
            label: '어려움',
            file: 'app-quiz/practiceHard.jsx',
            task: '껍데기만 있다. initialState(status·current·score)를 설계하고, reducer의 ANSWER(채점+다음+마지막 전환)와 RESET(처음으로)을 처음부터 직접 채우자.',
            hints: [
              '① 무엇·왜 — 지금 reducer가 아무 일도 안 해서(return state) 화면은 떠도 점수·진행이 안 바뀐다. state 모양과 ANSWER·RESET을 직접 채워 살아 있는 퀴즈로 만드는 게 목표다.',
              '② 어디 — practiceHard.jsx의 initialState와 reducer 안 🔴 TODO 세 곳(state 설계 · ANSWER · RESET)이다.',
              '③ state 설계 — initialState = { status: "playing", current: 0, score: 0 }로 시작한다. status로 진행 화면과 결과 화면을 나누고, current는 몇 번째 문항인지, score는 맞힌 개수다.',
              '④ ANSWER — 보기를 고르면 dispatch로 여기 온다. 정답 확인 → nextScore = state.score + (correct ? 1 : 0) → nextIndex = state.current + 1 → 마지막이면(nextIndex >= TOTAL) status "finished", 아니면 current 갱신.',
              '⑤ RESET·규칙·확인 — RESET은 return initialState로 처음으로 돌린다. reducer는 순수 함수라 원본을 건드리지 말고 항상 { ...state, ... }로 새 state를 return 한다(불변성). 다 채우면 점수·진행이 움직이고 결과 화면과 다시 하기가 동작한다.',
            ],
            node: <PracticeQuizHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li><b>useReducer</b> — <code>status · current · score · timeLeft</code>를 한 state 객체로 모으고, 채점·시간 감소·리셋 로직을 <code>reducer</code> 한 곳에 담는다.</li>
          <li><b>action으로 분기</b> — <code>ANSWER</code>(채점 후 다음), <code>TICK</code>(시간 1초 감소, 0이면 자동 다음), <code>RESET</code>(처음부터)로 무엇을 할지만 보낸다.</li>
          <li><b>순수 함수 reducer</b> — 원본 state를 건드리지 않고 <code>{'{ ...state, ... }'}</code>로 항상 <b>새 state를 return</b>한다. (불변성)</li>
          <li><b>타이머 effect + 정리</b> — <code>setInterval</code>로 매초 <code>dispatch(TICK)</code>, <code>return () =&gt; clearInterval(id)</code>로 정리한다.</li>
          <li><b>의존성으로 리셋</b> — effect 의존성에 <code>current</code>를 넣어, 문항이 바뀌면 타이머가 새로 걸린다(가득 찬 10초부터).</li>
          <li><b>화면 전환</b> — <code>status</code> 값에 따라 진행 화면과 결과 화면을 나눠 그린다.</li>
        </ul>
      </div>
    </section>
  )
}
