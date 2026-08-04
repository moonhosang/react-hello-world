// 🟡 쉬움 — 스프레드는 됐다. 구조 분해로 name·age를 꺼내자.
export default function PracticeL2() {
  const user = { name: '민지', age: 20 }
  // TODO: const { name, age } = user 로 바꿔 값을 꺼낸다
  const name = ''
  const age = 0
  const updated = { ...user, city: '서울' }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <p style={{ margin: 0 }}>👤 <b>{name || '(빈 이름)'}</b> · {age}살</p>
      <p style={{ margin: '6px 0 0' }}>🏙️ 도시 추가: {updated.name} · {updated.age}살 · {updated.city}</p>
    </div>
  )
}
