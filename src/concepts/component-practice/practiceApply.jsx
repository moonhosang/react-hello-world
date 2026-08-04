// 🟣 어려움 — Sticker의 속을 채우고, 재사용까지 직접 한다.
// 할 일:
//   TODO A: Sticker의 return을 규칙에 맞게 완성한다(단일 루트·className·{emoji} {label}).
//   TODO B: 아래에서 Sticker를 4번, 다른 emoji·label로 재사용한다.

function Sticker({ emoji, label }) {
  // TODO A: 여기를 완성한다.
  return <div className="demo-card" style={{ display: 'inline-flex', margin: 4, padding: '6px 12px' }}>여기를 완성</div>
}

export default function PracticeApply() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO B: Sticker를 4번, 다른 값으로 재사용 */}
      <Sticker emoji="🍎" label="사과" />
    </div>
  )
}
