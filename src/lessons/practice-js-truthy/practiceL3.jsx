import { useState } from 'react'

// 🔴 중간 — 표시 두 줄을 직접 만든다: 이름 기본값(||)과 프로필 가드(&&).

export default function PracticeL3() {
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
        {/* TODO A: 이름이 비면 '손님' → 안녕, {name || '손님'}님 */}
        <p style={{ margin: 0 }}>안녕, <b>이름</b>님</p>
        {/* TODO B: user가 있을 때만 프로필 → {user && <b>프로필: {user.name}</b>} */}
        <p style={{ margin: '6px 0 0' }}><span className="demo-desc">여기에 프로필이 뜨게</span></p>
      </div>
    </div>
  )
}
