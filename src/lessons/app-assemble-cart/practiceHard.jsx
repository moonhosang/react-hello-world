import { useMemo, useState } from 'react'
import ProductList from '../../apps/app-cart/ProductList.jsx'
import CartItem from '../../apps/app-cart/CartItem.jsx'
import CartSummary from '../../apps/app-cart/CartSummary.jsx'

// 🔴 조립 · 어려움 — 빈 화면이다. 로직은 아래에 다 있다.
// 할 일: return 안을 처음부터 조립한다. (로직 함수·값은 그대로 쓰면 된다)
//   1) <ProductList onAdd={addToCart} />
//   2) 제목 + ({totalCount}개)
//   3) cart.length === 0 ? 안내 : <ul>{cart.map(item => <CartItem key={item.id} item={item} onInc={increase} onDec={decrease} onRemove={removeItem} />)}</ul>
//   4) <CartSummary totalCount={totalCount} totalPrice={totalPrice} />

export default function AssembleCartHard() {
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

  // ── 조립(return) — 처음부터 채운다 ───────────────────────────
  return (
    <div className="demo-card">
      {/* TODO: 위 안내(1~4)를 보고 여기에 조립하자 */}
      여기에 장바구니를 조립하자
    </div>
  )
}
