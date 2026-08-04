// 📝 챕터 연습 · 폼 입력 응용
// 챕터 08(폼 입력 응용)을 종합하는 핸즈온 연습 — 난이도 3단계로 방명록을 직접 만든다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionGuestbook from './solution.jsx'

export default function PracticeForms() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>폼 입력 응용 — 종합 연습</h2>
        <p>객체 state·공통 onChange·제출(preventDefault)을 직접 손으로 써 '방명록'을 만든다. 쉬움 → 어려움 순으로.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>여러 입력은 <b>객체 state 하나 + 공통 onChange</b>로 묶고, 제출은 <b>preventDefault</b> 뒤 목록에 추가한다.</p>
      </div>

      <PracticeLevels
        goal="객체 state·공통 onChange·제출을 이어 '방명록'을 완성한다."
        solutionFile="practice-forms/solution.jsx"
        solution={<SolutionGuestbook />}
        levels={[
          {
            label: '쉬움',
            file: 'practice-forms/practiceEasy.jsx',
            task: '공통 onChange를 완성해, 이름·메시지 두 입력을 form 객체 한 곳에 담자.',
            hints: [
              '① 먼저 체험 — 지금은 입력해도 글자가 안 써진다(반영 X). 이게 고칠 문제다.',
              '② 어디 — practiceEasy.jsx의 handleChange 안 🟢 TODO.',
              '③ 어떻게 — setForm({ ...form, [e.target.name]: e.target.value }). input의 name(name·message)이 어느 칸인지 알려 준다.',
              '④ 확인 — 두 칸 모두 글자가 써지고 아래 미리보기에 나온다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'practice-forms/practiceMedium.jsx',
            task: '제출을 완성하자. 새로고침을 막고, 입력을 방명록 목록에 추가한다. (공통 onChange는 이미 됨)',
            hints: [
              '① 무엇·왜 — form의 onSubmit이 그냥 두면 페이지가 새로고침된다. e.preventDefault()로 막아야 한다.',
              '② 어디 — practiceMedium.jsx의 handleSubmit 안 🟡 TODO 1~3.',
              '③ 어떻게 — e.preventDefault() → setEntries([...entries, form])로 목록에 추가 → setForm({ name: "", message: "" })로 입력창 비우기.',
              '④ 확인 — 남기기를 누르면 목록에 한 줄 쌓이고, 입력창이 비워진다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'practice-forms/practiceHard.jsx',
            task: '껍데기만 있다. form 객체 state·공통 onChange·제출(이름 필수 검증)을 처음부터 만들자.',
            hints: [
              '① state — const [form, setForm] = useState({ name: "", message: "" }); const [entries, setEntries] = useState([]).',
              '② onChange — setForm({ ...form, [e.target.name]: e.target.value }). input엔 name="name"·name="message"를 꼭 준다.',
              '③ onSubmit — e.preventDefault() → if (form.name.trim() === "") return(이름 필수) → setEntries([...entries, form]) → 입력 비우기.',
              '④ 확인 — 이름 없이 남기기를 누르면 막히고, 이름을 넣으면 목록에 쌓인다.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
