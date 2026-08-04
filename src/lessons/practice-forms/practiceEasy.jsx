import { useState } from 'react'

// 🟢 쉬움 — 공통 onChange를 완성해, 이름·메시지를 form 객체 한 곳에 담자.
// 할 일: handleChange의 TODO 한 줄만 채우면 두 입력이 form에 반영된다. (제출·목록은 이미 되어 있다)

export default function PracticeEasy() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [entries, setEntries] = useState([])

  const handleChange = (e) => {
    // TODO: 바뀐 칸(e.target.name)만 새 객체로 갱신한다.
    //   힌트: setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name.trim() === '') return
    setEntries([...entries, form])
    setForm({ name: '', message: '' })
  }

  return (
    <form className="demo-card" style={{ padding: 12 }} onSubmit={handleSubmit}>
      <div className="form-row"><label>이름</label><input name="name" value={form.name} onChange={handleChange} placeholder="이름" /></div>
      <div className="form-row"><label>메시지</label><input name="message" value={form.message} onChange={handleChange} placeholder="한마디" /></div>
      <button className="chip on" type="submit" style={{ marginTop: 8 }}>남기기</button>
      <ul className="section-list" style={{ marginTop: 8 }}>
        {entries.length === 0
          ? <li className="demo-desc">아직 방명록이 비어 있다.</li>
          : entries.map((x, i) => <li key={i}><b>{x.name}</b>: {x.message || '(메시지 없음)'}</li>)}
      </ul>
    </form>
  )
}
