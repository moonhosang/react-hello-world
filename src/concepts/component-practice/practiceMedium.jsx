// 🟡 중간 — Sticker는 완성돼 있다. 아래에서 4번 '재사용'하자(값만 다르게).
// 정의는 하나, 사용은 여러 번 — 이게 컴포넌트 재사용(캡슐화)이다.
//
// 할 일(TODO): <Sticker emoji="..." label="..." />를 4개, 서로 다른 값으로 놓는다.

function Sticker({ emoji, label }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 4, padding: '6px 12px' }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <b>{label}</b>
    </div>
  )
}

export default function PracticeMedium() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      {/* TODO: Sticker를 4번, 다른 emoji·label로 재사용한다 (예: 🍎 사과 · 🍌 바나나 …) */}
      <Sticker emoji="🍎" label="사과" />
    </div>
  )
}
