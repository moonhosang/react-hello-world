import { useState } from 'react'

// ✅ 정답 — falsy 활용: 기본값(name || '손님'), 가드(user && ...).
export default function SolutionTruthy() {
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
          {user && <b>프로필: {user.name}</b>}
          {!user && <span className="demo-desc">(로그인하면 프로필이 보인다)</span>}
        </p>
      </div>
    </div>
  )
}
