// 🟢 아주 쉬움 — 목록은 다 나온다. 세일가(10% 할인) 계산 한 곳만 채운다.
const PRODUCTS = [
  { name: '키보드', price: 30000, stock: 3 },
  { name: '마우스', price: 15000, stock: 0 },
  { name: '모니터', price: 200000, stock: 5 },
  { name: '마우스패드', price: 8000, stock: 0 },
]

export default function PracticeL1() {
  const inStock = PRODUCTS.filter((p) => p.stock > 0)
  return (
    <ul className="section-list">
      {inStock.map((p) => (
        // TODO: p.price → p.price * 0.9 로 바꿔 10% 할인가를 보이자
        <li key={p.name}>{p.name} — <b>{p.price}원</b> (재고 {p.stock})</li>
      ))}
    </ul>
  )
}
