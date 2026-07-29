import { useState } from 'react'

const mono = '"Consolas", ui-monospace, monospace'

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

function UserCard({ user, onUserNameClick, onActionClick, descMode = 'ok' }) {
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
      <p onClick={descOnClick} style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text)', cursor: descOnClick ? 'pointer' : 'default', lineHeight: 1.5 }} title={descOnClick ? '설명 클릭' : '설명(지금은 클릭 안 됨)'}>
        {user.desc}
      </p>
      <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
        <button className={'chip' + (following ? ' on' : '')} onClick={() => { setFollowing((f) => !f); onActionClick(following ? 'unfollow' : 'follow') }}>{following ? '✓ 팔로잉' : '+ 팔로우'}</button>
        <button className="chip" onClick={() => onActionClick('message')}>메시지</button>
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
        {USERS.slice(0, 3).map((u) => (
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

// 🎯 실습(고쳐보기) — 카드 9개의 '설명 클릭'이 안 된다. 올바른 onClick 형태를 골라 고쳐라.
const FIX_OPTS = [
  { code: "onClick={onActionClick('description')}", mode: 'off', ok: false, msg: '❌ 괄호 때문에 렌더 때 즉시 실행 — 실제론 앱이 깨진다. 클릭용이 아니다. (J3 함정)' },
  { code: "onClick={() => onActionClick('description')}", mode: 'ok', ok: true, msg: '✅ 정답! 이제 설명을 누르면 action="description"이 부모에 전달된다. 카드 설명을 눌러 보라.' },
  { code: 'onClick={onActionClick}', mode: 'noarg', ok: false, msg: '⚠️ 클릭 땐 불리지만 "description"을 안 넘긴다 — 이벤트 e만 들어간다.' },
]
export function UserCardPractice() {
  const [choice, setChoice] = useState(null)
  const [log, setLog] = useState('(형태를 고른 뒤, 카드의 설명을 눌러 보라)')
  const mode = choice !== null ? FIX_OPTS[choice].mode : 'off'
  const onAction = (u) => (action) => {
    if (action === 'description') setLog(`⚡ ${u.name} — action="description" ✅`)
    else if (typeof action === 'string') setLog(`⚡ ${u.name} — action="${action}"`)
    else setLog(`⚡ ${u.name} — action = (이벤트 객체 · 'description' 아님) ⚠️`)
  }
  return (
    <div>
      <p className="demo-desc" style={{ marginTop: 0 }}>설명(<code>{'<p>{user.desc}</p>'}</code>)의 onClick 자리에 뭘 넣어야 <b>설명 클릭</b>이 될까? 골라서 아래 9개 카드로 확인하라.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
        {FIX_OPTS.map((o, k) => (
          <button key={k} className={'chip' + (choice === k ? ' on' : '')} onClick={() => { setChoice(k); setLog('(카드의 설명을 눌러 보라)') }} style={{ fontFamily: mono, fontSize: 12.5, textAlign: 'left' }}>{o.code}</button>
        ))}
      </div>
      {choice !== null && <p className="demo-desc" style={{ margin: '0 0 8px', fontWeight: 600, color: FIX_OPTS[choice].ok ? '#16a34a' : '#dc2626' }}>{FIX_OPTS[choice].msg}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {USERS.map((u) => (
          <UserCard key={u.id} user={u} descMode={mode}
            onUserNameClick={(id, name) => setLog(`👤 ${name} 이름 클릭`)}
            onActionClick={onAction(u)} />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>결과: <b>{log}</b></div>
    </div>
  )
}
