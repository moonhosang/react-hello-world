import { useState } from 'react'

// 겉(인터페이스): <UserCard user onUserNameClick onActionClick />
// 속(감춤): 아바타·이름·역할·상태·설명 + 내부 '팔로우' 상태(useState).
//   부모는 속(구조·내부 상태)을 모른 채, 콜백 prop으로 이벤트만 값으로 받는다.
//   → button의 onClick(e) / J3의 onPick(값)과 똑같은 '이벤트 제공' 구조.
//
// 이 파일의 UserCard는 '기본형'이다 — 팔로우·메시지 버튼까지만 있고 '프로필 보기'는 없다.
// 실습(practice.jsx)에서 여기에 버튼 한 줄을 더한 ExtraUserCard(solution.jsx)를 만든다.

export const USERS = [
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

// 카드 바깥 틀 스타일 — 기본 UserCard와 실습용 ExtraUserCard가 함께 쓴다.
export const CARD_STYLE = { flex: '1 1 200px', maxWidth: 260, border: '1px solid var(--border)', borderRadius: 12, padding: 12, background: 'var(--panel)' }

// 카드의 '보이는 몸통'(상태 없음) — 아바타·이름·역할·상태·설명.
// 버튼 줄만 서로 다르므로, 몸통은 UserCard와 ExtraUserCard가 이걸 공유한다.
export function CardBody({ user, onUserNameClick, onActionClick }) {
  return (
    <>
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
        onClick={() => onActionClick('description')}
        style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.5, color: 'var(--brand)', cursor: 'pointer', textDecoration: 'underline dashed', textUnderlineOffset: 3 }}
        title='설명 클릭 → action="description"'
      >
        {user.desc}
      </p>
    </>
  )
}

// 기본 카드 — 팔로우·메시지 버튼까지. (아직 '프로필 보기' 버튼은 없다)
export function UserCard({ user, onUserNameClick, onActionClick }) {
  const [following, setFollowing] = useState(false)
  return (
    <div style={CARD_STYLE}>
      <CardBody user={user} onUserNameClick={onUserNameClick} onActionClick={onActionClick} />
      <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <button className={'chip' + (following ? ' on' : '')} onClick={() => { setFollowing((f) => !f); onActionClick(following ? 'unfollow' : 'follow') }}>{following ? '✓ 팔로잉' : '+ 팔로우'}</button>
        <button className="chip" onClick={() => onActionClick('message')}>메시지</button>
      </div>
    </div>
  )
}

// 데모: 기본 카드 9개 (각자 독립 인스턴스)
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
