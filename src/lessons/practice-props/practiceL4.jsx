// 🟣 어려움 — PriceTag의 속(return)과 재사용을 둘 다 채운다.
//   TODO A: PriceTag가 emoji·name·price를 보여주도록 return을 완성한다(하나의 루트·{중괄호}로 값).
//   TODO B: 아래에서 PriceTag를 4번, 서로 다른 값으로 재사용한다.

function PriceTag({ emoji, name, price = 0 }) {
  // TODO A: 이모지·이름·가격({price.toLocaleString()}원)을 보여주는 카드를 return 한다.
  return <div className="demo-card" style={{ display: 'inline-flex', margin: 4, padding: '8px 14px' }}>여기에 가격표를 만들자</div>
}

export default function PracticeL4() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO B: PriceTag를 4번, 다른 값으로 (사과 3000 · 바나나 2500 · 포도 7000 · 딸기 9000) */}
      <PriceTag emoji="🍎" name="사과" price={3000} />
    </div>
  )
}
