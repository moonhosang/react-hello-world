import { useState } from 'react'

// 겉(인터페이스): <UserCard user onUserNameClick onActionClick />
// 속(감춤): 아바타·이름·역할·상태·설명 + 내부 '팔로우' 상태(useState).
//   부모는 속(구조·내부 상태)을 모른 채, 콜백 prop으로 이벤트만 값으로 받는다.
//   → button의 onClick(e) / J3의 onPick(값)과 똑같은 '이벤트 제공' 구조.

const USERS = [
  { id: 1, emoji: '👩‍💻', name: '김코딩', role: '프론트엔드', status: '온라인', desc: 'React로 화면을 만든다. 요즘은 애니메이션에 빠져 있다.' },
  { id: 2, emoji: '🧑‍🎨', name: '이디자인', role: '디자이너', status: '자리비움', desc: '디자인 시스템을 다듬는다. 커피 없이는 못 산다.' },
  { id: 3, emoji: '🧑‍🔬', name: '박백엔드', role: '백엔드', status: '오프라인', desc: 'API와 데이터베이스를 책임진다. 캐싱 이야기를 좋아한다.' },
  { id: 4, emoji: '🧑‍🚀', name: '최데브옵스', role: '인프라', status: '온라인', desc: '배포 파이프라인을 굴린다. 새벽 알람에 강하다.' },
  { id: 5, emoji: '👩‍🏫', name: '한멘토', role: '테크리드', status: '온라인', desc: '코드 리뷰로 팀을 키운다. 네이밍에 진심이다.' },
  { id: 6, emoji: '🧑‍💼', name: '정기획', role: 'PM', status: '자리비움', desc: '요구사항을 정리한다. 회의를 30분에 끝낸다.' },
  { id: 7, emoji: '👩‍🔧', name: '오품질', role: 'QA', status: '오프라인', desc: '엣지 케이스를 사냥한다. "그거 재현돼요"가 말버릇.' },
  { id: 8, emoji: '🧑‍🎤', name: '서데이터', role: '데이터', status: '온라인', desc: '지표로 말한다. 대시보드를 예쁘게 만든다.' },
  { id: 9, emoji: '🧑‍🍳', name: '문풀스택', role: '풀스택', status: '자리비움', desc: '프론트도 백도 오간다. 사이드 프로젝트가 취미.' },
]

const DOT = { 온라인: '#16a34a', 자리비움: '#d97706', 오프라인: '#94a3b8' }

