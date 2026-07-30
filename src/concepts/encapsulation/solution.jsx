import { useState } from 'react'
import { CardBody, CARD_STYLE, USERS } from './UserCard.jsx'

// ✅ 정답 — 기본 UserCard와 '딱 한 줄'만 다르다: 👤 프로필 보기 버튼이 더 있다.
// 이 정의 한 곳을 쓰면(9개 카드에 넘기면) 9개 전부에 프로필 버튼이 생긴다 = 캡슐화(구조·로직 재사용).
export function ExtraUserCard({ user, onUserNameClick, onActionClick }) {
  const [following, setFollowing] = useState(false)
  return (
    <div style={CARD_STYLE}>
      <CardBody user={user} onUserNameClick={onUserNameClick} onActionClick={onActionClick} />
      <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <button className={'chip' + (following ? ' on' : '')} onClick={() => { setFollowing((f) => !f); onActionClick(following ? 'unfollow' : 'follow') }}>{following ? '✓ 팔로잉' : '+ 팔로우'}</button>
        <button className="chip" onClick={() => onActionClick('message')}>메시지</button>
        <button className="chip" onClick={() => onActionClick('profile')}>👤 프로필 보기</button>{/* ⭐ 이 한 줄이 기본 UserCard에 더해졌다 */}
      </div>
    </div>
  )
}

// 정답 데모 — ExtraUserCard 9개. 정의 한 곳에 버튼을 더했더니 9개 전부에 생겼다.
export default function EncapsulationSolution() {
  const [log, setLog] = useState('(카드의 버튼을 눌러 보라)')
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {USERS.map((u) => (
          <ExtraUserCard key={u.id} user={u}
            onUserNameClick={(id, name) => setLog(`👤 ${name} 이름 클릭`)}
            onActionClick={(action) => setLog(`⚡ ${u.name} — action="${action}"`)} />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>결과: <b>{log}</b></div>
    </div>
  )
}
