// 🔴 중간 — 구조 분해와 스프레드를 둘 다 직접 쓴다.
export default function PracticeL3() {
  const user = { name: '민지', age: 20 }
  // TODO A: const { name, age } = user
  const name = ''
  const age = 0
  // TODO B: const updated = { ...user, city: '서울' }
  const updated = { name: '', age: 0, city: '' }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <p style={{ margin: 0 }}>👤 <b>{name || '(빈 이름)'}</b> · {age}살</p>
      <p style={{ margin: '6px 0 0' }}>🏙️ 도시 추가: {updated.name} · {updated.age}살 · {updated.city || '(없음)'}</p>
    </div>
  )
}
