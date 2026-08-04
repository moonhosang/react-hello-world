import { useState } from 'react'

// 🟡 중간 — 객체 state 갱신. 이름 입력을 반영하되, 다른 필드(role)는 그대로 두자.
// 할 일: onName의 TODO를 채운다. {...profile, name: ...}로 name만 바꾼다.

export default function PracticeMedium() {
  const [profile, setProfile] = useState({ name: '', role: '프론트엔드' })

  const onName = (e) => {
    // TODO: name만 새 값으로 바꾸고 role은 유지한다.
    //   힌트: setProfile({ ...profile, name: e.target.value })
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <input value={profile.name} onChange={onName} placeholder="이름을 입력" style={{ padding: '6px 8px' }} />
      <p style={{ marginTop: 8 }}>
        <b>{profile.name || '(이름 없음)'}</b> · {profile.role}
      </p>
    </div>
  )
}
