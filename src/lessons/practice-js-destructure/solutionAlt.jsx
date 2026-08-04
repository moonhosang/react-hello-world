// ✅ 정답 (다른 예시) — 배열 구조 분해로 순위표를 만든다.
// {객체} 대신 [배열]도 순서대로 구조 분해된다. 함수 매개변수도 구조 분해할 수 있다.
export default function SolutionMedals() {
  const medals = ['🥇 김코딩', '🥈 이디자인', '🥉 박백엔드']
  const [gold, silver, bronze] = medals // 순서대로 담긴다
  const show = ({ rank, who }) => `${rank}위 — ${who}` // 함수 매개변수도 구조 분해

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <div>{gold}</div>
      <div>{silver}</div>
      <div>{bronze}</div>
      <div style={{ marginTop: 6, color: 'var(--muted)' }}>{show({ rank: 1, who: '김코딩' })}</div>
    </div>
  )
}
