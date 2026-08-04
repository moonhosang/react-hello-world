import { useState } from 'react'

// 🟣 중간+ — 로직은 다 됐다. 목록이 비었을 때 '안내 문구'를 조건부로 보여준다.
// 할 일: <ul> 안을 entries가 비면 안내, 있으면 목록으로 바꾼다(조건부 렌더).

export default function PracticeStep4() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [entries, setEntries] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name.trim() === '') return
    setEntries([...entries, form])
    setForm({ name: '', message: '' })
  }

  return (
    <form className="demo-card" style={{ padding: 12 }} onSubmit={handleSubmit}>
      <div className="form-row"><label>이름</label><input name="name" value={form.name} onChange={handleChange} placeholder="이름(필수)" /></div>
      <div className="form-row"><label>메시지</label><input name="message" value={form.message} onChange={handleChange} placeholder="한마디" /></div>
      <button className="chip on" type="submit" style={{ marginTop: 8 }}>남기기</button>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {/* TODO: entries.length === 0 이면 <li className="demo-desc">아직 방명록이 비어 있다.</li>,
                 아니면 entries.map(...) 로 목록을 그린다 */}
        {entries.map((x, i) => <li key={i}><b>{x.name}</b>: {x.message || '(메시지 없음)'}</li>)}
      </ul>
    </form>
  )
}
