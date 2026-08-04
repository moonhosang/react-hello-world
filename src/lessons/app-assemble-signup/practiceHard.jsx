// 🔴 조립 · 어려움 — 처음부터 조립하기
// 로직(useSignupForm)만 주어진다. form 껍데기부터 조각·제출 버튼까지 직접 조립하자.
//   TODO: <form onSubmit={f.handleSubmit} className="demo-card">로 감싸고,
//         Field 4개(이름·이메일·닉네임·경력)·ChipSelect(관심분야)·제출 버튼을 배치·연결한다.
//         f.done이면 <SignupDone form={f.form} onReset={f.reset} />을 보여준다.
//   (아래 import된 조각들을 가져다 쓰면 된다. state·검증은 f 안에 이미 있다 — 조립만.)
import { useSignupForm, LEVEL_OPTIONS, INTEREST_OPTIONS, submitBtnStyle } from './signupLogic.js'
import SignupDone from './SignupDone.jsx'
import Field from '../../apps/app-signup/Field.jsx'
import ChipSelect from '../../apps/app-signup/ChipSelect.jsx'

export default function PracticeHard() {
  const f = useSignupForm()

  // TODO: 여기서부터 처음부터 조립한다. (👀 정답 보기로 완성본과 비교)
  return (
    <div className="demo-card">여기에 회원가입 폼을 처음부터 조립하자</div>
  )
}
