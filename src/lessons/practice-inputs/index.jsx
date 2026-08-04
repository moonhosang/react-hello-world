// 📝 챕터 연습 · 입력 다루기
// 챕터 05(입력 다루기)를 종합하는 핸즈온 연습 — controlled input을 난이도 5단계로 직접 만든다.
// 완성물은 하나(입력 + 글자 수 + 초기화), 채워진 양만 줄여가며 5단계로.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeStep2 from './practiceStep2.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeStep4 from './practiceStep4.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionInputCard from './solution.jsx'

export default function PracticeInputs() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>입력 다루기 — 종합 연습</h2>
        <p>input을 state에 묶어(controlled) 직접 다뤄 본다. 쉬움 → 어려움까지 5단계로 하나씩.</p>
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
            label: '아주 쉬움',
            point: 'onChange 한 줄만 채운다 — 어디에 무엇이 들어가는지 눈에 익힌다.',
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
            label: '쉬움',
            point: '같은 개념을 한 번 더 — value로 input을 state에 묶는다.',
            file: 'practice-inputs/practiceStep2.jsx',
            task: 'onChange는 됐다. input에 value={text}를 붙여 state에 묶자(controlled).',
            hints: [
              '① 무엇·왜 — value가 없으면 uncontrolled다. state를 화면의 단일 진실로 삼아야 한다.',
              '② 어디 — practiceStep2.jsx의 <input>에 🟡 TODO.',
              '③ 어떻게 — <input value={text} onChange={…} />.',
              '④ 확인 — 이제 state가 곧 화면이다(둘이 항상 같이 움직인다).',
            ],
            node: <PracticeStep2 />,
          },
          {
            label: '중간',
            point: '입력값에서 파생 값(글자 수)을 계산해 붙인다.',
            file: 'practice-inputs/practiceMedium.jsx',
            task: 'controlled까지 됐다. 입력값에서 글자 수를 파생해 덧붙이자.',
            hints: [
              '① 무엇·왜 — 파생 값은 state를 따로 두지 않고 text에서 계산한다(text.length).',
              '② 어디 — practiceMedium.jsx의 <p> 안 🔴 TODO.',
              '③ 어떻게 —  · <b>{text.length}</b>자 를 이어 붙인다.',
              '④ 확인 — 타이핑하면 글자 수가 실시간으로 따라 바뀐다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            point: '값을 되돌리는 동작(초기화)을 붙인다.',
            file: 'practice-inputs/practiceStep4.jsx',
            task: '입력·글자 수까지 됐다. 누르면 입력창을 비우는 "초기화" 버튼을 더하자.',
            hints: [
              '① 무엇·왜 — state가 진실이라, setText("")만 하면 화면(input)도 따라 비워진다.',
              '② 어디 — practiceStep4.jsx의 button-row 안 🟣 TODO.',
              '③ 어떻게 — <button className="chip" onClick={() => setText("")}>초기화</button>.',
              '④ 확인 — 글자를 친 뒤 초기화를 누르면 입력창이 비워진다.',
            ],
            node: <PracticeStep4 />,
          },
          {
            label: '도전',
            point: '빈 화면에서 전체를 처음부터 만든다.',
            file: 'practice-inputs/practiceHard.jsx',
            task: '껍데기만 있다. controlled input + 글자 수 + "초기화" 버튼을 처음부터 만들자.',
            hints: [
              '① state — const [text, setText] = useState("").',
              '② 묶기 — <input value={text} onChange={(e) => setText(e.target.value)} />.',
              '③ 글자 수 — {text.length}자, 초기화 — <button onClick={() => setText("")}>초기화</button>.',
              '④ 확인 — 타이핑·글자 수·초기화가 모두 동작한다. 👀 정답 보기로 비교해 보라.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
