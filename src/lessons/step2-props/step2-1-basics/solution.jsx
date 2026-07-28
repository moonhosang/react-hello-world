// ✅ 정답 예시 — props(emoji, label)를 받아 뱃지를 그린다.
// 값만 바꿔 여러 번 재사용한다.

function Badge({ emoji, label }) {
  return (
    <span className="badge-chip">
      {emoji} {label}
    </span>
  )
}

export default function SolutionBadge() {
  return (
    <div className="chip-row">
      <Badge emoji="⚛️" label="React" />
      <Badge emoji="🎯" label="실습" />
      <Badge emoji="🔥" label="열공" />
    </div>
  )
}
