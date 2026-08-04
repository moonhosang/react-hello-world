import { useState } from 'react'

// 🟣 어려움 — 입력·로그인 버튼만 있다. 표시 부분(기본값·가드)을 처음부터 만든다.

export default function PracticeL4() {
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
        {/* TODO: 두 줄을 만든다.
            ① 안녕, {name || '손님'}님   (이름 없으면 손님)
            ② {user && <b>프로필: {user.name}</b>}   (로그인했을 때만) */}
        <span className="demo-desc">여기에 인사말과 프로필을 만들자</span>
      </div>
    </div>
  )
}
