// ✅ 정답 예시 — 팀 소개 페이지
// Member 하나를 정의하고, props만 바꿔 3번 재사용한다. (정의는 하나, 사용은 여러 번)

function Member({ emoji, name, role }) {
  return (
    <div className="demo-card center">
      <div className="demo-emoji">{emoji}</div>
      <h3>{name}</h3>
      <p className="demo-desc">{role}</p>
    </div>
  )
}

export default function SolutionTeam() {
  return (
    <div className="team-grid">
      <Member emoji="👩‍💻" name="김코딩" role="프론트엔드" />
      <Member emoji="🧑‍🎨" name="이디자인" role="디자이너" />
      <Member emoji="🧑‍🔧" name="박백엔드" role="백엔드" />
    </div>
  )
}
