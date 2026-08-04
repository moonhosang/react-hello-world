import { useState } from 'react'

// 🟢 쉬움 — 공통 onChange를 완성해, 이름·메시지를 form 객체 한 곳에 담자.
// 할 일: handleChange의 TODO 한 줄만 채우면 두 입력이 form에 반영된다.

export default function PracticeEasy() {
  const [form, setForm] = useState({ name: '', message: '' })

  const handleChange = (e) => {
    // TODO: 바뀐 칸(e.target.name)만 새 객체로 갱신한다.
    //   힌트: setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <div className="form-row">
        <label>이름</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
      </div>
      <div className="form-row">
        <label>메시지</label>
        <input name="message" value={form.message} onChange={handleChange} placeholder="한마디" />
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        <b>{form.name || '(이름)'}</b> · {form.message || '(메시지)'}
      </p>
    </div>
  )
}
