// ⚫ 처음부터 (다른 예시) — 점수 목록에서 합격자(60점 이상)만 걸러 이름을 보이고, 평균을 구한다.
// filter로 거르고, reduce로 합계를 내 평균을 만든다. (👀 정답 보기로 비교)

export default function PracticeL6() {
  const students = [
    { name: '김코딩', score: 85 },
    { name: '이디자인', score: 50 },
    { name: '박백엔드', score: 72 },
    { name: '최데브옵스', score: 40 },
  ]

  // TODO A: 합격자만 거른다 — students.filter((s) => s.score >= 60)
  const pass = []
  // TODO B: 평균 — students.reduce((sum, s) => sum + s.score, 0) / students.length
  const avg = 0

  return (
    <div className="tree-box">
      <div>합격자: <b>{pass.length ? pass.map((s) => s.name).join(', ') : '(아직 없음)'}</b></div>
      <div>평균 점수: <b>{avg}</b></div>
    </div>
  )
}
