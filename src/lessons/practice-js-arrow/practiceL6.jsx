// ⚫ 처음부터 (다른 예시) — '나이 판정 카드'를 빈 화면에서 처음부터.
// 성적 등급에서 익힌 것과 같은 기술(화살표 함수 + 삼항 + 템플릿 리터럴)을 다른 소재로 한 번 더.
//
// 주어진 값: name='민지', age=15
// 할 일:
//   TODO A: status 화살표 함수 — 삼항으로 20↑ '성인' / 14↑ '청소년' / 그 외 '어린이'.
//   TODO B: message를 템플릿 리터럴로: `${name}님(${age}세) → ${status(age)}`
//   TODO C: 카드에 status(age)와 message를 표시한다.

export default function PracticeL6() {
  const name = '민지'
  const age = 15

  const status = (a) => '?' // TODO A: 삼항 A/B/C처럼
  const message = '' // TODO B: 템플릿 리터럴

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧑 {status(age)}</b>
      <p className="demo-desc" style={{ marginTop: 6 }}>{message || '(안내 문구를 만들자)'}</p>
    </div>
  )
}
