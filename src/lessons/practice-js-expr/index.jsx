// 📝 종합연습 · JS 표현식 (config)
// 값을 만드는 '식'(곱셈·덧셈)과 템플릿 리터럴로 주문 총액 카드를 만든다. 5단계, 스캐폴딩만 감소.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import PracticeL6 from './practiceL6.jsx'
import SolutionExpr from './solution.jsx'
import SolutionCircle from './solutionAlt.jsx'

const PRACTICE = {
  shortTitle: 'JS·표현식',
  header: '값을 만드는 식(가격×수량+배송비)과 템플릿 리터럴로 주문 총액 카드를 만든다.',
  goal: '곱셈·덧셈 식과 백틱 템플릿 리터럴로 총액과 안내 문구를 완성한다.',
  builds: 'JS 1',
  solution: <SolutionExpr />,
  solutionFile: 'practice-js-expr/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '값을 만드는 식 한 줄만 채운다.',
      file: 'practice-js-expr/practiceL1.jsx',
      task: '총액이 0원으로 나온다. total 식 한 줄(가격×수량+배송비)만 채우자.',
      hints: [
        '① 어디 — practiceL1.jsx의 const total = 0 줄.',
        '② 어떻게 — total = price * qty + ship. (곱셈이 덧셈보다 먼저 계산된다)',
        '③ 확인 — 🧾 39000원이 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '템플릿 리터럴(백틱)로 문자열을 만든다.',
      file: 'practice-js-expr/practiceL2.jsx',
      task: '안내 문구가 비어 있다. 템플릿 리터럴로 message를 만들자.',
      hints: [
        '① 무엇 — 백틱 ` ` 안에서 ${ } 로 값을 끼운다.',
        '② 어떻게 — message = `${name}님, 주문 총액은 ${total}원입니다.`',
        '③ 확인 — "민지님, 주문 총액은 39000원입니다."가 뜬다.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '식과 문자열을 둘 다 직접 만든다.',
      file: 'practice-js-expr/practiceL3.jsx',
      task: 'total과 message 둘 다 비어 있다. 순서대로 채우자.',
      hints: [
        '① total — price * qty + ship.',
        '② message — `${name}님, 주문 총액은 ${total}원입니다.`',
        '③ 확인 — 금액과 안내 문구가 함께 뜬다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '계산부터 화면에 꽂기까지 직접.',
      file: 'practice-js-expr/practiceL4.jsx',
      task: '변수만 있다. total·message를 만들고, 화면의 0원·빈 문구 자리를 {total}·{message}로 바꾸자.',
      hints: [
        '① TODO A·B — const total = price * qty + ship; const message = `...`.',
        '② TODO C — 🧾 0원 → 🧾 {total}원.',
        '③ TODO D — 빈 <p>에 {message}를 넣는다.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '처음부터',
      point: '빈 화면에서 처음부터.',
      file: 'practice-js-expr/practiceL5.jsx',
      task: '주어진 값(price·qty·ship·name)만 있다. 총액 카드를 처음부터 만들자.',
      hints: [
        '① total = price * qty + ship.',
        '② message = `${name}님, 주문 총액은 ${total}원입니다.`',
        '③ 카드에 {total}·{message}를 표시한다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
    {
      label: '처음부터 (다른 예시)',
      point: '같은 기술을 다른 예시로 한 번 더 — 빈 화면에서 처음부터.',
      file: 'practice-js-expr/practiceL6.jsx',
      task: '이번엔 "원 넓이 계산 카드"를 처음부터 만들자 — 총액과 같은 기술(식 + 템플릿 리터럴), 소재만 다르다.',
      hints: [
        '① 주어진 값 — r(반지름)=5, pi=3.14.',
        '② area = pi * r * r.',
        '③ message = `반지름 ${r}인 원의 넓이는 ${area}입니다.`',
        '④ 카드에 {area}·{message}를 표시한다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL6 />,
      solution: <SolutionCircle />,
      solutionFile: 'practice-js-expr/solutionAlt.jsx',
    },
  ],
}
export default PRACTICE
