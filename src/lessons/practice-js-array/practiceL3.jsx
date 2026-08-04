// 🔴 중간 — 재고 필터(filter)와 목록 만들기(map)를 둘 다 직접 쓴다.
const PRODUCTS = [
  { name: '키보드', price: 30000, stock: 3 },
  { name: '마우스', price: 15000, stock: 0 },
  { name: '모니터', price: 200000, stock: 5 },
  { name: '마우스패드', price: 8000, stock: 0 },
]

export default function PracticeL3() {
  // TODO A: 재고 있는 것만 고른다 → PRODUCTS.filter((p) => p.stock > 0)
  const inStock = PRODUCTS
  return (
    <ul className="section-list">
      {/* TODO B: inStock.map((p) => <li key={p.name}>{p.name} — {p.price * 0.9}원 (재고 {p.stock})</li>) */}
    </ul>
  )
}
