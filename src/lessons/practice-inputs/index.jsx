// 📝 챕터 연습 · 입력 다루기
// 챕터 05(입력 다루기)를 종합하는 핸즈온 연습 — controlled input을 난이도 3단계로 직접 만든다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionInputCard from './solution.jsx'

export default function PracticeInputs() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>입력 다루기 — 종합 연습</h2>
        <p>input을 state에 묶어(controlled) 직접 다뤄 본다. 쉬움 → 어려움 순으로 하나씩.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>value</b>로 state를 화면에 내리고, <b>onChange</b>로 타이핑을 state에 올린다. 값은 늘 <b>state → 화면</b> 한 방향으로 흐른다.</p>
      </div>

      <PracticeLevels
        goal="value·onChange로 input을 state에 묶어(controlled) 입력값을 다루는 법을 익힌다."
        solutionFile="practice-inputs/solution.jsx"
        solution={<SolutionInputCard />}
        levels={[
          {
            label: '쉬움',
            file: 'practice-inputs/practiceEasy.jsx',
            task: '입력창에 타이핑한 글자가 반영되게, onChange 안 한 줄만 채우자.',
            hints: [
              '① 먼저 체험 — 지금은 입력창에 글자가 안 써진다(value는 state에 묶였는데 바꿀 onChange가 비어 있다).',
              '② 어디 — practiceEasy.jsx의 onChange 함수 안 🟢 TODO.',
              '③ 어떻게 — setText(e.target.value). 지금 입력한 값은 e.target.value다.',
              '④ 확인 — 타이핑하면 "리액트가 아는 값"이 실시간으로 바뀐다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'practice-inputs/practiceMedium.jsx',
            task: 'input에 value를 묶고, 입력값으로 인사말과 글자 수를 파생해 보여주자.',
            hints: [
              '① 무엇·왜 — value={name}가 없으면 화면이 state를 못 따라간다(uncontrolled). state를 화면의 단일 진실로 삼자.',
              '② 어디 — practiceMedium.jsx의 🟡 TODO A(value 묶기), TODO B(파생 표시).',
              '③ 어떻게 — <input value={name} … />, 아래에 안녕, {name || "손님"}님 · {name.length}자.',
              '④ 확인 — 타이핑하면 인사말과 글자 수가 실시간으로 따라 바뀐다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'practice-inputs/practiceHard.jsx',
            task: '껍데기만 있다. controlled input과 "초기화" 버튼을 처음부터 만들자.',
            hints: [
              '① state — const [text, setText] = useState("").',
              '② 묶기 — <input value={text} onChange={(e) => setText(e.target.value)} />.',
              '③ 초기화 — <button onClick={() => setText("")}>초기화</button>. 누르면 입력창이 비워진다(state가 진실이라 화면도 따라 비워진다).',
              '④ 확인 — 타이핑되고, 초기화를 누르면 입력창이 비워진다.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
