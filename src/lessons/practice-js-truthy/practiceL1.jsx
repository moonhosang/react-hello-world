import { useState } from 'react'

// 🟢 아주 쉬움 — 거의 다 됐다. 이름이 비었을 때 '손님'이 뜨도록 기본값 한 곳만 채운다.

export default function PracticeL1() {
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
        {/* TODO: 이름이 비면 '손님'이 뜨게 → {name || '손님'} */}
        <p style={{ margin: 0 }}>안녕, <b>{name}</b>님</p>
        <p style={{ margin: '6px 0 0' }}>
          {user && <b>프로필: {user.name}</b>}
          {!user && <span className="demo-desc">(로그인하면 프로필이 보인다)</span>}
        </p>
      </div>
    </div>
  )
}
