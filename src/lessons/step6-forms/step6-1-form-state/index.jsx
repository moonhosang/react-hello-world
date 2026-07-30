// 7-1 · 여러 입력 → 객체 하나로 관리
// 입력이 여러 개면 각각 state로 둘 수 있다. 관련 있는 값이면 객체 하나 + 공통 onChange가 편하다.

import { useState } from 'react'

export default function Step6_1() {
  // 방법 A: 입력마다 state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // 방법 B: 객체 하나 + 공통 onChange
  const [form, setForm] = useState({ id: '', pw: '' })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value }) // 바뀐 칸만 새 객체로
  }

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">7-1</span>
        <h2>여러 입력 → 객체로 관리</h2>
        <p>입력이 여러 개인 폼. 각각 state로 두거나, 관련 값이면 객체 하나로 묶는다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>관련 있는 입력 여러 개는 객체 상태 하나 + 공통 onChange로 묶어 관리한다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          입력 하나 = <b>state 하나 + onChange 하나</b>. 입력이 많아지면 번거롭다 → 관련 값은
          <b> 객체 하나</b>로 묶고 <b>공통 onChange</b>로 처리한다.
        </p>
      </div>

      <h3 className="section-title">방법 A — 입력마다 state</h3>
      <span className="learn-tag">📎 학습 포인트 · 입력 하나에 state 하나 + onChange 하나가 기본이다</span>
      <p className="section-desc">각 입력을 각자의 state에 묶는다. 입력이 늘면 state·onChange도 는다.</p>
      <div className="card">
        <div className="file-label">📄 방법 A · useState 두 개</div>
        <div className="form-row">
          <label>이름</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        </div>
        <div className="form-row">
          <label>이메일</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <p className="demo-desc">이름: <b>{name || '(없음)'}</b> · 이메일: <b>{email || '(없음)'}</b></p>
      </div>

      <h3 className="section-title">방법 B — 객체 하나 + 공통 onChange</h3>
      <span className="learn-tag">📎 학습 포인트 · input의 name을 key로 써서 onChange 하나로 모든 칸을 처리한다</span>
      <p className="section-desc">
        폼 값을 <b>객체 하나</b>(<code>form</code>)에 모으고, input의 <code>name</code>을 key로 써서 onChange 하나로 처리한다.
      </p>
      <div className="card">
        <div className="file-label">📄 step6-1-form-state/index.jsx · 객체 상태</div>
        <div className="form-row">
          <label>아이디</label>
          <input name="id" value={form.id} onChange={handleChange} placeholder="아이디" />
        </div>
        <div className="form-row">
          <label>비번</label>
          <input name="pw" value={form.pw} onChange={handleChange} placeholder="비밀번호" />
        </div>
        <pre className="concept-flow">{JSON.stringify(form, null, 2)}</pre>
      </div>
      <p className="section-desc">
        <code>{`setForm({ ...form, [e.target.name]: e.target.value })`}</code> — 바뀐 칸만 새 객체로.
        입력이 100개여도 <code>handleChange</code>는 <b>하나</b>면 된다.
      </p>
    </section>
  )
}
