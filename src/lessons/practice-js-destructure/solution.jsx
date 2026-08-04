// ✅ 정답 — 구조 분해로 값을 꺼내고, 스프레드로 새 객체를 만든다.
export default function SolutionProfile() {
  const user = { name: '민지', age: 20 }
  const { name, age } = user // 구조 분해
  const updated = { ...user, city: '서울' } // 스프레드 + 필드 추가

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <p style={{ margin: 0 }}>👤 <b>{name}</b> · {age}살</p>
      <p style={{ margin: '6px 0 0' }}>🏙️ 도시 추가: {updated.name} · {updated.age}살 · {updated.city}</p>
    </div>
  )
}
