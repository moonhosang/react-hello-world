// 🟢 쉬움 — Sticker의 return을 JSX 규칙에 맞게 완성하자.
// 아래 4개는 이미 놓여 있다. Sticker 정의 한 곳만 채우면 4개 전부 그려진다.
//
// 할 일(TODO): 하나의 루트로 감싸고, className·{중괄호}로 emoji와 label을 보여준다.
//   예: return <div className="demo-card" style={{ ... }}><span>{emoji}</span> <b>{label}</b></div>

function Sticker({ emoji, label }) {
  // TODO: 여기를 규칙에 맞게 완성한다. (지금은 자리표시자라 값이 안 보인다)
  return <div className="demo-card" style={{ display: 'inline-flex', margin: 4, padding: '6px 12px' }}>여기를 완성</div>
}

export default function PracticeEasy() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <Sticker emoji="🍎" label="사과" />
      <Sticker emoji="🍌" label="바나나" />
      <Sticker emoji="🍇" label="포도" />
      <Sticker emoji="🍓" label="딸기" />
    </div>
  )
}
