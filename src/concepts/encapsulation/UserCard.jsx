import { useState } from 'react'

// 겉(인터페이스): <UserCard user onUserNameClick onActionClick />
// 속(감춰진 것): 아바타·이름·역할·상태·설명 + 내부 '팔로우' 상태(useState).
//   부모는 이 속(구조·내부 상태)을 전혀 모른다. 넘긴 콜백으로 "무슨 일이 생겼는지"만 값으로 받는다.
//   → 이게 button의 onClick(e)나 J3의 onPick(값)과 똑같은 '이벤트 제공' 구조다.

const USERS = [
  { id: 1, emoji: '👩‍💻', name: '김코딩', role: '프론트엔드', status: '온라인', desc: 'React로 화면을 만든다. 요즘은 애니메이션에 빠져 있다.' },
  { id: 2, emoji: '🧑‍🎨', name: '이디자인', role: '디자이너', status: '자리비움', desc: '디자인 시스템을 다듬는다. 커피 없이는 못 산다.' },
  { id: 3, emoji: '🧑‍🔬', name: '박백엔드', role: '백엔드', status: '오프라인', desc: 'API와 데이터베이스를 책임진다. 캐싱 이야기를 좋아한다.' },
]

const DOT = { 온라인: '#16a34a', 자리비움: '#d97706', 오프라인: '#94a3b8' }

function UserCard({ user, onUserNameClick, onActionClick }) {
  const [following, setFollowing] = useState(false)
  return (
    <div style={{ flex: '1 1 210px', maxWidth: 260, border: '1px solid var(--border)', borderRadius: 12, padding: 12, background: 'var(--panel)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 30 }}>{user.emoji}</span>
        <div style={{ minWidth: 0 }}>
          {/* 이름 클릭 → 부모의 onUserNameClick(id, name) 호출 */}
          <button
            onClick={() => onUserNameClick(user.id, user.name)}
            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', fontWeight: 800, fontSize: 15, color: 'var(--brand)', cursor: 'pointer', textDecoration: 'underline' }}
            title="이름 클릭"
          >
            {user.name}
          </button>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {user.role} · <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: DOT[user.status], marginRight: 3 }} />{user.status}
          </div>
        </div>
      </div>
      {/* 설명 클릭 → onActionClick('description') */}
      <p
        onClick={() => onActionClick('description')}
        style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text)', cursor: 'pointer', lineHeight: 1.5 }}
        title="설명 클릭 → action='description'"
      >
        {user.desc}
      </p>
      <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <button
          className={'chip' + (following ? ' on' : '')}
          onClick={() => { setFollowing((f) => !f); onActionClick(following ? 'unfollow' : 'follow') }}
        >
          {following ? '✓ 팔로잉' : '+ 팔로우'}
        </button>
        <button className="chip" onClick={() => onActionClick('message')}>메시지</button>
      </div>
    </div>
  )
}

// 부모: 카드 속은 모른 채, 콜백으로 "어느 카드에서 무슨 일이 생겼는지"만 값으로 받아 로그에 찍는다.
export default function UserCardDemo() {
  const [log, setLog] = useState([])
  const push = (msg) => setLog((l) => [msg, ...l].slice(0, 6))
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {USERS.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onUserNameClick={(id, name) => push(`👤 이름 클릭 — ${name} (id ${id})`)}
            onActionClick={(action) => push(`⚡ ${u.name} — action="${action}"`)}
          />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 12 }}>
        <b>부모가 받은 이벤트 로그</b>
        {log.length === 0
          ? <div className="demo-desc" style={{ margin: '4px 0 0' }}>카드의 <b>이름·설명·팔로우·메시지</b>를 눌러 보라 — 어느 카드에서 무슨 일이 났는지 여기 찍힌다.</div>
          : <ul className="section-list" style={{ margin: '6px 0 0' }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
