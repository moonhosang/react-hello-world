// ⚫ 도전 — 빈 화면에서 처음부터. user 객체를 두고, 구조 분해 + 스프레드로 프로필을 만든다.
// 목표(정답): { name, age } 구조 분해로 표시, { ...user, city: '서울' }로 도시 추가한 것도 표시.

export default function PracticeL5() {
  // TODO 1: const user = { name, age }
  // TODO 2: const { name, age } = user
  // TODO 3: const updated = { ...user, city: '서울' }
  // TODO 4: name·age·updated.city를 화면에 표시
  return (
    <div className="demo-card" style={{ padding: 12 }}>여기에 프로필을 만들자</div>
  )
}
