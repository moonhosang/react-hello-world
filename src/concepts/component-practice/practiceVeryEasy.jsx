// 🟢 아주 쉬움 — Sticker는 거의 다 됐다. 라벨을 보여주는 한 줄만 채우면 된다.
// 지금은 이모지만 보이고 이름(label)이 안 보인다. 그 한 곳을 채운다.

function Sticker({ emoji, label }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', margin: 4 }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      {/* TODO: 이름(label)을 보여준다 — <b>{label}</b> */}
    </div>
  )
}

export default function PracticeVeryEasy() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <Sticker emoji="🍎" label="사과" />
      <Sticker emoji="🍌" label="바나나" />
      <Sticker emoji="🍇" label="포도" />
      <Sticker emoji="🍓" label="딸기" />
    </div>
  )
}
