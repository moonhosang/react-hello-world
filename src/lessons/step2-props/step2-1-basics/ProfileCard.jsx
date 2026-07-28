// 재사용 가능한 프로필 카드 컴포넌트다.
// props로 emoji, name, role, bio를 받아서 하나의 카드를 그린다.
// 이렇게 "작은 조각"을 따로 파일로 빼두면 어디서든 가져다 쓸 수 있다.

export default function ProfileCard({ emoji, name, role, bio }) {
  return (
    <div className="card profile-card">
      <div className="file-label">📄 ProfileCard.jsx</div>
      <div className="avatar">{emoji}</div>
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p className="bio">{bio}</p>
    </div>
  )
}
