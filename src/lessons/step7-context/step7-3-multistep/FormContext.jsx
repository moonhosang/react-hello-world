import { createContext, useContext, useState } from 'react'

// ── 멀티스텝 폼의 '상태 허브' ──────────────────────────────
// 이 마법사는 진행바·각 스텝·요약이 트리의 서로 다른 위치에서
// 같은 form·step 상태를 읽고 바꿔야 한다. props로 내리면 Wizard가
// 자식마다 form·onChange·step·next·prev를 줄줄이 전달해야 한다(드릴링).
// 그래서 상태를 Context 한 곳에 모으고, 필요한 자식이 useForm()으로 직접 꺼낸다.
//
// 실무 패턴(7-1 AuthContext와 동일):
//   1) Context 객체는 파일 '밖으로 내보내지 않는다'(비공개).
//   2) 기본값을 undefined로 둬서 Provider 없이 쓴 걸 감지한다.
//   3) 상태·로직은 Provider 한 곳에 캡슐화하고, 읽기는 useForm() 훅만 내보낸다.
const FormContext = createContext(undefined)

// 스텝 정의 — 0,1,2 순서로 진행한다. 진행바가 개수(3)를 여기서 읽는다.
export const STEPS = ['계정', '프로필', '관심분야']

// 프로필 스텝의 경력 select 후보. 맨 앞 ''는 '아직 안 고름'.
export const LEVEL_OPTIONS = [
  { value: '', label: '— 경력 선택 —' },
  { value: '입문', label: '입문' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
]

// 관심분야 후보 — 이 중 2~4개를 칩으로 고른다.
export const INTEREST_OPTIONS = ['프론트엔드', '백엔드', '디자인', '데이터', '기획']

// 빈 폼의 초기값. reset()이 이 모양으로 되돌린다.
const EMPTY_FORM = { email: '', name: '', nickname: '', level: '', interests: [] }

// 1) Provider — 마법사의 모든 상태와 로직을 이 한 곳에 담는다.
export function FormProvider({ children }) {
  const [form, setForm] = useState(EMPTY_FORM) // 입력값 5개를 객체 하나로 관리
  const [step, setStep] = useState(0) // 지금 몇 번째 스텝인가 (0..2)
  const [done, setDone] = useState(false) // 제출을 마쳤는가 → 요약 화면으로

  // 필드 하나만 바꾼다. 나머지는 그대로 두고 '새 객체'로 set(불변성).
  // 텍스트·select가 공통으로 쓴다 — name으로 어떤 필드인지 고른다.
  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }))

  // 관심분야 칩 토글 — 있으면 빼고(filter), 없으면 더한다([...prev]).
  // 배열을 직접 건드리지 않고 새 배열로 set 하는 게 핵심. 최대 4개까지.
  const toggleInterest = (value) =>
    setForm((prev) => {
      const has = prev.interests.includes(value)
      if (!has && prev.interests.length >= 4) return prev // 이미 4개면 추가 안 함
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((v) => v !== value)
          : [...prev.interests, value],
      }
    })

  // 스텝 이동 — 범위를 벗어나지 않게 막는다(첫 스텝에서 prev, 마지막에서 next 무시).
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  // 마지막 스텝의 '제출' — 완료 상태로 바꿔 요약 화면을 띄운다.
  const submit = () => setDone(true)

  // 처음부터 다시 — 폼·스텝·완료 상태를 초기값으로 되돌린다.
  const reset = () => {
    setForm(EMPTY_FORM)
    setStep(0)
    setDone(false)
  }

  // value에 상태 + 조작 함수를 한 번에 담는다. 이 묶음을 자식이 useForm()으로 꺼낸다.
  const value = { form, step, done, setField, toggleInterest, next, prev, submit, reset }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// 2) 커스텀 훅 — useContext를 감싸고, Provider 밖 사용을 막는 안전장치를 넣는다.
export function useForm() {
  const ctx = useContext(FormContext)
  if (ctx === undefined) {
    // Provider로 감싸지 않으면 기본값(undefined)이 나온다 → 조용한 버그 대신 즉시 에러.
    throw new Error('useForm()은 <FormProvider> 안에서만 쓸 수 있다')
  }
  return ctx
}
