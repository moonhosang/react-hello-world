// 🟡 조립 · 중간 — 조각을 전부 배치·연결하기
// 로직(useSignupForm)과 form 껍데기·제출 버튼은 이미 있다. 그 안에 조각을 다 채우자.
//   TODO: Field 4개(이름·이메일·닉네임·경력)와 ChipSelect(관심분야)를 배치하고,
//         각각 value·onChange·error로 연결한다. (경력은 type="select"·options, 관심분야는 selected·onToggle)
import { useSignupForm, LEVEL_OPTIONS, INTEREST_OPTIONS, submitBtnStyle } from './signupLogic.js'
import SignupDone from './SignupDone.jsx'
import Field from '../../apps/app-signup/Field.jsx'
import ChipSelect from '../../apps/app-signup/ChipSelect.jsx'

export default function PracticeMedium() {
  const f = useSignupForm()
  if (f.done) return <SignupDone form={f.form} onReset={f.reset} />

  return (
    <form className="demo-card" onSubmit={f.handleSubmit}>
      {/* 🟡 TODO: 여기에 Field 4개 + ChipSelect를 배치·연결하라.
          - Field는 label·name·value={f.form.필드}·onChange={f.handleChange}·error={f.shownError('필드')}
          - 경력 Field는 type="select" options={LEVEL_OPTIONS}
          - ChipSelect는 options={INTEREST_OPTIONS} selected={f.form.interests} onToggle={f.toggleInterest} error={f.shownError('interests')} */}

      <button type="submit" style={submitBtnStyle}>가입하기</button>
    </form>
  )
}
