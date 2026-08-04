// ⚫ 처음부터 (다른 예시) — '원 넓이 계산 카드'를 빈 화면에서 처음부터.
// 주문 총액에서 익힌 것과 같은 기술(값을 만드는 식 + 템플릿 리터럴)을 다른 소재로 한 번 더.
//
// 주어진 값: r(반지름)=5, pi=3.14
// 할 일:
//   TODO A: area 식을 만든다 (pi × r × r).
//   TODO B: message를 템플릿 리터럴로 만든다: `반지름 ${r}인 원의 넓이는 ${area}입니다.`
//   TODO C: 카드에 area와 message를 표시한다.

export default function PracticeL6() {
  const r = 5
  const pi = 3.14

  const area = 0 // TODO A: pi * r * r
  const message = '' // TODO B: 템플릿 리터럴

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>⭕ {area}</b>
      <p className="demo-desc" style={{ marginTop: 6 }}>{message || '(안내 문구를 만들자)'}</p>
    </div>
  )
}
