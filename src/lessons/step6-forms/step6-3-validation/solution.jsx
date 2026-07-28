import { useState } from 'react'

// ✅ 정답 (step6-3) — validate에 '나이 범위' 규칙을 채운 모습.

// 검증 규칙 — form을 받아 규칙을 어긴 필드만 { 필드: 문구 }로 돌려주는 순수 함수다.
function validate(form) {
  const errors = {}

  // 이메일 — @ 와 . 을 모두 포함해야 형식으로 본다.
  if (!form.email.includes('@') || !form.email.includes('.')) {
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  }

  // 나이 — 값은 문자열이라 Number()로 바꿔 검사한다.
  // 빈 칸이거나 1~120 범위를 벗어나면 에러다.
  const age = Number(form.age)
  if (form.age === '' || Number.isNaN(age) || age < 1 || age > 120) {
    errors.age = '나이는 1~120 사이 숫자여야 한다'
  }

  return errors
}

export default function SolutionValidation() {
  const [form, setForm] = useState({ email: '', age: '' })
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)

  const errors = validate(form)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setDone(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    setDone(true)
  }

  return (
    <form className="demo-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>이메일</label>
        <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      </div>
      {submitted && errors.email && <p className="warn">⚠ {errors.email}</p>}

      <div className="form-row">
        <label>나이</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="1 ~ 120" />
      </div>
      {submitted && errors.age && <p className="warn">⚠ {errors.age}</p>}

      <div className="button-row" style={{ marginTop: 12, justifyContent: 'flex-start' }}>
        <button type="submit">제출</button>
      </div>

      {done && (
        <p className="demo-desc" style={{ marginTop: 10, color: 'var(--brand)', fontWeight: 600 }}>
          ✅ 통과! · {form.email} · {form.age}세
        </p>
      )}
    </form>
  )
}
