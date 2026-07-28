// 조립(composite) 컴포넌트: 아이콘 + 라벨 + (선택) 뱃지를 합친 '한 조각'.
// 그런데 MenuItem 자신도 더 작은 조각인 <Badge />로 조립돼 있다 — 조각의 조각.
// badgeColor를 받으면 Badge에 넘긴다. 안 넘기면 Badge의 기본색(빨강)이 쓰인다.

import Badge from '../../components/Badge.jsx'

export default function MenuItem({ icon, label, badge, badgeColor }) {
  return (
    <div className="menu-item">
      <span className="menu-icon">{icon}</span>
      <span className="menu-label">{label}</span>
      {badge && <Badge value={badge} color={badgeColor} />}
    </div>
  )
}
