import { useState } from 'react'
import Field from './Field.jsx'
import ChipSelect from './ChipSelect.jsx'

// 📝 회원가입 폼 — 라이브 데모 (실시간 유효성 검사)
// 이 컴포넌트는 '상태 보유 + 검증 + 제출 오케스트레이션'을 맡는다.
// 한 줄(라벨·입력·에러)을 그리는 일은 Field.jsx에, 관심분야 칩 묶음은 ChipSelect.jsx에 맡기고,
// 여기선 데이터와 규칙만 다룬다.
//
// 이 앱의 핵심은 "파생 상태로서의 에러"다.
//   - 진짜 상태(state)는 입력값 form 하나뿐이다.
//   - errors는 state로 '저장'하지 않는다. 매 렌더마다 form을 validate()로 검사해 '계산'한다.
//     (form과 errors를 각각 state로 두면 반드시 어긋난다 — 진실은 form 한 곳에만.)

// 경력 셀렉트 후보 — 맨 앞 ''는 '아직 안 고름'을 뜻하는 기본값이다(고르면 에러가 사라진다).
const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]

// 관심분야 후보 — 이 중 2개 이상을 칩으로 골라야 통과한다.
const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 검증 규칙 — form을 받아 { 필드명: 에러문구 } 객체를 돌려준다. 문제 없으면 빈 객체.
// 이름·이메일·경력은 필수, 닉네임은 규칙이 없어 검사하지 않는다.
function validate(form) {
  const errors = {}
  if (form.name.trim() === '') {
    errors.name = '이름을 입력하라'
  }
  if (!form.email.includes('@') || !form.email.includes('.')) {
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  }
  // 닉네임(nickname)은 선택 항목이라 검사하지 않는다.
  if (form.level === '') {
    errors.level = '경력을 선택하라'
  }
  if (form.interests.length < 2) {
    errors.interests = '관심분야를 2개 이상 골라라'
  }
  return errors
}

export default function SignupForm() {
  // 진짜 상태 ① — 입력값 5개를 객체 하나로 묶어 관리한다(텍스트/셀렉트는 공통 onChange를 쓰기 위함).
  const [form, setForm] = useState({
    name: '',
    email: '',
    nickname: '',
    level: '',
    interests: [],
  })
  // 진짜 상태 ② — 각 필드를 사용자가 건드렸는지. (건드리기 전엔 에러를 숨겨 빈 화면 도배를 막는다)
  const [touched, setTouched] = useState({})
  // 진짜 상태 ③ — 제출을 시도했는지. (제출 순간 모든 필드 에러를 한꺼번에 드러낸다)
  const [submitted, setSubmitted] = useState(false)
  // 진짜 상태 ④ — 가입 완료 여부. true면 성공 화면으로 바뀐다.
  const [done, setDone] = useState(false)

  // 🔑 파생 상태 — errors는 저장하지 않고, 지금 form에서 '계산'한다. 렌더마다 최신이다.
  const errors = validate(form)

  // 공통 onChange — 텍스트/셀렉트가 함께 쓴다. name으로 어떤 필드인지 골라 그 값만 바꾼다.
  // 값을 바꾸는 순간 그 필드를 touched로 표시해, 그 필드 에러부터 실시간으로 보이게 한다.
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // 관심분야 칩 토글 — 이미 골라 있으면 빼고(filter), 없으면 더한다([...prev]).
  // 배열을 직접 건드리지 않고 '새 배열'로 set 하는 게 불변성(immutability)의 핵심이다.
  function toggleInterest(value) {
    setForm((prev) => {
      const has = prev.interests.includes(value)
      // 최대 4개 — 이미 4개면 새로 추가하지 않는다(제거는 언제나 가능)
      if (!has && prev.interests.length >= 4) return prev
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((v) => v !== value) // 있으면 제거
          : [...prev.interests, value], // 없으면 추가
      }
    })
    setTouched((prev) => ({ ...prev, interests: true }))
  }

  // 어떤 필드의 에러를 지금 보여줄지 결정한다.
  // 사용자가 그 필드를 건드렸거나(touched) 제출을 시도한(submitted) 뒤에만 노출한다.
  function shownError(field) {
    return touched[field] || submitted ? errors[field] : undefined
  }

  // 제출 — 폼 기본 동작(새로고침)을 막고, 에러가 하나라도 있으면 가입을 막는다.
  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true) // 이 순간부터 모든 필드 에러를 보여준다
    if (Object.keys(errors).length > 0) return // 통과 못 하면 여기서 중단
    setDone(true) // 규칙을 모두 통과 → 성공 화면으로
  }

  // 처음 상태로 되돌린다("다시 입력").
  function reset() {
    setForm({ name: '', email: '', nickname: '', level: '', interests: [] })
    setTouched({})
    setSubmitted(false)
    setDone(false)
  }

  // 성공 화면 — 에러 없이 제출을 통과했을 때만 그린다.
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
    // form으로 감싸면 Enter 입력이나 버튼 클릭이 onSubmit 한 곳으로 모인다.
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
        label="관심분야 (2~4개)"
        options={INTEREST_OPTIONS}
        selected={form.interests}
        onToggle={toggleInterest}
        error={shownError('interests')}
      />

      {/* 제출 버튼 — 에러가 남아 있으면 눌러도 handleSubmit이 막는다.
          disabled는 걸지 않아 시도 자체는 가능하고, 대신 막힌 필드에 에러가 뜬다. */}
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
