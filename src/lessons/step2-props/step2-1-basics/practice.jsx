// 🎯 실습 (step2) — props 받는 컴포넌트 만들기
// Badge 컴포넌트가 props로 emoji, label을 받아 보여주게 완성해 보자.
// 그리고 서로 다른 값으로 3개를 렌더해 보자. (정의는 하나, 사용은 여러 번)

function Badge(/* TODO 1: 여기서 props(emoji, label)를 받는다 */) {
  // TODO 2: emoji와 label을 보여준다
  return <span className="badge-chip">뱃지를 만들자</span>
}

export default function PracticeBadge() {
  return (
    <div className="chip-row">
      {/* TODO 3: Badge를 서로 다른 props로 3개 렌더 */}
      <Badge />
    </div>
  )
}
