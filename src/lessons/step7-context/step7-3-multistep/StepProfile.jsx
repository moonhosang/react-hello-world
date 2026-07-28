import { useForm, LEVEL_OPTIONS } from './FormContext.jsx'
import Field from './Field.jsx'

// 2번 스텝 — 프로필(이름·닉네임·경력).
// 이 스텝도 props 없이 useForm()으로 자기 필드 셋을 읽고 쓴다.
export default function StepProfile() {
  const { form, setField } = useForm()

  return (
    <div>
      <Field
        label="이름"
        name="name"
        value={form.name}
        onChange={(e) => setField('name', e.target.value)}
        hint="화면에 표시될 이름이다."
      />
      <Field
        label="닉네임 (선택)"
        name="nickname"
        value={form.nickname}
        onChange={(e) => setField('nickname', e.target.value)}
        hint="비워둬도 된다."
      />
      <Field
        label="경력"
        name="level"
        type="select"
        options={LEVEL_OPTIONS}
        value={form.level}
        onChange={(e) => setField('level', e.target.value)}
      />
    </div>
  )
}
