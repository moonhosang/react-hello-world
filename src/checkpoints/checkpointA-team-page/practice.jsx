// ✅ 체크포인트 A — 팀 소개 페이지 (실습 파일)
// 지금까지 배운 '컴포넌트 + props'를 합쳐 팀원 3명을 소개해 보자.
//
// 할 일:
//   TODO 1: Member 컴포넌트를 완성한다 (props: emoji, name, role)
//   TODO 2: 아래 return에서 Member를 3번, 서로 다른 값으로 렌더한다
// 저장하면 '내 코드' 칸에 바로 보인다.

function Member({ emoji, name, role }) {
  // TODO 1: emoji, name, role을 보여주는 카드를 만들어 보자
  return <div className="demo-card">여기에 팀원 카드를 만들자</div>
}

export default function PracticeTeam() {
  return (
    <div className="team-grid">
      {/* TODO 2: Member를 3번, 다른 props로 렌더 */}
      <Member />
    </div>
  )
}
