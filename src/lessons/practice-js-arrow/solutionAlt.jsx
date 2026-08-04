// ✅ 정답 (다른 예시) — 나이 판정 카드
// 성적 등급과 같은 기술(화살표 함수 + 삼항 + 템플릿 리터럴)을 '나이 판정'이라는 다른 소재로 한 번 더.
export default function SolutionAge() {
  const name = '민지'
  const age = 15

  const status = (a) => (a >= 20 ? '성인' : a >= 14 ? '청소년' : '어린이')
  const message = `${name}님(${age}세) → ${status(age)}`

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🧑 {status(age)}</b>
      <p className="demo-desc" style={{ marginTop: 6 }}>{message}</p>
    </div>
  )
}
