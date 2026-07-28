// ✅ 정답 예시 (step1) — 하나의 정답일 뿐, 내용은 자유다.
// 핵심은 "JSX를 return하는 함수 하나가 화면 조각이 된다"를 직접 만들어 보는 것.

export default function SolutionCard() {
  return (
    <div className="demo-card center">
      <div className="demo-emoji">🚀</div>
      <h3>리액트 입문 완료!</h3>
      <p className="demo-desc">나는 이제 컴포넌트를 만들 수 있다.</p>
    </div>
  )
}
