import { useMemo, useState } from 'react'
import ProductList from '../../apps/app-cart/ProductList.jsx'
import CartItem from '../../apps/app-cart/CartItem.jsx'
import CartSummary from '../../apps/app-cart/CartSummary.jsx'

// 🟢 조립 · 쉬움 — 로직(담기·수량·삭제·합계)은 이미 다 돼 있다.
// 할 일: 맨 아래에 합계를 보여주는 CartSummary 한 줄만 배치·연결한다.

export default function AssembleCartEasy() {
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

  // ── 조립(return) — 여기만 채운다 ─────────────────────────────
  return (
    <div className="demo-card">
      <ProductList onAdd={addToCart} />

      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        🛒 장바구니 <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalCount}개)</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty">장바구니가 비었다. 위에서 상품을 담아 보자 🛍️</p>
      ) : (
        <ul className="plain-list" style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} onInc={increase} onDec={decrease} onRemove={removeItem} />
          ))}
        </ul>
      )}

      {/* TODO: 합계를 보여주는 CartSummary를 여기에 배치하고 totalCount·totalPrice를 넘긴다.
          예: <CartSummary totalCount={totalCount} totalPrice={totalPrice} /> */}
    </div>
  )
}
