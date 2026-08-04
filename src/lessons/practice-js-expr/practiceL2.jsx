// 🟡 쉬움 — 안내 문구를 '템플릿 리터럴'(백틱)로 만든다.
export default function PracticeL2() {
  const price = 12000, qty = 3, ship = 3000, name = '민지'
  const total = price * qty + ship
  const message = '' // TODO: `${name}님, 주문 총액은 ${total}원입니다.` (백틱 ` ` 안에 ${ } 로 값)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧾 {total}원</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
