// 🟡 쉬움 — 재고 필터는 됐다. map 콜백이 <li>를 반환하도록 채운다(key 포함).
const PRODUCTS = [
  { name: '키보드', price: 30000, stock: 3 },
  { name: '마우스', price: 15000, stock: 0 },
  { name: '모니터', price: 200000, stock: 5 },
  { name: '마우스패드', price: 8000, stock: 0 },
]

export default function PracticeL2() {
  const inStock = PRODUCTS.filter((p) => p.stock > 0)
  return (
    <ul className="section-list">
      {inStock.map((p) => {
        // TODO: return <li key={p.name}>{p.name} — {p.price * 0.9}원 (재고 {p.stock})</li>
        return null
      })}
    </ul>
  )
}
