// 📝 챕터 연습 · 폼 입력 응용 — 단계별 데이터(config)
// 같은 '방명록'을 스캐폴딩만 줄여가며 5단계로. 완성물은 모두 같다(solution.jsx).
// 사이드바에선 PracticeStep이 각 단계를 독립 항목으로 렌더한다.

import PracticeEasy from './practiceEasy.jsx'
import PracticeStep2 from './practiceStep2.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeStep4 from './practiceStep4.jsx'
import PracticeHard from './practiceHard.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionGuestbook from './solution.jsx'
import SolutionAlt from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: '폼',
  header: "객체 state·공통 onChange·제출(preventDefault)을 직접 손으로 써 '방명록'을 만든다.",
  goal: "객체 state·공통 onChange·제출을 이어 '방명록'을 완성한다.",
  builds: '7-1 · 7-2 · 7-3',
  solution: <SolutionGuestbook />,
  solutionFile: 'practice-forms/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '공통 onChange 한 줄만 채운다.',
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
      label: '쉬움',
      point: '제출을 완성한다(막기·추가·비우기).',
      file: 'practice-forms/practiceStep2.jsx',
      task: '제출을 완성하자. 새로고침을 막고, 입력을 방명록 목록에 추가한 뒤 입력창을 비운다.',
      hints: [
        '① 무엇·왜 — form의 onSubmit은 그냥 두면 페이지가 새로고침된다. e.preventDefault()로 막아야 한다.',
        '② 어디 — practiceStep2.jsx의 handleSubmit 안 🟡 TODO 1~3.',
        '③ 어떻게 — e.preventDefault() → setEntries([...entries, form]) → setForm({ name: "", message: "" }).',
        '④ 확인 — 남기기를 누르면 목록에 한 줄 쌓이고 입력창이 비워진다.',
      ],
      node: <PracticeStep2 />,
    },
    {
      label: '중간',
      point: '검증(이름 필수) 한 줄을 더한다.',
      file: 'practice-forms/practiceMedium.jsx',
      task: '제출까지 됐다. "이름이 비면 막기" 검증 한 줄을 더하자.',
      hints: [
        '① 무엇·왜 — 잘못된 입력을 목록에 넣기 전에 걸러야 한다. 이름은 필수로.',
        '② 어디 — practiceMedium.jsx의 handleSubmit, preventDefault 다음 🔴 TODO.',
        '③ 어떻게 — if (form.name.trim() === "") return. (빈 이름이면 여기서 멈춘다)',
        '④ 확인 — 이름 없이 남기기를 누르면 아무 일도 안 일어난다.',
      ],
      node: <PracticeMedium />,
    },
    {
      label: '어려움',
      point: '빈 목록 안내를 조건부로 그린다.',
      file: 'practice-forms/practiceStep4.jsx',
      task: '로직은 다 됐다. 목록이 비었을 때 안내 문구를 조건부로 보여주자.',
      hints: [
        '① 무엇·왜 — 목록이 비면 빈 <ul>만 남아 허전하다. 파생 상태(entries.length)로 화면을 나눈다.',
        '② 어디 — practiceStep4.jsx의 <ul> 안 🟣 TODO.',
        '③ 어떻게 — {entries.length === 0 ? <li className="demo-desc">아직 방명록이 비어 있다.</li> : entries.map(...)}.',
        '④ 확인 — 비면 안내가, 남기면 목록이 뜬다.',
      ],
      node: <PracticeStep4 />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 방명록 전체를 처음부터 만든다.',
      file: 'practice-forms/practiceHard.jsx',
      task: '껍데기만 있다. form 객체 state·공통 onChange·제출(이름 필수)·목록을 처음부터 만들자.',
      hints: [
        '① state — const [form, setForm] = useState({ name: "", message: "" }); const [entries, setEntries] = useState([]).',
        '② onChange — setForm({ ...form, [e.target.name]: e.target.value }). input엔 name="name"·name="message"를 꼭 준다.',
        '③ onSubmit — e.preventDefault() → if (form.name.trim() === "") return → setEntries([...entries, form]) → 입력 비우기.',
        '④ 확인 — 이름 없이는 막히고, 이름을 넣으면 목록에 쌓인다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeHard />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'practice-forms/practiceL6.jsx',
      task: '이번엔 방명록이 아니라 메모 추가 폼이다. 제목을 입력해 추가하면 목록에 쌓이게 처음부터 만들자.',
      hints: [
        '① state — const [text, setText] = useState(""); const [memos, setMemos] = useState([]).',
        '② onChange — controlled input: value={text} onChange={(e) => setText(e.target.value)}.',
        '③ onSubmit — e.preventDefault() → if (text.trim() === "") return → setMemos([...memos, text]) → setText("").',
        '④ 확인 — 제목을 넣고 추가하면 목록에 쌓이고, 빈 값은 막힌다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionAlt />,
      solutionFile: 'practice-forms/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
