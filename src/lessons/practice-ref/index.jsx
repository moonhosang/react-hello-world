// 📝 챕터 연습 · Ref (config)
// 챕터 14(useRef) 종합 — 완성물 하나(포커스 + 리렌더 없는 클릭 수 세기)를
// 채워주는 양만 줄여가며 5단계로. 단계별 사이드바 항목으로 쪼개려고 데이터만 내보낸다.

import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeCount from './practiceCount.jsx'
import PracticeCountFull from './practiceCountFull.jsx'
import PracticeHard from './practiceHard.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionFocusRef from './solution.jsx'
import SolutionClearInput from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: 'Ref',
  header: 'useRef로 진짜 DOM을 만지고(focus), 화면과 무관한 값을 리렌더 없이 보관해 본다.',
  goal: "useRef로 input 포커스와 '리렌더 없는 값 기억'을 손에 익힌다.",
  builds: '13단계',
  solution: <SolutionFocusRef />,
  solutionFile: 'practice-ref/solution.jsx',
  levels: [
          {
            label: '아주 쉬움',
            point: '빈 곳 한 줄만 — ref.current로 DOM을 직접 부른다.',
            file: 'practice-ref/practiceEasy.jsx',
            task: '포커스 버튼을 누르면 입력창에 커서가 가게, onFocus 안 한 줄만 채우자.',
            hints: [
              '① 먼저 체험 — 지금은 버튼을 눌러도 입력창에 커서가 안 간다. 이게 고칠 문제다.',
              '② 어디 — practiceEasy.jsx의 onFocus 함수 안 🟢 TODO. ref는 이미 <input>에 연결돼 있다.',
              '③ 어떻게 — inputRef.current.focus(). ref.current가 진짜 DOM이라 focus()를 직접 부른다.',
              '④ 확인 — 버튼을 누르면 입력창에 커서가 깜빡인다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '쉬움',
            point: 'ref를 실제 DOM에 연결하는 한 곳을 채운다.',
            file: 'practice-ref/practiceMedium.jsx',
            task: 'ref를 입력창에 연결하자. <input>에 ref={inputRef}가 빠져 포커스가 안 먹는다.',
            hints: [
              '① 무엇·왜 — useRef 상자를 만들어도 <input>에 ref로 연결하지 않으면 current가 비어 있어 focus()가 안 된다.',
              '② 어디 — practiceMedium.jsx의 <input> 위 🟡 TODO. 포커스 로직(onFocus)은 이미 있다.',
              '③ 어떻게 — <input ref={inputRef} ... />처럼 ref 속성을 붙여 실제 DOM을 inputRef.current에 담는다.',
              '④ 확인 — 연결하면 버튼을 눌렀을 때 입력창에 커서가 간다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '중간',
            point: '리렌더 없는 값을 이벤트에서 직접 바꿔 본다.',
            file: 'practice-ref/practiceCount.jsx',
            task: '리렌더 없는 값(clicksRef)을 쓰자. 포커스는 완성돼 있고, count 안 한 곳만 채운다.',
            hints: [
              '① 무엇·왜 — clicksRef 같은 ref는 값이 바뀌어도 화면을 다시 그리지 않는다. "화면과 무관한 값"을 담기 좋다.',
              '② 어디 — practiceCount.jsx의 count 함수 안 🔴 TODO. clicksRef 상자는 이미 만들어 뒀다.',
              '③ 어떻게 — clicksRef.current += 1; alert(`버튼을 ${clicksRef.current}번 눌렀다 (리렌더 없음)`).',
              '④ 확인 — 세기 버튼을 눌러도 화면은 그대로고, 누적 횟수만 alert로 뜬다.',
            ],
            node: <PracticeCount />,
          },
          {
            label: '어려움',
            point: '보관함 선언부터 값 변경까지 스스로.',
            file: 'practice-ref/practiceCountFull.jsx',
            task: '이번엔 보관함부터 직접. clicksRef 상자를 만들고(TODO A), count도 채우자(TODO B).',
            hints: [
              '① 상자(TODO A) — const clicksRef = useRef(0). 화면과 무관한 값이라 state가 아니라 ref로 둔다.',
              '② 값 변경(TODO B) — clicksRef.current += 1 후 alert로 누적 횟수를 보여준다.',
              '③ 포커스는 이미 완성돼 있으니 clicksRef 두 곳만 채우면 된다.',
              '④ 확인 — 세기 버튼이 화면 변화 없이 누적 횟수를 alert로 보여준다.',
            ],
            node: <PracticeCountFull />,
          },
          {
            label: '처음부터',
            point: '빈 화면에서 설계부터 스스로 만들어 전체를 완성한다.',
            file: 'practice-ref/practiceHard.jsx',
            task: '껍데기만 있다. useRef로 input 포커스 + 리렌더 없이 클릭 수 세기를 처음부터 만들자.',
            hints: [
              '① 참조 — const inputRef = useRef(null)을 만들고 <input ref={inputRef} />로 연결.',
              '② 포커스 — const focus = () => inputRef.current.focus(). 버튼 onClick에 연결.',
              '③ 리렌더 없는 값 — const clicksRef = useRef(0)을 두고, 버튼 클릭 시 clicksRef.current += 1 후 alert로 보여준다. state가 아니라 ref라 화면은 다시 안 그려진다.',
              '④ 확인 — 포커스 버튼은 커서를 옮기고, 세기 버튼은 화면 변화 없이 누적 횟수를 alert로 보여준다.',
            ],
            node: <PracticeHard />,
          },
          {
            label: '처음부터 (다른 예시)',
            point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
            file: 'practice-ref/practiceL6.jsx',
            task: "이번엔 '검색어 지우기'다. useRef로 input을 참조해, [지우기]를 누르면 값을 비우고 다시 포커스하자.",
            hints: [
              '① 참조 — useRef를 import하고 const inputRef = useRef(null)을 만든다.',
              '② 연결 — <input ref={inputRef} value={text} onChange={...} />로 실제 DOM을 담는다.',
              '③ 지우기 — 버튼 onClick에서 setText("")로 비우고 inputRef.current.focus()로 다시 포커스.',
              '④ 확인 — 입력 후 [지우기]를 누르면 값이 비워지고 커서가 다시 입력창으로 간다. 👀 정답 보기로 비교하라.',
            ],
            node: <PracticeL6 />,
            solution: <SolutionClearInput />,
            solutionFile: 'practice-ref/solutionAlt.jsx',
          },
  ],
}
export default PRACTICE
