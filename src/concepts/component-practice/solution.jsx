// ✅ 정답 — 컴포넌트와 JSX 종합 연습
// 하나의 루트(div)로 감싸고, className·{중괄호}·닫은 태그를 지켰다. 정의는 하나, 사용은 여러 번.

function Sticker({ emoji, label }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', margin: 4 }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <b>{label}</b>
    </div>
  )
}

export default function SolutionStickers() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <Sticker emoji="🍎" label="사과" />
      <Sticker emoji="🍌" label="바나나" />
      <Sticker emoji="🍇" label="포도" />
      <Sticker emoji="🍓" label="딸기" />
    </div>
  )
}
