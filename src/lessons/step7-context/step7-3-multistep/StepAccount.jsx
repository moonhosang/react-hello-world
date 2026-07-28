import { useForm } from './FormContext.jsx'
import Field from './Field.jsx'

// 1번 스텝 — 계정(이메일).
// props를 받지 않는다. 자기 필드는 useForm()으로 직접 읽고 setField로 쓴다.
// Wizard는 이 컴포넌트에 value·onChange를 내려줄 필요가 없다(드릴링 없음).
export default function StepAccount() {
  const { form, setField } = useForm()

  return (
    <div>
      <Field
        label="이메일"
        name="email"
        type="email"
        value={form.email} // Context의 form에서 읽고
        onChange={(e) => setField('email', e.target.value)} // Context로 되돌려 쓴다
        hint="로그인에 쓸 이메일을 입력한다."
      />
    </div>
  )
}
