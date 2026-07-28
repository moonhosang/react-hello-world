import { useState } from 'react'
import Field from './Field.jsx'
import ChipSelect from './ChipSelect.jsx'

// 📝 회원가입 폼 — 실습 · 중간 (검증 규칙 전체 비움)
// 상태 · onChange · 칩 토글 · 제출 배관은 다 되어 있다. 핵심인 validate() 규칙이 전부 비어 있다.
// (지금은 규칙이 없어 아무 값이나 통과한다 — 규칙을 채우면 실시간으로 에러가 잡히기 시작한다)
//
// 할 일 — validate() 안을 채운다:
//   🟡 TODO 1 (이름)     : form.name.trim() 이 빈 문자열이면 errors.name 에 문구
//   🟡 TODO 2 (이메일)   : '@' 와 '.' 를 둘 다 포함하지 않으면 errors.email 에 문구
//   🟡 TODO 3 (경력)     : form.level 이 '' 이면 errors.level 에 문구
//   🟡 TODO 4 (관심분야) : form.interests.length 가 2 미만이면 errors.interests 에 문구
//   (닉네임은 선택 항목이라 검사하지 않는다)

const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]
const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 검증 규칙 — 지금은 빈 객체만 돌려준다(에러 없음). 아래 네 TODO를 채워 규칙을 완성하자.
function validate(form) {
  const errors = {}

  // 🟡 TODO 1: 이름 필수     — form.name.trim() === ''
  // 🟡 TODO 2: 이메일 형식   — form.email.includes('@') / form.email.includes('.')
  // 🟡 TODO 3: 경력 필수     — form.level === ''
  // 🟡 TODO 4: 관심분야 2개+ — form.interests.length < 2

  return errors
}

export default function PracticeSignupMedium() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    nickname: '',
    level: '',
    interests: [],
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)

  // 파생 상태 — errors는 저장하지 않고 매 렌더 계산한다.
  const errors = validate(form)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function toggleInterest(value) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value],
    }))
    setTouched((prev) => ({ ...prev, interests: true }))
  }

  function shownError(field) {
    return touched[field] || submitted ? errors[field] : undefined
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    setDone(true)
  }

  function reset() {
    setForm({ name: '', email: '', nickname: '', level: '', interests: [] })
    setTouched({})
    setSubmitted(false)
    setDone(false)
  }

  if (done) {
    return (
      <div className="demo-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
        <h3 style={{ margin: '4px 0' }}>가입 완료</h3>
        <p className="demo-desc">
          환영한다, <b>{form.name}</b>! · 관심분야: {form.interests.join(', ')}
        </p>
        <div className="button-row" style={{ marginTop: 14 }}>
          <button onClick={reset}>다시 입력</button>
        </div>
      </div>
    )
  }

  return (
    <form className="demo-card" onSubmit={handleSubmit}>
      <Field
        label="이름"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={shownError('name')}
      />
      <Field
        label="이메일"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={shownError('email')}
      />
      <Field
        label="닉네임 (선택)"
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        error={shownError('nickname')}
      />
      <Field
        label="경력"
        name="level"
        type="select"
        options={LEVEL_OPTIONS}
        value={form.level}
        onChange={handleChange}
        error={shownError('level')}
      />
      <ChipSelect
        label="관심분야 (2개 이상)"
        options={INTEREST_OPTIONS}
        selected={form.interests}
        onToggle={toggleInterest}
        error={shownError('interests')}
      />
      <button type="submit" style={submitBtnStyle}>
        가입하기
      </button>
    </form>
  )
}

const submitBtnStyle = {
  width: '100%',
  padding: '10px 0',
  background: 'var(--brand)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 600,
  marginTop: 4,
}
