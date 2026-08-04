// 🟢 조립 · 쉬움 — 조각 하나 배치·연결하기
// 로직(useSignupForm)과 나머지 조각은 이미 배선돼 있다. '경력' 셀렉트 하나만 배치·연결하자.
//   TODO: 닉네임 아래에 <Field ... type="select" ...>를 두고 options·value·onChange·error를 연결한다.
import { useSignupForm, LEVEL_OPTIONS, INTEREST_OPTIONS, submitBtnStyle } from './signupLogic.js'
import SignupDone from './SignupDone.jsx'
import Field from '../../apps/app-signup/Field.jsx'
import ChipSelect from '../../apps/app-signup/ChipSelect.jsx'

export default function PracticeEasy() {
  const f = useSignupForm()
  if (f.done) return <SignupDone form={f.form} onReset={f.reset} />

  return (
    <form className="demo-card" onSubmit={f.handleSubmit}>
      <Field label="이름" name="name" value={f.form.name} onChange={f.handleChange} error={f.shownError('name')} />
      <Field label="이메일" name="email" type="email" value={f.form.email} onChange={f.handleChange} error={f.shownError('email')} />
      <Field label="닉네임 (선택)" name="nickname" value={f.form.nickname} onChange={f.handleChange} error={f.shownError('nickname')} />

      {/* 🟢 TODO: '경력' 셀렉트를 여기에 배치·연결하라.
          힌트: <Field label="경력" name="level" type="select" options={LEVEL_OPTIONS}
                       value={f.form.level} onChange={f.handleChange} error={f.shownError('level')} /> */}

      <ChipSelect label="관심분야 (2~4개)" options={INTEREST_OPTIONS} selected={f.form.interests} onToggle={f.toggleInterest} error={f.shownError('interests')} />
      <button type="submit" style={submitBtnStyle}>가입하기</button>
    </form>
  )
}
