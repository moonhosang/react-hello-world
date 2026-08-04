// 🟢 아주 쉬움 — PriceTag는 거의 다 됐다. 가격을 보여주는 한 줄만 채운다.
// 지금은 이모지·이름만 보이고 가격이 안 보인다. price를 {중괄호}로 꽂는다.

function PriceTag({ emoji, name, price }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, margin: 4, padding: '8px 14px', minWidth: 88 }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <b>{name}</b>
      {/* TODO: 가격을 보여준다 — <span style={{ color: 'var(--brand)' }}>{price.toLocaleString()}원</span> */}
    </div>
  )
}

export default function PracticeL1() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <PriceTag emoji="🍎" name="사과" price={3000} />
      <PriceTag emoji="🍌" name="바나나" price={2500} />
      <PriceTag emoji="🍇" name="포도" price={7000} />
      <PriceTag emoji="🍓" name="딸기" price={9000} />
    </div>
  )
}
