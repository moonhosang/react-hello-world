import { useState } from 'react'

// 조립 연습(Lv3-1)용 — 회원가입 폼의 '로직'을 이미 만들어 제공한다.
// 학습자는 이 로직(state·검증·핸들러)을 그대로 받아, return의 '조립(배선)'만 한다.
// 실제 로직 완성은 Lv3-2(app-signup)에서 다룬다.

export const LEVEL_OPTIONS = [
  { value: '', label: '— 경력을 선택하라 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]
export const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

function validate(form) {
  const errors = {}
  if (form.name.trim() === '') errors.name = '이름을 입력하라'
  if (!form.email.includes('@') || !form.email.includes('.')) errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  if (form.level === '') errors.level = '경력을 선택하라'
  if (form.interests.length < 2) errors.interests = '관심분야를 2개 이상 골라라'
  return errors
}

// 부모가 form state를 '소유'하고, 자식(Field·ChipSelect)에 props로 내려주고 콜백으로 받는다.
// 이 훅이 그 부모 몫을 통째로 제공한다 — 조립 연습은 이 값들을 배선하기만 하면 된다.
export function useSignupForm() {
  const [form, setForm] = useState({ name: '', email: '', nickname: '', level: '', interests: [] })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)

  const errors = validate(form) // 파생 상태 — 저장하지 않고 매 렌더 계산

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }
  const toggleInterest = (value) => {
    setForm((prev) => {
      const has = prev.interests.includes(value)
      if (!has && prev.interests.length >= 4) return prev
      return { ...prev, interests: has ? prev.interests.filter((v) => v !== value) : [...prev.interests, value] }
    })
    setTouched((prev) => ({ ...prev, interests: true }))
  }
  const shownError = (field) => (touched[field] || submitted ? errors[field] : undefined)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    setDone(true)
  }
  const reset = () => {
    setForm({ name: '', email: '', nickname: '', level: '', interests: [] })
    setTouched({})
    setSubmitted(false)
    setDone(false)
  }
  return { form, errors, done, handleChange, toggleInterest, shownError, handleSubmit, reset }
}

export const submitBtnStyle = {
  width: '100%', padding: '10px 0', background: 'var(--brand)', color: '#fff',
  border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600, marginTop: 4,
}
