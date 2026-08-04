// 🟢 아주 쉬움 — total 식 한 줄만 채운다. (가격 × 수량 + 배송비)
export default function PracticeL1() {
  const price = 12000, qty = 3, ship = 3000, name = '민지'
  const total = 0 // TODO: price * qty + ship
  const message = `${name}님, 주문 총액은 ${total}원입니다.`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧾 {total}원</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
