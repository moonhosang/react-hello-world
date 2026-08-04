// ✅ 정답 (다른 예시) — 프로필 배지
// props로 emoji·name·status를 받는 Badge를 정의하고, 값만 바꿔 여러 번 재사용한다.

function Badge({ emoji, name, status }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 4, padding: '6px 12px' }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <b>{name}</b>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{status}</span>
    </div>
  )
}

export default function SolutionProfileBadges() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <Badge emoji="👩‍💻" name="김코딩" status="온라인" />
      <Badge emoji="🧑‍🎨" name="이디자인" status="자리비움" />
      <Badge emoji="🧑‍🔬" name="박백엔드" status="오프라인" />
      <Badge emoji="🧑‍🚀" name="최데브옵스" status="온라인" />
    </div>
  )
}
