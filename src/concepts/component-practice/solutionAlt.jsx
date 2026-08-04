// ✅ 정답 (다른 예시) — 알림 배지 카드
// Sticker와 같은 '컴포넌트 + props + 재사용'이다. 소재만 다르다.
function NotiBadge({ icon, count }) {
  return (
    <div className="demo-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 4, padding: '6px 12px' }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <b>{count}</b>
    </div>
  )
}

export default function SolutionNotiBadges() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      <NotiBadge icon="🔔" count={3} />
      <NotiBadge icon="✉️" count={12} />
      <NotiBadge icon="❤️" count={7} />
      <NotiBadge icon="⭐" count={99} />
    </div>
  )
}
