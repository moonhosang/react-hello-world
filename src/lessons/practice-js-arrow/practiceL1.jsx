// 🟢 아주 쉬움 — grade의 '삼항' 한 줄만 채운다. (90↑ A, 80↑ B, 나머지 C)
export default function PracticeL1() {
  const name = '민지', score = 88
  const grade = (s) => '?' // TODO: s >= 90 ? 'A' : s >= 80 ? 'B' : 'C'
  const message = `${name}님: ${score}점 → ${grade(score)}등급`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🏅 {grade(score)}</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
