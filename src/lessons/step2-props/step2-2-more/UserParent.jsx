import { useState } from 'react'
import UserCard from './UserCard.jsx'

// 부모: 상태를 '객체'로 가진다. 그 객체를 통째로 prop으로 내려준다.
// 객체 상태를 바꿀 땐 바뀐 필드만 '새 객체'로 만든다 (...펼치기). (6단계에서 자세히)

export default function UserParent() {
  const [user, setUser] = useState({ emoji: '🧑‍💻', name: '김코딩', role: '입문자' })

  return (
    <div>
      {/* 객체를 통째로 prop으로 전달 */}
      <UserCard user={user} />
      <div className="button-row">
        <button onClick={() => setUser({ ...user, role: '리액트 개발자' })}>직업 바꾸기</button>
        <button onClick={() => setUser({ ...user, role: '입문자' })}>되돌리기</button>
      </div>
    </div>
  )
}
