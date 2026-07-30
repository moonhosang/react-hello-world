// props로 '함수'를 받는 예.
// onGreet는 부모가 준 함수다. 버튼이 눌리면 그 함수를 호출해서 '부모에게 알린다'.
// (6단계 리스트 '상태 끌어올리기'의 씨앗 — 자식이 부모에게 신호를 보내는 방법)

export default function GreetButton({ onGreet }) {
  return <button onClick={onGreet}>부모에게 인사 보내기 👋</button>
}
