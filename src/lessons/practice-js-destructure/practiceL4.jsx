// 🟣 어려움 — user만 있다. 구조 분해·스프레드·표시를 스스로 만든다.
export default function PracticeL4() {
  const user = { name: '민지', age: 20 }
  // TODO A: const { name, age } = user
  // TODO B: const updated = { ...user, city: '서울' }
  // TODO C: 아래에 name·age·updated.city를 표시한다

  return (
    <div className="demo-card" style={{ padding: 12 }}>여기에 프로필을 표시하자</div>
  )
}
