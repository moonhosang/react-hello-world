// 🎯 처음부터 (다른 예시) — 프로필 배지
// 같은 기술(props로 값 받아 재사용)을 다른 예시로 한 번 더. 빈 화면에서 처음부터.
// 할 일:
//   TODO A: Badge({ emoji, name, status }) 컴포넌트를 정의한다.
//           (하나의 <div>로 감싸고, {emoji} {name} {status}를 {중괄호}로 꽂는다)
//   TODO B: 아래에서 Badge를 3~4번, 서로 다른 값으로 재사용한다.

export default function PracticeL6() {
  return (
    <div className="button-row" style={{ flexWrap: 'wrap' }}>
      여기에 프로필 배지 여러 개를 만들자 (emoji · name · status)
    </div>
  )
}
