// ✅ 정답 (다른 예시) — 원 넓이 계산 카드
// 주문 총액과 같은 기술(값을 만드는 식 + 템플릿 리터럴)을 '원 넓이'라는 다른 소재로 한 번 더.
export default function SolutionCircle() {
  const r = 5
  const pi = 3.14

  const area = pi * r * r // 반지름×반지름×원주율
  const message = `반지름 ${r}인 원의 넓이는 ${area}입니다.`

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⭕ {area}</b>
      <p className="demo-desc" style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
