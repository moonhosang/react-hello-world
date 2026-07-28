// 메뉴 전체 = 여러 조각의 조합.
// 같은 MenuItem이 아래에서 '20번' 쓰인다 — 정의는 하나(MenuItem.jsx), 사용은 여러 번.
// 사이사이 <hr>은 '구현이 그냥 HTML인 조각'이다. 겉보기엔 둘 다 똑같이 한 조각.

import MenuItem from './MenuItem.jsx'

// 메뉴 항목 데이터. 각 항목이 MenuItem '하나'로 그려진다. (divider는 HTML <hr>)
const items = [
  { icon: '🏠', label: '홈' },
  { icon: '🔔', label: '알림', badge: '3' },
  { icon: '✉️', label: '메시지', badge: '12' },
  { icon: '👤', label: '프로필' },
  { divider: true },
  { icon: '⭐', label: '즐겨찾기' },
  { icon: '🔍', label: '검색' },
  { icon: '📅', label: '캘린더' },
  { icon: '✅', label: '할 일', badge: '5', badgeColor: 'var(--green)' },
  { icon: '📝', label: '메모' },
  { icon: '📷', label: '사진' },
  { icon: '🎵', label: '음악' },
  { icon: '🎬', label: '동영상' },
  { icon: '🗺️', label: '지도' },
  { icon: '☁️', label: '날씨' },
  { icon: '📰', label: '뉴스', badge: 'N', badgeColor: '#2563eb' },
  { icon: '📥', label: '다운로드' },
  { icon: '📤', label: '업로드' },
  { divider: true },
  { icon: '⚙️', label: '설정' },
  { icon: '❓', label: '도움말' },
  { icon: '🚪', label: '로그아웃' },
]

export default function AppMenu() {
  return (
    <nav className="app-menu">
      {items.map((it, i) =>
        it.divider ? (
          <hr key={i} className="menu-divider" />
        ) : (
          <MenuItem key={i} icon={it.icon} label={it.label} badge={it.badge} badgeColor={it.badgeColor} />
        )
      )}
    </nav>
  )
}
