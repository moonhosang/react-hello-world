// 📝 챕터 연습 · 훅(Hook) (config)
// 같은 '전등 토글'을 스캐폴딩만 줄여가며 5단계로. 커스텀 훅 useToggle을 만들어 쓴다.
// 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionToggle from './solution.jsx'

const PRACTICE = {
  shortTitle: '훅',
  header: "커스텀 훅 useToggle을 만들어 on/off '전등 토글'을 완성한다.",
  goal: 'useState를 감싼 커스텀 훅 useToggle을 만들어, 컴포넌트에서 한 줄로 재사용한다.',
  builds: '5-1 · 5-2',
  solution: <SolutionToggle />,
  solutionFile: 'practice-hooks/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 버튼 연결 한 줄만 채운다.',
      file: 'practice-hooks/practiceL1.jsx',
      task: 'useToggle은 다 됐다. 버튼을 눌러도 반응이 없다 — 버튼에 onClick 한 줄만 붙이자.',
      hints: [
        '① 어디 — practiceL1.jsx의 <button>에 onClick이 빠져 있는 🟢 자리.',
        '② 어떻게 — onClick={toggle}. useToggle이 돌려준 toggle을 그대로 연결한다.',
        '③ 확인 — 버튼을 누르면 💡/🌙이 바뀐다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '커스텀 훅의 반환값을 구조 분해로 받는다.',
      file: 'practice-hooks/practiceL2.jsx',
      task: 'useToggle을 호출해 반환값을 [on, toggle]로 구조 분해해 받자.',
      hints: [
        '① 무엇·왜 — 커스텀 훅은 배열로 값을 돌려주고, useState처럼 구조 분해로 받는다.',
        '② 어디 — practiceL2.jsx의 자리표시자(const on = false … toggle = undefined) 🟡 줄.',
        '③ 어떻게 — 그 두 줄을 const [on, toggle] = useToggle(false) 한 줄로 바꾼다. (반드시 컴포넌트 최상위에서)',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '커스텀 훅의 속(useState + toggle)을 직접 채운다.',
      file: 'practice-hooks/practiceL3.jsx',
      task: 'useToggle의 속이 비어 있다. useState로 on을 만들고 toggle을 반환하게 채우자.',
      hints: [
        '① 무엇·왜 — 커스텀 훅도 그냥 함수다. 안에서 useState 같은 훅을 최상위에서 부르고, 필요한 값을 배열로 돌려준다.',
        '② 어디 — practiceL3.jsx의 useToggle 안 🔴 TODO(지금은 [false, () => {}] 반환).',
        '③ 어떻게 — const [on, setOn] = useState(initial); const toggle = () => setOn((v) => !v); return [on, toggle].',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '커스텀 훅 정의와 사용을 둘 다 만든다.',
      file: 'practice-hooks/practiceL4.jsx',
      task: 'useToggle 정의(TODO A)와, 컴포넌트에서 그걸 쓰는 부분(TODO B)을 둘 다 채우자.',
      hints: [
        '① TODO A — useToggle 안: const [on, setOn] = useState(initial); const toggle = () => setOn((v) => !v); return [on, toggle].',
        '② TODO B — 컴포넌트 최상위에서 const [on, toggle] = useToggle(false).',
        '③ 확인 — 두 곳을 이으면 버튼이 살아나 💡/🌙이 바뀐다.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 커스텀 훅부터 처음까지.',
      file: 'practice-hooks/practiceL5.jsx',
      task: '껍데기만 있다. useToggle 커스텀 훅을 만들고, 그걸 써서 전등 토글을 처음부터 완성하자.',
      hints: [
        '① 훅 — function useToggle(initial = false) { const [on, setOn] = useState(initial); const toggle = () => setOn((v) => !v); return [on, toggle] }.',
        '② 사용 — 컴포넌트 최상위에서 const [on, toggle] = useToggle(false). (조건문·반복문 안에서 부르면 훅 규칙 위반)',
        '③ 마크업 — {on ? "💡 켜짐" : "🌙 꺼짐"}와 버튼(onClick={toggle}). 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
