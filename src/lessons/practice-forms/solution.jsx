import { useState } from 'react'

// ✅ 정답 — 방명록 lite (객체 state + 공통 onChange + 제출 + 이름 필수 검증)
export default function SolutionGuestbook() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [entries, setEntries] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault() // 새로고침 막기
    if (form.name.trim() === '') return // 이름은 필수
    setEntries([...entries, form]) // 목록에 추가
    setForm({ name: '', message: '' }) // 입력창 비우기
  }

  return (
    <form className="demo-card" style={{ padding: 12 }} onSubmit={handleSubmit}>
      <div className="form-row">
        <label>이름</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="이름(필수)" />
      </div>
      <div className="form-row">
        <label>메시지</label>
        <input name="message" value={form.message} onChange={handleChange} placeholder="한마디" />
      </div>
      <button className="chip on" type="submit" style={{ marginTop: 8 }}>남기기</button>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {entries.length === 0
          ? <li className="demo-desc">아직 방명록이 비어 있다.</li>
          : entries.map((x, i) => <li key={i}><b>{x.name}</b>: {x.message || '(메시지 없음)'}</li>)}
      </ul>
    </form>
  )
}
