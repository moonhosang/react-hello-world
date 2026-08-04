// 📝 종합연습 · JS 배열(map·filter) (config)
// 같은 '상품 목록'을 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 config를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionShop from './solution.jsx'

const PRACTICE = {
  shortTitle: 'JS·배열',
  header: 'map으로 목록을 변환하고 filter로 걸러 상품 목록을 만든다.',
  goal: 'filter(재고 있는 것만)와 map(세일가 목록)으로 상품 목록을 완성한다.',
  builds: 'JS 5 · map·filter',
  solution: <SolutionShop />,
  solutionFile: 'practice-js-array/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 계산 한 곳만 채운다.',
      file: 'practice-js-array/practiceL1.jsx',
      task: '목록은 나오는데 정가다. 세일가(10% 할인) 한 곳만 고치자.',
      hints: [
        '① 어디 — practiceL1.jsx의 <li> 안 {p.price}.',
        '② 어떻게 — p.price * 0.9 로 바꾼다.',
        '③ 확인 — 값이 10% 낮아진다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: 'map 콜백이 <li>를 반환하도록 직접 쓴다.',
      file: 'practice-js-array/practiceL2.jsx',
      task: 'map 콜백이 지금 null을 반환해 목록이 비어 있다. <li>를 반환하자(key 포함).',
      hints: [
        '① 어디 — practiceL2.jsx의 map 콜백 안 🟡 TODO.',
        '② 어떻게 — return <li key={p.name}>{p.name} — {p.price * 0.9}원 (재고 {p.stock})</li>.',
        '③ key — 목록의 각 항목엔 고유 key를 준다(여기선 p.name).',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: 'filter와 map을 둘 다 스스로 쓴다.',
      file: 'practice-js-array/practiceL3.jsx',
      task: '재고 필터와 목록 만들기가 둘 다 비어 있다. filter → map 순으로 채우자.',
      hints: [
        '① TODO A — const inStock = PRODUCTS.filter((p) => p.stock > 0).',
        '② TODO B — {inStock.map((p) => <li key={p.name}>{p.name} — {p.price * 0.9}원 (재고 {p.stock})</li>)}.',
        '③ 확인 — 재고 0인 항목은 사라지고, 나머지만 세일가로 뜬다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '데이터만 있는 상태에서 전부 만든다.',
      file: 'practice-js-array/practiceL4.jsx',
      task: '데이터(PRODUCTS)만 있다. 재고 필터 → 세일가 목록까지 직접 만들자.',
      hints: [
        '① filter — const inStock = PRODUCTS.filter((p) => p.stock > 0).',
        '② map — <ul> 안에 {inStock.map((p) => <li key={p.name}>…</li>)}.',
        '③ 세일가 — p.price * 0.9.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 데이터부터 처음까지.',
      file: 'practice-js-array/practiceL5.jsx',
      task: '껍데기만 있다. 상품 배열부터 두고, 재고 필터 + 세일가 목록을 처음부터 만들자.',
      hints: [
        '① 데이터 — const PRODUCTS = [{ name, price, stock }, …].',
        '② 처리 — PRODUCTS.filter(재고>0) → map으로 <li key=…>.',
        '③ 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
