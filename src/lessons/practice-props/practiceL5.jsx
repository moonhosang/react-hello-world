// ⚫ 도전 — 처음부터 만든다.
//   TODO A: PriceTag({ emoji, name, price }) 컴포넌트를 정의한다 — 이모지·이름·가격을 보여주는 카드.
//   TODO B: 아래 return에서 PriceTag를 4번, 서로 다른 값으로 재사용한다.

// TODO A: 여기에 function PriceTag({ emoji, name, price }) { return ( … ) }

export default function PracticeL5() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO B: PriceTag를 4번 재사용 (사과 3000 · 바나나 2500 · 포도 7000 · 딸기 9000) */}
      여기에 가격표 4개를 만들자
    </div>
  )
}
