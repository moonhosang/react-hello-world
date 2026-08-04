// ✅ 정답 — 표현식으로 값 만들기 (곱셈·덧셈 식 + 템플릿 리터럴)
export default function SolutionExpr() {
  const price = 12000, qty = 3, ship = 3000, name = '민지'
  const total = price * qty + ship
  const message = `${name}님, 주문 총액은 ${total}원입니다.`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧾 {total}원</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
