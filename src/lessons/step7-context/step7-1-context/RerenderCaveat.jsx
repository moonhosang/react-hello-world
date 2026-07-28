import { createContext, useContext, useState, memo } from 'react'
import { RenderTag } from './RenderTag.jsx'

// 유의사항 데모용 — 화면 테마(다크/라이트)를 담는 Context. UserCard 여러 곳이 이 테마를 구독한다.
const ThemeContext = createContext({ dark: false })

// 여러 곳에서 재사용하는 사용자 카드. 테마를 useContext로 구독한다.
// memo로 감쌌지만(=props 같으면 스킵), 테마 Context를 쓰기 때문에 값이 바뀌면 리렌더된다.
const UserCard = memo(function UserCard({ user }) {
  const { dark } = useContext(ThemeContext)
  const style = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px', borderRadius: 10,
    background: dark ? '#1e293b' : '#ffffff',
    color: dark ? '#e2e8f0' : '#1f2937',
    border: `1px solid ${dark ? '#334155' : '#e5e7eb'}`,
    transition: 'background .2s, color .2s',
  }
  return (
    <div style={style}>
      <span style={{ fontSize: 24 }}>{user.avatar}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{user.role}</div>
      </div>
      <RenderTag />
    </div>
  )
})

// 대조군: 테마를 '안 쓰는' 카드. memo라서 부모가 리렌더돼도 그대로다 → 지문 고정.
const StaticNoticeCard = memo(function StaticNoticeCard() {
  return (
    <div className="tree-box leaf" style={{ marginTop: 4 }}>
      📌 공지 카드 <small>(테마 구독 안 함 · memo)</small> <RenderTag />
    </div>
  )
})

const TEAM = [
  { avatar: '👩‍💻', name: '김코딩', role: '프론트엔드' },
  { avatar: '🧑‍🎨', name: '이디자인', role: '디자이너' },
  { avatar: '🧑‍🔬', name: '박데이터', role: '데이터 분석가' },
]

export function RerenderCaveat() {
  const [dark, setDark] = useState(false)
  // value로 매번 새 객체를 넘긴다 — 실전에선 useMemo로 고정해야 하는 지점(주의사항 참고)
  return (
    <ThemeContext.Provider value={{ dark }}>
      <button className="chip on" onClick={() => setDark((v) => !v)} style={{ marginBottom: 12 }}>
        {dark ? '🌙 다크모드 켜짐' : '☀️ 라이트모드'} — 눌러서 테마 토글
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TEAM.map((u) => (
          <UserCard key={u.name} user={u} />
        ))}
      </div>
      <StaticNoticeCard />
    </ThemeContext.Provider>
  )
}
