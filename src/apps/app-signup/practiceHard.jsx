import { useState } from 'react'
import Field from './Field.jsx'
import ChipSelect from './ChipSelect.jsx'

// 📝 회원가입 폼 — 실습 · 어려움 (껍데기만)
// 화면(JSX)과 상태 뼈대만 있다. 로직은 거의 다 비어 있다.
// (지금은 입력해도 글자가 안 써지고, 칩도 안 켜지고, 가입 버튼도 반응하지 않는다 — 하나씩 채우면 살아난다)
//
// 기억할 것: 진짜 상태는 입력값 form 하나 + 표시 제어용 플래그(touched·submitted·done)뿐이다.
//            errors는 state가 아니라 form에서 '계산'하는 파생 상태다.
//
// 할 일:
//   🔴 TODO 1 (onChange)     : handleChange — e.target의 name으로 해당 필드값만 바꾸고,
//                            그 필드를 touched로 표시한다 (setForm/setTouched, [name] 계산된 키)
//   🔴 TODO 2 (칩 토글)       : toggleInterest — 이미 있으면 filter로 빼고, 없으면 [...prev]로 더한다
//                            (새 배열로 set 해야 한다 — 불변성)
//   🔴 TODO 3 (검증)         : validate(form) — 네 규칙을 검사해 { 필드명: 문구 } 로 돌려준다
//                            (이름 필수 / 이메일 '@'·'.' / 경력 '' 아님 / 관심분야 2개 이상)
//   🔴 TODO 4 (제출)         : handleSubmit — preventDefault → submitted=true →
//                            errors가 있으면 return, 없으면 done=true

const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]
const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 🔴 TODO 3: 검증 규칙. 지금은 빈 객체만 돌려줘 아무 에러도 없다.
function validate(form) {
  const errors = {}
  // 네 규칙(name / email / level / interests)을 여기서 채운다
  return errors
}

export default function PracticeSignupHard() {
  // 상태 뼈대 — 입력값 하나 + 표시 제어 플래그들 (여기까지는 제공)
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

  // 파생 상태 — form을 검사한 결과 (매 렌더 계산)
  const errors = validate(form)

  // 🔴 TODO 1: 공통 onChange — 지금은 아무 일도 하지 않는다.
  //   const { name, value } = e.target
  //   setForm((prev) => ({ ...prev, [name]: value }))
  //   setTouched((prev) => ({ ...prev, [name]: true }))
  function handleChange(e) {
    // 여기를 채운다
  }

  // 🔴 TODO 2: 관심분야 칩 토글 — 지금은 아무 일도 하지 않는다.
  //   setForm((prev) => ({
  //     ...prev,
  //     interests: prev.interests.includes(value)
  //       ? prev.interests.filter((v) => v !== value)  // 있으면 제거
  //       : [...prev.interests, value],                // 없으면 추가
  //   }))
  //   setTouched((prev) => ({ ...prev, interests: true }))
  function toggleInterest(value) {
    // 여기를 채운다
  }

  // 건드렸거나 제출한 뒤에만 그 필드 에러를 보여준다 (제공)
  function shownError(field) {
    return touched[field] || submitted ? errors[field] : undefined
  }

  // 🔴 TODO 4: 제출 — 지금은 새로고침만 막는다.
  //   setSubmitted(true)
  //   if (Object.keys(errors).length > 0) return
  //   setDone(true)
  function handleSubmit(e) {
    e.preventDefault()
    // 여기를 채운다
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
