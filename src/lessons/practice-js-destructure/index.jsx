// 📝 종합연습 · JS 구조 분해·스프레드 (config)
// 같은 '프로필'을 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 config를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionProfile from './solution.jsx'

const PRACTICE = {
  shortTitle: 'JS·구조분해',
  header: '구조 분해로 값을 꺼내고, 스프레드로 새 객체를 만든다.',
  goal: '구조 분해({name, age})와 스프레드({...user, city})로 프로필을 완성한다.',
  builds: 'JS 6 · 구조 분해·스프레드',
  solution: <SolutionProfile />,
  solutionFile: 'practice-js-destructure/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 한 값만 채운다.',
      file: 'practice-js-destructure/practiceL1.jsx',
      task: '도시가 비어 있다. 스프레드로 추가하는 city 값 한 곳만 채우자.',
      hints: [
        "① 어디 — practiceL1.jsx의 { ...user, city: '' }.",
        "② 어떻게 — city: '서울' 로 바꾼다.",
        '③ 확인 — "도시 추가"에 서울이 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '구조 분해 한 줄을 직접 쓴다.',
      file: 'practice-js-destructure/practiceL2.jsx',
      task: 'name·age가 비어 있다. user에서 구조 분해로 꺼내자.',
      hints: [
        '① 어디 — practiceL2.jsx의 const name = "", age = 0 자리(🟡 TODO).',
        '② 어떻게 — const { name, age } = user 로 바꾼다.',
        '③ 확인 — 민지·20살이 뜬다.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '구조 분해와 스프레드를 둘 다 쓴다.',
      file: 'practice-js-destructure/practiceL3.jsx',
      task: '구조 분해와 스프레드가 둘 다 자리표시자다. 둘 다 제대로 쓰자.',
      hints: [
        '① TODO A — const { name, age } = user.',
        "② TODO B — const updated = { ...user, city: '서울' }. (...user로 기존 필드를 복사하고 city를 더한다)",
        '③ 확인 — 이름·나이·도시가 모두 뜬다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: 'user만 있는 상태에서 전부 만든다.',
      file: 'practice-js-destructure/practiceL4.jsx',
      task: 'user만 있다. 구조 분해·스프레드·표시를 직접 만들자.',
      hints: [
        '① const { name, age } = user.',
        "② const updated = { ...user, city: '서울' }.",
        '③ 화면에 {name} · {age}살 · {updated.city}를 표시한다.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 user부터 처음까지.',
      file: 'practice-js-destructure/practiceL5.jsx',
      task: '껍데기만 있다. user 객체부터 두고, 구조 분해 + 스프레드로 프로필을 만들자.',
      hints: [
        '① const user = { name: "민지", age: 20 }.',
        "② const { name, age } = user; const updated = { ...user, city: '서울' }.",
        '③ 화면에 표시. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
