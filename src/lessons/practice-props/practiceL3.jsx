// 🔴 중간 — PriceTag는 완성돼 있다. 아래에서 4번 '재사용'하자 (값만 다르게).
// 정의는 하나, 사용은 여러 번. 같은 PriceTag에 다른 props를 넘긴다.

function PriceTag({ emoji, name, price = 0 }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, margin: 4, padding: '8px 14px', minWidth: 88 }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <b>{name}</b>
      <span style={{ color: 'var(--brand)' }}>{price.toLocaleString()}원</span>
    </div>
  )
}

export default function PracticeL3() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO: 아래 사과처럼 PriceTag를 3개 더 — 바나나 2500 · 포도 7000 · 딸기 9000 */}
      <PriceTag emoji="🍎" name="사과" price={3000} />
    </div>
  )
}
