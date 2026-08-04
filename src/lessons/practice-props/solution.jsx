// ✅ 정답 — 가격표(PriceTag)
// props로 emoji·name·price를 받아 카드를 그리고, 값만 바꿔 4번 재사용한다.
// 정의는 하나, 사용은 여러 번 — props로 받은 값은 읽기만 한다(자식은 못 바꾼다).
function PriceTag({ emoji, name, price }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, margin: 4, padding: '8px 14px', minWidth: 88 }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <b>{name}</b>
      <span style={{ color: 'var(--brand)' }}>{price.toLocaleString()}원</span>
    </div>
  )
}

export default function SolutionPriceTags() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <PriceTag emoji="🍎" name="사과" price={3000} />
      <PriceTag emoji="🍌" name="바나나" price={2500} />
      <PriceTag emoji="🍇" name="포도" price={7000} />
      <PriceTag emoji="🍓" name="딸기" price={9000} />
    </div>
  )
}
