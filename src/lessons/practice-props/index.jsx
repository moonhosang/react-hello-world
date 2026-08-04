// 📝 챕터 연습 · Props (config)
// 같은 '가격표(PriceTag)'를 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionPriceTags from './solution.jsx'
import SolutionProfileBadges from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: 'Props',
  header: 'props로 값을 받아 그리는 가격표(PriceTag)를 만들고, 값만 바꿔 여러 번 재사용한다.',
  goal: 'props로 emoji·name·price를 받는 PriceTag를 만들어 4개를 재사용한다.',
  builds: '2-1 · 2-2',
  solution: <SolutionPriceTags />,
  solutionFile: 'practice-props/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 컴포넌트에서 한 줄만 채운다.',
      file: 'practice-props/practiceL1.jsx',
      task: '가격표에 이모지·이름은 나오는데 가격이 안 보인다. price를 보여주는 한 줄만 채우자.',
      hints: [
        '① 어디 — practiceL1.jsx의 PriceTag 안, 이름 <b> 다음의 🟢 TODO.',
        '② 어떻게 — <span style={{ color: "var(--brand)" }}>{price.toLocaleString()}원</span>. JS 값은 {중괄호}로 꽂는다.',
        '③ 확인 — 4개 카드에 가격이 전부 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '숫자 props를 {중괄호}로 넘긴다.',
      file: 'practice-props/practiceL2.jsx',
      task: 'PriceTag는 완성됐는데 전부 0원이다. 각 카드에 price를 넘겨 실제 가격이 나오게 하자.',
      hints: [
        '① 무엇·왜 — 숫자·변수는 큰따옴표가 아니라 {중괄호}로 넘긴다. price="3000"(❌) vs price={3000}(✅).',
        '② 어디 — practiceL2.jsx의 각 <PriceTag …> 에 price를 더한다.',
        '③ 어떻게 — <PriceTag emoji="🍎" name="사과" price={3000} /> 처럼 4개 모두.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '완성된 컴포넌트를 값만 바꿔 재사용한다.',
      file: 'practice-props/practiceL3.jsx',
      task: 'PriceTag는 완성돼 있다. 사과 하나만 있으니, 3개를 더 만들어 4개로 재사용하자.',
      hints: [
        '① 무엇·왜 — 정의는 하나, 사용은 여러 번. 같은 PriceTag에 다른 props를 넘긴다.',
        '② 어디 — practiceL3.jsx의 return 안, 사과 아래 🔴 TODO.',
        '③ 어떻게 — <PriceTag emoji="🍌" name="바나나" price={2500} /> 처럼 포도(7000)·딸기(9000)까지.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '컴포넌트 속(return)과 재사용을 둘 다 채운다.',
      file: 'practice-props/practiceL4.jsx',
      task: 'PriceTag의 속(return)을 완성하고, 4번 재사용까지 직접 하자.',
      hints: [
        '① TODO A — PriceTag의 return을 완성한다: 이모지·이름·{price.toLocaleString()}원을 하나의 <div>로 감싼다.',
        '② TODO B — 아래에서 PriceTag를 4번, 다른 값으로 재사용한다.',
        '③ 값 — 사과 3000 · 바나나 2500 · 포도 7000 · 딸기 9000.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 컴포넌트부터 스스로 만든다.',
      file: 'practice-props/practiceL5.jsx',
      task: '껍데기만 있다. PriceTag를 처음부터 정의하고, 4번 재사용해 가격표 4개를 띄우자.',
      hints: [
        '① 정의 — function PriceTag({ emoji, name, price }) { return ( … ) }. props는 읽기만 한다.',
        '② 재사용 — return 안에서 <PriceTag … />를 4번, 다른 값으로.',
        '③ 확인 — 정의 하나로 가격표 4개가 그려진다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'practice-props/practiceL6.jsx',
      task: "이번엔 '프로필 배지'다. props로 emoji·name·status를 받는 Badge를 만들고, 값만 바꿔 여러 번 재사용하자.",
      hints: [
        '① 정의 — function Badge({ emoji, name, status }) { return ( … ) }. 하나의 <div>로 감싸고 {중괄호}로 값을 꽂는다.',
        '② 재사용 — return 안에서 <Badge emoji="👩‍💻" name="김코딩" status="온라인" />처럼 3~4개.',
        '③ 확인 — 정의 하나로 배지 여러 개가 그려진다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionProfileBadges />,
      solutionFile: 'practice-props/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
