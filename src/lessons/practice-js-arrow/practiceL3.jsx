// 🔴 중간 — grade(화살표+삼항)와 message(템플릿)를 둘 다 만든다.
export default function PracticeL3() {
  const name = '민지', score = 88
  const grade = (s) => '?' // TODO: 삼항으로 A/B/C
  const message = '' // TODO: `${name}님: ${score}점 → ${grade(score)}등급`
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🏅 {grade(score)}</b>
      <p style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
