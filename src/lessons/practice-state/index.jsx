// 📝 챕터 연습 · 상태(State) (config)
// 같은 '좋아요 카드'를 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionLikeCard from './solution.jsx'

const PRACTICE = {
  shortTitle: '상태',
  header: "숫자·불리언·객체 state를 이벤트와 이어 '좋아요 카드'를 만든다.",
  goal: "객체 state 하나로 liked·likes를 관리하는 '좋아요 카드'를 완성한다.",
  builds: '3-1 · 3-2',
  solution: <SolutionLikeCard />,
  solutionFile: 'practice-state/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 딱 한 줄만 채운다.',
      file: 'practice-state/practiceL1.jsx',
      task: '하트는 바뀌는데 숫자가 안 오른다. toggle 안 likes 한 줄만 고치자.',
      hints: [
        '① 어디 — practiceL1.jsx의 setCard 안, likes: c.likes 라고 된 🟢 줄.',
        '② 어떻게 — likes: c.liked ? c.likes - 1 : c.likes + 1. (켜질 때 +1, 꺼질 때 -1)',
        '③ 확인 — 좋아요를 누르면 하트와 함께 숫자가 오르내린다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '핵심 한 줄(새 객체 만들기)을 직접 쓴다.',
      file: 'practice-state/practiceL2.jsx',
      task: 'toggle 안이 비어 있다. setCard로 새 객체를 넘겨 하트·숫자를 바꾸자.',
      hints: [
        '① 무엇·왜 — 객체 state는 통째로 새 객체를 넣는다. { ...c, 바뀐 필드 }로.',
        '② 어디 — practiceL2.jsx의 toggle 안 🟡 TODO.',
        '③ 어떻게 — setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 })).',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: 'toggle 함수와 이벤트 연결을 스스로 만든다.',
      file: 'practice-state/practiceL3.jsx',
      task: 'toggle 함수를 만들고, 버튼에 onClick으로 연결하자.',
      hints: [
        '① TODO A — const toggle = () => setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 })).',
        '② TODO B — 버튼에 onClick={toggle}을 붙인다.',
        '③ 확인 — 버튼이 살아나 하트·숫자가 바뀐다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '고정된 화면을 state로 살려 낸다.',
      file: 'practice-state/practiceL4.jsx',
      task: '고정된 겉모습만 있다. state와 toggle을 만들어 실제로 움직이게 하자.',
      hints: [
        '① TODO A — useState를 import하고 const [card, setCard] = useState({ liked: false, likes: 0 }).',
        '② TODO B — toggle 함수(liked 반대·likes ±1).',
        '③ TODO C — 🤍/0/className/버튼을 card·toggle을 쓰도록 바꾼다: {card.liked ? "❤️" : "🤍"} {card.likes}, onClick={toggle}.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 처음부터 전부 만든다.',
      file: 'practice-state/practiceL5.jsx',
      task: '껍데기만 있다. 좋아요 카드를 처음부터 만들자(객체 state + 토글 + 마크업).',
      hints: [
        '① state — const [card, setCard] = useState({ liked: false, likes: 0 }).',
        '② toggle — setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 })).',
        '③ 마크업 — {card.liked ? "❤️" : "🤍"} {card.likes}와 버튼(onClick={toggle}). 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
