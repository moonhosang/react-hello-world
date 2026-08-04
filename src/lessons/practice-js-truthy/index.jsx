// 📝 종합연습 · JS truthy/falsy (config)
// 같은 '인사·프로필 화면'을 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionTruthy from './solution.jsx'

const PRACTICE = {
  shortTitle: 'JS·truthy',
  header: "falsy를 활용한다 — 이름이 비면 기본값(name || '손님'), 로그인했을 때만 가드(user && ...).",
  goal: "|| 기본값과 && 가드로 '값이 없을 때'를 안전하게 다루는 화면을 완성한다.",
  builds: 'JS 4',
  solution: <SolutionTruthy />,
  solutionFile: 'practice-js-truthy/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '기본값 한 곳만 채운다.',
      file: 'practice-js-truthy/practiceL1.jsx',
      task: '이름을 안 넣으면 빈칸이다. 비었을 때 \'손님\'이 뜨게 한 곳만 고치자.',
      hints: [
        '① 어디 — practiceL1.jsx의 "안녕, {name}님" 부분.',
        '② 어떻게 — {name || \'손님\'}. ||는 왼쪽이 falsy(빈 문자열 등)면 오른쪽을 준다.',
        '③ 확인 — 이름을 지우면 "손님", 넣으면 그 이름이 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '&& 가드 한 줄을 직접 쓴다.',
      file: 'practice-js-truthy/practiceL2.jsx',
      task: '로그인했을 때만 프로필이 뜨도록 && 가드를 채우자.',
      hints: [
        '① 무엇·왜 — user가 없을 때 user.name을 읽으면 에러다. && 로 "있을 때만" 읽는다.',
        '② 어디 — practiceL2.jsx의 프로필 줄 🟡 TODO.',
        '③ 어떻게 — {user && <b>프로필: {user.name}</b>}. user가 null이면 아무것도 안 그린다.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '기본값(||)과 가드(&&)를 둘 다 만든다.',
      file: 'practice-js-truthy/practiceL3.jsx',
      task: '인사말과 프로필 두 줄을 규칙에 맞게 채우자.',
      hints: [
        '① TODO A — 안녕, {name || \'손님\'}님.',
        '② TODO B — {user && <b>프로필: {user.name}</b>}.',
        '③ 확인 — 이름/로그인을 바꿔 보면 두 줄이 알맞게 바뀐다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '표시 부분을 처음부터 만든다.',
      file: 'practice-js-truthy/practiceL4.jsx',
      task: '입력·버튼만 있다. 인사말(기본값)과 프로필(가드) 표시를 처음부터 만들자.',
      hints: [
        '① 인사말 — 안녕, {name || \'손님\'}님.',
        '② 프로필 — {user && <b>프로필: {user.name}</b>}.',
        '③ 원하면 {!user && <span>(로그인하면 표시)</span>}로 안내도 붙인다.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 전부 만든다.',
      file: 'practice-js-truthy/practiceL5.jsx',
      task: '껍데기만 있다. 입력·로그인·기본값·가드까지 처음부터 완성하자.',
      hints: [
        '① 입력 — <input value={name} onChange={(e) => setName(e.target.value)} />.',
        '② 로그인 — onClick={() => setUser(user ? null : { name: \'김코딩\' })}.',
        '③ 표시 — {name || \'손님\'}, {user && ...}. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
