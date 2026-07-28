import { useMemo, useState } from 'react'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import CartSummary from './CartSummary.jsx'

// 🛒 장바구니 — 라이브 데모 (Lv2 · 파생 상태)
// 이 컴포넌트는 '상태 보유 + 조립'만 맡는다. 화면 조각은 역할별로 나눴다:
//   - ProductList : 상품 목록 + 담기 (상품 데이터 소유)
//   - CartItem    : 장바구니 한 줄 (수량 +/− · 삭제)
//   - CartSummary : 총 개수 · 합계 금액(파생 값) 표시
//
// 진짜 상태는 cart 하나뿐. 총 개수·합계는 useState로 저장하지 않고
// cart에서 useMemo로 매 렌더 '계산'해 내려준다. (중복 상태는 반드시 어긋난다)
export default function Cart() {
  const [cart, setCart] = useState([])

  // 담기 — 이미 있으면 수량 +1, 없으면 새로 추가 (둘 다 '새 배열'로 set)
  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // 수량 +1
  function increase(id) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }

  // 수량 −1 (최소 1 유지)
  function decrease(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    )
  }

  // 삭제 — 해당 id를 뺀 '새 배열'
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 🔑 파생 상태 — cart에서 계산한다. state로 저장하지 않는다.
  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  )

  return (
    <div className="demo-card">
      {/* 상품 목록: 담기 이벤트만 addToCart로 받아 올린다 (자식은 상태를 모른다) */}
      <ProductList onAdd={addToCart} />

      {/* 장바구니 제목 — 한 줄이라 컴포넌트로 빼지 않고 인라인 유지. totalCount는 파생값 */}
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        🛒 장바구니 <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalCount}개)</span>
      </div>

      {/* 비었으면 안내, 있으면 map으로 한 줄씩 렌더 (조건부 렌더링 + 리스트+key) */}
      {cart.length === 0 ? (
        <p className="empty">장바구니가 비었다. 위에서 상품을 담아 보자 🛍️</p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cart.map((item) => (
            // 한 줄(CartItem)엔 데이터(item)와 '바꾸는 함수'(inc/dec/remove)를 내려준다.
            <CartItem
              key={item.id}
              item={item}
              onInc={increase}
              onDec={decrease}
              onRemove={removeItem}
            />
          ))}
        </ul>
      )}

      {/* 합계 표시 — 계산은 여기서(useMemo) 끝내고, CartSummary엔 값만 넘겨 '표시'만 시킨다 */}
      <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
    </div>
  )
}
