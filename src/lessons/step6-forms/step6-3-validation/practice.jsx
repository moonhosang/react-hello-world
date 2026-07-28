import { useState } from 'react'

// 🟢 실습 (step6-3) — validate에 '나이 범위' 규칙 채우기
//
// 이 폼은 이메일·나이를 받는다. 이메일 규칙은 이미 들어 있지만,
// 나이 규칙이 비어 있어 아무 나이나(0, 999...) 통과돼 버린다.
// validate 함수의 「TODO」 자리를 채워, 나이가 1~120을 벗어나면 에러가 뜨고
// 제출이 막히게 만들어 보자.

// 검증 규칙 — form을 받아 규칙을 어긴 필드만 { 필드: 문구 }로 돌려주는 순수 함수다.
function validate(form) {
  const errors = {}

  // 이메일 — @ 와 . 을 모두 포함해야 형식으로 본다. (이미 완성됨)
  if (!form.email.includes('@') || !form.email.includes('.')) {
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  }

  // 🟢 TODO: 나이 규칙을 채운다.
  //   1) const age = Number(form.age) 로 문자열 값을 숫자로 바꾼다.
  //   2) form.age === '' 이거나 age < 1 이거나 age > 120 이면
  //      errors.age = '나이는 1~120 사이 숫자여야 한다' 를 넣는다.

  return errors
}

export default function PracticeValidation() {
  const [form, setForm] = useState({ email: '', age: '' })
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)

  // errors는 저장하지 않고 매 렌더 계산한다(파생 상태).
  const errors = validate(form)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setDone(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return // 에러가 있으면 제출을 막는다
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
