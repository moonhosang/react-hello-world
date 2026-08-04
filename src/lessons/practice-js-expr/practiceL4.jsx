// 🟣 어려움 — 값 계산 + 화면에 꽂기까지 직접. (변수만 주어진다)
export default function PracticeL4() {
  const price = 12000, qty = 3, ship = 3000, name = '민지'
  // TODO A: const total = ...  (가격 × 수량 + 배송비)
  // TODO B: const message = ... (템플릿 리터럴로 안내 문구)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧾 0원{/* TODO C: 0 → {total} */}</b>
      <p style={{ marginTop: 6 }}>{/* TODO D: 여기에 {message} */}</p>
    </div>
  )
}
