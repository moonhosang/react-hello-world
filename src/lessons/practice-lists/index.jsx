// 📝 챕터 연습 · 리스트 렌더링 (config)
// 같은 '태그 목록'을 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionTagList from './solution.jsx'
import SolutionTodoList from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: '리스트',
  header: '배열 state를 map으로 목록(<li>)에 그리고, key·항목 추가·빈 목록 안내까지 담은 태그 목록을 만든다.',
  goal: '배열 state를 map+key로 렌더하고, 불변하게 항목을 추가하는 태그 목록을 완성한다.',
  builds: '6단계 · JS 5(map·filter)',
  solution: <SolutionTagList />,
  solutionFile: 'practice-lists/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: 'map 콜백에서 <li> 한 줄만 반환한다.',
      file: 'practice-lists/practiceL1.jsx',
      task: '목록이 안 보인다. map 콜백에서 각 tag를 <li>로 반환하자(key 포함).',
      hints: [
        '① 어디 — practiceL1.jsx의 tags.map((tag, i) => { ... }) 안 🟢 TODO.',
        '② 어떻게 — return <li key={i}>#{tag}</li>. 목록의 각 항목엔 고유 key가 필요하다.',
        '③ 확인 — 리액트·JS 두 태그가 목록으로 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '배열에 항목을 불변하게 추가한다.',
      file: 'practice-lists/practiceL2.jsx',
      task: '목록은 나오는데 추가가 안 된다. add 안 한 줄을 채우자.',
      hints: [
        '① 무엇·왜 — 배열 state는 원본을 건드리지 말고 새 배열로 바꾼다. push는 안 된다.',
        '② 어디 — practiceL2.jsx의 add 안 🟡 TODO.',
        '③ 어떻게 — setTags((list) => [...list, t]). 기존을 펼치고 t를 뒤에 붙인 새 배열.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: 'add 본문과 목록 렌더(조건부 포함)를 직접 쓴다.',
      file: 'practice-lists/practiceL3.jsx',
      task: 'add 본문과, 목록을 그리는 부분(빈 목록 안내 포함)을 채우자.',
      hints: [
        '① TODO A — setTags((list) => [...list, t]).',
        '② TODO B — tags.length === 0 ? <p className="demo-desc">안내</p> : <ul className="section-list">{tags.map((tag, i) => <li key={i}>#{tag}</li>)}</ul>.',
        '③ 확인 — 태그를 다 지우면 안내가 뜨고, 추가하면 목록이 나온다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: 'state만 두고 함수와 화면을 만든다.',
      file: 'practice-lists/practiceL4.jsx',
      task: 'state만 있다. add 함수와 화면(입력·추가·목록·빈 안내)을 직접 만들자.',
      hints: [
        '① TODO A — const add = () => { const t = text.trim(); if (!t) return; setTags((l) => [...l, t]); setText("") }.',
        '② TODO B — <input value={text} onChange={(e) => setText(e.target.value)} /> + <button onClick={add}>추가</button>.',
        '③ TODO B — 목록: tags.length === 0 ? 안내 : <ul>{tags.map((tag, i) => <li key={i}>#{tag}</li>)}</ul>.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 처음부터 전부 만든다.',
      file: 'practice-lists/practiceL5.jsx',
      task: '껍데기만 있다. 태그 목록을 처음부터 만들자(배열 state + 추가 + map/key + 빈 안내).',
      hints: [
        '① state — const [tags, setTags] = useState(["리액트", "JS"]); const [text, setText] = useState("").',
        '② add — 입력값을 다듬어 [...tags, t]로 추가하고 입력 비우기.',
        '③ 화면 — 입력창·추가 버튼·목록(map+key)·빈 목록 안내. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'practice-lists/practiceL6.jsx',
      task: '이번엔 "할 일 목록"을 처음부터 만들자 — 태그 목록과 같은 기술(배열 state·추가·map/key·빈 안내), 소재만 다르다.',
      hints: [
        '① state — const [todos, setTodos] = useState(["리액트 공부", "산책"]); const [text, setText] = useState("").',
        '② add — 입력값을 다듬어 [...todos, t]로 추가하고 입력 비우기.',
        '③ 화면 — 입력창·추가 버튼·목록(map+key)·빈 목록 안내.',
        '④ 확인 — 태그 목록 때와 구조가 똑같다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionTodoList />,
      solutionFile: 'practice-lists/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
