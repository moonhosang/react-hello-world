import { useState } from 'react'
import Field from './Field.jsx'
import ChipSelect from './ChipSelect.jsx'

// ✅ 회원가입 폼 — 정답 (자기완결형)
// 실습 세 단계가 목표로 삼는 완성본이다. 완성 데모(SignupForm)와 같은 설계를 따른다.
//
// 핵심 두 가지:
//   1) errors는 state가 아니라 form에서 매 렌더 계산하는 '파생 상태'다.
//   2) 검증을 통과하기 전에는 제출을 막는다(handleSubmit에서 preventDefault + 에러 검사).

// 경력 셀렉트 후보 — 맨 앞 ''는 '아직 안 고름'을 뜻하는 기본값이다.
const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]

// 관심분야 후보 — 이 중 2개 이상을 골라야 통과한다.
const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 검증 규칙 — 이름·이메일·경력은 필수, 관심분야는 최소 2개, 닉네임은 검사 안 함.
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
  if (form.interests.length < 2) {
    errors.interests = '관심분야를 2개 이상 골라라'
  }
  return errors
}

export default function SolutionSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    nickname: '',
    level: '',
    interests: [],
  })
  const [touched, setTouched] = useState({}) // 필드를 건드렸는지
  const [submitted, setSubmitted] = useState(false) // 제출을 시도했는지
  const [done, setDone] = useState(false) // 가입 완료 여부

  // 파생 상태 — 지금 form을 검사한 결과. 저장하지 않고 매 렌더 계산한다.
  const errors = validate(form)

  // 공통 onChange — 텍스트/셀렉트가 함께 쓴다. name으로 필드를 골라 값만 갱신하고 touched 표시.
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // 관심분야 칩 토글 — 있으면 filter로 빼고, 없으면 [...prev]로 더한다(불변성 유지).
  function toggleInterest(value) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value],
    }))
    setTouched((prev) => ({ ...prev, interests: true }))
  }

  // 건드렸거나 제출을 시도한 뒤에만 그 필드 에러를 보여준다.
  function shownError(field) {
    return touched[field] || submitted ? errors[field] : undefined
  }

  // 제출 — 기본 동작 차단 후, 에러가 있으면 막고 없으면 성공 처리.
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
