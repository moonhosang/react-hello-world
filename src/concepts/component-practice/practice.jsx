// 📝 연습 · 컴포넌트와 JSX (실습 파일)
// 챕터 02 종합: 컴포넌트를 만들고, JSX 규칙을 지켜, 같은 조각을 재사용한다.
//
// 할 일:
//   TODO 1: Sticker를 완성한다 — 이모지와 라벨을 보여주는 작은 카드.
//           (JSX 규칙: 하나의 루트로 감싸기 · className · 태그 닫기 · {중괄호}로 값)
//   TODO 2: 아래에서 Sticker를 4번 재사용한다 (emoji·label만 다르게).
// 저장하면 '내 코드' 칸에 바로 보인다.

function Sticker({ emoji, label }) {
  // TODO 1: 규칙에 맞게 채운다. (지금은 자리표시자)
  return <div className="demo-card">여기에 스티커를 만들자</div>
}

export default function PracticeStickers() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO 2: Sticker를 4번, 다른 emoji·label로 재사용 */}
      <Sticker />
    </div>
  )
}
