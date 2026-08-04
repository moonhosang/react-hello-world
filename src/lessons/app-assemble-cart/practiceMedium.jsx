import { useMemo, useState } from 'react'
import ProductList from '../../apps/app-cart/ProductList.jsx'
import CartItem from '../../apps/app-cart/CartItem.jsx'
import CartSummary from '../../apps/app-cart/CartSummary.jsx'

// 🟡 조립 · 중간 — 조각은 놓여 있지만 '연결'이 비었다.
// 할 일: 각 조각에 props/콜백(onAdd·onInc·onDec·onRemove·totalCount·totalPrice)을 이어 살린다.
// (지금은 () => {} · 0 자리표시자라 렌더는 되지만 동작하지 않는다)

export default function AssembleCartMedium() {
  // ── 로직(이미 완성) — 건드리지 않는다 ─────────────────────────
  const [cart, setCart] = useState([])
  const addToCart = (product) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id)
      return found
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }]
    })
  const increase = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))
  const decrease = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)))
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id))
  const totalCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])
  const totalPrice = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  // ── 조립(return) — TODO 자리에 위 값·함수를 연결한다 ──────────
  return (
    <div className="demo-card">
      {/* TODO 1: 담기 이벤트를 addToCart로 연결한다 → onAdd={addToCart} */}
      <ProductList onAdd={() => {}} />

      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        🛒 장바구니 <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalCount}개)</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty">장바구니가 비었다. 위에서 상품을 담아 보자 🛍️</p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cart.map((item) => (
            // TODO 2: onInc·onDec·onRemove에 increase·decrease·removeItem을 연결한다
            <CartItem key={item.id} item={item} onInc={() => {}} onDec={() => {}} onRemove={() => {}} />
          ))}
        </ul>
      )}

      {/* TODO 3: 합계에 totalCount·totalPrice를 넘긴다 */}
      <CartSummary totalCount={0} totalPrice={0} />
    </div>
  )
}
