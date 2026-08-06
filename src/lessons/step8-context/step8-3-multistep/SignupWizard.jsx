import { FormProvider, useForm } from './FormContext.jsx'
import ProgressBar from './ProgressBar.jsx'
import StepAccount from './StepAccount.jsx'
import StepProfile from './StepProfile.jsx'
import StepInterests from './StepInterests.jsx'
import NavButtons from './NavButtons.jsx'
import Review from './Review.jsx'

// 마법사 껍데기 — 모든 자식을 <FormProvider>로 감싼다.
// 이 한 번의 감싸기로 진행바·각 스텝·버튼·요약이 모두 같은 상태를 공유한다.
// Provider가 통로를 열어주면, 안쪽 컴포넌트들은 props 없이 useForm()으로 꺼내 쓴다.
export default function SignupWizard() {
  return (
    <FormProvider>
      <WizardBody />
    </FormProvider>
  )
}

// 내용부는 Provider '안'에 있어야 useForm()을 쓸 수 있어 별도 컴포넌트로 뺐다.
// (Provider와 그 값을 쓰는 컴포넌트가 같은 함수 안에 있으면 useForm이 통하지 않는다.)
function WizardBody() {
  const { step, done } = useForm()

  // 제출을 마쳤으면 폼 대신 요약 화면을 그린다(조건부 렌더링).
  if (done) return <Review />

  // step 값에 따라 보여줄 스텝을 고른다 — 셋 중 하나만 화면에 나온다.
  const stepView = [<StepAccount />, <StepProfile />, <StepInterests />][step]

  return (
    <div className="demo-card">
      {/* 진행바 — props 없이 Context에서 step을 읽어 진행률을 그린다 */}
      <ProgressBar />

      {/* 현재 스텝 */}
      {stepView}

      {/* 이전/다음/제출 — 역시 props 없이 Context의 함수를 쓴다 */}
      <NavButtons />
    </div>
  )
}
