// 🛠️ Lv2-1 · 장바구니 '조립'
// app-cart(Lv2-2)는 로직 전체가 부담이니, 앞에 '조립만' 하는 완만한 진입 단계를 둔다.
// state·핸들러는 주어지고, 학습자는 완성된 조각을 배치하고 props/콜백으로 연결만 한다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import AssembleCartEasy from './practiceEasy.jsx'
import AssembleCartMedium from './practiceMedium.jsx'
import AssembleCartHard from './practiceHard.jsx'
import SolutionAssembly from './solutionAssembly.jsx'

export default function AssembleCart() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🛠️ Lv2-1 · 조립</span>
        <h2>장바구니 — 조립하기</h2>
        <p>
          로직(담기·수량·삭제·합계)은 <b>이미 다 돼 있다.</b> 완성된 조각(<code>ProductList</code>·<code>CartItem</code>·<code>CartSummary</code>)을
          <b> 배치하고 props/콜백으로 연결</b>만 한다. 로직까지 직접 만드는 건 <b>Lv2-2</b>에서.
        </p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          부모가 <b>state를 소유</b>하고, 자식에겐 <b>props로 데이터를 내리고</b> <b>콜백으로 이벤트를 받는다</b>.
          작은 조각을 어떻게 이어 하나의 앱이 되는지 — <b>앱 규모의 데이터 흐름</b>을 '조립'으로 익힌다.
        </p>
      </div>

      <PracticeLevels
        goal="완성된 조각을 배치·연결해 장바구니 화면을 조립한다. (로직은 주어짐)"
        solutionFile="apps/app-cart/Cart.jsx"
        solution={<SolutionAssembly />}
        levels={[
          {
            label: '쉬움',
            file: 'app-assemble-cart/practiceEasy.jsx',
            task: '로직·조각은 다 놓여 있다. 맨 아래 합계(CartSummary) 한 줄만 배치·연결하자.',
            hints: [
              '① 어디 — practiceEasy.jsx의 return 맨 끝 🟢 TODO.',
              '② 어떻게 — <CartSummary totalCount={totalCount} totalPrice={totalPrice} />. 계산은 이미 위에서 끝났고, 값만 넘겨 표시만 시킨다.',
              '③ 확인 — 상품을 담으면 맨 아래 합계 줄이 뜬다.',
            ],
            node: <AssembleCartEasy />,
          },
          {
            label: '중간',
            file: 'app-assemble-cart/practiceMedium.jsx',
            task: '조각은 놓였지만 연결이 비었다(자리표시자라 동작 안 함). onAdd·onInc·onDec·onRemove·합계 props를 이어 살리자.',
            hints: [
              '① onAdd — <ProductList onAdd={addToCart} />: 담기 이벤트를 부모의 addToCart로 올린다.',
              '② CartItem — onInc={increase} onDec={decrease} onRemove={removeItem}: 각 줄의 이벤트를 부모 함수에 연결한다.',
              '③ 합계 — <CartSummary totalCount={totalCount} totalPrice={totalPrice} />.',
              '④ 확인 — 담기·수량 +/−·삭제가 전부 동작하고 합계가 바뀐다.',
            ],
            node: <AssembleCartMedium />,
          },
          {
            label: '어려움',
            file: 'app-assemble-cart/practiceHard.jsx',
            task: '빈 화면이다. 로직은 다 주어졌다. ProductList·목록(CartItem)·CartSummary를 처음부터 조립하자.',
            hints: [
              '① 상품 목록 — <ProductList onAdd={addToCart} />를 맨 위에.',
              '② 목록 — cart.length === 0 ? 안내 : <ul>{cart.map(item => <CartItem key={item.id} item={item} onInc={increase} onDec={decrease} onRemove={removeItem} />)}</ul>.',
              '③ 합계 — <CartSummary totalCount={totalCount} totalPrice={totalPrice} />.',
              '④ 👀 정답 보기(app-cart/Cart.jsx)로 배치를 비교하라.',
            ],
            node: <AssembleCartHard />,
          },
        ]}
      />
    </section>
  )
}
