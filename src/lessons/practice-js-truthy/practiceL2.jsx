import { useState } from 'react'

// 🟡 쉬움 — 기본값은 됐다. 로그인했을 때만 프로필이 뜨도록 && 가드를 채운다.

export default function PracticeL2() {
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)

  return (
    <div>
      <div className="button-row" style={{ marginBottom: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" style={{ padding: '6px 8px' }} />
        <button className={'chip' + (user ? ' on' : '')} onClick={() => setUser(user ? null : { name: '김코딩' })}>
          {user ? '로그아웃' : '로그인'}
        </button>
      </div>
      <div className="tree-box">
        <p style={{ margin: 0 }}>안녕, <b>{name || '손님'}</b>님</p>
        <p style={{ margin: '6px 0 0' }}>
          {/* TODO: user가 있을 때만 프로필 표시 → {user && <b>프로필: {user.name}</b>} */}
          <span className="demo-desc">여기에 프로필이 뜨게 만들자</span>
        </p>
      </div>
    </div>
  )
}
