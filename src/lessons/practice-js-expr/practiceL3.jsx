// 🔴 중간 — total(식)과 message(템플릿 리터럴)를 둘 다 직접 만든다.
export default function PracticeL3() {
  const price = 12000, qty = 3, ship = 3000, name = '민지'
  const total = 0 // TODO: 가격 × 수량 + 배송비
  const message = '' // TODO: `${name}님, 주문 총액은 ${total}원입니다.`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧾 {total}원</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
