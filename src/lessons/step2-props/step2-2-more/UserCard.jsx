// 자식: 객체 하나(user)를 prop으로 받아, 그 안의 필드를 꺼내 쓴다.
// 값이 여러 개일 때 하나씩 넘기는 대신 '객체 하나'로 묶어 넘기는 방식.

export default function UserCard({ user }) {
  return (
    <div className="card profile-card">
      <div className="avatar">{user.emoji}</div>
      <h3>{user.name}</h3>
      <p className="role">{user.role}</p>
    </div>
  )
}