function UserCard({ user, onUserNameClick, onActionClick, descMode = 'ok', extra = null }) {
  const [following, setFollowing] = useState(false)
  // 설명 클릭 동작 — 실습에서 학습자가 고르는 형태:
  //   'ok'  = () => onActionClick('description')  ✅   'noarg' = onActionClick  ⚠️(이벤트만)   'off' = 없음 ❌
  const descOnClick = descMode === 'ok' ? () => onActionClick('description')
    : descMode === 'noarg' ? onActionClick
      : undefined
  return (
    <div style={{ flex: '1 1 200px', maxWidth: 260, border: '1px solid var(--border)', borderRadius: 12, padding: 12, background: 'var(--panel)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 30 }}>{user.emoji}</span>
        <div style={{ minWidth: 0 }}>
          <button onClick={() => onUserNameClick(user.id, user.name)} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', fontWeight: 800, fontSize: 15, color: 'var(--brand)', cursor: 'pointer', textDecoration: 'underline' }} title="이름 클릭">{user.name}</button>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {user.role} · <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: DOT[user.status], marginRight: 3 }} />{user.status}
          </div>
        </div>
      </div>
      <p
        onClick={descOnClick}
        style={{
          margin: '10px 0 0', fontSize: 13, lineHeight: 1.5,
          color: descOnClick ? 'var(--brand)' : 'var(--text)',
          cursor: descOnClick ? 'pointer' : 'default',
          textDecoration: descOnClick ? 'underline dashed' : 'none',
          textUnderlineOffset: 3,
        }}
        title={descOnClick ? '설명 클릭 → action="description"' : '설명(지금은 클릭 안 됨)'}
      >
        {user.desc}
      </p>
      <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <button className={'chip' + (following ? ' on' : '')} onClick={() => { setFollowing((f) => !f); onActionClick(following ? 'unfollow' : 'follow') }}>{following ? '✓ 팔로잉' : '+ 팔로우'}</button>
        <button className="chip" onClick={() => onActionClick('message')}>메시지</button>
        {extra && <button className="chip" onClick={() => onActionClick(extra)}>👤 프로필 보기</button>}
      </div>
    </div>
  )
}

// 데모: 완성본 카드 3개
export default function UserCardDemo() {
  const [log, setLog] = useState([])
  const push = (msg) => setLog((l) => [msg, ...l].slice(0, 6))
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {USERS.map((u) => (
          <UserCard key={u.id} user={u}
            onUserNameClick={(id, name) => push(`👤 이름 클릭 — ${name} (id ${id})`)}
            onActionClick={(action) => push(`⚡ ${u.name} — action="${action}"`)} />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 12 }}>
        <b>부모가 받은 이벤트 로그</b>
        {log.length === 0
          ? <div className="demo-desc" style={{ margin: '4px 0 0' }}>카드의 <b>이름·설명·팔로우·메시지</b>를 눌러 보라.</div>
          : <ul className="section-list" style={{ margin: '6px 0 0' }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}

// 🎯 실습 — UserCard 정의 '한 곳'에 버튼 한 줄을 켜면, 9개 카드 전부에 생긴다 (구조·로직 재사용 = 캡슐화).
export function UserCardPractice() {
  const [added, setAdded] = useState(false)
  const [log, setLog] = useState('(카드의 버튼을 눌러 보라)')
  const onAction = (u) => (action) => setLog(`⚡ ${u.name} — action="${action}"`)
  return (
    <div>
      <div className="lesson-goal" style={{ marginTop: 0 }}>
        <span className="lesson-goal-tag">🎯 실습 목표</span>
        <p>
          <code>UserCard</code> <b>한 곳</b>에 '프로필 보기' 버튼 <b>한 줄</b>을 추가해서, <b>9개 카드 전부</b>에 버튼이 생기게 만든다.
          <br />📌 <b>배우는 것</b>: 컴포넌트는 CSS(외형만)와 달리 <b>구조 + 로직(버튼·클릭)까지 한 곳에 묶어 재사용</b>한다 — 정의 한 곳을 고치면 쓰는 곳 <b>전부</b>가 바뀐다. CSS로는 '요소(버튼)'를 못 만들기에, 이건 컴포넌트만 되는 캡슐화다.
        </p>
      </div>
      <div className="card">
        <div className="file-label">📄 UserCard.jsx — 아래 '한 줄'을 켜면 9개 전부에 버튼이 생긴다</div>
        <pre className="err-code">{`function UserCard({ user, onActionClick, ... }) {
  return (
    <div className="card"> … 아바타 · 이름 · 설명 …
      <button onClick={() => onActionClick('follow')}>팔로우</button>
      <button onClick={() => onActionClick('message')}>메시지</button>
${added
            ? "      <button onClick={() => onActionClick('profile')}>👤 프로필 보기</button>   // ⭐ 방금 추가 — 9개 전부 반영!"
            : "      // ⬜ 여기에 '프로필 보기' 버튼 한 줄을 추가하면? ↓ 버튼으로 켜 보라"}
    </div>
  )
}`}</pre>
      </div>
      <div className="button-row" style={{ marginBottom: 10 }}>
        <button className={'chip' + (added ? ' on' : '')} onClick={() => setAdded((a) => !a)}>
          {added ? '➖ 버튼 빼기 (되돌리기)' : "➕ '프로필 보기' 버튼 추가"}
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {USERS.map((u) => (
          <UserCard key={u.id} user={u} extra={added ? 'profile' : null}
            onUserNameClick={(id, name) => setLog(`👤 ${name} 이름 클릭`)}
            onActionClick={onAction(u)} />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>결과: <b>{log}</b></div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        {added
          ? 'UserCard 한 곳에 버튼 한 줄을 켰을 뿐인데, 9개 카드 전부에 프로필 보기가 생겼다 — 이게 구조·로직 재사용(캡슐화)이다. CSS로는 "요소 추가"가 안 된다.'
          : "'프로필 보기 버튼 추가'를 눌러 보라 — 정의 한 곳만 켜도 9개에 동시에 생긴다."}
      </p>
    </div>
  )
}
