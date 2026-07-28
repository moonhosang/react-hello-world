// ============================================================
// 실전 앱 · Lv2 · 장바구니 (Cart)   — 파생 상태(useMemo)
// ============================================================
// 이번 앱의 핵심은 "파생 상태"다.
//   - 진짜 상태(state)는 '장바구니에 담긴 항목' 하나뿐이다.
//   - 총 개수·합계 금액처럼 그 상태에서 '계산되는 값'은 따로 state로 두지 않는다.
//     렌더할 때 useMemo로 계산해 보여줄 뿐이다.
//   - 값을 한 군데(원본 상태)에만 두면 데이터가 어긋날 일이 없다.

import Cart from './Cart.jsx'
import TechTags from '../../components/TechTags.jsx'
import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeCartEasy from './practiceEasy.jsx'
import PracticeCartMedium from './practiceMedium.jsx'
import PracticeCartHard from './practiceHard.jsx'
import SolutionCart from './solution.jsx'

export default function CartApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">실전 앱 · Lv2</span>
        <h2>장바구니</h2>
        <p>담긴 항목 하나만 state로 두고, 총 개수·합계 금액은 그때그때 계산해서 보여준다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          합계·총 개수 같은 <b>파생 값은 state로 저장하지 않는다.</b> 원본 상태(<code>cart</code>)에서
          <b> 렌더할 때 계산</b>한다. 반복 계산은 <code>useMemo</code>로 감싸 <code>cart</code>가 바뀔 때만 다시 계산한다.
          같은 값을 두 곳(원본 + 사본 state)에 두면 반드시 어긋난다 — <b>진실은 한 곳에만.</b>
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'useState', to: 3.1 },
          { label: 'useMemo(파생값)', to: 11 },
          { label: '배열 불변성', to: 5 },
          { label: '이벤트 처리', to: 3.1 },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 담기 · 수량 조절 · 삭제가 실제로 동작한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 파생 값은 저장하지 말고 계산한다</span>
      <p className="section-desc">진짜 상태는 <code>cart</code> 하나뿐이다. 정리하면:</p>
      <ul className="section-list">
        <li><b>담기</b> — 상품을 담으면 장바구니에 들어가고, 같은 상품을 또 담으면 <b>수량이 +1</b> 된다.</li>
        <li><b>수량 조절</b> — 각 항목을 <b>+/−</b>로 바꾼다. 단 최소 1까지만 내려간다.</li>
        <li><b>삭제</b> — 항목을 장바구니에서 뺀다.</li>
        <li><b>파생 값</b> — 총 개수·합계 금액은 저장하지 않고 <code>cart</code>에서 그때그때 계산한다.</li>
        <li><b>파일 구성</b> — <code>Cart.jsx</code> + <code>ProductList.jsx</code> + <code>CartItem.jsx</code> + <code>CartSummary.jsx</code>로 나뉜다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 Cart.jsx · ProductList.jsx · CartItem.jsx · CartSummary.jsx</div>
        <Cart />
      </div>

      <PracticeLevels
        solutionFile="app-cart/solution.jsx"
        solution={<SolutionCart />}
        levels={[
          {
            label: '쉬움',
            file: 'app-cart/practiceEasy.jsx',
            task: '지금은 합계 금액이 늘 0원으로 표시된다. 합계를 실제로 계산하는 한 줄을 채워 완성하자.',
            hints: [
              '① 먼저 체험 — 상품을 담아 보라. 총 개수는 늘어나는데 아래 "합계 0원"은 그대로다. 이게 우리가 채울 자리다.',
              '② 어디 — practiceEasy.jsx의 🟢 TODO 1이다. totalPrice = 0 이라고 임시로 박아 둔 줄을 고친다. 바로 위 totalCount 줄이 정답 모양이다.',
              '③ 어떻게 — 합계는 각 항목의 price × qty를 모두 더한 값이다. cart.reduce((sum, item) => sum + item.price * item.qty, 0) 를 useMemo(() => ..., [cart])로 감싸 totalPrice에 넣는다.',
              '④ 확인 — 상품을 담고 수량을 바꿔 보라. 합계가 개수·가격에 맞게 바뀐다. totalPrice는 저장하는 state가 아니라 cart를 보고 매 렌더 계산하는 값이라, 한 줄만 채워도 화면이 저절로 맞아떨어진다.',
            ],
            node: <PracticeCartEasy />,
          },
          {
            label: '중간',
            file: 'app-cart/practiceMedium.jsx',
            task: '수량 +/− 버튼이 반응하지 않고 합계도 0으로 멈춰 있다. 수량 조절과 파생 값을 채워 장바구니를 되살리자.',
            hints: [
              '① 먼저 체험 — 상품을 담고 +/− 버튼을 눌러 보라. 아무 반응이 없고, 총 개수·합계도 0에서 안 움직인다. 이 세 곳을 채운다.',
              '② 어디 — practiceMedium.jsx의 🟡 TODO 1(increase), 🟡 TODO 2(decrease), 🟡 TODO 3(totalCount·totalPrice)이다. 담기·삭제·화면은 이미 되어 있다.',
              '③ 수량 + : setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)) 로, 그 항목만 새 객체로 바꾼 새 배열을 set 한다.',
              '④ 수량 − : 같은 map이되 qty 자리에 Math.max(1, item.qty - 1) 을 쓴다. 그래야 1 밑으로 내려가지 않는다.',
              '⑤ 파생 값·확인 : totalCount = cart.reduce((s, item) => s + item.qty, 0), totalPrice = cart.reduce((s, item) => s + item.price * item.qty, 0) 를 각각 useMemo(() => ..., [cart])로 감싼다. 채운 뒤 +/−를 눌러 개수·합계가 함께 바뀌면 완성이다.',
            ],
            node: <PracticeCartMedium />,
          },
          {
            label: '어려움',
            file: 'app-cart/practiceHard.jsx',
            task: '장바구니가 껍데기만 있다 — 담기도 안 되고 버튼도 죽어 있다. 다섯 부분을 채워 처음부터 살아 있는 장바구니로 만들자.',
            hints: [
              '① 먼저 체험 — 지금은 담기 버튼을 눌러도 아무것도 안 담기고, +/−·삭제도 죽어 있다. 아래 다섯 곳(🔴 TODO)을 채우면 살아난다. 진짜 state는 cart 하나뿐임을 기억한다.',
              '② 어디 — practiceHard.jsx의 🔴 TODO 1(addToCart)·2(increase)·3(decrease)·4(removeItem)·5(파생 값)이다.',
              '③ 담기 : 이미 담긴 상품이면 map으로 그 항목 qty +1, 처음이면 [...prev, { ...product, qty: 1 }] 로 더한다. 둘 다 새 배열로 set 한다.',
              '④ 수량·삭제 : +/−는 map으로 그 id 항목만 { ...item, qty: ... } 로 바꾸고(−는 Math.max(1, item.qty - 1)), 삭제는 setCart((prev) => prev.filter((item) => item.id !== id)) 로 그 id만 뺀다.',
              '⑤ 파생 값·확인 : 총 개수·합계는 state로 두지 말고 cart.reduce로 계산해 useMemo(() => ..., [cart])로 감싼다. 다 채운 뒤 담기·수량 조절·삭제를 해 보고, 개수·합계가 항상 cart와 맞으면 완성이다.',
            ],
            node: <PracticeCartHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li>
            <b>파생 상태 (derived state)</b> — 진짜 state는 <code>cart</code> 하나뿐이다.
            총 개수·합계는 <code>cart</code>에서 <b>계산되는 값</b>이라 별도 state로 두지 않는다.
          </li>
          <li>
            <b>useMemo</b> — <code>cart.reduce(...)</code> 계산을 <code>useMemo(..., [cart])</code>로 감싸,
            <code>cart</code>가 바뀔 때만 다시 계산한다. (다른 렌더에서는 계산 결과를 재사용)
          </li>
          <li>
            <b>불변성</b> — 담기는 <code>[...prev, 새항목]</code> 또는 <code>map</code>, 수량 변경은 <code>map</code> +
            <code>{'{ ...item }'}</code>, 삭제는 <code>filter</code> — 언제나 <b>새 배열·새 객체</b>로 set 한다.
          </li>
          <li>
            <b>업데이터 함수</b> — 이전 값을 이어 쓰는 갱신은 <code>setCart((prev) =&gt; ...)</code>로,
            지금 상태를 기준으로 안전하게 다음 상태를 만든다.
          </li>
          <li>
            <b>항목 소계도 계산값</b> — 한 줄의 <code>price × qty</code>도 <code>CartItem</code>이 그릴 때 계산할 뿐,
            state로 저장하지 않는다.
          </li>
        </ul>
      </div>
    </section>
  )
}
