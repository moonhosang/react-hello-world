// ✅ 정답 — 화살표 함수 + 삼항 + 템플릿 리터럴
export default function SolutionArrow() {
  const name = '민지', score = 88
  const grade = (s) => (s >= 90 ? 'A' : s >= 80 ? 'B' : 'C')
  const message = `${name}님: ${score}점 → ${grade(score)}등급`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🏅 {grade(score)}</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
