import { useState } from 'react'

// 🟡 쉬움+ — 공통 onChange는 됐다. 이제 '제출'을 완성한다.
// 할 일: handleSubmit의 TODO 세 줄 — 새로고침 막기 · 목록 추가 · 입력 비우기.

export default function PracticeStep2() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [entries, setEntries] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    // TODO 1: e.preventDefault()        // 새로고침 막기
    // TODO 2: setEntries([...entries, form])   // 목록에 추가
    // TODO 3: setForm({ name: '', message: '' }) // 입력창 비우기
  }

  return (
    <form className="demo-card" style={{ padding: 12 }} onSubmit={handleSubmit}>
      <div className="form-row"><label>이름</label><input name="name" value={form.name} onChange={handleChange} placeholder="이름" /></div>
      <div className="form-row"><label>메시지</label><input name="message" value={form.message} onChange={handleChange} placeholder="한마디" /></div>
      <button className="chip on" type="submit" style={{ marginTop: 8 }}>남기기</button>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {entries.map((x, i) => <li key={i}><b>{x.name}</b>: {x.message || '(메시지 없음)'}</li>)}
      </ul>
    </form>
  )
}
