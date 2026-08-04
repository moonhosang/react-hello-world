// ⚫ 처음부터 (다른 예시) — 알림 배지 카드. 빈 화면에서 처음부터.
// Sticker와 같은 '컴포넌트 + props + 재사용'을 다른 소재로 한 번 더.
// 할 일:
//   ① NotiBadge({ icon, count }) 컴포넌트 정의 (JSX 규칙: 단일 루트·className·{중괄호})
//   ② NotiBadge를 4번 재사용 (아이콘·개수 다르게)

export default function PracticeL6() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      여기에 알림 배지 4개를 만들자
    </div>
  )
}
