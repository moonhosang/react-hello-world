// ✅ 정답 (다른 예시) — filter로 합격자(60점↑)만 거르고, reduce로 합계를 내 평균을 구한다.
export default function SolutionScores() {
  const students = [
    { name: '김코딩', score: 85 },
    { name: '이디자인', score: 50 },
    { name: '박백엔드', score: 72 },
    { name: '최데브옵스', score: 40 },
  ]

  const pass = students.filter((s) => s.score >= 60) // 조건에 맞는 것만 남긴다
  const avg = students.reduce((sum, s) => sum + s.score, 0) / students.length // 합계 → 평균

  return (
    <div className="tree-box">
      <div>합격자: <b>{pass.map((s) => s.name).join(', ')}</b></div>
      <div>평균 점수: <b>{avg}</b></div>
    </div>
  )
}
