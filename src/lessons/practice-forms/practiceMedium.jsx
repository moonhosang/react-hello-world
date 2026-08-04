import { useState } from 'react'

// 🟡 중간 — 제출을 완성하자. 새로고침을 막고, 입력을 방명록 목록에 추가한다.
// (공통 onChange는 이미 되어 있다) 할 일: handleSubmit의 TODO 세 줄.

export default function PracticeMedium() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [entries, setEntries] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    // TODO 1: 새로고침 막기 — e.preventDefault()
    // TODO 2: 목록에 추가 — setEntries([...entries, form])
    // TODO 3: 입력창 비우기 — setForm({ name: '', message: '' })
  }

  return (
    <form className="demo-card" style={{ padding: 12 }} onSubmit={handleSubmit}>
      <div className="form-row">
        <label>이름</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
      </div>
      <div className="form-row">
        <label>메시지</label>
        <input name="message" value={form.message} onChange={handleChange} placeholder="한마디" />
      </div>
      <button className="chip on" type="submit" style={{ marginTop: 8 }}>남기기</button>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {entries.map((x, i) => <li key={i}><b>{x.name}</b>: {x.message}</li>)}
      </ul>
    </form>
  )
}
