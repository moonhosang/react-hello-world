// 🟢 아주 쉬움 — 거의 다 됐다. 스프레드로 추가할 city 값 한 곳만 채운다.
export default function PracticeL1() {
  const user = { name: '민지', age: 20 }
  const { name, age } = user
  const updated = { ...user, city: '' } // TODO: city: '서울'

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <p style={{ margin: 0 }}>👤 <b>{name}</b> · {age}살</p>
      <p style={{ margin: '6px 0 0' }}>🏙️ 도시 추가: {updated.name} · {updated.age}살 · {updated.city || '(비어 있음)'}</p>
    </div>
  )
}
