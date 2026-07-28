// 🎯 실습 (step5) — 배열을 목록으로 렌더하기
// 아래 fruits 배열을 map으로 <li> 목록으로 그려 보자. (key 잊지 말기!)

const fruits = ['🍎 사과', '🍌 바나나', '🍇 포도', '🍓 딸기']

export default function PracticeList() {
  return (
    <div className="demo-card">
      <ul className="plain-list">
        {/* TODO: fruits를 map으로 <li>로 그린다. key는 과일 이름. */}
        <li>여기에 목록을 만들자</li>
      </ul>
    </div>
  )
}
