import { useState } from 'react'
import { UserCard, USERS } from './UserCard.jsx'
import { ExtraUserCard } from './solution.jsx'

// 🎯 실습 — 기본 UserCard(프로필 버튼 없음)의 '정의'에 버튼 한 줄을 더하면(= ExtraUserCard),
//   그걸 쓰는 9개 카드 전부에 버튼이 생긴다. 토글은 '어느 정의를 쓸지'를 바꾼다(prop을 넘기는 게 아니다).
export function UserCardPractice() {
  const [added, setAdded] = useState(false)
  const [log, setLog] = useState('(카드의 버튼을 눌러 보라)')
  const onAction = (u) => (action) => setLog(`⚡ ${u.name} — action="${action}"`)
  // ⭐ 핵심: 쓰는 컴포넌트 '정의'를 통째로 바꾼다. added면 프로필 버튼이 든 ExtraUserCard.
  const Card = added ? ExtraUserCard : UserCard
  return (
    <div>
      <div className="lesson-goal" style={{ marginTop: 0 }}>
        <span className="lesson-goal-tag">🎯 실습 목표</span>
        <p>
          기본 <code>UserCard</code>에는 팔로우·메시지 버튼만 있다. 그 <b>정의 한 곳</b>에 '프로필 보기' 버튼 <b>한 줄</b>을
          더하면(= <code>ExtraUserCard</code>), 그걸 쓰는 <b>9개 카드 전부</b>에 버튼이 생긴다.
          <br />📍 <b>어디를 고치나</b>: <code>UserCard.jsx</code>의 <code>UserCard</code> 안 <b>버튼 줄</b> — 팔로우·메시지 <code>&lt;button&gt;</code> <b>바로 다음</b>에 프로필 버튼 한 줄을 넣는다. (그 완성형이 <code>solution.jsx</code>의 <code>ExtraUserCard</code>다)
          <br />📌 <b>배우는 것</b>: 컴포넌트는 CSS(외형만)와 달리 <b>구조 + 로직(버튼·클릭)까지 한 곳에 묶어 재사용</b>한다 — 정의 한 곳을 고치면 쓰는 곳 <b>전부</b>가 바뀐다. CSS로는 '요소(버튼)'를 못 만들기에, 이건 컴포넌트만 되는 캡슐화다.
        </p>
      </div>
      <div className="card">
        <div className="file-label">📄 {added ? 'solution.jsx · ExtraUserCard' : 'UserCard.jsx · UserCard'} — 버튼 줄에 한 줄을 더하면?</div>
        <pre className="err-code">{`function ${added ? 'ExtraUserCard' : 'UserCard'}({ user, onActionClick, ... }) {
  return (
    <div className="card"> … 아바타 · 이름 · 설명 …
      <button onClick={() => onActionClick('follow')}>팔로우</button>
      <button onClick={() => onActionClick('message')}>메시지</button>
${added
          ? "      <button onClick={() => onActionClick('profile')}>👤 프로필 보기</button>   // ⭐ 한 줄 추가 — 9개 전부 반영!"
          : "      // ⬜ 여기에 '프로필 보기' 버튼 한 줄을 더하면? ↓ 버튼으로 켜 보라"}
    </div>
  )
}`}</pre>
      </div>
      <div className="button-row" style={{ marginBottom: 10 }}>
        <button className={'chip' + (added ? ' on' : '')} onClick={() => setAdded((a) => !a)}>
          {added ? '➖ 되돌리기 (기본 UserCard로)' : "➕ '프로필 보기' 버튼 한 줄 더하기"}
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {USERS.map((u) => (
          <Card key={u.id} user={u}
            onUserNameClick={(id, name) => setLog(`👤 ${name} 이름 클릭`)}
            onActionClick={onAction(u)} />
        ))}
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>결과: <b>{log}</b></div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        {added
          ? '정의 한 곳(ExtraUserCard)에 버튼 한 줄을 더했을 뿐인데, 9개 카드 전부에 프로필 보기가 생겼다 — 이게 구조·로직 재사용(캡슐화)이다. CSS로는 "요소 추가"가 안 된다.'
          : "버튼 한 줄 더하기를 눌러 보라 — 쓰는 정의를 바꾸면 9개에 동시에 반영된다."}
      </p>
    </div>
  )
}
