// 🟣 어려움 — 데이터만 있다. 재고 필터 → 세일가 목록까지 스스로 만든다.
const PRODUCTS = [
  { name: '키보드', price: 30000, stock: 3 },
  { name: '마우스', price: 15000, stock: 0 },
  { name: '모니터', price: 200000, stock: 5 },
  { name: '마우스패드', price: 8000, stock: 0 },
]

export default function PracticeL4() {
  // TODO A: 재고 있는 것만 (filter)
  // TODO B: 아래 <ul>에 map으로 <li>를 그린다 (세일가 = price * 0.9, key 포함)
  return (
    <ul className="section-list">
      {/* 여기에 목록을 만들자 */}
    </ul>
  )
}
