// 🟣 어려움 — 화살표 함수 정의부터 화면에 꽂기까지 직접. (변수만 주어진다)
export default function PracticeL4() {
  const name = '민지', score = 88
  // TODO A: const grade = (s) => ...  (삼항으로 90↑ A, 80↑ B, 나머지 C)
  // TODO B: const message = ...        (템플릿 리터럴)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🏅 ?{/* TODO C: ? → {grade(score)} */}</b>
      <p style={{ marginTop: 6 }}>{/* TODO D: 여기에 {message} */}</p>
    </div>
  )
}
