// 🟡 쉬움 — 안내 문구를 템플릿 리터럴로 만든다. (grade는 완성돼 있다)
export default function PracticeL2() {
  const name = '민지', score = 88
  const grade = (s) => (s >= 90 ? 'A' : s >= 80 ? 'B' : 'C')
  const message = '' // TODO: `${name}님: ${score}점 → ${grade(score)}등급`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🏅 {grade(score)}</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
