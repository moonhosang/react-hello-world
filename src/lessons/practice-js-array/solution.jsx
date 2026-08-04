// ✅ 정답 — 상품 목록: 재고 있는 것만 골라(filter), 10% 세일가로(map) 보여준다.
const PRODUCTS = [
  { name: '키보드', price: 30000, stock: 3 },
  { name: '마우스', price: 15000, stock: 0 },
  { name: '모니터', price: 200000, stock: 5 },
  { name: '마우스패드', price: 8000, stock: 0 },
]

export default function SolutionShop() {
  const inStock = PRODUCTS.filter((p) => p.stock > 0)
  return (
    <ul className="section-list">
      {inStock.map((p) => (
        <li key={p.name}>{p.name} — <b>{p.price * 0.9}원</b> (재고 {p.stock})</li>
      ))}
    </ul>
  )
}
