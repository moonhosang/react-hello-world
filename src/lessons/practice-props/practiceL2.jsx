// 🟡 쉬움 — PriceTag는 완성돼 있다(가격 기본값 0). '쓰는 쪽'에서 price를 안 넘겨 전부 0원이다.
// 각 PriceTag에 price를 {중괄호} 숫자로 넘긴다 — 숫자·변수는 큰따옴표가 아니라 {중괄호}로 전달한다.

function PriceTag({ emoji, name, price = 0 }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, margin: 4, padding: '8px 14px', minWidth: 88 }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <b>{name}</b>
      <span style={{ color: 'var(--brand)' }}>{price.toLocaleString()}원</span>
    </div>
  )
}

export default function PracticeL2() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO: 각 PriceTag에 price를 {중괄호} 숫자로 넘긴다 (예: price={3000}). 사과 3000·바나나 2500·포도 7000·딸기 9000 */}
      <PriceTag emoji="🍎" name="사과" />
      <PriceTag emoji="🍌" name="바나나" />
      <PriceTag emoji="🍇" name="포도" />
      <PriceTag emoji="🍓" name="딸기" />
    </div>
  )
}
