import { useState } from 'react'
import Field from './Field.jsx'
import ChipSelect from './ChipSelect.jsx'

// 📝 회원가입 폼 — 실습 · 쉬움 (90% 완성)
// 상태 · onChange · 칩 토글 · 제출 · 검증 규칙 세 개(이름·이메일·경력)까지 전부 채워져 동작한다.
// 딱 한 군데, 관심분야 최소 2개 검사만 비어 있다.
//
// ⚠️ 지금은 '관심분야' 규칙이 비어 있어서, 관심분야를 1개만 골라도(혹은 안 골라도) 가입이 된다.
//    이건 버그가 아니라 "규칙이 아직 없어서 그냥 통과하는 것"이다 — 아래 한 줄을 채우면 막힌다.
//
// 할 일:
//   🟢 TODO 1 (관심분야 최소 2개): interests가 2개 미만이면 errors.interests에 문구를 넣는다
//                              바로 위 세 규칙(name/email/level)이 정답 모양이다

// 경력 셀렉트 후보 — 맨 앞 ''는 '아직 안 고름'을 뜻하는 기본값이다.
const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]
const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 검증 규칙 — 문제가 있는 필드만 { 필드명: 문구 }로 담아 돌려준다.
function validate(form) {
  const errors = {}
  if (form.name.trim() === '') {
    errors.name = '이름을 입력하라'
  }
  if (!form.email.includes('@') || !form.email.includes('.')) {
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  }
  if (form.level === '') {
    errors.level = '경력을 선택하라'
  }
  // 🟢 TODO 1: 관심분야 최소 2개 검사
  //   form.interests.length < 2 이면
  //   errors.interests = '관심분야를 2개 이상 골라라' 를 넣는다

  return errors
}

export default function PracticeSignupEasy() {
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
