// 6-2 · 폼 제출 (방명록)
// 제출은 <form onSubmit>으로 받고, 맨 처음에 e.preventDefault()로 새로고침을 막는다.
// 그다음 폼 값을 원하는 대로 쓴다 — 여기선 방명록 목록에 추가한다.

import { useState } from 'react'

let nextId = 1

export default function Step6_2() {
  const [form, setForm] = useState({ name: '', msg: '' })
  const [entries, setEntries] = useState([])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault() // ★ 새로고침(폼 기본 동작) 막기
    if (form.name.trim() === '' || form.msg.trim() === '') return
    setEntries([{ id: nextId++, ...form }, ...entries]) // 목록 맨 앞에 추가
    setForm({ name: '', msg: '' }) // 폼 비우기
  }

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">6-2</span>
        <h2>폼 제출</h2>
        <p><code>&lt;form onSubmit&gt;</code>과 <code>preventDefault</code>로 제출을 처리한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>제출 핸들러 맨 처음에 e.preventDefault()로 새로고침을 막고 폼 값을 쓴다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          제출은 <code>&lt;form onSubmit=&#123;...&#125;&gt;</code>로 받는다. 핸들러 <b>맨 처음</b>에
          <code> e.preventDefault()</code>로 새로고침을 막고, 그다음 폼 값을 쓴다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">📄 step6-2-submit/index.jsx · 방명록</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>이름</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          </div>
          <div className="form-row">
            <label>메시지</label>
            <input name="msg" value={form.msg} onChange={handleChange} placeholder="한마디 남겨 보자" />
          </div>
          <button type="submit">남기기</button>
        </form>

        <ul className="plain-list">
          {entries.length === 0 ? (
            <li className="demo-desc">아직 방명록이 없다. 위에서 남겨 보자 ✍️</li>
          ) : (
            entries.map((en) => (
              <li key={en.id}>
                <b>{en.name}</b> — {en.msg}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li><code>e.preventDefault()</code>를 빼면 제출 시 페이지가 새로고침되어 값이 날아간다.</li>
          <li>제출 후 <code>setForm(&#123;...&#125;)</code>로 입력을 비워 주는 게 자연스럽다.</li>
        </ul>
      </div>
    </section>
  )
}
