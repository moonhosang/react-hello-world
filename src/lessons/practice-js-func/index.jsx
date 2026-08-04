// 📝 종합연습 · JS 함수는 값이다 (config)
// 같은 '두 번 인사'를 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionFuncValue from './solution.jsx'
import SolutionFuncMap from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: 'JS·함수값',
  header: '함수는 값이다 — 변수에 담고(sayHi), 콜백으로 넘기고(doTwice(sayHi)), 두 번 실행한다.',
  goal: '함수를 값으로 다뤄 콜백(doTwice)에 넘기고 실행하는 흐름을 완성한다.',
  builds: 'JS 3',
  solution: <SolutionFuncValue />,
  solutionFile: 'practice-js-func/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 버튼 onClick 한 줄만 채운다.',
      file: 'practice-js-func/practiceL1.jsx',
      task: 'sayHi·doTwice는 있다. 버튼을 누르면 doTwice(sayHi)가 불리게 onClick만 채우자.',
      hints: [
        '① 어디 — practiceL1.jsx의 "두 번 인사" 버튼 onClick.',
        '② 어떻게 — onClick={() => doTwice(sayHi)}. sayHi를 괄호 없이 넘긴다(실행이 아니라 넘기기).',
        '③ 확인 — 누르면 "👋 안녕!"이 두 줄씩 쌓인다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '콜백을 두 번 실행하는 한 줄을 직접 쓴다.',
      file: 'practice-js-func/practiceL2.jsx',
      task: 'doTwice 본문이 비어 있다. 받은 함수(fn)를 두 번 실행하게 채우자.',
      hints: [
        '① 무엇·왜 — doTwice(fn)는 "함수를 받아 대신 부르는" 콜백 실행이다.',
        '② 어디 — practiceL2.jsx의 doTwice 안 🟡 TODO.',
        '③ 어떻게 — fn(); fn(). 괄호 ()가 실행 스위치다.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: 'doTwice 함수와 버튼 연결을 스스로 만든다.',
      file: 'practice-js-func/practiceL3.jsx',
      task: 'doTwice 함수를 만들고, 버튼에서 sayHi를 넘겨 부르자.',
      hints: [
        '① TODO A — const doTwice = (fn) => { fn(); fn() }.',
        '② TODO B — 버튼 onClick={() => doTwice(sayHi)}.',
        '③ 확인 — 로그가 두 줄씩 쌓인다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '함수 값(sayHi)과 콜백(doTwice)을 둘 다 만든다.',
      file: 'practice-js-func/practiceL4.jsx',
      task: 'push만 있다. sayHi·doTwice를 만들고 버튼에 연결하자.',
      hints: [
        '① TODO A — const sayHi = () => push("👋 안녕!").',
        '② TODO B — const doTwice = (fn) => { fn(); fn() }.',
        '③ TODO C — 버튼 onClick={() => doTwice(sayHi)}.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 처음부터 만든다.',
      file: 'practice-js-func/practiceL5.jsx',
      task: '껍데기만 있다. sayHi 담기 → doTwice로 넘기기 → 두 번 실행을 처음부터 완성하자.',
      hints: [
        '① sayHi — const sayHi = () => push("👋 안녕!").',
        '② doTwice — const doTwice = (fn) => { fn(); fn() }.',
        '③ 연결 — 버튼 onClick={() => doTwice(sayHi)}. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'practice-js-func/practiceL6.jsx',
      task: "이번엔 함수를 map에 '넘겨' 보자. double을 만들고 [1,2,3].map(double)로 [2,4,6]을 만들자.",
      hints: [
        '① double — const double = (n) => n * 2. 함수를 값으로 만든다.',
        "② 넘기기 — nums.map(double). double을 괄호 없이 넘기면 map이 원소마다 대신 부른다.",
        '③ onClick={fn}과 똑같은 넘기기다 — 실행(double())이 아니라 함수 자체를 넘긴다.',
        '④ 확인 — 결과가 [2, 4, 6]으로 나온다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionFuncMap />,
      solutionFile: 'practice-js-func/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
